import { Metadata } from "next";
import LandingClient from "@/components/LandingClient";

export const metadata: Metadata = {
    title: "Get A Free Quote | Luxury Interior Design Hyderabad | Dinterio",
    description: "Request a free consultation and quote for your luxury turnkey interior project. Premium villa and apartment interiors in Hyderabad, Bangalore & Mumbai.",
    keywords: "Interior Design Quote, Free Consultation Hyderabad, Luxury Home Estimate, Best Interior Firm Hyderabad",
};

export default function LandingPage() {
    return <LandingClient />;
}
