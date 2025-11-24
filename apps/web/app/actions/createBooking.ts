"use server";

import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: any) {
    try {
        const {
            date,
            time,
            duration,
            adults,
            kids,
            spectators,
            name,
            email,
            phone,
        } = formData;

        // Calculate amount (server-side validation recommended, but using client values for now for simplicity)
        // Ideally, recalculate based on prices
        const kidPrice = 500;
        const adultPrice = 899;
        const spectatorPrice = 150;

        let subtotal = (kids * kidPrice) + (adults * adultPrice) + (spectators * spectatorPrice);

        if (duration === "120") {
            subtotal += (kids + adults) * 500;
        }

        const gst = subtotal * 0.18;
        const totalAmount = subtotal + gst;

        const booking = await prisma.booking.create({
            data: {
                name,
                email,
                phone,
                date,
                time,
                duration,
                adults,
                kids,
                spectators,
                amount: totalAmount,
                status: "CONFIRMED", // Auto-confirm for now
            },
        });

        console.log("Booking created:", booking);

        // In a real app, send email here

        revalidatePath("/admin"); // Revalidate admin dashboard if possible, though it's a separate app (won't work directly across apps via revalidatePath usually, but good practice)

        return { success: true, bookingId: booking.id };
    } catch (error) {
        console.error("Failed to create booking:", error);
        return { success: false, error: "Failed to create booking" };
    }
}
