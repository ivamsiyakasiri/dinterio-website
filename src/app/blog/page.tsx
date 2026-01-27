import { Metadata } from "next";
import BlogClient from "@/components/BlogClient";

export const metadata: Metadata = {
    title: "Luxury Design Blog | Interior Inspiration Hyderabad | Dinterio",
    description: "Stay updated with the latest trends in luxury interior design, turnkey execution, and home decor inspiration from Hyderabad's premier design studio.",
    keywords: "Interior Design Blog India, Luxury Living Trends 2026, Home Decor Ideas Hyderabad, Turnkey Interior Tips, Dinterio Insights",
};

export default function BlogPage() {
    return <BlogClient />;
}
