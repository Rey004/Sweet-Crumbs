import Link from "next/link";
import { Cookie, ArrowLeft, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FCFAF7] flex flex-col justify-between p-6 relative overflow-hidden font-sans selection:bg-[#EBDCD0]">
      {/* Whimsical background details */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-[#F5EBE0]/60 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#E8EAE6]/60 rounded-full blur-3xl opacity-60 pointer-events-none" />

      {/* Mini Brand Header */}
      <header className="max-w-7xl mx-auto w-full pt-4 text-center md:text-left shrink-0">
        <Link href="/" className="inline-block">
          <span className="font-serif text-xl font-bold tracking-wide text-[#2A1A10]">
            Sweet <span className="text-[#C88A58]">Crumbs</span>
          </span>
        </Link>
      </header>

      {/* Main Content Area */}
      <div className="max-w-md mx-auto w-full flex flex-col items-center justify-center text-center py-12 px-4 relative z-10 my-auto">
        {/* Cookie/Cake graphic */}
        <div className="relative mb-8 shrink-0">
          <div className="relative h-24 w-24 bg-[#F5EBE0] border border-[#EBDCD0] rounded-full flex items-center justify-center text-[#C88A58] shadow-lg animate-float-medium">
            <Cookie className="h-12 w-12 text-[#C88A58] stroke-[1.5]" />
          </div>
          {/* Crumbs */}
          <div className="absolute top-2 right-0 h-2 w-2 rounded-full bg-[#A05A2C] opacity-75" />
          <div className="absolute bottom-4 -left-2 h-3 w-3 rounded-full bg-[#EBDCD0]" />
          <div className="absolute bottom-1 right-2 h-1.5 w-1.5 rounded-full bg-[#7F8C7D] opacity-60" />
        </div>

        {/* 404 Title */}
        <span className="text-[#C88A58] font-bold text-xs uppercase tracking-widest bg-[#F5EBE0] px-3.5 py-1 rounded-full mb-4">
          Error Code 404
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2A1A10] mb-4 leading-tight">
          Something Crumbled!
        </h1>
        <p className="text-sm text-gray-500 max-w-sm mb-8 leading-relaxed">
          It looks like the page you are looking for has rolled off the counter. Don't worry, we have plenty of fresh bakes waiting for you!
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="w-full bg-[#7F8C7D] hover:bg-[#687466] text-[#FCFAF7] py-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center space-x-2 group"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Return to the Bakery</span>
        </Link>
      </div>

      {/* Footer copyright */}
      <footer className="max-w-7xl mx-auto w-full text-center text-[10px] text-gray-400 py-4 shrink-0 flex flex-col md:flex-row justify-between items-center border-t border-[#EBDCD0]/40">
        <span>© 2026 Sweet Crumbs. Handcrafted with love.</span>
        <span className="flex items-center space-x-1 mt-1 md:mt-0">
          <span>Fresh bakes daily</span>
          <Heart className="h-3 w-3 text-red-400 fill-current" />
        </span>
      </footer>
    </main>
  );
}
