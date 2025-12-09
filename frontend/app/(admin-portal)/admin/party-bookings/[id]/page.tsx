import { getAdminSession } from "../../../../lib/admin-auth";
import { getPartyBookingById, updatePartyBookingStatus, deletePartyBooking } from "../../../../actions/admin";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, Mail, Trash2, Calendar, User, Gift, DollarSign } from "lucide-react";
import { PartyBookingActions } from "./PartyBookingActions";

export default async function PartyBookingDetailPage({ params }: { params: { id: string } }) {
    const session = await getAdminSession();
    if (!session) redirect("/admin/login");

    const booking = await getPartyBookingById(params.id);

    if (!booking) {
        return <div className="p-8">Booking not found</div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <Link href="/admin/party-bookings" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6 transition-colors">
                <ArrowLeft size={18} className="mr-2" /> Back to Party Bookings
            </Link>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Party #{String(booking.id).slice(-6).toUpperCase()}</h1>
                    <p className="text-slate-500 mt-1">Created on {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>
                <PartyBookingActions bookingId={booking.id} customerEmail={booking.email} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Customer Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <User size={20} className="text-slate-400" /> Customer Details
                        </h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Name</label>
                                <p className="text-slate-900 font-medium">{booking.name}</p>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Email</label>
                                <p className="text-slate-900 font-medium">{booking.email}</p>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Phone</label>
                                <p className="text-slate-900 font-medium">{booking.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Party Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Calendar size={20} className="text-slate-400" /> Party Details
                        </h2>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Date</label>
                                <p className="text-slate-900 font-medium">{booking.date}</p>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Time Slot</label>
                                <p className="text-slate-900 font-medium">{booking.time} ({booking.duration} mins)</p>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Participants</label>
                                <p className="text-slate-900 font-medium">{booking.kids} Kids</p>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Spectators</label>
                                <p className="text-slate-900 font-medium">{booking.spectators}</p>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6">
                            <h3 className="text-sm font-bold text-slate-900 mb-3">Birthday Child</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs text-slate-400 uppercase font-semibold">Name</label>
                                    <p className="text-slate-900 font-medium">{booking.birthday_child_name}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400 uppercase font-semibold">Age</label>
                                    <p className="text-slate-900 font-medium">{booking.birthday_child_age} Years Old</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Package & Add-ons */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Gift size={20} className="text-slate-400" /> Package & Add-ons
                        </h2>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Package</label>
                                <p className="text-slate-900 font-medium">{booking.party_package || "Standard"}</p>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Theme</label>
                                <p className="text-slate-900 font-medium">{booking.theme || "None"}</p>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6">
                            <h3 className="text-sm font-bold text-slate-900 mb-3">Add-ons</h3>
                            <div className="flex flex-wrap gap-2">
                                {booking.decorations && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Decorations</span>}
                                {booking.catering && <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">Catering</span>}
                                {booking.cake && <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">Cake</span>}
                                {booking.photographer && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Photographer</span>}
                                {booking.party_favors && <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Party Favors</span>}
                                {!booking.decorations && !booking.catering && !booking.cake && !booking.photographer && !booking.party_favors && (
                                    <span className="text-slate-500 text-sm italic">No add-ons selected</span>
                                )}
                            </div>
                        </div>

                        {booking.special_requests && (
                            <div className="border-t border-slate-100 pt-6 mt-6">
                                <label className="text-xs text-slate-400 uppercase font-semibold">Special Requests</label>
                                <p className="text-slate-700 mt-1 bg-slate-50 p-3 rounded-lg text-sm">{booking.special_requests}</p>
                            </div>
                        )}
                        {booking.dietary_restrictions && (
                            <div className="border-t border-slate-100 pt-6 mt-6">
                                <label className="text-xs text-slate-400 uppercase font-semibold">Dietary Restrictions</label>
                                <p className="text-slate-700 mt-1 bg-slate-50 p-3 rounded-lg text-sm">{booking.dietary_restrictions}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Status</h2>
                        <div className="mb-6">
                            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold 
                ${booking.bookingStatus === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                    booking.bookingStatus === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                                        'bg-red-100 text-red-700'}`}>
                                {booking.bookingStatus || 'PENDING'}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <form action={updatePartyBookingStatus.bind(null, booking.id, "CONFIRMED")}>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                                    <Check size={18} /> Approve Booking
                                </button>
                            </form>
                            <form action={updatePartyBookingStatus.bind(null, booking.id, "CANCELLED")}>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium">
                                    <X size={18} /> Cancel Booking
                                </button>
                            </form>

                            <form action={deletePartyBooking.bind(null, booking.id)}>
                                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors font-medium mt-4">
                                    <Trash2 size={18} /> Delete Booking
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <DollarSign size={20} className="text-slate-400" /> Payment
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Total Amount</span>
                                <span className="text-lg font-bold text-slate-900">₹{booking.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600">Deposit (50%)</span>
                                <span className="text-slate-900 font-medium">₹{(booking.amount * 0.5).toLocaleString()}</span>
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-slate-500">Payment Status</span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${booking.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {booking.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
