"use client";

import { motion } from "framer-motion";
import { Coffee, Wifi, Car, Lock, Baby, Heart, Video } from "lucide-react";

export default function Facilities() {
    const facilities = [
        {
            icon: <Coffee className="h-10 w-10 text-white" />,
            title: "Ninja Cafe",
            description: "Refuel with delicious snacks and drinks at our on-site cafe. Perfect for parents to relax while kids play.",
            color: "bg-orange-500"
        },
        {
            icon: <Wifi className="h-10 w-10 text-white" />,
            title: "Free Wi-Fi",
            description: "Stay connected with our complimentary high-speed Wi-Fi available throughout the park.",
            color: "bg-blue-500"
        },
        {
            icon: <Car className="h-10 w-10 text-white" />,
            title: "Free Parking",
            description: "Ample parking space available for all our guests. First 2 hours are completely free!",
            color: "bg-green-500"
        },
        {
            icon: <Lock className="h-10 w-10 text-white" />,
            title: "Secure Lockers",
            description: "Keep your valuables safe in our secure lockers while you enjoy the park worry-free.",
            color: "bg-purple-500"
        },
        {
            icon: <Baby className="h-10 w-10 text-white" />,
            title: "Baby Care",
            description: "Dedicated baby changing facilities and nursing areas for the comfort of our youngest guests.",
            color: "bg-pink-500"
        },
        {
            icon: <Heart className="h-10 w-10 text-white" />,
            title: "First Aid",
            description: "Trained first aid staff always on site to handle any minor bumps or scrapes immediately.",
            color: "bg-red-500"
        },
        {
            icon: <Video className="h-10 w-10 text-white" />,
            title: "CCTV Coverage",
            description: "24/7 CCTV surveillance across the entire park to ensure maximum safety and security.",
            color: "bg-gray-700"
        }
    ];

    return (
        <main className="bg-background-light min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-black text-primary mb-6">
                            Park Facilities
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            We've thought of everything to make your visit comfortable and convenient.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {facilities.map((facility, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                        >
                            <div className={`${facility.color} w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-lg transform -rotate-3`}>
                                {facility.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{facility.title}</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                {facility.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
