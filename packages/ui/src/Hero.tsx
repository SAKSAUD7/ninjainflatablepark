"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-hero">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Floating Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ y: [0, 40, 0], rotate: [360, 180, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-20 right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-8"
                    >
                        <img
                            src="/ninja-logo.png"
                            alt="Ninja Inflatable Park"
                            className="mx-auto h-32 md:h-40 lg:h-48 w-auto object-contain drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-6 leading-tight drop-shadow-lg">
                        Jump, Slide &
                        <br />
                        <span className="relative inline-block">
                            <span className="text-white">Conquer!</span>
                            <motion.div
                                className="absolute -bottom-2 left-0 right-0 h-3 bg-white/30 -z-10"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
                        Experience <span className="font-bold text-white">20,000 sq ft</span> of pure fun and adventure at India's biggest inflatable park!
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.a
                            href="/book"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group btn btn-accent text-lg px-10 py-4 shadow-strong"
                        >
                            <span>Book Your Adventure</span>
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>

                        <motion.a
                            href="#video"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group btn bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-10 py-4"
                        >
                            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>Watch Video</span>
                        </motion.a>
                    </div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                    >
                        {[
                            { number: "20K+", label: "Sq Ft" },
                            { number: "11+", label: "Attractions" },
                            { number: "50K+", label: "Happy Visitors" },
                            { number: "100%", label: "Safe & Fun" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.number}</div>
                                <div className="text-white/80 font-medium uppercase tracking-wide text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
                    <motion.div
                        className="w-1.5 h-3 bg-white rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </div>
            </motion.div>
        </div>
    );
};
