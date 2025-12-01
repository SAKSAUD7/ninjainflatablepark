"use client";

import { BookingTable } from "../components/BookingTable";
import { getPartyBookings } from "../../../actions/admin";
import { useEffect, useState } from "react";

export default function PartyBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getPartyBookings();
                setBookings(data);
            } catch (error) {
                // Error handled silently - bookings will remain empty array
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <BookingTable
                bookings={bookings}
                title="Party Bookings"
                type="party"
            />
        </div>
    );
}
