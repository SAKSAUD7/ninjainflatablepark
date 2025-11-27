"use server";

import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";
import { bookingSchema, formatPhoneNumber } from "@repo/types";
import QRCode from "qrcode";

// Generate unique booking number: NIP-YYYYMMDD-XXXX
function generateBookingNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    return `NIP-${year}${month}${day}-${random}`;
}

// Sanitize string input to prevent XSS
function sanitizeString(input: string): string {
    return input
        .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
        .replace(/[^\w\s.@'-]/g, '') // Allow only alphanumeric, spaces, dots, @, hyphens, apostrophes
        .trim();
}

// Validate email format server-side
function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Validate phone format server-side
function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

export async function createBooking(formData: any) {
    try {
        // Server-side validation using Zod schema
        const validationResult = bookingSchema.safeParse(formData);

        if (!validationResult.success) {
            console.error("Validation failed:", validationResult.error.issues);
            const firstError = validationResult.error.issues[0];
            return {
                success: false,
                error: firstError.message || "Invalid form data. Please check your inputs."
            };
        }

        const data = validationResult.data;

        // Additional server-side checks
        if (!isValidEmail(data.email)) {
            return { success: false, error: "Invalid email format" };
        }

        if (!isValidPhone(data.phone)) {
            return { success: false, error: "Invalid phone number format" };
        }

        // Sanitize inputs
        const sanitizedName = sanitizeString(data.name);
        const sanitizedEmail = data.email.toLowerCase().trim();
        const sanitizedPhone = formatPhoneNumber(data.phone);

        // Validate date is not in the past
        const selectedDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return { success: false, error: "Cannot book for past dates" };
        }

        // Validate time is not in the past for today's bookings
        if (selectedDate.toDateString() === today.toDateString()) {
            const [hours, minutes] = data.time.split(':').map(Number);
            const bookingTime = new Date();
            bookingTime.setHours(hours, minutes || 0, 0, 0);

            if (bookingTime < new Date()) {
                return { success: false, error: "Selected time has passed. Please choose a future time slot." };
            }
        }

        // Calculate amount (server-side to prevent tampering)
        const kidPrice = 500;
        const adultPrice = 899;
        const spectatorPrice = 150;

        let subtotal = (data.kids * kidPrice) + (data.adults * adultPrice) + (data.spectators * spectatorPrice);

        if (data.duration === "120") {
            subtotal += (data.kids + data.adults) * 500;
        }

        const gst = subtotal * 0.18;
        const totalAmount = subtotal + gst;

        // Generate unique booking number
        const bookingNumber = generateBookingNumber();

        // Check for duplicate bookings (same email, date, time within last 5 minutes)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const existingBooking = await prisma.booking.findFirst({
            where: {
                email: sanitizedEmail,
                date: data.date,
                time: data.time,
                createdAt: {
                    gte: fiveMinutesAgo
                }
            }
        });

        if (existingBooking) {
            return {
                success: false,
                error: "A booking with these details was recently created. Please check your email or contact support."
            };
        }

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                name: sanitizedName,
                email: sanitizedEmail,
                phone: sanitizedPhone,
                date: data.date,
                time: data.time,
                duration: data.duration,
                adults: data.adults,
                kids: data.kids,
                spectators: data.spectators,
                amount: totalAmount,
                status: "CONFIRMED",
                bookingStatus: "CONFIRMED",
                paymentStatus: "PENDING",
                waiverStatus: "PENDING",
                type: "SESSION",
                waivers: {
                    create: {
                        name: sanitizedName,
                        email: sanitizedEmail,
                        phone: sanitizedPhone,
                        dob: data.dateOfBirth,
                        version: "1.0",
                        minors: JSON.stringify(data.minors || []),
                    }
                }
            },
        });

        // Generate QR Code for the booking
        const qrData = JSON.stringify({
            id: booking.id,
            name: booking.name,
            date: booking.date,
            time: booking.time,
            guests: booking.adults + booking.kids + booking.spectators
        });

        const qrCode = await QRCode.toDataURL(qrData, {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            width: 300,
            margin: 2,
        });

        // Update booking with QR code
        await prisma.booking.update({
            where: { id: booking.id },
            data: { qrCode }
        });

        console.log("Booking created successfully:", {
            id: booking.id,
            bookingNumber,
            email: sanitizedEmail,
            date: data.date,
            time: data.time
        });

        // TODO: Send confirmation email
        // await sendBookingConfirmationEmail({
        //     email: sanitizedEmail,
        //     name: sanitizedName,
        //     bookingNumber,
        //     date: data.date,
        //     time: data.time,
        //     amount: totalAmount,
        //     guests: {
        //         adults: data.adults,
        //         kids: data.kids,
        //         spectators: data.spectators
        //     }
        // });

        revalidatePath("/admin");
        revalidatePath("/admin/bookings");

        return {
            success: true,
            bookingId: booking.id,
            bookingNumber: bookingNumber
        };
    } catch (error) {
        console.error("Failed to create booking:", error);

        // Check for specific database errors
        if (error instanceof Error) {
            if (error.message.includes('Unique constraint')) {
                return {
                    success: false,
                    error: "A booking with this information already exists."
                };
            }
        }

        // Don't expose internal errors to client
        return {
            success: false,
            error: "An unexpected error occurred. Please try again or contact support if the problem persists."
        };
    }
}
