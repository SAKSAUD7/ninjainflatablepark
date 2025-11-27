import { prisma } from "@repo/database";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { TicketView } from "./components/TicketView";

export default async function TicketPage({ params }: { params: { id: string } }) {
    const booking = await prisma.booking.findUnique({
        where: { id: params.id },
        include: {
            waivers: true
        }
    });

    if (!booking) {
        notFound();
    }

    return <TicketView booking={booking} />;
}
