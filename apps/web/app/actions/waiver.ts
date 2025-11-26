"use server";

import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitWaiver(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const emergencyContact = formData.get("emergencyContact") as string;
    const bookingId = formData.get("bookingId") as string; // Optional

    if (!name || !email || !emergencyContact) {
        return { error: "Missing required fields" };
    }

    try {
        // Check if booking exists if ID provided
        let bookingConnect = {};
        if (bookingId) {
            const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
            if (booking) {
                bookingConnect = { connect: { id: bookingId } };

                // Update booking waiver status
                await prisma.booking.update({
                    where: { id: bookingId },
                    data: { waiverStatus: "SIGNED" }
                });
            }
        }

        // Create Waiver
        await prisma.waiver.create({
            data: {
                name,
                email,
                phone,
                emergencyContact,
                version: "1.0",
                signedAt: new Date(),
                booking: bookingConnect,
                // We could also link to Customer if we find one by email
            }
        });

        revalidatePath("/admin/waivers");
        revalidatePath("/admin/bookings");

        return { success: true };
    } catch (error) {
        console.error("Failed to submit waiver:", error);
        return { error: "Failed to submit waiver" };
    }
}
