"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle, Star, ArrowRight, Play, Shield, Clock, Award, Users, Sparkles, Send, Youtube, Instagram, Facebook, Linkedin, Loader2 } from "lucide-react";
import { useModal } from "@/lib/ModalContext";
import emailjs from "@emailjs/browser";

export default function LandingClient() {
    const { openModal } = useModal();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        propertyType: "",
        budget: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    from_phone: formData.phone,
                    property_type: formData.propertyType,
                    budget: formData.budget,
                    message: formData.message,
                    location: "Google Ads Landing Page",
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
            );
            setSubmitted(true);
        } catch (err) {
            console.error("EmailJS Error:", err);
            setError("Something went wrong. Please call us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark">
            {/* Sticky CTA Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-gold py-2 px-4 text-center">
                <p className="text-white text-sm font-medium flex items-center justify-center gap-2">
                    <span className="font-bold">Min. Project: ₹50 Lakhs</span>
                </p>
            </div>

            {/* Hero Section */}
            <section className="pt-16 min-h-screen relative overflow-hidden flex items-center">
                {/* Background */}
                <div className="absolute inset-0">
                    <img src="/images/hero-1.png" alt="Luxury Interior" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/80" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-white space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="flex text-gold">{"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}</div>
                                <span className="text-white/70 text-sm">5.0 Rating • 500+ Projects</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
                                <span className="text-gold">Luxury</span> Turnkey Interiors
                            </h1>

                            <p className="text-xl md:text-2xl text-white/80 font-light">
                                Transform Your Space into a <span className="text-gold font-semibold">Masterpiece</span>
                            </p>

                            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
                                Hyderabad's premier interior design studio. Complete end-to-end solutions for villas, apartments & commercial spaces. 10+ years of excellence.
                            </p>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                {[
                                    { icon: Shield, text: "10+ Years Experience" },
                                    { icon: Award, text: "500+ Projects" },
                                    { icon: Clock, text: "On-Time Delivery" },
                                ].map((badge, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <badge.icon size={16} className="text-gold" />
                                        <span className="text-sm font-medium">{badge.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Links */}
                            <div className="flex flex-wrap gap-3 pt-6">
                                <Link href="/portfolio" className="flex items-center gap-2 bg-transparent border border-white/30 hover:border-gold hover:text-gold px-6 py-3 rounded-sm font-bold text-sm tracking-wider transition-all">
                                    VIEW PORTFOLIO <ArrowRight size={16} />
                                </Link>
                                <Link href="/contact" className="flex items-center gap-2 bg-transparent border border-white/30 hover:border-gold hover:text-gold px-6 py-3 rounded-sm font-bold text-sm tracking-wider transition-all">
                                    CONTACT US <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* Right - Lead Form */}
                        <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-md mx-auto lg:mx-0 lg:ml-auto text-dark">
                            {submitted ? (
                                <div className="text-center py-8">
                                    <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
                                    <h3 className="text-2xl font-serif font-bold text-dark mb-2">Thank You!</h3>
                                    <p className="text-dark/60 mb-6">Our design expert will call you within 2 hours.</p>
                                    <a href="tel:+919100222233" className="inline-flex items-center gap-2 bg-gold text-white px-8 py-3 rounded-sm font-bold">
                                        <Phone size={18} /> CALL NOW
                                    </a>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-serif font-bold text-dark">Get Free Consultation</h2>
                                        <p className="text-dark/60 text-sm mt-1">Fill the form & get a callback in 2 hours</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input type="text" required placeholder="Your Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors bg-white text-dark placeholder-dark/40" />
                                        <input type="tel" required placeholder="Phone Number *" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors bg-white text-dark placeholder-dark/40" />
                                        <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors bg-white text-dark placeholder-dark/40" />
                                        <select value={formData.propertyType} onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })} className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors text-dark bg-white">
                                            <option value="">Property Type</option>
                                            <option value="villa">Villa / Independent House</option>
                                            <option value="apartment">Apartment / Flat</option>
                                            <option value="penthouse">Penthouse</option>
                                            <option value="commercial">Commercial / Office</option>
                                        </select>
                                        <select value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors text-dark bg-white">
                                            <option value="">Budget Range</option>
                                            <option value="50-75">₹50 Lakhs - ₹75 Lakhs</option>
                                            <option value="75-100">₹75 Lakhs - ₹1 Crore</option>
                                            <option value="100-150">₹1 Crore - ₹1.5 Crores</option>
                                            <option value="150+">₹1.5 Crores+</option>
                                        </select>
                                        <textarea rows={2} placeholder="Tell us about your project" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none bg-white text-dark placeholder-dark/40" />
                                        {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gold hover:bg-gold-light text-white py-4 rounded-sm font-bold tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" /> SENDING...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} /> BOOK CONSULTATION NOW
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <p className="text-center text-xs text-dark/40 mt-4">
                                        🔒 Your information is 100% secure
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Quick Stats */}
            <section className="py-12 bg-gold">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    {[
                        { num: "10+", label: "Years Experience" },
                        { num: "500+", label: "Projects Delivered" },
                        { num: "₹50L", label: "Min. Project Value" },
                        { num: "100%", label: "Client Satisfaction" },
                    ].map((stat, i) => (
                        <div key={i}>
                            <p className="text-3xl md:text-4xl font-serif font-bold">{stat.num}</p>
                            <p className="text-white/80 text-sm uppercase tracking-wider mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section className="py-16 md:py-24 bg-white text-dark">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-gold uppercase tracking-widest font-bold text-sm">What We Offer</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mt-2">Complete Turnkey Solutions</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "🏡", title: "Residential Design", desc: "Villas, Apartments, Penthouses" },
                            { icon: "🏢", title: "Commercial Design", desc: "Offices, Retail, Restaurants" },
                            { icon: "🛋️", title: "Custom Furniture", desc: "Modular Kitchen & Wardrobes" },
                            { icon: "🎨", title: "3D Visualization", desc: "See Before You Build" },
                        ].map((service, i) => (
                            <div key={i} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-xl transition-all">
                                <span className="text-4xl">{service.icon}</span>
                                <h3 className="text-lg font-bold text-dark mt-4">{service.title}</h3>
                                <p className="text-dark/60 text-sm mt-2">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Preview */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-gold uppercase tracking-widest font-bold text-sm">Our Work</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark mt-2">Featured Projects</h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {["/images/hero-1.png", "/images/hero-2.png", "/images/hero-3.png", "/images/p-1.png"].map((img, i) => (
                            <div key={i} className="aspect-square overflow-hidden rounded-lg">
                                <img src={img} alt={`Project ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/portfolio" className="inline-flex items-center gap-2 bg-dark hover:bg-dark-light text-white px-8 py-4 rounded-sm font-bold tracking-wider transition-all">
                            VIEW ALL PROJECTS <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 md:py-24 bg-dark text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-gold uppercase tracking-widest font-bold text-sm">Client Love</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">What Clients Say</h2>
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <div className="flex text-gold">{"★★★★★".split("").map((s, i) => <span key={i} className="text-xl">{s}</span>)}</div>
                            <span className="text-white/60">5.0 on Google</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: "Rajesh Kumar", loc: "Jubilee Hills", text: "Absolutely stunning work! Transformed our villa into a masterpiece." },
                            { name: "Priya Sharma", loc: "Gachibowli", text: "Best interior designers in Hyderabad! Understood our vision perfectly." },
                            { name: "Venkat Reddy", loc: "Banjara Hills", text: "Premium quality and exceptional service. Worth every rupee!" },
                        ].map((t, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
                                <div className="flex text-gold mb-3">{"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}</div>
                                <p className="text-white/80 italic mb-4">"{t.text}"</p>
                                <p className="font-bold">{t.name}</p>
                                <p className="text-white/50 text-sm">{t.loc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <a href="https://share.google/jJ8XfD2jOpqQq2JRv" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light font-bold text-sm tracking-wider">
                            VIEW ALL GOOGLE REVIEWS →
                        </a>
                    </div>
                </div>
            </section>

            {/* Areas Served */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-dark/60 mb-4">Serving Clients Across India</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {["Hyderabad", "Jubilee Hills", "Banjara Hills", "Gachibowli", "HITEC City", "Bangalore", "Mumbai", "Delhi NCR"].map((city, i) => (
                            <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">{city}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-24 bg-gold text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">Ready to Transform Your Space?</h2>
                    <p className="text-white/80 text-lg mb-8">Get a free consultation. Min. project value ₹50 Lakhs.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={openModal} className="bg-white text-gold hover:bg-white/90 px-8 py-4 rounded-sm font-bold text-lg tracking-wider transition-all flex items-center justify-center gap-2">
                            <Phone size={20} /> BOOK CONSULTATION NOW
                        </button>
                        <a href="https://wa.me/919100222233?text=Hi,%20I'm%20interested%20in%20your%20interior%20design%20services." target="_blank" rel="noopener noreferrer" className="border border-white/40 hover:bg-white/10 px-8 py-4 rounded-sm font-bold text-lg tracking-wider transition-all">
                            WHATSAPP US
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer Links */}
            <section className="py-8 bg-dark border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-white">
                            <span className="text-gold font-serif font-bold text-xl">D'INTERIO</span>
                            <span className="text-white/40 text-xs ml-2">Design Studio</span>
                        </div>
                        <div className="flex flex-wrap gap-6 text-white/60 text-sm">
                            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                            <Link href="/about" className="hover:text-gold transition-colors">About</Link>
                            <Link href="/services" className="hover:text-gold transition-colors">Services</Link>
                            <Link href="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link>
                            <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
                            <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 text-white/60 text-sm">
                                <a href="tel:+919100222233" className="flex items-center gap-1 hover:text-gold"><Phone size={14} /> +91 9100222233</a>
                                <a href="mailto:support@dinterio.in" className="flex items-center gap-1 hover:text-gold"><Mail size={14} /> support@dinterio.in</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <a href="https://www.youtube.com/@dinteriodesignstudio" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
                                    <Youtube size={16} />
                                </a>
                                <a href="https://www.instagram.com/dinterio" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
                                    <Instagram size={16} />
                                </a>
                                <a href="https://www.facebook.com/dinterio" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
                                    <Facebook size={16} />
                                </a>
                                <a href="https://www.linkedin.com/company/dinterio" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors">
                                    <Linkedin size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
