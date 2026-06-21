"use client";

import React from "react";
import { Star, ShieldCheck, Heart, Users } from "lucide-react";

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Evelyn R.",
      role: "Verified Sweet Tooth",
      quote: "The Salted Caramel Drip Cake was the absolute highlight of my birthday! Not only was it gorgeous enough for a magazine cover, it tasted incredibly rich and moist. Everybody loved it!",
      rating: 5,
      date: "2 weeks ago",
      initial: "E",
      color: "bg-[#C88A58]",
    },
    {
      name: "David M.",
      role: "Bread Enthusiast",
      quote: "The Artisan Sourdough from Sweet Crumbs has become a staple in our home. A crispy blistered crust and a perfect open crumb. It makes the absolute best morning toast. Highly recommended!",
      rating: 5,
      date: "1 month ago",
      initial: "D",
      color: "bg-[#7F8C7D]",
    },
    {
      name: "Kiara T.",
      role: "Regular Customer",
      quote: "Ordering via WhatsApp is incredibly convenient. I selected my croissants and a tart, filled out the pickup form, and got a confirmation message in 2 minutes. The service is top notch!",
      rating: 5,
      date: "3 days ago",
      initial: "K",
      color: "bg-[#A05A2C]",
    },
    {
      name: "Marcus & Jess",
      role: "Happy Couple",
      quote: "Sweet Crumbs baked our wedding cake last month. The tiered semi-naked design was breathtakingly beautiful, and guests are still talking about the Zesty Lemon Raspberry flavor!",
      rating: 5,
      date: "2 months ago",
      initial: "M",
      color: "bg-[#2A1A10]",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#F5EBE0]/30 border-t border-[#EBDCD0]/45">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#C88A58]">
            Customer Stories
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#2A1A10] mt-3">
            Loved by Our Community
          </h2>
          <div className="h-[3px] bg-[#C88A58] w-12 mx-auto mt-4" />
          <p className="font-sans text-sm text-[#2A1A10]/70 mt-4">
            Hear from our neighbors and regular guests about their experiences with our fresh bakes and custom celebration cakes.
          </p>
        </div>

        {/* Testimonials Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Rating Aggregate statistics */}
          <div className="lg:col-span-4 bg-[#FCFAF7] border border-[#EBDCD0] rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#2A1A10] mb-6 flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#C88A58]" />
              <span>Overall Rating</span>
            </h3>

            <div className="flex items-baseline space-x-2 mb-2">
              <span className="font-serif text-5xl font-black text-[#2A1A10]">4.9</span>
              <span className="font-sans text-sm text-gray-500 font-semibold">out of 5.0</span>
            </div>

            {/* Stars row */}
            <div className="flex space-x-1 text-[#C88A58] mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            {/* Distribution bars */}
            <div className="space-y-3 font-sans text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-12 text-gray-600 font-bold">5 Stars</span>
                <div className="flex-grow bg-[#EBDCD0]/40 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#C88A58] h-full rounded-full" style={{ width: "94%" }} />
                </div>
                <span className="w-8 text-right text-gray-500 font-bold">94%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-12 text-gray-600 font-bold">4 Stars</span>
                <div className="flex-grow bg-[#EBDCD0]/40 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#C88A58] h-full rounded-full" style={{ width: "5%" }} />
                </div>
                <span className="w-8 text-right text-gray-500 font-bold">5%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-12 text-gray-600 font-bold">3 Stars</span>
                <div className="flex-grow bg-[#EBDCD0]/40 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#C88A58] h-full rounded-full" style={{ width: "1%" }} />
                </div>
                <span className="w-8 text-right text-gray-500 font-bold">1%</span>
              </div>
              <div className="flex items-center space-x-2 text-[#2A1A10]/40">
                <span className="w-12 font-bold">2 Stars</span>
                <div className="flex-grow bg-[#EBDCD0]/40 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#C88A58]/20 h-full rounded-full" style={{ width: "0%" }} />
                </div>
                <span className="w-8 text-right font-bold">0%</span>
              </div>
              <div className="flex items-center space-x-2 text-[#2A1A10]/40">
                <span className="w-12 font-bold">1 Star</span>
                <div className="flex-grow bg-[#EBDCD0]/40 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#C88A58]/20 h-full rounded-full" style={{ width: "0%" }} />
                </div>
                <span className="w-8 text-right font-bold">0%</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EBDCD0] text-center">
              <p className="font-sans text-xs text-gray-500 flex items-center justify-center space-x-1.5 font-bold">
                <ShieldCheck className="h-4 w-4 text-[#7F8C7D]" />
                <span>100% Genuine Customer Reviews</span>
              </p>
            </div>
          </div>

          {/* Right Side: Reviews Grid list / Slider */}
          <div className="lg:col-span-8">
            {/* Desktop Reviews Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-6">
              {reviews.map((rev, index) => (
                <div
                  key={index}
                  className="bg-[#FCFAF7] border border-[#EBDCD0] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-full ${rev.color} flex items-center justify-center text-[#FCFAF7] font-serif font-extrabold`}>
                          {rev.initial}
                        </div>
                        <div>
                          <h4 className="font-serif text-sm font-bold text-[#2A1A10]">
                            {rev.name}
                          </h4>
                          <p className="font-sans text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                            {rev.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-0.5 text-[#C88A58]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-[#2A1A10]/85 italic leading-relaxed">
                      "{rev.quote}"
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#EBDCD0]/40 flex justify-between items-center">
                    <span className="font-sans text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Verified Purchase
                    </span>
                    <span className="font-sans text-[10px] text-gray-400 font-semibold">
                      {rev.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile & Tablet Reviews Slider */}
            <div className="lg:hidden relative mt-8 lg:mt-0">
              <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#C88A58]/20 scrollbar-track-transparent scroll-smooth px-2">
                {reviews.map((rev, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] bg-[#FCFAF7] border border-[#EBDCD0] rounded-3xl p-6 shadow-sm flex flex-col justify-between snap-center"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`h-10 w-10 rounded-full ${rev.color} flex items-center justify-center text-[#FCFAF7] font-serif font-extrabold`}>
                            {rev.initial}
                          </div>
                          <div>
                            <h4 className="font-serif text-sm font-bold text-[#2A1A10]">
                              {rev.name}
                            </h4>
                            <p className="font-sans text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                              {rev.role}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-0.5 text-[#C88A58]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      <p className="font-sans text-xs sm:text-sm text-[#2A1A10]/85 italic leading-relaxed">
                        "{rev.quote}"
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#EBDCD0]/40 flex justify-between items-center">
                      <span className="font-sans text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Verified Purchase
                      </span>
                      <span className="font-sans text-[10px] text-gray-400 font-semibold">
                        {rev.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Swipe indicator badge */}
              <div className="flex justify-center items-center space-x-2 mt-2 text-xs font-sans text-[#2A1A10]/50">
                <span>Swipe to read reviews</span>
                <span className="animate-pulse">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
