import { Request, Response } from 'express';
import { prisma } from '@repo/database';
import { successResponse, createdResponse, notFoundResponse } from '../utils/response.util';
import { asyncHandler } from '../middlewares/error.middleware';
import { getPaginationParams, getPaginationMeta } from '../utils/pagination.util';
import { CONSTANTS } from '../config/constants';

export const getAllCustomers = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, search } = req.query;

    const { skip, take, page: currentPage, limit: currentLimit } = getPaginationParams(
        page as string,
        limit as string
    );

    const where: any = {};
    if (search) {
        where.OR = [
            { name: { contains: search as string } },
            { email: { contains: search as string } },
            { phone: { contains: search as string } },
        ];
    }

    const [customers, total] = await Promise.all([
        prisma.customer.findMany({
            where,
            skip,
            take,
            include: {
                _count: {
                    select: { bookings: true, waivers: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.customer.count({ where }),
    ]);

    const meta = getPaginationMeta(currentPage, currentLimit, total);

    return successResponse(res, customers, undefined, 200, meta);
});

export const getCustomerById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const customer = await prisma.customer.findUnique({
        where: { id },
        include: {
            bookings: { orderBy: { createdAt: 'desc' } },
            waivers: { orderBy: { signedAt: 'desc' } },
        },
    });

    if (!customer) {
        return notFoundResponse(res, 'Customer not found');
    }

    return successResponse(res, customer);
});

export const createCustomer = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, notes } = req.body;

    const customer = await prisma.customer.create({
        data: {
            name,
            email: email.toLowerCase(),
            phone,
            notes,
        },
    });

    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.CREATE,
                entity: 'CUSTOMER',
                entityId: customer.id,
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    return createdResponse(res, customer, 'Customer created successfully');
});

export const updateCustomer = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const customer = await prisma.customer.update({
        where: { id },
        data: updates,
    });

    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.UPDATE,
                entity: 'CUSTOMER',
                entityId: id,
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    return successResponse(res, customer, 'Customer updated successfully');
});

export const deleteCustomer = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.customer.delete({ where: { id } });

    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.DELETE,
                entity: 'CUSTOMER',
                entityId: id,
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    return successResponse(res, null, 'Customer deleted successfully');
});

export const getCustomerBookings = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const bookings = await prisma.booking.findMany({
        where: { customerId: id },
        orderBy: { createdAt: 'desc' },
    });

    return successResponse(res, bookings);
});

export const getCustomerWaivers = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const waivers = await prisma.waiver.findMany({
        where: { customerId: id },
        orderBy: { signedAt: 'desc' },
    });

    return successResponse(res, waivers);
});
