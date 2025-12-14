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
    Users,
    Filter,
    SlidersHorizontal,
    X
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export default function AdminWaivers() {
    const [waivers, setWaivers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [bookingTypeFilter, setBookingTypeFilter] = useState("ALL");
    const [viewMode, setViewMode] = useState<"all" | "grouped">("grouped"); // Default to grouped view

    // Advanced filters
    const [dateFilter, setDateFilter] = useState("ALL"); // ALL, TODAY, THIS_WEEK, THIS_MONTH, CUSTOM
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [checkInFilter, setCheckInFilter] = useState("ALL"); // ALL, CHECKED_IN, PENDING
    const [sortBy, setSortBy] = useState("date_desc"); // date_desc, date_asc, name_asc, name_desc
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        loadWaivers();
    }, []);

    async function fetchWaiversWithStatus() {
        // Fetch waivers and bookings in parallel to merge status
        // This is a robust workaround to ensure 'arrived' status is accurate even if WaiverSerializer is cached/stale
        const [waiversRes, bookingsRes] = await Promise.all([
            fetch(`${API_URL}/bookings/waivers/`, { credentials: 'include', cache: 'no-store' }),
            fetch(`${API_URL}/bookings/bookings/?type=SESSION&limit=100`, { credentials: 'include', cache: 'no-store' })
        ]);

        if (!waiversRes.ok) throw new Error(`API returned ${waiversRes.status}`);

        const waiversData = await waiversRes.json();

        if (!Array.isArray(waiversData)) {
            console.error("Invalid waiver data format", waiversData);
            return [];
        }

        // Merge arrived status from bookings
        const arrivedMap = new Map<number, boolean>();
        if (bookingsRes.ok) {
            try {
                const bookingsData = await bookingsRes.json();
                const bookingsList = Array.isArray(bookingsData) ? bookingsData : (bookingsData.results || []);
                bookingsList.forEach((b: any) => {
                    if (b.id) arrivedMap.set(b.id, !!b.arrived);
                });
            } catch (e) {
                console.error("Failed to parse bookings for status", e);
            }
        }

        return waiversData.map((w: any) => {
            const bookingId = w.booking;
            if (bookingId && arrivedMap.has(bookingId)) {
                return { ...w, arrived: arrivedMap.get(bookingId) };
            }
            return w;
        });
    }

    async function loadWaivers() {
        try {
            setLoading(true);
            const data = await fetchWaiversWithStatus();
            setWaivers(data);
            // toast.success(`Loaded ${data.length} waivers`); 
        } catch (error) {
            console.error('Failed to load waivers:', error);
            setWaivers([]);
            toast.error('Failed to load waivers');
        } finally {
            setLoading(false);
        }
    }

    // Real-time polling for new waivers
    useEffect(() => {
        let previousCount = waivers.length;

        const pollInterval = setInterval(async () => {
            try {
                const data = await fetchWaiversWithStatus();
                if (data.length > 0) {
                    if (data.length > previousCount) {
                        const newCount = data.length - previousCount;
                        console.log(`${newCount} new waiver(s) received!`);
                    }
                    previousCount = data.length;
                    setWaivers(data);
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

    async function handleMarkArrived(bookingId: number, bookingType: 'session' | 'party', e: React.MouseEvent) {
        e.stopPropagation(); // Prevent row click

        try {
            // Optimistic update - immediately show as arrived
            setWaivers(prev => prev.map(w => {
                const matchesBooking = bookingType === 'session'
                    ? w.booking === bookingId
                    : w.party_booking === bookingId;
                return matchesBooking ? { ...w, arrived: true } : w;
            }));

            const { markBookingArrived, markPartyBookingArrived } = await import('@/lib/client-api');
            const result = bookingType === 'session'
                ? await markBookingArrived(bookingId)
                : await markPartyBookingArrived(bookingId);

            if (result.success) {
                toast.success(`Booking #${bookingId} marked as arrived!`);
                // Reload waivers to get updated data from server
                await loadWaivers();
            } else {
                // Revert on failure
                setWaivers(prev => prev.map(w => {
                    const matchesBooking = bookingType === 'session'
                        ? w.booking === bookingId
                        : w.party_booking === bookingId;
                    return matchesBooking ? { ...w, arrived: false } : w;
                }));
                toast.error("Failed to mark booking as arrived");
            }
        } catch (error) {
            // Revert on error
            setWaivers(prev => prev.map(w => {
                const matchesBooking = bookingType === 'session'
                    ? w.booking === bookingId
                    : w.party_booking === bookingId;
                return matchesBooking ? { ...w, arrived: false } : w;
            }));
            console.error("Mark arrived error:", error);
            toast.error("Failed to mark booking as arrived");
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
    const groupedWaivers = useMemo(() => {
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
    }, [waivers]);


    // Advanced filter logic with useMemo for performance
    const filteredWaivers = useMemo(() => {
        let filtered = (viewMode === "grouped" ? groupedWaivers : flattenedWaivers).filter(waiver => {
            // Search filter
            const matchesSearch =
                waiver.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                waiver.email?.toLowerCase().includes(searchTerm.toLowerCase());

            // Participant type filter
            const matchesType = typeFilter === "ALL" || waiver.participant_type === typeFilter;

            // Booking type filter
            const matchesBookingType =
                bookingTypeFilter === "ALL" ||
                (bookingTypeFilter === "SESSION" && waiver.booking) ||
                (bookingTypeFilter === "PARTY" && waiver.party_booking);

            // Check-in status filter
            const matchesCheckIn =
                checkInFilter === "ALL" ||
                (checkInFilter === "CHECKED_IN" && waiver.is_verified) ||
                (checkInFilter === "PENDING" && !waiver.is_verified);

            // Date filter
            let matchesDate = true;
            const waiverDate = waiver.booking_date ? new Date(waiver.booking_date) : new Date(waiver.created_at);

            if (dateFilter !== "ALL") {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                switch (dateFilter) {
                    case "TODAY":
                        matchesDate = waiverDate.toDateString() === today.toDateString();
                        break;
                    case "THIS_WEEK":
                        const weekStart = new Date(today);
                        weekStart.setDate(today.getDate() - today.getDay());
                        const weekEnd = new Date(weekStart);
                        weekEnd.setDate(weekStart.getDate() + 6);
                        weekEnd.setHours(23, 59, 59, 999);
                        matchesDate = waiverDate >= weekStart && waiverDate <= weekEnd;
                        break;
                    case "THIS_MONTH":
                        matchesDate =
                            waiverDate.getMonth() === today.getMonth() &&
                            waiverDate.getFullYear() === today.getFullYear();
                        break;
                    case "CUSTOM":
                        if (startDate && endDate) {
                            const start = new Date(startDate);
                            start.setHours(0, 0, 0, 0);
                            const end = new Date(endDate);
                            end.setHours(23, 59, 59, 999);
                            matchesDate = waiverDate >= start && waiverDate <= end;
                        }
                        break;
                }
            }

            return matchesSearch && (viewMode === "grouped" || matchesType) && matchesBookingType && matchesCheckIn && matchesDate;
        });

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "date_desc":
                    const dateA = new Date(a.booking_date || a.created_at).getTime();
                    const dateB = new Date(b.booking_date || b.created_at).getTime();
                    return dateB - dateA;
                case "date_asc":
                    const dateA2 = new Date(a.booking_date || a.created_at).getTime();
                    const dateB2 = new Date(b.booking_date || b.created_at).getTime();
                    return dateA2 - dateB2;
                case "name_asc":
                    return (a.name || "").localeCompare(b.name || "");
                case "name_desc":
                    return (b.name || "").localeCompare(a.name || "");
                default:
                    return 0;
            }
        });

        return filtered;
    }, [viewMode, groupedWaivers, flattenedWaivers, searchTerm, typeFilter, bookingTypeFilter, checkInFilter, dateFilter, startDate, endDate, sortBy]);

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

                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 items-center">
                    {/* View Mode Toggle */}
                    <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-medium">
                        <button
                            onClick={() => setViewMode("all")}
                            className={`px-3 py-1.5 rounded-md transition-all ${viewMode === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            All Signers
                        </button>
                        <button
                            onClick={() => setViewMode("grouped")}
                            className={`px-3 py-1.5 rounded-md transition-all ${viewMode === "grouped" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            Grouped by Booking
                        </button>
                    </div>

                    <div className="h-6 w-px bg-slate-300 mx-2 hidden md:block"></div>

                    {viewMode === "all" && (
                        <select
                            value={typeFilter}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue"
                        >
                            <option value="ALL">All Participants</option>
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

                    {/* Advanced Filters Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${showFilters
                            ? 'bg-neon-blue border-neon-blue text-slate-900'
                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        <SlidersHorizontal size={16} />
                        Advanced
                    </button>
                </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Filter size={16} />
                            Advanced Filters
                        </h3>
                        <button
                            onClick={() => {
                                setDateFilter("ALL");
                                setStartDate("");
                                setEndDate("");
                                setCheckInFilter("ALL");
                                setSortBy("date_desc");
                            }}
                            className="text-xs text-slate-500 hover:text-slate-700 font-medium transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Date Filter */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-2">📅 Date Range</label>
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                            >
                                <option value="ALL">All Time</option>
                                <option value="TODAY">Today</option>
                                <option value="THIS_WEEK">This Week</option>
                                <option value="THIS_MONTH">This Month</option>
                                <option value="CUSTOM">Custom Range</option>
                            </select>
                        </div>

                        {/* Check-in Status Filter */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-2">✓ Check-in Status</label>
                            <select
                                value={checkInFilter}
                                onChange={(e) => setCheckInFilter(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                            >
                                <option value="ALL">All Status</option>
                                <option value="CHECKED_IN">✓ Checked In</option>
                                <option value="PENDING">⏳ Pending Check-in</option>
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-2">↕ Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                            >
                                <option value="date_desc">📅 Newest First</option>
                                <option value="date_asc">📅 Oldest First</option>
                                <option value="name_asc">🔤 Name (A-Z)</option>
                                <option value="name_desc">🔤 Name (Z-A)</option>
                            </select>
                        </div>
                    </div>

                    {/* Custom Date Range */}
                    {dateFilter === "CUSTOM" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200 animate-in slide-in-from-top-2 duration-200">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-2">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-2">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Active Filters & Results Count */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                    {/* Results Count */}
                    <span className="text-sm text-slate-600 font-medium">
                        Showing <span className="font-bold text-neon-blue">{filteredWaivers.length}</span> of <span className="font-bold text-slate-900">{viewMode === "grouped" ? groupedWaivers.length : flattenedWaivers.length}</span> {viewMode === "grouped" ? "bookings" : "waivers"}
                    </span>

                    {/* Active Filter Chips */}
                    {(dateFilter !== "ALL" || checkInFilter !== "ALL" || typeFilter !== "ALL" || bookingTypeFilter !== "ALL") && (
                        <>
                            <span className="text-slate-400">|</span>
                            <span className="text-xs text-slate-500 font-medium">Active:</span>

                            {dateFilter !== "ALL" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors">
                                    {dateFilter === "CUSTOM" ? `${startDate} to ${endDate}` : dateFilter.replace("_", " ")}
                                    <button onClick={() => { setDateFilter("ALL"); setStartDate(""); setEndDate(""); }} className="hover:bg-blue-300 rounded-full p-0.5 transition-colors">
                                        <X size={12} />
                                    </button>
                                </span>
                            )}

                            {checkInFilter !== "ALL" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium hover:bg-green-200 transition-colors">
                                    {checkInFilter === "CHECKED_IN" ? "✓ Checked In" : "⏳ Pending"}
                                    <button onClick={() => setCheckInFilter("ALL")} className="hover:bg-green-300 rounded-full p-0.5 transition-colors">
                                        <X size={12} />
                                    </button>
                                </span>
                            )}

                            {typeFilter !== "ALL" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors">
                                    {typeFilter}s
                                    <button onClick={() => setTypeFilter("ALL")} className="hover:bg-purple-300 rounded-full p-0.5 transition-colors">
                                        <X size={12} />
                                    </button>
                                </span>
                            )}

                            {bookingTypeFilter !== "ALL" && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium hover:bg-amber-200 transition-colors">
                                    {bookingTypeFilter}
                                    <button onClick={() => setBookingTypeFilter("ALL")} className="hover:bg-amber-300 rounded-full p-0.5 transition-colors">
                                        <X size={12} />
                                    </button>
                                </span>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase">Total Waivers</p>
                            <p className="text-2xl font-bold text-slate-900 mt-1">{waivers.length}</p>
                        </div>
                        <FileSignature className="text-slate-300" size={32} />
                    </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-blue-700 uppercase">Session Bookings</p>
                            <p className="text-2xl font-bold text-blue-900 mt-1">
                                {waivers.filter((w: any) => w.booking).length}
                            </p>
                        </div>
                        <Clock className="text-blue-300" size={32} />
                    </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-purple-700 uppercase">Party Bookings</p>
                            <p className="text-2xl font-bold text-purple-900 mt-1">
                                {waivers.filter((w: any) => w.party_booking).length}
                            </p>
                        </div>
                        <Users className="text-purple-300" size={32} />
                    </div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-emerald-700 uppercase">Checked In</p>
                            <p className="text-2xl font-bold text-emerald-900 mt-1">
                                {waivers.filter((w: any) => w.is_verified).length}
                            </p>
                        </div>
                        <CheckCircle className="text-emerald-300" size={32} />
                    </div>
                </div>
            </div>

            {/* Waivers Display */}
            {viewMode === "grouped" ? (
                // GROUPED VIEW - Card-based for better readability
                <div className="space-y-4">
                    {filteredWaivers.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                            <FileSignature size={48} className="text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500">No waivers found matching your filters</p>
                        </div>
                    ) : (
                        filteredWaivers.map((waiver: any) => (
                            <div key={waiver.uniqueId || waiver.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                {/* Header */}
                                <div className={`p-4 border-b ${waiver.bookingType === 'PARTY' ? 'bg-purple-50 border-purple-100' : 'bg-blue-50 border-blue-100'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {waiver.bookingType === 'PARTY' ? (
                                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-sm font-bold shadow-sm">
                                                    <Users size={16} /> PARTY BOOKING
                                                </span>
                                            ) : waiver.bookingType === 'SESSION' ? (
                                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-sm">
                                                    <Clock size={16} /> SESSION BOOKING
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-600 text-white text-sm font-bold">
                                                    WALK-IN
                                                </span>
                                            )}
                                            <span className="font-mono text-sm font-medium text-slate-700">
                                                Ref: {waiver.booking_reference || 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right text-sm">
                                                <p className="font-medium text-slate-900">{new Date(waiver.signed_at).toLocaleDateString()}</p>
                                                <p className="text-xs text-slate-500">{new Date(waiver.signed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            </div>

                                            {/* Arrived Button - Show for both session and party bookings */}
                                            {(waiver.booking || waiver.party_booking) && (
                                                waiver.arrived ? (
                                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-100 text-green-700 border-2 border-green-300">
                                                        <CheckCircle size={16} className="fill-current" />
                                                        <span className="text-sm font-bold">Arrived</span>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={(e: React.MouseEvent) => handleMarkArrived(
                                                            waiver.booking || waiver.party_booking,
                                                            waiver.booking ? 'session' : 'party',
                                                            e
                                                        )}
                                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-sm font-bold"
                                                    >
                                                        <CheckCircle size={16} />
                                                        Mark Arrived
                                                    </button>
                                                )
                                            )}

                                            {waiver.is_verified ? (
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 border-2 border-emerald-300">
                                                    <CheckCircle size={16} className="fill-current" />
                                                    <span className="text-sm font-bold">Checked In</span>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={(e: React.MouseEvent) => handleStatusToggle(waiver.id, waiver.is_verified, e)}
                                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white text-slate-700 border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all text-sm font-bold"
                                                >
                                                    <div className="w-4 h-4 rounded-full border-2 border-slate-400"></div>
                                                    Check In
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Left: Primary Signer */}
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <User size={14} /> Primary Signer (Adult)
                                            </h3>
                                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                                <div className="flex items-start gap-4">
                                                    <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-lg
                                                        ${waiver.bookingType === 'PARTY' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                        {(waiver.name || 'U').charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-lg font-bold text-slate-900">{waiver.name || 'Unknown'}</p>
                                                        {waiver.dob && <p className="text-sm text-slate-600 mt-1">DOB: {waiver.dob}</p>}
                                                        <div className="mt-3 space-y-2">
                                                            {waiver.email && (
                                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                                    <Mail size={14} className="text-slate-400 flex-shrink-0" />
                                                                    <span className="truncate">{waiver.email}</span>
                                                                </div>
                                                            )}
                                                            {waiver.phone && (
                                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                                    <Phone size={14} className="text-slate-400 flex-shrink-0" />
                                                                    <span>{waiver.phone}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: Group Members */}
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <Users size={14} /> Group Members ({waiver.totalParticipants} Total)
                                            </h3>
                                            <div className="space-y-3">
                                                {/* Summary */}
                                                <div className="flex gap-2">
                                                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                                                        {waiver.adultCount} Adult{waiver.adultCount !== 1 ? 's' : ''}
                                                    </span>
                                                    {waiver.minorCount > 0 && (
                                                        <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200">
                                                            {waiver.minorCount} Minor{waiver.minorCount !== 1 ? 's' : ''}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Minors */}
                                                {waiver.minors?.length > 0 && (
                                                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                                                        <p className="text-xs font-bold text-amber-900 uppercase mb-2 flex items-center gap-1">
                                                            <Users size={12} /> Minors (Signed by {waiver.name})
                                                        </p>
                                                        <div className="space-y-2">
                                                            {waiver.minors.map((m: any, idx: number) => (
                                                                <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border border-amber-100">
                                                                    <span className="font-medium text-slate-900 text-sm">{m.name}</span>
                                                                    <span className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded font-bold">
                                                                        Age {calculateAge(m.dob)}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Additional Adults */}
                                                {waiver.adults?.length > 0 && (
                                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                                        <p className="text-xs font-bold text-slate-700 uppercase mb-3 flex items-center gap-1">
                                                            <Users size={14} /> Additional Adults ({waiver.adults.length})
                                                        </p>
                                                        <div className="space-y-3">
                                                            {waiver.adults.map((adult: any, idx: number) => (
                                                                <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200">
                                                                    <div className="flex items-start gap-3">
                                                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 flex-shrink-0">
                                                                            {(adult.name || 'A').charAt(0).toUpperCase()}
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="font-bold text-slate-900">{adult.name}</p>
                                                                            {adult.email && (
                                                                                <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                                                                                    <Mail size={12} className="text-slate-400" />
                                                                                    <span className="truncate">{adult.email}</span>
                                                                                </div>
                                                                            )}
                                                                            {adult.phone && (
                                                                                <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                                                                                    <Phone size={12} className="text-slate-400" />
                                                                                    <span>{adult.phone}</span>
                                                                                </div>
                                                                            )}
                                                                            {adult.dob && (
                                                                                <p className="text-xs text-slate-500 mt-1">DOB: {adult.dob}</p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {waiver.minors?.length === 0 && waiver.adults?.length === 0 && (
                                                    <p className="text-sm text-slate-400 italic text-center py-4">No additional participants</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
                                        <Link
                                            href={`/admin/waivers/${waiver.id}`}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                                        >
                                            <Eye size={16} />
                                            View Full Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
                // TABLE VIEW - For individual participants
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking Ref</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Participant</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Minors</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Details</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredWaivers.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <FileSignature size={32} className="text-slate-300" />
                                                <p>No waivers found matching your filters</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    // --- ALL PARTICIPANTS VIEW (Flat List) ---
                                    filteredWaivers.map((waiver: any) => (
                                        <tr key={waiver.uniqueId || waiver.id} className="hover:bg-slate-50 transition-colors">
                                            {/* 1. Type Badge */}
                                            <td className="px-6 py-4">
                                                {waiver.booking ? (
                                                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block mr-2" title="Session"></span>
                                                ) : waiver.party_booking ? (
                                                    <span className="w-2 h-2 rounded-full bg-purple-500 inline-block mr-2" title="Party"></span>
                                                ) : null}
                                                <span className="text-xs font-bold text-slate-600">
                                                    {waiver.booking ? 'SESSION' : waiver.party_booking ? 'PARTY' : 'WALK-IN'}
                                                </span>
                                            </td>

                                            {/* 2. Ref */}
                                            <td className="px-6 py-4 font-mono text-sm text-slate-600">
                                                {waiver.booking_reference || '-'}
                                            </td>

                                            {/* 3. Participant Name */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className={`p-1.5 rounded-md text-xs font-bold border ${waiver.participant_type === 'ADULT'
                                                        ? 'bg-white text-slate-700 border-slate-200'
                                                        : 'bg-amber-50 text-amber-700 border-amber-200'
                                                        }`}>
                                                        {waiver.participant_type === 'ADULT' ? 'ADULT' : 'MINOR'}
                                                    </span>
                                                    <span className="text-sm font-medium text-slate-900">{waiver.name}</span>
                                                </div>
                                            </td>

                                            {/* 4. Contact/Guardian */}
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {waiver.participant_type === 'MINOR' ? (
                                                    <span className="text-xs flex items-center gap-1">
                                                        Guardian: <span className="font-medium text-slate-700">{waiver.guardianName || 'Unknown'}</span>
                                                    </span>
                                                ) : (
                                                    <span className="truncate max-w-[150px] block">{waiver.email || '-'}</span>
                                                )}
                                            </td>

                                            {/* 5. Minors Column */}
                                            <td className="px-6 py-4 align-top">
                                                {waiver.minors?.length > 0 ? (
                                                    <div className="flex flex-col gap-1 min-w-[150px]">
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 w-fit">
                                                            {waiver.minors.length} Minor{waiver.minors.length !== 1 ? 's' : ''}
                                                        </span>
                                                        <div className="space-y-1 mt-1">
                                                            {waiver.minors.map((m: any, idx: number) => (
                                                                <div key={idx} className="flex flex-col text-xs text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100">
                                                                    <span className="font-medium text-slate-900">{m.name}</span>
                                                                    <span className="text-[10px] text-slate-500">Age {calculateAge(m.dob)}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-300 text-xs">-</span>
                                                )}
                                            </td>

                                            {/* 6. Date */}
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {new Date(waiver.signed_at).toLocaleDateString()}
                                            </td>

                                            {/* 7. Details (DOB/Age) */}
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">
                                                    Age {calculateAge(waiver.dob)}
                                                </span>
                                            </td>

                                            {/* 8. Status */}
                                            <td className="px-6 py-4">
                                                {waiver.is_verified ? (
                                                    <CheckCircle size={16} className="text-emerald-500" />
                                                ) : (
                                                    <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                                                )}
                                            </td>

                                            {/* 8. Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/admin/waivers/${waiver.id}`} className="text-slate-400 hover:text-neon-blue">
                                                    <Eye size={16} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 flex justify-between items-center text-sm text-slate-500">
                        <span>Showing <strong>{filteredWaivers.length}</strong> results</span>
                        <span>Individual Signers View</span>
                    </div>
                </div>
            )}
        </div>
    );
}
