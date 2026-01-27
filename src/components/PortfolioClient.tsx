"use client";

import Link from "next/link";
import { useState } from "react";
import { useBlog } from "@/lib/BlogContext";
import { Lock, Archive, ChevronDown, ChevronUp, MapPin } from "lucide-react";

export default function PortfolioClient() {
    const { getActiveProjects, getArchivedProjects, isAdmin } = useBlog();
    const [showArchived, setShowArchived] = useState(false);

    const activeProjects = getActiveProjects();
    const archivedProjects = getArchivedProjects();

    return (
        <div className="pt-32 pb-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-gold uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold text-xs md:text-sm mb-2 block">
                        Our Work
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-dark">
                        Project Portfolio
                    </h1>
                    <p className="mt-4 text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-base px-4">
                        Explore our luxury turnkey interior projects across India. Minimum project value ₹50,00,000.
                    </p>
                </div>

                {/* Admin Link */}
                <div className="flex justify-center mb-8">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 border border-dark/20 hover:border-gold text-dark hover:text-gold px-6 py-3 rounded-sm font-bold text-sm tracking-wider transition-all"
                    >
                        <Lock size={16} /> {isAdmin ? "ADMIN DASHBOARD" : "ADMIN LOGIN"}
                    </Link>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {activeProjects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/portfolio/${project.slug}`}
                            className="group block"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                                <img
                                    src={project.mainImage}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                                    <span className="text-white font-bold tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white px-6 py-2">
                                        VIEW PROJECT
                                    </span>
                                </div>
                            </div>
                            <div>
                                <span className="text-gold text-xs uppercase tracking-widest mb-2 block flex items-center gap-1">
                                    <MapPin size={12} /> {project.location}
                                </span>
                                <h2 className="text-lg md:text-xl font-serif font-bold text-dark group-hover:text-gold transition-colors duration-300">
                                    {project.name}
                                </h2>
                                <p className="text-foreground/60 text-sm mt-2 line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="mt-3">
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-xs text-foreground/70 rounded-full">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Archived Section */}
                {archivedProjects.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-gray-200">
                        <button
                            onClick={() => setShowArchived(!showArchived)}
                            className="flex items-center gap-2 text-foreground/60 hover:text-gold transition-colors mb-8"
                        >
                            <Archive size={20} />
                            <span className="font-bold uppercase tracking-widest text-sm">
                                Archived Projects ({archivedProjects.length})
                            </span>
                            {showArchived ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>

                        {showArchived && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {archivedProjects.map((project) => (
                                    <div key={project.id} className="opacity-60 hover:opacity-100 transition-opacity">
                                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4 grayscale">
                                            <img
                                                src={project.mainImage}
                                                alt={project.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="text-foreground/40 text-xs uppercase tracking-widest mb-2 block">
                                            {project.location} • Archived
                                        </span>
                                        <h3 className="text-lg font-serif font-bold text-dark">
                                            {project.name}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
