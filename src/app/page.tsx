"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import FreshSpecials from "@/components/FreshSpecials";
import CakeBuilder from "@/components/CakeBuilder";
import OccasionsSection from "@/components/OccasionsSection";
import InstagramGallery from "@/components/InstagramGallery";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationMap from "@/components/LocationMap";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { CartItem, Product } from "@/types";
import { MessageCircle } from "lucide-react";

export default function Home() {
  // Global Shopping Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Custom Cake Occasion Deep Link State
  const [deepLinkOccasion, setDeepLinkOccasion] = useState<string>("");

  // Handler: Add standard catalog item to cart
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          type: "product",
        };
        return [...prevItems, newItem];
      }
    });
  };

  // Handler: Add custom cake to cart
  const handleAddCustomCakeToCart = (cakeItem: CartItem) => {
    setCartItems((prevItems) => [...prevItems, cakeItem]);
    setIsCartOpen(true); // Auto-open cart to show customization
  };

  // Handler: Update cart item quantity
  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // Handler: Remove item from cart
  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Handler: Navigation Scroll Trigger
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handler: Occasion click (sets CakeBuilder selection and scrolls down)
  const handleOccasionSelect = (occasion: string) => {
    setDeepLinkOccasion(occasion);
    // Reset after trigger so subsequent clicks work
    setTimeout(() => setDeepLinkOccasion(""), 100);
  };

  // Helper: Get total count of cart items for Badge
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Map product IDs in cart to quantities for add-to-cart badges
  const cartItemQuantities = cartItems.reduce((acc, item) => {
    if (item.type === "product") {
      acc[item.id] = item.quantity;
    }
    return acc;
  }, {} as { [id: string]: number });

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FCFAF7] text-[#2A1A10]">
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection
          onOrderNowClick={() => handleNavigate("menu")}
          onCustomCakeClick={() => handleNavigate("cake-builder")}
        />

        {/* Specials (Today's Limited Bakes) */}
        <FreshSpecials
          onAddToCart={handleAddToCart}
          cartItems={cartItemQuantities}
        />

        {/* Featured Products Menu */}
        <FeaturedProducts
          onAddToCart={handleAddToCart}
          cartItems={cartItemQuantities}
        />

        {/* Custom Cake Builder */}
        <CakeBuilder
          onAddCustomCakeToCart={handleAddCustomCakeToCart}
          deepLinkOccasion={deepLinkOccasion}
        />

        {/* Event Occasions Showcase */}
        <OccasionsSection onOccasionSelect={handleOccasionSelect} />

        {/* Instagram Masonry Gallery */}
        <InstagramGallery />

        {/* Customer Reviews & Testimonials */}
        <TestimonialsSection />

        {/* Location Hours, Contact Info & Radar Zone Map */}
        <LocationMap />
      </main>

      {/* Footer */}
      <Footer />

      {/* Shopping Cart Slider Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 group flex flex-col items-end space-y-2">
        {/* Tooltip */}
        <div className="bg-[#1D110A] text-[#FCFAF7] px-3.5 py-2 rounded-xl text-xs font-bold shadow-xl border border-[#DEC0A8]/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1">
          💬 Need help? Order via WhatsApp!
        </div>

        {/* Trigger Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-[#1EBE5D] hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white"
          aria-label="Floating Cart Contact"
        >
          {/* Large WhatsApp Icon */}
          <svg className="h-7 w-7 fill-current text-white shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
