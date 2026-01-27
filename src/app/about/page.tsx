import { Metadata } from "next";
import Link from "next/link";
import { Award, Users, Clock, CheckCircle, Target, Heart, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us | D'Interio Design Studio | Luxury Turnkey Interiors",
    description: "Learn about D'Interio Design Studio - Hyderabad's leading luxury interior design studio specializing in bespoke residential and commercial design services with minimum project value of ₹50 Lakhs.",
};

export default function AboutPage() {
    return (
        <div className="pt-32 pb-24">
            {/* Hero Section */}
            <section className="bg-dark text-white py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="text-gold uppercase tracking-[0.3em] font-semibold text-xs md:text-sm mb-4 block">
                            About D'Interio
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                            Luxury Interior Design Studio in Hyderabad
                        </h1>
                        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                            Transform your space with timeless elegance and expert craftsmanship. We specialize in bespoke residential and commercial design services with a minimum project value of <span className="text-gold font-bold">₹50,00,000</span>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-gold z-10" />
                            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                                <img
                                    src="/images/hero-1.png"
                                    alt="D'Interio Design Studio"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-gold z-10" />
                        </div>

                        <div className="space-y-6">
                            <span className="text-gold uppercase tracking-[0.3em] font-bold text-sm">
                                Our Story
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark">
                                Crafting Exceptional Spaces Since Day One
                            </h2>
                            <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                                D'Interio Design Studio was founded with a singular vision: to transform ordinary spaces into extraordinary living and working environments. Based in Hyderabad, we have grown to become one of the most trusted names in luxury interior design.
                            </p>
                            <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                                Our team of expert designers and craftsmen work in harmony to deliver excellence, combining innovative design thinking with traditional craftsmanship. Every project we undertake is a testament to our commitment to quality and our clients' unique vision.
                            </p>
                            <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                                With projects across India — from Hyderabad and Bangalore to Mumbai and Delhi — we bring luxury interiors to discerning clients who demand nothing but the best.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "10+", label: "Years of Excellence" },
                            { number: "500+", label: "Projects Completed" },
                            { number: "₹50L", label: "Minimum Project" },
                            { number: "5★", label: "Client Rating" },
                        ].map((stat, i) => (
                            <div key={i} className="p-6">
                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gold mb-2">
                                    {stat.number}
                                </h3>
                                <p className="text-foreground/60 text-sm uppercase tracking-widest">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-gold uppercase tracking-[0.3em] font-semibold text-xs md:text-sm mb-2 block">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-dark">
                            Our Core Values
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Sparkles,
                                title: "Uncompromising Quality",
                                desc: "We use only the finest materials and execute with precision to deliver interiors that stand the test of time.",
                            },
                            {
                                icon: Target,
                                title: "Client-Centric Approach",
                                desc: "Your vision is our compass. We listen, understand, and translate your dreams into stunning realities.",
                            },
                            {
                                icon: Clock,
                                title: "Timely Delivery",
                                desc: "We respect your time. Our streamlined processes ensure on-time project completion without compromising quality.",
                            },
                            {
                                icon: Users,
                                title: "Expert Team",
                                desc: "Our designers, architects, and craftsmen bring decades of combined experience to every project.",
                            },
                            {
                                icon: Heart,
                                title: "Passion for Design",
                                desc: "We don't just design spaces; we craft experiences that enhance your daily life.",
                            },
                            {
                                icon: CheckCircle,
                                title: "End-to-End Solutions",
                                desc: "From concept to completion, we handle everything — design, execution, furniture, and finishing.",
                            },
                        ].map((value, i) => (
                            <div
                                key={i}
                                className="p-8 border border-gray-100 hover:border-gold/30 hover:shadow-xl transition-all duration-500 rounded-lg"
                            >
                                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mb-6 text-gold">
                                    <value.icon size={28} />
                                </div>
                                <h3 className="text-xl font-serif font-bold mb-4 text-dark">{value.title}</h3>
                                <p className="text-foreground/60 leading-relaxed text-sm">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-gold text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">
                        Ready to Transform Your Space?
                    </h2>
                    <p className="text-white/80 text-sm md:text-lg mb-8 font-light">
                        Let's discuss your project. Minimum project value ₹50,00,000.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-gold hover:bg-white/90 px-8 md:px-12 py-3 md:py-4 rounded-sm font-bold text-sm md:text-base tracking-wider transition-all duration-300"
                    >
                        GET IN TOUCH
                    </Link>
                </div>
            </section>
        </div>
    );
}
