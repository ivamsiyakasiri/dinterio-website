"use client";

import Link from "next/link";
import { ArrowLeft, Clock, User, Youtube, ExternalLink } from "lucide-react";
import { useBlog } from "@/lib/BlogContext";
import { useParams } from "next/navigation";

export default function BlogPost() {
    const { slug } = useParams();
    const { blogs, getProjectBySlug } = useBlog();

    // Find the blog post by slug
    const post = blogs.find(b => b.slug === slug);

    if (!post) {
        return (
            <div className="pt-32 pb-24 bg-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-serif font-bold mb-4">Post Not Found</h2>
                    <Link href="/blog" className="text-gold font-bold hover:underline">Back to Blog</Link>
                </div>
            </div>
        );
    }

    // Helper to get YouTube ID
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeId = post.youtubeUrl ? getYouTubeId(post.youtubeUrl) : null;

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/blog"
                    className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-12 hover:translate-x-[-4px] transition-transform duration-300"
                >
                    <ArrowLeft size={16} /> Back to Blog
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-6 text-dark/40 text-xs uppercase tracking-[0.2em] mb-6">
                        <span className="flex items-center gap-2"><User size={14} /> {post.author}</span>
                        <span className="flex items-center gap-2"><Clock size={14} /> {post.date}</span>
                        {post.status === "pending" && <span className="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-sm">Pending Review</span>}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-dark leading-tight">
                        {post.title}
                    </h1>
                </header>

                <div className="relative aspect-video rounded-sm overflow-hidden mb-12 shadow-2xl">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>

                <article className="prose prose-lg max-w-none mb-16 
                    text-dark 
                    prose-headings:text-dark 
                    prose-p:text-dark/80 
                    prose-li:text-dark/80 
                    prose-strong:text-dark 
                    prose-strong:font-bold
                    prose-a:text-gold 
                    prose-blockquote:text-dark/60
                    prose-img:rounded-sm">
                    <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }}
                    />
                </article>

                {/* YouTube Embed */}
                {youtubeId && (
                    <div className="mb-16">
                        <div className="flex items-center gap-2 mb-6 text-dark font-serif font-bold text-xl">
                            <Youtube className="text-red-600" /> Related Video
                        </div>
                        <div className="relative aspect-video rounded-sm overflow-hidden shadow-xl">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}

                {/* Backlinks */}
                {post.backlinks && post.backlinks.length > 0 && (
                    <div className="mb-16 p-8 bg-gray-50 rounded-sm border-l-4 border-gold">
                        <h3 className="text-lg font-serif font-bold text-dark mb-4">Reference Links</h3>
                        <div className="flex flex-wrap gap-4">
                            {post.backlinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-sm border border-gray-200 text-sm font-bold text-dark hover:text-gold hover:border-gold transition-all"
                                >
                                    <ExternalLink size={14} /> {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-20 pt-12 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex gap-4">
                        {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 bg-gray-100 rounded-full" />)}
                    </div>
                    <button className="text-gold font-bold text-xs uppercase tracking-widest hover:text-gold-light transition-colors">
                        Share Article
                    </button>
                </div>
            </div>
        </div>
    );
}
