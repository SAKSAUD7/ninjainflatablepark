import { getAdminSession } from "../lib/admin-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    LayoutDashboard,
    CalendarDays,
    FileText,
    Users,
    LogOut,
    Settings,
    Menu,
    Bell
} from "lucide-react";
import { logoutAdmin } from "../actions/admin";
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

    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Admin Portal - Ninja Inflatable Park</title>
            </head>
            <body className="font-body antialiased bg-gray-100" suppressHydrationWarning>
                <div className="min-h-screen flex flex-col md:flex-row">
                    {/* Desktop Sidebar */}
                    <aside className="hidden md:flex w-64 bg-slate-900 text-white flex-col fixed h-full z-10 overflow-y-auto">
                        {/* Logo Header */}
                        <div className="p-6 border-b border-slate-800 bg-slate-950">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/ninja-logo.png"
                                    alt="Ninja Inflatable Park"
                                    width={32}
                                    height={32}
                                    className="rounded-lg"
                                    style={{ width: 'auto', height: '32px' }}
                                />
                                <div>
                                    <h1 className="text-lg font-bold text-white">NIP Admin</h1>
                                    <p className="text-xs text-slate-400">Admin Portal</p>
                                </div>
                            </div>
                        </div>

                        <nav className="flex-1 p-4 space-y-2">
                            <NavLink href="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                            <NavLink href="/admin/bookings" icon={<CalendarDays size={20} />} label="Bookings" />
                            <NavLink href="/admin/waivers" icon={<FileText size={20} />} label="Waivers" />
                            <NavLink href="/admin/customers" icon={<Users size={20} />} label="Customers" />
                            <div className="pt-4 mt-4 border-t border-slate-800">
                                <NavLink href="/admin/settings" icon={<Settings size={20} />} label="Settings" />
                            </div>
                        </nav>

                        <div className="p-4 border-t border-slate-800">
                            <div className="flex items-center gap-3 mb-4 px-2">
                                <div className="w-8 h-8 rounded-full bg-neon-blue flex items-center justify-center text-slate-900 font-bold">
                                    {((session as any)?.role?.[0] as string) || 'A'}
                                </div>
                                <div className="overflow-hidden flex-1">
                                    <p className="text-sm font-medium truncate">{(session as any)?.email as string}</p>
                                    <p className="text-xs text-slate-400">{(session as any)?.role as string}</p>
                                </div>
                                <button className="text-slate-400 hover:text-white transition-colors">
                                    <Bell size={16} />
                                </button>
                            </div>
                            <form action={logoutAdmin}>
                                <button type="submit" className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
                                    <LogOut size={18} />
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </aside>

                    {/* Mobile Header */}
                    <div className="md:hidden bg-slate-900 text-white sticky top-0 z-20">
                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/ninja-logo.png"
                                    alt="Ninja Inflatable Park"
                                    width={28}
                                    height={28}
                                    className="rounded"
                                    style={{ width: 'auto', height: '28px' }}
                                />
                                <span className="font-bold">NIP Admin</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="text-slate-400 hover:text-white">
                                    <Bell size={20} />
                                </button>
                                <button className="p-2 hover:bg-slate-800 rounded-lg">
                                    <Menu size={24} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 md:ml-64 min-h-screen bg-slate-50">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors font-medium"
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
}
