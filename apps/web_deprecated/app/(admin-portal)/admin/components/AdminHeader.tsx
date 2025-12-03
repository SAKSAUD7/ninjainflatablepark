"use client";

import { Bell, Search, User } from "lucide-react";
import { useState } from "react";

interface AdminHeaderProps {
    title?: string;
    user?: {
        name: string;
        email: string;
        role: string;
    };
}

export function AdminHeader({ title, user }: AdminHeaderProps) {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Page Title */}
                    <div>
                        {title && (
                            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                        )}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="hidden md:block relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 w-64 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {showNotifications && (
                                <>
                                    <div
                                        onClick={() => setShowNotifications(false)}
                                        className="fixed inset-0 z-10"
                                    />
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-20">
                                        <div className="p-4 border-b border-slate-200">
                                            <h3 className="font-bold text-slate-900">Notifications</h3>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            <div className="p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-100">
                                                <p className="text-sm font-medium text-slate-900">New booking received</p>
                                                <p className="text-xs text-slate-500 mt-1">2 minutes ago</p>
                                            </div>
                                            <div className="p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-100">
                                                <p className="text-sm font-medium text-slate-900">Waiver pending approval</p>
                                                <p className="text-xs text-slate-500 mt-1">15 minutes ago</p>
                                            </div>
                                            <div className="p-4 hover:bg-slate-50 cursor-pointer">
                                                <p className="text-sm font-medium text-slate-900">Low inventory alert</p>
                                                <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                                            </div>
                                        </div>
                                        <div className="p-3 border-t border-slate-200 text-center">
                                            <button className="text-sm font-medium text-primary hover:underline">
                                                View all notifications
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-medium text-slate-900">{user?.name || "Admin User"}</p>
                                <p className="text-xs text-slate-500">{user?.role || "Administrator"}</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                                {user?.name?.charAt(0) || "A"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
