import React from 'react';
import { getPageSections } from '@/app/actions/page-sections';
import { getGalleryItems } from '@/app/actions/gallery';
import { getInstagramReels } from '@/app/actions/instagram-reels';
import { getTestimonials } from '@/app/actions/testimonials';
import { HeroEditor } from '@/components/admin/cms/home/HeroEditor';
import { AboutEditor } from '@/components/admin/cms/home/AboutEditor';
import { GalleryManager } from '@/components/admin/cms/home/GalleryManager';
import { ReelsManager } from '@/components/admin/cms/home/ReelsManager';
import { TestimonialsManager } from '@/components/admin/cms/home/TestimonialsManager';
import { CMSBackLink } from '@/components/admin/cms/CMSBackLink';

export default async function HomeAdminPage() {
    // Fetch all data in parallel
    const [sections, gallery, reels, testimonials] = await Promise.all([
        getPageSections('home'),
        getGalleryItems(),
        getInstagramReels(),
        getTestimonials()
    ]);

    // Find specific sections or use undefined (editors will handle defaults)
    const heroSection = sections.find((s: any) => s.section_key === 'hero');
    const aboutSection = sections.find((s: any) => s.section_key === 'about');

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20">
            <CMSBackLink />
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Home Page Editing</h1>
                <p className="text-slate-500">Manage content for the main landing page</p>
            </div>

            <div className="grid gap-8">
                <section>
                    <HeroEditor section={heroSection} pageSlug="home" />
                </section>

                <section>
                    <AboutEditor section={aboutSection} pageSlug="home" />
                </section>

                <section>
                    <GalleryManager items={gallery} />
                </section>

                <section>
                    <TestimonialsManager items={testimonials} />
                </section>

                <section>
                    <ReelsManager items={reels} />
                </section>
            </div>
        </div>
    );
}

