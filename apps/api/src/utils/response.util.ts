import { Response } from 'express';

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
}

export const successResponse = <T>(
    res: Response,
    data: T,
    message?: string,
    statusCode: number = 200,
    meta?: ApiResponse['meta']
): Response => {
    const response: ApiResponse<T> = {
        success: true,
        data,
        message,
        meta,
    };
    return res.status(statusCode).json(response);
};

export const errorResponse = (
    res: Response,
    error: string,
    statusCode: number = 400
): Response => {
    const response: ApiResponse = {
        success: false,
        error,
    };
    return res.status(statusCode).json(response);
};

export const createdResponse = <T>(
    res: Response,
    data: T,
    message: string = 'Resource created successfully'
): Response => {
    return successResponse(res, data, message, 201);
};

export const noContentResponse = (res: Response): Response => {
    return res.status(204).send();
};

export const unauthorizedResponse = (
    res: Response,
    message: string = 'Unauthorized'
): Response => {
    return errorResponse(res, message, 401);
};

export const forbiddenResponse = (
    res: Response,
    message: string = 'Forbidden'
): Response => {
    return errorResponse(res, message, 403);
};

export const notFoundResponse = (
    res: Response,
    message: string = 'Resource not found'
): Response => {
    return errorResponse(res, message, 404);
};

export const validationErrorResponse = (
    res: Response,
    errors: any
): Response => {
    return res.status(422).json({
        success: false,
        error: 'Validation failed',
        errors,
    });
};
