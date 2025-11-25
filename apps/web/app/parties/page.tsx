"use client";

<<<<<<< HEAD
import { ScrollReveal, BouncyButton, SectionDivider, ImageCarousel } from "@repo/ui";
import { motion } from "framer-motion";
import { Cake, Music, Gift, AlertCircle, Users, PartyPopper, Utensils, Check, Mail, CheckCircle } from "lucide-react";
=======
import { ScrollReveal, BouncyButton, SectionDivider } from "@repo/ui";
import { Cake, Music, Gift, Calendar, CheckCircle, AlertCircle } from "lucide-react";
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
import Link from "next/link";

export default function PartiesPage() {
    return (
        <main className="bg-background text-white min-h-screen pt-24">
<<<<<<< HEAD
            {/* Header - Reduced padding */}
            <section className="relative py-16 px-4 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/uploads/img-3.jpg"
                        alt="Party Booking"
                        className="w-full h-full object-cover opacity-30"
                        onError={(e) => {
                            e.currentTarget.src = "/hero-background.jpg";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
                </div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <ScrollReveal animation="slideUp">
                        <span className="inline-block py-1 px-4 rounded-full bg-primary text-black font-black text-xs mb-4 tracking-widest uppercase">
                            🎉 Parties & Events
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-display font-black mb-3">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Ninja Party Booking
                            </span>
                        </h1>
                        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-2">
                            Celebrate with the ultimate adventure! Birthdays, school trips, corporate events - we've got you covered.
                        </p>
                        <p className="text-sm text-secondary font-bold">
                            Available: Thursday - Sunday
=======
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
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
                        </p>
                    </ScrollReveal>
                </div>
            </section>

<<<<<<< HEAD


            {/* Compact Pricing Card */}
            <section className="relative px-4 py-12 bg-background">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal animation="scale">
                        <motion.div
                            whileHover={{ y: -3 }}
                            className="relative p-6 rounded-2xl border-2 border-primary bg-gradient-to-br from-surface-800/80 to-surface-900/80 backdrop-blur-sm"
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-black py-1 px-6 rounded-full text-sm shadow-lg">
                                PARTY PACKAGE
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                                {/* Price */}
                                <div className="text-center md:text-left">
                                    <div className="mb-2">
                                        <span className="text-4xl font-black text-white">₹1,500</span>
                                        <span className="text-white/60 text-sm ml-1">/person</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start text-xs">
                                        <span className="px-3 py-1 bg-white/10 rounded-full">Min. 10</span>
                                        <span className="px-3 py-1 bg-white/10 rounded-full">2 Hours</span>
                                    </div>
                                </div>

                                {/* Key Inclusions */}
                                <div className="md:col-span-2">
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-white/80">
                                            <Check className="w-4 h-4 text-primary shrink-0" />
                                            <span>75 mins play + 1hr party room</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/80">
                                            <Check className="w-4 h-4 text-primary shrink-0" />
                                            <span>Party feast included</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/80">
                                            <Check className="w-4 h-4 text-primary shrink-0" />
                                            <span>Drinks & mini slush</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/80">
                                            <Check className="w-4 h-4 text-primary shrink-0" />
                                            <span>10 free spectators</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                                <Link href="/party-booking" className="flex-1">
                                    <BouncyButton size="md" variant="primary" className="w-full">
                                        <PartyPopper className="w-4 h-4 mr-2" />
                                        Book Party Now
                                    </BouncyButton>
                                </Link>
                                <Link href="/contact#contactForm" className="flex-1">
                                    <BouncyButton size="md" variant="outline" className="w-full text-white border-white">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Enquire
                                    </BouncyButton>
                                </Link>
                            </div>
                        </motion.div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Image Carousel */}
            <section className="relative px-4 py-12 bg-background">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal animation="scale">
                        <ImageCarousel
                            images={[
                                "/images/uploads/img-1.jpg",
                                "/images/uploads/img-3.jpg",
                                "/images/uploads/img-5.jpg",
                                "/images/uploads/img-7.jpg",
                                "/images/uploads/img-8.jpg"
                            ]}
                            className="shadow-2xl border-4 border-white/10"
                        />
                    </ScrollReveal>
                </div>
            </section>

            {/* Party Feast Menu - Separate Section */}
            <section className="relative px-4 py-12 bg-background-light">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal animation="fade">
                        <h2 className="text-3xl md:text-4xl font-display font-black mb-6 text-center">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary">
                                Party Feast Menu
                            </span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ScrollReveal animation="slideRight">
                            <div className="bg-surface-800/50 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-display font-bold mb-4 text-secondary flex items-center gap-2">
                                    <Utensils className="w-5 h-5" />
                                    Pre-Plated
                                </h3>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary">•</span>
                                        Chocolate & Jam Sandwiches
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary">•</span>
                                        Chicken Nuggets
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary">•</span>
                                        Chilli Garlic Potato Shots
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary">•</span>
                                        Hot Potato Chips
                                    </li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slideLeft">
                            <div className="bg-surface-800/50 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                                <h3 className="text-xl font-display font-bold mb-4 text-accent flex items-center gap-2">
                                    <Utensils className="w-5 h-5" />
                                    Buffet
                                </h3>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent">•</span>
                                        Chicken or Veg Noodles
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent">•</span>
                                        Chicken or Veg Fried Rice
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-accent">•</span>
                                        Creamy Chicken or Veg Pasta
                                    </li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Features - Compact */}
            <section className="relative px-4 py-12 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: <Cake className="w-6 h-6 text-primary" />, title: "Private Party Room", desc: "Exclusive space for celebration" },
                            { icon: <Gift className="w-6 h-6 text-secondary" />, title: "Complete Package", desc: "Everything included" },
                            { icon: <Music className="w-6 h-6 text-accent" />, title: "All Activities", desc: "Full park access" },
                        ].map((feature, index) => (
                            <ScrollReveal key={index} animation="fade" delay={index * 0.1}>
                                <div className="bg-surface-800/50 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-display font-bold mb-1">{feature.title}</h3>
                                    <p className="text-white/60 text-sm">{feature.desc}</p>
=======
            {/* Features */}
            <section className="relative px-4 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {[
                            { icon: <Cake className="w-8 h-8 text-primary" />, title: "Private Party Rooms", desc: "Exclusive space for your celebration", image: "/images/uploads/img-3.jpg" },
                            { icon: <Gift className="w-8 h-8 text-secondary" />, title: "Custom Packages", desc: "Tailored to your needs", image: "/images/uploads/img-4.jpg" },
                            { icon: <Music className="w-8 h-8 text-accent" />, title: "Party Feast", desc: "Delicious food & drinks included", image: "/images/uploads/img-5.jpg" },
                        ].map((feature, index) => (
                            <ScrollReveal key={index} animation="fade" delay={index * 0.1}>
                                <div className="bg-surface-800 rounded-3xl border border-white/10 overflow-hidden group h-full">
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.src = "/images/hero-background.jpg";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-surface-800 to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md p-2 rounded-xl">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
                                        <p className="text-white/60">{feature.desc}</p>
                                    </div>
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
<<<<<<< HEAD
                </div>
            </section>

            {/* Terms - Compact */}
            <section className="relative px-4 py-12 bg-background-light">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal animation="slideUp">
                        <div className="bg-surface-800/50 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                            <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2 justify-center">
                                <AlertCircle className="w-6 h-6 text-secondary" />
                                Important Terms
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                {[
                                    "50% deposit required to confirm",
                                    "Minimum 10 participants",
                                    "Balance due before party starts",
                                    "Free rescheduling (2+ weeks notice)",
                                    "Late reschedule: ₹1,000 fee",
                                    "Extra time: ₹100 per 10 mins",
                                    "All guests must sign waiver",
                                    "No sparkler candles or confetti"
                                ].map((term, index) => (
                                    <div key={index} className="flex gap-2 items-start text-white/80">
                                        <CheckCircle className="w-3 h-3 text-secondary shrink-0 mt-0.5" />
                                        <span>{term}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs text-white/60">
                                <p>
                                    Email:{" "}
                                    <a href="mailto:info@ninjainflatable.com" className="text-primary hover:underline">
                                        info@ninjainflatable.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
                <SectionDivider position="bottom" variant="wave" color="fill-background" />
            </section>

            {/* CTA - Compact */}
            <section className="relative py-16 px-4 bg-background">
                <div className="max-w-3xl mx-auto text-center">
                    <ScrollReveal animation="scale">
                        <h2 className="text-4xl md:text-5xl font-display font-black mb-4">
                            Ready to Party?
                        </h2>
                        <p className="text-lg text-white/70 mb-6">
                            Book now and make it unforgettable!
                        </p>
                        <Link href="/party-booking">
                            <BouncyButton size="lg" variant="accent">
                                <PartyPopper className="w-5 h-5 mr-2" />
                                Book Your Party
                            </BouncyButton>
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    );
}
=======

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
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
