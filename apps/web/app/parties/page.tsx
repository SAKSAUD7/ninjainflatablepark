"use client";

import { ScrollReveal, BouncyButton, SectionDivider } from "@repo/ui";
import { Cake, Music, Gift, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PartiesPage() {
    return (
        <main className="bg-background text-white min-h-screen pt-24">
            {/* Header */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <ScrollReveal animation="slideUp">
                        <h1 className="text-5xl md:text-7xl font-display font-black mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Ultimate Ninja Parties
                            </span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Celebrate your special day with an action-packed adventure! Perfect for birthdays, team events, and more.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Features */}
            <section className="relative px-4 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {[
                            { icon: <Cake className="w-8 h-8 text-primary" />, title: "Private Party Rooms", desc: "Exclusive space for your celebration" },
                            { icon: <Gift className="w-8 h-8 text-secondary" />, title: "Custom Packages", desc: "Tailored to your needs" },
                            { icon: <Music className="w-8 h-8 text-accent" />, title: "Party Feast", desc: "Delicious food & drinks included" },
                        ].map((feature, index) => (
                            <ScrollReveal key={index} animation="fade" delay={index * 0.1}>
                                <div className="bg-surface-800 p-8 rounded-3xl border border-white/10 text-center">
                                    <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
                                    <p className="text-white/60">{feature.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <ScrollReveal animation="slideRight">
                            <div className="bg-surface-800 p-8 rounded-3xl border border-primary/20">
                                <h2 className="text-3xl font-display font-bold mb-6 text-primary">Party Details</h2>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <Calendar className="w-6 h-6 text-primary shrink-0" />
                                        <div>
                                            <span className="font-bold block text-white">Booking Days</span>
                                            <span className="text-white/70">Thursday to Sunday</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Clock className="w-6 h-6 text-primary shrink-0" />
                                        <div>
                                            <span className="font-bold block text-white">Duration</span>
                                            <span className="text-white/70">2 Hours (75 mins Play + 45 mins Party Room)</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Users className="w-6 h-6 text-primary shrink-0" />
                                        <div>
                                            <span className="font-bold block text-white">Group Size</span>
                                            <span className="text-white/70">Minimum 10 Participants</span>
                                        </div>
                                    </li>
                                </ul>
                                <div className="mt-8">
                                    <Link href="/contact">
                                        <BouncyButton size="lg" variant="primary" className="w-full">
                                            Enquire Now
                                        </BouncyButton>
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slideLeft">
                            <div className="bg-surface-800 p-8 rounded-3xl border border-white/10">
                                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                                    <AlertCircle className="w-6 h-6 text-secondary" />
                                    Terms & Conditions
                                </h2>
                                <ul className="space-y-3 text-sm text-white/80">
                                    <li className="flex gap-2">
                                        <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-1" />
                                        <span>50% non-refundable deposit required to confirm booking.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-1" />
                                        <span>Balance payment must be made before the party starts.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-1" />
                                        <span>Rescheduling allowed with &gt;2 weeks notice.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-1" />
                                        <span>Late rescheduling (&lt;2 weeks) incurs ₹1,000 admin fee.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-1" />
                                        <span>Extra time charged at ₹100 per 10 minutes.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-1" />
                                        <span>All guests must sign a waiver.</span>
                                    </li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
                <SectionDivider position="bottom" variant="wave" color="fill-background" />
            </section>
        </main>
    );
}

import { Users, Clock } from "lucide-react";
