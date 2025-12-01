"use client";

import { Check, X } from "lucide-react";
import { updateBookingStatus } from "../../../actions/admin";

interface StatusUpdateButtonsProps {
    bookingId: string;
}

export function StatusUpdateButtons({ bookingId }: StatusUpdateButtonsProps) {
    return (
        <div className="space-y-3">
            <form action={updateBookingStatus.bind(null, bookingId, "CONFIRMED")}>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    <Check size={18} /> Approve Booking
                </button>
            </form>
            <form action={updateBookingStatus.bind(null, bookingId, "CANCELLED")}>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium">
                    <X size={18} /> Cancel Booking
                </button>
            </form>
        </div>
    );
}
