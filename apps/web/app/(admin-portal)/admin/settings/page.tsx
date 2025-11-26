"use client";

import { useState } from "react";
import { Save, Upload, Lock, Bell, Shield, Globe, Power } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("business");

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">Manage your park configuration and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Settings Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <nav className="flex flex-col">
                            <SettingsTab
                                active={activeTab === "business"}
                                onClick={() => setActiveTab("business")}
                                icon={<Globe size={18} />}
                                label="Business Details"
                            />
                            <SettingsTab
                                active={activeTab === "media"}
                                onClick={() => setActiveTab("media")}
                                icon={<Upload size={18} />}
                                label="Media & Banners"
                            />
                            <SettingsTab
                                active={activeTab === "account"}
                                onClick={() => setActiveTab("account")}
                                icon={<Lock size={18} />}
                                label="Account & Security"
                            />
                            <SettingsTab
                                active={activeTab === "features"}
                                onClick={() => setActiveTab("features")}
                                icon={<Power size={18} />}
                                label="Feature Toggles"
                            />
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
                        {activeTab === "business" && <BusinessSettings />}
                        {activeTab === "media" && <MediaSettings />}
                        {activeTab === "account" && <AccountSettings />}
                        {activeTab === "features" && <FeatureSettings />}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingsTab({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-4 text-sm font-medium transition-colors text-left border-l-4 ${active
                ? "bg-slate-50 text-neon-blue border-neon-blue"
                : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
                }`}
        >
            {icon}
            {label}
        </button>
    );
}

function BusinessSettings() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Business Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Park Name" defaultValue="Ninja Inflatable Park" />
                <InputGroup label="Contact Phone" defaultValue="+91 98454 71611" />
                <InputGroup label="Contact Email" defaultValue="info@ninjapark.com" />
                <InputGroup label="GST Number" defaultValue="29AAAAA0000A1Z5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputGroup label="Session Duration (mins)" defaultValue="60" type="number" />
                <InputGroup label="Adult Price (₹)" defaultValue="899" type="number" />
                <InputGroup label="Child Price (₹)" defaultValue="500" type="number" />
            </div>
            <div className="pt-4">
                <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2">
                    <Save size={18} />
                    Save Changes
                </button>
            </div>
        </div>
    );
}

function MediaSettings() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Media & Banners</h2>

            <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">Homepage Hero Banner</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-neon-blue hover:bg-slate-50 transition-colors cursor-pointer">
                    <Upload className="mx-auto h-10 w-10 text-slate-400 mb-3" />
                    <p className="text-sm text-slate-600 font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">Attraction Gallery</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center relative group overflow-hidden">
                            <img src={`/images/gallery-${i > 2 ? 1 : i}.jpg`} alt="Gallery" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button className="text-white text-xs bg-red-500 px-2 py-1 rounded">Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="aspect-square border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center hover:border-neon-blue hover:bg-slate-50 cursor-pointer transition-colors">
                        <span className="text-2xl text-slate-400">+</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AccountSettings() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Account Security</h2>

            <div className="space-y-4 max-w-md">
                <InputGroup label="Current Password" type="password" placeholder="••••••••" />
                <InputGroup label="New Password" type="password" placeholder="••••••••" />
                <InputGroup label="Confirm New Password" type="password" placeholder="••••••••" />
            </div>

            <div className="pt-4">
                <button className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2">
                    <Shield size={18} />
                    Update Password
                </button>
            </div>
        </div>
    );
}

function FeatureSettings() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Feature Toggles</h2>

            <div className="space-y-4">
                <ToggleItem
                    title="Online Booking System"
                    description="Enable or disable the public booking flow."
                    enabled={true}
                />
                <ToggleItem
                    title="Party Bookings"
                    description="Allow customers to submit party inquiries."
                    enabled={true}
                />
                <ToggleItem
                    title="Maintenance Mode"
                    description="Show maintenance page to all visitors."
                    enabled={false}
                    danger
                />
                <ToggleItem
                    title="Waiver Requirement"
                    description="Force waiver signing before checkout."
                    enabled={true}
                />
            </div>
        </div>
    );
}

function InputGroup({ label, type = "text", defaultValue, placeholder }: { label: string; type?: string; defaultValue?: string; placeholder?: string }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <input
                type={type}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-neon-blue focus:border-transparent outline-none transition-all"
            />
        </div>
    );
}

function ToggleItem({ title, description, enabled, danger }: { title: string; description: string; enabled: boolean; danger?: boolean }) {
    const [isOn, setIsOn] = useState(enabled);

    return (
        <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <div>
                <h3 className={`font-medium ${danger ? "text-red-600" : "text-slate-900"}`}>{title}</h3>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
            <button
                onClick={() => setIsOn(!isOn)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 ${isOn ? (danger ? 'bg-red-500' : 'bg-green-500') : 'bg-slate-200'}`}
            >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );
}
