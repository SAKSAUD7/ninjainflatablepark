"use client";

import { useState } from "react";
import { ScrollReveal, BouncyButton } from "@repo/ui";
import { FileSignature, CheckCircle, User, Mail, Phone, AlertCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export default function KioskWaiverPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        participant_type: "ADULT",
        emergency_contact: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [signed, setSigned] = useState(false);
    const [error, setError] = useState("");

    const handleSign = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const response = await fetch(`${API_URL}/bookings/waivers/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    version: "1.0",
                    is_primary_signer: true,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to submit waiver");
            }

            setSigned(true);
            // Reset form after 3 seconds
            setTimeout(() => {
                setSigned(false);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    dob: "",
                    participant_type: "ADULT",
                    emergency_contact: "",
                });
            }, 3000);
        } catch (err: any) {
            setError(err.message || "Failed to submit waiver");
        } finally {
            setSubmitting(false);
        }
    };

    if (signed) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="text-center max-w-lg w-full bg-surface-800/50 backdrop-blur-md p-10 rounded-3xl border border-primary/30">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-4xl font-display font-black mb-4 text-primary">
                        Waiver Signed!
                    </h1>
                    <p className="text-xl text-white/80 mb-8">
                        Thank you for signing. You may now proceed to the check-in counter.
                    </p>
                    <p className="text-sm text-white/50">
                        Redirecting to new form in 3 seconds...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <ScrollReveal animation="slideUp">
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                            <FileSignature className="w-10 h-10 text-accent" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-black mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Kiosk Mode
                            </span>
                        </h1>
                        <p className="text-xl text-white/70">
                            Digital Liability Waiver
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="scale">
                    <div className="bg-surface-800/50 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-red-200 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSign} className="space-y-6">
                            {/* Participant Type */}
                            <div>
                                <label className="block text-sm font-bold mb-3 text-white/80">
                                    Participant Type *
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, participant_type: "ADULT" })}
                                        className={`p-4 rounded-xl border-2 transition-all ${formData.participant_type === "ADULT"
                                                ? "border-primary bg-primary/20"
                                                : "border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <User className="w-6 h-6 mx-auto mb-2 text-white" />
                                        <span className="font-medium text-white">Adult</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, participant_type: "MINOR" })}
                                        className={`p-4 rounded-xl border-2 transition-all ${formData.participant_type === "MINOR"
                                                ? "border-primary bg-primary/20"
                                                : "border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        <User className="w-6 h-6 mx-auto mb-2 text-white" />
                                        <span className="font-medium text-white">Minor</span>
                                    </button>
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/80">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white text-lg"
                                    placeholder="Enter full name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/80">
                                    Email Address {formData.participant_type === "ADULT" && "*"}
                                </label>
                                <input
                                    type="email"
                                    required={formData.participant_type === "ADULT"}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white text-lg"
                                    placeholder="email@example.com"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/80">
                                    Phone Number {formData.participant_type === "ADULT" && "*"}
                                </label>
                                <input
                                    type="tel"
                                    required={formData.participant_type === "ADULT"}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white text-lg"
                                    placeholder="(123) 456-7890"
                                />
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/80">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    value={formData.dob}
                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                    className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white text-lg"
                                />
                            </div>

                            {/* Emergency Contact */}
                            <div>
                                <label className="block text-sm font-bold mb-2 text-white/80">
                                    Emergency Contact {formData.participant_type === "MINOR" && "*"}
                                </label>
                                <input
                                    type="text"
                                    required={formData.participant_type === "MINOR"}
                                    value={formData.emergency_contact}
                                    onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
                                    className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white text-lg"
                                    placeholder="Guardian name and phone"
                                />
                            </div>

                            {/* Agreement */}
                            <div className="bg-black/30 p-6 rounded-xl border border-white/10">
                                <h3 className="font-bold text-white mb-3">Liability Waiver Agreement</h3>
                                <div className="text-sm text-white/60 space-y-2 max-h-32 overflow-y-auto">
                                    <p>
                                        I acknowledge that participation involves inherent risks and voluntarily assume all risks.
                                        I release Ninja Inflatable Park from any liability for injury or loss.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full px-8 py-4 bg-primary hover:bg-primary-light text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                            >
                                {submitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <FileSignature className="w-6 h-6" />
                                        Sign Waiver
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-white/40 text-center">
                                By clicking "Sign Waiver", you agree to the terms outlined above.
                            </p>
                        </form>
                    </div>
                </ScrollReveal>
            </div>
        </main>
    );
}
