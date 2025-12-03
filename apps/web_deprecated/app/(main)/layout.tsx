"use client";

import { useEffect, useState } from "react";
import { Navbar } from "../../features/navigation/Navbar";
import { Footer } from "../../components/Footer";
import { ToastProvider } from "../../components/ToastProvider";

export default function ClientMainLayout({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);
    const [settings, setSettings] = useState<any>({
        parkName: "Ninja Inflatable Park",
        contactPhone: "+91 98454 71611",
        contactEmail: "info@ninjapark.com",
    });
    const [socialLinks, setSocialLinks] = useState<any[]>([]);

    useEffect(() => {
        setIsMounted(true);

        async function loadSettings() {
            try {
                const API_URL = 'http://localhost:8000/api/v1';

                const [settingsRes, linksRes] = await Promise.all([
                    fetch(`${API_URL}/core/settings/`, { cache: 'no-store' }),
                    fetch(`${API_URL}/cms/social-links/`, { cache: 'no-store' })
                ]);

                if (settingsRes.ok) {
                    const settingsData = await settingsRes.json();
                    if (settingsData.length > 0) {
                        const s = settingsData[0];
                        setSettings({
                            parkName: s.park_name || "Ninja Inflatable Park",
                            contactPhone: s.contact_phone || "+91 98454 71611",
                            contactEmail: s.contact_email || "info@ninjapark.com",
                            address: s.address || "",
                            mapUrl: s.map_url || "",
                            openingHours: s.opening_hours || {},
                        });
                    }
                }

                if (linksRes.ok) {
                    const linksData = await linksRes.json();
                    setSocialLinks(linksData.filter((l: any) => l.active));
                }
            } catch (error) {
                console.error("Failed to load settings:", error);
            }
        }

        loadSettings();
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <ToastProvider>
            <div suppressHydrationWarning>
                <Navbar settings={settings} />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer settings={settings} socialLinks={socialLinks} />
            </div>
        </ToastProvider>
    );
}
