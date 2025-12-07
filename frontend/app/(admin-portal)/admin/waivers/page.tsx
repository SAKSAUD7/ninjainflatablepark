"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCachedData, setCachedData } from "@/lib/admin-cache";
import {
    Search,
    Download,
    Calendar,
    FileSignature,
    Eye,
    CheckCircle,
    Clock,
    Mail,
    Phone,
    User,
    Users
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export default function AdminWaivers() {
    const [waivers, setWaivers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [bookingTypeFilter, setBookingTypeFilter] = useState("ALL");
    const [viewMode, setViewMode] = useState<"all" | "grouped">("all"); // Toggle between views

    useEffect(() => {
        loadWaivers();
    }, []);

    async function loadWaivers() {
        try {
            // Check cache first
            const cached = getCachedData<any[]>('waivers');
            if (cached) {
                setWaivers(cached);
                setLoading(false);
                return;
            }

            const response = await fetch(`${API_URL}/bookings/waivers/`);
            const data = await response.json();
            setWaivers(data);

            // Cache the data
            setCachedData('waivers', data);
        } catch (error) {
            console.error('Failed to load waivers:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleExportCSV() {
        try {
            const response = await fetch(`${API_URL}/bookings/waivers/export_csv/`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `waivers_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Failed to export CSV:', error);
            alert('Failed to export CSV');
        }
    }

    async function handleDownloadPDF(waiverId: string) {
        try {
            const response = await fetch(`${API_URL}/bookings/waivers/${waiverId}/download_pdf/`);
            const data = await response.json();
            alert(data.message || 'PDF download not yet implemented');
        } catch (error) {
            console.error('Failed to download PDF:', error);
            alert('Failed to download PDF');
        }
    }

    function handleKioskMode() {
        window.open('/kiosk/waiver', '_blank', 'fullscreen=yes');
    }

    // Group waivers by booking for grouped view - ensure no duplicates
    const groupedWaivers = (() => {
        const bookingMap = new Map<string, any>();

        waivers.forEach((waiver: any) => {
            const bookingId = waiver.booking || waiver.party_booking;
            const bookingType = waiver.booking ? 'SESSION' : 'PARTY';
            const uniqueKey = `${bookingType}-${bookingId}`;

            // Skip if no booking ID (walk-ins)
            if (!bookingId) return;

            // If this booking hasn't been added yet, or if this is the primary signer, add/update it
            if (!bookingMap.has(uniqueKey) || waiver.is_primary_signer) {
                const relatedWaivers = waivers.filter((w: any) => {
                    const wBookingId = w.booking || w.party_booking;
                    const wBookingType = w.booking ? 'SESSION' : 'PARTY';
                    return wBookingId === bookingId && wBookingType === bookingType;
                });

                bookingMap.set(uniqueKey, {
                    ...waiver,
                    relatedWaivers,
                    totalParticipants: relatedWaivers.length,
                    adults: relatedWaivers.filter((w: any) => w.participant_type === 'ADULT').length,
                    minors: relatedWaivers.filter((w: any) => w.participant_type === 'MINOR').length
                });
            }
        });

        return Array.from(bookingMap.values());
    })();


    // Filter logic for both views
    const filteredWaivers = (viewMode === "grouped" ? groupedWaivers : waivers).filter(waiver => {
        const matchesSearch =
            waiver.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            waiver.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === "ALL" || waiver.participant_type === typeFilter;

        const matchesBookingType =
            bookingTypeFilter === "ALL" ||
            (bookingTypeFilter === "SESSION" && waiver.booking) ||
            (bookingTypeFilter === "PARTY" && waiver.party_booking);

        return matchesSearch && (viewMode === "grouped" || matchesType) && matchesBookingType;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-blue"></div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Waivers</h1>
                    <p className="text-slate-500 mt-1">Track and manage digital liability waivers</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium text-sm"
                    >
                        <Download size={16} />
                        Export All
                    </button>
                    <button
                        onClick={handleKioskMode}
                        className="flex items-center gap-2 px-4 py-2 bg-neon-blue text-slate-900 rounded-lg hover:bg-blue-400 transition-colors font-bold text-sm"
                    >
                        <FileSignature size={16} />
                        Kiosk Mode
                    </button>
                </div>
            </div>

            {/* View Mode Toggle */}
            <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200 mb-4 inline-flex gap-2">
                <button
                    onClick={() => setViewMode("all")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === "all"
                        ? "bg-neon-blue text-slate-900"
                        : "text-slate-600 hover:bg-slate-100"
                        }`}
                >
                    All Waivers
                </button>
                <button
                    onClick={() => setViewMode("grouped")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === "grouped"
                        ? "bg-neon-blue text-slate-900"
                        : "text-slate-600 hover:bg-slate-100"
                        }`}
                >
                    Grouped by Booking
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder={viewMode === "grouped" ? "Search by primary signer..." : "Search by signer name or email..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none text-slate-900"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {viewMode === "all" && (
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue"
                        >
                            <option value="ALL">All Types</option>
                            <option value="ADULT">Adults Only</option>
                            <option value="MINOR">Minors Only</option>
                        </select>
                    )}
                    <select
                        value={bookingTypeFilter}
                        onChange={(e) => setBookingTypeFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue"
                    >
                        <option value="ALL">All Bookings</option>
                        <option value="SESSION">Session Bookings</option>
                        <option value="PARTY">Party Bookings</option>
                    </select>
                </div>
            </div>

            {/* Waivers Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {viewMode === "grouped" ? "Primary Signer" : "Signer Details"}
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {viewMode === "grouped" ? "Participants" : "Type"}
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Signed Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking Ref</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredWaivers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        No waivers found
                                    </td>
                                </tr>
                            ) : viewMode === "grouped" ? (
                                // Grouped View
                                filteredWaivers.map((waiver: any) => (
                                    <tr key={waiver.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                                    {(waiver.name || 'U').charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{waiver.name || 'Unknown'}</p>
                                                    {waiver.email && (
                                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                                            <Mail size={12} /> {waiver.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-bold text-slate-900">
                                                    {waiver.totalParticipants} Total
                                                </span>
                                                <div className="flex gap-2">
                                                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                        {waiver.adults} Adult{waiver.adults !== 1 ? 's' : ''}
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                                        {waiver.minors} Minor{waiver.minors !== 1 ? 's' : ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar size={14} className="text-slate-400" />
                                                {new Date(waiver.signed_at).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                                <Clock size={12} />
                                                {new Date(waiver.signed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {waiver.booking_reference ? (
                                                <span className="text-sm font-medium text-neon-blue">
                                                    {waiver.booking_reference}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Walk-in</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold border bg-emerald-100 text-emerald-700 border-emerald-200 inline-flex items-center gap-1">
                                                <CheckCircle size={12} />
                                                Signed
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/waivers/${waiver.id}`}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-neon-blue hover:bg-slate-100 rounded-lg transition-colors font-medium"
                                            >
                                                <Eye size={16} />
                                                View All ({waiver.totalParticipants})
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                // All Waivers View (Original)
                                filteredWaivers.map((waiver: any) => (
                                    <tr key={waiver.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                                    {(waiver.name || 'U').charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{waiver.name || 'Unknown'}</p>
                                                    {waiver.email && (
                                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                                            <Mail size={12} /> {waiver.email}
                                                        </div>
                                                    )}
                                                    {waiver.phone && (
                                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                                            <Phone size={12} /> {waiver.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${waiver.participant_type === 'ADULT'
                                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                : 'bg-purple-100 text-purple-700 border border-purple-200'
                                                }`}>
                                                {waiver.participant_type === 'ADULT' ? <User size={12} /> : <Users size={12} />}
                                                {waiver.participant_type === 'ADULT' ? 'Adult' : 'Minor'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Calendar size={14} className="text-slate-400" />
                                                {new Date(waiver.signed_at).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                                <Clock size={12} />
                                                {new Date(waiver.signed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {waiver.booking_reference ? (
                                                <span className="text-sm font-medium text-neon-blue">
                                                    {waiver.booking_reference}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Walk-in</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold border bg-emerald-100 text-emerald-700 border-emerald-200 inline-flex items-center gap-1">
                                                <CheckCircle size={12} />
                                                Signed
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/waivers/${waiver.id}`}
                                                    className="p-2 text-slate-400 hover:text-neon-blue hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDownloadPDF(waiver.id)}
                                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="Download PDF"
                                                >
                                                    <Download size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
                    <p className="text-sm text-slate-500">
                        Showing <span className="font-bold">{filteredWaivers.length}</span> of <span className="font-bold">{viewMode === "grouped" ? groupedWaivers.length : waivers.length}</span> {viewMode === "grouped" ? "bookings" : "waivers"}
                    </p>
                </div>
            </div>
        </div>
    );
}
