"use client";

import { AnimatedHero, ScrollReveal, BouncyButton, SectionDivider } from "@repo/ui";
import { motion } from "framer-motion";
import { Zap, Shield, Users, Trophy, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    const stats = [
        { icon: <Zap className="w-8 h-8" />, value: "20,000+", label: "Sq Ft of Fun" },
        { icon: <Users className="w-8 h-8" />, value: "50,000+", label: "Happy Jumpers" },
        { icon: <Trophy className="w-8 h-8" />, value: "10+", label: "Attractions" },
        { icon: <Shield className="w-8 h-8" />, value: "100%", label: "Safe & Secure" },
    ];

    const testimonials = [
        { name: "Priya S.", text: "Best birthday party ever! The kids had an absolute blast!", rating: 5 },
        { name: "Rahul M.", text: "Amazing experience. The ninja course is incredibly fun!", rating: 5 },
        { name: "Anjali K.", text: "Clean, safe, and so much fun. Highly recommend!", rating: 5 },
    ];

    return (
        <main className="bg-background text-white">
            {/* Hero Section */}
            <AnimatedHero />

            {/* Stats Section */}
            <section className="relative pt-20 pb-32 px-4 bg-background-light">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/20 text-primary">
                                        {stat.icon}
                                    </div>
                                    <div className="text-4xl font-display font-black text-white mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-white/60">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
                <SectionDivider position="bottom" variant="wave" color="fill-background" />
            </section>

            {/* Featured Attractions */}
            <section className="relative py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="slideUp" className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-display font-black mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Epic Attractions
                            </span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                            Step into India’s ultimate inflatable adventure! Packed with giant slides, wipe-out challenges, ninja obstacle courses, climbing walls, jumping balls, and more.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-8">
                            {["Ninja Obstacle Course", "High Slides", "Wipe-Out Challenge", "Maze Adventure", "Giant Jumping Balls", "Balance Beam", "Dinosaur Guard", "Jelly Bead Zone", "Climbing Wall", "Wave Bed & Spider Wall"].map((item) => (
                                <span key={item} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-secondary">
                                    {item}
                                </span>
                            ))}
                        </div>
                        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 max-w-xl mx-auto">
                            <p className="text-primary font-bold mb-1">⚠️ Risk Acknowledgement</p>
                            <p className="text-sm text-white/80">Please fill out the waiver prior to or on the date of your arrival.</p>
                        </div>
                    </ScrollReveal>

                    <div className="text-center mt-12">
                        <Link href="/attractions">
                            <BouncyButton size="lg" variant="primary">
                                View All Attractions <ArrowRight className="w-5 h-5" />
                            </BouncyButton>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Photo Gallery Section */}
            <section className="relative pt-20 pb-32 px-4 bg-background-light">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="slideUp" className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-display font-black mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary">
                                See The Action
                            </span>
                        </h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Real moments, real fun! Check out what awaits you at Ninja Inflatable Park.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { src: "/images/gallery-1.jpg", title: "Ninja Obstacle Course", desc: "Test your agility and speed" },
                            { src: "/images/gallery-2.jpg", title: "Giant Slides", desc: "Feel the adrenaline rush" },
                            { src: "/images/gallery-3.jpg", title: "Wipe-Out Challenge", desc: "Can you stay on your feet?" },
                            { src: "/images/gallery-1.jpg", title: "Maze Adventure", desc: "Get lost in the twists and turns" }, // Reusing for now
                            { src: "/images/gallery-2.jpg", title: "Giant Jumping Balls", desc: "Leap across massive bouncing balls" }, // Reusing for now
                            { src: "/images/gallery-3.jpg", title: "Climbing Wall", desc: "Scale new heights safely" }, // Reusing for now
                        ].map((photo, index) => (
                            <ScrollReveal key={index} animation="fade" delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="relative group overflow-hidden rounded-3xl cursor-pointer"
                                >
                                    <div className="aspect-[4/3] relative">
                                        <img
                                            src={photo.src}
                                            alt={photo.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-2xl font-display font-bold text-white mb-2">
                                                {photo.title}
                                            </h3>
                                            <p className="text-white/80">{photo.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
                <SectionDivider position="bottom" variant="wave" color="fill-background" />
            </section>

            {/* Testimonials */}
            <section className="relative pt-20 pb-32 px-4 bg-background-light">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade" className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-display font-black mb-4 text-white">
                            What People Say
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <ScrollReveal key={index} animation="slideUp" delay={index * 0.1}>
                                <div className="bg-surface-800 p-8 rounded-3xl border border-primary/20">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                                        ))}
                                    </div>
                                    <p className="text-white/90 mb-4 italic">"{testimonial.text}"</p>
                                    <p className="text-primary font-bold">— {testimonial.name}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
                <SectionDivider position="bottom" variant="diagonal" color="fill-background" />
            </section>

            {/* CTA Section */}
            <section className="relative py-32 px-4 bg-background">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal animation="scale">
                        <h2 className="text-6xl md:text-8xl font-display font-black mb-6 leading-tight">
                            Ready to
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary">
                                BOUNCE?
                            </span>
                        </h2>
                        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                            Book your tickets now and experience the ultimate inflatable adventure!
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Link href="/book">
                                <BouncyButton size="lg" variant="accent">
                                    Book Tickets Now
                                </BouncyButton>
                            </Link>
                            <Link href="/parties">
                                <BouncyButton size="lg" variant="secondary">
                                    Plan a Party
                                </BouncyButton>
                            </Link>
                            <div className="mt-4 md:mt-0 md:ml-4">
                                <p className="text-sm text-white/60 mb-1">Questions?</p>
                                <a href="tel:9845471611" className="text-xl font-bold text-white hover:text-primary transition-colors">
                                    📞 9845471611
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    );
}
