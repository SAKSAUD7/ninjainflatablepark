import { getTestimonials } from "../../../actions/testimonials";
import { Plus, Edit, Star } from "lucide-react";
import Link from "next/link";
import { PermissionGate } from "../../../../components/PermissionGate";

export default async function TestimonialsPage() {
    const testimonials = await getTestimonials();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
                    <p className="text-slate-500">Manage customer reviews and testimonials</p>
                </div>
                <PermissionGate permission="cms:write">
                    <Link
                        href="/admin/testimonials/new"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        New Testimonial
                    </Link>
                </PermissionGate>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 font-medium text-slate-500">Rating</th>
                            <th className="px-6 py-3 font-medium text-slate-500">Name</th>
                            <th className="px-6 py-3 font-medium text-slate-500">Role</th>
                            <th className="px-6 py-3 font-medium text-slate-500">Content</th>
                            <th className="px-6 py-3 font-medium text-slate-500">Status</th>
                            <th className="px-6 py-3 font-medium text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {testimonials.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    No testimonials found. Create one to get started.
                                </td>
                            </tr>
                        ) : (
                            testimonials.map((testimonial) => (
                                <tr key={testimonial.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? "fill-current" : "text-slate-200"}`} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        <div className="flex items-center gap-3">
                                            {testimonial.imageUrl && (
                                                <img src={testimonial.imageUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                                            )}
                                            {testimonial.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{testimonial.role || "-"}</td>
                                    <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{testimonial.content}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${testimonial.active
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-slate-100 text-slate-600"
                                            }`}>
                                            {testimonial.active ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <PermissionGate permission="cms:write">
                                            <Link
                                                href={`/admin/testimonials/${testimonial.id}`}
                                                className="inline-flex p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                        </PermissionGate>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
