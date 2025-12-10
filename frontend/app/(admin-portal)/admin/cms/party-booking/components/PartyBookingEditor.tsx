"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Save, PartyPopper } from 'lucide-react';
import { toast } from 'sonner';
import { getPageSections, updatePageSection, createPageSection } from '@/app/actions/page-sections';
import { PageSection } from '@/lib/cms/types';

// Define party steps
const PARTY_STEPS = [
    { key: 'step-1', label: 'Step 1: Packages', defaultTitle: 'Select Party Package', defaultSubtitle: 'Choose the perfect package for your celebration' },
    { key: 'step-2', label: 'Step 2: Participants', defaultTitle: 'Participants', defaultSubtitle: 'Add the birthday child and guests' },
    { key: 'step-3', label: 'Step 3: Invitations', defaultTitle: 'E-Invitations', defaultSubtitle: 'Create and download custom invitations' },
    { key: 'step-4', label: 'Step 4: Confirmation', defaultTitle: 'Confirm Booking', defaultSubtitle: 'Review details and complete your booking' },
];

const sectionSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().optional(),
});

type SectionFormData = z.infer<typeof sectionSchema>;

export default function PartyBookingEditor() {
    const [sections, setSections] = useState<PageSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);

    useEffect(() => {
        loadSections();
    }, []);

    const loadSections = async () => {
        try {
            const data = await getPageSections('booking-party');
            setSections(data);
        } catch (error) {
            console.error('Failed to load sections', error);
            toast.error('Failed to load content');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (stepKey: string, data: SectionFormData) => {
        setSaving(stepKey);
        try {
            const existingSection = sections.find(s => s.section_key === stepKey);

            if (existingSection) {
                await updatePageSection(existingSection.id, {
                    ...existingSection,
                    title: data.title,
                    subtitle: data.subtitle || '',
                });
            } else {
                await createPageSection({
                    page: 'booking-party',
                    section_key: stepKey,
                    title: data.title,
                    subtitle: data.subtitle || '',
                    active: true,
                    order: 0,
                    content: '', // not using content for simple title/subtitle editing
                    image_url: '',
                    video_url: '',
                    cta_text: '',
                    cta_link: ''
                });
            }

            await loadSections();
            toast.success('Section updated successfully');
        } catch (error) {
            console.error('Failed to save section', error);
            toast.error('Failed to save changes');
        } finally {
            setSaving(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl">
            {PARTY_STEPS.map((step) => {
                const section = sections.find(s => s.section_key === step.key);
                return (
                    <StepEditor
                        key={step.key}
                        step={step}
                        initialData={section}
                        isSaving={saving === step.key}
                        onSave={(data) => handleSave(step.key, data)}
                    />
                );
            })}
        </div>
    );
}

function StepEditor({ step, initialData, isSaving, onSave }: { step: any, initialData: any, isSaving: boolean, onSave: (data: SectionFormData) => void }) {
    const { register, handleSubmit, formState: { errors } } = useForm<SectionFormData>({
        resolver: zodResolver(sectionSchema),
        defaultValues: {
            title: initialData?.title || step.defaultTitle,
            subtitle: initialData?.subtitle || step.defaultSubtitle,
        }
    });

    return (
        <form onSubmit={handleSubmit(onSave)} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <PartyPopper className="w-4 h-4 text-primary" />
                    {step.label}
                </h3>
            </div>
            <div className="p-6 grid gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input
                        {...register('title')}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Select Party Package"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                    <input
                        {...register('subtitle')}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Choose the perfect package..."
                    />
                </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-sm font-medium disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>
        </form>
    );
}
