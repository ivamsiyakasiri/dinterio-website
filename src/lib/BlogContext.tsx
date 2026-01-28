"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { BlogPost, initialBlogs, PortfolioProject, initialProjects, ADMIN_CREDENTIALS } from "./blogData";

interface BlogContextType {
    // Blog management
    blogs: BlogPost[];
    addBlog: (blog: Omit<BlogPost, "id" | "createdAt" | "status">) => void;
    approveBlog: (id: string) => void;
    archiveBlog: (id: string) => void;
    deleteBlog: (id: string) => void;
    getApprovedBlogs: () => BlogPost[];
    getPendingBlogs: () => BlogPost[];
    getArchivedBlogs: () => BlogPost[];

    // Portfolio management
    projects: PortfolioProject[];
    addProject: (project: Omit<PortfolioProject, "id" | "createdAt" | "status">) => void;
    updateProject: (id: string, updates: Partial<PortfolioProject>) => void;
    archiveProject: (id: string) => void;
    restoreProject: (id: string) => void;
    deleteProject: (id: string) => void;
    getActiveProjects: () => PortfolioProject[];
    getArchivedProjects: () => PortfolioProject[];
    getProjectBySlug: (slug: string) => PortfolioProject | undefined;

    // Auth
    isAdmin: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;

    // Loading state
    isLoaded: boolean;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Helper to safely access localStorage
const safeLocalStorage = {
    getItem: (key: string): string | null => {
        if (typeof window === "undefined") return null;
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    },
    setItem: (key: string, value: string): void => {
        if (typeof window === "undefined") return;
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.error("Failed to save to localStorage:", e);
        }
    },
    removeItem: (key: string): void => {
        if (typeof window === "undefined") return;
        try {
            localStorage.removeItem(key);
        } catch {
            // Ignore
        }
    },
};

export function BlogProvider({ children }: { children: ReactNode }) {
    const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
    const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from localStorage on mount (client-side only)
    useEffect(() => {
        // Only run on client
        if (typeof window === "undefined") return;

        try {
            const storedBlogs = safeLocalStorage.getItem("dinterio_blogs");
            if (storedBlogs) {
                const parsed = JSON.parse(storedBlogs);
                if (Array.isArray(parsed)) {
                    setBlogs(parsed);
                }
            }
            const storedProjects = safeLocalStorage.getItem("dinterio_projects");
            if (storedProjects) {
                const parsed = JSON.parse(storedProjects);
                if (Array.isArray(parsed)) {
                    setProjects(parsed);
                }
            }
            const adminSession = safeLocalStorage.getItem("dinterio_admin");
            if (adminSession === "true") {
                setIsAdmin(true);
            }
        } catch (e) {
            console.error("Error loading from localStorage:", e);
        }

        setIsLoaded(true);
    }, []);

    // Save data to localStorage when changed (only after initial load)
    useEffect(() => {
        if (!isLoaded) return; // Don't save during initial load
        safeLocalStorage.setItem("dinterio_blogs", JSON.stringify(blogs));
    }, [blogs, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return; // Don't save during initial load
        safeLocalStorage.setItem("dinterio_projects", JSON.stringify(projects));
    }, [projects, isLoaded]);

    // Auth
    const login = (username: string, password: string): boolean => {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            setIsAdmin(true);
            safeLocalStorage.setItem("dinterio_admin", "true");
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        safeLocalStorage.removeItem("dinterio_admin");
    };

    // Blog functions
    const addBlog = (blogData: Omit<BlogPost, "id" | "createdAt" | "status">) => {
        const newBlog: BlogPost = {
            ...blogData,
            id: Date.now().toString(),
            createdAt: Date.now(),
            status: "pending",
        };
        setBlogs((prev) => [newBlog, ...prev]);
    };

    const approveBlog = (id: string) => {
        setBlogs((prev) =>
            prev.map((blog) => (blog.id === id ? { ...blog, status: "approved" } : blog))
        );
    };

    const archiveBlog = (id: string) => {
        setBlogs((prev) =>
            prev.map((blog) => (blog.id === id ? { ...blog, status: "archived" } : blog))
        );
    };

    const deleteBlog = (id: string) => {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    };

    const getApprovedBlogs = () => blogs.filter((b) => b.status === "approved");
    const getPendingBlogs = () => blogs.filter((b) => b.status === "pending");
    const getArchivedBlogs = () => blogs.filter((b) => b.status === "archived");

    // Portfolio functions
    const addProject = (projectData: Omit<PortfolioProject, "id" | "createdAt" | "status">) => {
        const newProject: PortfolioProject = {
            ...projectData,
            id: "p" + Date.now().toString(),
            createdAt: Date.now(),
            status: "active",
        };
        setProjects((prev) => [newProject, ...prev]);
    };

    const updateProject = (id: string, updates: Partial<PortfolioProject>) => {
        setProjects((prev) =>
            prev.map((project) => (project.id === id ? { ...project, ...updates } : project))
        );
    };

    const archiveProject = (id: string) => {
        setProjects((prev) =>
            prev.map((project) => (project.id === id ? { ...project, status: "archived" } : project))
        );
    };

    const restoreProject = (id: string) => {
        setProjects((prev) =>
            prev.map((project) => (project.id === id ? { ...project, status: "active" } : project))
        );
    };

    const deleteProject = (id: string) => {
        setProjects((prev) => prev.filter((project) => project.id !== id));
    };

    const getActiveProjects = () => projects.filter((p) => p.status === "active");
    const getArchivedProjects = () => projects.filter((p) => p.status === "archived");
    const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

    return (
        <BlogContext.Provider
            value={{
                blogs,
                addBlog,
                approveBlog,
                archiveBlog,
                deleteBlog,
                getApprovedBlogs,
                getPendingBlogs,
                getArchivedBlogs,
                projects,
                addProject,
                updateProject,
                archiveProject,
                restoreProject,
                deleteProject,
                getActiveProjects,
                getArchivedProjects,
                getProjectBySlug,
                isAdmin,
                login,
                logout,
                isLoaded,
            }}
        >
            {children}
        </BlogContext.Provider>
    );
}

export function useBlog() {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error("useBlog must be used within a BlogProvider");
    }
    return context;
}
