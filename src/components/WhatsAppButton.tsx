"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
    const phoneNumber = "919100222233";
    const message = "Hi, I'm interested in your luxury interior design services. Minimum project value ₹50 Lakhs.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} className="fill-white" />
            <span className="absolute right-full mr-3 bg-dark text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                Chat with us
            </span>
        </a>
    );
};

export default WhatsAppButton;
