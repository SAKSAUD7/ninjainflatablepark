"use client";

import { motion } from "framer-motion";
import { Target, Heart, Users, Award, Calendar, MapPin, Star, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function About() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        {
            question: "What age groups can enjoy Ninja Park?",
            answer: "Ninja Park is perfect for all ages! We have zones designed for kids as young as 3 years old, as well as challenging obstacles for teens and adults. Everyone can find something fun!"
        },
        {
            question: "Do I need to book in advance?",
            answer: "While walk-ins are welcome, we highly recommend booking in advance, especially on weekends and holidays, to guarantee your spot and avoid waiting times."
        },
        {
            question: "What should I wear?",
            answer: "Wear comfortable athletic clothing and grip socks (available for purchase at the park). Remove all jewelry, watches, and sharp objects before entering the play areas."
        },
        {
            question: "Is the park safe for children?",
            answer: "Absolutely! Safety is our top priority. All equipment is regularly inspected, our staff is trained in safety protocols, and we have safety marshals monitoring all zones."
        },
        {
            question: "Can I host a birthday party here?",
            answer: "Yes! We offer amazing birthday party packages with dedicated party hosts, private areas, and special decorations. Check our Parties page for more details!"
        }
    ];

    return (
        <main className="bg-background-light min-h-screen">
            {/* Hero Section with Logo */}
            <div className="relative bg-gradient-hero overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.img
                            src="/ninja-logo.png"
                            alt="Ninja Inflatable Park"
                            className="mx-auto h-32 md:h-40 mb-8 drop-shadow-2xl"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 drop-shadow-lg">
                            About <span className="text-white drop-shadow-xl">Us</span>
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium">
                            India's Biggest Inflatable Adventure Park
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center"
                    >
                        <h2 className="text-4xl font-display font-black gradient-text mb-6">Our Story</h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Ninja Inflatable Park was born from a simple idea: create a space where people of all ages
                            can unleash their inner ninja, challenge themselves, and have an absolute blast doing it.
                        </p>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Spanning over <span className="font-bold text-primary">20,000 square feet</span>, we've created
                            India's largest inflatable adventure park with 11+ unique zones designed to thrill, challenge,
                            and entertain.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Whether you're looking for a fun family outing, an adrenaline-pumping workout, or the perfect
                            venue for your next celebration, Ninja Park is your destination for unforgettable memories.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-fun rounded-[3rem] transform rotate-3 opacity-20" />
                        <img
                            src="/park-slides-action.jpg"
                            alt="Kids having fun at Ninja Inflatable Park"
                            className="relative rounded-[3rem] shadow-2xl w-full h-[500px] object-cover border-8 border-white"
                        />
                    </motion.div>
                </div>

                {/* Influencer Reviews Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="text-4xl font-display font-black text-center gradient-text mb-4">
                        See What Ninjas Are Saying
                    </h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        Check out these amazing reviews from influencers who visited our park!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Instagram Embed 1 */}
                        <div className="card card-hover p-4">
                            <blockquote
                                className="instagram-media"
                                data-instgrm-permalink="https://www.instagram.com/reel/DRSCTjdAZB8/"
                                data-instgrm-version="14"
                                style={{
                                    background: '#FFF',
                                    border: 0,
                                    borderRadius: '3px',
                                    boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                                    margin: '1px',
                                    maxWidth: '540px',
                                    minWidth: '326px',
                                    padding: 0,
                                    width: 'calc(100% - 2px)'
                                }}
                            />
                        </div>

                        {/* Instagram Embed 2 */}
                        <div className="card card-hover p-4">
                            <blockquote
                                className="instagram-media"
                                data-instgrm-permalink="https://www.instagram.com/reel/DRXX0r6j8IN/"
                                data-instgrm-version="14"
                                style={{
                                    background: '#FFF',
                                    border: 0,
                                    borderRadius: '3px',
                                    boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                                    margin: '1px',
                                    maxWidth: '540px',
                                    minWidth: '326px',
                                    padding: 0,
                                    width: 'calc(100% - 2px)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Instagram Embed Script */}
                    <script async src="//www.instagram.com/embed.js"></script>
                </motion.div>

                {/* Journey Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="text-4xl font-display font-black text-center gradient-text mb-16">Our Journey</h2>

                    <div className="space-y-8">
                        {[
                            { year: "2020", title: "The Dream Begins", description: "Conceptualized India's biggest inflatable adventure park" },
                            { year: "2021", title: "Construction Starts", description: "Began building our 20,000 sq ft facility with state-of-the-art equipment" },
                            { year: "2022", title: "Grand Opening", description: "Opened doors to thousands of excited ninjas!" },
                            { year: "2023", title: "50K+ Happy Visitors", description: "Celebrated serving over 50,000 happy customers" },
                            { year: "2024", title: "Expansion & Growth", description: "Added new zones and became India's #1 inflatable park" }
                        ].map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-8"
                            >
                                <div className="flex-shrink-0 w-24 h-24 bg-gradient-fun rounded-full flex items-center justify-center shadow-strong">
                                    <Calendar className="w-12 h-12 text-white" />
                                </div>
                                <div className="flex-1 card p-6">
                                    <div className="text-2xl font-black text-primary mb-2">{milestone.year}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                                    <p className="text-gray-600">{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Values Section */}
                <div className="mb-24">
                    <h2 className="text-4xl font-display font-black text-center gradient-text mb-16">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Target className="w-12 h-12 text-white" />,
                                title: "Fun First",
                                description: "Every decision we make is centered around creating maximum fun and joy for our guests.",
                                color: "bg-gradient-primary"
                            },
                            {
                                icon: <Heart className="w-12 h-12 text-white" />,
                                title: "Safety Always",
                                description: "Your safety is our top priority. Trained staff, quality equipment, and strict protocols.",
                                color: "bg-gradient-accent"
                            },
                            {
                                icon: <Users className="w-12 h-12 text-white" />,
                                title: "Inclusive",
                                description: "Activities for all ages and abilities. Everyone deserves to feel like a ninja!",
                                color: "bg-gradient-playful"
                            },
                            {
                                icon: <Award className="w-12 h-12 text-white" />,
                                title: "Excellence",
                                description: "We strive for excellence in every aspect, from cleanliness to customer service.",
                                color: "bg-gradient-secondary"
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card card-hover p-8 text-center"
                            >
                                <div className={`${value.color} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-strong`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="text-4xl font-display font-black text-center gradient-text mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-center text-gray-600 mb-12 text-lg">
                        Got questions? We've got answers!
                    </p>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="card overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
                                >
                                    <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                                    <ChevronDown
                                        className={`w-6 h-6 text-primary transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="card-gradient p-12 shadow-xl border border-gray-100"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "20,000+", label: "Sq Ft of Fun" },
                            { number: "11+", label: "Unique Zones" },
                            { number: "100%", label: "Safety Record" },
                            { number: "50,000+", label: "Happy Ninjas" }
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{stat.number}</div>
                                <div className="text-gray-600 font-bold uppercase tracking-wide text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
