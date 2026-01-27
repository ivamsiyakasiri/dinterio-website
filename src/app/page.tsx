import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Best Luxury Interior Designers in Hyderabad | Dinterio Design Studio",
  description: "Dinterio is a premier luxury turnkey interior design studio in Hyderabad specializing in elite villas, penthouses & premium apartments. Min. project value ₹50 Lakhs. Serving PAN India.",
  keywords: "Best Interior Designers Hyderabad, Luxury Home Interiors Hyderabad, Turnkey Interior Decorators, Jubilee Hills Interior Designers, Gachibowli Interior Designers, Premium Home Design India",
  openGraph: {
    title: "Best Luxury Interior Designers in Hyderabad | Dinterio",
    description: "Premium turnkey luxury interiors starting at ₹50 Lakhs. Elevating living spaces in Hyderabad and across India.",
    images: ["/images/hero-1.png"],
  }
};

export default function Home() {
  return <HomeClient />;
}
