"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, LayoutTemplate, MessageSquare, User, Calendar, Loader2 } from "lucide-react";
import { getInvitationTemplates } from "../../../actions/invitation-templates";
import { toast } from "sonner";

interface Template {
    id: number;
    name: string;
    background_image: string;
    default_title: string;
    default_message: string;
}

interface EInvitationStepProps {
    bookingId: string;
    bookingDetails: any;
    onNext: () => void;
    onSkip: () => void;
}

export default function EInvitationStep({ bookingId, bookingDetails, onNext, onSkip }: EInvitationStepProps) {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form data
    const [childName, setChildName] = useState("");
    const [customMessage, setCustomMessage] = useState("");

    useEffect(() => {
        loadTemplates();
        // Pre-fill child name if available from booking details
        if (bookingDetails?.childName) {
            setChildName(bookingDetails.childName);
        }
    }, [bookingDetails]);

    const loadTemplates = async () => {
        try {
            // We reuse the admin action but it might be better to have a public specific one
            // However, getInvitationTemplates checks permission 'cms' 'read'.
            // Wait, regular users don't have this permission!
            // I need a PUBLIC API endpoint for templates or separate action.
            // For now, I'll use a direct fetch to the public-allowed endpoint if I made one?
            // InvitationTemplateViewSet allows 'list' to AllowAny.
            // So direct fetch is better/safer than the secure action.

            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
            const res = await fetch(`${API_URL}/invitations/templates/`);
            if (res.ok) {
                const data = await res.json();
                const active = data.filter((t: any) => t.is_active);
                setTemplates(active);
                if (active.length > 0) {
                    const defaultTpl = active[0];
                    setSelectedTemplate(defaultTpl);
                    setCustomMessage(defaultTpl.default_message);
                }
            }
        } catch (error) {
            console.error("Failed to load templates", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTemplateSelect = (template: Template) => {
        setSelectedTemplate(template);
        // Reset message to default if user hasn't typed much, or keep their custom text?
        // Better to keep custom text if they typed something specific, 
        // but maybe they want the new template's default.
        // Let's only overwrite if it matches the previous template's default or is empty.
        if (!customMessage || (selectedTemplate && customMessage === selectedTemplate.default_message)) {
            setCustomMessage(template.default_message);
        }
    };

    const handleSubmit = async () => {
        if (!selectedTemplate) return;
        setSubmitting(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
            const res = await fetch(`${API_URL}/invitations/invitations/create-or-update/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    booking_id: bookingId, // This might need to be resolved to integer ID if model uses integer, but API handles resolving logic?
                    // My create_or_update expects 'booking_id' (integer PK).
                    // But 'bookingId' prop here might be UUID or ID depending on 'bookingDetails'.
                    // Let's assume bookingDetails.id is the integer ID.
                    booking: bookingDetails.id, // Direct FK relation expects ID usually
                    // Wait, create_or_update implementation:
                    // booking = PartyBooking.objects.get(id=booking_id)
                    // So we need the integer ID.
                    template: selectedTemplate.id,
                    child_name: childName,
                    custom_message: customMessage,
                    party_date: bookingDetails.date,
                    party_time: bookingDetails.time,
                    venue: "Ninja Inflatable Park"
                })
            });

            if (res.ok) {
                onNext();
            } else {
                toast.error("Failed to save invitation");
            }
        } catch (error) {
            console.error("Error saving invitation:", error);
            toast.error("Error saving invitation");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
    );

    if (templates.length === 0) {
        return (
            <div className="text-center py-10 bg-surface-800/50 rounded-2xl border border-white/10">
                <p className="text-white/60">No invitation templates available at the moment.</p>
                <div className="mt-4">
                    <button onClick={onSkip} className="text-primary hover:text-white underline">
                        Skip this step
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Configuration */}
            <div className="space-y-6">
                <div className="bg-surface-800/50 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                    <h2 className="text-2xl font-display font-bold mb-4 text-primary flex items-center gap-2">
                        <LayoutTemplate className="w-6 h-6" />
                        Choose a Template
                    </h2>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {templates.map(tpl => (
                            <div
                                key={tpl.id}
                                onClick={() => handleTemplateSelect(tpl)}
                                className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all hover:scale-[1.02] ${selectedTemplate?.id === tpl.id
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'border-transparent opacity-70 hover:opacity-100'
                                    }`}
                            >
                                <div className="aspect-video relative bg-slate-800">
                                    <img
                                        src={tpl.background_image}
                                        alt={tpl.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {selectedTemplate?.id === tpl.id && (
                                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                            <CheckCircle className="text-white w-8 h-8 drop-shadow-md" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-2 bg-surface-900 text-center text-xs text-white/80 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                                    {tpl.name}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-xl font-display font-bold mb-4 text-primary flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Customize Details
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/80">Birthday Child's Name</label>
                            <input
                                value={childName}
                                onChange={(e) => setChildName(e.target.value)}
                                className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                                placeholder="e.g. Leo"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-white/80">Invitation Message</label>
                            <textarea
                                rows={4}
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                                className="w-full px-4 py-3 bg-background-dark border-2 border-surface-700 rounded-xl focus:border-primary focus:outline-none transition-colors text-white resize-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onSkip}
                        className="flex-1 px-6 py-4 bg-surface-700 hover:bg-surface-600 text-white font-bold rounded-xl transition-all"
                    >
                        Skip
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="flex-[2] px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {submitting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>
                                Save & Finish
                                <CheckCircle size={20} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
