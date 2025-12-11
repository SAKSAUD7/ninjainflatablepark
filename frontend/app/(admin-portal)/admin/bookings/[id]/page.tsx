"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, Printer, Mail } from "lucide-react";

export default function BookingDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBooking() {
            try {
                const response = await fetch(`/api/bookings/${params.id}`);
                const data = await response.json();
                setBooking(data);
            } catch (error) {
                console.error('Error loading booking:', error);
            } finally {
                setLoading(false);
            }
        }
        loadBooking();
    }, [params.id]);

    const handlePrint = () => {
        window.print();
    };

    const handleUpdateStatus = async (status: string) => {
        try {
            const response = await fetch(`/api/bookings/${params.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ booking_status: status })
            });
            if (response.ok) {
                // Reload booking data
                const data = await response.json();
                setBooking(data);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    if (!booking) {
        return <div className="p-8">Booking not found</div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <Link href="/admin/bookings" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6 transition-colors">
                <ArrowLeft size={18} className="mr-2" /> Back to Bookings
            </Link>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Booking #{String(booking.id).slice(-6).toUpperCase()}</h1>
                    <p className="text-slate-500 mt-1">Created on {new Date(booking.createdAt || booking.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        <Printer size={18} /> Print
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                        <Mail size={18} /> Resend Email
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Customer Details</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Name</label>
                                <p className="text-slate-900 font-medium">{booking.name}</p>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Email</label>
                                <p className="text-slate-900 font-medium">{booking.email}</p>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Phone</label>
                                <p className="text-slate-900 font-medium">{booking.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Reservation Details</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Date</label>
                                <p className="text-slate-900 font-medium">{booking.date}</p>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Time Slot</label>
                                <p className="text-slate-900 font-medium">{booking.time} ({booking.duration || 60} mins)</p>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Guests</label>
                                <ul className="text-sm text-slate-700 mt-1">
                                    <li>{booking.adults || 0} Adults</li>
                                    <li>{booking.kids || 0} Kids</li>
                                    <li>{booking.spectators || 0} Spectators</li>
                                </ul>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Total Amount</label>
                                <p className="text-xl font-bold text-green-600">₹{booking.amount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Waivers */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Waivers</h2>
                        {booking.waivers && booking.waivers.length > 0 ? (
                            <ul className="space-y-2">
                                {booking.waivers.map((w: any) => (
                                    <div key={w.id} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0 mb-3 last:mb-0">
                                        <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg mb-2">
                                            <span className="text-sm font-bold">{w.name} (Primary)</span>
                                            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Signed</span>
                                        </div>

                                        {/* Display Minors */}
                                        {w.minors && w.minors.length > 0 && (
                                            <div className="ml-4 mt-2">
                                                <p className="text-xs font-semibold text-slate-500 mb-1">Minors:</p>
                                                <ul className="space-y-1">
                                                    {w.minors.map((m: any, idx: number) => (
                                                        <li key={`minor-${idx}`} className="text-sm text-slate-700 flex items-center">
                                                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-2"></span>
                                                            {m.name} {m.dob && <span className="text-slate-400 text-xs ml-1">({m.dob})</span>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Display Additional Adults */}
                                        {w.adults && w.adults.length > 0 && (
                                            <div className="ml-4 mt-2">
                                                <p className="text-xs font-semibold text-slate-500 mb-1">Guests:</p>
                                                <ul className="space-y-1">
                                                    {w.adults.map((a: any, idx: number) => (
                                                        <li key={`adult-${idx}`} className="text-sm text-slate-700 flex items-center">
                                                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-2"></span>
                                                            {a.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-slate-500 italic">No waivers signed yet.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Status</h2>
                        <div className="mb-6">
                            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold 
                ${booking.bookingStatus === 'CONFIRMED' || booking.booking_status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                    (booking.bookingStatus === 'PENDING' || booking.booking_status === 'PENDING') ? 'bg-orange-100 text-orange-700' :
                                        'bg-red-100 text-red-700'}`}>
                                {booking.bookingStatus || booking.booking_status || 'PENDING'}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => handleUpdateStatus('CONFIRMED')}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                <Check size={18} /> Approve Booking
                            </button>
                            <button
                                onClick={() => handleUpdateStatus('CANCELLED')}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
                            >
                                <X size={18} /> Cancel Booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
