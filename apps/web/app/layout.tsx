import type { Metadata } from "next";
import "./globals.css";
import { Navbar, Footer } from "@repo/ui";

export const metadata: Metadata = {
    title: "Ninja Inflatable Park | India's Biggest Inflatable Park",
    description: "Experience the ultimate fun at Ninja Inflatable Park. Bounce, slide, and conquer the ultimate inflatable adventure!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className="font-body antialiased flex flex-col min-h-screen bg-background">
                <Navbar />
                <main className="flex-grow pt-20">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
