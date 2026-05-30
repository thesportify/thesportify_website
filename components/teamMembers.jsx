"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Calendar,
  ChevronDown,
  Link2,
  Trophy,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const departmentStats = {
  "secretaries": [
    { label: "LDR", name: "Leadership", level: "LEGENDARY" },
    { label: "EXC", name: "Execution", level: "ELITE" },
    { label: "ORG", name: "Organization", level: "MASTER" }
  ],
  "women's wing": [
    { label: "INC", name: "Inclusivity", level: "ELITE" },
    { label: "MNG", name: "Management", level: "MASTER" },
    { label: "OUT", name: "Outreach", level: "ADVANCED" }
  ],
  "events & operations": [
    { label: "OPS", name: "Operations", level: "ELITE" },
    { label: "LOG", name: "Logistics", level: "MASTER" },
    { label: "CRD", name: "Coordination", level: "ADVANCED" }
  ],
  "tech & analytics": [
    { label: "DEV", name: "Platform Dev", level: "EXCEPTIONAL" },
    { label: "SYS", name: "Reliability", level: "MISSION CRITICAL" },
    { label: "ANA", name: "Automation", level: "ADVANCED" }
  ],
  "pr & outreach": [
    { label: "CMY", name: "Community", level: "MASTER" },
    { label: "PUB", name: "Publicity", level: "ELITE" },
    { label: "OUT", name: "Outreach", level: "ADVANCED" }
  ],
  "design & media": [
    { label: "CRV", name: "Creative", level: "ELITE" },
    { label: "MED", name: "Media", level: "MASTER" },
    { label: "DSG", name: "Design", level: "ADVANCED" }
  ]
};

export default function TeamMembers({ teamMembersByYear = {} }) {
  const years = Object.keys(teamMembersByYear).sort((a, b) => b.localeCompare(a));
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const categoryOrder = [
    "Secretaries",
    "Women's Wing",
    "Events & Operations",
    "Tech & Analytics",
    "PR & Outreach",
    "Design & Media",
  ];

  const [activeCategory, setActiveCategory] = useState(categoryOrder[0]);
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: true,
  });

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setScrollState({
      canScrollLeft: scrollLeft > 1,
      canScrollRight: scrollLeft < scrollWidth - clientWidth - 1,
    });
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, []);

  // Center active category on change
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const activeElement = container.querySelector(`[data-category="${activeCategory}"]`);
    if (!activeElement) return;

    const containerRect = container.getBoundingClientRect();
    const elementRect = activeElement.getBoundingClientRect();
    const scrollAmount = (elementRect.left + elementRect.width / 2) - (containerRect.left + containerRect.width / 2);

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    setTimeout(updateScrollButtons, 300);
  }, [activeCategory]);

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    container.scrollBy({
      left: -container.clientWidth * 0.6,
      behavior: "smooth",
    });
    setTimeout(updateScrollButtons, 300);
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    container.scrollBy({
      left: container.clientWidth * 0.6,
      behavior: "smooth",
    });
    setTimeout(updateScrollButtons, 300);
  };

  // Filter members
  const filteredMembers = (teamMembersByYear[selectedYear] || []).filter((member) => {
    const category = member.category ? member.category.toLowerCase() : "";
    return category === activeCategory.toLowerCase();
  });

  // Reset active member index when category or year changes
  useEffect(() => {
    setActiveMemberIndex(0);
  }, [activeCategory, selectedYear]);

  // Clamped/safe active member index to prevent out-of-bounds errors during category switches
  const safeActiveIndex = Math.min(activeMemberIndex, Math.max(0, filteredMembers.length - 1));

  const nextMember = () => {
    if (safeActiveIndex < filteredMembers.length - 1) {
      setActiveMemberIndex(safeActiveIndex + 1);
    }
  };

  const prevMember = () => {
    if (safeActiveIndex > 0) {
      setActiveMemberIndex(safeActiveIndex - 1);
    }
  };

  // Get current active member and stats
  const activeMember = filteredMembers[safeActiveIndex] || {};
  const activeCategoryKey = activeCategory.toLowerCase();
  const currentStats = departmentStats[activeCategoryKey] || [
    { label: "PLY", name: "Playmaker", level: "EXPERT" },
    { label: "ENG", name: "Energy", level: "ELITE" },
    { label: "WRK", name: "Workrate", level: "MASTER" }
  ];

  return (
    <div className="w-full flex flex-col bg-transparent">
      
      {/* Category Navbar with glassmorphism */}
      <div className="w-full border-b border-gray-900 py-3 bg-black/60 backdrop-blur-md sticky top-16 z-30">
        <div className="container mx-auto px-4 flex items-center justify-between">
          
          {/* Mobile Categories Toggle */}
          <div className="md:hidden flex justify-between items-center w-full">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white px-4 py-2 border border-gray-800 rounded-xl flex items-center bg-gray-950/80 shadow-md"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              <span className="ml-2 text-xs font-semibold uppercase tracking-wider">
                {activeCategory}
              </span>
            </button>

            {/* Mobile Year Selector */}
            <div className="relative">
              <button
                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-950/80 border border-gray-800 rounded-xl text-xs text-white"
              >
                <Calendar size={14} className="text-[#ff5a00]" />
                <span>{selectedYear}</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              
              <AnimatePresence>
                {isYearDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 min-w-[140px] bg-gray-950 border border-gray-800 rounded-xl p-1 shadow-2xl z-[100]"
                  >
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          setIsYearDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          selectedYear === year ? "bg-orange-500/20 text-[#ffce00]" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {year} Council
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Categories Scroll & Year Dropdown */}
          <div className="hidden md:flex items-center justify-between w-full relative">
            <div className="flex-1 flex items-center justify-center relative px-8 overflow-hidden">
              
              {/* Left Arrow */}
              <button
                onClick={scrollLeft}
                className={`absolute left-0 z-10 text-gray-400 hover:text-white rounded-full p-1.5 transition-all ${
                  scrollState.canScrollLeft ? "opacity-100 hover:scale-110" : "opacity-30 pointer-events-none"
                }`}
                aria-label="Scroll categories left"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Scroller */}
              <div
                ref={scrollContainerRef}
                onScroll={updateScrollButtons}
                className="flex items-center justify-start overflow-x-auto py-1 scrollbar-hide w-full"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="flex items-center space-x-2 px-2">
                  {categoryOrder.map((category) => (
                    <button
                      key={category}
                      data-category={category}
                      onClick={() => setActiveCategory(category)}
                      className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 relative ${
                        activeCategory === category
                          ? "bg-[#ffce00]/10 border border-[#ffce00]/30 text-[#ffce00] shadow-lg shadow-orange-500/5 scale-105"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={scrollRight}
                className={`absolute right-0 z-10 text-gray-400 hover:text-white rounded-full p-1.5 transition-all ${
                  scrollState.canScrollRight ? "opacity-100 hover:scale-110" : "opacity-30 pointer-events-none"
                }`}
                aria-label="Scroll categories right"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Desktop Year Selector */}
            <div className="relative ml-4">
              <button
                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white font-bold tracking-wider hover:border-orange-500/30 transition-all duration-300"
              >
                <Calendar size={14} className="text-[#ff5a00]" />
                <span>{selectedYear} COUNCIL</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              <AnimatePresence>
                {isYearDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full mt-2 right-0 min-w-[160px] bg-gray-950 border border-gray-800 rounded-xl p-1 shadow-2xl z-[100]"
                  >
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          setIsYearDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                          selectedYear === year ? "bg-orange-500/20 text-[#ffce00]" : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{year} Council</span>
                        {selectedYear === year && <div className="w-1 h-1 rounded-full bg-[#ffce00] shadow-[0_0_6px_#ffce00]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden w-full bg-black/95 border-b border-gray-900 mt-2 py-2 px-4 space-y-1 overflow-hidden"
            >
              {categoryOrder.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors ${
                    activeCategory === category ? "bg-orange-500/20 text-[#ffce00]" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Title Header */}
      <div className="w-full text-center py-10 relative">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
          {selectedYear} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] to-[#ffce00]">{activeCategory}</span> Team
        </h2>
        <div className="h-[2px] w-20 mx-auto bg-gradient-to-r from-[#ff5a00] to-[#ffce00] mt-3 rounded-full" />
      </div>

      {/* Stadium Court Spotlight Carousel */}
      <div className="relative w-full py-8 overflow-hidden bg-transparent flex flex-col items-center">
        
        {/* Dynamic Overhead Spotlight Cone */}
        <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(255,206,0,0.12),transparent_55%)] pointer-events-none z-0"></div>

        {/* Ambient Stadium Beacon Glows */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl animate-pulse pointer-events-none"></div>

        {/* Card Court Field Showcase */}
        {filteredMembers.length > 0 ? (
          <div className="w-full relative flex items-center justify-center h-[460px] perspective-[1000px] z-10">
            
            {/* Arrow Navs */}
            {activeMemberIndex > 0 && (
              <button
                onClick={prevMember}
                className="absolute left-4 sm:left-12 z-30 p-3 bg-gradient-to-r from-transparent via-gray-900/60 to-gray-900/40 hover:bg-[#ffce00]/20 text-white rounded-full border border-gray-800 transition-all hover:scale-110 shadow-lg shadow-black/50 group"
                aria-label="Previous roster member"
              >
                <ChevronLeft size={24} className="group-hover:text-[#ffce00] transition-colors" />
              </button>
            )}

            {activeMemberIndex < filteredMembers.length - 1 && (
              <button
                onClick={nextMember}
                className="absolute right-4 sm:right-12 z-30 p-3 bg-gradient-to-l from-transparent via-gray-900/60 to-gray-900/40 hover:bg-[#ffce00]/20 text-white rounded-full border border-gray-800 transition-all hover:scale-110 shadow-lg shadow-black/50 group"
                aria-label="Next roster member"
              >
                <ChevronRight size={24} className="group-hover:text-[#ffce00] transition-colors" />
              </button>
            )}

            <AnimatePresence mode="popLayout">
              {/* Previous Member (Left Bench) */}
              {safeActiveIndex > 0 && (
                <motion.div
                  key={`prev-${safeActiveIndex - 1}`}
                  initial={{ opacity: 0, x: -280, scale: 0.75, rotateY: 35 }}
                  animate={{ opacity: 0.4, x: -260, scale: 0.8, rotateY: 20 }}
                  exit={{ opacity: 0, x: -280, scale: 0.75, rotateY: 35 }}
                  transition={{ type: "spring", stiffness: 220, damping: 25 }}
                  onClick={prevMember}
                  className="absolute cursor-pointer hidden md:block select-none pointer-events-auto"
                >
                  <div className="w-[280px] aspect-[3/4] bg-[#0a0f1d] border border-orange-500/20 rounded-3xl p-4 opacity-75 overflow-hidden relative">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900">
                      <Image
                        src={filteredMembers[safeActiveIndex - 1]?.image || "/placeholder.svg"}
                        alt="Previous Member"
                        fill
                        sizes="240px"
                        className="object-cover object-top grayscale"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/60"></div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Active Spotlight Card (Center Pitch) */}
              <motion.div
                key={`active-${safeActiveIndex}`}
                initial={{ opacity: 0, x: 0, scale: 0.9, rotateY: 0 }}
                animate={{ opacity: 1, x: 0, scale: 1.02, rotateY: 0 }}
                exit={{ opacity: 0, x: 0, scale: 0.9, rotateY: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="absolute z-20 flex flex-col items-center"
              >
                <div className="relative w-[300px] sm:w-[325px] aspect-[3/4] bg-[#0a0f1d] border-2 border-[#ffce00] rounded-3xl p-5 overflow-hidden shadow-[0_0_55px_rgba(255,206,0,0.15)] group transition-all duration-300 flex flex-col justify-between">
                  
                  {/* Holographic light sweep */}
                  <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ffce00] rounded-tl-3xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ffce00] rounded-tr-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ffce00] rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ffce00] rounded-br-3xl"></div>

                  {/* FUT Stats Shield */}
                  <div className="absolute top-3 left-3 bg-[#0a0f1d]/90 border-2 border-[#ffce00] rounded-2xl p-2.5 flex flex-col items-center space-y-1.5 shadow-[0_0_20px_rgba(255,206,0,0.35)] z-20 w-11 font-mono">
                    <Trophy className="h-4 w-4 text-[#ffce00] animate-pulse" />
                    <div className="h-[2px] w-6 bg-gradient-to-r from-orange-500 to-[#ffce00] rounded-full"></div>
                    <div className="flex flex-col space-y-1.5 text-center">
                      {currentStats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center leading-none">
                          <span className="text-[#ff9a00] uppercase text-[7px] font-black">{stat.label}</span>
                          <span className="text-white text-[8px] font-black uppercase mt-0.5">{stat.level.substring(0, 3)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Photo Frame */}
                  <div className="relative w-full h-[74%] rounded-2xl overflow-hidden border-2 border-[#ffce00]/40 shadow-[0_0_20px_rgba(255,206,0,0.1)] bg-slate-900">
                    <Image
                      src={activeMember.image || "/placeholder.svg"}
                      alt={activeMember.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover object-top scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      priority
                    />
                  </div>

                  {/* Name & Title Plate below the image - perfectly aligned at the bottom */}
                  <div className="flex flex-col items-center justify-center text-center pb-1">
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase drop-shadow-md">
                      {activeMember.name}
                    </h3>
                    <p className="text-[#ffce00] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest mt-0.5">
                      {activeMember.position}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Next Member (Right Bench) */}
              {safeActiveIndex < filteredMembers.length - 1 && (
                <motion.div
                  key={`next-${safeActiveIndex + 1}`}
                  initial={{ opacity: 0, x: 280, scale: 0.75, rotateY: -35 }}
                  animate={{ opacity: 0.4, x: 260, scale: 0.8, rotateY: -20 }}
                  exit={{ opacity: 0, x: 280, scale: 0.75, rotateY: -35 }}
                  transition={{ type: "spring", stiffness: 220, damping: 25 }}
                  onClick={nextMember}
                  className="absolute cursor-pointer hidden md:block select-none pointer-events-auto"
                >
                  <div className="w-[280px] aspect-[3/4] bg-[#0a0f1d] border border-orange-500/20 rounded-3xl p-4 opacity-75 overflow-hidden relative">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900">
                      <Image
                        src={filteredMembers[safeActiveIndex + 1]?.image || "/placeholder.svg"}
                        alt="Next Member"
                        fill
                        sizes="240px"
                        className="object-cover object-top grayscale"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/60"></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center text-gray-400 bg-[#090d16]/50 border border-gray-900 p-8 rounded-2xl max-w-md mx-auto my-12">
            No team members found in this category
          </div>
        )}

        {/* Carousel Indicators dots */}
        {filteredMembers.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4 z-10 relative">
            {filteredMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveMemberIndex(index)}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  index === safeActiveIndex
                    ? "bg-gradient-to-r from-[#ff5a00] to-[#ffb700] w-6"
                    : "bg-gray-800 w-2 hover:bg-gray-600"
                }`}
                aria-label={`View roster index ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Active Member HUD Detail Panel */}
      {filteredMembers.length > 0 && (
        <div className="max-w-xl mx-auto mt-4 px-6 text-center z-10 relative pb-20">
          <div className="bg-gradient-to-b from-[#0a0f1d] to-black border border-gray-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            
            <div className="space-y-5 relative z-10">
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="h-4 w-4 text-[#ffce00] animate-pulse" />
                <span className="text-[#ffce00] text-xs font-black tracking-widest uppercase font-mono">
                  ACTIVE PLAYER BIO & STATS
                </span>
              </div>
              
              <div className="flex items-center justify-center space-x-2 bg-black/40 border border-gray-900/60 rounded-xl py-2.5 px-4 text-center">
                <div className="flex-1 border-r border-gray-900/60">
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">DIVISION</p>
                  <p className="text-xs text-white font-extrabold uppercase tracking-wide mt-0.5">{activeCategory}</p>
                </div>
                <div className="flex-1 border-r border-gray-900/60">
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">COUNCIL</p>
                  <p className="text-xs text-white font-extrabold uppercase tracking-wide mt-0.5">{selectedYear}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">STATUS</p>
                  <p className="text-xs text-emerald-400 font-extrabold uppercase tracking-wide mt-0.5">ACTIVE ROSTER</p>
                </div>
              </div>

              {/* Social CTA Action buttons */}
              <div className="flex space-x-3 pt-1">
                {activeMember.linkedin && (
                  <a
                    href={activeMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-[#ffce00] to-[#ffaa00] hover:from-[#ffe808] hover:to-[#ffce00] text-black text-xs font-black uppercase py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02]"
                    aria-label={activeMember.linkedin.includes("linktr.ee") ? `${activeMember.name}'s Linktree` : `${activeMember.name}'s LinkedIn`}
                  >
                    {activeMember.linkedin.includes("linktr.ee") ? (
                      <>
                        <Link2 className="h-4 w-4 stroke-[3px]" />
                        <span>Linktree</span>
                      </>
                    ) : (
                      <>
                        <Linkedin className="h-4 w-4 stroke-[3px]" />
                        <span>LinkedIn</span>
                      </>
                    )}
                  </a>
                )}
                {activeMember.email && (
                  <a
                    href={`mailto:${activeMember.email}`}
                    className="flex-1 flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-black uppercase py-3.5 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                    aria-label={`Email ${activeMember.name}`}
                  >
                    <Mail className="h-4 w-4 text-[#ffce00]" />
                    <span>Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS to hide scrollbars */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Add smooth scrolling to the whole document */
        html {
          scroll-behavior: smooth;
        }

        /* Perspective utility */
        .perspective-\\[1000px\\] {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
