"use client";

import { useState } from "react";
import { Users, Calendar, DollarSign, Download, Search, Filter } from "lucide-react";

export default function DashboardClient({ bookings }: { bookings: any[] }) {
    const [activeTab, setActiveTab] = useState("bookings");

    // Calculate stats
    const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);
    const totalBookings = bookings.length;
    const activeGuests = bookings
        .filter(b => b.status === "CONFIRMED") // Simplified logic
        .reduce((sum, b) => sum + b.adults + b.kids, 0);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-6 fixed h-full">
                <div className="flex items-center space-x-2 mb-10">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold">N</span>
                    </div>
                    <span className="text-xl font-bold">Admin Panel</span>
                </div>

                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab("bookings")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "bookings" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800"}`}
                    >
                        <Calendar size={20} />
                        <span>Bookings</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "users" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800"}`}
                    >
                        <Users size={20} />
                        <span>Customers</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("finance")}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "finance" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800"}`}
                    >
                        <DollarSign size={20} />
                        <span>Finance</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto ml-64">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                    <div className="flex items-center space-x-4">
                        <div className="bg-white p-2 rounded-full shadow-sm">
                            <span className="block w-8 h-8 bg-gray-200 rounded-full"></span>
                        </div>
                        <span className="font-bold text-gray-700">Admin User</span>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-500 text-sm font-bold uppercase">Total Revenue</p>
                                <h3 className="text-3xl font-black text-gray-900">₹ {totalRevenue.toLocaleString()}</h3>
                            </div>
                            <div className="bg-green-100 p-2 rounded-lg">
                                <DollarSign className="text-green-600" size={24} />
                            </div>
                        </div>
                        <p className="text-green-500 text-sm font-bold">Lifetime Revenue</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-500 text-sm font-bold uppercase">Total Bookings</p>
                                <h3 className="text-3xl font-black text-gray-900">{totalBookings}</h3>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Calendar className="text-primary" size={24} />
                            </div>
                        </div>
                        <p className="text-blue-500 text-sm font-bold">All time</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-gray-500 text-sm font-bold uppercase">Active Guests</p>
                                <h3 className="text-3xl font-black text-gray-900">{activeGuests}</h3>
                            </div>
                            <div className="bg-purple-100 p-2 rounded-lg">
                                <Users className="text-purple-600" size={24} />
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm font-bold">Confirmed Guests</p>
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
                        <div className="flex space-x-3">
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                                <Filter size={16} />
                                <span>Filter</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                                <Download size={16} />
                                <span>Export CSV</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Booking ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Guests</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap font-mono text-sm font-bold text-gray-900">
                                            {booking.id.slice(-8).toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                                            {booking.name}
                                            <div className="text-xs text-gray-400 font-normal">{booking.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {booking.date} <span className="text-gray-300">|</span> {booking.time}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {booking.adults + booking.kids + booking.spectators}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                            ₹ {booking.amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${booking.status === "CONFIRMED" ? "bg-green-100 text-green-800" :
                                                    booking.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                                                        "bg-red-100 text-red-800"
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
