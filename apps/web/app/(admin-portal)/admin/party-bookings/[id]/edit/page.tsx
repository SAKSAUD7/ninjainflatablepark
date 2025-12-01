import { prisma } from "@repo/database";
import { getAdminSession } from "../../../../lib/admin-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EditBookingForm from "../../components/EditBookingForm";

export default async function EditPartyBookingPage({ params }: { params: { id: string } }) {
    const session = await getAdminSession();
    if (!session) redirect("/admin/login");

    const booking = await prisma.booking.findUnique({
        where: { id: params.id }
    });

    if (!booking) {
        return <div className="p-8">Booking not found</div>;
    }

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <Link href={`/admin/party-bookings/${params.id}`} className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6 transition-colors">
                <ArrowLeft size={18} className="mr-2" /> Back to Party Booking Details
            </Link>

            <h1 className="text-3xl font-bold text-slate-900 mb-8">Edit Party Booking #{booking.id.slice(-6).toUpperCase()}</h1>

            <EditBookingForm booking={booking} />
        </div>
    );
}
