"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2, Check, X, Printer, Mail } from "lucide-react";

export default function SessionBookingDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await fetch(`/api/bookings/${params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBooking(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch booking:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [params.id]);

    const handleEdit = () => {
        router.push(`/admin/session-bookings/${params.id}/edit`);
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
            return;
        }

        setDeleting(true);
        try {
            const response = await fetch(`/api/bookings/${params.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                router.push("/admin/session-bookings");
                router.refresh();
            } else {
                alert("Failed to delete booking. Please try again.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("An error occurred while deleting the booking.");
        } finally {
            setDeleting(false);
        }
    };

    const handleStatusUpdate = async (newStatus: string) => {
        try {
            const response = await fetch(`/api/bookings/${params.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                const data = await response.json();
                setBooking(data.data);
            } else {
                alert("Failed to update status.");
            }
        } catch (error) {
            console.error("Status update error:", error);
            alert("An error occurred while updating status.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!booking) {
        return <div className="p-8">Booking not found</div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <Link href="/admin/session-bookings" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6 transition-colors">
                <ArrowLeft size={18} className="mr-2" /> Back to Session Bookings
            </Link>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Booking #{booking.id.slice(-6).toUpperCase()}</h1>
                    <p className="text-slate-500 mt-1">Created on {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Edit size={18} /> Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        <Trash2 size={18} /> Delete
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
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
                                <p className="text-slate-900 font-medium">{booking.time} ({booking.duration} mins)</p>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Guests</label>
                                <ul className="text-sm text-slate-700 mt-1">
                                    <li>{booking.adults} Adults</li>
                                    <li>{booking.kids} Kids</li>
                                    <li>{booking.spectators} Spectators</li>
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
                                    <li key={w.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                        <span className="text-sm font-medium">{w.name}</span>
                                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Signed</span>
                                    </li>
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
                ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                    booking.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                                        'bg-red-100 text-red-700'}`}>
                                {booking.status}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => handleStatusUpdate("CONFIRMED")}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                <Check size={18} /> Approve Booking
                            </button>
                            <button
                                onClick={() => handleStatusUpdate("CANCELLED")}
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
