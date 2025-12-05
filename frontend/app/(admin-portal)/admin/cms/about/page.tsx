'use client';

import React, { useEffect, useState } from 'react';
import { getPageSections, updatePageSection } from '@/app/actions/page-sections';
import { getStatCards } from '@/app/actions/stat-cards';
import { getTimelineItems } from '@/app/actions/timeline-items';
import { getValueItems } from '@/app/actions/value-items';
import { getFaqs } from '@/app/actions/faqs';
import { AboutEditor } from '@/components/admin/cms/home/AboutEditor'; // Reusing this components
import { CollectionList } from '@/components/admin/cms/CollectionList'; // For lists
import { CMSBackLink } from '@/components/admin/cms/CMSBackLink';
import { schemas } from '@/lib/cms/schema';
import { Loader2 } from 'lucide-react';

export default function AboutAdminPage() {
    const [loading, setLoading] = useState(true);
    const [heroSection, setHeroSection] = useState<any>(null);
    const [storySection, setStorySection] = useState<any>(null);
    const [stats, setStats] = useState<any[]>([]);
    const [timeline, setTimeline] = useState<any[]>([]);
    const [values, setValues] = useState<any[]>([]);
    const [faqs, setFaqs] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [sections, statsData, timelineData, valuesData, faqsData] = await Promise.all([
                getPageSections('about'),
                getStatCards('about'),
                getTimelineItems(),
                getValueItems(),
                getFaqs()
            ]) as [any[], any[], any[], any[], any[]];

            setHeroSection(sections.find((s: any) => s.section_key === 'hero'));
            setStorySection(sections.find((s: any) => s.section_key === 'story'));
            setStats(statsData);
            setTimeline(timelineData);
            setValues(valuesData);
            setFaqs(faqsData);
        } catch (error) {
            console.error('Failed to load about page data:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-12 max-w-5xl mx-auto pb-20">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">About Page Editing</h1>
                <p className="text-slate-500">Manage content for the about us page</p>
            </div>

            {/* Hero Section (Reusing structure but mapping accurately) */}
            <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Hero Section</h2>
                {/* Note: AboutEditor is hardcoded for Home currently. We might need a GenericSectionEditor or create a specific AboutHeroEditor. 
                    For now, asking user permission/plan to generalize editors is better, but I will use a placeholder or generic editor if available.
                    Actually, I'll create a new component `PageSectionEditor` which is generic. 
                 */}
                <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                    TODO: Implement Generic PageSectionEditor for Hero & Story
                </div>
            </section>

            {/* Stats */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-slate-900">Statistics</h2>
                </div>
                <CollectionList
                    schema={schemas.stat_card}
                    items={stats}
                    basePath="/admin/cms/stats" // Nested route or modal? User asked for single page editor mostly. 
                    // Ideally handled via modal or inline. For now, list view.
                    titleField="label"
                    subtitleField="value"
                    showBackButton={false}
                />
            </section>

            {/* Timeline */}
            <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Timeline</h2>
                <CollectionList
                    schema={schemas.timeline_item}
                    items={timeline}
                    basePath="/admin/cms/timeline"
                    titleField="year"
                    subtitleField="title"
                    showBackButton={false}
                />
            </section>

            {/* Values */}
            <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Core Values</h2>
                <CollectionList
                    schema={schemas.value_item}
                    items={values}
                    basePath="/admin/cms/values"
                    titleField="title"
                    subtitleField="description"
                    showBackButton={false}
                />
            </section>

            {/* FAQs */}
            <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">FAQs</h2>
                <CollectionList
                    schema={schemas.faq}
                    items={faqs}
                    basePath="/admin/cms/faqs"
                    titleField="question"
                    subtitleField="answer"
                    showBackButton={false}
                />
            </section>
        </div>
    );
}

