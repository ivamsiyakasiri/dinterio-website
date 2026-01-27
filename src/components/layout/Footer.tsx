import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-20 pb-10 border-t border-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/">
                            <img
                                src="/images/logo-footer.png"
                                alt="Dinterio Design Studio"
                                className="h-24 w-auto"
                            />
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Premium turnkey luxury interiors for discerning clients. Minimum project value ₹50,00,000. Serving Hyderabad, Bangalore, Mumbai & across India.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { Icon: Instagram, href: "https://www.instagram.com/dinterio" },
                                { Icon: Facebook, href: "https://www.facebook.com/dinterio" },
                                { Icon: Linkedin, href: "https://www.linkedin.com/company/dinterio" },
                                { Icon: Youtube, href: "https://www.youtube.com/@dinteriodesignstudio" },
                                { Icon: Twitter, href: "https://twitter.com/dinterio" }
                            ].map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-full hover:border-gold hover:text-gold transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-gold font-serif font-bold text-lg mb-8 uppercase tracking-widest">
                            Quick Links
                        </h4>
                        <ul className="space-y-4 text-white/60">
                            {[
                                { name: "Home", href: "/" },
                                { name: "About Us", href: "/about" },
                                { name: "Services", href: "/services" },
                                { name: "Portfolio", href: "/portfolio" },
                                { name: "Blog", href: "/blog" },
                                { name: "Contact Us", href: "/contact" },
                                { name: "Get Free Quote", href: "/landing" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="hover:text-gold transition-colors duration-200">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services - Pan India (Geo-SEO) */}
                    <div>
                        <h4 className="text-gold font-serif font-bold text-lg mb-8 uppercase tracking-widest">
                            We Serve
                        </h4>
                        <ul className="space-y-4 text-white/60">
                            {["Luxury Interiors Hyderabad", "Premium Homes Bangalore", "High-End Villas Mumbai", "Turnkey Projects Delhi NCR", "Bespoke Interiors Chennai", "Projects Across India"].map((area) => (
                                <li key={area}>
                                    <Link href="#" className="hover:text-gold transition-colors duration-200 decoration-gold/30 hover:underline">
                                        {area}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-gold font-serif font-bold text-lg mb-8 uppercase tracking-widest">
                            Get in Touch
                        </h4>
                        <div className="space-y-6 text-white/60">
                            <div className="flex items-start space-x-3">
                                <MapPin className="text-gold mt-1 shrink-0" size={20} />
                                <p>303, Kochar Towers, Begumpet,<br />Hyderabad, Telangana INDIA 500016</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="text-gold shrink-0" size={20} />
                                <a href="tel:+919100222233" className="hover:text-gold transition-colors">+91 9100222233</a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="text-gold shrink-0" size={20} />
                                <p>support@dinterio.in</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 py-6 border-t border-white/10 text-center">
                    <p className="text-gold font-bold tracking-widest text-sm mb-2">MINIMUM PROJECT VALUE: ₹50,00,000</p>
                    <p className="text-white/40 text-xs tracking-wide">End-to-End Luxury Turnkey Interiors</p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 uppercase tracking-[0.2em]">
                    <p>© 2026 Dinterio Design Studio. All Rights Reserved.</p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <Link href="#" className="hover:text-gold">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gold">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
