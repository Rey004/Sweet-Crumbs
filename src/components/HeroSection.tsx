"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Heart, ChefHat, Clock } from "lucide-react";

interface HeroSectionProps {
  onOrderNowClick: () => void;
  onCustomCakeClick: () => void;
}

export default function HeroSection({
  onOrderNowClick,
  onCustomCakeClick,
}: HeroSectionProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-white min-h-[calc(100vh-86px)] flex items-center py-6 lg:py-0 border-b border-[#DEC0A8]/10">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#EEDFD2]/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#DEC0A8]/20 blur-3xl" />

      {/* Floating Elements (Pure CSS Animated) */}
      <div className="absolute top-20 left-10 lg:left-20 animate-float-slow opacity-20 pointer-events-none hidden md:block">
        <span className="text-4xl">🌾</span>
      </div>
      <div className="absolute bottom-20 left-1/3 animate-float-medium opacity-20 pointer-events-none hidden md:block">
        <span className="text-4xl">🪵</span>
      </div>
      <div className="absolute top-1/3 right-1/3 animate-float-fast opacity-15 pointer-events-none hidden md:block">
        <span className="text-3xl">🥚</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 lg:gap-y-6 items-center lg:-translate-y-6">
          {/* Block A: Premium Headline, Copy & CTA Buttons (Top on mobile, left column top on desktop) */}
          <div className="order-1 lg:col-span-6 lg:col-start-1 lg:row-start-1 flex flex-col space-y-4 lg:space-y-4 xl:space-y-5 text-center lg:text-left items-center lg:items-start z-10">
            {/* Top Tagline */}
            <div className="inline-flex items-center space-x-2 bg-[#EEDFD2]/30 px-3.5 py-1 rounded-full w-fit border border-[#DEC0A8]/40">
              <ChefHat className="h-3.5 w-3.5 text-[#BF7B47]" />
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#1D110A]/90">
                Local Artisans & Baker Extraordinaire
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#1D110A] leading-[1.15]">
              Baking Endless <br />
              <span className="caramel-text relative">
                Happiness
              </span> <br />
              For Every Heart
            </h1>

            {/* Subtext */}
            <p className="font-sans text-xs sm:text-sm text-[#1D110A]/80 leading-relaxed max-w-xl">
              Experience the joy of warm, handcrafted pastries, rustic golden sourdough breads, and gorgeous custom-designed cakes baked fresh daily using local organic ingredients.
            </p>

            {/* Smaller CTA Buttons in the same line */}
            <div className="flex flex-row space-x-2.5 sm:space-x-3 pt-1.5 w-full justify-center lg:justify-start">
              <button
                onClick={onOrderNowClick}
                className="group caramel-btn px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold tracking-wide shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Order Online Now</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={onCustomCakeClick}
                className="caramel-btn-outline bg-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold tracking-wide shadow-sm hover:shadow flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Custom Cake Request</span>
              </button>
            </div>
          </div>

          {/* Block B: Premium Collage Layout (Middle on mobile, right column on desktop - increased size) */}
          <div className="order-2 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-2 relative mt-4 lg:mt-0 flex justify-center items-center pr-6 pl-2 lg:pr-8">
            {/* Collage Background Elements */}
            <div className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[460px] xl:max-w-[520px] aspect-square">
              {/* Main Image (Hero Sourdough & Ingredients) */}
              <div className="absolute top-3 left-3 w-[85%] aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-10 transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/images/hero_bakery.webp"
                  alt="Premium artisan baking ingredients and fresh sourdough bread"
                  fill
                  sizes="(max-w-768px) 100vw, 550px"
                  priority
                  className="object-cover"
                />
              </div>

              {/* Overlapping Floating Pastry Card */}
              <div className="absolute -bottom-6 -right-2 w-[55%] aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white z-20 transition-transform duration-500 hover:scale-[1.05] animate-float-slow">
                <Image
                  src="/images/croissants.webp"
                  alt="Flaky golden croissants stacked"
                  fill
                  sizes="(max-w-768px) 50vw, 280px"
                  className="object-cover"
                />
              </div>

              {/* Decorative Accent Label Box */}
              <div className="absolute -top-5 -left-5 bg-[#1D110A] text-[#F5EBE0] p-3 rounded-2xl shadow-xl z-20 max-w-[130px] border border-[#DEC0A8]/20 animate-float-medium hidden sm:block">
                <p className="font-serif text-xs font-bold text-center leading-tight">
                  Guaranteed Fresh Out the Oven!
                </p>
                <div className="h-[2px] caramel-bar w-6 mx-auto mt-1.5" />
                <p className="font-sans text-[9px] text-center text-[#F5EBE0]/80 mt-1 uppercase tracking-widest font-bold">
                  Sweet Crumbs
                </p>
              </div>

              {/* Decorative circle badges */}
              <div className="absolute top-1/2 -right-3 h-16 w-16 rounded-full caramel-icon-circle border-4 border-white flex items-center justify-center font-serif font-bold text-[10px] uppercase tracking-wider text-center shadow-lg z-20 rotate-12">
                <span>100% Fresh</span>
              </div>
            </div>
          </div>

          {/* Block C: Quality Checkpoints (Bottom on mobile, left column bottom on desktop) */}
          <div className="order-3 lg:col-span-6 lg:col-start-1 lg:row-start-2 flex flex-col space-y-4 text-center lg:text-left items-center lg:items-start z-10">
            {/* Key Quality Checkpoints */}
            <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2.5 pt-4 lg:pt-3 border-t border-[#DEC0A8]/20 w-full">
              <div className="flex items-center space-x-1.5 flex-shrink-0">
                <Heart className="h-4 w-4 text-[#BF7B47] flex-shrink-0" />
                <span className="font-sans text-[10px] sm:text-[11px] font-semibold text-[#1D110A]">
                  <span className="sm:hidden">No Additives</span>
                  <span className="hidden sm:inline">No Artificial Additives</span>
                </span>
              </div>
              <div className="flex items-center space-x-1.5 flex-shrink-0">
                <ShieldCheck className="h-4 w-4 text-[#BF7B47] flex-shrink-0" />
                <span className="font-sans text-[10px] sm:text-[11px] font-semibold text-[#1D110A]">
                  <span className="sm:hidden">100% Organic</span>
                  <span className="hidden sm:inline">100% Organic Flours</span>
                </span>
              </div>
              <div className="flex items-center space-x-1.5 flex-shrink-0">
                <Clock className="h-4 w-4 text-[#BF7B47] flex-shrink-0" />
                <span className="font-sans text-[10px] sm:text-[11px] font-semibold text-[#1D110A]">
                  <span className="sm:hidden">Baked Daily</span>
                  <span className="hidden sm:inline">Baked & Delivered Daily</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
