"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ cartCount, onCartClick, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy Logic
      const sections = ["hero", "menu", "cake-builder", "testimonials", "visit"];
      
      // If at the very bottom of the page, highlight the last section
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection("visit");
        return;
      }

      const scrollPosition = window.scrollY + 160; // offset to trigger slightly before the section reaches top

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Our Menu", id: "menu" },
    { label: "Custom Cakes", id: "cake-builder" },
    { label: "Reviews", id: "testimonials" },
    { label: "Visit Us", id: "visit" },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Top Banner (Horizontal Infinite Marquee) */}
      <div className="w-full bg-[#1D110A] text-[#EEDFD2] py-1 overflow-hidden whitespace-nowrap select-none relative z-50 border-b border-[#DEC0A8]/10">
        <div className="inline-flex animate-marquee text-[10px] tracking-widest font-bold uppercase">
          <span className="mx-24">✨ Free Delivery for Orders over $50 inside our zone! ✨</span>
          <span className="mx-24">🥐 Fresh bakes handcrafted daily with local organic ingredients 🥐</span>
          <span className="mx-24">✨ Free Delivery for Orders over $50 inside our zone! ✨</span>
          <span className="mx-24">🥐 Fresh bakes handcrafted daily with local organic ingredients 🥐</span>
          <span className="mx-24">✨ Free Delivery for Orders over $50 inside our zone! ✨</span>
          <span className="mx-24">🥐 Fresh bakes handcrafted daily with local organic ingredients 🥐</span>
          <span className="mx-24">✨ Free Delivery for Orders over $50 inside our zone! ✨</span>
          <span className="mx-24">🥐 Fresh bakes handcrafted daily with local organic ingredients 🥐</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 bg-white ${
          isScrolled
            ? "shadow-sm border-b border-[#EBDCD0]/50 py-2.5"
            : "border-b border-[#DEC0A8]/20 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => handleLinkClick("hero")}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <svg className="h-10 w-10 transition-transform duration-300 group-hover:scale-105" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5 A 15 15 0 1 0 35 20 A 6 6 0 0 1 29 11 A 6 6 0 0 1 20 5 Z" stroke="#1D110A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="13" cy="17" r="1.8" fill="#BF7B47"/>
                <circle cx="20" cy="26" r="2.2" fill="#BF7B47"/>
                <circle cx="25" cy="18" r="1.8" fill="#BF7B47"/>
                <circle cx="34" cy="9" r="1.2" fill="#BF7B47"/>
                <circle cx="37" cy="14" r="0.8" fill="#BF7B47"/>
                <circle cx="30" cy="5" r="0.8" fill="#BF7B47"/>
              </svg>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1D110A] group-hover:text-[#BF7B47] transition-colors duration-300">
                Sweet Crumbs
              </span>
            </div>

            {/* Desktop Navigation (Segmented Tab Control with Sliding Pill Highlight) */}
            <nav className="hidden md:flex relative bg-[#EEDFD2]/40 border border-[#DEC0A8]/30 rounded-full p-1 items-center shadow-sm">
              {/* Sliding Highlight Pill */}
              <div
                className="absolute top-1 bottom-1 rounded-full bg-[#BF7B47] transition-all duration-300 ease-out shadow-sm"
                style={{
                  width: "112px",
                  opacity: activeSection === "hero" ? 0 : 1,
                  transform: `translateX(${
                    activeSection === "menu" ? 0 :
                    activeSection === "cake-builder" ? 112 :
                    activeSection === "testimonials" ? 224 :
                    activeSection === "visit" ? 336 : 0
                  }px)`
                }}
              />

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-28 py-1.5 rounded-full text-xs font-bold tracking-wide transition-colors duration-300 relative z-10 cursor-pointer text-center ${
                    activeSection === link.id
                      ? "text-white"
                      : "text-[#2A1A10]/75 hover:text-[#1D110A]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Social Icons (Desktop only) */}
              <div className="hidden md:flex items-center space-x-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-[#EBDCD0]/60 bg-[#FCFAF7] text-[#2A1A10]/70 hover:bg-[#F5EBE0] hover:text-[#BF7B47] transition-all duration-300 shadow-sm"
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-[#EBDCD0]/60 bg-[#FCFAF7] text-[#2A1A10]/70 hover:bg-[#F5EBE0] hover:text-[#BF7B47] transition-all duration-300 shadow-sm"
                  aria-label="Facebook Page"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              </div>

              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-2.5 rounded-full border border-[#EBDCD0] bg-[#FCFAF7] text-[#2A1A10] hover:bg-[#F5EBE0] hover:text-[#C88A58] transition-all duration-300 group shadow-sm hover:shadow"
                aria-label="Open Cart"
              >
                <ShoppingBag className="h-5 w-5 transition-transform duration-300 group-hover:scale-105" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C88A58] text-[#FCFAF7] text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button (Creative Cookie Hamburger - Dots Removed) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative h-11 w-11 flex items-center justify-center rounded-full border-2 border-[#1D110A] bg-[#DEC0A8] text-[#1D110A] hover:bg-[#EEDFD2] md:hidden transition-all duration-300 focus:outline-none cursor-pointer shadow-md hover:scale-105 active:scale-95 group overflow-hidden"
                aria-label="Toggle Menu"
              >
                {/* Animated Hamburger Lines */}
                <div className="relative flex flex-col justify-between w-5 h-3.5 z-10">
                  <span
                    className={`h-[2.5px] w-full bg-[#1D110A] rounded-full transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? "rotate-45 translate-y-[5.75px]" : "rotate-0"
                    }`}
                  />
                  <span
                    className={`h-[2.5px] w-full bg-[#1D110A] rounded-full transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                    }`}
                  />
                  <span
                    className={`h-[2.5px] w-full bg-[#1D110A] rounded-full transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-[5.75px]" : "rotate-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer (Animate with slide transition) */}
      <div
        className={`fixed inset-0 z-50 bg-[#EEDFD2] md:hidden flex flex-col w-screen h-screen transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
      >
        {/* Background Decorative Blobs */}
        <div className="absolute top-20 right-[-80px] -z-10 h-[300px] w-[300px] rounded-full bg-[#DEC0A8]/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-[-80px] -z-10 h-[250px] w-[250px] rounded-full bg-[#BF7B47]/10 blur-3xl pointer-events-none" />

        {/* Giant Cookie Watermark in Background */}
        <svg className="absolute -bottom-10 -right-10 h-52 w-52 text-[#1D110A]/5 pointer-events-none -z-10 rotate-12" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 5 A 15 15 0 1 0 35 20 A 6 6 0 0 1 29 11 A 6 6 0 0 1 20 5 Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="13" cy="17" r="1.8" fill="currentColor"/>
          <circle cx="20" cy="26" r="2.2" fill="currentColor"/>
          <circle cx="25" cy="18" r="1.8" fill="currentColor"/>
          <circle cx="34" cy="9" r="1.2" fill="currentColor"/>
          <circle cx="37" cy="14" r="0.8" fill="currentColor"/>
          <circle cx="30" cy="5" r="0.8" fill="currentColor"/>
        </svg>

        <div className="w-full h-full flex flex-col justify-between p-6 overflow-y-auto z-10 relative">
          {/* Drawer Header */}
          <div className="flex justify-between items-center pb-4 border-b border-[#1D110A]/10">
            <div className="flex items-center space-x-3">
              <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5 A 15 15 0 1 0 35 20 A 6 6 0 0 1 29 11 A 6 6 0 0 1 20 5 Z" stroke="#1D110A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="13" cy="17" r="1.8" fill="#BF7B47"/>
                <circle cx="20" cy="26" r="2.2" fill="#BF7B47"/>
                <circle cx="25" cy="18" r="1.8" fill="#BF7B47"/>
                <circle cx="34" cy="9" r="1.2" fill="#BF7B47"/>
                <circle cx="37" cy="14" r="0.8" fill="#BF7B47"/>
                <circle cx="30" cy="5" r="0.8" fill="#BF7B47"/>
              </svg>
              <span className="font-serif text-xl font-bold tracking-tight text-[#1D110A]">
                Sweet Crumbs
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-full border border-[#DEC0A8] bg-[#FCFAF7] text-[#1D110A] hover:bg-[#EEDFD2] transition-colors cursor-pointer"
              aria-label="Close Mobile Menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Vertical Navigation Links */}
          <nav className="flex flex-col pt-8 flex-grow">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left font-serif text-2xl font-bold text-[#1D110A] hover:text-[#BF7B47] transition-all duration-300 py-4 border-b border-[#1D110A]/10 last:border-b-0 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Drawer Footer Actions & Social Icons */}
          <div className="space-y-6 pt-6 border-t border-[#1D110A]/10">
            {/* Social Icons (Mobile Drawer) */}
            <div className="flex items-center space-x-3.5 justify-center sm:justify-start">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1D110A]/40">
                Follow us:
              </span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-[#DEC0A8] bg-[#FCFAF7] text-[#1D110A] hover:bg-[#EEDFD2] hover:text-[#BF7B47] transition-all duration-300 shadow-sm"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-[#DEC0A8] bg-[#FCFAF7] text-[#1D110A] hover:bg-[#EEDFD2] hover:text-[#BF7B47] transition-all duration-300 shadow-sm"
                aria-label="Facebook Page"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onCartClick();
              }}
              className="w-full bg-[#BF7B47] hover:bg-[#914B1F] text-white py-4 rounded-xl font-sans text-sm font-bold tracking-wide transition-all duration-300 shadow flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>View Shopping Cart ({cartCount})</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
