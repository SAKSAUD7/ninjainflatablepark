"use client";

import { useState, useEffect } from "react";
import { getPartyBookings } from "../../../../actions/admin";
import { BookingTable } from "../../components/BookingTable";
import { Calendar, Filter } from "lucide-react";

export default function PartyBookingHistoryPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "completed" | "cancelled">("completed");

    useEffect(() => {
        loadBookings();
    }, [filter]);

    async function loadBookings() {
        try {
            const data = await getPartyBookings();

            // Filter for historical bookings
            const filtered = data.filter((booking: any) => {
                const bookingDate = new Date(booking.date);
                const isPast = bookingDate < new Date();

                if (filter === "completed") {
                    return isPast && booking.bookingStatus === "COMPLETED";
                } else if (filter === "cancelled") {
                    return booking.bookingStatus === "CANCELLED";
                }
                return isPast; // all past bookings
            });

            setBookings(filtered);
        } catch (error) {
            setBookings([]);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <Calendar className="w-8 h-8 text-primary" />
                        Party Booking History
                    </h1>
                    <p className="text-slate-500 mt-1">Archive of past party bookings</p>
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    >
                        <option value="all">All Past Bookings</option>
                        <option value="completed">Completed Only</option>
                        <option value="cancelled">Cancelled Only</option>
                    </select>
                </div>
            </div>

            <BookingTable
                bookings={bookings}
                title={`${filter === "completed" ? "Completed" : filter === "cancelled" ? "Cancelled" : "All Past"} Party Bookings`}
                type="party"
                readOnly={true}
            />
        </div>
    );
}
