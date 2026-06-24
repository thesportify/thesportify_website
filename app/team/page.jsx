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

      {/* Wall of Heroes / Hall of Fame Section - Cinematic Full-Width Design */}
      <section className="relative w-full py-12 mt-8 bg-transparent border-t border-gray-900/60 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5a00]/30 to-transparent"></div>

        {/* Majestic Soft Ambient Glows */}
        <div className="absolute top-1/4 left-10 w-[400px] h-[400px] bg-[#ffce00]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#ff5a00]/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-[1300px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">

          {/* Header */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-br from-[#ffce00]/10 to-[#ff5a00]/10 rounded-xl border border-[#ffce00]/30 mb-2 shadow-[0_0_15px_rgba(255,206,0,0.08)] animate-pulse">
              <Trophy className="h-6 w-6 text-[#ffce00]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
              Wall of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808] drop-shadow-[0_1px_5px_rgba(255,90,0,0.12)]">
                Heroes
              </span>
            </h2>
            <div className="h-[2px] w-16 bg-gradient-to-r from-[#ff5a00] to-[#ffe808] my-2 rounded-full"></div>
            <p className="text-gray-400 text-xs md:text-sm max-w-xl leading-relaxed">
              Honoring the key innovators and architects who engineered the digital sports arena, built core society platforms, and automated operations.
            </p>
          </div>

          {/* Full-width widescreen Spotlight Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">

            {/* Left Column - Collectible Trading Plaque */}
            <div className="xl:col-span-5 relative group flex flex-col justify-between">
              {/* Outer Neon Glow Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffce00] via-[#ff5a00] to-[#ffe808] rounded-3xl opacity-15 group-hover:opacity-35 blur-md transition-opacity duration-500"></div>

              {/* Card Container */}
              <div className="relative flex-1 flex flex-col justify-between bg-[#0a0f1d] border border-[#ffce00]/30 rounded-3xl p-5 md:p-6 overflow-hidden z-10 transition-transform duration-500 group-hover:-translate-y-0.5">
                {/* Diagonal Holographic Sweep Line */}
                <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>

                {/* Tech Accents / Corner Borders */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#ffce00] rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#ffce00] rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#ffce00] rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ffce00] rounded-br-2xl"></div>

                <div className="space-y-4 relative z-20">
                  {/* Plaque Header */}
                  <div className="flex items-center justify-between border-b border-gray-800/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute h-4 w-4 bg-[#ffce00]/20 rounded-full animate-ping"></div>
                        <Sparkles className="h-3.5 w-3.5 text-[#ffce00]" />
                      </div>
                      <span className="text-[10px] font-black text-[#ffce00] tracking-widest uppercase font-mono">
                        LEGENDARY PLAYER
                      </span>
                    </div>
                    <span className="bg-[#ffce00]/10 border border-[#ffce00]/30 text-[#ffce00] text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                      TENURE 2025-26
                    </span>
                  </div>

                  {/* Photo Frame (Restricted size to fit perfectly on desktop) */}
                  <div className="relative w-[190px] md:w-[210px] aspect-[3/4] mx-auto rounded-xl overflow-hidden border-2 border-[#ffce00]/80 shadow-[0_0_20px_rgba(255,206,0,0.12)] bg-slate-900 group-hover:border-[#ffce00] transition-colors duration-300">
                    <Image
                      src="/nikhil_profile.png"
                      alt="Nikhil Kumar Shah"
                      fill
                      sizes="220px"
                      className="object-cover object-top scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      priority
                    />
                    <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
                  </div>

                  {/* Rarity & MVP Badges */}
                  <div className="flex items-center justify-center space-x-2 bg-black/40 border border-gray-800/80 rounded-xl py-2 px-3">
                    <div className="text-center flex-1 border-r border-gray-800/80">
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">ROLE</p>
                      <p className="text-[10px] text-white font-extrabold uppercase tracking-wide mt-0.5">DEV & OPS</p>
                    </div>
                    <div className="text-center flex-1 border-r border-gray-800/80">
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">EXPERTISE</p>
                      <p className="text-[10px] text-[#ffce00] font-extrabold uppercase tracking-wide mt-0.5">ARCHITECT</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">STATUS</p>
                      <p className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wide mt-0.5">VERIFIED MVP</p>
                    </div>
                  </div>

                  {/* Name & Title Plate below the badges */}
                  <div className="flex flex-col items-center justify-center py-0.5 text-center mt-1">
                    <h3 className="text-lg font-extrabold text-white tracking-wide uppercase drop-shadow-md">
                      Nikhil Kumar Shah
                    </h3>
                    <p className="text-[#ffce00] text-[10px] font-extrabold uppercase tracking-widest mt-0.5">
                      Technical Architect & Web Ops
                    </p>
                  </div>
                </div>

                {/* Social Actions */}
                <div className="flex space-x-3 border-t border-gray-800/80 pt-4 mt-4 z-20">
                  <a
                    href="https://linktr.ee/Nikhil_Kumar_Shah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-1.5 bg-gradient-to-r from-[#ffce00] to-[#ffaa00] hover:from-[#ffe808] hover:to-[#ffce00] text-black text-[10px] font-black uppercase py-2.5 px-3 rounded-xl transition-all duration-300 shadow-[0_2px_10px_rgba(255,206,0,0.15)] hover:scale-[1.01]"
                    aria-label="Linktree Profile"
                  >
                    <Link2 className="h-3.5 w-3.5 stroke-[3px]" />
                    <span>Linktree</span>
                  </a>
                  <a
                    href="mailto:25f2006470@ds.study.iitm.ac.in"
                    className="flex-1 flex items-center justify-center space-x-1.5 bg-white/5 hover:bg-[#ffce00]/10 border border-white/10 hover:border-[#ffce00]/40 text-white text-[10px] font-black uppercase py-2.5 px-3 rounded-xl transition-all duration-300 hover:scale-[1.01]"
                    aria-label="Email Contact"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#ffce00]" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Hall of Fame Analytics Showcase Dashboard */}
            <div className="xl:col-span-7 bg-[#0a0f1d] border border-gray-800 rounded-3xl p-5 md:p-6 shadow-2xl flex flex-col justify-between gap-5 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-5 bg-[#ffce00] rounded-full blur-[100px] pointer-events-none"></div>

              {/* Inductee details */}
              <div className="space-y-4 relative z-10">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center p-1.5 bg-[#ffce00]/10 border border-[#ffce00]/30 rounded-lg">
                    <Award className="h-4 w-4 text-[#ffce00]" />
                  </div>
                  <span className="text-[#ffce00] text-[10px] font-black tracking-widest uppercase font-mono">
                    HALL OF FAME INDUCTEE
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase leading-none">
                  PIONEER OF DIGITAL INFRASTRUCTURE
                </h3>

                <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-normal">
                  Inducted onto the Wall of Heroes for exceptional engineering contributions to The Sportify Society. Designed core platform layouts, optimized database pipelines, managed web hosting infrastructure, and established automated operations. A central figure behind the digital capabilities of the 2025-2026 tenure.
                </p>
              </div>

              {/* Technical Ratings Showcases */}
              <div className="bg-black/60 border border-gray-800/80 rounded-2xl p-4 md:p-5 space-y-4 relative z-10 backdrop-blur-sm">
                <div className="flex justify-between items-center border-b border-gray-850 pb-2">
                  <h4 className="text-[10px] font-black tracking-widest text-[#ffce00] uppercase font-mono">
                    TECHNICAL SYSTEM CAPABILITIES
                  </h4>
                  <span className="text-[9px] text-[#ffce00] font-black uppercase font-mono tracking-wider">LEVEL: EXPERT</span>
                </div>

                <div className="space-y-3.5">
                  {/* Rating 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-extrabold text-gray-300">
                      <span className="flex items-center space-x-1.5">
                        <Code className="h-3.5 w-3.5 text-[#ff9a00]" />
                        <span>Platform Systems Engineering (DEV)</span>
                      </span>
                      <span className="text-[#ffce00] tracking-wider font-mono">EXCEPTIONAL MASTERY</span>
                    </div>
                    <div className="h-1.5 bg-gray-950 rounded-full overflow-hidden border border-gray-900 p-[0.5px]">
                      <div className="h-full bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808] rounded-full shadow-[0_0_6px_rgba(255,206,0,0.4)] w-full"></div>
                    </div>
                  </div>

                  {/* Rating 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-extrabold text-gray-300">
                      <span className="flex items-center space-x-1.5">
                        <Zap className="h-3.5 w-3.5 text-[#ff9a00]" />
                        <span>Site Reliability & Web Operations (OPS)</span>
                      </span>
                      <span className="text-[#ffce00] tracking-wider font-mono">MISSION CRITICAL</span>
                    </div>
                    <div className="h-1.5 bg-gray-950 rounded-full overflow-hidden border border-gray-900 p-[0.5px]">
                      <div className="h-full bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808] rounded-full shadow-[0_0_6px_rgba(255,206,0,0.4)] w-full"></div>
                    </div>
                  </div>

                  {/* Rating 3 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-extrabold text-gray-300">
                      <span className="flex items-center space-x-1.5">
                        <Trophy className="h-3.5 w-3.5 text-[#ff9a00]" />
                        <span>Automation & Data Systems (ANA)</span>
                      </span>
                      <span className="text-[#ffce00] tracking-wider font-mono">ADVANCED INTEGRATION</span>
                    </div>
                    <div className="h-1.5 bg-gray-950 rounded-full overflow-hidden border border-gray-900 p-[0.5px]">
                      <div className="h-full bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808] rounded-full shadow-[0_0_6px_rgba(255,206,0,0.4)] w-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accomplishments Grid (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                <div className="bg-gradient-to-b from-[#0a0f1d] to-[#04060d] border border-gray-800 hover:border-[#ffce00]/40 rounded-2xl p-3.5 space-y-2 transition-all duration-300">
                  <div className="flex items-center space-x-1.5 border-b border-gray-800 pb-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#ffce00]" />
                    <span className="text-[10px] font-black uppercase text-white tracking-wider">Secure Portals</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-normal font-normal">
                    Engineered secure Helpdesk and Grievance portal networks for data integrity.
                  </p>
                </div>

                <div className="bg-gradient-to-b from-[#0a0f1d] to-[#04060d] border border-gray-800 hover:border-[#ffce00]/40 rounded-2xl p-3.5 space-y-2 transition-all duration-300">
                  <div className="flex items-center space-x-1.5 border-b border-gray-800 pb-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#ffce00]" />
                    <span className="text-[10px] font-black uppercase text-white tracking-wider">Automated Engines</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-normal font-normal">
                    Created high-performance CSV parsing pipelines for instant roster mapping.
                  </p>
                </div>

                <div className="bg-gradient-to-b from-[#0a0f1d] to-[#04060d] border border-gray-800 hover:border-[#ffce00]/40 rounded-2xl p-3.5 space-y-2 transition-all duration-300">
                  <div className="flex items-center space-x-1.5 border-b border-gray-800 pb-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#ffce00]" />
                    <span className="text-[10px] font-black uppercase text-white tracking-wider">Resilient Hosting</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-normal font-normal">
                    Structured edge routing, ensuring high performance under heavy traffic.
                  </p>
                </div>
              </div>
            </div>

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
