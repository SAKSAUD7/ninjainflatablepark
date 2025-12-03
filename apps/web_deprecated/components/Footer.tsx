export function Footer({ settings, socialLinks }: { settings?: any; socialLinks?: any[] }) {
    const currentYear = new Date().getFullYear();
    const parkName = settings?.parkName || "Ninja Inflatable Park";
    const phone = settings?.contactPhone || "+91 98454 71611";
    const email = settings?.contactEmail || "info@ninjapark.com";

    return (
        <footer className="bg-black border-t border-white/10 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-3">{parkName}</h3>
                        <div className="space-y-2 text-white/70 text-sm">
                            <p>Phone: <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{phone}</a></p>
                            <p>Email: <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a></p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-3">Quick Links</h3>
                        <div className="space-y-2 text-white/70 text-sm">
                            <a href="/attractions" className="block hover:text-white transition-colors">Attractions</a>
                            <a href="/parties" className="block hover:text-white transition-colors">Parties</a>
                            <a href="/pricing" className="block hover:text-white transition-colors">Pricing</a>
                            <a href="/contact" className="block hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>

                    {/* Social Links */}
                    {socialLinks && socialLinks.length > 0 && (
                        <div>
                            <h3 className="text-white font-bold text-lg mb-3">Follow Us</h3>
                            <div className="flex gap-3">
                                {socialLinks.map((link: any) => (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                        aria-label={link.platform}
                                    >
                                        <span className="text-white text-sm">{link.platform[0]}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 pt-6 text-center text-white/50 text-sm">
                    <p>&copy; {currentYear} {parkName}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
