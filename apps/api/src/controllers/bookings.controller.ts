import { Request, Response } from 'express';
import { prisma } from '@repo/database';
import { successResponse, errorResponse, createdResponse, notFoundResponse } from '../utils/response.util';
import { asyncHandler } from '../middlewares/error.middleware';
import { getPaginationParams, getPaginationMeta } from '../utils/pagination.util';
import { CONSTANTS } from '../config/constants';
import QRCode from 'qrcode';
import logger from '../middlewares/logger.middleware';

// Get all bookings
export const getAllBookings = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, type, status, date, search } = req.query;

    const { skip, take, page: currentPage, limit: currentLimit } = getPaginationParams(
        page as string,
        limit as string
    );

    // Build where clause
    const where: any = {};

    if (type) where.type = type as string;
    if (status) where.bookingStatus = status as string;
    if (date) where.date = date as string;
    if (search) {
        where.OR = [
            { name: { contains: search as string } },
            { email: { contains: search as string } },
            { phone: { contains: search as string } },
        ];
    }

    // Get bookings
    const [bookings, total] = await Promise.all([
        prisma.booking.findMany({
            where,
            skip,
            take,
            include: {
                customer: true,
                voucher: true,
                waivers: true,
            },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.booking.count({ where }),
    ]);

    const meta = getPaginationMeta(currentPage, currentLimit, total);

    return successResponse(res, bookings, undefined, 200, meta);
});

// Get booking by ID
export const getBookingById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
        where: { id },
        include: {
            customer: true,
            voucher: true,
            waivers: true,
            transactions: true,
        },
    });

    if (!booking) {
        return notFoundResponse(res, 'Booking not found');
    }

    return successResponse(res, booking);
});

// Create booking
export const createBooking = asyncHandler(async (req: Request, res: Response) => {
    const {
        name,
        email,
        phone,
        date,
        time,
        duration,
        adults,
        kids,
        spectators,
        voucherCode,
        type = 'SESSION',
    } = req.body;

    // Calculate amount
    let subtotal = (kids * CONSTANTS.PRICING.CHILD) +
        (adults * CONSTANTS.PRICING.ADULT) +
        (spectators * CONSTANTS.PRICING.SPECTATOR);

    if (duration === '120') {
        subtotal += (kids + adults) * CONSTANTS.PRICING.EXTRA_HOUR;
    }

    const gst = subtotal * CONSTANTS.PRICING.GST_RATE;
    let totalAmount = subtotal + gst;
    let discountAmount = 0;
    let voucherId = null;

    // Apply voucher if provided
    if (voucherCode) {
        const voucher = await prisma.voucher.findUnique({
            where: { code: voucherCode },
        });

        if (voucher && voucher.isActive) {
            if (!voucher.expiryDate || new Date(voucher.expiryDate) >= new Date()) {
                if (!voucher.usageLimit || voucher.usedCount < voucher.usageLimit) {
                    if (!voucher.minOrderAmount || subtotal >= voucher.minOrderAmount) {
                        if (voucher.discountType === 'PERCENTAGE') {
                            discountAmount = (subtotal * voucher.discountValue) / 100;
                        } else {
                            discountAmount = voucher.discountValue;
                        }

                        discountAmount = Math.min(discountAmount, totalAmount);
                        totalAmount -= discountAmount;
                        voucherId = voucher.id;

                        await prisma.voucher.update({
                            where: { id: voucher.id },
                            data: { usedCount: { increment: 1 } },
                        });
                    }
                }
            }
        }
    }

    // Create booking
    const booking = await prisma.booking.create({
        data: {
            name,
            email: email.toLowerCase(),
            phone,
            date,
            time,
            duration,
            adults,
            kids,
            spectators,
            amount: totalAmount,
            subtotal,
            discountAmount,
            voucherCode,
            voucherId,
            type,
            bookingStatus: 'CONFIRMED',
            paymentStatus: 'PENDING',
            waiverStatus: 'PENDING',
        },
    });

    // Generate QR Code
    const qrData = JSON.stringify({
        id: booking.id,
        name: booking.name,
        date: booking.date,
        time: booking.time,
        guests: booking.adults + booking.kids + booking.spectators,
    });

    const qrCode = await QRCode.toDataURL(qrData, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 300,
        margin: 2,
    });

    await prisma.booking.update({
        where: { id: booking.id },
        data: { qrCode },
    });

    // Log activity
    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.CREATE,
                entity: 'BOOKING',
                entityId: booking.id,
                details: JSON.stringify({ bookingId: booking.id, type }),
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    logger.info(`Booking created: ${booking.id}`);

    return createdResponse(res, booking, 'Booking created successfully');
});

// Update booking
export const updateBooking = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
        return notFoundResponse(res, 'Booking not found');
    }

    const updatedBooking = await prisma.booking.update({
        where: { id },
        data: updates,
    });

    // Log activity
    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.UPDATE,
                entity: 'BOOKING',
                entityId: id,
                details: JSON.stringify({ before: booking, after: updatedBooking }),
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    logger.info(`Booking updated: ${id}`);

    return successResponse(res, updatedBooking, 'Booking updated successfully');
});

// Delete booking
export const deleteBooking = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
        return notFoundResponse(res, 'Booking not found');
    }

    await prisma.booking.delete({ where: { id } });

    // Log activity
    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.DELETE,
                entity: 'BOOKING',
                entityId: id,
                details: JSON.stringify(booking),
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    logger.info(`Booking deleted: ${id}`);

    return successResponse(res, null, 'Booking deleted successfully');
});

// Update booking status
export const updateBookingStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { bookingStatus, paymentStatus, waiverStatus } = req.body;

    const updates: any = {};
    if (bookingStatus) updates.bookingStatus = bookingStatus;
    if (paymentStatus) updates.paymentStatus = paymentStatus;
    if (waiverStatus) updates.waiverStatus = waiverStatus;

    const booking = await prisma.booking.update({
        where: { id },
        data: updates,
    });

    // Log activity
    if (req.user) {
        await prisma.auditLog.create({
            data: {
                adminId: req.user.id,
                action: CONSTANTS.AUDIT_ACTIONS.UPDATE,
                entity: 'BOOKING',
                entityId: id,
                details: JSON.stringify({ statusUpdate: updates }),
                ipAddress: req.ip,
                userAgent: req.get('user-agent'),
            },
        });
    }

    return successResponse(res, booking, 'Booking status updated');
});

// Get dashboard stats
export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
        totalBookings,
        todayBookings,
        pendingBookings,
        confirmedBookings,
        totalRevenue,
        pendingWaivers,
    ] = await Promise.all([
        prisma.booking.count(),
        prisma.booking.count({
            where: {
                createdAt: { gte: today },
            },
        }),
        prisma.booking.count({
            where: { bookingStatus: 'PENDING' },
        }),
        prisma.booking.count({
            where: { bookingStatus: 'CONFIRMED' },
        }),
        prisma.booking.aggregate({
            _sum: { amount: true },
            where: { paymentStatus: 'PAID' },
        }),
        prisma.waiver.count({
            where: { fileUrl: null },
        }),
    ]);

    const stats = {
        totalBookings,
        todayBookings,
        pendingBookings,
        confirmedBookings,
        totalRevenue: totalRevenue._sum.amount || 0,
        pendingWaivers,
    };

    return successResponse(res, stats);
});
