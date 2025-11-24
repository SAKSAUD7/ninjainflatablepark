"use client";

import { motion } from "framer-motion";
import { Check, Calendar, Clock, Users, AlertTriangle, Info } from "lucide-react";

export default function Parties() {
    return (
        <main className="bg-background-light min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-primary overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 drop-shadow-lg">
                            Party Like a <span className="text-accent">Ninja!</span>
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                            Celebrate your special day with India's biggest inflatable park.
                            We take care of everything so you can focus on the fun.
                        </p>
                        <a
                            href="#book-party"
                            className="inline-block bg-accent hover:bg-accent-dark text-black font-black py-4 px-12 rounded-full transition-transform hover:scale-105 shadow-xl uppercase tracking-wide text-lg"
                        >
                            Book Your Party
                        </a>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Party Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-accent rounded-[3rem] transform rotate-3 opacity-20" />
                        <img
                            src="/party-kids-venue.jpg"
                            alt="Birthday Party at Ninja Inflatable Park"
                            className="relative rounded-[3rem] shadow-2xl w-full h-[500px] object-cover border-8 border-white"
                        />
                    </motion.div>

                    <div className="flex flex-col justify-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-display font-black text-gray-900 mb-6">The Ultimate Party Package</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Our packages are designed to give you the best experience with zero stress.
                                Perfect for birthdays, team outings, and school trips.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="bg-blue-100 p-3 rounded-xl mr-4">
                                        <Clock className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">2 Hours of Fun</h3>
                                        <p className="text-gray-600 font-medium">75 minutes of jump time followed by 45 minutes in your private party room.</p>
                                    </div>
                                </div>

                                <div className="flex items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="bg-green-100 p-3 rounded-xl mr-4">
                                        <Users className="h-8 w-8 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">Minimum 10 Guests</h3>
                                        <p className="text-gray-600 font-medium">Gather your squad! A minimum of 10 guests is required to book a party package.</p>
                                    </div>
                                </div>

                                <div className="flex items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="bg-yellow-100 p-3 rounded-xl mr-4">
                                        <Calendar className="h-8 w-8 text-accent-dark" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">Thursday to Sunday</h3>
                                        <p className="text-gray-600 font-medium">Parties are exclusively available from Thursday through Sunday.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Terms Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border border-gray-100 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2" />

                    <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-12 text-center">
                        Important Party Terms
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold text-primary mb-6 flex items-center">
                                <Info className="mr-2" /> Booking & Payment
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "50% non-refundable deposit required to confirm booking",
                                    "Remaining balance must be paid before the party starts",
                                    "Minimum 10 guests required for party rates",
                                    "Extra guests pay separately",
                                    "All guests must sign a waiver form"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                                            <Check className="h-3 w-3 text-green-600" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-red-500 mb-6 flex items-center">
                                <AlertTriangle className="mr-2" /> Rescheduling & Rules
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "One date change allowed with ≥ 2 weeks notice",
                                    "Rescheduling within 2 weeks incurs ₹1,000 admin fee",
                                    "Extra time charged at ₹100 per 10 minutes",
                                    "No outside food allowed (except birthday cake)",
                                    "No confetti, poppers, or flower candles"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="bg-red-100 p-1 rounded-full mr-3 mt-0.5">
                                            <Check className="h-3 w-3 text-red-600" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Booking CTA */}
                <div id="book-party" className="mt-24 text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-6">Ready to Book?</h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Fill out our inquiry form or give us a call to check availability and plan your perfect party.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a
                            href="/contact"
                            className="bg-primary hover:bg-primary-dark text-white font-black py-4 px-10 rounded-full transition-colors shadow-lg text-lg uppercase tracking-wide"
                        >
                            Contact Us
                        </a>
                        <a
                            href="tel:+919845471611"
                            className="bg-white border-2 border-gray-200 hover:border-primary text-gray-900 hover:text-primary font-black py-4 px-10 rounded-full transition-colors text-lg uppercase tracking-wide"
                        >
                            Call +91 98454 71611
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
