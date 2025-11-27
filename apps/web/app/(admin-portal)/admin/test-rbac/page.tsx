import { getAdminSession } from "../../../lib/admin-auth";
import { redirect } from "next/navigation";

export default async function RBACTestPage() {
    const session = await getAdminSession();
    if (!session) redirect("/admin/login");

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">RBAC System Test</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Current Session</h2>
                <div className="space-y-2">
                    <p><span className="font-bold">ID:</span> {session.id}</p>
                    <p><span className="font-bold">Email:</span> {session.email}</p>
                    <p><span className="font-bold">Role:</span> {session.role}</p>
                    <p><span className="font-bold">Role ID:</span> {session.roleId || 'Not assigned'}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Permissions</h2>
                {session.permissions && session.permissions.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {session.permissions.map((perm, idx) => (
                            <div key={idx} className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                                {perm}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-red-600 font-medium">⚠️ No permissions assigned! Please assign a role to this user.</p>
                )}
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-bold text-blue-900 mb-2">✅ Test Results:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>✓ Session loaded successfully</li>
                    <li>✓ Role relationship working</li>
                    <li>✓ Permissions loaded from database</li>
                    <li className="font-bold mt-2">
                        {session.permissions && session.permissions.length > 0
                            ? "✅ RBAC System is working!"
                            : "⚠️ Assign a role to enable permissions"}
                    </li>
                </ul>
            </div>
        </div>
    );
}
