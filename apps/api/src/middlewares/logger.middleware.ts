import winston from 'winston';
import { Request, Response, NextFunction } from 'express';
import config from '../config/env';
import path from 'path';
import fs from 'fs';

// Ensure logs directory exists
const logsDir = path.dirname(config.logging.file);
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Create Winston logger
export const logger = winston.createLogger({
    level: config.logging.level,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    defaultMeta: { service: 'ninja-api' },
    transports: [
        // Write all logs to file
        new winston.transports.File({
            filename: config.logging.file,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        // Write errors to separate file
        new winston.transports.File({
            filename: path.join(logsDir, 'error.log'),
            level: 'error',
            maxsize: 5242880,
            maxFiles: 5,
        }),
    ],
});

// Add console transport in development
if (config.nodeEnv !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    }));
}

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();

    // Log request
    logger.info('Incoming request', {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('user-agent'),
    });

    // Log response
    res.on('finish', () => {
        const duration = Date.now() - start;

        logger.info('Request completed', {
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
        });
    });

    next();
};

export default logger;
