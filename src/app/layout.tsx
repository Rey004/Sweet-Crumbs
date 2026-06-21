import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sweet Crumbs | Premium Artisan Bakery & Custom Cakes",
  description: "Indulge in freshly baked happiness delivered daily. Order artisanal breads, fresh pastries, seasonal specials, or request custom-designed cakes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} h-full antialiasedScroll`}
    >
      <body className="min-h-full flex flex-col bg-cream-light text-primary-brown">
        {children}
      </body>
    </html>
  );
}

