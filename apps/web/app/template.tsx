'use client';

import { usePathname } from 'next/navigation';
import { Navbar, Footer, ToastProvider } from "@repo/ui";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    // For admin routes, render children without Navbar/Footer
    if (isAdminRoute) {
        return <>{children}</>;
    }

    // For main website routes, wrap with Navbar/Footer
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
