import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from '../utils/jwt.util';
import { unauthorizedResponse, forbiddenResponse } from '../utils/response.util';
import { prisma } from '@repo/database';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                roleId?: string;
                role?: any;
                permissions?: string[];
            };
        }
    }
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            unauthorizedResponse(res, 'No token provided');
            return;
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = verifyToken(token);

        // Fetch user from database
        const user = await prisma.adminUser.findUnique({
            where: { id: decoded.userId },
            include: { role: true },
        });

        if (!user || !user.isActive) {
            unauthorizedResponse(res, 'Invalid or inactive user');
            return;
        }

        // Parse permissions from role
        const permissions = user.role?.permissions
            ? JSON.parse(user.role.permissions)
            : [];

        // Attach user to request
        req.user = {
            id: user.id,
            email: user.email,
            roleId: user.roleId || undefined,
            role: user.role,
            permissions,
        };

        next();
    } catch (error) {
        unauthorizedResponse(res, 'Invalid or expired token');
    }
};

export const authorize = (...requiredPermissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            unauthorizedResponse(res, 'Authentication required');
            return;
        }

        const userPermissions = req.user.permissions || [];

        // Check if user has all required permissions
        const hasPermission = requiredPermissions.every(permission =>
            userPermissions.includes(permission)
        );

        if (!hasPermission) {
            forbiddenResponse(res, 'Insufficient permissions');
            return;
        }

        next();
    };
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const decoded = verifyToken(token);

            const user = await prisma.adminUser.findUnique({
                where: { id: decoded.userId },
                include: { role: true },
            });

            if (user && user.isActive) {
                const permissions = user.role?.permissions
                    ? JSON.parse(user.role.permissions)
                    : [];

                req.user = {
                    id: user.id,
                    email: user.email,
                    roleId: user.roleId || undefined,
                    role: user.role,
                    permissions,
                };
            }
        }
    } catch (error) {
        // Silently fail for optional auth
    }

    next();
};
