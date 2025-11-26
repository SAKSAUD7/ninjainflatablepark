"use client";

import { ScrollReveal, SectionDivider } from "@repo/ui";
import { Shield, AlertTriangle, UserCheck, Footprints, Ban, Clock } from "lucide-react";

export default function GuidelinesPage() {
    const rules = [
        {
            title: "General Safety",
            icon: <Shield className="w-8 h-8 text-primary" />,
            items: [
                "Mandatory safety briefing before entry.",
                "Follow all instructions from park staff.",
                "Empty pockets completely (no phones, keys, sharp objects).",
                "No food, drink, or gum in play areas."
            ]
        },
        {
            title: "Attraction Rules",
            icon: <AlertTriangle className="w-8 h-8 text-secondary" />,
            items: [
                "One person at a time on slides and climbing walls.",
                "Slides: Sit feet-first only. No flips or headfirst jumps.",
                "Obstacle Course: Move in one direction only.",
                "No pushing, racing, or dangerous stunts."
            ]
        },
        {
            title: "Dress Code",
            icon: <Footprints className="w-8 h-8 text-accent" />,
            items: [
                "Socks are MANDATORY for all jumpers.",
                "No shoes allowed on inflatables.",
                "Remove all jewelry and sharp objects.",
                "Comfortable athletic clothing recommended."
            ]
        },
        {
            title: "Supervision",
            icon: <UserCheck className="w-8 h-8 text-primary" />,
            items: [
                "Children must be supervised by a parent/guardian at all times.",
                "Staff are present for safety but do not replace parental supervision.",
                "Age and height restrictions apply to certain zones."
            ]
        },
        {
            title: "Health & Conduct",
            icon: <Ban className="w-8 h-8 text-secondary" />,
            items: [
                "Do not jump if you are pregnant or have health conditions.",
                "Take a break if you feel dizzy or tired.",
                "Rough play and climbing over barriers is strictly prohibited.",
                "Entry may be refused for unsafe behavior."
            ]
        },
        {
            title: "Arrival",
            icon: <Clock className="w-8 h-8 text-accent" />,
            items: [
                "Arrive 15 minutes before your session.",
                "Complete waiver signing at check-in.",
                "Late arrival may reduce your play time."
            ]
        }
    ];

    return (
        <main className="bg-background text-white min-h-screen pt-24">
            {/* Header */}
            <section className="relative py-32 px-4 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/uploads/img-6.jpg"
                        alt="Safety Guidelines"
                        className="w-full h-full object-cover opacity-30"
                        onError={(e) => {
                            e.currentTarget.src = "/images/hero-background.jpg";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
                </div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <ScrollReveal animation="slideUp">
                        <h1 className="text-5xl md:text-7xl font-display font-black mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Safety Guidelines
                            </span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            To ensure a fun and safe experience for everyone, please follow our park rules.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Rules Grid */}
            <section className="relative px-4 pb-32 md:pb-40">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rules.map((rule, index) => (
                            <ScrollReveal key={index} animation="fade" delay={index * 0.1}>
                                <div className="bg-surface-800 p-8 rounded-3xl border border-white/10 hover:border-secondary/30 transition-colors h-full">
                                    <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                        {rule.icon}
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-4 text-white">
                                        {rule.title}
                                    </h3>
                                    <ul className="space-y-3">
                                        {rule.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-white/80 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-2xl text-center max-w-3xl mx-auto">
                        <p className="text-primary font-bold text-lg mb-2">⚠️ Waiver Required</p>
                        <p className="text-white/80">
                            All participants must sign a waiver before entering the park. Parents/Guardians must sign for minors.
                        </p>
                    </div>
                </div>
                <SectionDivider position="bottom" variant="wave" color="fill-background" />
            </section>
        </main>
    );
}
