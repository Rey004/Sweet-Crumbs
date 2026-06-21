"use client";

import React from "react";
import Image from "next/image";
import { Gift, Heart, Building2, Cake } from "lucide-react";

interface OccasionsSectionProps {
  onOccasionSelect: (occasion: string) => void;
}

export default function OccasionsSection({
  onOccasionSelect,
}: OccasionsSectionProps) {
  const categories = [
    {
      title: "Wedding Cakes",
      description: "Timeless and romantic creations crafted to tell your love story. Tiered rustic Naked cakes or smooth fondant masterpieces.",
      image: "/images/custom_cake.png",
      badge: "Wedding",
      icon: Heart,
    },
    {
      title: "Birthday Celebrations",
      description: "Vibrant, creative, and delicious custom cakes to make birthdays extra special. Drip designs, caramel curls, or themed bakes.",
      image: "/images/birthday_cake.png",
      badge: "Birthday",
      icon: Cake,
    },
    {
      title: "Anniversaries & Parties",
      description: "Elegant chocolate-rich cakes and gourmet dessert platters tailored for milestones, family reunions, and anniversaries.",
      image: "/images/chocolate_cake.png",
      badge: "Anniversary",
      icon: Gift,
    },
    {
      title: "Corporate Catering",
      description: "Impress clients and treat your team. Fresh assortments of pastries, artisan sandwich breads, and catering boxes.",
      image: "/images/croissants.png",
      badge: "Corporate Event",
      icon: Building2,
    },
  ];

  return (
    <section id="occasions" className="py-20 bg-[#F5EBE0]/30 border-t border-[#EBDCD0]/45">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="caramel-label font-sans text-xs font-bold uppercase tracking-widest">
            Celebrations & Events
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#2A1A10] mt-3">
            Baking for Special Moments
          </h2>
          <div className="h-[3px] caramel-bar w-12 mx-auto mt-4" />
          <p className="font-sans text-sm text-[#2A1A10]/70 mt-4">
            Whether you are walking down the aisle, hosting a team lunch, or celebrating a major milestone, Sweet Crumbs adds the perfect touch of sweetness.
          </p>
        </div>

        {/* Desktop Layout: Occasions Grid */}
        <div className="hidden xl:grid xl:grid-cols-4 xl:gap-8">
          {categories.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group bg-[#FCFAF7] rounded-[2rem] border border-[#EBDCD0]/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1.5"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5EBE0]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="280px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#2A1A10]/20" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 right-4 bg-[#FCFAF7] p-2 rounded-full shadow border border-[#EBDCD0]/40 text-[#C88A58]">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1A10] group-hover:text-[#C88A58] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#2A1A10]/70 mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#EBDCD0]/40">
                    <button
                      onClick={() => onOccasionSelect(item.badge)}
                      className="w-full caramel-btn-outline py-3 rounded-xl font-sans text-xs font-bold tracking-wide flex items-center justify-center space-x-1 cursor-pointer shadow-sm"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>Configure {item.badge}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet & Mobile Layout: Horizontal Scrollable Slider */}
        <div className="xl:hidden relative">
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#C88A58]/20 scrollbar-track-transparent scroll-smooth px-2">
            {categories.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] bg-[#FCFAF7] rounded-[2rem] border border-[#EBDCD0]/50 overflow-hidden shadow-sm flex flex-col justify-between snap-center"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5EBE0]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#2A1A10]/20" />
                    <div className="absolute top-4 right-4 bg-[#FCFAF7] p-2 rounded-full shadow border border-[#EBDCD0]/40 text-[#C88A58]">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1A10]">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#2A1A10]/70 mt-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#EBDCD0]/40">
                      <button
                        onClick={() => onOccasionSelect(item.badge)}
                        className="w-full bg-[#FCFAF7] border-2 border-[#C88A58] text-[#C88A58] hover:bg-[#C88A58] hover:text-[#FCFAF7] py-3 rounded-xl font-sans text-xs font-bold tracking-wide transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer shadow-sm"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>Configure {item.badge}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Swipe indicator badge */}
          <div className="flex justify-center items-center space-x-2 mt-2 text-xs font-sans text-[#2A1A10]/50">
            <span>Swipe to explore</span>
            <span className="animate-pulse">→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
