"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/lib/ModalContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 w-full bg-dark text-white text-xs py-2 text-center tracking-widest hidden md:block z-50">
        <span className="text-gold font-bold">LUXURY TURNKEY INTERIORS</span> • Minimum Project Value: <span className="text-gold font-bold">₹50,00,000</span>
      </div>
      <nav
        className={cn(
          "fixed w-full z-40 transition-all duration-300 top-0 md:top-8",
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-white/80 backdrop-blur-md py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <img
                  src="/images/logo-cropped.png"
                  alt="Dinterio Design Studio"
                  className="h-24 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium tracking-wide text-dark hover:text-gold transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://www.youtube.com/@dinteriodesignstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark hover:text-gold transition-colors duration-200 flex items-center gap-2"
                title="Watch our work on YouTube"
              >
                <Youtube size={24} />
              </a>
              <button
                onClick={openModal}
                className="bg-gold hover:bg-gold-light text-white px-8 py-3 rounded-sm text-base font-bold tracking-wide transition-all duration-300 transform hover:scale-105"
              >
                BOOK CONSULTATION NOW
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground p-2 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark border-b border-gold/20"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
                {/* Mobile Minimum Badge */}
                <div className="w-full py-3 mb-2 text-center border-b border-gold/30">
                  <span className="text-gold font-bold text-xs tracking-widest">MIN. PROJECT: ₹50,00,000</span>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-3 text-center text-base font-medium border-b border-white/5 hover:text-gold text-white"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 w-full space-y-3">
                  <a
                    href="https://www.youtube.com/@dinteriodesignstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-white hover:text-gold border border-gold/20 py-3 rounded-sm font-bold tracking-wider text-sm transition-all"
                  >
                    <Youtube size={20} /> WATCH ON YOUTUBE
                  </a>
                  <button
                    onClick={() => { setIsOpen(false); openModal(); }}
                    className="block w-full text-center bg-gold text-white py-4 rounded-sm font-bold tracking-wider text-sm"
                  >
                    BOOK CONSULTATION NOW
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
