"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useBlog } from "@/lib/BlogContext";
import { ArrowLeft, MapPin, Grid3X3, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ProjectDetailPage() {
    const params = useParams();
    const { getProjectBySlug } = useBlog();
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const project = getProjectBySlug(params.slug as string);

    if (!project) {
        return (
            <div className="pt-32 pb-24 text-center">
                <h1 className="text-3xl font-serif font-bold text-dark mb-4">Project Not Found</h1>
                <Link href="/portfolio" className="text-gold hover:text-gold-light font-bold">
                    ← Back to Portfolio
                </Link>
            </div>
        );
    }

    const nextImage = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % project.images.length);
        }
    };

    const prevImage = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage - 1 + project.images.length) % project.images.length);
        }
    };

    return (
        <div className="pt-32 pb-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-dark/60 hover:text-gold font-bold text-sm tracking-wider mb-8 transition-colors"
                >
                    <ArrowLeft size={18} /> BACK TO PORTFOLIO
                </Link>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                    {/* Main Image */}
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                        <img
                            src={project.mainImage}
                            alt={project.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Project Info */}
                    <div className="flex flex-col justify-center">
                        <span className="text-gold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                            <MapPin size={14} /> {project.location}
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-dark mb-4">
                            {project.name}
                        </h1>
                        <p className="text-dark/60 text-base md:text-lg leading-relaxed mb-6">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-3 mb-8">
                            <span className="px-4 py-2 bg-gold/10 text-gold text-sm font-bold rounded-sm">
                                {project.category}
                            </span>
                            <span className="px-4 py-2 bg-gray-100 text-dark/70 text-sm font-medium rounded-sm flex items-center gap-2">
                                <Grid3X3 size={14} /> {project.images.length} Photos
                            </span>
                        </div>
                        <Link
                            href="/contact"
                            className="inline-block w-fit bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-sm font-bold tracking-widest transition-all text-sm"
                        >
                            START YOUR PROJECT
                        </Link>
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="border-t border-gray-100 pt-12">
                    <h2 className="text-2xl font-serif font-bold text-dark mb-8 flex items-center gap-3">
                        <Grid3X3 size={24} className="text-gold" /> Project Gallery
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {project.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className="relative aspect-square rounded-sm overflow-hidden group cursor-pointer"
                            >
                                <img
                                    src={image}
                                    alt={`${project.name} - Image ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                    <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Lightbox */}
                {selectedImage !== null && (
                    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={48} />
                        </button>
                        <img
                            src={project.images[selectedImage]}
                            alt={`${project.name} - Image ${selectedImage + 1}`}
                            className="max-h-[80vh] max-w-[90vw] object-contain"
                        />
                        <button
                            onClick={nextImage}
                            className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors"
                        >
                            <ChevronRight size={48} />
                        </button>
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                            {selectedImage + 1} / {project.images.length}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-16 p-8 md:p-12 bg-dark rounded-lg text-center">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                        Want a Similar Project?
                    </h2>
                    <p className="text-white/60 mb-6 text-sm md:text-base">
                        Get in touch with us to discuss your luxury interior project. Minimum value ₹50,00,000.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-sm font-bold tracking-widest transition-all text-sm"
                    >
                        GET A FREE CONSULTATION
                    </Link>
                </div>
            </div>
        </div>
    );
}
