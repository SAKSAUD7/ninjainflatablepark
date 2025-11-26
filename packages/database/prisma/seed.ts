import { PrismaClient } from "@prisma/client";
import QRCode from "qrcode";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function generateQRCode(data: any): Promise<string> {
    return await QRCode.toDataURL(JSON.stringify(data), {
        errorCorrectionLevel: "H",
        type: "image/png",
        width: 300,
        margin: 2,
    });
}

async function main() {
    console.log("🌱 Starting database seed...");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    try {
        await prisma.transaction.deleteMany();
        await prisma.waiver.deleteMany();
        await prisma.booking.deleteMany();
        await prisma.customer.deleteMany();
        await prisma.adminUser.deleteMany();
    } catch (error) {
        console.warn("⚠️  Error clearing data (might be empty), continuing...", error);
    }

    // Create Admin User
    console.log("👤 Creating admin user...");
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.adminUser.create({
        data: {
            name: "Super Admin",
            email: "admin@ninja.com",
            password: hashedPassword,
            role: "SUPER_ADMIN",
            isActive: true,
        },
    });

    // Create Customers
    console.log("👥 Creating customers...");
    const customers = await Promise.all([
        prisma.customer.create({
            data: {
                name: "Rajesh Kumar",
                email: "rajesh.kumar@example.com",
                phone: "9876543210",
            },
        }),
        prisma.customer.create({
            data: {
                name: "Priya Sharma",
                email: "priya.sharma@example.com",
                phone: "9876543211",
            },
        }),
        prisma.customer.create({
            data: {
                name: "Amit Patel",
                email: "amit.patel@example.com",
                phone: "9876543212",
            },
        }),
        prisma.customer.create({
            data: {
                name: "Sneha Reddy",
                email: "sneha.reddy@example.com",
                phone: "9876543213",
            },
        }),
        prisma.customer.create({
            data: {
                name: "Vikram Singh",
                email: "vikram.singh@example.com",
                phone: "9876543214",
            },
        }),
    ]);

    // Create Bookings with QR Codes
    console.log("📅 Creating bookings...");
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const bookingsData = [
        {
            customer: customers[0],
            date: today.toISOString().split("T")[0],
            time: "10:00",
            duration: "120",
            adults: 2,
            kids: 3,
            spectators: 1,
            amount: 2500,
            bookingStatus: "CONFIRMED",
            waiverStatus: "SIGNED",
            paymentStatus: "PAID",
        },
        {
            customer: customers[1],
            date: today.toISOString().split("T")[0],
            time: "14:00",
            duration: "60",
            adults: 1,
            kids: 2,
            spectators: 0,
            amount: 1500,
            bookingStatus: "CONFIRMED",
            waiverStatus: "PENDING",
            paymentStatus: "PAID",
        },
        {
            customer: customers[2],
            date: tomorrow.toISOString().split("T")[0],
            time: "11:00",
            duration: "120",
            adults: 3,
            kids: 4,
            spectators: 2,
            amount: 3500,
            bookingStatus: "CONFIRMED",
            waiverStatus: "PENDING",
            paymentStatus: "PENDING",
        },
        {
            customer: customers[3],
            date: tomorrow.toISOString().split("T")[0],
            time: "16:00",
            duration: "60",
            adults: 2,
            kids: 1,
            spectators: 1,
            amount: 1800,
            bookingStatus: "PENDING",
            waiverStatus: "PENDING",
            paymentStatus: "PENDING",
        },
        {
            customer: customers[4],
            date: nextWeek.toISOString().split("T")[0],
            time: "10:00",
            duration: "120",
            adults: 4,
            kids: 5,
            spectators: 3,
            amount: 4500,
            bookingStatus: "CONFIRMED",
            waiverStatus: "PENDING",
            paymentStatus: "PAID",
        },
        {
            customer: customers[0],
            date: nextWeek.toISOString().split("T")[0],
            time: "15:00",
            duration: "60",
            adults: 1,
            kids: 1,
            spectators: 0,
            amount: 1200,
            bookingStatus: "CONFIRMED",
            waiverStatus: "SIGNED",
            paymentStatus: "PAID",
        },
        {
            customer: customers[1],
            date: "2025-11-20",
            time: "12:00",
            duration: "120",
            adults: 2,
            kids: 2,
            spectators: 1,
            amount: 2200,
            bookingStatus: "COMPLETED",
            waiverStatus: "SIGNED",
            paymentStatus: "PAID",
        },
        {
            customer: customers[2],
            date: "2025-11-18",
            time: "14:00",
            duration: "60",
            adults: 1,
            kids: 3,
            spectators: 2,
            amount: 2000,
            bookingStatus: "CANCELLED",
            waiverStatus: "PENDING",
            paymentStatus: "REFUNDED",
        },
    ];

    const bookings = [];
    for (const data of bookingsData) {
        const booking = await prisma.booking.create({
            data: {
                name: data.customer.name,
                email: data.customer.email,
                phone: data.customer.phone,
                date: data.date,
                time: data.time,
                duration: data.duration,
                adults: data.adults,
                kids: data.kids,
                spectators: data.spectators,
                amount: data.amount,
                status: data.bookingStatus,
                bookingStatus: data.bookingStatus,
                waiverStatus: data.waiverStatus,
                paymentStatus: data.paymentStatus,
                customerId: data.customer.id,
            },
        });

        // Generate QR Code
        const qrData = {
            id: booking.id,
            name: booking.name,
            date: booking.date,
            time: booking.time,
            guests: booking.adults + booking.kids + booking.spectators,
        };
        const qrCode = await generateQRCode(qrData);

        // Update booking with QR code
        await prisma.booking.update({
            where: { id: booking.id },
            data: { qrCode },
        });

        bookings.push(booking);
    }

    // Create Waivers
    console.log("📝 Creating waivers...");
    const signedBookings = bookings.filter((b) => b.waiverStatus === "SIGNED");
    for (const booking of signedBookings) {
        await prisma.waiver.create({
            data: {
                name: booking.name,
                email: booking.email,
                phone: booking.phone,
                version: "1.0",
                emergencyContact: "Emergency Contact: +91 9999999999",
                bookingId: booking.id,
                customerId: booking.customerId!,
            },
        });
    }

    // Create Transactions
    console.log("💰 Creating transactions...");
    const paidBookings = bookings.filter((b) => b.paymentStatus === "PAID");
    for (const booking of paidBookings) {
        await prisma.transaction.create({
            data: {
                amount: booking.amount,
                method: "RAZORPAY",
                status: "PAID",
                bookingId: booking.id,
            },
        });
    }

    console.log("✅ Seed completed successfully!");
    console.log(`   - Created 1 admin user`);
    console.log(`   - Created ${customers.length} customers`);
    console.log(`   - Created ${bookings.length} bookings with QR codes`);
    console.log(`   - Created ${signedBookings.length} waivers`);
    console.log(`   - Created ${paidBookings.length} transactions`);
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
