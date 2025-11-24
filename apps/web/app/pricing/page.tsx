"use client";

import { motion } from "framer-motion";
import { Check, Clock, AlertCircle } from "lucide-react";

export default function Pricing() {
    const prices = [
        {
            title: "Little Ninjas",
            age: "1 to 7 Years",
            price: "₹ 500",
            suffix: "+ GST",
            features: [
                "60 Minutes Play Time",
                "Includes Ninja Socks",
                "Access to Toddler Zone",
                "Must have supervising adult"
            ],
            color: "border-secondary",
            btnColor: "bg-secondary hover:bg-secondary-dark text-black"
        },
        {
            title: "Ninja Warrior",
            age: "7 Years & Above",
            price: "₹ 899",
            suffix: "+ GST",
            features: [
                "60 Minutes Play Time",
                "Includes Ninja Socks",
                "Full Park Access",
                "Unlimited Fun"
            ],
            color: "border-primary",
            btnColor: "bg-primary hover:bg-primary-dark text-white",
            popular: true
        },
        {
            title: "Spectator",
            age: "All Ages",
            price: "₹ 150",
            suffix: "+ GST",
            features: [
                "Entry to Park",
                "Access to Cafe",
                "Wi-Fi Access",
                "No Play Equipment Access"
            ],
            color: "border-gray-200",
            btnColor: "bg-gray-800 hover:bg-gray-900 text-white"
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
                            Session Pricing
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Simple, transparent pricing for everyone. All jump sessions include a pair of our special Ninja Grip Socks!
                        </p>
                    </motion.div>
                </div>

                {/* Promotional Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16 max-w-4xl mx-auto"
                >
                    <img
                        src="/promo-pricing.jpg"
                        alt="90 Minutes of Non-Stop Thrills - One Entry Price, Access to All Attractions"
                        className="w-full rounded-3xl shadow-2xl border-4 border-white"
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                    {prices.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`relative bg-white rounded-[2rem] p-8 border-2 ${plan.color} shadow-xl flex flex-col ${plan.popular ? 'transform md:-translate-y-4 md:scale-105 z-10' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-black font-bold px-6 py-2 rounded-full text-sm uppercase tracking-wide shadow-md">
                                    Most Popular
                                </div>
                            )}
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                                <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">{plan.age}</p>
                                <div className="mt-6 flex items-baseline justify-center">
                                    <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                                    <span className="text-xl text-gray-500 ml-2 font-bold">{plan.suffix}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                                            <Check className="h-4 w-4 text-green-600" />
                                        </div>
                                        <span className="text-gray-600 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="/book"
                                className={`block w-full text-center py-4 rounded-xl font-black transition-all shadow-lg uppercase tracking-wide ${plan.btnColor}`}
                            >
                                Book Now
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Extras Section */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        <div className="flex items-start gap-6">
                            <div className="bg-blue-100 p-4 rounded-2xl">
                                <Clock className="w-10 h-10 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Want More Time?</h3>
                                <p className="text-gray-600 text-lg">
                                    Extend your session for just <span className="font-black text-primary">₹ 500</span> for an extra hour!
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    * Extensions are subject to availability and can be purchased at the reception.
                                </p>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <div className="bg-yellow-50 px-6 py-4 rounded-xl border border-yellow-200 flex items-center">
                                <AlertCircle className="w-6 h-6 text-yellow-600 mr-3" />
                                <span className="text-yellow-800 font-bold">GST Applicable on all rates</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
