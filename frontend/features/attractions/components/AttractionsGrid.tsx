"use client";

import { useState } from "react";
import { AttractionCard, ScrollReveal, BouncyButton } from "@repo/ui";
import { motion } from "framer-motion";
import { staggerContainer } from "@repo/animations";

interface Activity {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    active: boolean;
    order: number;
}

interface AttractionsGridProps {
    activities: Activity[];
}

export const AttractionsGrid = ({ activities }: AttractionsGridProps) => {
    return (
        <div className="py-20 px-4 md:px-8 bg-background">
            {/* Grid */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
                {activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <ScrollReveal
                            key={activity.id}
                            animation="slideUp"
                            delay={index * 0.1}
                        >
                            <AttractionCard
                                title={activity.name}
                                description={activity.description}
                                image={activity.imageUrl}
                                category="attraction"
                                intensity="medium"
                            />
                        </ScrollReveal>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <p className="text-white/60 text-xl">No attractions available yet.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
