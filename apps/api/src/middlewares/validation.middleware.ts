import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { validationErrorResponse } from '../utils/response.util';

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            // Validate request body
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = (error as any).errors.map((err: any) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));

                validationErrorResponse(res, errors);
                return;
            }

            next(error);
        }
    };
};

export const validateQuery = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse(req.query);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = (error as any).errors.map((err: any) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));

                validationErrorResponse(res, errors);
                return;
            }

            next(error);
        }
    };
};

export const validateParams = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse(req.params);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = (error as any).errors.map((err: any) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));

                validationErrorResponse(res, errors);
                return;
            }

            next(error);
        }
    };
};

// Sanitize string inputs
export const sanitizeString = (input: string): string => {
    return input
        .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
        .replace(/[^\w\s.@'-]/g, '') // Allow only alphanumeric, spaces, dots, @, hyphens, apostrophes
        .trim();
};
