"use server";

import { prisma } from "@repo/database";
import { cookies } from "next/headers";
import { signToken, comparePassword, hashPassword, getAdminSession } from "../lib/admin-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- Auth Actions ---

export async function loginAdmin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    // Temporary: Create default admin if none exists
    const adminCount = await prisma.adminUser.count();
    if (adminCount === 0) {
        const hashedPassword = await hashPassword("admin123");

        // Get SUPER_ADMIN role
        const superAdminRole = await prisma.role.findUnique({
            where: { name: "SUPER_ADMIN" }
        });

        await prisma.adminUser.create({
            data: {
                name: "Super Admin",
                email: "admin@ninja.com",
                password: hashedPassword,
                roleId: superAdminRole?.id
            },
        });
        console.log("Created default admin: admin@ninja.com / admin123");
    }

    const admin = await prisma.adminUser.findUnique({
        where: { email },
        include: { role: true }
    });

    if (!admin || !admin.isActive) {
        return { error: "Invalid credentials" };
    }

    const isValid = await comparePassword(password, admin.password);
    if (!isValid) {
        return { error: "Invalid credentials" };
    }

    // Update last login time
    await prisma.adminUser.update({
        where: { id: admin.id },
        data: { lastLoginAt: new Date() }
    });

    const token = await signToken({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role?.name || 'VIEWER',
        roleId: admin.roleId
    });

    cookies().set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
    });

    redirect("/admin");
}

export async function logoutAdmin() {
    cookies().delete("admin_token");
    redirect("/admin/login");
}

// --- Dashboard Actions ---

export async function getDashboardStats() {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [
        bookingsToday,
        totalBookings,
        sessionBookings,
        partyBookings,
        totalRevenue,
        pendingWaivers,
        totalWaivers,
        recentBookings,
        monthlyRevenue,
        totalCustomers,
        newCustomersMonth,
        activeVouchers,
        totalVoucherRedemptions,
        totalActivities,
        totalTestimonials,
        totalFaqs,
        totalBanners,
        avgBookingValue
    ] = await Promise.all([
        // Bookings
        prisma.booking.count({
            where: {
                date: today.toISOString().split('T')[0],
                status: { not: "CANCELLED" }
            }
        }),
        prisma.booking.count({ where: { status: { not: "CANCELLED" } } }),
        prisma.booking.count({
            where: {
                type: "SESSION",
                status: { not: "CANCELLED" }
            }
        }),
        prisma.booking.count({
            where: {
                type: "PARTY",
                status: { not: "CANCELLED" }
            }
        }),

        // Revenue
        prisma.booking.aggregate({
            _sum: { amount: true },
            where: { status: { not: "CANCELLED" } }
        }),

        // Waivers
        prisma.booking.count({
            where: { waiverStatus: "PENDING", status: { not: "CANCELLED" } }
        }),
        prisma.waiver.count(),

        // Recent bookings
        prisma.booking.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { customer: true }
        }),

        // Revenue chart
        prisma.booking.groupBy({
            by: ['date'],
            _sum: { amount: true },
            where: { status: { not: "CANCELLED" } },
            orderBy: { date: 'asc' },
            take: 7
        }),

        // Customers
        prisma.customer.count(),
        prisma.customer.count({
            where: {
                createdAt: { gte: firstDayOfMonth }
            }
        }),

        // Vouchers
        prisma.voucher.count({ where: { isActive: true } }),
        prisma.voucher.aggregate({
            _sum: { usedCount: true }
        }),

        // Content
        prisma.activity.count({ where: { active: true } }),
        prisma.testimonial.count({ where: { active: true } }),
        prisma.faq.count({ where: { active: true } }),
        prisma.banner.count({ where: { active: true } }),

        // Average booking value
        prisma.booking.aggregate({
            _avg: { amount: true },
            where: { status: { not: "CANCELLED" } }
        })
    ]);

    // Calculate waiver completion rate (all waivers in DB are signed)
    const signedWaivers = totalWaivers;
    const waiverCompletionRate = totalWaivers > 0
        ? Math.round((signedWaivers / totalWaivers) * 100)
        : 100;

    // Calculate repeat customers (customers with more than 1 booking)
    const customersWithBookings = await prisma.customer.findMany({
        include: {
            _count: {
                select: { bookings: true }
            }
        }
    });
    const repeatCustomers = customersWithBookings.filter(c => c._count.bookings > 1).length;

    return {
        bookingsToday,
        totalBookings,
        totalRevenue: totalRevenue._sum.amount || 0,
        pendingWaivers,
        recentBookings,
        monthlyRevenue: monthlyRevenue.map(item => ({
            name: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
            total: item._sum.amount || 0
        })),
        sessionBookings,
        partyBookings,
        totalCustomers,
        newCustomersMonth,
        repeatCustomers,
        activeVouchers,
        redeemedVouchers: totalVoucherRedemptions._sum.usedCount || 0,
        totalActivities,
        totalTestimonials,
        totalFaqs,
        totalBanners,
        avgBookingValue: Math.round(avgBookingValue._avg.amount || 0),
        waiverCompletionRate,
        totalWaivers,
        signedWaivers
    };
}

export async function getBookings(filter?: { status?: string; date?: string; search?: string }) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    const where: any = {};
    if (filter?.status) where.status = filter.status;
    if (filter?.date) where.date = filter.date;
    if (filter?.search) {
        where.OR = [
            { name: { contains: filter.search } },
            { email: { contains: filter.search } },
            { id: { contains: filter.search } }
        ];
    }

    return await prisma.booking.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { waivers: true }
    });
}

export async function getPartyBookings(filter?: { status?: string; date?: string; search?: string }) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    const where: any = { type: "PARTY" };
    if (filter?.status) where.status = filter.status;
    if (filter?.date) where.date = filter.date;
    if (filter?.search) {
        where.OR = [
            { name: { contains: filter.search } },
            { email: { contains: filter.search } },
            { id: { contains: filter.search } }
        ];
    }

    return await prisma.booking.findMany({
        where,
        orderBy: { date: 'asc' },
        include: { waivers: true }
    });
}

export async function getSessionBookings(filter?: { status?: string; date?: string; search?: string }) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    const where: any = { type: "SESSION" };
    if (filter?.status) where.status = filter.status;
    if (filter?.date) where.date = filter.date;
    if (filter?.search) {
        where.OR = [
            { name: { contains: filter.search } },
            { email: { contains: filter.search } },
            { id: { contains: filter.search } }
        ];
    }

    return await prisma.booking.findMany({
        where,
        orderBy: { date: 'asc' },
        include: { waivers: true }
    });
}

export async function updateBookingStatus(id: string, status: string) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    await prisma.booking.update({
        where: { id },
        data: { status }
    });

    revalidatePath("/admin/bookings");
}

export async function updateBookingDetails(id: string, data: { date?: string; time?: string; guests?: number; amount?: number }) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    await prisma.booking.update({
        where: { id },
        data
    });

    revalidatePath("/admin/bookings");
}

// --- Waiver Actions ---

export async function getWaivers(search?: string) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    const where: any = {};
    if (search) {
        where.OR = [
            { name: { contains: search } },
            { email: { contains: search } },
            { booking: { id: { contains: search } } } // Search by booking ID if needed
        ];
    }

    return await prisma.waiver.findMany({
        where,
        orderBy: { signedAt: 'desc' },
        include: { booking: true }
    });
}

// --- Customer Actions ---

export async function updateCustomerDetails(id: string, data: { name?: string; email?: string; phone?: string }) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    await prisma.customer.update({
        where: { id },
        data
    });

    revalidatePath("/admin/customers");
}

export async function getCustomers(search?: string) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    const where: any = {};
    if (search) {
        where.OR = [
            { name: { contains: search } },
            { email: { contains: search } },
            { phone: { contains: search } }
        ];
    }

    return await prisma.customer.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { bookings: true } } }
    });
}

// --- Booking Block Actions ---

export async function getBookingBlocks() {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    return await prisma.bookingBlock.findMany({
        orderBy: { startDate: 'asc' }
    });
}

export async function createBookingBlock(data: { startDate: Date; endDate: Date; reason: string; type: string; recurring: boolean }) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    await prisma.bookingBlock.create({
        data
    });

    revalidatePath("/admin/booking-blocks");
}

export async function updateBookingBlock(id: string, data: { startDate: Date; endDate: Date; reason: string; type: string; recurring: boolean }) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    await prisma.bookingBlock.update({
        where: { id },
        data
    });

    revalidatePath("/admin/booking-blocks");
}

export async function deleteBookingBlock(id: string) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    await prisma.bookingBlock.delete({
        where: { id }
    });

    revalidatePath("/admin/booking-blocks");
}

export async function deleteBooking(id: string) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    await prisma.booking.delete({
        where: { id }
    });

    revalidatePath("/admin/bookings");
    revalidatePath("/admin/session-bookings");
    revalidatePath("/admin/party-bookings");
}

export async function updateBooking(id: string, data: any) {
    const session = await getAdminSession();
    if (!session) throw new Error("Unauthorized");

    // Remove fields that shouldn't be updated directly or need formatting
    const { id: _, createdAt, updatedAt, ...updateData } = data;

    await prisma.booking.update({
        where: { id },
        data: updateData
    });

    revalidatePath("/admin/bookings");
    revalidatePath("/admin/session-bookings");
    revalidatePath("/admin/party-bookings");
    revalidatePath(`/admin/session-bookings/${id}`);
    revalidatePath(`/admin/party-bookings/${id}`);
}
