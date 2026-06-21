"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, FileImage, ClipboardList, Info, UploadCloud, Cake } from "lucide-react";
import { CartItem } from "@/types";

interface CakeBuilderProps {
  onAddCustomCakeToCart: (cakeItem: CartItem) => void;
  deepLinkOccasion?: string; // lets other sections preset the occasion
}

export default function CakeBuilder({
  onAddCustomCakeToCart,
  deepLinkOccasion,
}: CakeBuilderProps) {
  // Option Lists
  const sizes = [
    { label: "6\" Single Layer (Serves 6-8)", value: "6inch", price: 40.0 },
    { label: "8\" Single Layer (Serves 10-15)", value: "8inch", price: 55.0 },
    { label: "10\" Single Layer (Serves 20-25)", value: "10inch", price: 70.0 },
    { label: "2-Tier (6\" + 8\" - Serves 30-35)", value: "2tier", price: 120.0 },
    { label: "3-Tier (6\" + 8\" + 10\" - Serves 50+)", value: "3tier", price: 210.0 },
  ];

  const flavors = [
    { label: "Vanilla Bean Classic", value: "vanilla", price: 0.0 },
    { label: "Double Chocolate Truffle", value: "chocolate", price: 5.0 },
    { label: "Rich Salted Caramel Drip", value: "caramel", price: 5.0 },
    { label: "Southern Red Velvet", value: "velvet", price: 8.0 },
    { label: "Zesty Lemon Raspberry", value: "lemon", price: 8.0 },
  ];

  const frostings = [
    { label: "Smooth Buttercream (Classic)", value: "smooth", price: 0.0 },
    { label: "Semi-Naked (Rustic/Elegant)", value: "naked", price: 0.0 },
    { label: "Rustic Textured Swirls", value: "textured", price: 5.0 },
    { label: "Salted Caramel Drip Style", value: "drip", price: 10.0 },
    { label: "Luxury Gold Leaf & Petals", value: "gold-leaf", price: 15.0 },
  ];

  const occasions = ["Birthday", "Wedding", "Anniversary", "Corporate Event", "Graduation", "Custom Theme"];

  // State Variables
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(frostings[0]);
  const [occasion, setOccasion] = useState(occasions[0]);
  const [cakeMessage, setCakeMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  // Deep Link preset occasion
  useEffect(() => {
    if (deepLinkOccasion && occasions.includes(deepLinkOccasion)) {
      setOccasion(deepLinkOccasion);
      // scroll to builder if clicked
      const el = document.getElementById("cake-builder");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [deepLinkOccasion]);

  // Set tomorrow as minimum delivery date
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2); // 2 days notice minimum
    setMinDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Pricing calculations
  const basePrice = selectedSize.price;
  const flavorPrice = selectedFlavor.price;
  const frostingPrice = selectedFrosting.price;
  const totalPrice = basePrice + flavorPrice + frostingPrice;

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
      
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  // Submit custom cake to cart
  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryDate) {
      alert("Please select a preferred delivery date.");
      return;
    }

    const uniqueId = `custom-cake-${Date.now()}`;
    const customCakeItem: CartItem = {
      id: uniqueId,
      name: `Custom ${occasion} Cake (${selectedSize.label.split(" (")[0]})`,
      price: totalPrice,
      quantity: 1,
      image: fileUrl || "/images/custom_cake.webp",
      type: "custom_cake",
      description: `Flavor: ${selectedFlavor.label} | Frosting: ${selectedFrosting.label} | Message: "${cakeMessage || "None"}"`,
      details: {
        flavor: selectedFlavor.label,
        size: selectedSize.label,
        frosting: selectedFrosting.label,
        occasion: occasion,
        date: deliveryDate,
        referenceImageName: fileName || undefined,
      },
    };

    onAddCustomCakeToCart(customCakeItem);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section id="cake-builder" className="py-20 bg-[#FCFAF7] border-t border-[#EBDCD0]/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#C88A58]">
            Interactive Cake Studio
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#2A1A10] mt-3">
            Design Your Custom Cake
          </h2>
          <div className="h-[3px] bg-[#C88A58] w-12 mx-auto mt-4" />
          <p className="font-sans text-sm text-[#2A1A10]/70 mt-4">
            Customize sizes, cake layers, signature flavor profiles, and design stylings. Get an immediate price estimate and add it directly to your WhatsApp order!
          </p>
        </div>

        {/* Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Hand Options Panel */}
          <form
            onSubmit={handleAddToCart}
            className="lg:col-span-7 bg-[#F5EBE0]/20 rounded-3xl p-6 sm:p-8 border border-[#EBDCD0] space-y-8"
          >
            {/* 1. Cake Size Selection */}
            <div>
              <label className="font-serif text-lg font-bold text-[#2A1A10] flex items-center space-x-2 mb-4">
                <span className="h-6 w-6 rounded-full bg-[#C88A58] text-[#FCFAF7] font-sans text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Select Size & Tiers</span>
              </label>
              <div className="space-y-3">
                {sizes.map((sz) => (
                  <label
                    key={sz.value}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:bg-[#F5EBE0]/30 ${
                      selectedSize.value === sz.value
                        ? "border-[#C88A58] bg-[#F5EBE0]/40"
                        : "border-[#EBDCD0]/50 bg-[#FCFAF7]"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="cake-size"
                        checked={selectedSize.value === sz.value}
                        onChange={() => setSelectedSize(sz)}
                        className="h-4 w-4 text-[#C88A58] focus:ring-[#C88A58] border-gray-300"
                      />
                      <span className="font-sans text-sm font-semibold text-[#2A1A10]">
                        {sz.label}
                      </span>
                    </div>
                    <span className="font-serif text-sm font-bold text-[#C88A58]">
                      ${sz.price.toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Flavor Profile Selection */}
            <div>
              <label className="font-serif text-lg font-bold text-[#2A1A10] flex items-center space-x-2 mb-4">
                <span className="h-6 w-6 rounded-full bg-[#C88A58] text-[#FCFAF7] font-sans text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Select Flavor Layer</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {flavors.map((fl) => (
                  <label
                    key={fl.value}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:bg-[#F5EBE0]/30 ${
                      selectedFlavor.value === fl.value
                        ? "border-[#C88A58] bg-[#F5EBE0]/40"
                        : "border-[#EBDCD0]/50 bg-[#FCFAF7]"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="cake-flavor"
                        checked={selectedFlavor.value === fl.value}
                        onChange={() => setSelectedFlavor(fl)}
                        className="h-4 w-4 text-[#C88A58] focus:ring-[#C88A58] border-gray-300"
                      />
                      <span className="font-sans text-xs sm:text-sm font-semibold text-[#2A1A10]">
                        {fl.label}
                      </span>
                    </div>
                    <span className="font-serif text-xs sm:text-sm text-[#C88A58]">
                      {fl.price > 0 ? `+$${fl.price.toFixed(0)}` : "Free"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Frosting Style Selection */}
            <div>
              <label className="font-serif text-lg font-bold text-[#2A1A10] flex items-center space-x-2 mb-4">
                <span className="h-6 w-6 rounded-full bg-[#C88A58] text-[#FCFAF7] font-sans text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>Select Design Style & Frosting</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {frostings.map((fr) => (
                  <label
                    key={fr.value}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:bg-[#F5EBE0]/30 ${
                      selectedFrosting.value === fr.value
                        ? "border-[#C88A58] bg-[#F5EBE0]/40"
                        : "border-[#EBDCD0]/50 bg-[#FCFAF7]"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="cake-frosting"
                        checked={selectedFrosting.value === fr.value}
                        onChange={() => setSelectedFrosting(fr)}
                        className="h-4 w-4 text-[#C88A58] focus:ring-[#C88A58] border-gray-300"
                      />
                      <span className="font-sans text-xs sm:text-sm font-semibold text-[#2A1A10]">
                        {fr.label}
                      </span>
                    </div>
                    <span className="font-serif text-xs sm:text-sm text-[#C88A58]">
                      {fr.price > 0 ? `+$${fr.price.toFixed(0)}` : "Free"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Event Details & Piping Text */}
            <div>
              <label className="font-serif text-lg font-bold text-[#2A1A10] flex items-center space-x-2 mb-4">
                <span className="h-6 w-6 rounded-full bg-[#C88A58] text-[#FCFAF7] font-sans text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <span>Occasion & Event Details</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Occasion Selector */}
                <div>
                  <label className="block text-xs font-bold font-sans text-[#2A1A10]/75 uppercase tracking-wider mb-2">
                    Event Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#FCFAF7] border border-[#EBDCD0] text-[#2A1A10] rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C88A58] transition-colors"
                  >
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="block text-xs font-bold font-sans text-[#2A1A10]/75 uppercase tracking-wider mb-2">
                    Preferred Collection/Delivery Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={minDate}
                      required
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full bg-[#FCFAF7] border border-[#EBDCD0] text-[#2A1A10] rounded-xl px-4 py-3 pl-10 font-sans text-sm focus:outline-none focus:border-[#C88A58] transition-colors"
                    />
                    <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-[#C88A58] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Message on Cake */}
              <div className="mt-4">
                <label className="block text-xs font-bold font-sans text-[#2A1A10]/75 uppercase tracking-wider mb-2">
                  Custom Message written on Cake (max 30 letters)
                </label>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="e.g. Happy 30th Birthday Sarah!"
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  className="w-full bg-[#FCFAF7] border border-[#EBDCD0] text-[#2A1A10] rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#C88A58] transition-colors"
                />
              </div>

              {/* Reference Image Drag and Drop */}
              <div className="mt-4">
                <label className="block text-xs font-bold font-sans text-[#2A1A10]/75 uppercase tracking-wider mb-2">
                  Upload Reference Design (Optional)
                </label>
                <div className="relative border-2 border-dashed border-[#EBDCD0] hover:border-[#C88A58] rounded-xl p-4 flex flex-col items-center justify-center transition-all bg-[#FCFAF7] cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="h-8 w-8 text-[#C88A58] mb-2" />
                  <p className="font-sans text-xs font-bold text-[#2A1A10]">
                    {fileName ? `Selected: ${fileName}` : "Click to select a reference photo"}
                  </p>
                  <p className="font-sans text-[10px] text-[#2A1A10]/60 mt-1">
                    PNG, JPG or JPEG up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Note box */}
            <div className="bg-[#FCFAF7] border border-[#EBDCD0] rounded-2xl p-4 flex items-start space-x-3">
              <Info className="h-5 w-5 text-[#C88A58] shrink-0 mt-0.5" />
              <p className="font-sans text-xs text-[#2A1A10]/80 leading-relaxed">
                <strong>Notice:</strong> We require a minimum of 48 hours notice for all custom cake orders. Our custom cake orders are hand-decorated and finalized upon WhatsApp confirmation.
              </p>
            </div>
          </form>

          {/* Right Hand Live Summary Card */}
          <div className="lg:col-span-5 sticky top-28 bg-[#FCFAF7] border-2 border-[#C88A58] rounded-[2rem] shadow-xl overflow-hidden flex flex-col">
            {/* Header Render Image (Static) */}
            <div className="relative aspect-[16/7] w-full bg-[#F5EBE0] shrink-0">
              <Image
                src="/images/custom_cake.webp"
                alt="Custom cake preview illustration"
                fill
                sizes="(max-w-768px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A10]/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-5 text-[#FCFAF7]">
                <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-[#F5EBE0] bg-[#C88A58] px-2 py-0.5 rounded-full">
                  {occasion} Special
                </span>
                <h3 className="font-serif text-xl font-bold mt-0.5">
                  Your Dream Cake
                </h3>
              </div>
            </div>

            {/* Bill Details Area */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-4">
              {/* Header (Static) */}
              <h4 className="font-serif text-lg font-bold text-[#2A1A10] flex items-center space-x-2 border-b border-[#EBDCD0] pb-2 shrink-0">
                <ClipboardList className="h-4.5 w-4.5 text-[#C88A58]" />
                <span>Customization Summary</span>
              </h4>

              {/* Scrollable Summary List (Only this part scrolls!) */}
              <div className="max-h-28 overflow-y-auto pr-2 custom-card-scrollbar shrink-0 my-1">
                <ul className="space-y-2 font-sans text-xs sm:text-sm">
                  {/* Size */}
                  <li className="flex justify-between items-center text-[#2A1A10]">
                    <span className="text-gray-600">Size Selection:</span>
                    <span className="font-semibold text-right max-w-[180px] truncate">
                      {selectedSize.label.split(" (")[0]}
                    </span>
                  </li>
                  {/* Flavor */}
                  <li className="flex justify-between items-center text-[#2A1A10]">
                    <span className="text-gray-600">Flavor Sponge:</span>
                    <span className="font-semibold">{selectedFlavor.label.split(" (")[0]}</span>
                  </li>
                  {/* Frosting */}
                  <li className="flex justify-between items-center text-[#2A1A10]">
                    <span className="text-gray-600">Frosting Finish:</span>
                    <span className="font-semibold">{selectedFrosting.label}</span>
                  </li>
                  {/* Message */}
                  {cakeMessage && (
                    <li className="flex justify-between items-center text-[#2A1A10]">
                      <span className="text-gray-600">Piping Inscription:</span>
                      <span className="font-semibold max-w-[150px] truncate" title={cakeMessage}>
                        "{cakeMessage}"
                      </span>
                    </li>
                  )}
                  {/* Date */}
                  {deliveryDate && (
                    <li className="flex justify-between items-center text-[#2A1A10]">
                      <span className="text-gray-600">Fulfillment Date:</span>
                      <span className="font-semibold text-[#7F8C7D]">{deliveryDate}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Subtotals list (Static at the bottom) */}
              <div className="bg-[#F5EBE0]/30 rounded-xl p-3 space-y-1.5 border border-[#EBDCD0] shrink-0">
                <div className="flex justify-between text-xs text-gray-600 font-sans">
                  <span>Base Tier Price</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>
                {flavorPrice > 0 && (
                  <div className="flex justify-between text-xs text-gray-600 font-sans">
                    <span>Flavor Premium</span>
                    <span>+${flavorPrice.toFixed(2)}</span>
                  </div>
                )}
                {frostingPrice > 0 && (
                  <div className="flex justify-between text-xs text-gray-600 font-sans">
                    <span>Design Upgrade</span>
                    <span>+${frostingPrice.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-[#EBDCD0] pt-1.5 mt-1.5 flex justify-between text-sm sm:text-base font-bold font-serif text-[#2A1A10]">
                  <span>Estimated Total</span>
                  <span className="text-lg text-[#C88A58]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Add to Cart Trigger (Static at the bottom) */}
              <button
                type="submit"
                onClick={handleAddToCart}
                className={`w-full text-[#FCFAF7] py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer shrink-0 ${
                  isSuccess
                    ? "bg-[#7F8C7D] hover:bg-[#687466]"
                    : "bg-[#C88A58] hover:bg-[#A05A2C] hover:shadow-lg"
                }`}
              >
                <Cake className="h-4.5 w-4.5" />
                <span>{isSuccess ? "Custom Cake Added!" : "Add Custom Cake to Cart"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
