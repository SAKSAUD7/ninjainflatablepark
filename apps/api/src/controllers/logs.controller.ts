import { Request, Response } from 'express';
import { prisma } from '@repo/database';
import { successResponse } from '../utils/response.util';
import { asyncHandler } from '../middlewares/error.middleware';
import { getPaginationParams, getPaginationMeta } from '../utils/pagination.util';

export const getAllLogs = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, adminId, entity, action } = req.query;
    const { skip, take, page: currentPage, limit: currentLimit } = getPaginationParams(page as string, limit as string);

    const where: any = {};
    if (adminId) where.adminId = adminId as string;
    if (entity) where.entity = entity as string;
    if (action) where.action = action as string;

    const [logs, total] = await Promise.all([
        prisma.auditLog.findMany({
            where,
            skip,
            take,
            include: { admin: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.auditLog.count({ where }),
    ]);

    const meta = getPaginationMeta(currentPage, currentLimit, total);
    return successResponse(res, logs, undefined, 200, meta);
});

export const getLogById = asyncHandler(async (req: Request, res: Response) => {
    const log = await prisma.auditLog.findUnique({
        where: { id: req.params.id },
        include: { admin: { select: { id: true, name: true, email: true } } },
    });

    return successResponse(res, log);
});
