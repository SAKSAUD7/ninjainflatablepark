import type { Metadata } from "next";
import "../globals.css";
import { Footer, ToastProvider } from "@repo/ui";
import { Navbar } from "../../features/navigation/Navbar";

export const metadata: Metadata = {
    title: "Ninja Inflatable Park | India's Biggest Inflatable Park",
    description: "Experience the ultimate fun at Ninja Inflatable Park. Bounce, slide, and conquer the ultimate inflatable adventure!",
};

import { getGlobalSettings, getPublicSocialLinks } from "../../lib/public-api";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await getGlobalSettings();
    const socialLinks = await getPublicSocialLinks();

    return (
        <ToastProvider>
            <Navbar settings={settings} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer settings={settings} socialLinks={socialLinks} />
        </ToastProvider>
    );
}
