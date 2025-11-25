"use client";

<<<<<<< HEAD
import { AnimatedHero, ScrollReveal, BouncyButton, SectionDivider, Marquee } from "@repo/ui";
=======
import { AnimatedHero, ScrollReveal, BouncyButton, SectionDivider } from "@repo/ui";
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
import { motion } from "framer-motion";
import { Zap, Shield, Users, Trophy, Star, ArrowRight, Heart, Play, Instagram } from "lucide-react";
import Link from "next/link";

export default function Home() {
    const stats = [
        { icon: <Zap className="w-8 h-8" />, value: "20,000+", label: "Sq Ft of Fun" },
        { icon: <Users className="w-8 h-8" />, value: "50,000+", label: "Happy Jumpers" },
        { icon: <Trophy className="w-8 h-8" />, value: "10+", label: "Attractions" },
        { icon: <Shield className="w-8 h-8" />, value: "100%", label: "Safe & Secure" },
    ];



    return (
        <main className="bg-background text-white">
            {/* Hero Section */}
            <AnimatedHero />

            {/* Stats Section */}
<<<<<<< HEAD
            <section className="relative pt-12 md:pt-20 pb-16 md:pb-32 px-4 bg-background-light">
=======
            <section className="relative pt-20 pb-32 px-4 bg-background-light">
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
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

            {/* About Section */}
<<<<<<< HEAD
            <section className="relative py-12 md:py-20 px-4 bg-background">
=======
            <section className="relative py-20 px-4 bg-background">
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <ScrollReveal animation="slideLeft">
                            <div>
                                <span className="inline-block py-1 px-3 rounded-full bg-secondary text-black font-bold text-sm mb-6 tracking-wider uppercase">
                                    About Us
                                </span>
                                <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                                        India's Biggest Inflatable Park
                                    </span>
                                </h2>
                                <p className="text-xl text-white/80 mb-6 leading-relaxed">
                                    Ninja Inflatable Park was born from a simple idea: create a space where people of all ages can unleash their inner ninja, challenge themselves, and have an absolute blast doing it.
                                </p>
                                <p className="text-xl text-white/80 leading-relaxed mb-8">
                                    Spanning over 20,000 square feet, we've created India's largest inflatable adventure park with 11+ unique zones designed to thrill, challenge, and entertain.
                                </p>
                                <Link href="/about">
                                    <BouncyButton size="lg" variant="outline" className="text-white border-white">
                                        Read Our Story <ArrowRight className="w-5 h-5 ml-2" />
                                    </BouncyButton>
                                </Link>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal animation="slideRight">
                            <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square">
                                <img
                                    src="/park-slides-action.jpg"
                                    alt="Kids enjoying the park"
                                    className="w-full h-full object-cover rounded-3xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
                <SectionDivider position="bottom" variant="curve" color="fill-background" />
            </section>

            {/* Featured Attractions */}
<<<<<<< HEAD
            <section className="relative py-12 md:py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="slideUp" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black mb-4">
=======
            <section className="relative py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="slideUp" className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-display font-black mb-4">
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                                Epic Attractions
                            </span>
                        </h2>
<<<<<<< HEAD
                        <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
                            Step into India’s ultimate inflatable adventure! Packed with giant slides, wipe-out challenges, ninja obstacle courses, climbing walls, jumping balls, and more.
                        </p>
                        <div className="mb-12 max-w-full overflow-hidden">
                            <Marquee speed={40} pauseOnHover={true} className="py-4">
                                {["Ninja Obstacle Course", "High Slides", "Wipe-Out Challenge", "Maze Adventure", "Giant Jumping Balls", "Balance Beam", "Dinosaur Guard", "Jelly Bead Zone", "Climbing Wall", "Wave Bed & Spider Wall"].map((item) => (
                                    <span key={item} className="mx-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/5 border border-white/10 text-sm md:text-lg font-bold text-secondary whitespace-nowrap hover:bg-white/10 transition-colors">
                                        {item}
                                    </span>
                                ))}
                            </Marquee>
=======
                        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                            Step into India’s ultimate inflatable adventure! Packed with giant slides, wipe-out challenges, ninja obstacle courses, climbing walls, jumping balls, and more.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-8">
                            {["Ninja Obstacle Course", "High Slides", "Wipe-Out Challenge", "Maze Adventure", "Giant Jumping Balls", "Balance Beam", "Dinosaur Guard", "Jelly Bead Zone", "Climbing Wall", "Wave Bed & Spider Wall"].map((item) => (
                                <span key={item} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-secondary">
                                    {item}
                                </span>
                            ))}
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
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
<<<<<<< HEAD
            <section className="relative pt-12 md:pt-20 pb-16 md:pb-32 px-4 bg-background-light">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="slideUp" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black mb-4">
=======
            <section className="relative pt-20 pb-32 px-4 bg-background-light">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="slideUp" className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-display font-black mb-4">
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary">
                                See The Action
                            </span>
                        </h2>
<<<<<<< HEAD
                        <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto">
=======
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
                            Real moments, real fun! Check out what awaits you at Ninja Inflatable Park.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { src: "/images/gallery-1.jpg", title: "Ninja Obstacle Course", desc: "Test your agility and speed" },
                            { src: "/images/gallery-2.jpg", title: "Giant Slides", desc: "Feel the adrenaline rush" },
                            { src: "/images/gallery-1.jpg", title: "Wipe-Out Challenge", desc: "Can you stay on your feet?" },
                            { src: "/images/gallery-2.jpg", title: "Maze Adventure", desc: "Get lost in the twists and turns" },
                            { src: "/images/gallery-1.jpg", title: "Giant Jumping Balls", desc: "Leap across massive bouncing balls" },
                            { src: "/images/gallery-2.jpg", title: "Climbing Wall", desc: "Scale new heights safely" },
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



            {/* People Reviews Section */}
<<<<<<< HEAD
            <section className="relative py-12 md:py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade" className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black mb-4">
=======
            <section className="relative py-20 px-4 bg-background">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal animation="fade" className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-display font-black mb-4">
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary">
                                People Reviews on Ninja
                            </span>
                        </h2>
<<<<<<< HEAD
                        <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
=======
                        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
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
                <SectionDivider position="bottom" variant="diagonal" color="fill-background" />
            </section>

            {/* CTA Section */}
<<<<<<< HEAD
            < section className="relative py-16 md:py-32 px-4 bg-background" >
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal animation="scale">
                        <h2 className="text-5xl md:text-6xl lg:text-8xl font-display font-black mb-6 leading-tight">
=======
            < section className="relative py-32 px-4 bg-background" >
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal animation="scale">
                        <h2 className="text-6xl md:text-8xl font-display font-black mb-6 leading-tight">
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
                            Ready to
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary">
                                BOUNCE?
                            </span>
                        </h2>
<<<<<<< HEAD
                        <p className="text-base md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                            Book your tickets now and experience the ultimate inflatable adventure!
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Link href="/pricing">
=======
                        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                            Book your tickets now and experience the ultimate inflatable adventure!
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Link href="/book">
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
                                <BouncyButton size="lg" variant="accent">
                                    Book Tickets Now
                                </BouncyButton>
                            </Link>
                            <Link href="/parties">
                                <BouncyButton size="lg" variant="secondary">
                                    Plan a Party
                                </BouncyButton>
                            </Link>
<<<<<<< HEAD
                            <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-4 text-center md:text-left">
=======
                            <div className="mt-4 md:mt-0 md:ml-4">
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
                                <p className="text-sm text-white/60 mb-1">Questions?</p>
                                <a href="tel:9845471611" className="text-xl font-bold text-white hover:text-primary transition-colors">
                                    📞 9845471611
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section >
        </main >
    );
}
