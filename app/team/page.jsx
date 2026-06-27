"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TeamMembers from "@/components/teamMembers";
import { teamMembersByYear } from "@/lib/data";
import { Mail, Trophy, Sparkles, Link2, Award, Zap, Code, ShieldCheck, Camera, Film, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import photoRegistry from "@/lib/photoRegistry.json";

export default function TeamPage() {
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null);
  const scrollRef = useRef(null);

  const teamPhotos = photoRegistry.teams || [];

  const CAMERA_PRESETS = [
    { shutter: "1/250s", iso: "100", aperture: "f/4.0", focal: "35mm" },
    { shutter: "1/500s", iso: "200", aperture: "f/2.8", focal: "50mm" },
    { shutter: "1/125s", iso: "400", aperture: "f/2.0", focal: "85mm" },
    { shutter: "1/1000s", iso: "100", aperture: "f/1.8", focal: "24mm" },
    { shutter: "1/320s", iso: "250", aperture: "f/4.5", focal: "70mm" },
    { shutter: "1/160s", iso: "320", aperture: "f/2.2", focal: "50mm" }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.6 : clientWidth * 0.6;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Scroll to the top of the page whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950 ">
      <Navbar />
      <div className="container mx-auto px-6 sm:px-20 py-16">
        {/* Page Header */}
        <div className="flex flex-col items-center mb-16 mt-12">
          <h1 className="text-4xl font-bold text-center mb-12 text-white relative">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] to-[#ffe808]">
              Team
            </span>
            {/* Stylish underline with gradient and glow effect */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-center w-full">
              <div className="relative h-[2px] w-3/5 sm:w-1/5">
                {/* Main gradient underline */}
                <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5a00] to-transparent rounded-full"></div>

                {/* Glow effect */}
                <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 rounded-full blur-sm"></div>

                {/* Extra subtle reflection */}
                <div className="absolute inset-0 h-[1px] top-[3px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-[0.5px]"></div>
              </div>
            </div>
          </h1>
        </div>
        {/*Koi yaha se purana data edit nahi karega , agar kiya tho wo bosdika bhen ka luada */}
        {/* Pass the entire teamMembersByYear object to the component */}
        <TeamMembers teamMembersByYear={teamMembersByYear} />
      </div>

      {/* Cinematic Team Negative Strip Reel Section */}
      <section className="relative w-full py-20 bg-black/40 border-t border-b border-gray-900/80 overflow-hidden mt-10">
        {/* Sprocket-hole Film strip borders on top and bottom */}
        <div className="absolute top-0 left-0 w-full h-5 bg-[#0a0a0a] flex items-center justify-around opacity-30 select-none pointer-events-none">
          {Array(24).fill(0).map((_, i) => (
            <div key={i} className="w-5 h-2.5 bg-black border border-gray-800 rounded-xs" />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-5 bg-[#0a0a0a] flex items-center justify-around opacity-30 select-none pointer-events-none">
          {Array(24).fill(0).map((_, i) => (
            <div key={i} className="w-5 h-2.5 bg-black border border-gray-800 rounded-xs" />
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10 my-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff5a00]/10 border border-[#ff5a00]/20 rounded-full">
                <Film className="h-3.5 w-3.5 text-[#ff5a00]" />
                <span className="text-[10px] uppercase font-mono font-black tracking-widest text-[#ff5a00]">
                  CINE-STRIP // ARCHIVES
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase leading-none">
                Captured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] to-[#ffce00]">Moments</span>
              </h2>
              <p className="text-gray-400 text-xs md:text-sm max-w-xl">
                Behind-the-scenes memories, house meetings, and operations huddles of our society. Hover cards to inspect camera metadata.
              </p>
            </div>

            {/* Scroll controls */}
            <div className="flex items-center space-x-3 mt-6 md:mt-0">
              <button
                onClick={() => scroll("left")}
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-[#ff5a00]/50 hover:bg-[#ff5a00]/5 text-white transition-all outline-none cursor-pointer"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-[#ff5a00]/50 hover:bg-[#ff5a00]/5 text-white transition-all outline-none cursor-pointer"
                aria-label="Scroll Right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Horizontal scrollable flex list */}
          <div
            ref={scrollRef}
            className="flex space-x-8 overflow-x-auto pb-8 pt-4 custom-scrollbar snap-x snap-mandatory"
            style={{ scrollPaddingLeft: "1.5rem" }}
          >
            {teamPhotos.map((photo, index) => {
              const preset = CAMERA_PRESETS[index % CAMERA_PRESETS.length];
              const tiltAngle = index % 2 === 0 ? (index % 4 === 0 ? "-2.5deg" : "-1.5deg") : (index % 3 === 0 ? "3deg" : "2deg");
              
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start relative group"
                  style={{
                    transform: `rotate(${tiltAngle})`,
                    transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "rotate(0deg) scale(1.04) translateY(-8px)";
                    e.currentTarget.style.zIndex = "30";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${tiltAngle}) scale(1) translateY(0)`;
                    e.currentTarget.style.zIndex = "1";
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffce00]/20 via-[#ff5a00]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="bg-[#0b0c10] border border-gray-800/80 group-hover:border-[#ff5a00]/40 rounded-3xl p-5 shadow-2xl space-y-4 transition-all duration-300 relative">
                    <div className="absolute top-0 bottom-0 left-2 w-[1px] bg-dashed bg-gray-800 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-2 w-[1px] bg-dashed bg-gray-800 pointer-events-none" />

                    <div className="flex justify-between items-center text-[8px] font-mono text-gray-500 uppercase tracking-widest px-1">
                      <span>FRAME {String(index + 1).padStart(2, "0")} / {String(teamPhotos.length).padStart(2, "0")}</span>
                      <span>SEC_REC_{index + 24}</span>
                    </div>

                    <div 
                      onClick={() => setFullscreenPhoto(photo)}
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-gray-950 cursor-zoom-in"
                    >
                      <Image
                        src={photo}
                        alt={`Sportify Society Team Photo ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                      
                      <div className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/60 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="h-3.5 w-3.5 text-[#ffce00]" />
                      </div>
                    </div>

                    <div className="bg-black/40 border border-gray-900/60 rounded-xl p-3 flex justify-between items-center text-[9px] font-mono text-gray-500 select-none">
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-[8px] font-bold">EXP</span>
                        <span className="text-gray-400 font-bold">{preset.shutter}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-[8px] font-bold">ISO</span>
                        <span className="text-gray-400 font-bold">{preset.iso}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-[8px] font-bold">APER</span>
                        <span className="text-gray-400 font-bold">{preset.aperture}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-[8px] font-bold">FOCAL</span>
                        <span className="text-gray-400 font-bold">{preset.focal}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-900/80 pt-3 text-[9px] font-mono text-gray-600 uppercase">
                      <span className="flex items-center gap-1 font-bold">
                        <Camera className="h-3 w-3 text-[#ff5a00]" />
                        <span>KODAK CINE 100T</span>
                      </span>
                      <span className="font-bold">SPORTIFY_UNIT_2026</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

      {/* Fullscreen Photo Lightbox Modal */}
      <AnimatePresence>
        {fullscreenPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
            onClick={() => setFullscreenPhoto(null)}
          >
            <button
              onClick={() => setFullscreenPhoto(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all z-50 cursor-pointer outline-none"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
            >
              <Image
                src={fullscreenPhoto}
                alt="Fullscreen view"
                fill
                className="object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
