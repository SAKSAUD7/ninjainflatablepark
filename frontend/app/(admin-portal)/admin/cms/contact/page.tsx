'use client';

import React, { useEffect, useState } from 'react';
import { getContactInfos, updateContactInfo } from '@/app/actions/contact-info';
import { getPageSections } from '@/app/actions/page-sections';
import { CMSForm } from '@/components/admin/cms/CMSForm';
import { schemas } from '@/lib/cms/schema';
import { CMSBackLink } from '@/components/admin/cms/CMSBackLink';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactAdminPage() {
    const [loading, setLoading] = useState(true);
    const [heroSection, setHeroSection] = useState<any>(null);
    const [contacts, setContacts] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [sections, contactsData] = await Promise.all([
                getPageSections('contact'),
                getContactInfos()
            ]) as [any[], any[]];

            setHeroSection(sections.find((s: any) => s.section_key === 'hero'));
            setContacts(contactsData);
        } catch (error) {
            console.error('Failed to load contact page data:', error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateContact = async (data: any) => {
        const result = await updateContactInfo(data.id, data);
        if (result.success) {
            toast.success('Contact info updated');
            // Update local state without reload
            setContacts(prev => prev.map(c => c.id === data.id ? result.item : c));
        } else {
            toast.error('Failed to update');
        }
        return result;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-12 max-w-4xl mx-auto pb-20">
            <CMSBackLink />
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Contact Page Editing</h1>
                <p className="text-slate-500">Manage contact details and page visuals</p>
            </div>

            {/* Contact Information List */}
            <div className="grid gap-6">
                <h2 className="text-lg font-semibold text-slate-900">Contact Details</h2>
                {contacts.length === 0 && <p className="text-slate-500">No contact info found.</p>}

                {contacts.map((contact) => (
                    <div key={contact.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="bg-slate-100 p-2 rounded-lg text-slate-600 font-bold text-xs uppercase tracking-wider">
                                {contact.category}
                            </span>
                            <h3 className="font-semibold text-slate-900">{contact.label}</h3>
                        </div>
                        <CMSForm
                            schema={schemas.contact_info} // Use contact_info schema 
                            initialData={contact}
                            onSubmit={handleUpdateContact}
                            submitLabel="Save Changes"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
