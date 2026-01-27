// Blog types and initial data

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    date: string;
    image: string;
    author: string;
    youtubeUrl?: string;
    backlinks?: { label: string; url: string }[];
    status: "pending" | "approved" | "archived";
    createdAt: number;
}

export const initialBlogs: BlogPost[] = [
    {
        id: "1",
        title: "5 Trends for Luxury Living in 2026",
        excerpt: "Discover the latest trends in high-end residential design, from sustainable materials to smart home integration.",
        content: "Full content here...",
        slug: "luxury-trends-2026",
        date: "Jan 20, 2026",
        image: "/images/hero-1.png",
        author: "D'Interio Team",
        status: "approved",
        createdAt: Date.now() - 1000000,
    },
    {
        id: "2",
        title: "The Art of Turnkey Execution",
        excerpt: "Why choosing a turnkey partner is the smartest decision for your dream home in Hyderabad.",
        content: "Full content here...",
        slug: "turnkey-execution-art",
        date: "Jan 15, 2026",
        image: "/images/hero-2.png",
        author: "D'Interio Team",
        status: "approved",
        createdAt: Date.now() - 2000000,
    },
    {
        id: "3",
        title: "Designing for Jubilee Hills Villas",
        excerpt: "A look into our latest projects in the heart of Hyderabad's most prestigious neighborhood.",
        content: "Full content here...",
        slug: "jubilee-hills-villa-design",
        date: "Jan 10, 2026",
        image: "/images/hero-3.png",
        author: "D'Interio Team",
        status: "approved",
        createdAt: Date.now() - 3000000,
    },
    {
        id: "4",
        title: "Modular Kitchen Design Ideas",
        excerpt: "Explore stunning modular kitchen designs that combine functionality with elegance.",
        content: "Full content here...",
        slug: "modular-kitchen-ideas",
        date: "Jan 8, 2026",
        image: "/images/p-1.png",
        author: "D'Interio Team",
        status: "approved",
        createdAt: Date.now() - 4000000,
    },
    {
        id: "5",
        title: "Transforming Apartments in Gachibowli",
        excerpt: "How we transformed compact apartments into luxurious living spaces in Gachibowli.",
        content: "Full content here...",
        slug: "gachibowli-apartments",
        date: "Jan 5, 2026",
        image: "/images/p-2.png",
        author: "D'Interio Team",
        status: "approved",
        createdAt: Date.now() - 5000000,
    },
    {
        id: "6",
        title: "Color Psychology in Interior Design",
        excerpt: "Understanding how colors affect mood and how to use them effectively in your home.",
        content: "Full content here...",
        slug: "color-psychology",
        date: "Jan 3, 2026",
        image: "/images/hero-1.png",
        author: "D'Interio Team",
        status: "approved",
        createdAt: Date.now() - 6000000,
    },
    {
        id: "7",
        title: "Smart Home Integration Tips",
        excerpt: "Seamlessly integrate smart technology into your luxury interior design.",
        content: "Full content here...",
        slug: "smart-home-integration",
        date: "Dec 28, 2025",
        image: "/images/hero-2.png",
        author: "D'Interio Team",
        status: "approved",
        createdAt: Date.now() - 7000000,
    },
    {
        id: "8",
        title: "Sustainable Luxury Interiors",
        excerpt: "How to create eco-friendly luxury spaces without compromising on aesthetics.",
        content: "Full content here...",
        slug: "sustainable-luxury",
        date: "Dec 25, 2025",
        image: "/images/hero-3.png",
        author: "D'Interio Team",
        status: "archived",
        createdAt: Date.now() - 8000000,
    },
    {
        id: "9",
        title: "Wardrobe Design Masterclass",
        excerpt: "Creating the perfect walk-in wardrobe for your luxury bedroom.",
        content: "Full content here...",
        slug: "wardrobe-design-masterclass",
        date: "Dec 20, 2025",
        image: "/images/p-1.png",
        author: "D'Interio Team",
        status: "archived",
        createdAt: Date.now() - 9000000,
    },
];

// Admin credentials
export const ADMIN_CREDENTIALS = {
    username: "vamsiyakasiri",
    password: "Ajith@1982",
};

// Portfolio types and initial data
export interface PortfolioProject {
    id: string;
    name: string;
    slug: string;
    mainImage: string;
    images: string[];
    location: string;
    category: string;
    description: string;
    status: "active" | "archived";
    createdAt: number;
}

export const initialProjects: PortfolioProject[] = [
    {
        id: "p1",
        name: "Luxury Villa in Jubilee Hills",
        slug: "luxury-villa-jubilee-hills",
        mainImage: "/images/hero-1.png",
        images: ["/images/hero-1.png", "/images/hero-2.png", "/images/hero-3.png", "/images/p-1.png", "/images/p-2.png"],
        location: "Jubilee Hills, Hyderabad",
        category: "Villa",
        description: "A stunning 5BHK luxury villa with contemporary design and premium finishes.",
        status: "active",
        createdAt: Date.now() - 100000,
    },
    {
        id: "p2",
        name: "Modern Apartment Gachibowli",
        slug: "modern-apartment-gachibowli",
        mainImage: "/images/hero-2.png",
        images: ["/images/hero-2.png", "/images/hero-1.png", "/images/hero-3.png"],
        location: "Gachibowli, Hyderabad",
        category: "Apartment",
        description: "A sleek 3BHK apartment with minimalist aesthetics and smart home integration.",
        status: "active",
        createdAt: Date.now() - 200000,
    },
    {
        id: "p3",
        name: "Premium Penthouse Banjara Hills",
        slug: "premium-penthouse-banjara-hills",
        mainImage: "/images/hero-3.png",
        images: ["/images/hero-3.png", "/images/hero-1.png", "/images/hero-2.png", "/images/p-1.png"],
        location: "Banjara Hills, Hyderabad",
        category: "Penthouse",
        description: "An exclusive penthouse with panoramic city views and luxury interiors.",
        status: "active",
        createdAt: Date.now() - 300000,
    },
    {
        id: "p4",
        name: "Executive Office Space",
        slug: "executive-office-space",
        mainImage: "/images/p-1.png",
        images: ["/images/p-1.png", "/images/hero-1.png", "/images/hero-2.png"],
        location: "HITEC City, Hyderabad",
        category: "Commercial",
        description: "A premium corporate office with modern workspaces and collaborative zones.",
        status: "active",
        createdAt: Date.now() - 400000,
    },
    {
        id: "p5",
        name: "Luxury Villa Tellapur",
        slug: "luxury-villa-tellapur",
        mainImage: "/images/p-2.png",
        images: ["/images/p-2.png", "/images/hero-3.png", "/images/hero-1.png"],
        location: "Tellapur, Hyderabad",
        category: "Villa",
        description: "A contemporary villa with open layouts and premium wood finishes.",
        status: "active",
        createdAt: Date.now() - 500000,
    },
    {
        id: "p6",
        name: "Designer Home Madhapur",
        slug: "designer-home-madhapur",
        mainImage: "/images/hero-1.png",
        images: ["/images/hero-1.png", "/images/p-1.png", "/images/p-2.png"],
        location: "Madhapur, Hyderabad",
        category: "Apartment",
        description: "An artistic 4BHK home with custom furniture and unique design elements.",
        status: "active",
        createdAt: Date.now() - 600000,
    },
    {
        id: "p7",
        name: "Boutique Restaurant Interior",
        slug: "boutique-restaurant-interior",
        mainImage: "/images/hero-2.png",
        images: ["/images/hero-2.png", "/images/hero-3.png", "/images/p-1.png"],
        location: "Jubilee Hills, Hyderabad",
        category: "Commercial",
        description: "An upscale restaurant with ambient lighting and sophisticated decor.",
        status: "active",
        createdAt: Date.now() - 700000,
    },
    {
        id: "p8",
        name: "Villa in Bangalore",
        slug: "villa-bangalore",
        mainImage: "/images/hero-3.png",
        images: ["/images/hero-3.png", "/images/hero-2.png", "/images/hero-1.png", "/images/p-2.png"],
        location: "Whitefield, Bangalore",
        category: "Villa",
        description: "A luxurious villa project in Bangalore with Italian marble and smart automation.",
        status: "archived",
        createdAt: Date.now() - 800000,
    },
    {
        id: "p9",
        name: "Premium Flat in Mumbai",
        slug: "premium-flat-mumbai",
        mainImage: "/images/p-1.png",
        images: ["/images/p-1.png", "/images/hero-1.png", "/images/hero-3.png"],
        location: "Bandra, Mumbai",
        category: "Apartment",
        description: "A sea-facing luxury apartment with contemporary interiors and custom millwork.",
        status: "archived",
        createdAt: Date.now() - 900000,
    },
];
