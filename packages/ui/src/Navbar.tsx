"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Attractions", href: "/attractions" },
        { name: "Pricing", href: "/pricing" },
        { name: "Parties", href: "/parties" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white shadow-medium py-3"
                : "bg-white/95 backdrop-blur-md py-4"
                }`}
        >
            <div className="container-custom">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <a href="/" className="flex items-center space-x-2 group">
                        <div className="relative">
                            <img
                                src="/ninja-logo.png"
                                alt="Ninja Inflatable Park"
                                className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="relative font-bold text-sm text-neutral-700 hover:text-primary transition-colors group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}

                        {/* Contact Info */}
                        <div className="flex items-center space-x-4 pl-4 border-l-2 border-neutral-200">
                            <a href="tel:+919845471611" className="flex items-center space-x-2 text-neutral-700 hover:text-primary transition-colors">
                                <Phone className="w-4 h-4" />
                                <span className="font-bold text-sm">98454 71611</span>
                            </a>
                        </div>

                        {/* Book Now Button */}
                        <a
                            href="/book"
                            className="btn btn-accent shadow-soft"
                        >
                            Book Now
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-4">
                        <a href="tel:+919845471611" className="text-primary">
                            <Phone className="w-5 h-5" />
                        </a>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-xl hover:bg-neutral-100 transition-colors"
                        >
                            {isOpen ? <X size={24} className="text-neutral-700" /> : <Menu size={24} className="text-neutral-700" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-neutral-100 overflow-hidden"
                    >
                        <div className="container-custom py-6 space-y-2">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="block px-4 py-3 text-base font-bold text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-xl transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <div className="pt-4">
                                <a
                                    href="/book"
                                    className="block w-full text-center btn btn-accent"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Book Your Session
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
