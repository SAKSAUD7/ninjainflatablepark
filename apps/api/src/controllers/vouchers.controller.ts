import { Request, Response } from 'express';
import { prisma } from '@repo/database';
import { successResponse, errorResponse, createdResponse, notFoundResponse } from '../utils/response.util';
import { asyncHandler } from '../middlewares/error.middleware';
import { getPaginationParams, getPaginationMeta } from '../utils/pagination.util';
import { CONSTANTS } from '../config/constants';

export const getAllVouchers = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, active } = req.query;

    const { skip, take, page: currentPage, limit: currentLimit } = getPaginationParams(
        page as string,
        limit as string
    );

    const where: any = {};
    if (active !== undefined) where.isActive = active === 'true';

    const [vouchers, total] = await Promise.all([
        prisma.voucher.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.voucher.count({ where }),
    ]);

    const meta = getPaginationMeta(currentPage, currentLimit, total);

    return successResponse(res, vouchers, undefined, 200, meta);
});

export const getVoucherById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const voucher = await prisma.voucher.findUnique({
        where: { id },
        include: {
            bookings: true,
        },
    });

    if (!voucher) {
        return notFoundResponse(res, 'Voucher not found');
    }

    return successResponse(res, voucher);
});

export const createVoucher = asyncHandler(async (req: Request, res: Response) => {
    const {
        code,
        discountType,
        discountValue,
        minOrderAmount,
        expiryDate,
        usageLimit,
        description,
    } = req.body;

    const voucher = await prisma.voucher.create({
        data: {
            code: code.toUpperCase(),
            discountType,
            discountValue,
            minOrderAmount,
            expiryDate: expiryDate ? new Date(expiryDate) : null,
            usageLimit,
            description,
            isActive: true,
        },
    });

    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.CREATE,
                entity: 'VOUCHER',
                entityId: voucher.id,
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    return createdResponse(res, voucher, 'Voucher created successfully');
});

export const updateVoucher = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    if (updates.expiryDate) {
        updates.expiryDate = new Date(updates.expiryDate);
    }

    const voucher = await prisma.voucher.update({
        where: { id },
        data: updates,
    });

    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.UPDATE,
                entity: 'VOUCHER',
                entityId: id,
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    return successResponse(res, voucher, 'Voucher updated successfully');
});

export const deleteVoucher = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.voucher.delete({ where: { id } });

    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.DELETE,
                entity: 'VOUCHER',
                entityId: id,
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    return successResponse(res, null, 'Voucher deleted successfully');
});

export const validateVoucher = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.body;

    if (!code) {
        return errorResponse(res, 'Voucher code is required', 400);
    }

    const voucher = await prisma.voucher.findUnique({
        where: { code: code.toUpperCase() },
    });

    if (!voucher) {
        return errorResponse(res, 'Invalid voucher code', 404);
    }

    if (!voucher.isActive) {
        return errorResponse(res, 'Voucher is inactive', 400);
    }

    if (voucher.expiryDate && new Date(voucher.expiryDate) < new Date()) {
        return errorResponse(res, 'Voucher has expired', 400);
    }

    if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
        return errorResponse(res, 'Voucher usage limit reached', 400);
    }

    return successResponse(res, {
        valid: true,
        voucher: {
            code: voucher.code,
            discountType: voucher.discountType,
            discountValue: voucher.discountValue,
            minOrderAmount: voucher.minOrderAmount,
        },
    }, 'Voucher is valid');
});

export const getVoucherUsage = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const voucher = await prisma.voucher.findUnique({
        where: { id },
        include: {
            bookings: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    amount: true,
                    discountAmount: true,
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
            },
        },
    });

    if (!voucher) {
        return notFoundResponse(res, 'Voucher not found');
    }

    return successResponse(res, {
        voucher,
        usageStats: {
            totalUsed: voucher.usedCount,
            usageLimit: voucher.usageLimit,
            remaining: voucher.usageLimit ? voucher.usageLimit - voucher.usedCount : null,
        },
    });
});
