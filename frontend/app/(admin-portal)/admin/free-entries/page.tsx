import { getFreeEntries, updateFreeEntryStatus, deleteFreeEntry } from "../../../actions/cms";
import { getAdminSession } from "../../../lib/admin-auth";
import { redirect } from "next/navigation";
import { Mail, Phone, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { FreeEntryActions } from "../components/FreeEntryActions";

export default async function FreeEntriesPage() {
    const session = await getAdminSession();
    if (!session) redirect("/admin/login");

    const entries = await getFreeEntries();

    const stats = {
        total: entries.length,
        pending: entries.filter(e => e.status === "PENDING").length,
        approved: entries.filter(e => e.status === "APPROVED").length,
        rejected: entries.filter(e => e.status === "REJECTED").length
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Free Entry Submissions</h1>
                <p className="text-slate-500 mt-1">Manage free entry requests from customers</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Requests</p>
                            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Pending</p>
                            <p className="text-2xl font-bold text-slate-900">{stats.pending}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Approved</p>
                            <p className="text-2xl font-bold text-slate-900">{stats.approved}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                            <XCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Rejected</p>
                            <p className="text-2xl font-bold text-slate-900">{stats.rejected}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Entries Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Applicant</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Reason</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {entries.map((entry) => (
                            <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-bold text-slate-900">{entry.name}</p>
                                        <p className="text-sm text-slate-500 flex items-center gap-1">
                                            <Mail size={14} />
                                            {entry.email}
                                        </p>
                                        {entry.phone && (
                                            <p className="text-sm text-slate-500 flex items-center gap-1">
                                                <Phone size={14} />
                                                {entry.phone}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-slate-700 max-w-md">{entry.reason}</p>
                                    {entry.notes && (
                                        <p className="text-xs text-slate-500 mt-1 italic">Note: {entry.notes}</p>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {entry.status === "PENDING" && (
                                        <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                                            Pending
                                        </span>
                                    )}
                                    {entry.status === "APPROVED" && (
                                        <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                            Approved
                                        </span>
                                    )}
                                    {entry.status === "REJECTED" && (
                                        <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                                            Rejected
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} className="text-slate-400" />
                                        {new Date(entry.createdAt).toLocaleDateString()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <FreeEntryActions entry={entry} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
