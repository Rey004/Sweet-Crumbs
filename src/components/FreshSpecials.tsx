"use client";

import React from "react";
import Image from "next/image";
import { TODAY_SPECIALS } from "@/data/products";
import { Product } from "@/types";
import { Flame, Clock, ShoppingCart } from "lucide-react";

interface FreshSpecialsProps {
  onAddToCart: (product: Product) => void;
  cartItems: { [id: string]: number };
}

export default function FreshSpecials({
  onAddToCart,
  cartItems,
}: FreshSpecialsProps) {
  return (
    <section id="specials" className="py-20 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl text-left">
            <span className="caramel-label font-sans text-xs font-bold uppercase tracking-widest flex items-center space-x-1">
              <Flame className="h-4 w-4 fill-current text-[#C88A58]" />
              <span>Today's Fresh Batch</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1A10] mt-3">
              Specials Out of the Oven
            </h2>
            <p className="font-sans text-sm text-[#2A1A10]/70 mt-3">
              Baked in limited quantities early this morning. Once they are gone, they are gone until tomorrow!
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-xs font-bold font-sans text-[#2A1A10]/60 bg-[#F5EBE0] px-4 py-2 rounded-full border border-[#EBDCD0]">
            <Clock className="h-4 w-4 text-[#C88A58]" />
            <span>Updated at 7:00 AM Today</span>
          </div>
        </div>

        {/* Desktop Layout: Specials Cards Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
          {TODAY_SPECIALS.map((product) => {
            const available = product.availableQuantity || 0;
            const total = product.limitQuantity || 1;
            const percentage = (available / total) * 100;
            const quantityInCart = cartItems[product.id] || 0;

            return (
              <div
                key={product.id}
                className="bg-[#F5EBE0]/40 rounded-3xl p-5 border border-[#EBDCD0] hover:shadow-xl transition-all duration-300 flex flex-col relative"
              >
                {/* Urgency Badge */}
                <div className="absolute top-8 left-8 z-10">
                  <span className="bg-[#A05A2C] text-[#FCFAF7] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow border border-[#FCFAF7]/20 flex items-center space-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FCFAF7]" />
                    <span>{product.badge}</span>
                  </span>
                </div>

                {/* Image */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#F5EBE0] shadow-inner mb-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="350px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1A10]">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#2A1A10]/70 mt-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-6">
                    {/* Stock Status Bar */}
                    <div className="space-y-2 mb-5">
                      <div className="flex justify-between text-xs font-bold font-sans">
                        <span className="text-[#2A1A10]/60">Quantity Available</span>
                        <span className={available <= 3 ? "text-[#A05A2C] font-extrabold" : "text-[#2A1A10]"}>
                          {available} of {total} left
                        </span>
                      </div>
                      <div className="w-full bg-[#EBDCD0] h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                              available <= 3 ? "bg-[#A05A2C]" : "caramel-bar"
                            }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#EBDCD0]/60">
                      <span className="font-serif text-xl font-bold text-[#C88A58]">
                        ${product.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => onAddToCart(product)}
                        disabled={available === 0}
                        className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold tracking-wide transition-all duration-300 flex items-center space-x-1.5 cursor-pointer shadow-sm ${
                          available === 0
                            ? "bg-[#EBDCD0] text-[#2A1A10]/40 cursor-not-allowed shadow-none"
                            : quantityInCart > 0
                            ? "bg-[#7F8C7D] text-[#FCFAF7] hover:bg-[#687466]"
                            : "caramel-btn hover:shadow cursor-pointer shadow-sm"
                        }`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>
                          {available === 0
                            ? "Sold Out"
                            : quantityInCart > 0
                            ? `In Cart (${quantityInCart})`
                            : "Quick Order"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet & Mobile Layout: Horizontal Scrollable Slider */}
        <div className="lg:hidden relative">
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#C88A58]/20 scrollbar-track-transparent scroll-smooth px-2">
            {TODAY_SPECIALS.map((product) => {
              const available = product.availableQuantity || 0;
              const total = product.limitQuantity || 1;
              const percentage = (available / total) * 100;
              const quantityInCart = cartItems[product.id] || 0;

              return (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] bg-[#F5EBE0]/40 rounded-3xl p-5 border border-[#EBDCD0] flex flex-col justify-between relative snap-center"
                >
                  {/* Urgency Badge */}
                  <div className="absolute top-8 left-8 z-10">
                    <span className="bg-[#A05A2C] text-[#FCFAF7] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow border border-[#FCFAF7]/20 flex items-center space-x-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FCFAF7]" />
                      <span>{product.badge}</span>
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#F5EBE0] shadow-inner mb-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1A10]">
                        {product.name}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#2A1A10]/70 mt-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-6">
                      {/* Stock Status Bar */}
                      <div className="space-y-2 mb-5">
                        <div className="flex justify-between text-xs font-bold font-sans">
                          <span className="text-[#2A1A10]/60">Quantity Available</span>
                          <span className={available <= 3 ? "text-[#A05A2C] font-extrabold" : "text-[#2A1A10]"}>
                            {available} of {total} left
                          </span>
                        </div>
                        <div className="w-full bg-[#EBDCD0] h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              available <= 3 ? "bg-[#A05A2C]" : "bg-[#C88A58]"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#EBDCD0]/60">
                        <span className="caramel-text font-serif text-xl font-bold">
                          ${product.price.toFixed(2)}
                        </span>

                        <button
                          onClick={() => onAddToCart(product)}
                          disabled={available === 0}
                          className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold tracking-wide transition-all duration-300 flex items-center space-x-1.5 cursor-pointer shadow-sm ${
                            available === 0
                              ? "bg-[#EBDCD0] text-[#2A1A10]/40 cursor-not-allowed shadow-none"
                              : quantityInCart > 0
                              ? "bg-[#7F8C7D] text-[#FCFAF7] hover:bg-[#687466]"
                              : "bg-[#C88A58] text-[#FCFAF7] hover:bg-[#A05A2C] hover:shadow"
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>
                            {available === 0
                              ? "Sold Out"
                              : quantityInCart > 0
                              ? `In Cart (${quantityInCart})`
                              : "Quick Order"}
                          </span>
                        </button>
                      </div>
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
