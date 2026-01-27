import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
    title: "Contact Us | D'Interio Design Studio | Luxury Turnkey Interiors",
    description: "Get in touch with D'Interio Design Studio for luxury interior design services. Minimum project value ₹50 Lakhs. Contact us for a free consultation.",
};

export default function ContactPage() {
    return (
        <div className="pt-32 pb-24">
            {/* Hero Section */}
            <section className="bg-dark text-white py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="text-gold uppercase tracking-[0.3em] font-semibold text-xs md:text-sm mb-4 block">
                            Get In Touch
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                            Let's Create Something Beautiful Together
                        </h1>
                        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                            Ready to transform your space? Contact us for a free consultation. We specialize in luxury turnkey interiors with a minimum project value of <span className="text-gold font-bold">₹50,00,000</span>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Side - Info & Image */}
                        <div className="space-y-8">
                            {/* Image */}
                            <div className="relative">
                                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold z-10" />
                                <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/hero-2.png"
                                        alt="D'Interio Design Studio"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold z-10" />
                            </div>

                            {/* Why Contact Us */}
                            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                                <h2 className="text-xl md:text-2xl font-serif font-bold text-dark mb-4">
                                    Why Choose D'Interio?
                                </h2>
                                <ul className="space-y-3 text-dark/70">
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="w-2 h-2 bg-gold rounded-full" />
                                        </span>
                                        <span>10+ years of experience in luxury interior design</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="w-2 h-2 bg-gold rounded-full" />
                                        </span>
                                        <span>Complete end-to-end turnkey solutions</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="w-2 h-2 bg-gold rounded-full" />
                                        </span>
                                        <span>Premium materials and expert craftsmanship</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="w-2 h-2 bg-gold rounded-full" />
                                        </span>
                                        <span>Projects across India — Hyderabad, Bangalore, Mumbai & more</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-dark text-white p-6 md:p-8 rounded-lg">
                                <h2 className="text-xl font-serif font-bold mb-6 text-gold">Contact Information</h2>
                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="text-gold shrink-0 mt-1" size={22} />
                                        <div>
                                            <p className="font-bold mb-1">Studio Address</p>
                                            <p className="text-white/60 text-sm">
                                                303, Kochar Towers, Begumpet,<br />
                                                Hyderabad, Telangana INDIA 500016
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="text-gold shrink-0 mt-1" size={22} />
                                        <div>
                                            <p className="font-bold mb-1">Phone</p>
                                            <a href="tel:+919100222233" className="text-white/60 hover:text-gold transition-colors text-sm">
                                                +91 9100222233
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Mail className="text-gold shrink-0 mt-1" size={22} />
                                        <div>
                                            <p className="font-bold mb-1">Email</p>
                                            <a href="mailto:support@dinterio.in" className="text-white/60 hover:text-gold transition-colors text-sm">
                                                support@dinterio.in
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MessageCircle className="text-gold shrink-0 mt-1" size={22} />
                                        <div>
                                            <p className="font-bold mb-1">WhatsApp</p>
                                            <a
                                                href="https://wa.me/919100222233?text=Hi,%20I'm%20interested%20in%20your%20luxury%20interior%20design%20services."
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white/60 hover:text-gold transition-colors text-sm"
                                            >
                                                Chat with us on WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Clock className="text-gold shrink-0 mt-1" size={22} />
                                        <div>
                                            <p className="font-bold mb-1">Working Hours</p>
                                            <p className="text-white/60 text-sm">
                                                Mon - Fri: 10:00 AM - 6:00 PM<br />
                                                Saturday: 11:00 AM - 4:00 PM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div>
                            <ContactForm
                                title="Request a Free Consultation"
                                subtitle="Share your project details and we'll get back to you within 24 hours."
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section (Optional placeholder) */}
            <section className="bg-dark py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-white/60 text-sm mb-4">
                        Visit our studio in Begumpet, Hyderabad
                    </p>
                    <a
                        href="https://www.google.com/maps/place/D'Interio+Interior+Designers+In+Hyderabad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-bold text-sm tracking-wider transition-colors"
                    >
                        <MapPin size={18} /> OPEN IN GOOGLE MAPS
                    </a>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 bg-gold text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4">
                        Premium Interiors Start at ₹50 Lakhs
                    </h2>
                    <p className="text-white/80 text-sm md:text-base mb-6">
                        We take up projects across India — Hyderabad, Bangalore, Mumbai, Delhi & more.
                    </p>
                    <a
                        href="tel:+919100222233"
                        className="inline-block bg-white text-gold hover:bg-white/90 px-8 md:px-12 py-3 md:py-4 rounded-sm font-bold text-sm md:text-base tracking-wider transition-all"
                    >
                        CALL US NOW: +91 9100222233
                    </a>
                </div>
            </section>
        </div>
    );
}
