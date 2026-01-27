import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ConsultationModal from "@/components/ConsultationModal";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D'Interio Design Studio | Luxury Turnkey Interiors in Hyderabad",
  description: "Hyderabad's premier luxury turnkey interior design studio. Bespoke high-end residential & commercial projects across India. Premium interiors starting at ₹50 Lakhs.",
  keywords: "Luxury Interiors Hyderabad, Turnkey Interior Designers Hyderabad, Bespoke Interior Design, Premium Villa Interiors, Best Interior Designers in Hyderabad, Dinterio Design Studio",
  openGraph: {
    title: "D'Interio Design Studio | Luxury Turnkey Interiors",
    description: "Premium turnkey luxury interiors for discerning clients. Serving Hyderabad, Bangalore, Mumbai & Pan India.",
    images: ["/images/hero-1.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D'Interio Design Studio | Luxury Turnkey Interiors",
    description: "Premium turnkey luxury interiors starting at ₹50 Lakhs.",
    images: ["/images/hero-1.png"],
  },
  alternates: {
    canonical: "https://dinterio.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "D'Interio Design Studio",
    "image": "https://dinterio.in/images/hero-1.png",
    "@id": "https://dinterio.in",
    "url": "https://dinterio.in",
    "telephone": "+919100222233",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "303, Kochar Towers, Begumpet",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500016",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.4411,
      "longitude": 78.4611
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/dinterio",
      "https://www.instagram.com/dinterio",
      "https://www.linkedin.com/company/dinterio"
    ],
    "priceRange": "₹50,00,000+"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <ConsultationModal />
        </Providers>
      </body>
    </html>
  );
}
