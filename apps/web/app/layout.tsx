import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@repo/ui";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ["latin"],
    variable: "--font-poppins"
});

export const metadata: Metadata = {
    title: "Ninja Inflatable Park | India's Biggest Inflatable Park",
    description: "Experience the ultimate fun at Ninja Inflatable Park. Obstacle courses, giant slides, and more!",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <body className={`${inter.variable} ${poppins.variable} font-sans antialiased flex flex-col min-h-screen bg-background-light`}>
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
