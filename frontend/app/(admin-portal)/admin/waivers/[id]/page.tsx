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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWaiver();
    }, [params.id]);

    async function loadWaiver() {
        try {
            const response = await fetch(`${API_URL}/bookings/waivers/${params.id}/`);
            const data = await response.json();
            setWaiver(data);
        } catch (error) {
            console.error('Failed to load waiver:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDownloadPDF() {
        try {
            const response = await fetch(`${API_URL}/bookings/waivers-old/${params.id}/download_pdf/`);
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

    return (
        <div className="p-8 max-w-4xl mx-auto">
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
                        <h1 className="text-3xl font-bold text-slate-900">Liability Waiver</h1>
                        <p className="text-slate-500 mt-1">Waiver ID: #{waiver.id}</p>
                    </div>
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-neon-blue text-slate-900 rounded-lg hover:bg-blue-400 transition-colors font-bold"
                    >
                        <Download size={18} />
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
                <span className="px-3 py-1.5 rounded-full text-sm font-bold border bg-emerald-100 text-emerald-700 border-emerald-200 inline-flex items-center gap-2">
                    <CheckCircle size={16} />
                    Signed & Verified
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Signer Information */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-neon-blue" />
                        Signer Information
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-medium text-slate-500 uppercase">Full Name</label>
                            <p className="text-sm font-medium text-slate-900 mt-1">{waiver.name}</p>
                        </div>

                        {waiver.email && (
                            <div>
                                <label className="text-xs font-medium text-slate-500 uppercase">Email Address</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Mail size={14} className="text-slate-400" />
                                    <p className="text-sm text-slate-900">{waiver.email}</p>
                                </div>
                            </div>
                        )}

                        {waiver.phone && (
                            <div>
                                <label className="text-xs font-medium text-slate-500 uppercase">Phone Number</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Phone size={14} className="text-slate-400" />
                                    <p className="text-sm text-slate-900">{waiver.phone}</p>
                                </div>
                            </div>
                        )}

                        {waiver.dob && (
                            <div>
                                <label className="text-xs font-medium text-slate-500 uppercase">Date of Birth</label>
                                <p className="text-sm text-slate-900 mt-1">
                                    {new Date(waiver.dob).toLocaleDateString()}
                                </p>
                            </div>
                        )}

                        <div>
                            <label className="text-xs font-medium text-slate-500 uppercase">Participant Type</label>
                            <div className="mt-1">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${waiver.participant_type === 'ADULT'
                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                    : 'bg-purple-100 text-purple-700 border border-purple-200'
                                    }`}>
                                    {waiver.participant_type === 'ADULT' ? <User size={12} /> : <Users size={12} />}
                                    {waiver.participant_type === 'ADULT' ? 'Adult' : 'Minor'}
                                </span>
                            </div>
                        </div>

                        {waiver.emergency_contact && (
                            <div>
                                <label className="text-xs font-medium text-slate-500 uppercase">Emergency Contact</label>
                                <p className="text-sm text-slate-900 mt-1">{waiver.emergency_contact}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Signing Details */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-neon-blue" />
                        Signing Details
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-medium text-slate-500 uppercase">Signed On</label>
                            <div className="flex items-center gap-2 mt-1">
                                <Calendar size={14} className="text-slate-400" />
                                <p className="text-sm text-slate-900">
                                    {new Date(waiver.signed_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Clock size={14} className="text-slate-400" />
                                <p className="text-sm text-slate-500">
                                    {new Date(waiver.signed_at).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>

                        {waiver.ip_address && (
                            <div>
                                <label className="text-xs font-medium text-slate-500 uppercase">IP Address</label>
                                <p className="text-sm text-slate-900 mt-1 font-mono">{waiver.ip_address}</p>
                            </div>
                        )}

                        <div>
                            <label className="text-xs font-medium text-slate-500 uppercase">Waiver Version</label>
                            <p className="text-sm text-slate-900 mt-1">{waiver.version}</p>
                        </div>

                        {waiver.is_primary_signer && (
                            <div>
                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
                                    Primary Signer
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Booking */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:col-span-2">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Related Booking</h3>

                    {waiver.booking && (
                        <div className="space-y-2">
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Booking Type:</span> Session Booking
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Booking ID:</span> #{waiver.booking.id}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Date:</span> {waiver.booking.date}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Time:</span> {waiver.booking.time}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Participants:</span> {waiver.booking.adults} Adults, {waiver.booking.kids} Kids
                            </p>
                        </div>
                    )}

                    {waiver.party_booking && (
                        <div className="space-y-2">
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Booking Type:</span> Party Booking
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Booking ID:</span> #{waiver.party_booking.id}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Package:</span> {waiver.party_booking.package_name}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Date:</span> {waiver.party_booking.date}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Time:</span> {waiver.party_booking.time}
                            </p>
                            <p className="text-sm text-slate-600">
                                <span className="font-medium">Participants:</span> {waiver.party_booking.adults} Adults, {waiver.party_booking.kids} Kids
                            </p>
                            {waiver.party_booking.birthday_child_name && (
                                <p className="text-sm text-slate-600">
                                    <span className="font-medium">Birthday Child:</span> {waiver.party_booking.birthday_child_name} (Age {waiver.party_booking.birthday_child_age})
                                </p>
                            )}
                        </div>
                    )}

                    {!waiver.booking && !waiver.party_booking && (
                        <p className="text-sm text-slate-500 italic">Walk-in waiver (no booking associated)</p>
                    )}
                </div>
            </div>
        </div>
    );
}
