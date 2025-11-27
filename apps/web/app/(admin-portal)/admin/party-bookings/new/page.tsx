"use client";

import { AdminPartyBookingForm } from "../../components/AdminPartyBookingForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewPartyBookingPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/party-bookings"
                    className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">New Party Booking</h1>
                    <p className="text-slate-500">Create a manual party booking</p>
                </div>
            </div>

            <AdminPartyBookingForm />
        </div>
    );
}
