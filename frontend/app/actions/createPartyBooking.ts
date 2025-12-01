"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function createPartyBooking(formData: any) {
    try {
        const {
            date,
            time,
            participants,
            spectators,
            name,
            email,
            phone,
            childName,
            childAge,
            specialRequests,
        } = formData;

        // Party pricing calculation
        const participantPrice = 1500;
        const extraSpectatorPrice = 100;

        // First 10 spectators are free, charge for additional
        const freeSpectators = 10;
        const chargeableSpectators = Math.max(0, spectators - freeSpectators);

        const participantCost = participants * participantPrice;
        const spectatorCost = chargeableSpectators * extraSpectatorPrice;
        const subtotal = participantCost + spectatorCost;
        const gst = subtotal * 0.18;
        const totalAmount = subtotal + gst;

        // Create booking via Django API
        const bookingPayload = {
            name,
            email,
            phone,
            date,
            time,
            duration: 120, // Party is 2 hours
            adults: 0, // Not used for parties
            kids: participants,
            spectators,
            subtotal,
            amount: totalAmount,
            discount_amount: 0,
            status: "PENDING", // Requires 50% deposit
            booking_status: "PENDING",
            payment_status: "PENDING",
            waiver_status: "PENDING",
            type: "PARTY",
        };

        const bookingRes = await fetch(`${API_URL}/bookings/bookings/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingPayload)
        });

        if (!bookingRes.ok) {
            const error = await bookingRes.json();
            return { success: false, error: error.detail || "Failed to create party booking" };
        }

        const booking = await bookingRes.json();

        console.log("Party booking created:", booking);

        // TODO: Send confirmation email with party details and payment link
        // TODO: Generate online party invitations

        revalidatePath("/admin");
        revalidatePath("/admin/bookings");

        return {
            success: true,
            bookingId: booking.uuid || booking.id,
            amount: totalAmount,
            depositAmount: totalAmount * 0.5 // 50% deposit
        };
    } catch (error) {
        console.error("Failed to create party booking:", error);
        return { success: false, error: "Failed to create party booking" };
    }
}
