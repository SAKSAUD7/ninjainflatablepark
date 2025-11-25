import { prisma } from "@repo/database";
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const bookings = await prisma.booking.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return <DashboardClient bookings={bookings} />;
}
