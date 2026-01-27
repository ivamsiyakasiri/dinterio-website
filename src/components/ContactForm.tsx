"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

interface ContactFormProps {
    variant?: "light" | "dark";
    showBudgetNote?: boolean;
    title?: string;
    subtitle?: string;
}

export default function ContactForm({
    variant = "light",
    showBudgetNote = true,
    title = "Get a Free Consultation",
    subtitle = "Fill in your details and we'll get back to you within 24 hours.",
}: ContactFormProps) {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        propertyType: "",
        location: "",
        budget: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    from_phone: formData.phone,
                    property_type: formData.propertyType,
                    location: formData.location,
                    budget: formData.budget,
                    message: formData.message,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
            );

            setSubmitted(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                propertyType: "",
                location: "",
                budget: "",
                message: "",
            });
        } catch (err) {
            console.error("EmailJS Error:", err);
            setError("Failed to send inquiry. Please try again or call us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isDark = variant === "dark";
    const inputClasses = isDark
        ? "w-full bg-black/30 border border-white/20 rounded-sm px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors"
        : "w-full bg-gray-50 border border-gray-200 rounded-sm px-4 py-3 text-dark placeholder-foreground/40 focus:outline-none focus:border-gold transition-colors";
    const labelClasses = isDark
        ? "block text-xs uppercase tracking-widest text-white/60 mb-2 font-bold"
        : "block text-xs uppercase tracking-widest text-foreground/60 mb-2 font-bold";

    if (submitted) {
        return (
            <div className={`p-8 text-center rounded-lg ${isDark ? "bg-black/30 border border-gold/30" : "bg-green-50 border border-green-200"}`}>
                <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                <h3 className={`text-xl font-serif font-bold mb-2 ${isDark ? "text-white" : "text-dark"}`}>
                    Thank You!
                </h3>
                <p className={isDark ? "text-white/70" : "text-foreground/70"}>
                    We've received your inquiry and will contact you within 24 hours.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-gold hover:text-gold-light font-bold text-sm tracking-wider transition-colors"
                >
                    Submit Another Inquiry
                </button>
            </div>
        );
    }

    return (
        <div className={`p-6 md:p-8 rounded-lg ${isDark ? "bg-black/30 border border-white/10" : "bg-white shadow-xl border border-gray-100"}`}>
            {title && (
                <h3 className={`text-xl md:text-2xl font-serif font-bold mb-2 ${isDark ? "text-white" : "text-dark"}`}>
                    {title}
                </h3>
            )}
            {subtitle && (
                <p className={`text-sm mb-6 ${isDark ? "text-white/60" : "text-foreground/60"}`}>
                    {subtitle}
                </p>
            )}

            {showBudgetNote && (
                <div className={`mb-6 p-3 rounded-sm text-sm ${isDark ? "bg-gold/10 border border-gold/30 text-gold" : "bg-gold/10 border border-gold/30 text-gold"}`}>
                    <strong>Note:</strong> We accept projects with a minimum value of ₹50,00,000.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClasses}>Full Name *</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={inputClasses}
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Phone Number *</label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={inputClasses}
                            placeholder="+91 9876543210"
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClasses}>Email Address *</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClasses}
                        placeholder="your.email@example.com"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClasses}>Property Type *</label>
                        <select
                            required
                            value={formData.propertyType}
                            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                            className={inputClasses}
                        >
                            <option value="">Select property type</option>
                            <option value="villa">Villa / Independent House</option>
                            <option value="apartment">Apartment / Flat</option>
                            <option value="penthouse">Penthouse</option>
                            <option value="commercial">Commercial Space</option>
                            <option value="office">Office</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClasses}>Location *</label>
                        <input
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className={inputClasses}
                            placeholder="City, Area (e.g., Hyderabad, Jubilee Hills)"
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClasses}>Estimated Budget *</label>
                    <select
                        required
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={inputClasses}
                    >
                        <option value="">Select your budget range</option>
                        <option value="50-75">₹50 Lakhs - ₹75 Lakhs</option>
                        <option value="75-100">₹75 Lakhs - ₹1 Crore</option>
                        <option value="100-150">₹1 Crore - ₹1.5 Crores</option>
                        <option value="150-200">₹1.5 Crores - ₹2 Crores</option>
                        <option value="200+">₹2 Crores+</option>
                    </select>
                </div>

                <div>
                    <label className={labelClasses}>Project Details</label>
                    <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${inputClasses} resize-none`}
                        placeholder="Tell us about your project requirements, timeline, and any specific design preferences..."
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-gold-light text-white py-4 rounded-sm font-bold tracking-widest transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={18} className="animate-spin" /> SENDING...
                        </>
                    ) : (
                        <>
                            <Send size={18} /> SUBMIT INQUIRY
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
