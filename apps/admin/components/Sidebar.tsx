"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileSignature,
    MessageSquare,
    Settings
} from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Inquiries", href: "/contact", icon: MessageSquare },
    { name: "Waivers", href: "/waivers", icon: FileSignature },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-gray-900 text-white p-6 fixed h-full overflow-y-auto">
            <div className="flex items-center space-x-2 mb-10">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-black">N</span>
                </div>
                <span className="text-xl font-bold">Admin Panel</span>
            </div>

            <nav className="space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "bg-primary text-white bg-blue-600" : "text-gray-400 hover:bg-gray-800"
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
