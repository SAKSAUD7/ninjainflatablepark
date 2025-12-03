import { getAllBookings } from "../../../actions/admin";
import { getAdminSession } from "../../../lib/admin-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatDate, formatCurrency, getInitials } from "@repo/utils";
import {
    Search,
    Download,
    Calendar,
    Clock,
    Mail,
    Phone,
    Eye,
    Filter
} from "lucide-react";

export default async function AllBookingsPage() {
    const session = await getAdminSession();
    if (!session) {
        redirect("/admin/login");
    }

    const bookings = await getAllBookings();

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">All Bookings</h1>
                    <p className="text-slate-500 mt-1">Unified view of all session and party bookings with customer data</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium text-sm">
                        <Download size={16} />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, email or booking ID..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <select className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue">
                        <option value="">All Types</option>
                        <option value="session">Session Bookings</option>
                        <option value="party">Party Bookings</option>
                    </select>
                    <select className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue">
                        <option value="">All Statuses</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="PENDING">Pending</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Guests</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        No bookings found
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking: any) => (
                                    <tr key={`${booking.type}-${booking.id}`} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${booking.type === 'SESSION'
                                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                    : 'bg-purple-100 text-purple-700 border border-purple-200'
                                                }`}>
                                                {booking.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                                    {getInitials(booking.customer?.name || booking.name || 'U')}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{booking.customer?.name || booking.name || 'Unknown'}</p>
                                                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                                        <Mail size={12} /> {booking.customer?.email || booking.email || 'No Email'}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                                        <Phone size={12} /> {booking.customer?.phone || booking.phone || 'No Phone'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                                                    <Calendar size={14} className="text-slate-400" />
                                                    {formatDate(booking.date)}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <Clock size={12} />
                                                    {booking.time}
                                                </div>
                                                <div className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded inline-block">
                                                    ID: #{String(booking.id).slice(-6)}
                                                </div>
                                                {booking.type === 'PARTY' && booking.birthday_child_name && (
                                                    <div className="text-xs text-purple-600 mt-1">
                                                        🎂 {booking.birthday_child_name} ({booking.birthday_child_age}y)
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-slate-900">{booking.duration} mins</p>
                                            <p className="text-xs text-slate-500">{(booking.adults || 0) + (booking.kids || 0) + (booking.spectators || 0)} Guests</p>
                                            <p className="text-sm font-bold text-slate-900 mt-1">{formatCurrency(booking.amount)}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={booking.booking_status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={booking.type === 'SESSION' ? `/admin/bookings/${booking.id}` : `/admin/party-bookings/${booking.id}`}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                            >
                                                <Eye size={16} />
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
                    <p className="text-sm text-slate-500">Showing <span className="font-bold">1-{bookings.length}</span> of <span className="font-bold">{bookings.length}</span> results</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border border-slate-300 rounded-lg disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 text-sm border border-slate-300 rounded-lg hover:bg-white">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        CONFIRMED: "bg-emerald-100 text-emerald-700 border-emerald-200",
        PENDING: "bg-amber-100 text-amber-700 border-amber-200",
        CANCELLED: "bg-red-100 text-red-700 border-red-200",
        COMPLETED: "bg-blue-100 text-blue-700 border-blue-200",
    };

    const defaultStyle = "bg-slate-100 text-slate-700 border-slate-200";

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status] || defaultStyle} inline-flex items-center gap-1`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status === 'CONFIRMED' ? 'bg-emerald-500' : status === 'PENDING' ? 'bg-amber-500' : 'bg-slate-400'}`} />
            {status}
        </span>
    );
}
