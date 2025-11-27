"use client";

import { AdminSessionBookingForm } from "../../components/AdminSessionBookingForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewSessionBookingPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/session-bookings"
                    className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">New Session Booking</h1>
                    <p className="text-slate-500">Create a manual session booking</p>
                </div>
            </div>

            <AdminSessionBookingForm />
        </div>
    );
}
