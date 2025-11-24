"use client";

import { useState } from "react";
import { Check, Calendar, Users, FileText, CreditCard, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const BookingWizard = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        duration: "60",
        adults: 1,
        kids: 0,
        spectators: 0,
        name: "",
        email: "",
        phone: "",
        waiverAccepted: false
    });
    const [bookingComplete, setBookingComplete] = useState(false);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const calculateTotal = () => {
        const kidPrice = 500;
        const adultPrice = 899;
        const spectatorPrice = 150;

        let subtotal = (formData.kids * kidPrice) + (formData.adults * adultPrice) + (formData.spectators * spectatorPrice);

        if (formData.duration === "120") {
            // Add 500 per person (jumpers only) for extra hour
            subtotal += (formData.kids + formData.adults) * 500;
        }

        const gst = subtotal * 0.18;
        return { subtotal, gst, total: subtotal + gst };
    };

    const handlePayment = () => {
        // Simulate payment processing
        setTimeout(() => {
            setBookingComplete(true);
        }, 1500);
    };

    if (bookingComplete) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2rem] shadow-2xl p-12 text-center max-w-2xl mx-auto border-4 border-green-100"
            >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Check className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-4xl font-display font-black text-gray-900 mb-4">Booking Confirmed!</h2>
                <p className="text-xl text-gray-600 mb-8">
                    Thank you for booking with Ninja Inflatable Park. Your tickets have been sent to <span className="font-bold text-primary">{formData.email}</span>.
                </p>

                <div className="bg-gray-50 rounded-2xl p-8 mb-8 text-left border border-gray-200 dashed">
                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
                        <span className="font-bold text-gray-500 uppercase tracking-wide text-sm">Booking ID</span>
                        <span className="font-mono font-bold text-gray-900">NINJA-{Math.floor(Math.random() * 10000)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <span className="block text-xs text-gray-500 uppercase font-bold">Date</span>
                            <span className="font-bold text-gray-900">{formData.date}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 uppercase font-bold">Time</span>
                            <span className="font-bold text-gray-900">{formData.time}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 uppercase font-bold">Guests</span>
                            <span className="font-bold text-gray-900">{formData.adults + formData.kids + formData.spectators} Total</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 uppercase font-bold">Amount Paid</span>
                            <span className="font-bold text-primary">₹ {Math.round(calculateTotal().total)}</span>
                        </div>
                    </div>
                </div>

                <button className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-colors">
                    <Download className="mr-2 w-5 h-5" /> Download Ticket PDF
                </button>
            </motion.div>
        );
    }

    const totals = calculateTotal();

    return (
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-5xl mx-auto border border-gray-100">
            {/* Progress Bar */}
            <div className="bg-gray-50 p-6 border-b border-gray-100">
                <div className="flex justify-between items-center max-w-3xl mx-auto relative">
                    {/* Progress Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0 transform -translate-y-1/2 hidden md:block">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${((step - 1) / 3) * 100}%` }}
                        />
                    </div>

                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col items-center relative z-10 bg-gray-50 px-2">
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: step === i ? 1.2 : 1,
                                    backgroundColor: step >= i ? "var(--primary)" : "#e5e7eb",
                                    color: step >= i ? "#ffffff" : "#9ca3af"
                                }}
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm transition-colors duration-300`}
                                style={{ ['--primary' as any]: '#008db3' }}
                            >
                                {step > i ? <Check size={24} /> : i}
                            </motion.div>
                            <span className={`text-xs mt-3 font-bold uppercase tracking-wide ${step >= i ? "text-primary" : "text-gray-400"}`}>
                                {i === 1 ? "Session" : i === 2 ? "Guests" : i === 3 ? "Details" : "Payment"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-8 md:p-12 min-h-[500px]">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-display font-black text-gray-900 flex items-center">
                                <Calendar className="mr-4 text-primary h-8 w-8" /> Select Session
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none text-lg font-medium transition-all bg-gray-50 focus:bg-white"
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        value={formData.date}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Time Slot</label>
                                    <select
                                        className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none text-lg font-medium transition-all bg-gray-50 focus:bg-white"
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        value={formData.time}
                                    >
                                        <option value="">Select Time</option>
                                        <option value="12:00">12:00 PM</option>
                                        <option value="13:00">01:00 PM</option>
                                        <option value="14:00">02:00 PM</option>
                                        <option value="15:00">03:00 PM</option>
                                        <option value="16:00">04:00 PM</option>
                                        <option value="17:00">05:00 PM</option>
                                        <option value="18:00">06:00 PM</option>
                                        <option value="19:00">07:00 PM</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Duration</label>
                                <div className="grid grid-cols-2 gap-6">
                                    <button
                                        onClick={() => setFormData({ ...formData, duration: "60" })}
                                        className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all ${formData.duration === "60"
                                                ? "border-primary bg-blue-50 text-primary shadow-md transform scale-[1.02]"
                                                : "border-gray-200 hover:border-primary/50 text-gray-600"
                                            }`}
                                    >
                                        60 Minutes
                                    </button>
                                    <button
                                        onClick={() => setFormData({ ...formData, duration: "120" })}
                                        className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all ${formData.duration === "120"
                                                ? "border-primary bg-blue-50 text-primary shadow-md transform scale-[1.02]"
                                                : "border-gray-200 hover:border-primary/50 text-gray-600"
                                            }`}
                                    >
                                        120 Minutes <span className="text-sm block font-normal mt-1 text-gray-500">(+₹500/person)</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-display font-black text-gray-900 flex items-center">
                                <Users className="mr-4 text-primary h-8 w-8" /> Select Guests
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Ninja Warrior (7+ Years)</h3>
                                        <p className="text-gray-500 font-medium">₹ 899 + GST</p>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <button
                                            onClick={() => setFormData({ ...formData, adults: Math.max(0, formData.adults - 1) })}
                                            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-2xl hover:bg-gray-200 transition-colors text-gray-600"
                                        >
                                            -
                                        </button>
                                        <span className="text-2xl font-black w-8 text-center">{formData.adults}</span>
                                        <button
                                            onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                                            className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl hover:bg-primary-dark transition-colors shadow-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Little Ninjas (1-7 Years)</h3>
                                        <p className="text-gray-500 font-medium">₹ 500 + GST</p>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <button
                                            onClick={() => setFormData({ ...formData, kids: Math.max(0, formData.kids - 1) })}
                                            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-2xl hover:bg-gray-200 transition-colors text-gray-600"
                                        >
                                            -
                                        </button>
                                        <span className="text-2xl font-black w-8 text-center">{formData.kids}</span>
                                        <button
                                            onClick={() => setFormData({ ...formData, kids: formData.kids + 1 })}
                                            className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl hover:bg-primary-dark transition-colors shadow-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Spectators</h3>
                                        <p className="text-gray-500 font-medium">₹ 150 + GST</p>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <button
                                            onClick={() => setFormData({ ...formData, spectators: Math.max(0, formData.spectators - 1) })}
                                            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-2xl hover:bg-gray-200 transition-colors text-gray-600"
                                        >
                                            -
                                        </button>
                                        <span className="text-2xl font-black w-8 text-center">{formData.spectators}</span>
                                        <button
                                            onClick={() => setFormData({ ...formData, spectators: formData.spectators + 1 })}
                                            className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl hover:bg-primary-dark transition-colors shadow-lg"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-display font-black text-gray-900 flex items-center">
                                <FileText className="mr-4 text-primary h-8 w-8" /> Your Details
                            </h2>

                            <div className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none text-lg font-medium transition-all bg-gray-50 focus:bg-white"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none text-lg font-medium transition-all bg-gray-50 focus:bg-white"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-0 outline-none text-lg font-medium transition-all bg-gray-50 focus:bg-white"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div className="bg-yellow-50 p-8 rounded-2xl border border-yellow-200">
                                <label className="flex items-start cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer h-6 w-6 cursor-pointer appearance-none rounded border-2 border-gray-300 transition-all checked:border-primary checked:bg-primary"
                                            checked={formData.waiverAccepted}
                                            onChange={(e) => setFormData({ ...formData, waiverAccepted: e.target.checked })}
                                        />
                                        <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" size={16} />
                                    </div>
                                    <span className="ml-4 text-gray-700 font-medium leading-relaxed">
                                        I acknowledge that I have read and agree to the <a href="/safety" className="text-primary hover:underline font-bold">Safety Guidelines</a> and <a href="/terms" className="text-primary hover:underline font-bold">Waiver</a>. I understand the risks involved in participating in inflatable activities.
                                    </span>
                                </label>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-display font-black text-gray-900 flex items-center">
                                <CreditCard className="mr-4 text-primary h-8 w-8" /> Summary & Payment
                            </h2>

                            <div className="bg-gray-50 rounded-[2rem] p-8 space-y-6 border border-gray-100">
                                <div className="flex justify-between text-gray-600 text-lg">
                                    <span>Date & Time</span>
                                    <span className="font-bold text-gray-900">{formData.date} at {formData.time}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 text-lg">
                                    <span>Duration</span>
                                    <span className="font-bold text-gray-900">{formData.duration} Minutes</span>
                                </div>
                                <div className="border-t border-gray-200 pt-6 space-y-3">
                                    <div className="flex justify-between">
                                        <span>Ninja Warrior x {formData.adults}</span>
                                        <span className="font-medium">₹ {formData.adults * 899}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Little Ninjas x {formData.kids}</span>
                                        <span className="font-medium">₹ {formData.kids * 500}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Spectators x {formData.spectators}</span>
                                        <span className="font-medium">₹ {formData.spectators * 150}</span>
                                    </div>
                                    {formData.duration === "120" && (
                                        <div className="flex justify-between text-primary">
                                            <span>Extra Hour x {formData.adults + formData.kids}</span>
                                            <span className="font-medium">₹ {(formData.adults + formData.kids) * 500}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="border-t border-gray-200 pt-6">
                                    <div className="flex justify-between mb-2 text-gray-500">
                                        <span>Subtotal</span>
                                        <span>₹ {totals.subtotal}</span>
                                    </div>
                                    <div className="flex justify-between mb-4 text-gray-500">
                                        <span>GST (18%)</span>
                                        <span>₹ {Math.round(totals.gst)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                        <span className="text-2xl font-black text-gray-900">Total</span>
                                        <span className="text-4xl font-black text-primary">₹ {Math.round(totals.total)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-5 rounded-2xl shadow-xl transform transition-all hover:scale-[1.02] text-xl uppercase tracking-wide"
                                onClick={handlePayment}
                            >
                                Pay Now
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-12 flex justify-between">
                    {step > 1 && (
                        <button
                            onClick={prevStep}
                            className="px-8 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            Back
                        </button>
                    )}
                    {step < 4 && (
                        <button
                            onClick={nextStep}
                            className="ml-auto bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-full shadow-lg transition-colors uppercase tracking-wide"
                        >
                            Next Step
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
