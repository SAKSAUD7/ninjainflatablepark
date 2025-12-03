"use client";

import { ScrollReveal, SectionDivider, BouncyButton } from "@repo/ui";
import { motion } from "framer-motion";
import { Heart, Shield, Users, Zap, Target, Award, Sparkles, Calendar, HelpCircle, Instagram, Play } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const values = [
        {
            icon: <Users className="w-8 h-8" />,
            title: "Fun First",
            description: "Every decision we make is centered around creating maximum fun and joy for our guests.",
            color: "secondary",
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Safety Always",
            description: "Your safety is our top priority. Trained staff, quality equipment, and strict protocols.",
            color: "primary",
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Inclusive",
            description: "Activities for all ages and abilities. Everyone deserves to feel like a ninja!",
            color: "accent",
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Excellence",
            description: "We strive for excellence in every aspect, from cleanliness to customer service.",
            color: "secondary",
        },
    ];

    const stats = [
        { value: "20,000+", label: "Sq Ft of Fun", icon: <Zap className="w-6 h-6" /> },
        { value: "50,000+", label: "Happy Ninjas", icon: <Users className="w-6 h-6" /> },
        { value: "11+", label: "Unique Zones", icon: <Sparkles className="w-6 h-6" /> },
        { value: "100%", label: "Safety Record", icon: <Shield className="w-6 h-6" /> },
    ];

    const timeline = [
        { year: "2020", title: "The Dream Begins", desc: "Conceptualized India's biggest inflatable adventure park" },
        { year: "2021", title: "Construction Starts", desc: "Began building our 20,000 sq ft facility with state-of-the-art equipment" },
        { year: "2022", title: "Grand Opening", desc: "Opened doors to thousands of excited ninjas!" },
        { year: "2023", title: "50K+ Happy Visitors", desc: "Celebrated serving over 50,000 happy customers" },
        { year: "2024", title: "Expansion & Growth", desc: "Added new zones and became India's #1 inflatable park" },
    ];

    const faqs = [
        { q: "What age groups can enjoy Ninja Park?", a: "We have zones for everyone! From a dedicated toddler area to challenging courses for teens and adults. It's truly All Ages, All Fun." },
        { q: "Do I need to book in advance?", a: "We highly recommend booking online to secure your slot, especially on weekends. Walk-ins are subject to availability." },
        { q: "What should I wear?", a: "Comfortable athletic wear is best. Socks are MANDATORY for hygiene and safety. We sell grip socks at the counter if you need them." },
        { q: "Is the park safe for children?", a: "Absolutely! We have a 100% safety record. Our equipment is top-tier, and trained marshals supervise all zones." },
        { q: "Can I host a birthday party here?", a: "Yes! We specialize in unforgettable birthday bashes. Check out our Parties page for packages." },
    ];

    return (
        <main className="min-h-screen bg-background text-white">
            {/* Hero */}
            <section className="relative pt-32 pb-20 px-4 bg-gradient-to-b from-background-dark to-background">
                <div className="max-w-7xl mx-auto text-center">
                    <ScrollReveal animation="fade">
                        <span className="inline-block py-1 px-3 rounded-full bg-secondary text-black font-bold text-sm mb-6 tracking-wider uppercase">
                            About Us
                        </span>
                    </ScrollReveal>
                    <ScrollReveal animation="slideUp" delay={0.2}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                India's Biggest Inflatable Adventure Park
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
                            Experience the thrill of jumping, sliding, and bouncing in a safe and fun environment.
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
                                    <div className="text-4xl md:text-5xl font-display font-black text-white mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-white/60">{stat.label}</div>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="relative py-20 px-4 bg-background-light">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <ScrollReveal animation="slideLeft">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                                        Our Story
                                    </span>
                                </h2>
                                <p className="text-xl text-white/80 mb-6 leading-relaxed">
                                    Ninja Inflatable Park was born from a simple idea: create a space where people of all ages can unleash their inner ninja, challenge themselves, and have an absolute blast doing it.
                                </p>
                                <p className="text-xl text-white/80 mb-6 leading-relaxed">
                                    Spanning over 20,000 square feet, we've created India's largest inflatable adventure park with 11+ unique zones designed to thrill, challenge, and entertain.
                                </p>
                                <p className="text-xl text-white/80 leading-relaxed">
                                    Whether you're looking for a fun family outing, an adrenaline-pumping workout, or the perfect venue for your next celebration, Ninja Park is your destination for unforgettable memories.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slideRight">
                            <div className="relative rounded-3xl overflow-hidden aspect-square">
                                <img
                                    src="/park-slides-action.jpg"
                                    alt="Kids having fun at Ninja Inflatable Park"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
                <SectionDivider position="bottom" variant="wave" color="fill-background" />
            </section>

            {/* Our Journey (Timeline) */}
            <section className="py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade" className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                                Our Journey
                            </span>
                        </h2>
                    </ScrollReveal>

                    <div className="relative">
                        {/* Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/10 hidden md:block" />

                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <ScrollReveal key={index} animation={index % 2 === 0 ? "slideLeft" : "slideRight"}>
                                    <div className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                                        <div className="flex-1 w-full md:w-1/2" />
                                        <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full bg-accent text-black font-bold border-4 border-background shrink-0 my-4 md:my-0">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div className={`flex-1 w-full md:w-1/2 p-6 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                                            <div className="text-accent font-bold text-xl mb-2">{item.year}</div>
                                            <h3 className="text-2xl font-display font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-white/70">{item.desc}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 px-4 bg-background-light">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade" className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                                Our Values
                            </span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <ScrollReveal key={index} animation="slideUp" delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className={`p-8 bg-surface-800/50 backdrop-blur-md rounded-3xl border-2 border-${value.color}/30 hover:border-${value.color} transition-all h-full`}
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

            {/* People Reviews Section */}
            <section className="relative py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade" className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary">
                                People Reviews on Ninja
                            </span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                            Check out these amazing reviews from our visitors!
                        </p>
                    </ScrollReveal>

                    <div className="flex flex-wrap justify-center gap-6">
                        {[
                            { url: "https://www.instagram.com/reel/DRSCTjdAZB8/", img: "/images/instagram/reel-1.jpg" },
                            { url: "https://www.instagram.com/reel/DRWzwHdAVd4/", img: "/images/instagram/reel-2.jpg" },
                            { url: "https://www.instagram.com/reel/DRYjEb_Aa6X/", img: "/images/instagram/reel-1.jpg" },
                            { url: "https://www.instagram.com/reel/DRbC8O7EzFU/", img: "/images/instagram/reel-4.jpg" },
                            { url: "https://www.instagram.com/reel/DRXEmvtEhMX/", img: "/images/instagram/reel-5.jpg" }
                        ].map((item, index) => (
                            <ScrollReveal key={index} animation="scale" delay={index * 0.1} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="block group">
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[9/16]"
                                    >
                                        <img
                                            src={item.img}
                                            alt="Instagram Reel"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
                                        />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <Play className="w-8 h-8 text-white fill-white ml-1" />
                                            </div>
                                            <h3 className="text-2xl font-display font-bold text-white mb-2">Watch Review</h3>
                                            <div className="flex items-center text-white/80 text-sm">
                                                <Instagram className="w-4 h-4 mr-2" />
                                                <span>View on Instagram</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </a>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 bg-background-light">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal animation="fade" className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-display font-black mb-4">
                            <span className="text-white">Frequently Asked Questions</span>
                        </h2>
                        <p className="text-xl text-white/70">Got questions? We've got answers!</p>
                    </ScrollReveal>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <ScrollReveal key={index} animation="slideUp" delay={index * 0.1}>
                                <div className="bg-surface-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-colors">
                                    <h3 className="text-xl font-bold text-white mb-3 flex items-start">
                                        <HelpCircle className="w-6 h-6 text-primary mr-3 shrink-0 mt-1" />
                                        {faq.q}
                                    </h3>
                                    <p className="text-white/70 ml-9 leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
                <SectionDivider position="bottom" variant="wave" color="fill-background" />
            </section>

            {/* CTA */}
            <section className="relative py-32 px-4 pb-32 md:pb-40 bg-background">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal animation="scale">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black mb-6">
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
