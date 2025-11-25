import type { Metadata } from "next";
import { Inter } from "next/font/google";
<<<<<<< HEAD
import { Sidebar } from "../components/Sidebar";
=======
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ninja Park Admin",
    description: "Admin Dashboard",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
<<<<<<< HEAD
            <body className={inter.className}>
                <div className="min-h-screen bg-gray-100 flex">
                    <Sidebar />
                    {children}
                </div>
            </body>
=======
            <body className={inter.className}>{children}</body>
>>>>>>> ae298bdb839d28f6b8769d78d13513cb682514bb
        </html>
    );
}
