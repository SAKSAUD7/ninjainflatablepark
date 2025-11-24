"use client";

import { ActivityCard } from "@repo/ui";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Attractions() {
    const [activeCategory, setActiveCategory] = useState("All");

    const activities = [
        {
            title: "Ninja Obstacle Course",
            description: "The ultimate test of agility! Race through tunnels, over barriers, and across shaky bridges in our signature obstacle course. Perfect for competitive spirits.",
            image: "https://images.unsplash.com/photo-1574906636733-455b804564e6?auto=format&fit=crop&q=80&w=1000",
            category: "High Energy",
            duration: "Unlimited",
            difficulty: "Medium",
            minAge: 7
        },
        {
            title: "Giant Slides",
            description: "Feel the adrenaline as you slide down our massive inflatable slides. Safe, fast, and incredibly fun for all ages. Multiple lanes for racing!",
            image: "https://images.unsplash.com/photo-1596464716127-f9a827423bc8?auto=format&fit=crop&q=80&w=1000",
            category: "Thrilling",
            duration: "Unlimited",
            difficulty: "Easy",
            minAge: 5
        },
        {
            title: "Wipe-Out Challenge",
            description: "Can you survive the sweeping arm? Jump and duck to stay on your podium in this hilarious last-person-standing game inspired by the TV show!",
            image: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?auto=format&fit=crop&q=80&w=1000",
            category: "Action",
            duration: "5 mins/round",
            difficulty: "Hard",
            minAge: 8
        },
        {
            title: "Maze Adventure",
            description: "Get lost in our inflatable labyrinth! Navigate the twists and turns to find your way out. Great for problem-solving and exploration.",
            image: "https://images.unsplash.com/photo-1605218427368-35b019b88642?auto=format&fit=crop&q=80&w=1000",
            category: "Exploration",
            duration: "Unlimited",
            difficulty: "Easy",
            minAge: 4
        },
        {
            title: "Giant Jumping Balls",
            description: "Leap from one giant ball to another! It requires balance, precision, and a bit of courage. One of our most photographed attractions!",
            image: "https://images.unsplash.com/photo-1566066925181-4339a3aa5d40?auto=format&fit=crop&q=80&w=1000",
            category: "Skill",
            duration: "Unlimited",
            difficulty: "Medium",
            minAge: 6
        },
        {
            title: "Balance Beam",
            description: "Test your focus on the narrow beam. Don't worry if you fall – a soft inflatable landing awaits! Perfect for improving coordination.",
            image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=1000",
            category: "Skill",
            duration: "Unlimited",
            difficulty: "Medium",
            minAge: 5
        },
        {
            title: "Dinosaur Guard",
            description: "Bounce around our friendly inflatable dinosaur guardians. A favorite spot for photos and younger jumpers. Roar-some fun!",
            image: "https://images.unsplash.com/photo-1616031036662-28c41aa80962?auto=format&fit=crop&q=80&w=1000",
            category: "Kids Zone",
            duration: "Unlimited",
            difficulty: "Easy",
            minAge: 1
        },
        {
            title: "Jelly Bead Zone",
            description: "A unique sensory experience! Bounce on our special jelly bead surface for a different kind of fun. Feels like bouncing on clouds!",
            image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1000",
            category: "Sensory",
            duration: "Unlimited",
            difficulty: "Easy",
            minAge: 3
        },
        {
            title: "Climbing Wall",
            description: "Scale new heights on our inflatable climbing wall. Reach the top and survey the entire park! Safe and supervised.",
            image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=1000",
            category: "High Energy",
            duration: "Unlimited",
            difficulty: "Hard",
            minAge: 7
        },
        {
            title: "Wave Bed",
            description: "Ride the waves on this undulating bouncy surface. It's like being on the ocean, but bouncier! Relaxing yet fun.",
            image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=1000",
            category: "Chill",
            duration: "Unlimited",
            difficulty: "Easy",
            minAge: 3
        },
        {
            title: "Spider Wall",
            description: "Stick yourself to the wall or just bounce off the vertical surfaces! A unique experience that defies gravity.",
            image: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?auto=format&fit=crop&q=80&w=1000",
            category: "Action",
            duration: "Unlimited",
            difficulty: "Medium",
            minAge: 6
        }
    ];

    const categories = ["All", "High Energy", "Thrilling", "Action", "Kids Zone", "Skill", "Chill"];

    const filteredActivities = activeCategory === "All"
        ? activities
        : activities.filter(activity => activity.category === activeCategory);

    return (
        <main className="bg-background-light min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-black text-primary mb-6">
                            Our Activities
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Explore over 11 amazing zones! From high-energy obstacle courses to chill-out wave beds,
                            there's something for every ninja at India's biggest inflatable park.
                        </p>
                    </motion.div>
                </div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 ${activeCategory === category
                                    ? "bg-primary text-white shadow-lg"
                                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Activities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredActivities.map((activity, index) => (
                        <ActivityCard key={index} {...activity} index={index} />
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100"
                >
                    <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-6">
                        Ready to Jump In?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        All activities are included in your session ticket. Book now and experience unlimited fun!
                    </p>
                    <a
                        href="/book"
                        className="inline-block bg-accent hover:bg-accent-dark text-black font-black py-4 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all uppercase tracking-wide text-lg"
                    >
                        Book Your Session
                    </a>
                </motion.div>
            </div>
        </main>
    );
}
