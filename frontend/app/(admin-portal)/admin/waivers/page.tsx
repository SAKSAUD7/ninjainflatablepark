"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getCachedData, setCachedData } from "@/lib/admin-cache";
import { verifyWaiver, toggleWaiverVerification, getWaivers } from "@/app/actions/admin";
import { toast } from 'sonner';
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

            const data = await getWaivers();
            console.log('Waivers data:', data);
            console.log('First waiver:', data[0]);
            if (Array.isArray(data)) {
                setWaivers(data);
                // Cache the data
                setCachedData('waivers', data);
            } else {
                console.error("Failed to load waivers: Invalid data format", data);
                setWaivers([]);
            }
        } catch (error) {
            console.error('Failed to load waivers:', error);
            setWaivers([]);
        } finally {
            setLoading(false);
        }
    }

    // Real-time polling for new waivers
    useEffect(() => {
        let previousCount = waivers.length;

        const pollInterval = setInterval(async () => {
            try {
                const data = await getWaivers();

                if (Array.isArray(data)) {
                    // Check if there are new waivers
                    if (data.length > previousCount) {
                        const newCount = data.length - previousCount;
                        console.log(`${newCount} new waiver(s) received!`);
                    }

                    previousCount = data.length;
                    setWaivers(data);
                    setCachedData('waivers', data);
                }
            } catch (error) {
                console.error("Polling error:", error);
            }
        }, 15000); // Poll every 15 seconds

        return () => clearInterval(pollInterval);
    }, [waivers.length]);

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

    async function handleStatusToggle(id: string, currentStatus: boolean, e: React.MouseEvent) {
        e.stopPropagation(); // Prevent row click

        try {
            const newStatus = !currentStatus;

            // Optimistic update
            setWaivers(prev => prev.map(w => w.id === id ? { ...w, is_verified: newStatus } : w));

            const res = await toggleWaiverVerification(id, newStatus);
            if (res.success) {
                toast.success(newStatus ? "Marked as Arrived" : "Marked as Not Arrived");
                // Don't reload immediately to prevent race condition overwriting optimistic state
            } else {
                // Revert on failure
                setWaivers(prev => prev.map(w => w.id === id ? { ...w, is_verified: currentStatus } : w));
                toast.error(res.error || "Failed to update status");
            }
        } catch (error) {
            // Revert on error
            setWaivers(prev => prev.map(w => w.id === id ? { ...w, is_verified: currentStatus } : w));
            console.error("Toggle error:", error);
            toast.error("Error updating status");
        }
    }

    function handleKioskMode() {
        window.open('/kiosk/waiver', '_blank', 'fullscreen=yes');
    }

    function calculateAge(dob: string): string {
        if (!dob) return 'N/A';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age.toString();
    }

    // Flatten waivers to include additional adults as their own rows
    const flattenedWaivers = useMemo(() => {
        const flatList: any[] = [];
        waivers.forEach((waiver: any) => {
            // Add primary signer
            flatList.push({
                ...waiver,
                isPrimary: true,
                uniqueId: waiver.id
            });

            // Add additional adults (minors stay with primary adult)
            if (waiver.adults && Array.isArray(waiver.adults)) {
                waiver.adults.forEach((adult: any, index: number) => {
                    flatList.push({
                        ...waiver, // Inherit parent details
                        name: adult.name,
                        dob: adult.dob,
                        email: adult.email || null,
                        phone: adult.phone || null,
                        participant_type: 'ADULT',
                        minors: [], // Minors belong to the primary signer
                        adults: [], // Clear to avoid recursion
                        isPrimary: false,
                        isAdditionalAdult: true,
                        uniqueId: `${waiver.id}-adult-${index}`
                    });
                });
            }
        });
        return flatList;
    }, [waivers]);


    // Filter logic
    const filteredWaivers = flattenedWaivers.filter(waiver => {
        const matchesSearch =
            waiver.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            waiver.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === "ALL" || waiver.participant_type === typeFilter;

        const matchesBookingType =
            bookingTypeFilter === "ALL" ||
            (bookingTypeFilter === "SESSION" && waiver.booking) ||
            (bookingTypeFilter === "PARTY" && waiver.party_booking);

        return matchesSearch && matchesType && matchesBookingType;
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

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by signer name or email..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none text-slate-900"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <select
                        value={typeFilter}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue"
                    >
                        <option value="ALL">All Types</option>
                        <option value="ADULT">Adults Only</option>
                        <option value="MINOR">Minors Only</option>
                    </select>
                    <select
                        value={bookingTypeFilter}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBookingTypeFilter(e.target.value)}
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
                        <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <User size={16} className="text-slate-500" />
                                        Participant
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} className="text-slate-500" />
                                        Contact Info
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-slate-500" />
                                        Signed On
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <Users size={16} className="text-slate-500" />
                                        Group Details
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle size={16} className="text-slate-500" />
                                        Arrival Status
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredWaivers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <FileSignature size={48} className="text-slate-300" />
                                            <p className="text-lg font-medium">No waivers found</p>
                                            <p className="text-sm text-slate-400">Try adjusting your filters</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredWaivers.map((waiver: any) => (
                                    <tr key={waiver.uniqueId || waiver.id} className={`hover:bg-blue-50/50 transition-all duration-150 group ${!waiver.isPrimary ? 'bg-slate-50/70 border-l-4 border-slate-300' : 'border-l-4 border-transparent hover:border-blue-400'}`}>
                                        {/* 1. Participant */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${waiver.isPrimary
                                                    ? waiver.party_booking
                                                        ? 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 ring-2 ring-purple-300'
                                                        : 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 ring-2 ring-blue-300'
                                                    : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    {waiver.isPrimary
                                                        ? (waiver.booking || waiver.party_booking || (waiver.name || 'U').charAt(0).toUpperCase())
                                                        : (waiver.name || 'U').charAt(0).toUpperCase()
                                                    }
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <p className={`text-base font-bold ${waiver.isPrimary ? 'text-slate-900' : 'text-slate-700'}`}>
                                                            {waiver.isPrimary && <span className="text-lg mr-1">👤</span>}
                                                            {!waiver.isPrimary && waiver.isAdditionalAdult && <span className="text-lg mr-1">👥</span>}
                                                            {waiver.name || 'Unknown'}
                                                        </p>
                                                        {waiver.isPrimary && waiver.party_booking && (
                                                            <span className="px-2 py-1 rounded-md bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide border border-purple-300 shadow-sm">
                                                                🎉 Party
                                                            </span>
                                                        )}
                                                        {waiver.isPrimary && waiver.booking && (
                                                            <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide border border-blue-300 shadow-sm">
                                                                🎯 Session
                                                            </span>
                                                        )}
                                                    </div>
                                                    {waiver.isPrimary && waiver.booking_reference && (
                                                        <p className="text-sm text-slate-500 mt-1 font-mono">
                                                            Ref: <span className="font-bold text-slate-700">{waiver.booking_reference}</span>
                                                        </p>
                                                    )}
                                                    {!waiver.isPrimary && (
                                                        <p className="text-xs text-slate-500 mt-0.5 italic font-medium">
                                                            {waiver.isAdditionalAdult ? '↳ Additional Adult in Group' : '↳ Participant'}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* 2. Contact */}
                                        <td className="px-6 py-4">
                                            <div className="space-y-1.5">
                                                {waiver.email ? (
                                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                                        <Mail size={14} className="text-blue-500 flex-shrink-0" />
                                                        <span className="truncate max-w-[200px] font-medium">{waiver.email}</span>
                                                    </div>
                                                ) : waiver.phone ? (
                                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                                        <Phone size={14} className="text-green-500 flex-shrink-0" />
                                                        <span className="font-medium">{waiver.phone}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic">No contact info</span>
                                                )}
                                                {waiver.dob && (
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-md w-fit">
                                                        <span className="font-semibold">Age:</span>
                                                        <span className="font-bold text-slate-900">{calculateAge(waiver.dob)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        {/* 3. Signed On */}
                                        <td className="px-6 py-4">
                                            {waiver.isPrimary ? (
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                                                        <Calendar size={14} className="text-blue-500" />
                                                        {new Date(waiver.signed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-md w-fit">
                                                        <Clock size={12} className="text-slate-500" />
                                                        {new Date(waiver.signed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400">—</span>
                                            )}
                                        </td>

                                        {/* 4. Group Details */}
                                        <td className="px-6 py-4">
                                            {waiver.isPrimary ? (
                                                <div className="flex flex-col gap-2.5">
                                                    {/* Adults Count */}
                                                    <div className="flex items-center gap-2 text-sm bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                                                        <User size={14} className="text-blue-600" />
                                                        <span className="font-bold text-blue-900">
                                                            {1 + (waiver.adults?.length || 0)} Adult{(1 + (waiver.adults?.length || 0)) > 1 ? 's' : ''}
                                                        </span>
                                                    </div>

                                                    {/* Minors Details */}
                                                    {waiver.minors && waiver.minors.length > 0 && (
                                                        <div className="flex flex-col gap-1.5 bg-purple-50 p-3 rounded-lg border border-purple-200">
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <Users size={14} className="text-purple-600" />
                                                                <span className="font-bold text-purple-900">{waiver.minors.length} Minor{waiver.minors.length > 1 ? 's' : ''}:</span>
                                                            </div>
                                                            <div className="ml-1 flex flex-col gap-1.5">
                                                                {waiver.minors.map((minor: any, idx: number) => (
                                                                    <div key={idx} className="text-xs bg-white px-2.5 py-1.5 rounded-md border border-purple-200 shadow-sm">
                                                                        <span className="font-bold text-purple-900">👶 {minor.name}</span>
                                                                        {minor.dob && (
                                                                            <span className="text-slate-600 ml-2">• <span className="font-semibold">Age {calculateAge(minor.dob)}</span></span>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400">—</span>
                                            )}
                                        </td>

                                        {/* 5. Arrival Status */}
                                        <td className="px-6 py-4">
                                            {waiver.isPrimary ? (
                                                waiver.is_verified ? (
                                                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-100 to-emerald-50 border-2 border-emerald-300 w-fit shadow-sm">
                                                        <CheckCircle size={16} className="text-emerald-600 fill-current" />
                                                        <span className="text-sm font-bold text-emerald-900">Arrived</span>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={(e: React.MouseEvent) => handleStatusToggle(waiver.id, waiver.is_verified, e)}
                                                        disabled={waiver.updating}
                                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-600 border-2 border-slate-300 hover:bg-slate-200 hover:border-slate-400 hover:text-slate-800 transition-all w-fit text-sm font-bold shadow-sm hover:shadow"
                                                    >
                                                        <div className="w-4 h-4 rounded-full border-2 border-current"></div>
                                                        Mark as Arrived
                                                    </button>
                                                )
                                            ) : (
                                                <span className="text-xs text-slate-400">—</span>
                                            )}
                                        </td>

                                        {/* 6. Actions */}
                                        <td className="px-6 py-4 text-right">
                                            {waiver.isPrimary ? (
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/waivers/${waiver.id}`}
                                                        className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-transparent hover:border-blue-200 shadow-sm hover:shadow"
                                                        title="View Full Details"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDownloadPDF(waiver.id)}
                                                        className="p-2.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all border border-transparent hover:border-emerald-200 shadow-sm hover:shadow"
                                                        title="Download PDF"
                                                    >
                                                        <Download size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t-2 border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100">
                    <p className="text-sm text-slate-600 font-medium">
                        Showing <span className="font-bold text-slate-900">{filteredWaivers.length}</span> of <span className="font-bold text-slate-900">{waivers.length}</span> waivers
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-blue-200 border-2 border-blue-400"></div>
                            <span>Session</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-purple-200 border-2 border-purple-400"></div>
                            <span>Party</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
