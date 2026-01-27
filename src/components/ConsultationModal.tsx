"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle, Phone, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/lib/ModalContext";
import emailjs from "@emailjs/browser";

const ConsultationModal = () => {
    const { isModalOpen, closeModal } = useModal();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        propertyType: "",
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
                    budget: formData.budget,
                    message: formData.message,
                    location: "Consultation Modal",
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
            );

            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                closeModal();
            }, 3000);
        } catch (err) {
            console.error("EmailJS Error:", err);
            setError("Failed to book session. Please try calling us.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-dark/40 hover:text-gold transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-6 md:p-8">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <CheckCircle size={40} />
                                    </motion.div>
                                    <h3 className="text-2xl font-serif font-bold text-dark mb-2">Request Received!</h3>
                                    <p className="text-dark/60 mb-6">Our design expert will call you shortly to discuss your luxury project.</p>
                                    <p className="text-gold font-bold">Closing in 3 seconds...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-8">
                                        <span className="text-gold uppercase tracking-[0.2em] font-bold text-xs mb-2 block">
                                            Consultation Request
                                        </span>
                                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-dark">
                                            Book Your Session
                                        </h2>
                                        <p className="text-dark/60 text-sm mt-2">
                                            Min. Project Value: <span className="text-gold font-bold">₹50,00,000</span>
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                required
                                                placeholder="Full Name *"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors bg-white text-dark placeholder-dark/40"
                                            />
                                            <input
                                                type="tel"
                                                required
                                                placeholder="Phone Number *"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors bg-white text-dark placeholder-dark/40"
                                            />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors bg-white text-dark placeholder-dark/40"
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <select
                                                required
                                                value={formData.propertyType}
                                                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                                                className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors text-dark bg-white"
                                            >
                                                <option value="">Property Type *</option>
                                                <option value="villa">Villa / Independent House</option>
                                                <option value="apartment">Apartment / Flat</option>
                                                <option value="penthouse">Penthouse</option>
                                                <option value="commercial">Commercial / Office</option>
                                            </select>
                                            <select
                                                required
                                                value={formData.budget}
                                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors text-dark bg-white"
                                            >
                                                <option value="">Budget Range *</option>
                                                <option value="50-75">₹50 Lakhs - ₹75 Lakhs</option>
                                                <option value="75-100">₹75 Lakhs - ₹1 Crore</option>
                                                <option value="100-150">₹1 Crore - ₹1.5 Crores</option>
                                                <option value="150+">₹1.5 Crores+</option>
                                            </select>
                                        </div>
                                        <textarea
                                            rows={2}
                                            placeholder="About your project (Optional)"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full border border-gray-200 rounded-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none bg-white text-dark placeholder-dark/40"
                                        />
                                        {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gold hover:bg-gold-light text-white py-4 rounded-sm font-bold tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" /> SENDING...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} /> REQUEST CALLBACK
                                                </>
                                            )}
                                        </button>
                                        <div className="flex items-center justify-center gap-2 text-dark/40 text-xs mt-4">
                                            <Phone size={12} />
                                            <span>Or call us directly at <a href="tel:+919100222233" className="text-gold font-bold">+91 9100222233</a></span>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConsultationModal;
