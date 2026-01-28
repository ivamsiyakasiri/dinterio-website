"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useBlog } from "@/lib/BlogContext";
import { Lock, Send, Archive, ChevronDown, ChevronUp, Image as ImageIcon, Upload, X } from "lucide-react";

export default function BlogClient() {
    const { getApprovedBlogs, getArchivedBlogs, addBlog } = useBlog();
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        author: "",
    });
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [backlinks, setBacklinks] = useState<{ label: string; url: string }[]>([]);
    const [newLink, setNewLink] = useState({ label: "", url: "" });
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const approvedBlogs = getApprovedBlogs();
    const archivedBlogs = getArchivedBlogs();

    // Convert file to base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    };

    // Upload image to Cloudinary
    const uploadToCloudinary = async (base64Image: string): Promise<string> => {
        const response = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64Image, folder: 'dinterio/blog' }),
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.url;
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            try {
                const base64 = await fileToBase64(file);
                // Show preview immediately
                setImagePreview(base64);
                // Upload to Cloudinary
                const cloudinaryUrl = await uploadToCloudinary(base64);
                setImagePreview(cloudinaryUrl);
            } catch (err) {
                console.error("Error uploading image:", err);
                alert("Failed to upload image. Please try again.");
                setImagePreview("");
            }
            setIsUploading(false);
        }
    };

    const addLink = () => {
        if (newLink.label && newLink.url) {
            setBacklinks([...backlinks, newLink]);
            setNewLink({ label: "", url: "" });
        }
    };

    const removeLink = (index: number) => {
        setBacklinks(backlinks.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!imagePreview) {
            alert("Please upload a main image for your article.");
            return;
        }

        const slug = formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        addBlog({
            ...formData,
            slug,
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            image: imagePreview,
            youtubeUrl: youtubeUrl || undefined,
            backlinks: backlinks.length > 0 ? backlinks : undefined,
        });
        setFormData({ title: "", excerpt: "", content: "", author: "" });
        setImagePreview("");
        setYoutubeUrl("");
        setBacklinks([]);
        setShowSubmitForm(false);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="pt-32 pb-24 bg-white text-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-gold uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold text-xs md:text-sm mb-2 block">
                        Dinterio Insights
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-dark">
                        The Design Blog
                    </h1>
                    <p className="mt-4 text-dark/60 max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-base px-4">
                        Expert advice, design inspiration, and updates from the world of luxury interiors. Minimum project value ₹50,00,000.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                    <button
                        onClick={() => setShowSubmitForm(!showSubmitForm)}
                        className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white px-6 py-3 rounded-sm font-bold text-sm tracking-wider transition-all"
                    >
                        <Send size={16} /> SUBMIT AN ARTICLE
                    </button>
                    <Link
                        href="/admin"
                        className="flex items-center justify-center gap-2 border border-dark/20 hover:border-gold text-dark hover:text-gold px-6 py-3 rounded-sm font-bold text-sm tracking-wider transition-all"
                    >
                        <Lock size={16} /> ADMIN LOGIN
                    </Link>
                </div>

                {/* Success Message */}
                {submitted && (
                    <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-800 rounded-sm text-center">
                        Thank you! Your article has been submitted for review. It will appear once approved by admin.
                    </div>
                )}

                {/* Submit Form */}
                {showSubmitForm && (
                    <div className="mb-12 p-6 md:p-8 bg-gray-50 rounded-lg border border-gray-200">
                        <h2 className="text-xl font-serif font-bold mb-6 text-dark">Submit Your Article</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-dark/60 mb-2 font-bold">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors text-dark bg-white placeholder-dark/40"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-dark/60 mb-2 font-bold">
                                    Article Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors text-dark bg-white placeholder-dark/40"
                                    placeholder="Your amazing article title"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-dark/60 mb-2 font-bold">
                                    Short Excerpt
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors text-dark bg-white placeholder-dark/40"
                                    placeholder="A brief summary of your article (1-2 sentences)"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-dark/60 mb-2 font-bold">
                                    Full Content
                                </label>
                                <textarea
                                    required
                                    rows={6}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none text-dark"
                                    placeholder="Write your full article content here..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-dark/60 mb-2 font-bold">
                                    Main Image *
                                </label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                {imagePreview ? (
                                    <div className="relative inline-block mt-2">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full max-w-md h-48 object-cover rounded-sm border border-gray-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setImagePreview("")}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-lg transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-gold rounded-sm p-8 text-dark/40 hover:text-gold transition-all bg-white group"
                                    >
                                        <Upload size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-medium">Click to upload main image</span>
                                        <span className="text-[10px] uppercase mt-1 tracking-widest">JPG, PNG or WEBP (Max 5MB)</span>
                                    </button>
                                )}
                                {isUploading && (
                                    <p className="text-xs text-gold mt-2 animate-pulse font-medium">Processing image...</p>
                                )}
                            </div>

                            {/* YouTube & Links */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-2 font-bold">
                                        YouTube Video URL
                                    </label>
                                    <input
                                        type="url"
                                        value={youtubeUrl}
                                        onChange={(e) => setYoutubeUrl(e.target.value)}
                                        className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors text-sm text-dark"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-dark/60 mb-2 font-bold">
                                        Related Links / Backlinks
                                    </label>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            value={newLink.label}
                                            onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                                            className="w-1/3 border border-gray-200 rounded-sm px-3 py-2 focus:outline-none focus:border-gold transition-colors text-xs text-dark bg-white placeholder-dark/40"
                                            placeholder="Label"
                                        />
                                        <input
                                            type="url"
                                            value={newLink.url}
                                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                            className="flex-1 border border-gray-200 rounded-sm px-3 py-2 focus:outline-none focus:border-gold transition-colors text-xs text-dark bg-white placeholder-dark/40"
                                            placeholder="URL"
                                        />
                                        <button
                                            type="button"
                                            onClick={addLink}
                                            className="bg-dark text-white px-3 py-2 rounded-sm text-xs font-bold hover:bg-gold transition-colors"
                                        >
                                            ADD
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {backlinks.map((link, idx) => (
                                            <div key={idx} className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-sm text-[10px] font-medium text-dark">
                                                <span>{link.label}</span>
                                                <button type="button" onClick={() => removeLink(idx)} className="text-red-500 hover:text-red-700">
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <button
                                    type="submit"
                                    className="bg-gold hover:bg-gold-light text-white px-8 py-3 rounded-sm font-bold text-sm tracking-wider transition-all"
                                >
                                    SUBMIT FOR REVIEW
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowSubmitForm(false)}
                                    className="border border-gray-300 text-dark/60 px-8 py-3 rounded-sm font-bold text-sm tracking-wider transition-all hover:border-gold"
                                >
                                    CANCEL
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Blog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {approvedBlogs.map((post) => (
                        <article key={post.id} className="group flex flex-col h-full">
                            <Link href={`/blog/${post.slug}`} className="relative h-48 md:h-64 overflow-hidden rounded-sm mb-6">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </Link>
                            <div className="flex-1 flex flex-col">
                                <span className="text-gold text-xs uppercase tracking-widest mb-3">
                                    {post.date} • {post.author}
                                </span>
                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className="text-xl md:text-2xl font-serif font-bold text-dark mb-4 group-hover:text-gold transition-colors duration-300">
                                        {post.title}
                                    </h2>
                                </Link>
                                <p className="text-dark/60 text-sm leading-relaxed mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-dark font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300"
                                >
                                    Read Entry <div className="w-8 h-[1px] bg-gold" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Archived Section */}
                {archivedBlogs.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-gray-200">
                        <button
                            onClick={() => setShowArchived(!showArchived)}
                            className="flex items-center gap-2 text-dark/60 hover:text-gold transition-colors mb-8"
                        >
                            <Archive size={20} />
                            <span className="font-bold uppercase tracking-widest text-sm">
                                Archived Articles ({archivedBlogs.length})
                            </span>
                            {showArchived ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>

                        {showArchived && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {archivedBlogs.map((post) => (
                                    <article key={post.id} className="opacity-60 hover:opacity-100 transition-opacity">
                                        <div className="relative h-40 overflow-hidden rounded-sm mb-4 grayscale">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="text-gold text-xs uppercase tracking-widest mb-2 block">
                                            {post.date} • Archived
                                        </span>
                                        <h3 className="text-lg font-serif font-bold text-dark mb-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-dark/60 text-sm leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
