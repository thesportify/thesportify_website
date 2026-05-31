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

const getLinkedinUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("www.") || url.startsWith("linkedin.com") || url.startsWith("linktr.ee")) {
    return `https://${url}`;
  }
  return `https://linkedin.com/in/${url}`;
};

export default function TeamMembers({ teamMembersByYear = {} }) {
  const years = Object.keys(teamMembersByYear).sort((a, b) => b.localeCompare(a));
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const categoryOrder = [
    "Secretariat",
    "Women's Wing",
    "Events & Operations",
    "Tech & Analytics",
    "PR & Outreach",
    "Design & Media",
  ];

  const [activeCategory, setActiveCategory] = useState(categoryOrder[0]);
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1); // 1 = going right (next), -1 = going left (prev)
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
    const filterCat = activeCategory === "Secretariat" ? "secretaries" : activeCategory.toLowerCase();
    return category === filterCat;
  });

  // Reset active member index when category or year changes
  useEffect(() => {
    setActiveMemberIndex(0);
    setSlideDirection(1);
  }, [activeCategory, selectedYear]);

  // Clamped/safe active member index to prevent out-of-bounds errors during category switches
  const safeActiveIndex = Math.min(activeMemberIndex, Math.max(0, filteredMembers.length - 1));

  const nextMember = () => {
    if (safeActiveIndex < filteredMembers.length - 1) {
      setSlideDirection(1);
      setActiveMemberIndex(safeActiveIndex + 1);
    }
  };

  const prevMember = () => {
    if (safeActiveIndex > 0) {
      setSlideDirection(-1);
      setActiveMemberIndex(safeActiveIndex - 1);
    }
  };

  // Get current active member
  const activeMember = filteredMembers[safeActiveIndex] || {};

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

            <AnimatePresence mode="popLayout" custom={slideDirection}>
              {/* Previous Member (Left Bench) */}
              {safeActiveIndex > 0 && (
                <motion.div
                  key={`prev-${safeActiveIndex - 1}`}
                  initial={{ opacity: 0, x: -280, scale: 0.75, rotateY: 35 }}
                  animate={{ opacity: 0.4, x: -260, scale: 0.8, rotateY: 20 }}
                  exit={{ opacity: 0, x: -280, scale: 0.75, rotateY: 35 }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
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
                key={`active-${activeCategory}-${selectedYear}-${safeActiveIndex}`}
                custom={slideDirection}
                initial={(dir) => ({ opacity: 0, x: dir * 200, scale: 0.88, rotateY: dir * -12 })}
                animate={{ opacity: 1, x: 0, scale: 1.02, rotateY: 0 }}
                exit={(dir) => ({ opacity: 0, x: dir * -200, scale: 0.88, rotateY: dir * 12 })}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute z-20 flex flex-col items-center"
              >
                <div className="relative w-[300px] sm:w-[325px] aspect-[3/4] bg-[#0a0f1d] border-2 border-[#ffce00] rounded-3xl p-4 overflow-hidden shadow-[0_0_55px_rgba(255,206,0,0.15)] group transition-all duration-300 flex flex-col">
                  
                  {/* Holographic light sweep */}
                  <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ffce00] rounded-tl-3xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ffce00] rounded-tr-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ffce00] rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ffce00] rounded-br-3xl"></div>

                  {/* Premium Position Badge */}
                  {activeMember.position && (
                    <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full z-20 flex items-center gap-1.5 shadow-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] animate-pulse shadow-[0_0_8px_#ff5a00]" />
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                        {activeMember.position}
                      </span>
                    </div>
                  )}

                  {/* Photo Frame - Takes full height of the card frame */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#ffce00]/40 shadow-[0_0_20px_rgba(255,206,0,0.15)] bg-slate-900">
                    <Image
                      src={activeMember.image || "/placeholder.svg"}
                      alt={activeMember.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover object-top scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      priority
                    />
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
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
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
                onClick={() => {
                  setSlideDirection(index > safeActiveIndex ? 1 : -1);
                  setActiveMemberIndex(index);
                }}
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

      {/* Premium Active Member Profile Details — Animated */}
      {filteredMembers.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8 px-6 z-10 relative pb-24 text-center md:text-left">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`profile-details-${activeCategory}-${selectedYear}-${safeActiveIndex}`}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#ff5a00]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#ffce00]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Left Side: Name and Title */}
                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-tight uppercase">
                    {activeMember.name}
                  </h3>
                  <p className="text-[#ffce00] text-xs font-black uppercase tracking-widest">
                    {activeMember.position}
                  </p>
                </div>

                {/* Right Side: Metadata Capsules & Socials */}
                <div className="flex flex-col items-center md:items-end gap-4">
                  {/* Metadata Capsules */}
                  <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-full text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                      <Calendar size={12} className="text-[#ff5a00]" />
                      <span>{selectedYear} Council</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-full text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                      <Sparkles size={12} className="text-[#ffce00]" />
                      <span>{activeCategory}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-full text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                      <span>Active Member</span>
                    </div>
                  </div>

                  {/* Social action buttons */}
                  {(activeMember.linkedin || activeMember.email) && (
                    <div className="flex items-center gap-4">
                      {activeMember.linkedin && (
                        <a
                          href={getLinkedinUrl(activeMember.linkedin)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:border-[#ffce00]/40 shadow-lg"
                          aria-label={activeMember.linkedin.includes("linktr.ee") ? `${activeMember.name}'s Linktree` : `${activeMember.name}'s LinkedIn`}
                        >
                          <div className="absolute inset-0 rounded-full bg-[#ffce00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm animate-pulse" />
                          {activeMember.linkedin.includes("linktr.ee") ? (
                            <Link2 className="h-4.5 w-4.5 stroke-[2px] transition-transform duration-300" />
                          ) : (
                            <Linkedin className="h-4.5 w-4.5 stroke-[2px] transition-transform duration-300" />
                          )}
                        </a>
                      )}
                      {activeMember.email && (
                        <a
                          href={`mailto:${activeMember.email}`}
                          className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:border-[#ff5a00]/40 shadow-lg"
                          aria-label={`Email ${activeMember.name}`}
                        >
                          <div className="absolute inset-0 rounded-full bg-[#ff5a00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm animate-pulse" />
                          <Mail className="h-4.5 w-4.5 stroke-[2px] transition-transform duration-300" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
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
