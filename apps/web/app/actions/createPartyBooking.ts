"use server";

import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";

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

        // Store as regular booking with party-specific data in a JSON field or separate table
        // For now, using the existing Booking model
        const booking = await prisma.booking.create({
            data: {
                name,
                email,
                phone,
                date,
                time,
                duration: "120", // Party is 2 hours
                adults: 0, // Not used for parties
                kids: participants,
                spectators,
                amount: totalAmount,
                status: "PENDING", // Requires 50% deposit
            },
        });

        console.log("Party booking created:", booking);

        // TODO: Send confirmation email with party details and payment link
        // TODO: Generate online party invitations

        revalidatePath("/admin");

        return {
            success: true,
            bookingId: booking.id,
            amount: totalAmount,
            depositAmount: totalAmount * 0.5 // 50% deposit
        };
    } catch (error) {
        console.error("Failed to create party booking:", error);
        return { success: false, error: "Failed to create party booking" };
    }
}
