"use client";

import React, { useState } from "react";
import { Mail, Heart } from "lucide-react";

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

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#2A1A10] text-[#F5EBE0] border-t border-[#EBDCD0]/10 font-sans">
      {/* Top Main Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Logo & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <svg className="h-12 w-12" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5 A 15 15 0 1 0 35 20 A 6 6 0 0 1 29 11 A 6 6 0 0 1 20 5 Z" stroke="#F5EBE0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="13" cy="17" r="1.8" fill="#C88A58"/>
                <circle cx="20" cy="26" r="2.2" fill="#C88A58"/>
                <circle cx="25" cy="18" r="1.8" fill="#C88A58"/>
                <circle cx="34" cy="9" r="1.2" fill="#C88A58"/>
                <circle cx="37" cy="14" r="0.8" fill="#C88A58"/>
                <circle cx="30" cy="5" r="0.8" fill="#C88A58"/>
              </svg>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FCFAF7]">
                Sweet Crumbs
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#F5EBE0]/75 leading-relaxed max-w-sm">
              We are a local artisan bakery dedicated to delivering freshly baked happiness to your doorstep. Handmade pastries, sourdough breads, and gorgeous bespoke celebration cakes.
            </p>
            {/* Social icons */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#F5EBE0]/10 hover:bg-[#C88A58] hover:text-[#FCFAF7] transition-all text-[#F5EBE0]"
                aria-label="Instagram Handle"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#F5EBE0]/10 hover:bg-[#C88A58] hover:text-[#FCFAF7] transition-all text-[#F5EBE0]"
                aria-label="Facebook Page"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#F5EBE0]/10 hover:bg-[#C88A58] hover:text-[#FCFAF7] transition-all text-[#F5EBE0]"
                aria-label="Pinterest Page"
              >
                {/* Custom representation since Pinterest icon isn't imported */}
                <span className="text-xs font-bold leading-none w-4 h-4 flex items-center justify-center">P</span>
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#FCFAF7]">
              Baking Hours
            </h4>
            <div className="text-xs sm:text-sm text-[#F5EBE0]/75 space-y-2">
              <p className="flex justify-between border-b border-[#F5EBE0]/10 pb-1.5">
                <span>Monday - Friday:</span>
                <span className="font-semibold">7 AM - 6 PM</span>
              </p>
              <p className="flex justify-between border-b border-[#F5EBE0]/10 pb-1.5">
                <span>Saturday - Sunday:</span>
                <span className="font-semibold">8 AM - 4 PM</span>
              </p>
              <p className="text-[11px] text-[#C88A58] font-bold">
                * Oven fresh batches ready daily at 7:30 AM!
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#FCFAF7]">
              Quick Links
            </h4>
            <ul className="text-xs sm:text-sm text-[#F5EBE0]/75 space-y-2">
              <li>
                <a href="#specials" className="hover:text-[#C88A58] transition-colors">
                  Daily Specials
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#C88A58] transition-colors">
                  Featured Bakes
                </a>
              </li>
              <li>
                <a href="#cake-builder" className="hover:text-[#C88A58] transition-colors">
                  Custom Cake Studio
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-[#C88A58] transition-colors">
                  Event Catering
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#C88A58] transition-colors">
                  Contact & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#FCFAF7]">
              Join the Crumbs Club
            </h4>
            <p className="text-xs text-[#F5EBE0]/75 leading-relaxed">
              Subscribe to get secret recipes, notices of fresh seasonal bakes, and 10% off your next custom cake.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F5EBE0]/10 border border-[#F5EBE0]/20 rounded-xl px-4 py-3 text-xs text-[#FCFAF7] focus:outline-none focus:border-[#C88A58]"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 bg-[#C88A58] hover:bg-[#A05A2C] text-[#FCFAF7] p-1.5 rounded-lg transition-all"
                  aria-label="Subscribe Submit"
                >
                  <Mail className="h-4 w-4" />
                </button>
              </div>
              {isSubscribed && (
                <p className="text-[10px] text-[#7F8C7D] font-bold animate-pulse">
                  ✓ Successfully Subscribed! Check your inbox.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Built With Love */}
      <div className="border-t border-[#F5EBE0]/10 py-6 bg-[#20130B]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#F5EBE0]/60 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Sweet Crumbs Bakery. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 fill-[#C88A58] text-[#C88A58]" />
            <span>in the Artisan Bakery Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
