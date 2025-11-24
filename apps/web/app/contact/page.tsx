"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Calendar } from "lucide-react";

export default function Contact() {
    return (
        <main className="bg-background-light min-h-screen">
            <div className="bg-primary text-white py-20 pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-black mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
                            We'd love to hear from you. Here's how you can reach us.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0 }}
                        className="bg-white p-8 rounded-[2rem] shadow-xl text-center border border-gray-100"
                    >
                        <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Phone className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                        <p className="text-gray-600 mb-4 font-medium">Tue-Sun from 12pm to 9pm</p>
                        <a href="tel:+919845471611" className="text-2xl font-black text-primary hover:text-primary-dark transition-colors">
                            98454 71611
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-8 rounded-[2rem] shadow-xl text-center border border-gray-100"
                    >
                        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-600 mb-4 font-medium">For bookings and general inquiries</p>
                        <a href="mailto:info@ninjainflatablepark.com" className="text-lg font-bold text-primary hover:text-primary-dark transition-colors break-all">
                            info@ninjainflatablepark.com
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-[2rem] shadow-xl text-center border border-gray-100"
                    >
                        <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Clock className="h-10 w-10 text-accent-dark" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Opening Hours</h3>
                        <p className="text-gray-600 font-medium">Tue - Sun: 12:00 PM - 9:00 PM</p>
                        <p className="text-red-500 font-bold mt-2 flex items-center justify-center">
                            <Calendar className="w-4 h-4 mr-2" /> Monday Closed
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-display font-black text-gray-900 mb-8">Visit Us</h2>
                        <div className="flex items-start mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <MapPin className="h-8 w-8 text-primary mr-4 flex-shrink-0 mt-1" />
                            <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                No. 35/11, Hennur Bagalur Main Road,<br />
                                Chagalatti Village, Jala Hobli,<br />
                                Karnataka, India – 562149
                            </p>
                        </div>
                        <div className="rounded-[2rem] overflow-hidden shadow-2xl h-[400px] border-4 border-white">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.696387817085!2d77.6396823148243!3d13.11868599075969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae190030000001%3A0x1234567890abcdef!2sNinja%20Inflatable%20Park!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-display font-black text-gray-900 mb-8">Send a Message</h2>
                        <form className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none transition-all font-medium bg-gray-50 focus:bg-white" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Phone</label>
                                    <input type="tel" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none transition-all font-medium bg-gray-50 focus:bg-white" placeholder="Your Phone" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none transition-all font-medium bg-gray-50 focus:bg-white" placeholder="Your Email" />
                            </div>
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none transition-all font-medium bg-gray-50 focus:bg-white" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 uppercase tracking-wide text-lg">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
