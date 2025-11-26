"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Ticket } from "lucide-react";
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
                {/* Logo */}
                <Link href="/" className="relative z-50">
                    <span className="text-2xl font-display font-black text-white">
                        NINJA<span className="text-primary">PARK</span>
                    </span>
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

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden relative z-50 text-white"
                    onClick={() => dispatch({ type: "TOGGLE_MOBILE_MENU" })}
                >
                    {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>

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
