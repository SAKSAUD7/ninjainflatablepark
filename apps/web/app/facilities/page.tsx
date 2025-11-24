"use client";

import { ScrollReveal, SectionDivider } from "@repo/ui";
import { Coffee, Car, Shield, Wifi, ShoppingBag, Utensils, Users, Baby, Lock } from "lucide-react";

export default function FacilitiesPage() {
    const facilities = [
        {
            title: "Play Zones",
            description: "Separate age-appropriate play areas including ninja obstacle courses, climbing walls, and giant slides.",
            icon: <Users className="w-8 h-8 text-primary" />,
            items: ["Ninja Course", "Toddler Zone", "Giant Slides", "Wipeout Challenge"]
        },
        {
            title: "Ninja Café",
            description: "Refuel after your adventure with our selection of hot & cold drinks, meals, and snacks.",
            icon: <Coffee className="w-8 h-8 text-secondary" />,
            items: ["Hot & Cold Drinks", "Fresh Snacks", "Meals", "Seating Area"]
        },
        {
            title: "Party Rooms",
            description: "Private party rooms available for birthdays and special events with customizable packages.",
            icon: <Utensils className="w-8 h-8 text-accent" />,
            items: ["Private Space", "Decorations", "Hosting Staff", "Catering"]
        },
        {
            title: "Parking & Access",
            description: "Convenient access for all visitors with ample parking space.",
            icon: <Car className="w-8 h-8 text-primary" />,
            items: ["Free Parking (2 Hrs)", "Accessible Entry", "Drop-off Zone"]
        },
        {
            title: "Health & Safety",
            description: "Your safety is our priority with trained staff and first-aid facilities.",
            icon: <Shield className="w-8 h-8 text-secondary" />,
            items: ["First Aid Staff", "CCTV Surveillance", "Hygiene Stations", "Daily Cleaning"]
        },
        {
            title: "Amenities",
            description: "Everything you need for a comfortable visit.",
            icon: <Wifi className="w-8 h-8 text-accent" />,
            items: ["Free Wi-Fi", "Lockers", "Baby Care Room", "Merchandise Store"]
        }
    ];

    return (
        <main className="bg-background text-white min-h-screen pt-24">
            {/* Header */}
            <section className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <ScrollReveal animation="slideUp">
                        <h1 className="text-5xl md:text-7xl font-display font-black mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Park Facilities
                            </span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            More than just bouncing! Explore our world-class facilities designed for your comfort and enjoyment.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Facilities Grid */}
            <section className="relative px-4 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilities.map((facility, index) => (
                            <ScrollReveal key={index} animation="fade" delay={index * 0.1}>
                                <div className="bg-surface-800 p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-colors h-full">
                                    <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                        {facility.icon}
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-3 text-white">
                                        {facility.title}
                                    </h3>
                                    <p className="text-white/70 mb-6 min-h-[3rem]">
                                        {facility.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {facility.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
                <SectionDivider position="bottom" variant="wave" color="fill-background" />
            </section>
        </main>
    );
}
