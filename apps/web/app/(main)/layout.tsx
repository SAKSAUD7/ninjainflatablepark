import type { Metadata } from "next";
import "../globals.css";
import { Footer, ToastProvider } from "@repo/ui";
import { Navbar } from "../../features/navigation/Navbar";

export const metadata: Metadata = {
    title: "Ninja Inflatable Park | India's Biggest Inflatable Park",
    description: "Experience the ultimate fun at Ninja Inflatable Park. Bounce, slide, and conquer the ultimate inflatable adventure!",
};

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ToastProvider>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </ToastProvider>
    );
}
