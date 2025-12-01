"use client";

import { useState } from "react";
import { createPartyBooking } from "../../../actions/createPartyBooking";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Users, User, Mail, Phone, Baby, Info } from "lucide-react";

export function AdminPartyBookingForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError("");

        try {
            // Convert FormData to object for the action
            const data = {
                date: formData.get("date"),
                time: formData.get("time"),
                participants: Number(formData.get("participants")),
                spectators: Number(formData.get("spectators")),
                name: formData.get("name"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                childName: formData.get("childName"),
                childAge: Number(formData.get("childAge")),
                specialRequests: formData.get("specialRequests"),
            };

            const result = await createPartyBooking(data);

            if (result.success) {
                router.push("/admin/party-bookings");
                router.refresh();
            } else {
                setError(result.error || "Failed to create booking");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-8">
            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Customer Details */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Customer Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                name="phone"
                                type="tel"
                                required
                                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="+91 98765 43210"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Party Details */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Baby className="w-5 h-5 text-primary" />
                    Party Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Birthday Child Name</label>
                        <input
                            name="childName"
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900"
                            placeholder="Child's Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Child's Age</label>
                        <input
                            name="childAge"
                            type="number"
                            required
                            min="1"
                            max="18"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900"
                            placeholder="Age"
                        />
                    </div>
                </div>
            </div>

            {/* Booking Details */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Booking Schedule
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                name="date"
                                type="date"
                                required
                                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Time Slot</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <select
                                name="time"
                                required
                                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">Select Time</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="12:00">12:00 PM</option>
                                <option value="14:00">02:00 PM</option>
                                <option value="16:00">04:00 PM</option>
                                <option value="18:00">06:00 PM</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Guests */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Guest Count
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Participants (Kids)</label>
                        <input
                            name="participants"
                            type="number"
                            required
                            min="10"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900"
                            placeholder="Min 10"
                        />
                        <p className="text-xs text-slate-500 mt-1">Minimum 10 participants required</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Spectators (Adults)</label>
                        <input
                            name="spectators"
                            type="number"
                            required
                            min="0"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900"
                            placeholder="0"
                        />
                        <p className="text-xs text-slate-500 mt-1">First 10 spectators are free</p>
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Additional Information
                </h3>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Special Requests / Notes</label>
                    <textarea
                        name="specialRequests"
                        rows={3}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-slate-900"
                        placeholder="Any dietary requirements, decorations, etc."
                    ></textarea>
                </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Creating Booking..." : "Create Party Booking"}
                </button>
            </div>
        </form>
    );
}
