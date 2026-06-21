"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FEATURED_PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { Plus, Check } from "lucide-react";

interface FeaturedProductsProps {
  onAddToCart: (product: Product) => void;
  cartItems: { [id: string]: number };
}

export default function FeaturedProducts({
  onAddToCart,
  cartItems,
}: FeaturedProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { label: "All Delicacies", value: "all" },
    { label: "Signature Cakes", value: "cakes" },
    { label: "Flaky Pastries", value: "pastries" },
    { label: "Artisan Breads", value: "breads" },
    { label: "Gourmet Cookies", value: "cookies" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? FEATURED_PRODUCTS
      : FEATURED_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="menu" className="py-20 bg-[#F5EBE0]/30 border-t border-[#EBDCD0]/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#C88A58]">
            Crafted with Passion
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#2A1A10] mt-3">
            Explore Our Featured Bakes
          </h2>
          <div className="h-[3px] bg-[#C88A58] w-12 mx-auto mt-4" />
          <p className="font-sans text-sm text-[#2A1A10]/70 mt-4">
            From the crisp layer of a morning croissant to the rich melt of our signature truffle cake, discover our daily selection of handmade bakes.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-sm cursor-pointer ${
                selectedCategory === cat.value
                  ? "bg-[#C88A58] text-[#FCFAF7] shadow-md scale-105"
                  : "bg-[#FCFAF7] border border-[#EBDCD0] text-[#2A1A10] hover:bg-[#F5EBE0] hover:text-[#C88A58]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const quantityInCart = cartItems[product.id] || 0;
            return (
              <div
                key={product.id}
                className="group bg-[#FCFAF7] rounded-[2rem] border border-[#EBDCD0]/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1.5"
              >
                {/* Product Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5EBE0]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-w-768px) 100vw, 380px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A10]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1A10] group-hover:text-[#C88A58] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <span className="font-serif text-lg sm:text-xl font-bold text-[#C88A58] ml-2">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#2A1A10]/70 mt-3 leading-relaxed flex-grow">
                    {product.description}
                  </p>

                  {/* Add to Cart Actions */}
                  <div className="mt-6 pt-4 border-t border-[#EBDCD0]/40 flex items-center justify-between">
                    <span className="font-sans text-[11px] font-bold text-[#C88A58] uppercase tracking-wider bg-[#F5EBE0] px-3 py-1 rounded-full border border-[#EBDCD0]/40">
                      {product.category}
                    </span>

                    <button
                      onClick={() => onAddToCart(product)}
                      className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold tracking-wide transition-all duration-300 flex items-center space-x-1.5 cursor-pointer shadow-sm ${
                        quantityInCart > 0
                          ? "bg-[#7F8C7D] text-[#FCFAF7] hover:bg-[#687466]"
                          : "bg-[#C88A58] text-[#FCFAF7] hover:bg-[#A05A2C] hover:shadow"
                      }`}
                    >
                      {quantityInCart > 0 ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Added ({quantityInCart})</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
