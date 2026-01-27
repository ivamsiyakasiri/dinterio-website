"use client";

import Hero from "@/components/home/Hero";
import Link from "next/link";
import Image from "next/image";
import { Hammer, Paintbrush, Ruler, ShieldCheck } from "lucide-react";
import { useModal } from "@/lib/ModalContext";

export default function HomeClient() {
    const { openModal } = useModal();
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />

            {/* Services Section */}
            <section className="py-24 bg-white text-dark px-4 h-full">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-gold uppercase tracking-[0.3em] font-semibold text-sm mb-2 block">
                            Our Expertise
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark">
                            Turnkey Interior Solutions
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Interior Design",
                                desc: "Bespoke 3D designs that blend luxury with functionality.",
                                icon: Ruler,
                            },
                            {
                                title: "Execution",
                                desc: "Flawless on-site execution managed by expert supervisors.",
                                icon: Hammer,
                            },
                            {
                                title: "Custom Furniture",
                                desc: "Premium modular and loose furniture crafted to perfection.",
                                icon: Paintbrush,
                            },
                            {
                                title: "Quality Promise",
                                desc: "Rigorous quality checks and durable materials for longevity.",
                                icon: ShieldCheck,
                            },
                        ].map((service, i) => (
                            <div
                                key={i}
                                className="group p-8 border border-gray-100 hover:border-gold/30 hover:shadow-2xl transition-all duration-500 rounded-lg text-center bg-gray-50/50"
                            >
                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-500">
                                    <service.icon size={30} />
                                </div>
                                <h3 className="text-xl font-serif font-bold mb-4 text-dark">{service.title}</h3>
                                <p className="text-dark/60 leading-relaxed text-sm">
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section with Image */}
            <section className="py-24 bg-dark text-white overflow-hidden h-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold z-10" />
                            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/hero-1.png"
                                    alt="Luxury turnkey interiors by Dinterio Design Studio Hyderabad"
                                    fill
                                    className="object-cover opacity-90 transition-transform duration-700 hover:scale-110"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold z-10" />
                        </div>

                        <div className="lg:w-1/2 space-y-8">
                            <span className="text-gold uppercase tracking-[0.4em] font-bold text-sm">
                                About Dinterio
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                                Ultra-Premium Turnkey Interiors • Min. ₹50 Lakhs
                            </h2>
                            <p className="text-white/70 text-lg leading-relaxed font-light">
                                Dinterio Design Studio specializes in complete end-to-end luxury turnkey interior solutions for discerning clients who demand the best. We take up projects with a minimum value of <span className="text-gold font-bold">₹50,00,000</span> to ensure an uncompromising level of quality and craftsmanship.
                            </p>
                            <p className="text-white/70 text-lg leading-relaxed font-light">
                                Based in Hyderabad, we proudly serve clients across India — from Bangalore and Mumbai to Delhi NCR and Chennai. Our expert team delivers flawless execution, premium materials, and timeless designs.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-6">
                                <div>
                                    <h4 className="text-3xl font-serif font-bold text-gold">10+</h4>
                                    <p className="text-white/50 uppercase tracking-widest text-xs mt-1">Years Experience</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-serif font-bold text-gold">500+</h4>
                                    <p className="text-white/50 uppercase tracking-widest text-xs mt-1">Projects Delivered</p>
                                </div>
                            </div>
                            <Link href="/services" className="inline-block bg-gold hover:bg-gold-light text-white px-10 py-4 rounded-sm font-bold tracking-widest transition-all duration-300 mt-4 text-center">
                                LEARN MORE
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Showcase Section */}
            <section className="py-16 md:py-24 bg-white h-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <span className="text-gold uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold text-xs md:text-sm mb-2 block">
                            Watch Our Work
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-dark">
                            Completed Project Videos
                        </h2>
                        <p className="mt-4 text-dark/60 max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-base px-4">
                            Experience our craftsmanship through these video walkthroughs of our recently completed interior projects.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            { id: "SVgHUpbTQPw", title: "Luxury Villa Interior" },
                            { id: "ilSMEN0DLjs", title: "Modern Home Design" },
                            { id: "W_YMyqwXDUw", title: "Premium Villa" },
                        ].map((video, i) => (
                            <div key={i} className="group">
                                <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${video.id}`}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                                <h3 className="mt-4 text-lg font-serif font-bold text-dark group-hover:text-gold transition-colors">
                                    {video.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Google Reviews Section */}
            <section className="py-16 md:py-24 bg-white h-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <span className="text-gold uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold text-xs md:text-sm mb-2 block">
                            Client Testimonials
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-dark">
                            What Our Clients Say
                        </h2>
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <div className="flex text-gold">
                                {"★★★★★".split("").map((star, i) => (
                                    <span key={i} className="text-2xl">{star}</span>
                                ))}
                            </div>
                            <span className="text-dark/60 font-medium">5.0 Rating on Google</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                name: "Rajesh Kumar",
                                location: "Jubilee Hills, Hyderabad",
                                review: "Absolutely stunning work! D'Interio transformed our villa into a masterpiece. The attention to detail and quality of materials exceeded our expectations. Timely completion and professional team.",
                            },
                            {
                                name: "Priya Sharma",
                                location: "Gachibowli, Hyderabad",
                                review: "Best interior designers in Hyderabad! They understood our vision perfectly and delivered a beautiful, functional space. The 3D visualization helped us make perfect decisions.",
                            },
                            {
                                name: "Venkat Reddy",
                                location: "Banjara Hills, Hyderabad",
                                review: "Premium quality work and exceptional service. From design to execution, everything was handled professionally. Our penthouse looks luxurious and elegant. Worth every rupee!",
                            },
                            {
                                name: "Anitha Rao",
                                location: "HITEC City, Hyderabad",
                                review: "D'Interio delivered our office interiors on time with impeccable quality. The modern design has impressed all our clients and employees. Truly turnkey solution!",
                            },
                            {
                                name: "Suresh Babu",
                                location: "Madhapur, Hyderabad",
                                review: "Unique and elegant designs! The team was very responsive and friendly throughout the project. They used premium materials and the finishing is top-notch.",
                            },
                            {
                                name: "Lakshmi Devi",
                                location: "Kondapur, Hyderabad",
                                review: "Exceptional craftsmanship and customer service. They completed our 4BHK apartment beautifully within the promised timeline. The modular kitchen is amazing!",
                            },
                        ].map((testimonial, i) => (
                            <div key={i} className="bg-gray-50 p-6 md:p-8 rounded-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex text-gold mb-4">
                                    {"★★★★★".split("").map((star, j) => (
                                        <span key={j} className="text-lg">{star}</span>
                                    ))}
                                </div>
                                <p className="text-dark/70 text-sm leading-relaxed mb-6 italic">"{testimonial.review}"</p>
                                <div className="border-t border-gray-200 pt-4">
                                    <p className="font-bold text-dark">{testimonial.name}</p>
                                    <p className="text-xs text-dark/50">{testimonial.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <a
                            href="https://share.google/jJ8XfD2jOpqQq2JRv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white border border-gray-200 hover:border-gold px-8 py-4 rounded-sm font-bold text-sm tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            VIEW ALL GOOGLE REVIEWS
                        </a>
                    </div>
                </div>
            </section>
            {/* Portfolio/Gallery Section */}
            <section className="py-24 bg-gray-50 h-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <span className="text-gold uppercase tracking-[0.3em] font-semibold text-sm mb-2 block text-center md:text-left">
                                Our Showcase
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark text-center md:text-left">
                                Design Masterpieces across Hyderabad
                            </h2>
                        </div>
                        <Link href="/portfolio" className="text-gold font-bold tracking-widest text-sm border-b-2 border-gold pb-1 hover:text-gold-light hover:border-gold-light transition-all duration-300 mx-auto md:mx-0">
                            VIEW ALL PROJECTS
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Luxe Villa", area: "Jubilee Hills", img: "/images/hero-1.png" },
                            { title: "Modern Penthouse", area: "Banjara Hills", img: "/images/p-2.png" },
                            { title: "Smart Apartment", area: "Gachibowli", img: "/images/hero-2.png" },
                            { title: "Premium Wardrobe", area: "Tellapur", img: "/images/p-1.png" },
                            { title: "Royal Suite", area: "HITEC City", img: "/images/hero-3.png" },
                            { title: "Minimalist Studio", area: "Madhapur", img: "/images/p-2.png" },
                        ].map((project, i) => (
                            <div
                                key={i}
                                className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer"
                            >
                                <Image
                                    src={project.img}
                                    alt={`${project.title} in ${project.area} - Premium Interior Design by Dinterio`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <span className="text-gold text-xs uppercase tracking-[0.2em] mb-2">
                                        {project.area}
                                    </span >
                                    <h4 className="text-2xl font-serif font-bold text-white">
                                        {project.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-gold text-white text-center h-full">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 md:mb-8">
                        Ready to Build Your Luxury Home?
                    </h2>
                    <p className="text-white/80 text-sm md:text-lg mb-8 md:mb-12 font-light tracking-wide px-2">
                        Partner with India's leading turnkey interior experts. Let's create a space that tells your story.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                        <button
                            onClick={openModal}
                            className="w-full sm:w-auto bg-white text-gold hover:bg-white/90 px-8 md:px-12 py-3 md:py-4 rounded-sm font-bold text-sm md:text-base tracking-wider md:tracking-widest transition-all duration-300 shadow-xl"
                        >
                            BOOK CONSULTATION NOW
                        </button>
                        <a
                            href="/dinterio-luxury-brochure.pdf"
                            download
                            className="w-full sm:w-auto border border-white/40 hover:bg-white/10 px-8 md:px-12 py-3 md:py-4 rounded-sm font-bold text-sm md:text-base tracking-wider md:tracking-widest transition-all duration-300 flex items-center justify-center"
                        >
                            DOWNLOAD BROCHURE
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
