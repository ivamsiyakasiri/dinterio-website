import { Metadata } from "next";
import Link from "next/link";
import { Home, Building2, Armchair, Palette, Ruler, Hammer, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Our Services | D'Interio Design Studio | Luxury Turnkey Interiors",
    description: "Explore D'Interio's luxury interior design services: Residential Design, Commercial Design, Villa Interiors, Apartment Design, Turnkey Solutions & more. Minimum project value ₹50 Lakhs.",
};

const services = [
    {
        icon: Home,
        title: "Residential Interior Design",
        desc: "Transform your home into a sanctuary of luxury and comfort. From villas in Jubilee Hills to apartments in Gachibowli, we create bespoke living spaces that reflect your personality.",
        features: ["Living & Dining Areas", "Bedrooms & Wardrobes", "Kitchen Design", "Bathroom Design"],
    },
    {
        icon: Building2,
        title: "Commercial Interior Design",
        desc: "Elevate your business environment with stunning commercial spaces. We design offices, retail stores, restaurants, and hospitality spaces that leave lasting impressions.",
        features: ["Corporate Offices", "Retail Spaces", "Restaurants & Cafes", "Hospitality"],
    },
    {
        icon: Armchair,
        title: "Custom Furniture Design",
        desc: "Exclusive furniture pieces designed and crafted to your exact specifications. From modular kitchens to bespoke wardrobes, every piece is a work of art.",
        features: ["Modular Kitchens", "Custom Wardrobes", "Living Room Furniture", "Entertainment Units"],
    },
    {
        icon: Palette,
        title: "Design Consultation",
        desc: "Not ready for a full project? Our expert consultants can guide you on color schemes, material selection, space planning, and design direction.",
        features: ["Color Consultation", "Material Selection", "Space Planning", "Design Direction"],
    },
    {
        icon: Ruler,
        title: "Space Planning & Visualization",
        desc: "See your space before it's built. Our advanced 3D visualization and detailed space planning helps you make informed decisions.",
        features: ["3D Walkthrough", "2D/3D Floor Plans", "Material Boards", "Virtual Reality Tours"],
    },
    {
        icon: Hammer,
        title: "Turnkey Project Execution",
        desc: "Complete end-to-end interior solutions. From design to execution, we manage everything so you can enjoy a hassle-free transformation.",
        features: ["Project Management", "Contractor Coordination", "Quality Assurance", "On-Time Delivery"],
    },
];

export default function ServicesPage() {
    return (
        <div className="pt-32 pb-24">
            {/* Hero Section */}
            <section className="bg-dark text-white py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="text-gold uppercase tracking-[0.3em] font-semibold text-xs md:text-sm mb-4 block">
                            Our Services
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                            Premium Turnkey Interior Solutions
                        </h1>
                        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
                            From concept to completion, we offer comprehensive interior design and execution services. Minimum project value <span className="text-gold font-bold">₹50,00,000</span>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <div
                                key={i}
                                className="group p-8 border border-gray-100 hover:border-gold/30 hover:shadow-2xl transition-all duration-500 rounded-lg bg-white"
                            >
                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-500 text-gold">
                                    <service.icon size={32} />
                                </div>
                                <h3 className="text-xl font-serif font-bold mb-4 text-dark group-hover:text-gold transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-foreground/60 leading-relaxed text-sm mb-6">
                                    {service.desc}
                                </p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-foreground/70">
                                            <CheckCircle size={14} className="text-gold shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-gold uppercase tracking-[0.3em] font-semibold text-xs md:text-sm mb-2 block">
                            How We Work
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-dark">
                            Our Design Process
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Consultation", desc: "We discuss your vision, requirements, and budget to understand your unique needs." },
                            { step: "02", title: "Design", desc: "Our team creates detailed 3D visualizations and design concepts for your approval." },
                            { step: "03", title: "Execution", desc: "Skilled craftsmen bring the design to life with precision and attention to detail." },
                            { step: "04", title: "Handover", desc: "We deliver a fully finished space that exceeds your expectations." },
                        ].map((phase, i) => (
                            <div key={i} className="text-center p-6">
                                <div className="text-5xl md:text-6xl font-serif font-bold text-gold/20 mb-4">
                                    {phase.step}
                                </div>
                                <h3 className="text-lg font-serif font-bold mb-3 text-dark">{phase.title}</h3>
                                <p className="text-foreground/60 text-sm leading-relaxed">{phase.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Areas We Serve */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-gold uppercase tracking-[0.3em] font-semibold text-xs md:text-sm mb-2 block">
                            Pan India
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark">
                            Areas We Serve
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            "Hyderabad", "Jubilee Hills", "Banjara Hills", "Gachibowli", "HITEC City",
                            "Bangalore", "Mumbai", "Delhi NCR", "Chennai", "Pune"
                        ].map((area, i) => (
                            <span
                                key={i}
                                className="px-6 py-3 bg-gray-50 hover:bg-gold hover:text-white text-sm font-medium rounded-full transition-all duration-300 cursor-pointer"
                            >
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-gold text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">
                        Let's Create Something Beautiful Together
                    </h2>
                    <p className="text-white/80 text-sm md:text-lg mb-8 font-light">
                        Ready to transform your space? Contact us for a consultation. Minimum project value ₹50,00,000.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-white text-gold hover:bg-white/90 px-8 md:px-12 py-3 md:py-4 rounded-sm font-bold text-sm md:text-base tracking-wider transition-all duration-300"
                        >
                            BOOK CONSULTATION
                        </Link>
                        <a
                            href="tel:+919100222233"
                            className="border border-white/40 hover:bg-white/10 px-8 md:px-12 py-3 md:py-4 rounded-sm font-bold text-sm md:text-base tracking-wider transition-all duration-300"
                        >
                            CALL NOW
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
