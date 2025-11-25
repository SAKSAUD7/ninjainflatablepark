import { prisma } from "@repo/database";
import { User, Shield, Lock } from "lucide-react";

export default async function SettingsPage() {
    const admins = await prisma.adminUser.findMany();

    return (
        <div className="p-8 w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                    <p className="text-gray-500">Manage admin users and system preferences</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Admin Users</h2>
                        <div className="space-y-4">
                            {admins.map((admin: any) => (
                                <div key={admin.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-white p-2 rounded-full shadow-sm">
                                            <User size={20} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{admin.name}</div>
                                            <div className="text-xs text-gray-500">{admin.email}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{admin.role}</span>
                                        <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-300 transition-colors">
                                + Add New Admin
                            </button>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Security</h2>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                                <div className="flex items-center space-x-3">
                                    <Lock size={18} className="text-gray-500" />
                                    <span className="text-gray-700 font-medium">Change Password</span>
                                </div>
                            </button>
                            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors text-left">
                                <div className="flex items-center space-x-3">
                                    <Shield size={18} className="text-gray-500" />
                                    <span className="text-gray-700 font-medium">Two-Factor Auth</span>
                                </div>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
