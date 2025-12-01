import { getAdminSession } from "../../../../lib/admin-auth";
import { getWaiverById } from "../../../../actions/admin";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Download, Calendar, User, Mail, Phone, CheckCircle2 } from "lucide-react";
import { formatDate } from "@repo/utils";

export default async function WaiverDetailPage({ params }: { params: { id: string } }) {
    const session = await getAdminSession();
    if (!session) redirect("/admin/login");

    // Fetch waiver with booking details
    const waiver = await getWaiverById(params.id);

    if (!waiver) {
        return <div className="p-8">Waiver not found</div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <Link href="/admin/waivers" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6 transition-colors">
                <ArrowLeft size={18} className="mr-2" /> Back to Waivers
            </Link>

            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Liability Waiver</h1>
                            <p className="text-slate-500 text-sm mt-1">Waiver ID: #{String(waiver.id).slice(-8).toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                            <Download size={18} /> Download PDF
                        </button>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                    <span className="px-4 py-2 rounded-full text-sm font-bold border bg-emerald-100 text-emerald-700 border-emerald-200 inline-flex items-center gap-2">
                        <CheckCircle2 size={16} />
                        Signed & Verified
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Signer Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Signer Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs text-slate-500 uppercase font-semibold">Full Name</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <User className="w-4 h-4 text-slate-400" />
                                    <p className="text-slate-900 font-medium">{waiver.name}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase font-semibold">Email Address</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <p className="text-slate-900 font-medium">{waiver.email}</p>
                                </div>
                            </div>
                            {waiver.phone && (
                                <div>
                                    <label className="text-xs text-slate-500 uppercase font-semibold">Phone Number</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        <p className="text-slate-900 font-medium">{waiver.phone}</p>
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="text-xs text-slate-500 uppercase font-semibold">Date of Birth</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <p className="text-slate-900 font-medium">{waiver.dob ? formatDate(waiver.dob) : 'Not provided'}</p>
                                </div>
                            </div>
                        </div>

                        {waiver.emergencyContact && (
                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <h3 className="text-sm font-bold text-slate-900 mb-3">Emergency Contact</h3>
                                <p className="text-slate-900 font-medium">{waiver.emergencyContact}</p>
                            </div>
                        )}

                        {waiver.minors && (
                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <h3 className="text-sm font-bold text-slate-900 mb-3">Minors Information</h3>
                                <p className="text-sm text-slate-600">{waiver.minors}</p>
                            </div>
                        )}
                    </div>

                    {/* Waiver Content */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Waiver Terms</h2>
                        <div className="prose prose-sm max-w-none text-slate-600">
                            <p className="mb-4">
                                I hereby acknowledge that I have voluntarily chosen to participate in activities at Ninja Inflatable Park.
                                I understand that these activities involve inherent risks, including but not limited to physical injury.
                            </p>
                            <p className="mb-4">
                                I agree to assume all risks associated with participation and release Ninja Inflatable Park, its owners,
                                employees, and agents from any and all liability for injuries or damages that may occur during my visit.
                            </p>
                            <p className="mb-4">
                                I confirm that I am in good physical health and have no medical conditions that would prevent safe participation.
                                I agree to follow all safety rules and instructions provided by park staff.
                            </p>
                            <p className="text-xs text-slate-500 mt-6">
                                Version: {waiver.version}
                            </p>
                        </div>

                        {waiver.fileUrl && (
                            <div className="mt-6 pt-6 border-t border-slate-200">
                                <label className="text-xs text-slate-500 uppercase font-semibold">Signed Document</label>
                                <a
                                    href={waiver.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                                >
                                    <FileText className="w-4 h-4" />
                                    View Signed PDF
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Signing Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Signing Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-slate-500 uppercase font-semibold">Signed On</label>
                                <p className="text-sm font-medium text-slate-900 mt-1">{formatDate(waiver.signedAt)}</p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {new Date(waiver.signedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Related Booking */}
                    {waiver.booking && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Related Booking</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs text-slate-500 uppercase font-semibold">Booking ID</label>
                                    <p className="text-sm font-medium text-slate-900 mt-1">#{String(waiver.booking.id).slice(-6).toUpperCase()}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 uppercase font-semibold">Customer</label>
                                    <p className="text-sm font-medium text-slate-900 mt-1">{waiver.booking.customer?.name || 'Unknown'}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-500 uppercase font-semibold">Visit Date</label>
                                    <p className="text-sm font-medium text-slate-900 mt-1">{formatDate(waiver.booking.date)}</p>
                                </div>
                                <Link
                                    href={`/admin/bookings/${waiver.booking.id}`}
                                    className="block w-full text-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm mt-4"
                                >
                                    View Booking Details
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
