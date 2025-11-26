"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Ticket, Phone } from "lucide-react";
import { useUI } from "../../state/ui/uiContext";
import { BouncyButton } from "@repo/ui";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/attractions", label: "Attractions" },
    { href: "/parties", label: "Parties" },
    { href: "/pricing", label: "Pricing" },
    { href: "/guidelines", label: "Guidelines" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const { state, dispatch } = useUI();
    const { isMobileMenuOpen } = state;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo - Clean & Transparent */}
                <Link href="/" className="relative z-50 block">
                    <img
                        src="/logo_transparent.png"
                        alt="Ninja Inflatable Park"
                        className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
                        style={{ background: 'transparent' }}
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-white/80"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a
                        href="tel:+919876543210"
                        className="hidden lg:flex items-center gap-2 bg-[#2D1B4E] hover:bg-[#3D2B5E] px-4 py-2 rounded-lg transition-colors"
                    >
                        <Phone className="w-4 h-4 text-white" />
                        <span className="text-white font-semibold">98765 43210</span>
                    </a>
                    <Link href="/book">
                        <BouncyButton size="sm" variant="accent">
                            Book Now <Ticket className="w-4 h-4 ml-2" />
                        </BouncyButton>
                    </Link>
                    <Link href="/admin">
                        <BouncyButton size="sm" variant="outline" className="text-white border-white">
                            Admin
                        </BouncyButton>
                    </Link>
                </nav>

                {/* Mobile Header Actions */}
                <div className="md:hidden flex items-center gap-2 relative z-50">
                    <a
                        href="tel:+919876543210"
                        className="w-9 h-9 flex items-center justify-center bg-[#2D1B4E] hover:bg-[#3D2B5E] rounded-lg transition-colors"
                    >
                        <Phone className="w-4 h-4 text-white" />
                    </a>
                    <Link href="/book">
                        <BouncyButton size="sm" variant="accent" className="text-xs px-3 py-1.5">
                            Book
                        </BouncyButton>
                    </Link>
                    <button
                        className="text-white"
                        onClick={() => dispatch({ type: "TOGGLE_MOBILE_MENU" })}
                    >
                        {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute inset-0 top-20 h-screen bg-background border-t border-white/10 p-4 md:hidden"
                        >
                            <nav className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => dispatch({ type: "CLOSE_MOBILE_MENU" })}
                                        className={`text-2xl font-display font-bold ${pathname === link.href ? "text-primary" : "text-white"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <a href="tel:+919876543210" className="flex items-center justify-center gap-2 text-white hover:text-primary font-semibold transition-colors text-xl py-2">
                                    <Phone className="w-5 h-5" />
                                    <span>+91 98765 43210</span>
                                </a>
                                <div className="mt-4 space-y-3">
                                    <Link href="/book" onClick={() => dispatch({ type: "CLOSE_MOBILE_MENU" })}>
                                        <BouncyButton size="lg" variant="accent" className="w-full justify-center">
                                            Book Now
                                        </BouncyButton>
                                    </Link>
                                    <Link href="/admin" onClick={() => dispatch({ type: "CLOSE_MOBILE_MENU" })}>
                                        <BouncyButton size="lg" variant="outline" className="w-full justify-center text-white border-white">
                                            Admin
                                        </BouncyButton>
                                    </Link>
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
