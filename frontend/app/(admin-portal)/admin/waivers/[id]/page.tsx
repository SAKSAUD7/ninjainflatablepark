"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    Calendar,
    Clock,
    Download,
    CheckCircle,
    FileText,
    Users
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export default function WaiverDetailsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [waiver, setWaiver] = useState<any>(null);
    const [allWaivers, setAllWaivers] = useState<any[]>([]);
    const [relatedWaivers, setRelatedWaivers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWaiver();
    }, [params.id]);

    async function loadWaiver() {
        try {
            // Load the primary waiver
            const response = await fetch(`${API_URL}/bookings/waivers/${params.id}/`);
            const data = await response.json();
            setWaiver(data);

            console.log('Primary waiver data:', data); // Debug log

            // Load all waivers to find related ones
            const allResponse = await fetch(`${API_URL}/bookings/waivers/`);
            const allData = await allResponse.json();
            setAllWaivers(allData);

            console.log('All waivers:', allData); // Debug log

            // Extract booking ID - handle both object and direct ID
            const bookingId = typeof data.booking === 'object' ? data.booking?.id : data.booking;
            const partyBookingId = typeof data.party_booking === 'object' ? data.party_booking?.id : data.party_booking;
            const actualBookingId = bookingId || partyBookingId;
            const bookingType = bookingId ? 'SESSION' : 'PARTY';

            console.log('Looking for booking:', { actualBookingId, bookingType }); // Debug log

            // Find all waivers for the same booking
            const related = allData.filter((w: any) => {
                const wBookingId = typeof w.booking === 'object' ? w.booking?.id : w.booking;
                const wPartyBookingId = typeof w.party_booking === 'object' ? w.party_booking?.id : w.party_booking;
                const wActualBookingId = wBookingId || wPartyBookingId;
                const wBookingType = wBookingId ? 'SESSION' : 'PARTY';

                return wActualBookingId === actualBookingId && wBookingType === bookingType && actualBookingId != null;
            });

            console.log('Found related waivers:', related); // Debug log
            setRelatedWaivers(related);
        } catch (error) {
            console.error('Failed to load waiver:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDownloadPDF() {
        try {
            const response = await fetch(`${API_URL}/bookings/waivers/${params.id}/download_pdf/`);
            const data = await response.json();
            alert(data.message || 'PDF download not yet implemented');
        } catch (error) {
            console.error('Failed to download PDF:', error);
            alert('Failed to download PDF');
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-blue"></div>
            </div>
        );
    }

    if (!waiver) {
        return (
            <div className="p-8">
                <div className="text-center text-slate-500">Waiver not found</div>
            </div>
        );
    }

    const adults = relatedWaivers.filter(w => w.participant_type === 'ADULT');
    const minors = relatedWaivers.filter(w => w.participant_type === 'MINOR');

    return (
        <div className="p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <Link
                    href="/admin/waivers"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Waivers
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Booking Participants</h1>
                        <p className="text-slate-500 mt-1">
                            {waiver.booking_reference || 'Walk-in'} • {relatedWaivers.length} Total Participant{relatedWaivers.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <span className="px-3 py-1.5 rounded-full text-sm font-bold border bg-emerald-100 text-emerald-700 border-emerald-200 inline-flex items-center gap-2">
                        <CheckCircle size={16} />
                        All Signed
                    </span>
                </div>
            </div>

            {/* Related Booking Info */}
            {(waiver.booking || waiver.party_booking) && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Booking Details</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="text-xs font-medium text-slate-500 uppercase">Type</label>
                            <p className="text-sm font-medium text-slate-900 mt-1">
                                {waiver.booking ? 'Session Booking' : 'Party Booking'}
                            </p>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 uppercase">Date</label>
                            <p className="text-sm font-medium text-slate-900 mt-1">
                                {typeof waiver.booking === 'object' ? waiver.booking?.date :
                                    typeof waiver.party_booking === 'object' ? waiver.party_booking?.date : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 uppercase">Time</label>
                            <p className="text-sm font-medium text-slate-900 mt-1">
                                {typeof waiver.booking === 'object' ? waiver.booking?.time :
                                    typeof waiver.party_booking === 'object' ? waiver.party_booking?.time : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-500 uppercase">Booking ID</label>
                            <p className="text-sm font-medium text-slate-900 mt-1">
                                #{typeof waiver.booking === 'object' ? waiver.booking?.id :
                                    typeof waiver.party_booking === 'object' ? waiver.party_booking?.id :
                                        waiver.booking || waiver.party_booking}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Adults Section */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Adults ({adults.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {adults.map((adult: any) => (
                        <div key={adult.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                                        {(adult.name || 'U').charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{adult.name}</p>
                                        {adult.is_primary_signer && (
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                                                Primary Signer
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                    <CheckCircle size={12} className="inline mr-1" />
                                    Signed
                                </span>
                            </div>
                            <div className="space-y-2 text-sm">
                                {adult.email && (
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Mail size={14} className="text-slate-400" />
                                        {adult.email}
                                    </div>
                                )}
                                {adult.phone && (
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Phone size={14} className="text-slate-400" />
                                        {adult.phone}
                                    </div>
                                )}
                                {adult.dob && (
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Calendar size={14} className="text-slate-400" />
                                        DOB: {new Date(adult.dob).toLocaleDateString()}
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-slate-500 text-xs pt-2 border-t border-slate-100">
                                    <Clock size={12} />
                                    Signed: {new Date(adult.signed_at).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Minors Section */}
            {minors.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600" />
                        Minors ({minors.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {minors.map((minor: any) => (
                            <div key={minor.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg">
                                            {(minor.name || 'U').charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{minor.name}</p>
                                            <span className="text-xs text-purple-600">Minor</span>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                        <CheckCircle size={12} className="inline mr-1" />
                                        Signed
                                    </span>
                                </div>
                                <div className="space-y-2 text-sm">
                                    {minor.dob && (
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Calendar size={14} className="text-slate-400" />
                                            DOB: {new Date(minor.dob).toLocaleDateString()}
                                        </div>
                                    )}
                                    {minor.emergency_contact && (
                                        <div className="text-slate-600">
                                            <span className="text-xs text-slate-500">Guardian:</span> {minor.emergency_contact}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-slate-500 text-xs pt-2 border-t border-slate-100">
                                        <Clock size={12} />
                                        Signed: {new Date(minor.signed_at).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {relatedWaivers.length === 0 && (
                <div className="text-center text-slate-500 py-12">
                    No participants found for this booking
                </div>
            )}
        </div>
    );
}
