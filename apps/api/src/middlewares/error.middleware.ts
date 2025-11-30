import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response.util';

export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Log error
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
    });

    // Handle AppError
    if (err instanceof AppError) {
        errorResponse(res, err.message, err.statusCode);
        return;
    }

    // Handle Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        const prismaError = err as any;

        if (prismaError.code === 'P2002') {
            errorResponse(res, 'A record with this value already exists', 409);
            return;
        }

        if (prismaError.code === 'P2025') {
            errorResponse(res, 'Record not found', 404);
            return;
        }
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
        errorResponse(res, err.message, 422);
        return;
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        errorResponse(res, 'Invalid token', 401);
        return;
    }

    if (err.name === 'TokenExpiredError') {
        errorResponse(res, 'Token expired', 401);
        return;
    }

    // Default error
    errorResponse(
        res,
        process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
        500
    );
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response): void => {
    errorResponse(res, `Route ${req.originalUrl} not found`, 404);
};
