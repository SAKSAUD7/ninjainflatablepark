import { getCustomers } from "../../../actions/admin";
import { getAdminSession } from "../../../lib/admin-auth";
import { redirect } from "next/navigation";
import {
    Search,
    Download,
    MoreHorizontal,
    Mail,
    Phone,
    Calendar,
    MapPin,
    User
} from "lucide-react";
import Link from "next/link";

export default async function AdminCustomers() {
    const session = await getAdminSession();
    if (!session) {
        redirect("/admin/login");
    }

    const customers = await getCustomers();

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
                    <p className="text-slate-500 mt-1">View and manage your customer base</p>
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
                        placeholder="Search by name, email or phone..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <select className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue">
                        <option>All Customers</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <select className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue">
                        <option>Sort By</option>
                        <option>Newest First</option>
                        <option>Most Bookings</option>
                    </select>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stats</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Visit</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customers.map((customer: any) => (
                                <tr key={customer.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                                {(customer.name || 'U').charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{customer.name || 'Unknown'}</p>
                                                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                                    <User size={12} /> ID: {customer.id.slice(-6)}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Mail size={14} className="text-slate-400" />
                                                {customer.email || 'No Email'}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Phone size={14} className="text-slate-400" />
                                                {customer.phone || 'No Phone'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4">
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold">Bookings</p>
                                                <p className="text-sm font-bold text-slate-900">{customer.totalBookings || 0}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold">Spent</p>
                                                <p className="text-sm font-bold text-emerald-600">₹{customer.totalSpent || 0}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Calendar size={14} className="text-slate-400" />
                                            {customer.lastBooking ? new Date(customer.lastBooking).toLocaleDateString() : 'Never'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/customers/${customer.id}`}
                                            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Mock) */}
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
                    <p className="text-sm text-slate-500">Showing <span className="font-bold">1-10</span> of <span className="font-bold">{customers.length}</span> results</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm border border-slate-300 rounded-lg disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 text-sm border border-slate-300 rounded-lg hover:bg-white">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
