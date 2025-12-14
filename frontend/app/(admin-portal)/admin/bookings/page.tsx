"use client";

import { useState, useEffect } from "react";
import { getSessionBookings, toggleBookingArrival } from "@/app/actions/admin";
import { formatDate, formatCurrency, getInitials } from "@repo/utils";
import { exportBookingsToCSV } from "../../../../lib/export-csv";
import { DateFilter, filterBookingsByDate } from "@/components/admin/DateFilter";
import { getCachedData, setCachedData, clearCacheByPrefix } from "@/lib/admin-cache";
import { ArrivalStatusButton } from "../components/ArrivalStatusButton";
import { WaiverLink } from "../components/WaiverLink";
import { toast } from "sonner";
import {
    Search,
    Download,
    Calendar,
    Clock,
    Mail,
    Phone,
    RefreshCw,
    Edit,
    Trash2,
    Eye
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminBookings() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [hasArrivedFilter, setHasArrivedFilter] = useState("all");
    const [displayCount, setDisplayCount] = useState(25);
    const router = useRouter();

    useEffect(() => {
        loadBookings();
    }, []);

    useEffect(() => {
        filterBookings();
    }, [searchTerm, statusFilter, dateFilter, hasArrivedFilter, bookings]);

    async function loadBookings() {
        try {
            setLoading(true);

            // Use client-side fetch instead of server action
            const { fetchBookingsClient } = await import('@/lib/client-api');
            const data = await fetchBookingsClient('SESSION');

            if (!data || data.length === 0) {
                // No bookings found
            }

            setBookings(data as any[]);
            setFilteredBookings(data as any[]);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load bookings: ' + (error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    async function handleToggleArrival(id: string, currentStatus: boolean) {
        const result = await toggleBookingArrival(id, 'session', !currentStatus);
        if (result.success) {
            toast.success(currentStatus ? "Marked as not arrived" : "Marked as arrived");

            // Update local state to reflect change without full reload
            setBookings(prev => prev.map(b =>
                String(b.id) === String(id)
                    ? { ...b, arrived: !currentStatus, arrived_at: !currentStatus ? new Date().toISOString() : null }
                    : b
            ));
            return true;
        }
        return false;
    }

    function filterBookings() {
        let filtered = [...bookings];

        // Search filter
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(booking =>
                booking.customerName?.toLowerCase().includes(search) ||
                booking.customerEmail?.toLowerCase().includes(search) ||
                booking.name?.toLowerCase().includes(search) ||
                booking.email?.toLowerCase().includes(search) ||
                booking.id?.toString().includes(search)
            );
        }

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(booking =>
                (booking.bookingStatus || booking.status) === statusFilter.toUpperCase()
            );
        }

        // Date filter
        filtered = filterBookingsByDate(filtered, dateFilter);

        // Arrival filter
        if (hasArrivedFilter !== "all") {
            const shouldBeArrived = hasArrivedFilter === "yes";
            filtered = filtered.filter(booking => booking.arrived === shouldBeArrived);
        }

        // Sort by created_at descending (newest first)
        filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt || a.created_at || 0).getTime();
            const dateB = new Date(b.createdAt || b.created_at || 0).getTime();
            return dateB - dateA; // Descending order (newest first)
        });

        setFilteredBookings(filtered);
    }

    function resetFilters() {
        setSearchTerm("");
        setStatusFilter("all");
        setDateFilter("all");
        setHasArrivedFilter("all");
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
            <div className="bg-slate-50 border-b border-slate-200 -mx-8 -mt-8 px-8 py-4 mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-sm text-slate-500 mb-1">
                            <Link href="/admin" className="hover:text-primary">Dashboard</Link> / Session Bookings
                        </div>
                        <h1 className="text-2xl font-bold text-red-400">Session Bookings</h1>
                        <p className="text-slate-600">View And Manage Session Bookings</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Link
                    href="/admin/session-bookings/new"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium text-sm"
                >
                    + Create New Session Booking
                </Link>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h3 className="text-xl font-normal text-slate-700 mb-6">Filter Data:</h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-slate-600">Date</label>
                        <DateFilter value={dateFilter} onChange={setDateFilter} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-slate-600">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-slate-600 text-sm outline-none focus:border-primary"
                        >
                            <option value="all">All</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-slate-600">Has Arrived</label>
                        <select
                            value={hasArrivedFilter}
                            onChange={(e) => setHasArrivedFilter(e.target.value)}
                            className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-slate-600 text-sm outline-none focus:border-primary"
                        >
                            <option value="all">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-slate-600">Display</label>
                        <select
                            value={displayCount}
                            onChange={(e) => setDisplayCount(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded border border-slate-300 bg-white text-slate-600 text-sm outline-none focus:border-primary"
                        >
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium text-sm"
                    >
                        <Search size={16} />
                        Search
                    </button>
                    <button
                        onClick={resetFilters}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-900 rounded hover:bg-yellow-500 transition-colors font-medium text-sm"
                    >
                        <RefreshCw size={16} />
                        Reset
                    </button>
                </div>

                <div className="mt-4 text-xs text-slate-500">
                    Displaying {Math.min(filteredBookings.length, displayCount)} out of {filteredBookings.length}
                    <br />
                    Page 1 / 1
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Booking #</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Booked By</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Amount Paid (+ GST)</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Arrival Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Waiver</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-6 py-12 text-center text-slate-500 font-medium">
                                        No Session Bookings Found.
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.slice(0, displayCount).map((booking: any) => (
                                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900">
                                            {booking.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-900">{booking.customerName || booking.name}</span>
                                                <span className="text-xs text-slate-500">{booking.customerEmail || booking.email}</span>
                                                <span className="text-xs text-slate-500">{booking.customerPhone || booking.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-900">
                                            {formatDate(booking.date)}
                                            <div className="text-xs text-slate-500 mt-1">
                                                {new Date(booking.date).getFullYear()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-900">
                                            {formatTimeRange(booking.time, booking.duration || 60)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-900">
                                            {formatCurrency(booking.amount || 0)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold text-slate-500 uppercase">FULLY</span>
                                                <span className="text-xs font-bold text-slate-500 uppercase">PAID</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <ArrivalStatusButton
                                                bookingId={booking.id}
                                                isArrived={booking.arrived}
                                                onToggle={handleToggleArrival}
                                                type="session"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <WaiverLink
                                                bookingId={booking.id}
                                                status={booking.waiverStatus || booking.waiver_status}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/admin/bookings/${booking.id}`}
                                                    className="p-2 text-white bg-slate-500 rounded-md hover:bg-slate-600 transition-colors"
                                                    title="View"
                                                >
                                                    <div className="flex flex-col items-center justify-center w-full h-full">
                                                        <Eye size={16} />
                                                        <span className="text-[10px] leading-tight">View</span>
                                                    </div>
                                                </Link>
                                                <Link
                                                    href={`/admin/bookings/${booking.id}/edit`}
                                                    className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <div className="flex flex-col items-center justify-center w-full h-full">
                                                        <Edit size={16} />
                                                        <span className="text-[10px] leading-tight">Edit</span>
                                                    </div>
                                                </Link>
                                                <button
                                                    onClick={() => toast.info("Delete functionality disabled for safety")}
                                                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                                >
                                                    <div className="flex flex-col items-center text-[10px] leading-tight w-8">
                                                        <Trash2 size={14} />
                                                        <span>Delete</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function formatTimeRange(startTime: string, durationMinutes: number): string {
    if (!startTime) return "";

    const [hours, minutes] = startTime.split(':').map(Number);
    const start = new Date();
    start.setHours(hours, minutes, 0);

    const end = new Date(start.getTime() + durationMinutes * 60000);

    return `${formatTime(start)} - ${formatTime(end)}`;
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).toLowerCase();
}

