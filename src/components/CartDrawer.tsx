"use client";

import React, { useState } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, Calendar, Phone, User, MessageSquare, Clock, Check, Cake } from "lucide-react";
import { CartItem } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart?: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [orderDate, setOrderDate] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  
  // Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  // Totals calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = fulfillment === "delivery" && subtotal < 50.0 ? 8.0 : 0.0;
  const grandTotal = subtotal + deliveryFee;

  // Check if any cart items contain reference images
  const refImageNames = cartItems
    .filter((item) => item.type === "custom_cake" && item.details?.referenceImageName)
    .map((item) => item.details?.referenceImageName)
    .join(", ");
  const hasRefImage = refImageNames.length > 0;

  // WhatsApp Order Submission
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !orderDate || !orderTime) {
      alert("Please fill in all the required customer details.");
      return;
    }

    // WhatsApp phone number (in international format, e.g., 919028173558)
    const phone = "919028173558";

    // Build WhatsApp Message Body
    let text = `*NEW ORDER - SWEET CRUMBS*\n`;
    text += `===============================\n\n`;
    text += `*CUSTOMER INFO*\n`;
    text += `- *Name:* ${customerName}\n`;
    text += `- *Phone:* ${customerPhone}\n`;
    text += `- *Fulfillment:* ${fulfillment.toUpperCase()}\n`;
    text += `- *Preferred Date:* ${orderDate}\n`;
    text += `- *Preferred Time:* ${orderTime}\n`;
    if (specialRequest) {
      text += `- *Instructions:* "${specialRequest}"\n`;
    }
    text += `\n*ORDERED ITEMS*\n`;

    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.name}* (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
      if (item.type === "custom_cake" && item.details) {
        text += `   - _Flavor:_ ${item.details.flavor}\n`;
        text += `   - _Frosting:_ ${item.details.frosting}\n`;
        if (item.description && item.description.includes('Message:')) {
          const msgMatch = item.description.match(/"([^"]+)"/);
          if (msgMatch) {
            text += `   - _Message on Cake:_ "${msgMatch[1]}"\n`;
          }
        }
        if (item.details.referenceImageName) {
          text += `   - _Reference Photo:_ ${item.details.referenceImageName} (Please attach this image file in this chat!)\n`;
        }
      }
    });

    text += `\n===============================\n`;
    text += `*ORDER SUMMARY*\n`;
    text += `- *Subtotal:* $${subtotal.toFixed(2)}\n`;
    text += `- *Delivery Fee:* ${deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}\n`;
    text += `- *Grand Total:* *$${grandTotal.toFixed(2)}*\n\n`;
    text += `Thank you! Please confirm my order details above.`;

    const encodedText = encodeURIComponent(text);
    const generatedUrl = `https://wa.me/${phone}?text=${encodedText}`;

    setWhatsappUrl(generatedUrl);
    setShowSuccessModal(true);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden font-sans transition-all duration-300 ${
      isOpen ? "pointer-events-auto" : "pointer-events-none"
    }`}>
      {/* Black backdrop shadow overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md bg-[#FCFAF7] border-l border-[#EBDCD0] shadow-2xl flex flex-col h-full transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#EBDCD0] bg-[#FCFAF7] flex justify-between items-center">
            <h3 className="font-serif text-2xl font-bold text-[#2A1A10] flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-[#C88A58]" />
              <span>Your Basket</span>
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F5EBE0] text-[#2A1A10] transition-colors"
              aria-label="Close Cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart items / Form scroll area */}
          <div className="flex-grow overflow-y-auto px-6 py-4 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <ShoppingBag className="h-16 w-16 text-[#EBDCD0] mx-auto stroke-1" />
                <p className="font-serif text-lg font-bold text-[#2A1A10]">
                  Your cart is empty!
                </p>
                <p className="text-xs text-[#2A1A10]/60 max-w-[250px] mx-auto leading-relaxed">
                  Browse our menu and add freshly baked treats to start your order.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#C88A58] hover:bg-[#A05A2C] text-[#FCFAF7] px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* List Items */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Selected Items ({cartItems.length})
                  </h4>
                  <div className="divide-y divide-[#EBDCD0]/40">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-4 flex space-x-4 first:pt-0">
                        {/* Item image */}
                        <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-[#F5EBE0] border border-[#EBDCD0]/50 shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover h-full w-full"
                          />
                        </div>

                        {/* Item content */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h5 className="font-serif text-sm font-bold text-[#2A1A10]">
                                {item.name}
                              </h5>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="p-1 rounded-full text-red-500 hover:bg-[#F5EBE0]"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            {item.type === "custom_cake" && (
                              <p className="text-[10px] text-gray-500 italic mt-0.5 max-w-[200px] truncate">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="font-serif text-sm font-bold text-[#C88A58]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>

                            {/* Qty edit buttons */}
                            <div className="flex items-center space-x-2 border border-[#EBDCD0] bg-white rounded-lg px-2 py-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:text-[#C88A58]"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-semibold w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:text-[#C88A58]"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Billing Details Form */}
                <form onSubmit={handlePlaceOrder} className="border-t border-[#EBDCD0] pt-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Checkout Information
                  </h4>

                  {/* Customer Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1 flex items-center space-x-1">
                      <User className="h-3 w-3 text-[#C88A58]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white border border-[#EBDCD0] rounded-xl px-4 py-2.5 text-xs text-[#2A1A10] focus:outline-none focus:border-[#C88A58]"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1 flex items-center space-x-1">
                      <Phone className="h-3 w-3 text-[#C88A58]" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 555-0199"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-white border border-[#EBDCD0] rounded-xl px-4 py-2.5 text-xs text-[#2A1A10] focus:outline-none focus:border-[#C88A58]"
                    />
                  </div>

                  {/* Fulfillment Selection */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1">
                      Order Option *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFulfillment("pickup")}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          fulfillment === "pickup"
                            ? "bg-[#C88A58] text-[#FCFAF7] border-[#C88A58]"
                            : "bg-white text-[#2A1A10] border-[#EBDCD0] hover:bg-[#F5EBE0]/40"
                        }`}
                      >
                        Bakery Pickup
                      </button>
                      <button
                        type="button"
                        onClick={() => setFulfillment("delivery")}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          fulfillment === "delivery"
                            ? "bg-[#C88A58] text-[#FCFAF7] border-[#C88A58]"
                            : "bg-white text-[#2A1A10] border-[#EBDCD0] hover:bg-[#F5EBE0]/40"
                        }`}
                      >
                        Local Delivery
                      </button>
                    </div>
                  </div>

                  {/* Fulfillment Date & Time */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1 flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-[#C88A58]" />
                        <span>Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        className="w-full bg-white border border-[#EBDCD0] rounded-xl px-3 py-2.5 text-xs text-[#2A1A10] focus:outline-none focus:border-[#C88A58]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1 flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-[#C88A58]" />
                        <span>Time *</span>
                      </label>
                      <input
                        type="time"
                        required
                        value={orderTime}
                        onChange={(e) => setOrderTime(e.target.value)}
                        className="w-full bg-white border border-[#EBDCD0] rounded-xl px-3 py-2.5 text-xs text-[#2A1A10] focus:outline-none focus:border-[#C88A58]"
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 uppercase mb-1 flex items-center space-x-1">
                      <MessageSquare className="h-3 w-3 text-[#C88A58]" />
                      <span>Special Notes / Requests</span>
                    </label>
                    <textarea
                      placeholder="e.g. Allergies, delivery door code, cake candles..."
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full bg-white border border-[#EBDCD0] rounded-xl px-4 py-2 text-xs text-[#2A1A10] focus:outline-none focus:border-[#C88A58] h-16 resize-none"
                    />
                  </div>

                  {/* Total Calculations Panel */}
                  <div className="bg-[#F5EBE0]/30 rounded-2xl p-4 border border-[#EBDCD0] mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-gray-600 font-sans">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {fulfillment === "delivery" && (
                      <div className="flex justify-between text-xs text-gray-600 font-sans">
                        <span>Delivery Fee</span>
                        <span>{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
                      </div>
                    )}
                    {fulfillment === "delivery" && subtotal < 50.0 && (
                      <p className="text-[10px] text-gray-500 font-bold italic leading-tight">
                        💡 Add ${(50.0 - subtotal).toFixed(2)} more to qualify for Free Delivery!
                      </p>
                    )}
                    <div className="border-t border-[#EBDCD0] pt-2 mt-2 flex justify-between text-sm font-bold font-serif text-[#2A1A10]">
                      <span>Total Amount</span>
                      <span className="text-base text-[#C88A58]">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Submit Order Action Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center space-x-2 mt-6 cursor-pointer"
                  >
                    {/* SVG logo icon in button */}
                    <svg className="h-4.5 w-4.5 fill-current text-white shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Confirm Order via WhatsApp</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity duration-300">
          <div className="w-full max-w-xl bg-[#FCFAF7] border-2 border-dashed border-[#DEC0A8] rounded-3xl shadow-2xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 min-h-[250px] animate-popup select-none">
            {/* Close Cross Button */}
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EEDFD2]/50 text-[#1D110A]/60 hover:text-[#1D110A] transition-colors z-20"
              aria-label="Close success modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Whimsical background details */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#EEDFD2]/30 rounded-full blur-xl opacity-50 pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#E1E5DF]/30 rounded-full blur-xl opacity-50 pointer-events-none" />
            
            {/* Left Column: Icon & Headings */}
            <div className="md:w-5/12 flex flex-col items-center md:items-start text-center md:text-left shrink-0 z-10">
              <div className="h-12 w-12 bg-[#E1E5DF] rounded-full flex items-center justify-center text-[#6B7B69] mb-3 relative shadow-inner">
                <Cake className="h-6 w-6 text-[#BF7B47]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1D110A] mb-1 leading-tight">
                Treats Ready! 🎂✨
              </h3>
              <p className="text-[11px] text-gray-500 leading-normal max-w-[180px]">
                Click below to send your order details directly to our bakers on WhatsApp.
              </p>
            </div>

            {/* Right Column: Mini Summary & Buttons */}
            <div className="md:w-7/12 w-full flex flex-col justify-center space-y-4 z-10">
              {/* Mini Summary Box */}
              <div className="bg-[#EEDFD2]/20 border border-[#DEC0A8]/40 rounded-xl p-3.5 flex justify-between items-center text-xs gap-2">
                <div className="text-left">
                  <span className="text-[9px] text-gray-400 block uppercase font-bold">Fulfillment</span>
                  <span className="font-semibold text-xs text-[#1D110A]">
                    {fulfillment === "delivery" ? "🚀 Delivery" : "🛍️ Pickup"}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[9px] text-gray-400 block uppercase font-bold">Date & Time</span>
                  <span className="font-semibold text-xs text-[#1D110A] block max-w-[100px] truncate">
                    {orderDate} @ {orderTime}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gray-400 block uppercase font-bold">Total</span>
                  <span className="font-bold text-xs text-[#BF7B47] block">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Reference Image Notice */}
              {hasRefImage && (
                <div className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 font-medium leading-snug flex items-start space-x-1.5 shadow-sm">
                  <span className="shrink-0 mt-0.5">⚠️</span>
                  <span><strong>Important:</strong> Please attach your design reference photo(s) (<strong>{refImageNames}</strong>) in the WhatsApp window when it opens!</span>
                </div>
              )}
 
              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    window.open(whatsappUrl, "_blank");
                    if (onClearCart) onClearCart();
                    setShowSuccessModal(false);
                    onClose(); // Close the drawer
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center cursor-pointer"
                >
                  {/* WhatsApp Logo SVG */}
                  <svg className="h-4.5 w-4.5 fill-current text-white mr-2 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Send WhatsApp Order</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-transparent hover:bg-[#EEDFD2]/40 text-[#1D110A] py-1 rounded-xl text-[10px] font-bold transition-all"
                >
                  Modify Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
