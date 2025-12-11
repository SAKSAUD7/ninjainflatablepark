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

            const data = await getWaivers();
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

            // Add additional adults
            if (waiver.adults && Array.isArray(waiver.adults)) {
                waiver.adults.forEach((adult: any, index: number) => {
                    flatList.push({
                        ...waiver, // Inherit parent details
                        name: adult.name,
                        dob: adult.dob,
                        email: null, // Additional adults usually don't have separate email captured
                        phone: null,
                        participant_type: 'ADULT',
                        minors: [], // Minors belong to the primary signer
                        isPrimary: false,
                        isAdditionalAdult: true,
                        uniqueId: `${waiver.id}-adult-${index}`
                    });
                });
            }
        });
        return flatList;
    }, [waivers]);

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
                    bookingType, // Add bookingType explicitly
                    totalParticipants: relatedWaivers.length,
                    adultCount: relatedWaivers.filter((w: any) => w.participant_type === 'ADULT').length,
                    minorCount: relatedWaivers.filter((w: any) => w.participant_type === 'MINOR').length
                });
            }
        });

        return Array.from(bookingMap.values());
    })();


    // Filter logic for both views
    const filteredWaivers = (viewMode === "grouped" ? groupedWaivers : flattenedWaivers).filter(waiver => {
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

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder={viewMode === "grouped" ? "Search by primary signer..." : "Search by signer name or email..."}
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none text-slate-900"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {viewMode === "all" && (
                        <select
                            value={typeFilter}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue"
                        >
                            <option value="ALL">All Types</option>
                            <option value="ADULT">Adults Only</option>
                            <option value="MINOR">Minors Only</option>
                        </select>
                    )}
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
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking Ref</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {viewMode === "grouped" ? "Primary Signer" : "Signer Name"}
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Telephone</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">DOB</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date of Arrival</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    Minors
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {viewMode === "grouped" ? "Participants" : "Type"}
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredWaivers.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="px-6 py-12 text-center text-slate-500">
                                        No waivers found
                                    </td>
                                </tr>
                            ) : viewMode === "grouped" ? (
                                filteredWaivers.map((waiver: any) => (
                                    <tr key={waiver.id} className="hover:bg-slate-50 transition-colors group">
                                        {/* Grouped View Columns */}
                                        {/* 1. Booking Ref */}
                                        <td className="px-6 py-4">
                                            {waiver.booking_reference ? (
                                                <span className={`text-sm font-medium ${waiver.bookingType === 'PARTY' ? 'text-purple-600' : 'text-neon-blue'}`}>
                                                    {waiver.booking_reference}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Walk-in</span>
                                            )}
                                        </td>
                                        {/* 2. Primary Signer */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                                                    ${waiver.bookingType === 'PARTY'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-blue-100 text-blue-700'}`}>
                                                    {(waiver.name || 'U').charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-bold text-slate-900">{waiver.name || 'Unknown'}</p>
                                                        {waiver.bookingType === 'PARTY' && (
                                                            <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-wider border border-purple-200">
                                                                Party
                                                            </span>
                                                        )}
                                                        {waiver.bookingType === 'SESSION' && (
                                                            <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                                                                Session
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* 3. Email */}
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {waiver.email || <span className="text-slate-400 italic">N/A</span>}
                                        </td>
                                        {/* 4. Telephone */}
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {waiver.phone || <span className="text-slate-400 italic">N/A</span>}
                                        </td>
                                        {/* 5. DOB */}
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {waiver.dob || <span className="text-slate-400 italic">N/A</span>}
                                        </td>
                                        {/* 6. Date of Arrival */}
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
                                        {/* 7. Minors */}
                                        <td className="px-6 py-4">
                                            {waiver.minors && waiver.minors.length > 0 ? (
                                                <div className="flex flex-col gap-2">
                                                    {waiver.minors.map((m: any, idx: number) => (
                                                        <div key={idx} className="text-sm text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                                                            <div className="grid grid-cols-[auto,1fr] gap-x-2 gap-y-0.5">
                                                                <span className="text-xs font-bold text-slate-400 uppercase">Name:</span>
                                                                <span className="font-medium text-slate-900">{m.name}</span>

                                                                <span className="text-xs font-bold text-slate-400 uppercase">DOB:</span>
                                                                <span>{m.dob || 'N/A'}</span>

                                                                <span className="text-xs font-bold text-slate-400 uppercase">Age:</span>
                                                                <span>{calculateAge(m.dob)}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">None</span>
                                            )}
                                        </td>
                                        {/* 8. Participants */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-bold text-slate-900">
                                                    {waiver.totalParticipants} Total
                                                </span>
                                                <div className="flex gap-2">
                                                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                        {waiver.adultCount} Adult{waiver.adultCount !== 1 ? 's' : ''}
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                                        {waiver.minorCount} Minor{waiver.minorCount !== 1 ? 's' : ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        {/* 9. Status */}
                                        <td className="px-6 py-4">
                                            {waiver.is_verified ? (
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 w-fit">
                                                    <CheckCircle size={14} className="fill-current" />
                                                    <span className="text-xs font-bold">Arrived</span>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={(e: React.MouseEvent) => handleStatusToggle(waiver.id, waiver.is_verified, e)}
                                                    disabled={waiver.updating}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 hover:text-slate-700 transition-colors w-fit text-xs font-bold"
                                                >
                                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-current opacity-60"></div>
                                                    Mark Arrived
                                                </button>
                                            )}
                                        </td>
                                        {/* 10. Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/waivers/${waiver.id}`}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-neon-blue hover:bg-slate-100 rounded-lg transition-colors font-medium"
                                            >
                                                <Eye size={16} />
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                // All Waivers View
                                filteredWaivers.map((waiver: any) => (
                                    <tr key={waiver.uniqueId || waiver.id} className="hover:bg-slate-50 transition-colors group">
                                        {/* 1. Booking Ref */}
                                        <td className="px-6 py-4">
                                            {waiver.booking_reference ? (
                                                <span className="text-sm font-medium text-neon-blue">
                                                    {waiver.booking_reference}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Walk-in</span>
                                            )}
                                        </td>
                                        {/* 2. Signer Name */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                                    {(waiver.name || 'U').charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{waiver.name || 'Unknown'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        {/* 3. Email */}
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {waiver.email || <span className="text-slate-400 italic">N/A</span>}
                                        </td>
                                        {/* 4. Telephone */}
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {waiver.phone || <span className="text-slate-400 italic">N/A</span>}
                                        </td>
                                        {/* 5. DOB */}
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {waiver.dob || <span className="text-slate-400 italic">N/A</span>}
                                        </td>
                                        {/* 6. Date of Arrival */}
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
                                        {/* 7. Minors */}
                                        <td className="px-6 py-4">
                                            {waiver.minors && waiver.minors.length > 0 ? (
                                                <div className="flex flex-col gap-2">
                                                    {waiver.minors.map((m: any, idx: number) => (
                                                        <div key={idx} className="text-sm text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                                                            <div className="grid grid-cols-[auto,1fr] gap-x-2 gap-y-0.5">
                                                                <span className="text-xs font-bold text-slate-400 uppercase">Name:</span>
                                                                <span className="font-medium text-slate-900">{m.name}</span>

                                                                <span className="text-xs font-bold text-slate-400 uppercase">DOB:</span>
                                                                <span>{m.dob || 'N/A'}</span>

                                                                <span className="text-xs font-bold text-slate-400 uppercase">Age:</span>
                                                                <span>{calculateAge(m.dob)}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">None</span>
                                            )}
                                        </td>
                                        {/* 8. Type */}
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${waiver.participant_type === 'ADULT'
                                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                : 'bg-purple-100 text-purple-700 border border-purple-200'
                                                }`}>
                                                {waiver.participant_type === 'ADULT' ? <User size={12} /> : <Users size={12} />}
                                                {waiver.participant_type === 'ADULT' ? 'Adult' : 'Minor'}
                                            </span>
                                        </td>
                                        {/* 9. Status */}
                                        <td className="px-6 py-4">
                                            {waiver.is_verified ? (
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 w-fit">
                                                    <CheckCircle size={14} className="fill-current" />
                                                    <span className="text-xs font-bold">Arrived</span>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={(e: React.MouseEvent) => handleStatusToggle(waiver.id, waiver.is_verified, e)}
                                                    disabled={waiver.updating}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 hover:text-slate-700 transition-colors w-fit text-xs font-bold"
                                                >
                                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-current opacity-60"></div>
                                                    Mark Arrived
                                                </button>
                                            )}
                                        </td>
                                        {/* 10. Actions */}
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
