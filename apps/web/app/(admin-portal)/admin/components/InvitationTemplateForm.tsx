"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, Trash, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createInvitationTemplate, updateInvitationTemplate, deleteInvitationTemplate } from "../../../actions/invitation-templates";

const templateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    imageUrl: z.string().min(1, "Image URL is required"),
    active: z.boolean(),
});

type TemplateFormData = z.infer<typeof templateSchema>;

interface InvitationTemplateFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function InvitationTemplateForm({ initialData, isEditing = false }: InvitationTemplateFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const form = useForm<TemplateFormData>({
        resolver: zodResolver(templateSchema),
        defaultValues: initialData || {
            name: "",
            imageUrl: "",
            active: true,
        },
    });

    const onSubmit = async (data: TemplateFormData) => {
        setIsSubmitting(true);
        setError("");

        try {
            if (isEditing && initialData?.id) {
                await updateInvitationTemplate(initialData.id, data);
            } else {
                await createInvitationTemplate(data);
            }
            router.push("/admin/invitation-templates");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onDelete = async () => {
        if (!confirm("Are you sure you want to delete this template?")) return;

        setIsSubmitting(true);
        try {
            await deleteInvitationTemplate(initialData.id);
            router.push("/admin/invitation-templates");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to delete");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/invitation-templates" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-500" />
                </Link>
                <h1 className="text-2xl font-bold text-slate-900">
                    {isEditing ? "Edit Template" : "New Template"}
                </h1>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                        <input
                            {...form.register("name")}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900"
                            placeholder="Birthday Bash"
                        />
                        {form.formState.errors.name && (
                            <p className="text-xs text-red-500 mt-1">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                        <input
                            {...form.register("imageUrl")}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900"
                            placeholder="https://..."
                        />
                        {form.formState.errors.imageUrl && (
                            <p className="text-xs text-red-500 mt-1">{form.formState.errors.imageUrl.message}</p>
                        )}
                    </div>

                    <div className="flex items-center pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...form.register("active")}
                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-slate-700">Active</span>
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onDelete}
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                        >
                            <Trash className="w-4 h-4" />
                            Delete
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isEditing ? "Update Template" : "Create Template"}
                    </button>
                </div>
            </form>
        </div>
    );
}
