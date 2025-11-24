"use client";

import { useState } from "react";
import { AttractionCard, ScrollReveal, BouncyButton } from "@repo/ui";
import { motion } from "framer-motion";
import { staggerContainer } from "@repo/animations";
import { attractions } from "../data/attractions";
import type { Attraction } from "@repo/types";

const categories = [
    { id: "all", label: "All Attractions" },
    { id: "thrill", label: "Thrill Rides" },
    { id: "obstacle", label: "Obstacles" },
    { id: "kids", label: "Kids Zone" },
    { id: "family", label: "Family Fun" },
];

export const AttractionsGrid = () => {
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const filteredAttractions = activeCategory === "all"
        ? attractions
        : attractions.filter((a) => a.category === activeCategory);

    return (
        <div className="py-20 px-4 md:px-8 bg-background">
            {/* Category Filter */}
            <ScrollReveal animation="fade" className="mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${activeCategory === cat.id
                                    ? "bg-primary text-black scale-105"
                                    : "bg-surface-800 text-white hover:bg-surface-700"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </ScrollReveal>

            {/* Grid */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
                {filteredAttractions.map((attraction, index) => (
                    <ScrollReveal
                        key={attraction.id}
                        animation="slideUp"
                        delay={index * 0.1}
                    >
                        <AttractionCard
                            title={attraction.title}
                            description={attraction.description}
                            image={attraction.image}
                            category={attraction.category}
                            intensity={attraction.intensity}
                        />
                    </ScrollReveal>
                ))}
            </motion.div>

            {filteredAttractions.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-white/60 text-xl">No attractions found in this category.</p>
                </div>
            )}
        </div>
    );
};
