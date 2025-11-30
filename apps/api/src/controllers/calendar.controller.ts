import { Request, Response } from 'express';
import { prisma } from '@repo/database';
import { successResponse, errorResponse, createdResponse } from '../utils/response.util';
import { asyncHandler } from '../middlewares/error.middleware';
import { CONSTANTS } from '../config/constants';

// Get booking blocks
export const getBookingBlocks = asyncHandler(async (_req: Request, res: Response) => {
    const blocks = await prisma.bookingBlock.findMany({
        orderBy: { startDate: 'desc' },
    });

    return successResponse(res, blocks);
});

// Create booking block
export const createBookingBlock = asyncHandler(async (req: Request, res: Response) => {
    const { startDate, endDate, reason, type, recurring } = req.body;

    const block = await prisma.bookingBlock.create({
        data: {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            reason,
            type,
            recurring: recurring || false,
        },
    });

    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.CREATE,
                entity: 'BOOKING_BLOCK',
                entityId: block.id,
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    return createdResponse(res, block, 'Booking block created successfully');
});

// Update booking block
export const updateBookingBlock = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    if (updates.startDate) updates.startDate = new Date(updates.startDate);
    if (updates.endDate) updates.endDate = new Date(updates.endDate);

    const block = await prisma.bookingBlock.update({
        where: { id },
        data: updates,
    });

    return successResponse(res, block, 'Booking block updated successfully');
});

// Delete booking block
export const deleteBookingBlock = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.bookingBlock.delete({ where: { id } });

    return successResponse(res, null, 'Booking block deleted successfully');
});

// Check availability
export const checkAvailability = asyncHandler(async (req: Request, res: Response) => {
    const { date, time } = req.query;

    if (!date || !time) {
        return errorResponse(res, 'Date and time are required', 400);
    }

    const requestedDate = new Date(date as string);

    // Check for booking blocks
    const blocks = await prisma.bookingBlock.findMany({
        where: {
            startDate: { lte: requestedDate },
            endDate: { gte: requestedDate },
        },
    });

    if (blocks.length > 0) {
        return successResponse(res, {
            available: false,
            reason: 'Date is blocked',
            blocks,
        });
    }

    // Check existing bookings for capacity
    const existingBookings = await prisma.booking.findMany({
        where: {
            date: date as string,
            time: time as string,
            bookingStatus: { in: ['PENDING', 'CONFIRMED'] },
        },
    });

    const totalGuests = existingBookings.reduce((sum, booking) => {
        return sum + booking.adults + booking.kids + booking.spectators;
    }, 0);

    // Assume max capacity of 100 (configurable via settings)
    const maxCapacity = 100;
    const available = totalGuests < maxCapacity;

    return successResponse(res, {
        available,
        currentCapacity: totalGuests,
        maxCapacity,
        remainingSlots: maxCapacity - totalGuests,
    });
});
