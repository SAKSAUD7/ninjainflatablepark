"use client";

import { ScrollReveal, SectionDivider, BouncyButton } from "@repo/ui";
import { motion } from "framer-motion";
import { Heart, Shield, Users, Zap, Target, Award, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const values = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Safety First",
            description: "Your safety is our top priority. All equipment is regularly inspected and maintained.",
            color: "accent",
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Family Fun",
            description: "Creating memorable experiences for families and friends of all ages.",
            color: "primary",
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Pure Energy",
            description: "High-energy entertainment that keeps you bouncing and smiling all day long.",
            color: "secondary",
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Trained Staff",
            description: "Our team is professionally trained to ensure a safe and enjoyable experience.",
            color: "primary",
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Innovation",
            description: "Constantly updating our attractions to bring you the latest in inflatable fun.",
            color: "accent",
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Excellence",
            description: "Committed to delivering world-class entertainment and customer service.",
            color: "secondary",
        },
    ];

    const stats = [
        { value: "20,000+", label: "Square Feet", icon: <Zap className="w-6 h-6" /> },
        { value: "50,000+", label: "Happy Visitors", icon: <Users className="w-6 h-6" /> },
        { value: "11+", label: "Attractions", icon: <Sparkles className="w-6 h-6" /> },
        { value: "100%", label: "Fun Guaranteed", icon: <Heart className="w-6 h-6" /> },
    ];

    return (
        <main className="min-h-screen bg-background text-white">
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-background-dark to-background">
                <div className="max-w-7xl mx-auto text-center">
                    <ScrollReveal animation="fade">
                        <span className="inline-block py-1 px-3 rounded-full bg-secondary text-black font-bold text-sm mb-6 tracking-wider uppercase">
                            Our Story
                        </span>
                    </ScrollReveal>
                    <ScrollReveal animation="slideUp" delay={0.2}>
                        <h1 className="text-6xl md:text-8xl font-display font-black mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                About Us
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
                            India's biggest inflatable park, bringing joy and excitement to thousands of families!
                        </p>
                    </ScrollReveal>
                </div>
                <SectionDivider position="bottom" variant="curve" color="fill-background" />
            </section>

            {/* Stats */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <ScrollReveal key={index} animation="scale" delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-8 bg-surface-800/50 backdrop-blur-md rounded-3xl border border-primary/30"
                                >
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 text-primary mb-4">
                                        {stat.icon}
                                    </div>
                                    <div className="text-5xl font-display font-black text-white mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-white/60">{stat.label}</div>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="relative py-20 px-4 bg-background-light">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <ScrollReveal animation="slideLeft">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                                        Our Mission
                                    </span>
                                </h2>
                                <p className="text-xl text-white/80 mb-6 leading-relaxed">
                                    Welcome to Ninja Inflatable – India’s Biggest Inflatable Park! Our mission is to bring epic fun, fitness, and excitement under one roof. We are a destination where friends, families, and thrill-seekers can laugh, compete, and make unforgettable memories.
                                </p>
                                <p className="text-xl text-white/80 leading-relaxed">
                                    We cater to all ages – "All Ages, All Fun". Whether you're a toddler, teen, or adult, our safe and supervised environment ensures everyone can unleash their inner ninja. From birthdays to corporate outings, every step, jump, and bounce is an adventure.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slideRight">
                            <div className="relative rounded-3xl overflow-hidden">
                                <img
                                    src="/park-slides-action.jpg"
                                    alt="Kids enjoying the park"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slideRight">
                            <div className="relative">
                                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-md border border-primary/30 flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <Sparkles className="w-24 h-24 text-primary mx-auto mb-4" />
                                        <p className="text-2xl font-display font-bold text-white">
                                            Where Fun Meets Adventure
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
                <SectionDivider position="bottom" variant="wave" color="fill-background" />
            </section>

            {/* Values */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade" className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-display font-black mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                                Our Values
                            </span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <ScrollReveal key={index} animation="slideUp" delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className={`p-8 bg-surface-800/50 backdrop-blur-md rounded-3xl border-2 border-${value.color}/30 hover:border-${value.color} transition-all`}
                                >
                                    <div className={`w-14 h-14 rounded-full bg-${value.color}/20 flex items-center justify-center mb-4 text-${value.color}`}>
                                        {value.icon}
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-3 text-white">
                                        {value.title}
                                    </h3>
                                    <p className="text-white/70 leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-32 px-4 bg-background-light">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal animation="scale">
                        <h2 className="text-5xl md:text-7xl font-display font-black mb-6">
                            Join the
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary">
                                Adventure!
                            </span>
                        </h2>
                        <p className="text-xl text-white/70 mb-10">
                            Experience the thrill of India's biggest inflatable park today!
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link href="/book">
                                <BouncyButton size="lg" variant="accent">
                                    Book Tickets
                                </BouncyButton>
                            </Link>
                            <Link href="/contact">
                                <BouncyButton size="lg" variant="outline" className="text-white border-white">
                                    Contact Us
                                </BouncyButton>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    );
}
