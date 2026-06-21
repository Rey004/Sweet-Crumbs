"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Navigation } from "lucide-react";

export default function LocationMap() {
  const [activeZone, setActiveZone] = useState<number | null>(null);

  const deliveryZones = [
    {
      id: 1,
      name: "Zone 1: Local Neighborhood (0 - 5 km)",
      details: "Free delivery for orders above $15. $3 flat fee otherwise.",
      color: "border-[#7F8C7D] bg-[#7F8C7D]/5",
      badgeColor: "bg-[#7F8C7D] text-[#FCFAF7]",
    },
    {
      id: 2,
      name: "Zone 2: City Center (5 - 12 km)",
      details: "Free delivery for orders above $50. $8 flat fee otherwise.",
      color: "border-[#C88A58] bg-[#C88A58]/5",
      badgeColor: "caramel-icon-circle",
    },
    {
      id: 3,
      name: "Zone 3: Outer Ring (12 - 20 km)",
      details: "Deliveries for Custom Cake orders only. $15 delivery fee.",
      color: "border-[#A05A2C] bg-[#A05A2C]/5",
      badgeColor: "bg-[#A05A2C] text-[#FCFAF7]",
    },
  ];

  return (
    <section id="visit" className="py-20 bg-[#FCFAF7] border-t border-[#EBDCD0]/45">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="caramel-label font-sans text-xs font-bold uppercase tracking-widest">
            Find Us & Delivery Details
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#2A1A10] mt-3">
            Visit Our Bakery Shop
          </h2>
          <div className="h-[3px] caramel-bar w-12 mx-auto mt-4" />
          <p className="font-sans text-sm text-[#2A1A10]/70 mt-4">
            Located in the heart of the Artisan District. Stop by for hot cinnamon rolls, or configure delivery straight to your doorstep.
          </p>
        </div>

        {/* Map & Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="bg-[#F5EBE0]/30 border border-[#EBDCD0] rounded-3xl p-6 sm:p-8 space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full caramel-icon-circle flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#2A1A10]">
                    Bakery Location
                  </h4>
                  <p className="font-sans text-sm text-[#2A1A10]/80 mt-1 leading-relaxed">
                    128 Sweet Bakers Lane,<br />
                    Artisan District, NY 10012
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-[#C88A58] flex items-center justify-center text-[#FCFAF7] shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#2A1A10]">
                    Store Hours
                  </h4>
                  <div className="font-sans text-sm text-[#2A1A10]/85 mt-1 space-y-1.5">
                    <p className="flex justify-between w-[200px]">
                      <span>Mon - Fri:</span>
                      <span className="font-bold">7:00 AM - 6:00 PM</span>
                    </p>
                    <p className="flex justify-between w-[200px]">
                      <span>Sat - Sun:</span>
                      <span className="font-bold">8:00 AM - 4:00 PM</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Contacts */}
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-[#C88A58] flex items-center justify-center text-[#FCFAF7] shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#2A1A10]">
                    Get In Touch
                  </h4>
                  <p className="font-sans text-sm text-[#2A1A10]/80 mt-1">
                    Phone: <span className="font-bold">(555) 345-0987</span><br />
                    Email: <span className="font-bold">hello@sweetcrumbs.com</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Zones details list */}
            <div className="space-y-3">
              <h4 className="font-serif text-xl font-bold text-[#2A1A10] flex items-center space-x-2 px-2">
                <Navigation className="h-5 w-5 text-[#C88A58]" />
                <span>Coverage Delivery Zones</span>
              </h4>
              <div className="space-y-2">
                {deliveryZones.map((zone) => (
                  <div
                    key={zone.id}
                    onMouseEnter={() => setActiveZone(zone.id)}
                    onMouseLeave={() => setActiveZone(null)}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${zone.color} ${
                      activeZone === zone.id ? "scale-[1.01] shadow-sm" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${zone.badgeColor}`}>
                        Zone {zone.id}
                      </span>
                      <h5 className="font-sans text-xs sm:text-sm font-bold text-[#2A1A10]">
                        {zone.name.split(": ")[1]}
                      </h5>
                    </div>
                    <p className="font-sans text-xs text-[#2A1A10]/70 mt-1.5 leading-relaxed">
                      {zone.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Custom Interactive Map */}
          <div className="lg:col-span-7 bg-[#F5EBE0]/30 rounded-3xl p-4 sm:p-6 border border-[#EBDCD0] flex flex-col justify-between">
            {/* Visual Header */}
            <div className="flex justify-between items-center mb-4 px-2">
              <span className="font-sans text-xs font-bold text-gray-500 uppercase tracking-widest">
                Interactive Coverage Radar
              </span>
              <span className="font-sans text-[10px] bg-[#7F8C7D] text-[#FCFAF7] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
                Sweet Crumbs Center
              </span>
            </div>

            {/* Real Interactive Google Map */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FCFAF7] border border-[#EBDCD0] shadow-inner">
              <iframe
                title="Sweet Crumbs Bakery Location"
                src="https://maps.google.com/maps?q=SoHo,%20New%20York,%20NY%2010012&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[15%] contrast-[110%] opacity-95 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-4 font-sans text-xs">
              <a
                href="https://maps.google.com/?q=SoHo,+New+York,+NY+10012"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2A1A10] text-[#FCFAF7] hover:brightness-125 py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300 text-center shadow"
              >
                Open Google Maps Directions
              </a>
              <button
                onClick={() => {
                  alert("Call: (555) 345-0987\nOur team is ready to answer questions!");
                }}
                className="border border-[#2A1A10] hover:bg-[#F5EBE0] text-[#2A1A10] py-3.5 rounded-xl font-bold tracking-wide transition-all duration-300"
              >
                Call Customer Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
