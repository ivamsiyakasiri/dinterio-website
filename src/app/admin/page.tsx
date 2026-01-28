"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Lock, LogOut, Check, Archive, Trash2, Eye, Clock, FileText, AlertCircle, Image, Plus, FolderOpen, Upload, X, Youtube, ExternalLink } from "lucide-react";
import { useBlog } from "@/lib/BlogContext";

export default function AdminPage() {
    const {
        isAdmin, login, logout,
        getPendingBlogs, getApprovedBlogs, getArchivedBlogs,
        approveBlog, archiveBlog, deleteBlog,
        getActiveProjects, getArchivedProjects,
        addProject, archiveProject, restoreProject, deleteProject
    } = useBlog();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [activeSection, setActiveSection] = useState<"blog" | "portfolio">("blog");
    const [activeTab, setActiveTab] = useState<"pending" | "approved" | "archived" | "active">("pending");
    const [showAddProject, setShowAddProject] = useState(false);
    const [newProject, setNewProject] = useState({
        name: "",
        location: "",
        category: "Villa",
        description: "",
    });
    const [mainImagePreview, setMainImagePreview] = useState<string>("");
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    const mainImageRef = useRef<HTMLInputElement>(null);
    const galleryRef = useRef<HTMLInputElement>(null);

    const pendingBlogs = getPendingBlogs();
    const approvedBlogs = getApprovedBlogs();
    const archivedBlogs = getArchivedBlogs();
    const activeProjects = getActiveProjects();
    const archivedProjects = getArchivedProjects();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(username, password);
        if (!success) {
            setError("Invalid credentials. Please try again.");
        }
    };

    const handleDeleteBlog = (id: string, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            deleteBlog(id);
        }
    };

    const handleDeleteProject = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            deleteProject(id);
        }
    };

    // Compress and resize image to reduce localStorage usage
    const compressImage = (file: File, maxWidth = 1200, quality = 0.7): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    // Scale down if larger than maxWidth
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    // Convert to compressed JPEG
                    const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressedBase64);
                };
                img.onerror = reject;
            };
            reader.onerror = reject;
        });
    };

    // Handle main image upload
    const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploading(true);
            try {
                const base64 = await compressImage(file);
                setMainImagePreview(base64);
            } catch (err) {
                console.error("Error uploading image:", err);
            }
            setUploading(false);
        }
    };

    // Handle gallery images upload
    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setUploading(true);
            try {
                const newImages: string[] = [];
                const filesToProcess = Math.min(files.length, 50 - galleryPreviews.length);
                for (let i = 0; i < filesToProcess; i++) {
                    const base64 = await compressImage(files[i]);
                    newImages.push(base64);
                }
                setGalleryPreviews((prev) => [...prev, ...newImages].slice(0, 50));
            } catch (err) {
                console.error("Error uploading images:", err);
            }
            setUploading(false);
        }
    };

    // Remove gallery image
    const removeGalleryImage = (index: number) => {
        setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mainImagePreview) {
            alert("Please upload a main image");
            return;
        }

        const slug = newProject.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        const allImages = galleryPreviews.length > 0 ? [mainImagePreview, ...galleryPreviews] : [mainImagePreview];

        addProject({
            name: newProject.name,
            slug,
            location: newProject.location,
            category: newProject.category,
            description: newProject.description,
            mainImage: mainImagePreview,
            images: allImages.slice(0, 50),
        });

        // Reset form
        setNewProject({ name: "", location: "", category: "Villa", description: "" });
        setMainImagePreview("");
        setGalleryPreviews([]);
        setShowAddProject(false);
    };

    // Login Page
    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-dark-light p-10 border border-gold/20 rounded-sm shadow-2xl">
                    <div className="text-center mb-10">
                        <Link href="/" className="flex flex-col items-center">
                            <span className="text-3xl font-serif font-bold tracking-wider text-gold">DINTERIO</span>
                            <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 -mt-1">Admin Gateway</span>
                        </Link>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 text-sm flex items-center gap-2">
                            <AlertCircle size={16} />{error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-2 font-bold">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" placeholder="Enter username" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-[0.2em] text-white/60 mb-2 font-bold">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" placeholder="••••••••" />
                        </div>
                        <button type="submit" className="w-full bg-gold hover:bg-gold-light text-white py-4 rounded-sm font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-3 mt-8 shadow-lg shadow-gold/20">
                            <Lock size={18} /> SECURE LOGIN
                        </button>
                        <div className="text-center mt-6">
                            <Link href="/" className="text-[10px] text-white/30 uppercase tracking-[0.2em] hover:text-gold transition-colors">Return to Website</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-serif font-bold text-dark">Admin Dashboard</h1>
                        <p className="text-foreground/60 text-sm mt-1">Manage blogs and portfolio projects</p>
                    </div>
                    <button onClick={logout} className="flex items-center gap-2 text-red-500 hover:text-red-600 font-bold text-sm tracking-wider transition-colors">
                        <LogOut size={18} /> LOGOUT
                    </button>
                </div>

                {/* Section Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => { setActiveSection("blog"); setActiveTab("pending"); }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-sm tracking-wider transition-all ${activeSection === "blog" ? "bg-gold text-white" : "bg-white text-dark border border-gray-200 hover:border-gold"}`}
                    >
                        <FileText size={18} /> BLOG MANAGEMENT
                    </button>
                    <button
                        onClick={() => { setActiveSection("portfolio"); setActiveTab("active"); }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-sm tracking-wider transition-all ${activeSection === "portfolio" ? "bg-gold text-white" : "bg-white text-dark border border-gray-200 hover:border-gold"}`}
                    >
                        <FolderOpen size={18} /> PORTFOLIO MANAGEMENT
                    </button>
                </div>

                {/* Blog Management */}
                {activeSection === "blog" && (
                    <>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-white p-6 rounded-lg border border-gray-200"><div className="flex items-center gap-3"><Clock className="text-yellow-500" size={24} /><div><p className="text-2xl font-bold text-dark">{pendingBlogs.length}</p><p className="text-xs uppercase tracking-widest text-foreground/60">Pending</p></div></div></div>
                            <div className="bg-white p-6 rounded-lg border border-gray-200"><div className="flex items-center gap-3"><FileText className="text-green-500" size={24} /><div><p className="text-2xl font-bold text-dark">{approvedBlogs.length}</p><p className="text-xs uppercase tracking-widest text-foreground/60">Published</p></div></div></div>
                            <div className="bg-white p-6 rounded-lg border border-gray-200"><div className="flex items-center gap-3"><Archive className="text-gray-500" size={24} /><div><p className="text-2xl font-bold text-dark">{archivedBlogs.length}</p><p className="text-xs uppercase tracking-widest text-foreground/60">Archived</p></div></div></div>
                        </div>

                        <div className="flex gap-2 mb-6 border-b border-gray-200">
                            {[{ key: "pending", label: "Pending", count: pendingBlogs.length }, { key: "approved", label: "Published", count: approvedBlogs.length }, { key: "archived", label: "Archived", count: archivedBlogs.length }].map((tab) => (
                                <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} className={`px-4 py-3 font-bold text-sm tracking-wider transition-colors border-b-2 -mb-[2px] ${activeTab === tab.key ? "border-gold text-gold" : "border-transparent text-foreground/60 hover:text-dark"}`}>
                                    {tab.label} ({tab.count})
                                </button>
                            ))}
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {activeTab === "pending" && (pendingBlogs.length === 0 ? <div className="p-12 text-center text-foreground/60"><Clock size={48} className="mx-auto mb-4 opacity-30" /><p>No pending articles</p></div> : <div className="divide-y divide-gray-100">{pendingBlogs.map((blog) => (<div key={blog.id} className="p-6 flex flex-col md:flex-row md:items-center gap-4"><img src={blog.image} alt={blog.title} className="w-20 h-20 object-cover rounded-sm shrink-0" /><div className="flex-1"><h3 className="font-serif font-bold text-dark">{blog.title}</h3><p className="text-sm text-foreground/60 mt-1">{blog.excerpt}</p><div className="flex gap-3 mt-2">
                                <p className="text-xs text-gold">By {blog.author} • {blog.date}</p>
                                {blog.youtubeUrl && <span className="flex items-center gap-1 text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded-sm font-bold uppercase"><Youtube size={10} /> Video</span>}
                                {blog.backlinks && blog.backlinks.length > 0 && <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-sm font-bold uppercase"><ExternalLink size={10} /> {blog.backlinks.length} Links</span>}
                            </div></div><div className="flex gap-2"><button onClick={() => approveBlog(blog.id)} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-sm text-xs font-bold tracking-wider transition-colors"><Check size={14} /> APPROVE</button><button onClick={() => handleDeleteBlog(blog.id, blog.title)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm text-xs font-bold tracking-wider transition-colors"><Trash2 size={14} /> DELETE</button></div></div>))}</div>)}

                            {activeTab === "approved" && (approvedBlogs.length === 0 ? <div className="p-12 text-center text-foreground/60"><FileText size={48} className="mx-auto mb-4 opacity-30" /><p>No published articles</p></div> : <div className="divide-y divide-gray-100">{approvedBlogs.map((blog) => (<div key={blog.id} className="p-6 flex flex-col md:flex-row md:items-center gap-4"><img src={blog.image} alt={blog.title} className="w-20 h-20 object-cover rounded-sm shrink-0" /><div className="flex-1"><h3 className="font-serif font-bold text-dark">{blog.title}</h3><p className="text-sm text-foreground/60 mt-1">{blog.excerpt}</p></div><div className="flex gap-2"><Link href={`/blog/${blog.slug}`} className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-dark px-4 py-2 rounded-sm text-xs font-bold tracking-wider transition-colors"><Eye size={14} /> VIEW</Link><button onClick={() => archiveBlog(blog.id)} className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-sm text-xs font-bold tracking-wider transition-colors"><Archive size={14} /> ARCHIVE</button><button onClick={() => handleDeleteBlog(blog.id, blog.title)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm text-xs font-bold tracking-wider transition-colors"><Trash2 size={14} /> DELETE</button></div></div>))}</div>)}

                            {activeTab === "archived" && (archivedBlogs.length === 0 ? <div className="p-12 text-center text-foreground/60"><Archive size={48} className="mx-auto mb-4 opacity-30" /><p>No archived articles</p></div> : <div className="divide-y divide-gray-100">{archivedBlogs.map((blog) => (<div key={blog.id} className="p-6 flex flex-col md:flex-row md:items-center gap-4 opacity-70"><img src={blog.image} alt={blog.title} className="w-20 h-20 object-cover rounded-sm shrink-0 grayscale" /><div className="flex-1"><h3 className="font-serif font-bold text-dark">{blog.title}</h3></div><div className="flex gap-2"><button onClick={() => approveBlog(blog.id)} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-sm text-xs font-bold tracking-wider transition-colors"><Check size={14} /> RESTORE</button><button onClick={() => handleDeleteBlog(blog.id, blog.title)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm text-xs font-bold tracking-wider transition-colors"><Trash2 size={14} /> DELETE</button></div></div>))}</div>)}
                        </div>
                    </>
                )}

                {/* Portfolio Management */}
                {activeSection === "portfolio" && (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-6 rounded-lg border border-gray-200"><div className="flex items-center gap-3"><Image className="text-green-500" size={24} /><div><p className="text-2xl font-bold text-dark">{activeProjects.length}</p><p className="text-xs uppercase tracking-widest text-foreground/60">Active</p></div></div></div>
                                <div className="bg-white p-6 rounded-lg border border-gray-200"><div className="flex items-center gap-3"><Archive className="text-gray-500" size={24} /><div><p className="text-2xl font-bold text-dark">{archivedProjects.length}</p><p className="text-xs uppercase tracking-widest text-foreground/60">Archived</p></div></div></div>
                            </div>
                            <button onClick={() => setShowAddProject(true)} className="flex items-center gap-2 bg-gold hover:bg-gold-light text-white px-6 py-3 rounded-sm font-bold text-sm tracking-wider transition-all">
                                <Plus size={18} /> ADD PROJECT
                            </button>
                        </div>

                        {/* Add Project Form */}
                        {showAddProject && (
                            <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200">
                                <h3 className="text-lg font-serif font-bold mb-4">Add New Project</h3>
                                <form onSubmit={handleAddProject} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label className="block text-xs uppercase tracking-widest text-foreground/60 mb-2 font-bold">Project Name *</label><input type="text" required value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold" placeholder="Luxury Villa in Jubilee Hills" /></div>
                                        <div><label className="block text-xs uppercase tracking-widest text-foreground/60 mb-2 font-bold">Location *</label><input type="text" required value={newProject.location} onChange={(e) => setNewProject({ ...newProject, location: e.target.value })} className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold" placeholder="Jubilee Hills, Hyderabad" /></div>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-2 font-bold">Category *</label>
                                        <select value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value })} className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold">
                                            <option value="Villa">Villa</option><option value="Apartment">Apartment</option><option value="Penthouse">Penthouse</option><option value="Commercial">Commercial</option><option value="Office">Office</option>
                                        </select>
                                    </div>
                                    <div><label className="block text-xs uppercase tracking-widest text-foreground/60 mb-2 font-bold">Description *</label><textarea required rows={3} value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold resize-none" placeholder="A stunning luxury project..." /></div>

                                    {/* Main Image Upload */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-2 font-bold">Main Image *</label>
                                        <input type="file" ref={mainImageRef} accept="image/*" onChange={handleMainImageUpload} className="hidden" />
                                        {mainImagePreview ? (
                                            <div className="relative inline-block">
                                                <img src={mainImagePreview} alt="Main preview" className="w-40 h-32 object-cover rounded-sm border border-gray-200" />
                                                <button type="button" onClick={() => { setMainImagePreview(""); if (mainImageRef.current) mainImageRef.current.value = ""; }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"><X size={14} /></button>
                                            </div>
                                        ) : (
                                            <button type="button" onClick={() => mainImageRef.current?.click()} className="flex items-center gap-2 border-2 border-dashed border-gray-300 hover:border-gold rounded-sm px-6 py-8 text-foreground/60 hover:text-gold transition-colors w-full justify-center">
                                                <Upload size={24} /> Click to upload main image
                                            </button>
                                        )}
                                    </div>

                                    {/* Gallery Images Upload */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-2 font-bold">Gallery Images (Max 50)</label>
                                        <input type="file" ref={galleryRef} accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
                                        <button type="button" onClick={() => galleryRef.current?.click()} disabled={galleryPreviews.length >= 50} className={`flex items-center gap-2 border-2 border-dashed rounded-sm px-6 py-4 transition-colors w-full justify-center mb-4 ${galleryPreviews.length >= 50 ? "border-gray-200 text-gray-400 cursor-not-allowed" : "border-gray-300 hover:border-gold text-foreground/60 hover:text-gold"}`}>
                                            <Upload size={20} /> Add gallery images ({galleryPreviews.length}/50)
                                        </button>
                                        {galleryPreviews.length > 0 && (
                                            <div className="flex flex-wrap gap-3">
                                                {galleryPreviews.map((img, index) => (
                                                    <div key={index} className="relative">
                                                        <img src={img} alt={`Gallery ${index + 1}`} className="w-24 h-20 object-cover rounded-sm border border-gray-200" />
                                                        <button type="button" onClick={() => removeGalleryImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"><X size={12} /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {uploading && <p className="text-sm text-gold">Uploading images...</p>}

                                    <div className="flex gap-4 pt-4">
                                        <button type="submit" disabled={uploading || !mainImagePreview} className="bg-gold hover:bg-gold-light text-white px-8 py-3 rounded-sm font-bold text-sm tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed">ADD PROJECT</button>
                                        <button type="button" onClick={() => { setShowAddProject(false); setMainImagePreview(""); setGalleryPreviews([]); }} className="border border-gray-300 text-foreground/60 px-8 py-3 rounded-sm font-bold text-sm tracking-wider transition-all hover:border-gold">CANCEL</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="flex gap-2 mb-6 border-b border-gray-200">
                            {[{ key: "active", label: "Active Projects", count: activeProjects.length }, { key: "archived", label: "Archived", count: archivedProjects.length }].map((tab) => (
                                <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} className={`px-4 py-3 font-bold text-sm tracking-wider transition-colors border-b-2 -mb-[2px] ${activeTab === tab.key ? "border-gold text-gold" : "border-transparent text-foreground/60 hover:text-dark"}`}>
                                    {tab.label} ({tab.count})
                                </button>
                            ))}
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {activeTab === "active" && (activeProjects.length === 0 ? <div className="p-12 text-center text-foreground/60"><Image size={48} className="mx-auto mb-4 opacity-30" /><p>No active projects</p></div> : <div className="divide-y divide-gray-100">{activeProjects.map((project) => (<div key={project.id} className="p-6 flex flex-col md:flex-row md:items-center gap-4"><img src={project.mainImage} alt={project.name} className="w-24 h-20 object-cover rounded-sm shrink-0" /><div className="flex-1"><h3 className="font-serif font-bold text-dark">{project.name}</h3><p className="text-sm text-foreground/60 mt-1">{project.location} • {project.category}</p><p className="text-xs text-gold mt-1">{project.images.length} images</p></div><div className="flex gap-2"><Link href={`/portfolio/${project.slug}`} className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-dark px-4 py-2 rounded-sm text-xs font-bold tracking-wider transition-colors"><Eye size={14} /> VIEW</Link><button onClick={() => archiveProject(project.id)} className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-sm text-xs font-bold tracking-wider transition-colors"><Archive size={14} /> ARCHIVE</button><button onClick={() => handleDeleteProject(project.id, project.name)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm text-xs font-bold tracking-wider transition-colors"><Trash2 size={14} /> DELETE</button></div></div>))}</div>)}

                            {activeTab === "archived" && (archivedProjects.length === 0 ? <div className="p-12 text-center text-foreground/60"><Archive size={48} className="mx-auto mb-4 opacity-30" /><p>No archived projects</p></div> : <div className="divide-y divide-gray-100">{archivedProjects.map((project) => (<div key={project.id} className="p-6 flex flex-col md:flex-row md:items-center gap-4 opacity-70"><img src={project.mainImage} alt={project.name} className="w-24 h-20 object-cover rounded-sm shrink-0 grayscale" /><div className="flex-1"><h3 className="font-serif font-bold text-dark">{project.name}</h3><p className="text-sm text-foreground/60">{project.location}</p></div><div className="flex gap-2"><button onClick={() => restoreProject(project.id)} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-sm text-xs font-bold tracking-wider transition-colors"><Check size={14} /> RESTORE</button><button onClick={() => handleDeleteProject(project.id, project.name)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-sm text-xs font-bold tracking-wider transition-colors"><Trash2 size={14} /> DELETE</button></div></div>))}</div>)}
                        </div>
                    </>
                )}

                <div className="mt-8 text-center"><Link href="/" className="text-gold hover:text-gold-light font-bold text-sm tracking-wider transition-colors">← Back to Website</Link></div>
            </div>
        </div>
    );
}
