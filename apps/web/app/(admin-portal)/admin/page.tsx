import { getDashboardStats } from "../../actions/admin";
import { getAdminSession } from "../../lib/admin-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    Users,
    CalendarCheck,
    DollarSign,
    FileSignature,
    TrendingUp,
    AlertCircle,
    Clock,
    CheckCircle,
    XCircle,
    ArrowRight
} from "lucide-react";

export default async function AdminDashboard() {
    const session = await getAdminSession() as { email: string; role: string } | null;
    if (!session) {
        redirect("/admin/login");
    }

    const stats = await getDashboardStats();

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Welcome back, {session.email}</p>
                </div>
                <div className="flex gap-3">
                    <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-neon-blue focus:border-neon-blue block p-2.5 outline-none">
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                    </select>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue.toLocaleString()}`}
                    icon={<DollarSign className="text-emerald-600" />}
                    trend="+12.5%"
                    trendUp={true}
                    color="emerald"
                />
                <StatCard
                    title="Bookings"
                    value={stats.bookingsToday.toString()}
                    icon={<CalendarCheck className="text-blue-600" />}
                    trend="+4"
                    trendUp={true}
                    color="blue"
                />
                <StatCard
                    title="Active Customers"
                    value={stats.totalBookings.toString()} // Using total bookings as proxy for now
                    icon={<Users className="text-violet-600" />}
                    trend="+18%"
                    trendUp={true}
                    color="violet"
                />
                <StatCard
                    title="Pending Waivers"
                    value={stats.pendingWaivers.toString()}
                    icon={<FileSignature className="text-amber-600" />}
                    trend="Action Needed"
                    trendUp={false}
                    color="amber"
                    alert={stats.pendingWaivers > 0}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Revenue Chart Placeholder */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <TrendingUp size={20} className="text-slate-400" />
                            Revenue Overview
                        </h2>
                        <button className="text-sm text-neon-blue font-medium hover:underline">View Report</button>
                    </div>
                    <div className="h-64 bg-slate-50 rounded-lg border border-dashed border-slate-300 flex items-center justify-center relative overflow-hidden group">
                        <div className="text-center">
                            <TrendingUp size={48} className="text-slate-300 mx-auto mb-2" />
                            <p className="text-slate-400 font-medium">Revenue Chart Visualization</p>
                            <p className="text-xs text-slate-400 mt-1">(Data visualization placeholder)</p>
                        </div>
                        {/* Mock Chart Lines */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-between px-4 opacity-30 gap-2">
                            {[40, 60, 45, 70, 50, 80, 65, 85, 75, 90, 60, 95].map((h, i) => (
                                <div key={i} style={{ height: `${h}%` }} className="w-full bg-neon-blue rounded-t-sm" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Alerts / Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <AlertCircle size={20} className="text-slate-400" />
                        System Status
                    </h2>
                    <div className="space-y-4">
                        {stats.pendingWaivers > 0 ? (
                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                                <div className="p-2 bg-amber-100 rounded-lg shrink-0">
                                    <FileSignature size={18} className="text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-amber-900">{stats.pendingWaivers} Waivers Pending</p>
                                    <p className="text-xs text-amber-700 mt-1">Guests arriving soon need to sign waivers.</p>
                                    <Link href="/admin/waivers" className="text-xs font-bold text-amber-800 mt-2 inline-block hover:underline">
                                        Review Waivers →
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                                    <CheckCircle size={18} className="text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-emerald-900">All Waivers Signed</p>
                                    <p className="text-xs text-emerald-700 mt-1">No pending actions required.</p>
                                </div>
                            </div>
                        )}

                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                                <CalendarCheck size={18} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-blue-900">{stats.bookingsToday} Bookings Today</p>
                                <p className="text-xs text-blue-700 mt-1">Check staff availability for peak hours.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-900">Recent Bookings</h2>
                    <Link href="/admin/bookings" className="text-sm font-medium text-neon-blue hover:text-blue-700 flex items-center gap-1 transition-colors">
                        View All Bookings <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {stats.recentBookings.map((booking: any) => (
                                <tr key={booking.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                                                {booking.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{booking.name}</p>
                                                <p className="text-xs text-slate-500">{booking.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Clock size={14} className="text-slate-400" />
                                            {booking.date} • {booking.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900">
                                        ₹{booking.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={booking.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/bookings/${booking.id}`} className="text-slate-400 hover:text-neon-blue transition-colors">
                                            <ArrowRight size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, trend, trendUp, color, alert }: { title: string; value: string; icon: React.ReactNode; trend: string; trendUp: boolean; color: string; alert?: boolean }) {
    return (
        <div className={`bg-white rounded-xl p-6 shadow-sm border transition-all hover:shadow-md ${alert ? 'border-amber-200 ring-1 ring-amber-100' : 'border-slate-200'}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
                </div>
                <div className={`p-2.5 rounded-lg bg-${color}-50`}>
                    {icon}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${trendUp ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                    {trend}
                </span>
                <span className="text-xs text-slate-400">vs last month</span>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        CONFIRMED: "bg-emerald-100 text-emerald-700 border-emerald-200",
        PENDING: "bg-amber-100 text-amber-700 border-amber-200",
        CANCELLED: "bg-red-100 text-red-700 border-red-200",
        COMPLETED: "bg-blue-100 text-blue-700 border-blue-200",
    };

    const defaultStyle = "bg-slate-100 text-slate-700 border-slate-200";

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status] || defaultStyle} inline-flex items-center gap-1`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status === 'CONFIRMED' ? 'bg-emerald-500' : status === 'PENDING' ? 'bg-amber-500' : 'bg-slate-400'}`} />
            {status}
        </span>
    );
}
