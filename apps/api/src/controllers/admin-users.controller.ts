import { Request, Response } from 'express';
import { prisma } from '@repo/database';
import { successResponse, createdResponse, notFoundResponse } from '../utils/response.util';
import { asyncHandler } from '../middlewares/error.middleware';
import { getPaginationParams, getPaginationMeta } from '../utils/pagination.util';
import { hashPassword } from '../utils/password.util';

export const getAllAdminUsers = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.query;
    const { skip, take, page: currentPage, limit: currentLimit } = getPaginationParams(page as string, limit as string);

    const [users, total] = await Promise.all([
        prisma.adminUser.findMany({
            skip,
            take,
            include: { role: true },
            select: { id: true, name: true, email: true, roleId: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.adminUser.count(),
    ]);

    const meta = getPaginationMeta(currentPage, currentLimit, total);
    return successResponse(res, users, undefined, 200, meta);
});

export const getAdminUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await prisma.adminUser.findUnique({
        where: { id: req.params.id },
        include: { role: true },
        select: { id: true, name: true, email: true, roleId: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
    });

    if (!user) return notFoundResponse(res, 'Admin user not found');
    return successResponse(res, user);
});

export const createAdminUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, roleId } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await prisma.adminUser.create({
        data: { name, email: email.toLowerCase(), password: hashedPassword, roleId },
        select: { id: true, name: true, email: true, roleId: true, isActive: true, createdAt: true },
    });

    return createdResponse(res, user, 'Admin user created successfully');
});

export const updateAdminUser = asyncHandler(async (req: Request, res: Response) => {
    const { password, ...updates } = req.body;

    if (password) {
        updates.password = await hashPassword(password);
    }

    const user = await prisma.adminUser.update({
        where: { id: req.params.id },
        data: updates,
        select: { id: true, name: true, email: true, roleId: true, isActive: true, createdAt: true },
    });

    return successResponse(res, user, 'Admin user updated successfully');
});

export const deleteAdminUser = asyncHandler(async (req: Request, res: Response) => {
    await prisma.adminUser.delete({ where: { id: req.params.id } });
    return successResponse(res, null, 'Admin user deleted successfully');
});

export const getAllRoles = asyncHandler(async (req: Request, res: Response) => {
    const roles = await prisma.role.findMany();
    return successResponse(res, roles);
});
