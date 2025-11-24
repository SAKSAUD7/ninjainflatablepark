"use client";

import { Hero } from "@repo/ui";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Shield, Zap, Calendar, Trophy, Heart } from "lucide-react";

export default function Home() {
    const features = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "20,000+ Sq Ft",
            description: "Massive play area",
            color: "from-yellow-400 to-orange-500"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "100% Safe",
            description: "Trained staff & equipment",
            color: "from-green-400 to-emerald-500"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "All Ages",
            description: "Fun for everyone",
            color: "from-blue-400 to-cyan-500"
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "11+ Zones",
            description: "Unique attractions",
            color: "from-purple-400 to-pink-500"
        },
    ];

    const attractions = [
        {
            title: "Ninja Obstacle Course",
            description: "Race through our epic obstacle course with tunnels, barriers, and challenges!",
            image: "/obstacle-course.jpg",
            badge: "Most Popular"
        },
        {
            title: "Giant Slides",
            description: "Experience the thrill of our towering slides with multiple lanes for racing!",
            image: "/giant-slides.jpg",
            badge: "Thrilling"
        },
        {
            title: "Wipe-Out Challenge",
            description: "Can you survive the spinning arms? Last person standing wins!",
            image: "/park-group-fun.jpg",
            badge: "Action Packed"
        },
    ];

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Parent",
            content: "Best birthday party venue ever! The kids had an absolute blast and the staff was amazing.",
            rating: 5
        },
        {
            name: "Rahul Patel",
            role: "Visitor",
            content: "Such an incredible experience! Perfect for both kids and adults. Highly recommended!",
            rating: 5
        },
        {
            name: "Anjali Reddy",
            role: "Event Organizer",
            content: "Organized a corporate team building event here. Everyone loved it! Great facilities.",
            rating: 5
        },
    ];

    return (
        <main className="bg-background">
            <Hero />

            {/* Features Section */}
            <section className="section-padding bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-title gradient-text">
                            Why Choose Ninja Park?
                        </h2>
                        <p className="section-subtitle">
                            India's premier inflatable adventure destination with world-class facilities
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="card card-hover p-8 text-center group"
                            >
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-soft group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-neutral-800 mb-2">{feature.title}</h3>
                                <p className="text-neutral-600 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Attractions */}
            <section className="section-padding bg-gradient-to-b from-white to-neutral-50">
                <div className="container-custom">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="section-title">
                                    Featured <span className="gradient-text">Attractions</span>
                                </h2>
                                <p className="section-subtitle text-left">
                                    Discover our most popular zones
                                </p>
                            </motion.div>
                        </div>
                        <a href="/attractions" className="hidden md:flex items-center text-primary font-bold hover:text-primary-dark transition-colors group">
                            View All <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {attractions.map((attraction, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{ y: -10 }}
                                className="card card-hover overflow-hidden group"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="badge badge-accent shadow-soft">
                                            {attraction.badge}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-[1]" />
                                    <img
                                        src={attraction.image}
                                        alt={attraction.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute bottom-0 left-0 p-6 z-10">
                                        <h3 className="text-2xl font-display font-bold text-white mb-2">
                                            {attraction.title}
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-neutral-600 mb-4">{attraction.description}</p>
                                    <button className="text-primary font-bold flex items-center group/btn">
                                        Learn More
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-title text-white">
                            What Our <span className="text-accent">Ninjas</span> Say
                        </h2>
                        <p className="section-subtitle text-white/80">
                            Real experiences from our happy visitors
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
                            >
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                                    ))}
                                </div>
                                <p className="text-white/90 mb-6 leading-relaxed">"{testimonial.content}"</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold text-lg mr-4">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{testimonial.name}</p>
                                        <p className="text-white/60 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Photo Gallery Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-title">
                            See the <span className="gradient-text">Action</span>
                        </h2>
                        <p className="section-subtitle">
                            Real moments from our amazing park
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { src: "/park-birthday-party.jpg", alt: "Birthday celebrations at Ninja Park", title: "Birthday Parties" },
                            { src: "/park-slides-action.jpg", alt: "Kids sliding down giant slides", title: "Giant Slides" },
                            { src: "/park-group-fun.jpg", alt: "Group activities and fun", title: "Group Fun" },
                            { src: "/obstacle-course.jpg", alt: "Ninja obstacle course action", title: "Obstacle Course" },
                            { src: "/giant-slides.jpg", alt: "Thrilling slide experience", title: "Slide Thrills" },
                            { src: "/party-kids-venue.jpg", alt: "Party venue with kids", title: "Party Venue" }
                        ].map((photo, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative group overflow-hidden rounded-2xl shadow-soft cursor-pointer h-64"
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <h3 className="text-2xl font-display font-bold text-white">
                                            {photo.title}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="card p-12 md:p-16 text-center bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-display font-black mb-6">
                                Ready for an <span className="text-accent">Epic Adventure</span>?
                            </h2>
                            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                                Book your session now and experience the thrill of India's biggest inflatable park!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="/book" className="btn bg-accent hover:bg-accent-dark text-white text-lg px-10 py-4 shadow-strong">
                                    Book Your Session
                                </a>
                                <a href="/contact" className="btn bg-white text-primary hover:bg-neutral-100 text-lg px-10 py-4">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
