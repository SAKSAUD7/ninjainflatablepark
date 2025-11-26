"use client";

import { useState } from "react";
import { BookingWizard, BouncyButton } from "@repo/ui";
import { createBooking } from "../../actions/createBooking";
import Link from "next/link";

// Simple hardcoded voucher list for demo purposes
const VALID_VOUCHERS = ["DISCOUNT10", "FREE5", "WELCOME20"];

export default function Book() {
    const [voucher, setVoucher] = useState("");
    const [voucherMessage, setVoucherMessage] = useState("");

    const applyVoucher = () => {
        if (VALID_VOUCHERS.includes(voucher.trim().toUpperCase())) {
            setVoucherMessage("Voucher applied successfully! 🎉");
        } else {
            setVoucherMessage("Invalid voucher code. Please try again.");
        }
    };

    return (
        <main className="min-h-screen bg-background pt-24 pb-6 md:pb-12 lg:pb-20">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8 lg:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-3 md:mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                            Book Your Session
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto px-4">
                        Secure your spot at India's largest inflatable park. Choose your date, time, and get ready to bounce!
                    </p>
                </div>

                {/* Booking Wizard */}
                <BookingWizard onSubmit={createBooking} />

                {/* Group & Party Booking Cards */}
                <section className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Group Booking Card */}
                        <div className="bg-surface-800/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
                            <h3 className="text-2xl font-display font-bold text-white mb-4">Group Booking</h3>
                            <p className="text-white/70 mb-6 flex-grow">
                                Perfect for schools, corporate teams, or friends. Enjoy exclusive rates, dedicated support, and flexible scheduling.
                            </p>
                            {/* Voucher Claim Section */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Enter voucher code"
                                    value={voucher}
                                    onChange={(e) => setVoucher(e.target.value)}
                                    className="w-full px-4 py-2 rounded bg-surface-800/30 text-white placeholder-white/50 focus:outline-none"
                                />
                                <button
                                    onClick={applyVoucher}
                                    className="mt-2 w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary-light transition"
                                >
                                    Apply Voucher
                                </button>
                                {voucherMessage && (
                                    <p className="mt-2 text-sm text-center text-white/80">{voucherMessage}</p>
                                )}
                            </div>
                            <Link href="/contact#contactForm" className="w-full">
                                <BouncyButton size="lg" variant="primary">Enquire Now</BouncyButton>
                            </Link>
                        </div>
                        {/* Party Booking Card */}
                        <div className="bg-surface-800/50 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
                            <h3 className="text-2xl font-display font-bold text-white mb-4">Party Booking</h3>
                            <p className="text-white/70 mb-6 flex-grow">
                                Celebrate birthdays or special occasions with themed party packages, decorations, and fun activities for all ages.
                            </p>
                            <Link href="/parties" className="w-full">
                                <BouncyButton size="lg" variant="secondary">View Packages</BouncyButton>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
