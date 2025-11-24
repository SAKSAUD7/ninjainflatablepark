"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, Info, CheckCircle } from "lucide-react";

export default function Safety() {
    const rules = [
        {
            title: "General Rules",
            items: [
                "Safety briefing is mandatory before entering the play area.",
                "Ninja Grip Socks must be worn at all times. No shoes or bare feet.",
                "Remove all jewelry, watches, keys, and sharp objects.",
                "No phones or cameras allowed on the equipment.",
                "No food, drink, or chewing gum in the play zones.",
                "Do not participate if you are pregnant or have health issues."
            ]
        },
        {
            title: "Play Etiquette",
            items: [
                "No pushing, racing, or dangerous stunts.",
                "One person at a time on slides and climbing walls.",
                "Always slide feet first. No headfirst diving.",
                "Move in one direction on obstacle courses.",
                "Be aware of others around you, especially smaller children.",
                "Follow all instructions given by the Ninja Marshals."
            ]
        }
    ];

    return (
        <main className="bg-background-light min-h-screen pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center p-6 bg-red-100 rounded-full mb-8"
                    >
                        <Shield className="h-16 w-16 text-red-600" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-black text-gray-900 mb-6">
                            Safety First
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Your safety is our top priority. Please read and follow these guidelines to ensure a fun and safe experience for everyone.
                        </p>
                    </motion.div>
                </div>

                <div className="space-y-12">
                    {rules.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-lg border border-gray-100"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center border-b border-gray-100 pb-4">
                                <Info className="h-6 w-6 text-primary mr-3" />
                                {section.title}
                            </h2>
                            <ul className="space-y-6">
                                {section.items.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-lg font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-yellow-50 rounded-[2rem] p-8 md:p-10 border border-yellow-200 flex flex-col md:flex-row items-start gap-6"
                    >
                        <div className="bg-yellow-100 p-4 rounded-full flex-shrink-0">
                            <AlertTriangle className="h-8 w-8 text-yellow-600" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Parental Supervision</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Ninja Inflatable Park staff (Marshals) are present to supervise and ensure safety. However,
                                <span className="font-bold"> parents/guardians are responsible for supervising their children at all times.</span>
                                Failure to follow safety rules may result in removal from the park without refund.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
