"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const slides = [
    {
        image: "/images/hero-1.png",
        title: "Bespoke Luxury Interiors",
        subtitle: "Premium turnkey projects starting at ₹50 Lakhs across India.",
    },
    {
        image: "/images/hero-2.png",
        title: "Masterful Execution",
        subtitle: "End-to-end turnkey solutions for ultra-premium residences.",
    },
    {
        image: "/images/hero-3.png",
        title: "Elevated Living",
        subtitle: "Hyderabad's leading luxury interior studio. Projects PAN India.",
    },
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            {/* Image Slider */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[current].image}
                        alt={slides[current].title}
                        fill
                        className="object-cover brightness-[0.4]"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center text-center px-4 pt-16 md:pt-0">
                <div className="max-w-4xl">
                    <motion.div
                        key={`content-${current}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <span className="text-gold uppercase tracking-[0.2em] md:tracking-[0.4em] font-medium text-[10px] md:text-sm mb-4 block">
                            Luxury Turnkey Interiors • Min. ₹50 Lakhs
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
                            {slides[current].title}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 md:mb-10 font-light max-w-2xl mx-auto px-2">
                            {slides[current].subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                            <Link href="/portfolio" className="w-full sm:w-auto bg-gold hover:bg-gold-light text-white px-6 md:px-10 py-3 md:py-4 rounded-sm font-bold text-sm md:text-base tracking-wider md:tracking-widest transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                                EXPLORE PROJECTS <ArrowRight size={18} />
                            </Link>
                            <Link href="/contact" className="w-full sm:w-auto border border-white/30 hover:border-gold text-white px-6 md:px-10 py-3 md:py-4 rounded-sm font-bold text-sm md:text-base tracking-wider md:tracking-widest transition-all duration-300 backdrop-blur-sm">
                                GET A QUOTE
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 transition-all duration-500 rounded-full ${current === i ? "w-10 bg-gold" : "w-4 bg-white/30"
                            }`}
                    />
                ))}
            </div>

            {/* Floating Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-12 right-12 z-20 hidden md:block"
            >
                <div className="flex flex-col items-center gap-4">
                    <span className="text-[10px] text-white/50 uppercase tracking-[0.3em] rotate-90 origin-right translate-x-3 mb-10">
                        Scroll to explore
                    </span>
                    <div className="w-[1px] h-20 bg-gradient-to-b from-white/50 to-transparent" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
