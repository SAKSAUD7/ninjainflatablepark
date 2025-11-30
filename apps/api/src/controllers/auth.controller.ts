import { Request, Response } from 'express';
import { prisma } from '@repo/database';
import {
    successResponse,
    errorResponse,
    unauthorizedResponse,
} from '../utils/response.util';
import {
    hashPassword,
    comparePassword,
    generateToken,
    generateRefreshToken,
} from '../utils/jwt.util';
import { asyncHandler } from '../middlewares/error.middleware';
import logger from '../middlewares/logger.middleware';
import { CONSTANTS } from '../config/constants';

// Login
export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return errorResponse(res, 'Email and password are required', 400);
    }

    // Find user
    const user = await prisma.adminUser.findUnique({
        where: { email },
        include: { role: true },
    });

    if (!user) {
        logger.error('DEBUG: User not found: ' + email);
        return unauthorizedResponse(res, 'Invalid credentials');
    }

    logger.error('DEBUG: User found: ' + user.email);
    logger.error('DEBUG: User active: ' + user.isActive);
    logger.error('DEBUG: User updatedAt: ' + user.updatedAt);
    logger.error('DEBUG: Stored hash: ' + user.password);
    logger.error('DEBUG: Input password: ' + password);

    if (!user.isActive) {
        return unauthorizedResponse(res, 'Account is inactive');
    }

    logger.error(`DEBUG: Stored hash length: ${user.password.length}`);
    logger.error(`DEBUG: Input password length: ${password.length}`);

    // Test hash in controller
    const testHash = await hashPassword(password);
    logger.error(`DEBUG: Test hash in controller: ${testHash}`);
    const testCompare = await comparePassword(password, testHash);
    logger.error(`DEBUG: Test compare in controller: ${testCompare}`);

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    logger.error('DEBUG: Password valid: ' + isValidPassword);

    if (!isValidPassword) {
        return unauthorizedResponse(res, 'Invalid credentials');
    }

    // Generate tokens
    const token = generateToken({
        userId: user.id,
        email: user.email,
        roleId: user.roleId || undefined,
    });

    const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
        roleId: user.roleId || undefined,
    });

    // Update last login
    await prisma.adminUser.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
    });

    // Log activity
    await prisma.auditLog.create({
        data: {
            adminId: user.id,
            action: CONSTANTS.AUDIT_ACTIONS.LOGIN,
            entity: 'AUTH',
            ipAddress: req.ip,
            userAgent: req.get('user-agent'),
        },
    });

    logger.info(`User logged in: ${user.email}`);

    return successResponse(res, {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
        refreshToken,
    }, 'Login successful');
});

// Logout
export const logout = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        return unauthorizedResponse(res);
    }

    // Log activity
    await prisma.auditLog.create({
        data: {
            adminId: req.user.id,
            action: CONSTANTS.AUDIT_ACTIONS.LOGOUT,
            entity: 'AUTH',
            ipAddress: req.ip,
            userAgent: req.get('user-agent'),
        },
    });

    logger.info(`User logged out: ${req.user.email}`);

    return successResponse(res, null, 'Logout successful');
});

// Get current user
export const getMe = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        return unauthorizedResponse(res);
    }

    const user = await prisma.adminUser.findUnique({
        where: { id: req.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            roleId: true,
            role: true,
            isActive: true,
            profilePic: true,
            lastLoginAt: true,
            createdAt: true,
        },
    });

    if (!user) {
        return unauthorizedResponse(res, 'User not found');
    }

    return successResponse(res, user);
});

// Change password
export const changePassword = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        return unauthorizedResponse(res);
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return errorResponse(res, 'Current password and new password are required', 400);
    }

    // Get user
    const user = await prisma.adminUser.findUnique({
        where: { id: req.user.id },
    });

    if (!user) {
        return unauthorizedResponse(res, 'User not found');
    }

    // Verify current password
    const isValidPassword = await comparePassword(currentPassword, user.password);

    if (!isValidPassword) {
        return errorResponse(res, 'Current password is incorrect', 400);
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.adminUser.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });

    // Log activity
    await prisma.auditLog.create({
        data: {
            adminId: user.id,
            action: CONSTANTS.AUDIT_ACTIONS.UPDATE,
            entity: 'AUTH',
            entityId: user.id,
            details: JSON.stringify({ action: 'password_changed' }),
            ipAddress: req.ip,
            userAgent: req.get('user-agent'),
        },
    });

    logger.info(`Password changed for user: ${user.email}`);

    return successResponse(res, null, 'Password changed successfully');
});

// Refresh token
export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken: token } = req.body;

    if (!token) {
        return errorResponse(res, 'Refresh token is required', 400);
    }

    try {
        // Verify refresh token (uses same secret for now)
        const { verifyToken } = require('../utils/jwt.util');
        const decoded = verifyToken(token);

        // Generate new access token
        const newToken = generateToken({
            userId: decoded.userId,
            email: decoded.email,
            roleId: decoded.roleId,
        });

        return successResponse(res, { token: newToken }, 'Token refreshed successfully');
    } catch (error) {
        return unauthorizedResponse(res, 'Invalid refresh token');
    }
});
// Fix admin password (TEMPORARY)
export const fixAdmin = asyncHandler(async (_req: Request, res: Response) => {
    const email = 'admin@ninjapark.com';
    const password = 'admin123';

    const hashedPassword = await hashPassword(password);

    const user = await prisma.adminUser.update({
        where: { email },
        data: { password: hashedPassword },
    });

    return successResponse(res, { user }, 'Admin password reset');
});
