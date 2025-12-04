"use client";

import { useState } from "react";
import { ScrollReveal, BouncyButton } from "@repo/ui";
import { FileSignature, CheckCircle } from "lucide-react";

export default function KioskWaiverPage() {
    const [signed, setSigned] = useState(false);

    const handleSign = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real implementation, this would submit the waiver
        setSigned(true);
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
                    <BouncyButton onClick={() => setSigned(false)} variant="secondary">
                        Sign Another Waiver
                    </BouncyButton>
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
                            Please sign your waiver below
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="scale">
                    <div className="bg-surface-800/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
                        <div className="py-12 border-2 border-dashed border-white/20 rounded-2xl mb-8 bg-black/20">
                            <p className="text-white/50 text-lg">
                                Digital Signature Pad Coming Soon
                            </p>
                        </div>

                        <form onSubmit={handleSign} className="max-w-md mx-auto">
                            <div className="mb-6 text-left">
                                <label className="block text-sm font-bold mb-2 text-white/80">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="flex items-center gap-3 mb-8 text-left bg-primary/10 p-4 rounded-xl border border-primary/20">
                                <input
                                    type="checkbox"
                                    required
                                    id="kiosk-agree"
                                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="kiosk-agree" className="text-sm text-white/90">
                                    I agree to the <a href="/waiver-terms" target="_blank" className="text-primary hover:underline">Terms & Conditions</a>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-8 py-4 bg-primary hover:bg-primary-light text-black font-bold rounded-xl transition-all"
                            >
                                Sign Waiver
                            </button>
                        </form>
                    </div>
                </ScrollReveal>
            </div>
        </main>
    );
}
