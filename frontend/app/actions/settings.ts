"use server";

import { fetchAPI } from "../lib/server-api";
import { requirePermission } from "../lib/admin-auth";
import { logActivity } from "../lib/audit-log";
import { revalidatePath } from "next/cache";

export async function getSettings() {
    // Public function - no auth required (used in public layout)
    try {
        const res = await fetchAPI("/core/settings/");
        if (!res || !res.ok) return null;
        const data = await res.json();
        // Assuming settings is a singleton, get first item
        return data[0] || null;
    } catch (error) {
        console.error('Failed to fetch settings:', error);
        return null;
    }
}

export async function updateSettings(id: string, data: any) {
    await requirePermission('settings', 'write');

    // Transform camelCase to snake_case for specific fields
    const payload: any = { ...data };
    if (data.parkName) {
        payload.park_name = data.parkName;
        delete payload.parkName;
    }
    if (data.contactPhone) {
        payload.contact_phone = data.contactPhone;
        delete payload.contactPhone;
    }
    if (data.contactEmail) {
        payload.contact_email = data.contactEmail;
        delete payload.contactEmail;
    }
    if (data.mapUrl) {
        payload.map_url = data.mapUrl;
        delete payload.mapUrl;
    }
    if (data.openingHours) {
        payload.opening_hours = data.openingHours;
        delete payload.openingHours;
    }
    if (data.marqueeText) {
        payload.marquee_text = data.marqueeText;
        delete payload.marqueeText;
    }
    if (data.aboutText) {
        payload.about_text = data.aboutText;
        delete payload.aboutText;
    }
    if (data.heroTitle) {
        payload.hero_title = data.heroTitle;
        delete payload.heroTitle;
    }
    if (data.heroSubtitle) {
        payload.hero_subtitle = data.heroSubtitle;
        delete payload.heroSubtitle;
    }
    if (data.gstNumber) {
        payload.gst_number = data.gstNumber;
        delete payload.gstNumber;
    }
    if (data.sessionDuration) {
        payload.session_duration = data.sessionDuration;
        delete payload.sessionDuration;
    }
    if (data.adultPrice) {
        payload.adult_price = data.adultPrice;
        delete payload.adultPrice;
    }
    if (data.childPrice) {
        payload.child_price = data.childPrice;
        delete payload.childPrice;
    }
    if (data.onlineBookingEnabled !== undefined) {
        payload.online_booking_enabled = data.onlineBookingEnabled;
        delete payload.onlineBookingEnabled;
    }
    if (data.partyBookingsEnabled !== undefined) {
        payload.party_bookings_enabled = data.partyBookingsEnabled;
        delete payload.partyBookingsEnabled;
    }
    if (data.maintenanceMode !== undefined) {
        payload.maintenance_mode = data.maintenanceMode;
        delete payload.maintenanceMode;
    }
    if (data.waiverRequired !== undefined) {
        payload.waiver_required = data.waiverRequired;
        delete payload.waiverRequired;
    }

    const res = await fetchAPI(`/core/settings/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });

    if (!res || !res.ok) return { success: false };

    await logActivity({
        action: 'UPDATE',
        entity: 'SETTINGS',
        entityId: id,
        details: { changes: Object.keys(data) }
    });

    revalidatePath('/admin/settings');
    revalidatePath('/');
    return { success: true };
}
