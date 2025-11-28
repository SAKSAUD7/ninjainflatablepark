"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Ticket, Phone } from "lucide-react";
import { useUI } from "../../state/ui/uiContext";
import { BouncyButton } from "@repo/ui";
import { useEffect } from "react";

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

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            window.history.pushState({ menuOpen: true }, "", window.location.href);

            const handlePopState = () => {
                dispatch({ type: "CLOSE_MOBILE_MENU" });
            };

            window.addEventListener("popstate", handlePopState);

            return () => {
                document.body.style.overflow = '';
                window.removeEventListener("popstate", handlePopState);
            };
        }
    }, [isMobileMenuOpen, dispatch]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="relative z-50 block">
                    <img
                        src="/logo_transparent.png"
                        alt="Ninja Inflatable Park"
                        className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
                        style={{ background: 'transparent' }}
                    />
                </Link>


                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-white/80"}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a href="tel:+919845471611" className="hidden xl:flex items-center gap-2 bg-[#2D1B4E] hover:bg-[#3D2B5E] px-4 py-2 rounded-lg transition-colors">
                        <Phone className="w-4 h-4 text-white" />
                        <span className="text-white font-semibold">98454 71611</span>
                    </a>
                    <Link href="/book">
                        <BouncyButton size="sm" variant="accent" as="div">
                            Book Now <Ticket className="w-4 h-4 ml-2" />
                        </BouncyButton>
                    </Link>
                    <Link href="/admin">
                        <BouncyButton size="sm" variant="outline" className="text-white border-white" as="div">
                            Admin
                        </BouncyButton>
                    </Link>
                </nav>

                <div className="lg:hidden flex items-center gap-2 relative z-50">
                    <a href="tel:+919845471611" className="w-9 h-9 flex items-center justify-center bg-[#2D1B4E] hover:bg-[#3D2B5E] rounded-lg transition-colors">
                        <Phone className="w-4 h-4 text-white" />
                    </a>
                    <Link href="/book">
                        <BouncyButton size="sm" variant="accent" className="text-xs px-3 py-1.5" as="div">
                            Book
                        </BouncyButton>
                    </Link>
                    <button className="text-white" onClick={() => dispatch({ type: "TOGGLE_MOBILE_MENU" })}>
                        {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => dispatch({ type: "CLOSE_MOBILE_MENU" })}
                                className="fixed inset-0 bg-black/90 z-[60] lg:hidden"
                            />

                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="fixed top-0 bottom-0 right-0 w-[280px] lg:hidden z-[70] flex flex-col shadow-2xl"
                                style={{
                                    background: 'linear-gradient(180deg, #1a0b2e 0%, #0f0519 50%, #000000 100%)'
                                }}
                            >
                                <div className="flex items-center justify-between px-4 py-4 border-b border-purple-900/30">
                                    <img src="/logo_transparent.png" alt="Ninja" className="h-8 w-auto" />
                                    <button
                                        onClick={() => dispatch({ type: "CLOSE_MOBILE_MENU" })}
                                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto px-3 py-4">
                                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 mb-3 border border-white/10">
                                        <nav className="space-y-0.5">
                                            {navLinks.map((link) => {
                                                const isActive = pathname === link.href;
                                                return (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        onClick={() => dispatch({ type: "CLOSE_MOBILE_MENU" })}
                                                        className={`flex items-center justify-between px-3 py-2.5 rounded-md transition-all duration-200 ${isActive
                                                            ? "bg-primary/30 text-white shadow-lg shadow-primary/20"
                                                            : "text-white/90 hover:bg-white/10"
                                                            }`}
                                                    >
                                                        <span className="text-sm font-medium">{link.label}</span>
                                                        {isActive && <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />}
                                                    </Link>
                                                );
                                            })}
                                        </nav>
                                    </div>

                                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 mb-3 border border-white/10">
                                        <a
                                            href="tel:+919845471611"
                                            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                                                <Phone className="w-4 h-4 text-primary" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] text-white/60 font-medium uppercase tracking-wide">Call Us</p>
                                                <p className="text-sm text-white font-semibold">+91 98454 71611</p>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="space-y-2">
                                        <Link href="/book" onClick={() => dispatch({ type: "CLOSE_MOBILE_MENU" })} className="block">
                                            <BouncyButton size="md" variant="accent" className="w-full justify-center text-sm py-2.5" as="div">
                                                Book Now
                                            </BouncyButton>
                                        </Link>
                                        <Link href="/admin" onClick={() => dispatch({ type: "CLOSE_MOBILE_MENU" })} className="block">
                                            <BouncyButton size="md" variant="outline" className="w-full justify-center text-white border-white/30 hover:bg-white/10 text-sm py-2.5" as="div">
                                                Admin Portal
                                            </BouncyButton>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
