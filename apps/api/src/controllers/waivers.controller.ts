import { Request, Response } from 'express';
import { prisma } from '@repo/database';
import { successResponse, errorResponse, createdResponse, notFoundResponse } from '../utils/response.util';
import { asyncHandler } from '../middlewares/error.middleware';
import { getPaginationParams, getPaginationMeta } from '../utils/pagination.util';
import { CONSTANTS } from '../config/constants';
import logger from '../middlewares/logger.middleware';

// Get all waivers
export const getAllWaivers = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, bookingId, search } = req.query;

    const { skip, take, page: currentPage, limit: currentLimit } = getPaginationParams(
        page as string,
        limit as string
    );

    const where: any = {};
    if (bookingId) where.bookingId = bookingId as string;
    if (search) {
        where.OR = [
            { name: { contains: search as string } },
            { email: { contains: search as string } },
        ];
    }

    const [waivers, total] = await Promise.all([
        prisma.waiver.findMany({
            where,
            skip,
            take,
            include: {
                booking: true,
                customer: true,
            },
            orderBy: { signedAt: 'desc' },
        }),
        prisma.waiver.count({ where }),
    ]);

    const meta = getPaginationMeta(currentPage, currentLimit, total);

    return successResponse(res, waivers, undefined, 200, meta);
});

// Get waiver by ID
export const getWaiverById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const waiver = await prisma.waiver.findUnique({
        where: { id },
        include: {
            booking: true,
            customer: true,
        },
    });

    if (!waiver) {
        return notFoundResponse(res, 'Waiver not found');
    }

    return successResponse(res, waiver);
});

// Create waiver
export const createWaiver = asyncHandler(async (req: Request, res: Response) => {
    const {
        name,
        email,
        phone,
        dob,
        emergencyContact,
        minors,
        adults,
        bookingId,
        customerId,
    } = req.body;

    const waiver = await prisma.waiver.create({
        data: {
            name,
            email: email.toLowerCase(),
            phone,
            dob,
            emergencyContact,
            minors: minors ? JSON.stringify(minors) : null,
            adults: adults ? JSON.stringify(adults) : null,
            version: '1.0',
            bookingId,
            customerId,
        },
    });

    // Log activity
    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.CREATE,
                entity: 'WAIVER',
                entityId: waiver.id,
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    logger.info(`Waiver created: ${waiver.id}`);

    return createdResponse(res, waiver, 'Waiver created successfully');
});

// Update waiver
export const updateWaiver = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const waiver = await prisma.waiver.findUnique({ where: { id } });

    if (!waiver) {
        return notFoundResponse(res, 'Waiver not found');
    }

    const updatedWaiver = await prisma.waiver.update({
        where: { id },
        data: updates,
    });

    // Log activity
    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.UPDATE,
                entity: 'WAIVER',
                entityId: id,
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    return successResponse(res, updatedWaiver, 'Waiver updated successfully');
});

// Upload signature
export const uploadSignature = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!req.file) {
        return errorResponse(res, 'No file uploaded', 400);
    }

    const fileUrl = `/uploads/waivers/${req.file.filename}`;

    const waiver = await prisma.waiver.update({
        where: { id },
        data: { fileUrl },
    });

    logger.info(`Signature uploaded for waiver: ${id}`);

    return successResponse(res, waiver, 'Signature uploaded successfully');
});

// Get adult waivers
export const getAdultWaivers = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.query;

    const { skip, take, page: currentPage, limit: currentLimit } = getPaginationParams(
        page as string,
        limit as string
    );

    const [waivers, total] = await Promise.all([
        prisma.waiver.findMany({
            where: {
                minors: null,
            },
            skip,
            take,
            orderBy: { signedAt: 'desc' },
        }),
        prisma.waiver.count({
            where: { minors: null },
        }),
    ]);

    const meta = getPaginationMeta(currentPage, currentLimit, total);

    return successResponse(res, waivers, undefined, 200, meta);
});

// Get minor waivers
export const getMinorWaivers = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.query;

    const { skip, take, page: currentPage, limit: currentLimit } = getPaginationParams(
        page as string,
        limit as string
    );

    const [waivers, total] = await Promise.all([
        prisma.waiver.findMany({
            where: {
                minors: { not: null },
            },
            skip,
            take,
            orderBy: { signedAt: 'desc' },
        }),
        prisma.waiver.count({
            where: { minors: { not: null } },
        }),
    ]);

    const meta = getPaginationMeta(currentPage, currentLimit, total);

    return successResponse(res, waivers, undefined, 200, meta);
});
