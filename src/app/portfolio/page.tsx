import { Metadata } from "next";
import PortfolioClient from "@/components/PortfolioClient";

export const metadata: Metadata = {
    title: "Luxury Interior Portfolio | Dinterio Design Studio",
    description: "Explore our portfolio of ultra-premium turnkey interiors in Hyderabad, Bangalore, and across India. Stunning villa and penthouse transformations starting at ₹50 Lakhs.",
    keywords: "Interior Design Portfolio Hyderabad, Luxury Villa Photos, Premium Apartment Gallery, Best Interior Design Projects, Dinterio Works",
};

export default function PortfolioPage() {
    return <PortfolioClient />;
}
