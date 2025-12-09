"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchAPI } from "../lib/server-api";

// --- Helper Functions ---

// Transform Django snake_case to camelCase for Booking
function transformBooking(b: any) {
    if (!b) return null;
    const customer = b.customer_details ? transformCustomer(b.customer_details) : null;
    return {
        ...b,
        bookingStatus: b.booking_status || b.status,
        waiverStatus: b.waiver_status,
        paymentStatus: b.payment_status,
        createdAt: b.created_at,
        updatedAt: b.updated_at,
        voucherCode: b.voucher_code,
        discountAmount: b.discount_amount,
        // Party booking specific fields
        packageName: b.package_name,
        birthdayChildName: b.birthday_child_name,
        birthdayChildAge: b.birthday_child_age,
        waiverSigned: b.waiver_signed,
        waiverSignedAt: b.waiver_signed_at,
        waiverIpAddress: b.waiver_ip_address,
        // Add flat customer properties for easy access
        customerName: customer?.name || b.name || null,
        customerEmail: customer?.email || b.email || null,
        customerPhone: customer?.phone || b.phone || null,
        customer: customer,
        waivers: b.waivers?.map(transformWaiver) || [],
        transactions: b.transactions || [],
        // Default values for missing fields
        duration: b.duration || 120, // Default 2 hours for party bookings
        spectators: b.spectators || 0,
    };
}

function transformCustomer(c: any) {
    if (!c) return null;
    return {
        ...c,
        createdAt: c.created_at,
        updatedAt: c.updated_at,
        _count: c._count || { bookings: 0 }
    };
}

function transformWaiver(w: any) {
    if (!w) return null;
    return {
        ...w,
        signedAt: w.signed_at,
        fileUrl: w.file_url,
        emergencyContact: w.emergency_contact,
        booking: w.booking_details ? transformBooking(w.booking_details) : null
    };
}

function transformBookingBlock(b: any) {
    if (!b) return null;
    return {
        ...b,
        startDate: b.start_date,
        endDate: b.end_date,
        createdAt: b.created_at,
        updatedAt: b.updated_at
    };
}

// --- Auth Actions ---

export async function loginAdmin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email and password are required" };
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace('/v1', '') || 'http://localhost:8000/api'}/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            return { error: "Invalid credentials" };
        }

        const data = await res.json();
        const token = data.access;

        cookies().set("admin_token", token, {
            httpOnly: true, // Keep secure
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
            sameSite: "lax"
        });

    } catch (error) {
        console.error("Login error:", error);
        return { error: "Something went wrong" };
    }

    redirect("/admin");
}

export async function logoutAdmin() {
    cookies().delete("admin_token");
    redirect("/admin/login");
}

// --- Dashboard Actions ---

export async function getDashboardStats() {
    const res = await fetchAPI("/core/dashboard/stats/");
    if (!res || !res.ok) throw new Error("Unauthorized or Failed to fetch stats");
    return await res.json();
}

export async function getAllBookings(filter?: { type?: string; status?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filter?.type) params.append("type", filter.type);
    if (filter?.status) params.append("status", filter.status);
    if (filter?.search) params.append("search", filter.search);

    const res = await fetchAPI(`/core/dashboard/all_bookings/?${params.toString()}`);
    if (!res || !res.ok) return [];

    const data = await res.json();
    return data.results || [];
}

// --- Booking Actions ---

export async function getBookings(filter?: { status?: string; date?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filter?.status) params.append("booking_status", filter.status);
    if (filter?.date) params.append("date", filter.date);
    if (filter?.search) params.append("search", filter.search);

    const res = await fetchAPI(`/bookings/bookings/?${params.toString()}`);
    if (!res || !res.ok) return [];

    const data = await res.json();
    return data.map(transformBooking);
}

export async function getPartyBookings(filter?: { status?: string; date?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filter?.status) params.append("booking_status", filter.status);
    if (filter?.date) params.append("date", filter.date);
    if (filter?.search) params.append("search", filter.search);

    const res = await fetchAPI(`/bookings/party-bookings/?${params.toString()}`);
    if (!res || !res.ok) return [];

    const data = await res.json();
    return data.map(transformBooking);
}

export async function getPartyBookingById(id: string) {
    const res = await fetchAPI(`/bookings/party-bookings/${id}/`);
    if (!res || !res.ok) return null;
    const data = await res.json();
    return transformBooking(data);
}

export async function updatePartyBookingStatus(id: string, status: string) {
    const res = await fetchAPI(`/bookings/party-bookings/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ booking_status: status })
    });

    if (res && res.ok) {
        revalidatePath("/admin/party-bookings");
        revalidatePath(`/admin/party-bookings/${id}`);
    }
}

export async function deletePartyBooking(id: string) {
    const res = await fetchAPI(`/bookings/party-bookings/${id}/`, {
        method: "DELETE"
    });

    if (res && res.ok) {
        revalidatePath("/admin/party-bookings");
    }

    return res?.ok;
}

export async function resendPartyBookingEmail(id: string) {
    const res = await fetchAPI(`/bookings/party-bookings/${id}/resend_confirmation_email/`, {
        method: "POST"
    });

    if (res && res.ok) {
        const data = await res.json();
        return { success: true, message: data.message };
    }

    return { success: false, message: "Failed to send email" };
}

export async function updatePartyBooking(id: string, data: any) {
    const res = await fetchAPI(`/bookings/party-bookings/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data)
    });

    if (res && res.ok) {
        revalidatePath("/admin/party-bookings");
        revalidatePath(`/admin/party-bookings/${id}`);
        return { success: true };
    }

    // Try to get error message if available
    const errorData = await res?.json().catch(() => ({}));
    return { success: false, error: errorData.detail || "Failed to update booking" };
}

export async function getSessionBookings(filter?: { status?: string; date?: string; search?: string }) {
    const params = new URLSearchParams();
    params.append("type", "SESSION");
    if (filter?.status) params.append("booking_status", filter.status);
    if (filter?.date) params.append("date", filter.date);
    if (filter?.search) params.append("search", filter.search);

    const res = await fetchAPI(`/bookings/bookings/?${params.toString()}`);
    if (!res || !res.ok) return [];

    const data = await res.json();
    return data.map(transformBooking);
}

export async function updateBookingStatus(id: string, status: string) {
    const res = await fetchAPI(`/bookings/bookings/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ booking_status: status })
    });

    if (res && res.ok) {
        revalidatePath("/admin/bookings");
        revalidatePath(`/admin/bookings/${id}`);
    }
}

export async function deleteBooking(id: string) {
    const res = await fetchAPI(`/bookings/bookings/${id}/`, {
        method: "DELETE"
    });

    if (res && res.ok) {
        revalidatePath("/admin/bookings");
    }

    return res?.ok;
}

export async function updateBookingDetails(id: string, data: { date?: string; time?: string; guests?: number; amount?: number }) {
    const res = await fetchAPI(`/bookings/bookings/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data)
    });

    if (res && res.ok) {
        revalidatePath("/admin/bookings");
        revalidatePath(`/admin/bookings/${id}`);
    }
}

export async function getBookingById(id: string) {
    const res = await fetchAPI(`/bookings/bookings/${id}/`);
    if (!res || !res.ok) return null;
    const data = await res.json();
    return transformBooking(data);
}

// --- Waiver Actions ---

export async function verifyWaiver(id: string) {
    const res = await fetchAPI(`/bookings/waivers/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ is_verified: true })
    });

    if (res && res.ok) {
        revalidatePath("/admin/waivers");
        return { success: true };
    }
    return { success: false };
}

export async function getWaivers(search?: string) {
    const params = new URLSearchParams();
    if (search) params.append("search", search);

    const res = await fetchAPI(`/bookings/waivers/?${params.toString()}`);
    if (!res || !res.ok) return [];

    const data = await res.json();
    return data.map(transformWaiver);
}

// --- Customer Actions ---

export async function updateCustomerDetails(id: string, data: { name?: string; email?: string; phone?: string }) {
    const res = await fetchAPI(`/bookings/customers/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data)
    });

    if (res && res.ok) {
        revalidatePath("/admin/customers");
    }
}

export async function getCustomers(search?: string) {
    const params = new URLSearchParams();
    if (search) params.append("search", search);

    const res = await fetchAPI(`/bookings/customers/?${params.toString()}`);
    if (!res || !res.ok) return [];

    const data = await res.json();
    return data.map(transformCustomer);
}

export async function getCustomerById(id: string) {
    const res = await fetchAPI(`/bookings/customers/${id}/`);
    if (!res || !res.ok) return null;
    const data = await res.json();
    return transformCustomer(data);
}

export async function getWaiverById(id: string) {
    const res = await fetchAPI(`/bookings/waivers/${id}/`);
    if (!res || !res.ok) return null;
    const data = await res.json();
    return transformWaiver(data);
}

// --- Booking Block Actions ---

export async function getBookingBlocks() {
    const res = await fetchAPI("/bookings/booking-blocks/");
    if (!res || !res.ok) return [];

    const data = await res.json();
    return data.map(transformBookingBlock);
}

export async function createBookingBlock(data: { startDate: Date; endDate: Date; reason: string; type: string; recurring: boolean }) {
    const payload = {
        start_date: data.startDate,
        end_date: data.endDate,
        reason: data.reason,
        type: data.type,
        recurring: data.recurring
    };

    const res = await fetchAPI("/bookings/booking-blocks/", {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (res && res.ok) {
        revalidatePath("/admin/booking-blocks");
    }
}

export async function updateBookingBlock(id: string, data: { startDate: Date; endDate: Date; reason: string; type: string; recurring: boolean }) {
    const payload = {
        start_date: data.startDate,
        end_date: data.endDate,
        reason: data.reason,
        type: data.type,
        recurring: data.recurring
    };

    const res = await fetchAPI(`/bookings/booking-blocks/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });

    if (res && res.ok) {
        revalidatePath("/admin/booking-blocks");
    }
}

export async function deleteBookingBlock(id: string) {
    const res = await fetchAPI(`/bookings/booking-blocks/${id}/`, {
        method: "DELETE"
    });

    if (res && res.ok) {
        revalidatePath("/admin/booking-blocks");
    }
}
