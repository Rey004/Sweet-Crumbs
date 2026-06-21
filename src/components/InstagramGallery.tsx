"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

export default function InstagramGallery() {
  const galleryItems = [
    {
      id: 0,
      image: "/images/insta_cinnamon.png",
      aspect: "aspect-[4/5]",
      caption: "Morning therapy: dusting warm Cinnamon Rolls with sweet powdered sugar glaze. ✨ #cinnamonrolls #sweetcrumbs",
    },
    {
      id: 1,
      image: "/images/insta_cookies.png",
      aspect: "aspect-square",
      caption: "Melted chocolate puddles and gooey centers. Our Sea Salt Chocolate Chip Cookies are freshly baked all day. 🍪 #cookies #chocolatechip",
    },
    {
      id: 2,
      image: "/images/croissants.png",
      aspect: "aspect-[3/4]",
      caption: "Laminated layers of pure European butter. Flaky, crispy, and warm out of the oven. Best paired with coffee! ☕️🥐 #croissant #frenchpastry",
    },
    {
      id: 3,
      image: "/images/fruit_tart.png",
      aspect: "aspect-square",
      caption: "Our glazed peach & apricot tart sits on a vanilla bean custard base. Summer vibes in every bite. 🍑☀️ #fruittart #artisanpastry",
    },
    {
      id: 4,
      image: "/images/chocolate_cake.png",
      aspect: "aspect-[4/3]",
      caption: "Decadence in every layer. Our Signature Chocolate Truffle cake is ready to elevate your celebrations. 🍫🎂 #chocolatecake #gourmet",
    },
    {
      id: 5,
      image: "/images/birthday_cake.png",
      aspect: "aspect-[3/4]",
      caption: "Caramel drip crowns, toasted hazelnuts, and chocolate macarons. A custom cake built to impress. 🍮🎂 #customcake #birthdaycake",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % galleryItems.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="caramel-label font-sans text-xs font-bold uppercase tracking-widest">
            Visual Sweetness
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#2A1A10] mt-3">
            Baked with Love on Instagram
          </h2>
          <div className="h-[3px] caramel-bar w-12 mx-auto mt-4" />
          <p className="font-sans text-sm text-[#2A1A10]/70 mt-4">
            Follow our daily kitchen adventures and see our fresh bakes. Use tag <strong className="caramel-text">#SweetCrumbs</strong> to get featured!
          </p>
        </div>

        {/* Desktop Layout: Masonry-Style Columns Grid */}
        <div className="hidden lg:block lg:columns-3 lg:gap-6 lg:space-y-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className={`break-inside-avoid relative overflow-hidden rounded-[2rem] border border-[#EBDCD0]/50 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer ${item.aspect} mb-6`}
            >
              <Image
                src={item.image}
                alt="Instagram post"
                fill
                sizes="380px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover Instagram Icon & Caption Overlay */}
              <div className="absolute inset-0 bg-[#2A1A10]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <InstagramIcon className="h-6 w-6 text-[#FCFAF7]" />
                </div>
                <p className="font-sans text-xs text-[#FCFAF7]/90 leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet & Mobile Layout: Horizontal Scrollable Slider */}
        <div className="lg:hidden relative">
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#C88A58]/20 scrollbar-track-transparent scroll-smooth px-2">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="flex-shrink-0 w-[280px] sm:w-[320px] aspect-[4/5] relative overflow-hidden rounded-[2rem] border border-[#EBDCD0]/50 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer snap-center"
              >
                <Image
                  src={item.image}
                  alt="Instagram post"
                  fill
                  sizes="(max-w-640px) 280px, 320px"
                  className="object-cover"
                />

                {/* Mobile/Tablet Touch Indicator Overlay (Partially translucent top bar with icon) */}
                <div className="absolute top-4 right-4 bg-[#2A1A10]/60 backdrop-blur-sm p-2 rounded-full border border-white/10 z-10">
                  <InstagramIcon className="h-4 w-4 text-[#FCFAF7]" />
                </div>

                {/* Soft gradient bottom overlay for caption readability on mobile/tablet */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2A1A10]/80 via-[#2A1A10]/40 to-transparent p-5 pt-10 flex items-end">
                  <p className="font-sans text-[11px] text-[#FCFAF7]/90 leading-relaxed line-clamp-3">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe indicator badge */}
          <div className="flex justify-center items-center space-x-2 mt-2 text-xs font-sans text-[#2A1A10]/50">
            <span>Swipe to explore</span>
            <span className="animate-pulse">→</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-all duration-300"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FCFAF7] transition-all cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={showPrev}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-[#FCFAF7] transition-all cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image & Detail Panel Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FCFAF7] max-w-4xl w-full rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh] border border-[#EBDCD0]/40"
          >
            {/* Image display */}
            <div className="relative flex-grow min-h-[350px] md:min-h-[500px] md:w-3/5 bg-black">
              <Image
                src={galleryItems[activeIndex].image}
                alt="Instagram Lightbox"
                fill
                className="object-contain"
              />
            </div>

            {/* Right details box */}
            <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between bg-[#FCFAF7]">
              <div>
                <div className="flex items-center space-x-3 pb-4 border-b border-[#EBDCD0]">
                  <div className="h-8 w-8 rounded-full caramel-icon-circle flex items-center justify-center font-serif text-sm font-bold">
                    S
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#2A1A10]">
                      sweetcrumbs_bakery
                    </h4>
                    <p className="font-sans text-[10px] text-gray-500">
                      Artisan Bakery
                    </p>
                  </div>
                </div>

                <p className="font-sans text-sm text-[#2A1A10]/95 leading-relaxed mt-6">
                  {galleryItems[activeIndex].caption}
                </p>
              </div>

              <div className="pt-6 border-t border-[#EBDCD0] flex items-center justify-between">
                <span className="font-sans text-xs text-gray-500">
                  Instagram Showcase
                </span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-bold text-[#C88A58] hover:text-[#A05A2C] flex items-center space-x-1"
                >
                  <InstagramIcon className="h-4 w-4" />
                  <span>View on Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={showNext}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-[#FCFAF7] transition-all cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
