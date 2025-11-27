import { getAdminSession } from "../lib/admin-auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./admin/components/AdminSidebar";
import { AdminHeader } from "./admin/components/AdminHeader";
import "../globals.css";

export default async function AdminPortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getAdminSession();
    const isAuthenticated = !!session;

    // If not authenticated, render login page without sidebar
    if (!isAuthenticated) {
        return (
            <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Admin Login - Ninja Inflatable Park</title>
                </head>
                <body className="font-body antialiased bg-gray-100" suppressHydrationWarning>
                    {children}
                </body>
            </html>
        );
    }

    const user = {
        name: (session as any)?.email?.split('@')[0] || "Admin",
        email: (session as any)?.email as string,
        role: (session as any)?.role as string || "Administrator",
    };

    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Admin Portal - Ninja Inflatable Park</title>
            </head>
            <body className="font-body antialiased bg-slate-50" suppressHydrationWarning>
                <div className="min-h-screen">
                    {/* Sidebar */}
                    <AdminSidebar />

                    {/* Main Content Area */}
                    <div className="lg:pl-72">
                        {/* Header */}
                        <AdminHeader user={user} />

                        {/* Page Content */}
                        <main className="p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
