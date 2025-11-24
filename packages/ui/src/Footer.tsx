import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

            <div className="container-custom pt-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                                <img src="/logo.png" alt="Ninja Park" className="w-8 h-8 object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-display font-black text-white leading-none">
                                    NINJA
                                </span>
                                <span className="text-xs font-bold text-accent uppercase tracking-wider">
                                    Inflatable Park
                                </span>
                            </div>
                        </div>
                        <p className="text-neutral-400 mb-6 leading-relaxed">
                            India's biggest inflatable adventure park. Experience the thrill of jumping, sliding, and bouncing in a safe and fun environment.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors group">
                                <Facebook size={18} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center hover:bg-accent transition-colors group">
                                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center hover:bg-primary transition-colors group">
                                <Twitter size={18} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center hover:bg-accent transition-colors group">
                                <Youtube size={18} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Attractions", href: "/attractions" },
                                { name: "Pricing", href: "/pricing" },
                                { name: "Parties", href: "/parties" },
                                { name: "About Us", href: "/about" },
                                { name: "FAQ", href: "/faq" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-neutral-400 hover:text-accent transition-colors flex items-center group">
                                        <span className="w-0 h-0.5 bg-accent group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Opening Hours</h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Clock className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white font-bold mb-1">Tuesday - Sunday</p>
                                    <p className="text-neutral-400 text-sm">12:00 PM - 9:00 PM</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Clock className="w-5 h-5 text-neutral-600 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-neutral-500 font-bold mb-1">Monday</p>
                                    <p className="text-neutral-600 text-sm">Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start group">
                                <MapPin className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                                <span className="text-neutral-400 text-sm leading-relaxed">
                                    No. 35/11, Hennur Bagalur Main Road, Chagalatti Village, Karnataka 562149
                                </span>
                            </li>
                            <li className="flex items-center group">
                                <Phone className="w-5 h-5 text-accent mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="tel:+919845471611" className="text-neutral-400 hover:text-white transition-colors">
                                    +91 98454 71611
                                </a>
                            </li>
                            <li className="flex items-center group">
                                <Mail className="w-5 h-5 text-accent mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="mailto:info@ninjainflatablepark.com" className="text-neutral-400 hover:text-white transition-colors text-sm">
                                    info@ninjainflatablepark.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-neutral-500 text-sm">
                        &copy; {new Date().getFullYear()} Ninja Inflatable Park. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm">
                        <a href="/privacy" className="text-neutral-500 hover:text-accent transition-colors">Privacy Policy</a>
                        <a href="/terms" className="text-neutral-500 hover:text-accent transition-colors">Terms of Service</a>
                        <a href="/safety" className="text-neutral-500 hover:text-accent transition-colors">Safety Guidelines</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
