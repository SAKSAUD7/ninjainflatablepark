"use client";

import { useState } from "react";
import { ScrollReveal, BouncyButton } from "@repo/ui";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Mail, Phone, User, Cake, MessageSquare, PartyPopper, CheckCircle } from "lucide-react";
import { createPartyBooking } from "../actions/createPartyBooking";

export default function PartyBookingPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        childName: "",
        childAge: "",
        date: "",
        time: "",
        participants: 10,
        spectators: 10,
        specialRequests: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [bookingDetails, setBookingDetails] = useState<any>(null);
    const [participantError, setParticipantError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate minimum participants
        if (formData.participants < 10) {
            setParticipantError("Minimum 10 participants required.");
            return;
        }

        setParticipantError("");
        setIsSubmitting(true);

        try {
            const result = await createPartyBooking(formData);

            if (result.success) {
                setBookingDetails(result);
                setSubmitted(true);
            } else {
                alert("Failed to create booking. Please try again.");
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateTotal = () => {
        const participantPrice = 1500;
        const extraSpectatorPrice = 100;
        const freeSpectators = 10;
        const chargeableSpectators = Math.max(0, formData.spectators - freeSpectators);

        const participantCost = formData.participants * participantPrice;
        const spectatorCost = chargeableSpectators * extraSpectatorPrice;
        const subtotal = participantCost + spectatorCost;
        const gst = subtotal * 0.18;
        const total = subtotal + gst;

        return { subtotal, gst, total, deposit: total * 0.5 };
    };

    const costs = calculateTotal();

    if (submitted && bookingDetails) {
        return (
            <main className="min-h-screen bg-background py-20">
                <div className="max-w-3xl mx-auto px-4">
                    <ScrollReveal animation="scale">
                        <div className="bg-surface-800/50 backdrop-blur-md p-10 rounded-3xl border border-primary/30 text-center">
                            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-primary" />
                            </div>
                            <h1 className="text-4xl font-display font-black mb-4 text-primary">
                                Party Booking Confirmed!
                            </h1>
                            <p className="text-xl text-white/80 mb-8">
                                Your party booking has been received. We'll send you a confirmation email shortly.
                            </p>

                            <div className="bg-background-dark rounded-2xl p-6 mb-8 text-left">
                                <h3 className="font-bold text-lg mb-4 text-white">Booking Summary</h3>
                                <div className="space-y-2 text-white/70">
                                    <p><strong className="text-white">Booking ID:</strong> {bookingDetails.bookingId}</p>
                                    <p><strong className="text-white">Total Amount:</strong> ₹{bookingDetails.amount.toFixed(2)}</p>
                                    <p><strong className="text-white">Deposit Required (50%):</strong> ₹{bookingDetails.depositAmount.toFixed(2)}</p>
                                    <p><strong className="text-white">Date:</strong> {formData.date}</p>
                                    <p><strong className="text-white">Time:</strong> {formData.time}</p>
                                    <p><strong className="text-white">Participants:</strong> {formData.participants}</p>
                                </div>
                            </div>

                            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-8">
                                <p className="text-sm text-white/80">
                                    <strong className="text-accent">Next Steps:</strong> We'll send you payment details via email.
                                    Please pay the 50% deposit to confirm your booking.
                                </p>
                            </div>

                            <BouncyButton size="lg" variant="primary" onClick={() => window.location.href = "/"}>
                                Back to Home
                            </BouncyButton>
                        </div>
                    </ScrollReveal>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background py-20">
            <div className="max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <ScrollReveal animation="slideUp">
                        <h1 className="text-4xl md:text-6xl font-display font-black mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Book Your Party
                            </span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Fill in the details below to reserve your party at Ninja Inflatable Park
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <ScrollReveal animation="slideRight">
                            <form onSubmit={handleSubmit} className="bg-surface-800/50 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                                <h2 className="text-2xl font-display font-bold mb-6 text-primary">Party Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Contact Information */}
                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/80">
                                            <User className="w-4 h-4 inline mr-2" />
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/80">
                                            <Mail className="w-4 h-4 inline mr-2" />
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/80">
                                            <Phone className="w-4 h-4 inline mr-2" />
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                                            placeholder="9845471611"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/80">
                                            <Cake className="w-4 h-4 inline mr-2" />
                                            Child's Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.childName}
                                            onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                                            className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                                            placeholder="Birthday child's name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/80">
                                            <Cake className="w-4 h-4 inline mr-2" />
                                            Child's Age
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.childAge}
                                            onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                                            className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                                            placeholder="Age"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/80">
                                            <Calendar className="w-4 h-4 inline mr-2" />
                                            Party Date *
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/80">
                                            <Clock className="w-4 h-4 inline mr-2" />
                                            Preferred Time *
                                        </label>
                                        <select
                                            required
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                                        >
                                            <option value="">Select time</option>
                                            <option value="12:00 PM">12:00 PM</option>
                                            <option value="2:00 PM">2:00 PM</option>
                                            <option value="4:00 PM">4:00 PM</option>
                                            <option value="6:00 PM">6:00 PM</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/80">
                                            <Users className="w-4 h-4 inline mr-2" />
                                            Number of Participants * (Min. 10)
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="10"
                                            step="1"
                                            value={formData.participants}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value) || 10;
                                                setFormData({ ...formData, participants: value });
                                                if (value < 10) {
                                                    setParticipantError("Minimum 10 participants required.");
                                                } else {
                                                    setParticipantError("");
                                                }
                                            }}
                                            className={`w-full px-4 py-3 bg-background-dark border-2 ${participantError ? 'border-red-500' : 'border-surface-700'
                                                } rounded-xl focus:border-primary focus:outline-none transition-colors text-white`}
                                        />
                                        {participantError && (
                                            <p className="text-red-500 text-sm mt-1">{participantError}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2 text-white/80">
                                            <Users className="w-4 h-4 inline mr-2" />
                                            Number of Spectators
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.spectators}
                                            onChange={(e) => setFormData({ ...formData, spectators: parseInt(e.target.value) || 0 })}
                                            className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                                        />
                                        <p className="text-xs text-white/50 mt-1">First 10 spectators free</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-bold mb-2 text-white/80">
                                        <MessageSquare className="w-4 h-4 inline mr-2" />
                                        Special Requests
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formData.specialRequests}
                                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                                        className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white resize-none"
                                        placeholder="Any special requirements or dietary restrictions..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-8 px-8 py-4 bg-primary hover:bg-primary-light text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Processing..." : "Book Party Now"}
                                </button>
                            </form>
                        </ScrollReveal>
                    </div>

                    {/* Price Summary */}
                    <div className="lg:col-span-1">
                        <ScrollReveal animation="slideLeft">
                            <div className="bg-surface-800/50 backdrop-blur-md p-6 rounded-3xl border border-primary/30 sticky top-24">
                                <h3 className="text-xl font-display font-bold mb-4 text-primary flex items-center gap-2">
                                    <PartyPopper className="w-5 h-5" />
                                    Price Summary
                                </h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/70">Participants ({formData.participants})</span>
                                        <span className="text-white font-bold">₹{(formData.participants * 1500).toLocaleString()}</span>
                                    </div>
                                    {formData.spectators > 10 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/70">Extra Spectators ({formData.spectators - 10})</span>
                                            <span className="text-white font-bold">₹{((formData.spectators - 10) * 100).toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/70">Subtotal</span>
                                        <span className="text-white font-bold">₹{costs.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/70">GST (18%)</span>
                                        <span className="text-white font-bold">₹{costs.gst.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-3 flex justify-between">
                                        <span className="font-bold text-white">Total</span>
                                        <span className="font-bold text-xl text-primary">₹{costs.total.toFixed(2)}</span>
                                    </div>
                                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                                        <p className="text-xs text-white/80">
                                            <strong className="text-accent">Deposit (50%):</strong> ₹{costs.deposit.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-background-dark rounded-xl p-4 text-xs text-white/70 space-y-2">
                                    <p className="font-bold text-white text-sm mb-2">Includes:</p>
                                    <p>✓ 75 mins play time</p>
                                    <p>✓ 1 hour party room</p>
                                    <p>✓ Party feast for participants</p>
                                    <p>✓ Drinks & mini slush</p>
                                    <p>✓ Online invitations</p>
                                    <p>✓ 10 free spectators</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </main>
    );
}
