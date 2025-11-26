"use client";

import { ScrollReveal, SectionDivider } from "@repo/ui";
import { Shield, AlertTriangle, UserCheck, Footprints, Ban, Clock, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function GuidelinesPage() {
    const [activeTab, setActiveTab] = useState("terms");

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

    const termsContent = {
        terms: {
            title: "Terms & Conditions",
            sections: [
                {
                    title: "Opening Offer",
                    content: [
                        "Free Entry * T&C apply",
                        "The offer applies when you buy a 60 minute session the free entry for the upgrade will be automatically applied.",
                        "Offer valid on 22 and 23rd November"
                    ]
                },
                {
                    title: "General Rules",
                    content: [
                        "Only authorised members of the public are allowed into our premises.",
                        "Ninja Inflatable reserves the right to refuse entry, and you may be asked to leave for noncompliance with our rules.",
                        "In the interest of safety, entry may be refused if you are found under the influence of alcohol or drugs.",
                        "Adults must remain on the premises and supervise children under their care at all times.",
                        "Play time is limited to the duration of the booked session only.",
                        "We operate a no-refund policy after 10 minutes of admission."
                    ]
                },
                {
                    title: "Parking",
                    content: [
                        "We provide free parking for 2 hours.",
                        "If your stay exceeds 2 hours, please register your car at reception to avoid a parking penalty.",
                        "Ninja Inflatable accepts no liability for parking fines."
                    ]
                },
                {
                    title: "Entry Fees",
                    content: [
                        "All participants, both children and adults, must pay the entry fee, regardless of whether they actively play or accompany others."
                    ]
                }
            ]
        },
        detailed_rules: {
            title: "Detailed Rules & Guidelines",
            sections: [
                {
                    title: "Your Stay Whilst You Play",
                    content: [
                        "Please inform us immediately if any participant has an accident, however minor. Our qualified first aiders are available to assist.",
                        "If someone becomes lost in the play area, please notify a member of staff immediately.",
                        "Ninja Inflatable accepts no liability for the loss or damage of valuables.",
                        "Participants must not run in non-play areas or behave in a way that endangers others.",
                        "We operate a zero-tolerance policy towards bullying, fighting, aggressive, or inappropriate behaviour towards staff, management, or other visitors.",
                        "Sharp objects, weapons, alcohol, or drugs are strictly prohibited. Such items will be confiscated and the individual removed immediately. Where appropriate, the police will be contacted."
                    ]
                },
                {
                    title: "Food & Drinks",
                    content: [
                        "Only food and drinks purchased at Ninja Inflatable may be consumed on the premises.",
                        "During peak times, food service may take up to 45 minutes.",
                        "Eating areas are kept separate from play areas for health and safety reasons.",
                        "Food, drink, sweets, and chewing gum are not allowed in or near the inflatables."
                    ]
                },
                {
                    title: "Health & Safety",
                    content: [
                        "Please ensure no food is discarded on the floor. Any spillages must be cleaned immediately—staff are available to help maintain hygiene.",
                        "Management must be informed of any toileting accidents or bodily fluids (urine, vomit, etc.) on the inflatables so that cleaning can be arranged.",
                        "Nappy changing facilities are provided and must only be used in designated areas. Soiled nappies must be disposed of in the bins provided.",
                        "Shoes must be worn in all toilet facilities."
                    ]
                },
                {
                    title: "Play Time Rules",
                    content: [
                        "All activities and equipment are subject to availability. Management reserves the right to close an activity at any time without prior notice. Refunds will not be issued.",
                        "Our inflatables and obstacles are designed to meet strict safety and quality standards. However, Ninja Inflatable cannot be held responsible for accidents resulting from improper use or failure to follow rules.",
                        "Separate age-appropriate zones and height restrictions are in place. Please ensure these are followed for everyone’s safety.",
                        "Unwell participants should not use the inflatables.",
                        "Entry may be refused if participants are not wearing appropriate clothing/socks, do not meet height restrictions, are unwell, in plaster casts, carrying injuries, or fail to follow rules and staff instructions.",
                        "Staff supervise the play areas to help ensure safety, but they are not a replacement for parental or guardian supervision."
                    ]
                }
            ]
        },
        waiver: {
            title: "Participant Waiver",
            intro: "IMPORTANT: Please read this waiver carefully before signing. By signing this document, you acknowledge and agree to the terms below.",
            sections: [
                {
                    title: "1. ACKNOWLEDGEMENT OF RISKS",
                    content: ["I, the undersigned, understand that roller skating and related activities involve inherent risks, including but not limited to, falls, collisions, injuries or even death caused by the venue environment or other participants. I acknowledge that roller skating is a physically demanding activity and may result in serious injury, including fractures, sprains, head injuries, and other health complications. I also understand that any physical activity, including roller skating, carries risks of injury, even with the use of safety equipment."]
                },
                {
                    title: "2. ASSUMPTION OF RISK",
                    content: ["By participating in roller skating activities at Spin Pin, I voluntarily assume all risks associated with these activities, whether known or unknown, foreseeable or unforeseeable, including injury to myself or others, and damage to property. I am fully responsible for my actions while participating and acknowledge that I am free to stop skating at any time if I feel unsafe or uncomfortable."]
                },
                {
                    title: "3. WAIVER AND RELEASE",
                    content: ["In consideration for being permitted to participate in roller skating and related activities at Spin Pin, I, on behalf of myself, my heirs, executors, administrators, and assigns, hereby release, discharge, and agree to hold harmless Spin Pin, its owners, employees, agents, contractors, volunteers, and affiliates from any and all claims, demands, causes of action, or liabilities for personal injury, death, or property damage arising out of my participation in roller skating activities, even if caused by negligence or the failure of Spin Pin to properly supervise, maintain the premises, or provide adequate safety equipment."]
                },
                {
                    title: "4. HEALTH AND SAFETY",
                    content: [
                        "I affirm that I am physically capable of engaging in roller skating activities. I do not suffer from any medical condition that would make my participation unsafe or detrimental to my health. If I experience any medical condition, injury, or pain while participating in roller skating, I will immediately cease participating and inform venue staff.",
                        "I understand that the use of appropriate safety gear, including but not limited to wrist guards, knee pads, elbow pads, and helmets, is recommended but not required. It is my responsibility to use safety gear if I choose, and I acknowledge that failure to do so may increase my risk of injury."
                    ]
                },
                {
                    title: "5. COMPLIANCE WITH VENUE RULES AND INSTRUCTIONS",
                    content: ["I agree to follow all posted rules and regulations of Spin Pin and to comply with any instructions given by the staff or personnel. I understand that failure to adhere to these rules or behave in an unsafe or disruptive manner may result in my removal from the venue without refund."]
                },
                {
                    title: "6. PHOTO AND VIDEO CONSENT",
                    content: ["I grant permission to Spin Pin to take photos and/or video recordings of my participation in roller skating activities, which may be used for promotional, marketing, or other business purposes. I waive any right to compensation or royalties regarding such use."]
                },
                {
                    title: "7. MINORS",
                    content: [
                        "(If the participant is under the age of 16, this waiver must be signed by a parent or legal guardian, who agrees to accept full responsibility for the safety and well-being of the minor participant and assumes all risks outlined in this document)",
                        "Applicable if signing on behalf of minor only : I am the parent or legal guardian of the participant named in this form. I understand that roller skating involves inherent risks, and I accept full responsibility for the safety and well-being of the minor. I have read and understood the terms of this waiver and voluntarily agree to them on behalf of the minor participant."
                    ]
                },
                {
                    title: "8. SEVERABILITY",
                    content: ["If any part of this waiver is determined to be invalid, illegal, or unenforceable, the remainder of the waiver shall continue in full force and effect."]
                }
            ]
        }
    };

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
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black mb-6">
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
            <section className="relative px-4 pb-16">
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
            </section>

            {/* New Terms & Waiver Section */}
            <section className="relative px-4 pb-32 md:pb-40 bg-surface-900/30 pt-16 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                        Terms, Conditions & Waiver
                    </h2>

                    {/* Tabs */}
                    <div className="flex overflow-x-auto gap-4 py-4 mb-12 no-scrollbar justify-center">
                        {[
                            { id: "terms", label: "Terms & Conditions", icon: <FileText className="w-4 h-4" /> },
                            { id: "detailed_rules", label: "Detailed Rules", icon: <Shield className="w-4 h-4" /> },
                            { id: "waiver", label: "Participant Waiver", icon: <CheckCircle className="w-4 h-4" /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? "bg-primary text-black shadow-lg shadow-primary/25"
                                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="bg-surface-800/50 p-8 rounded-3xl border border-white/10">
                        {/* Terms Content */}
                        {activeTab === "terms" && (
                            <ScrollReveal animation="fade">
                                <div className="space-y-12">
                                    {termsContent.terms.sections.map((section, index) => (
                                        <div key={index} className="bg-surface-800/50 p-8 rounded-3xl border border-white/10">
                                            <h3 className="text-2xl font-display font-bold mb-6 text-primary flex items-center gap-3">
                                                {section.title}
                                            </h3>
                                            <ul className="space-y-4">
                                                {section.content.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-white/80">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Detailed Rules Content */}
                        {activeTab === "detailed_rules" && (
                            <ScrollReveal animation="fade">
                                <div className="space-y-12">
                                    {termsContent.detailed_rules.sections.map((section, index) => (
                                        <div key={index} className="bg-surface-800/50 p-8 rounded-3xl border border-white/10">
                                            <h3 className="text-2xl font-display font-bold mb-6 text-secondary flex items-center gap-3">
                                                {section.title}
                                            </h3>
                                            <ul className="space-y-4">
                                                {section.content.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-white/80">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Waiver Content */}
                        {activeTab === "waiver" && (
                            <ScrollReveal animation="fade">
                                <div className="bg-surface-800/50 p-8 rounded-3xl border border-white/10">
                                    <div className="mb-8 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                                        <p className="text-accent font-bold text-center">
                                            {termsContent.waiver.intro}
                                        </p>
                                    </div>
                                    <div className="space-y-8">
                                        {termsContent.waiver.sections.map((section, index) => (
                                            <div key={index}>
                                                <h3 className="text-lg font-bold mb-3 text-white">
                                                    {section.title}
                                                </h3>
                                                <div className="space-y-3">
                                                    {section.content.map((item, i) => (
                                                        <p key={i} className="text-white/70 text-sm leading-relaxed">
                                                            {item}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                </div>
                <SectionDivider position="bottom" variant="wave" color="fill-background" />
            </section>
        </main>
    );
}
