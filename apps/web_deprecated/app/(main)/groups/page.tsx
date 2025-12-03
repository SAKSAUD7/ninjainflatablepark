"use client";

import { ScrollReveal, BouncyButton, SectionDivider } from "@repo/ui";
import { motion } from "framer-motion";
import { Users, Clock, Check, Trophy, Sparkles, Building2 } from "lucide-react";
import Link from "next/link";

export default function GroupsPage() {
    const groupPackages = [
        {
            title: "School Groups",
            subtitle: "Perfect for field trips & educational outings",
            minSize: "15+ Students",
            icon: <Building2 className="w-8 h-8" />,
            price: "₹699",
            priceNote: "per student",
            features: [
                "Discounted group rates",
                "Teacher/Chaperone free entry",
                "Dedicated supervision area",
                "Flexible timing slots",
                "Educational team building activities",
                "Safe & secure environment"
            ],
            color: "primary"
        },
        {
            title: "Corporate Teams",
            subtitle: "Team building & employee engagement",
            minSize: "10+ Employees",
            icon: <Trophy className="w-8 h-8" />,
            price: "₹799",
            priceNote: "per person",
            features: [
                "Customized team challenges",
                "Private session options",
                "Corporate invoicing available",
                "Refreshments can be arranged",
                "Team building activities",
                "Photography services available"
            ],
            color: "secondary",
            popular: true
        },
        {
            title: "Friends & Family",
            subtitle: "Large group celebrations",
            minSize: "10+ People",
            icon: <Users className="w-8 h-8" />,
            price: "₹749",
            priceNote: "per person",
            features: [
                "Group discount pricing",
                "Extended play time options",
                "Dedicated party area",
                "Flexible group size",
                "Perfect for reunions",
                "Special occasion packages"
            ],
            color: "accent"
        }
    ];

    const benefits = [
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "Exclusive Discounts",
            description: "Save more with larger groups"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Flexible Scheduling",
            description: "Book at your preferred time"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Dedicated Support",
            description: "Personal coordinator for your group"
        },
        {
            icon: <Trophy className="w-6 h-6" />,
            title: "Custom Activities",
            description: "Tailored experiences for your group"
        }
    ];

    return (
        <main className="bg-background text-white min-h-screen pt-24">
            {/* Header */}
            <section className="relative py-16 md:py-32 px-4 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/gallery-1.jpg"
                        alt="Group Bookings"
                        className="w-full h-full object-cover opacity-30"
                        onError={(e) => {
                            e.currentTarget.src = "/hero-background.jpg";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
                </div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <ScrollReveal animation="slideUp">
                        <span className="inline-block py-2 px-6 rounded-full bg-accent text-black font-black text-sm mb-6 tracking-widest uppercase">
                            Special Group Rates
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-black mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Group Bookings
                            </span>
                        </h1>
                        <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
                            Bring your team, class, or friends for an unforgettable adventure! Enjoy exclusive group rates and dedicated support.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="relative py-12 md:py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {benefits.map((benefit, index) => (
                            <ScrollReveal key={index} animation="scale" delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="bg-surface-800/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center"
                                >
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-sm text-white/60">{benefit.description}</p>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Group Packages */}
            <section className="relative px-4 pb-32 md:pb-40 bg-background">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade" className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-display font-black mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary">
                                Choose Your Package
                            </span>
                        </h2>
                        <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto">
                            Select the perfect package for your group and let us handle the rest!
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {groupPackages.map((pkg, index) => (
                            <ScrollReveal key={index} animation="scale" delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className={`relative p-8 rounded-3xl border-2 ${pkg.popular
                                        ? 'border-secondary bg-surface-800/80'
                                        : 'border-white/10 bg-surface-800/50'
                                        } backdrop-blur-sm h-full flex flex-col`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-black font-bold py-1 px-4 rounded-full text-sm">
                                            MOST POPULAR
                                        </div>
                                    )}

                                    <div className={`w-16 h-16 rounded-full bg-${pkg.color}/20 flex items-center justify-center mb-4 text-${pkg.color}`}>
                                        {pkg.icon}
                                    </div>

                                    <h3 className={`text-2xl font-display font-bold mb-2 text-${pkg.color}`}>
                                        {pkg.title}
                                    </h3>
                                    <p className="text-white/60 mb-4 text-sm">{pkg.subtitle}</p>
                                    <p className="text-white/80 font-bold mb-6 flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        {pkg.minSize}
                                    </p>

                                    <div className="mb-8">
                                        <span className="text-5xl font-black text-white">{pkg.price}</span>
                                        <span className="text-white/60 text-sm ml-2">{pkg.priceNote}</span>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {pkg.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-white/80">
                                                <Check className={`w-5 h-5 text-${pkg.color} shrink-0 mt-0.5`} />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/contact#contactForm" className="w-full">
                                        <BouncyButton size="lg" variant={pkg.color as any} className="w-full">
                                            Enquire Now
                                        </BouncyButton>
                                    </Link>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Info */}
            <section className="relative py-12 md:py-20 px-4 bg-background-light">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal animation="fade">
                        <div className="bg-surface-800/50 backdrop-blur-md p-8 rounded-3xl border border-primary/30">
                            <h3 className="text-3xl font-display font-black mb-6 text-center">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                    How It Works
                                </span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary font-black text-xl">
                                        1
                                    </div>
                                    <h4 className="font-bold mb-2">Contact Us</h4>
                                    <p className="text-sm text-white/60">Fill out the enquiry form with your group details</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 text-secondary font-black text-xl">
                                        2
                                    </div>
                                    <h4 className="font-bold mb-2">Get Quote</h4>
                                    <p className="text-sm text-white/60">We'll send you a customized quote within 24 hours</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 text-accent font-black text-xl">
                                        3
                                    </div>
                                    <h4 className="font-bold mb-2">Book & Enjoy</h4>
                                    <p className="text-sm text-white/60">Confirm your booking and have an amazing time!</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="mt-12 text-center">
                        <ScrollReveal animation="scale">
                            <p className="text-white/70 mb-6">
                                Have questions? Our team is here to help!
                            </p>
                            <Link href="/contact#contactForm">
                                <BouncyButton size="lg" variant="primary">
                                    Contact Us Now
                                </BouncyButton>
                            </Link>
                        </ScrollReveal>
                    </div>
                </div>
                <SectionDivider position="bottom" variant="wave" color="fill-background" />
            </section>
        </main>
    );
}
