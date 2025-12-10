'use client';

import Image from 'next/image';
import { Instagram } from 'lucide-react';
import Link from 'next/link';

interface InstagramReel {
    id: number;
    title: string;
    thumbnail_url: string;
    reel_url: string;
    order: number;
}

export default function InstagramReels({ reels = [] }: { reels?: InstagramReel[] }) {
    if (!reels || reels.length === 0) {
        return null;
    }

    return (
        <section className="py-12 bg-background relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-2 mb-8">
                    <Instagram className="w-6 h-6 text-pink-500" />
                    <h2 className="text-2xl font-bold text-center text-white">Follow Us on Instagram</h2>
                </div>

                {/* Mobile: Horizontal Scroll | Desktop: Grid */}
                <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {reels.map((reel) => (
                        <Link
                            key={reel.id}
                            href={reel.reel_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 w-[140px] sm:w-[180px] md:w-auto snap-center group relative aspect-[9/16] overflow-hidden rounded-xl bg-white/5 shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl border border-white/10"
                        >
                            <Image
                                src={reel.thumbnail_url}
                                alt={reel.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Play Icon Overlay */}
                            <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/40 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border border-white/30">
                                    <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                            
                            {/* Instagram Icon - Only visible on hover/desktop to keep mobile clean */}
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-white/10">
                                    <Instagram className="w-4 h-4 text-pink-500" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="https://www.instagram.com/ninjainflatablepark"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-600/20"
                    >
                        <Instagram className="w-4 h-4" />
                        View More Posts
                    </Link>
                </div>
            </div>
        </section>
    );
}
