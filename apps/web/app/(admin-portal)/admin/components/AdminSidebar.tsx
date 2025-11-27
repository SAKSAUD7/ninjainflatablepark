"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    LayoutDashboard,
    Calendar,
    PartyPopper,
    Users,
    FileSignature,
    Clock,
    CalendarDays,
    CalendarX,
    Ticket,
    Gift,
    Zap,
    Image,
    HelpCircle,
    Mail,
    FileText,
    Globe,
    MessageSquare,
    Star,
    ShoppingBag,
    User,
    ExternalLink,
    LogOut,
    ChevronDown,
    ChevronRight,
    Menu,
    X
} from "lucide-react";

interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
}

interface NavGroup {
    name: string;
    items: NavItem[];
}

const navigation: NavGroup[] = [
    {
        name: "Overview",
        items: [
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        ]
    },
    {
        name: "Booking Management",
        items: [
            { name: "Booking Blocks", href: "/admin/booking-blocks", icon: Calendar },
            { name: "Party Bookings", href: "/admin/party-bookings", icon: PartyPopper },
            { name: "Manual Party Booking", href: "/admin/party-bookings/new", icon: PartyPopper },
            { name: "Party Booking History", href: "/admin/party-bookings/history", icon: Clock },
            { name: "Session Bookings", href: "/admin/session-bookings", icon: Users },
            { name: "Manual Session Booking", href: "/admin/session-bookings/new", icon: Users },
            { name: "Session Booking History", href: "/admin/session-bookings/history", icon: Clock },
        ]
    },
    {
        name: "Waivers & Entries",
        items: [
            { name: "Waiver Submissions", href: "/admin/waivers", icon: FileSignature },
            { name: "Free Entry Submissions", href: "/admin/free-entries", icon: Gift },
        ]
    },
    {
        name: "Calendar & Availability",
        items: [
            { name: "Holiday Open Dates", href: "/admin/holidays/open", icon: CalendarDays },
            { name: "Holiday Closed Dates", href: "/admin/holidays/closed", icon: CalendarX },
        ]
    },
    {
        name: "Promotions",
        items: [
            { name: "Vouchers", href: "/admin/vouchers", icon: Ticket },
        ]
    },
    {
        name: "Content Management",
        items: [
            { name: "Activities", href: "/admin/activities", icon: Zap },
            { name: "Banners", href: "/admin/banners", icon: Image },
            { name: "FAQ's", href: "/admin/faqs", icon: HelpCircle },
            { name: "Invitation Templates", href: "/admin/invitation-templates", icon: Mail },
            { name: "Misc Contents", href: "/admin/misc-content", icon: FileText },
            { name: "Static Pages", href: "/admin/static-pages", icon: Globe },
            { name: "Social Media", href: "/admin/social-media", icon: MessageSquare },
            { name: "Testimonies", href: "/admin/testimonies", icon: Star },
        ]
    },
    {
        name: "E-commerce",
        items: [
            { name: "Shop", href: "/admin/shop", icon: ShoppingBag },
        ]
    },
];

const userMenu: NavItem[] = [
    { name: "My Profile", href: "/admin/profile", icon: User },
    { name: "View Site", href: "/", icon: ExternalLink },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState<string[]>(["Overview", "Booking Management"]);

    const toggleGroup = (groupName: string) => {
        setExpandedGroups(prev =>
            prev.includes(groupName)
                ? prev.filter(g => g !== groupName)
                : [...prev, groupName]
        );
    };

    const isActive = (href: string) => {
        if (href === "/admin") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-slate-200">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                        <LayoutDashboard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Ninja Admin</h1>
                        <p className="text-xs text-slate-500">Management Portal</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navigation.map((group) => (
                    <div key={group.name} className="mb-4">
                        <button
                            onClick={() => toggleGroup(group.name)}
                            className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-slate-700 transition-colors"
                        >
                            <span>{group.name}</span>
                            {expandedGroups.includes(group.name) ? (
                                <ChevronDown className="w-4 h-4" />
                            ) : (
                                <ChevronRight className="w-4 h-4" />
                            )}
                        </button>

                        {expandedGroups.includes(group.name) && (
                            <div className="mt-1 space-y-1">
                                {group.items.map((item) => {
                                    const active = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${active
                                                    ? "bg-primary text-white shadow-sm"
                                                    : "text-slate-700 hover:bg-slate-100"
                                                }`}
                                        >
                                            <item.icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-400"}`} />
                                            <span className="flex-1">{item.name}</span>
                                            {item.badge && (
                                                <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* User Menu */}
            <div className="p-4 border-t border-slate-200 space-y-1">
                {userMenu.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        target={item.name === "View Site" ? "_blank" : undefined}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                        <item.icon className="w-5 h-5 text-slate-400" />
                        <span>{item.name}</span>
                    </Link>
                ))}
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-slate-200"
            >
                {isMobileOpen ? (
                    <X className="w-6 h-6 text-slate-700" />
                ) : (
                    <Menu className="w-6 h-6 text-slate-700" />
                )}
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    onClick={() => setIsMobileOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                />
            )}

            {/* Sidebar - Mobile */}
            <aside
                className={`lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <SidebarContent />
            </aside>

            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-slate-200 z-30">
                <SidebarContent />
            </aside>
        </>
    );
}
