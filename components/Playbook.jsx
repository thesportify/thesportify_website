"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLAYBOOK_SECTIONS = [
  {
    chapter: "CHAPTER I",
    title: "PREAMBLE",
    content: "We, the members of The Sportify Society, in order to form a more unified athletic community, establish sportsmanship, ensure fair play, and secure the blessings of competition, do ordain and establish this Playbook for IIT Madras BS Degree.",
  },
  {
    chapter: "CHAPTER II",
    title: "TEAM ROSTER",
    content: "A curated list of our finest athletes across badminton, cricket, football, and athletics. Every player is selected based on merit, passion, and their dedication to the spirit of the game.",
  },
  {
    chapter: "CHAPTER III",
    title: "COACHING STAFF",
    content: "Led by veteran players and strategic minds, our coaching staff provides the necessary guidance, training regimens, and tactical support to elevate every player's game to the next level.",
  },
  {
    chapter: "CHAPTER IV",
    title: "QUALIFYING TRIALS",
    content: "All prospective players must undergo rigorous trials assessing physical endurance, sport-specific skills, and team synergy. Only the most dedicated earn the right to wear the Sportify crest.",
  },
  {
    chapter: "CHAPTER V",
    title: "FAIR PLAY CODE",
    content: "Respect the opponent. Respect the referee. Respect the game. Victory is earned through skill and strategy, never through deception. We play hard, but we play fair.",
  }
];

export default function Playbook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const touchStartX = useRef(null);

  // Audio Synthesizer for paper turn (pitch swept whoosh / fwwwwp)
  const playFlipSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      const bufferSize = audioCtx.sampleRate * 0.35; 
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      // Generate rustling noise
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      
      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      
      // Sweep the filter frequency to create a dynamic whoosh / flip sound (fwwwwp)
      filter.frequency.setValueAtTime(450, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2400, audioCtx.currentTime + 0.15);
      filter.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.32);
      filter.Q.value = 3.0;
      
      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.002, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.06); 
      gainNode.gain.exponentialRampToValueAtTime(0.002, audioCtx.currentTime + 0.33); 
      
      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      whiteNoise.start();
    } catch (err) {
      console.warn("Audio Context blocked or not supported:", err);
    }
  };

  const selectPage = (idx) => {
    if (idx === currentPage || isFlipping) return;
    setIsFlipping(true);
    playFlipSound();
    
    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
    setCurrentPage(idx);
  };

  // Touch Swipe Handlers for Mobile Viewports
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 55; // minimum swipe distance
    if (diffX > threshold) {
      // Swipe left (next page)
      if (currentPage < PLAYBOOK_SECTIONS.length - 1) {
        selectPage(currentPage + 1);
      }
    } else if (diffX < -threshold) {
      // Swipe right (previous page)
      if (currentPage > 0) {
        selectPage(currentPage - 1);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden border-b border-white/5 select-none z-30" id="playbook">
      
      {/* Dynamic Background Haze */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF7A00]/5 blur-[160px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs md:text-sm font-black tracking-widest text-[#FF7A00] uppercase block mb-3 animate-pulse">
            Official Constitution &amp; Code
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            THE SPORTIFY{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFC107] to-white drop-shadow-[0_2px_15px_rgba(255,122,0,0.15)]">
              PLAYBOOK
            </span>
          </h2>
        </div>

        {/* 3D Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Chapter Index (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-4 flex flex-col gap-3">
            <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2 px-3">
              TABLE OF CONTENTS
            </span>
            {PLAYBOOK_SECTIONS.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => selectPage(idx)}
                className="group w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer border-transparent hover:text-white hover:bg-white/5"
                style={{
                  backgroundColor: idx === currentPage ? "rgba(255,255,255,0.05)" : "transparent",
                  borderColor: idx === currentPage ? "rgba(255,122,0,0.4)" : "transparent",
                  color: idx === currentPage ? "#FFC107" : ""
                }}
              >
                <div className="flex flex-col">
                  <span className="text-[9px] font-black tracking-widest opacity-60 mb-0.5">{ch.chapter}</span>
                  <span className="text-sm font-black uppercase tracking-tight">{ch.title}</span>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentPage ? "bg-[#FF7A00] scale-125 shadow-[0_0_6px_#FF7A00]" : "bg-gray-600 group-hover:bg-white"}`} />
              </button>
            ))}
          </div>

          {/* Right Column: Physical 3D Book */}
          <div className="col-span-1 lg:col-span-8 flex justify-center items-center h-[420px] sm:h-[500px] relative perspective-[2000px]">
            
            {/* Breathing 3D Animated Container */}
            <motion.div
              animate={{ 
                rotateY: [1.5, -1.5, 1.5], 
                rotateX: [0.8, -0.8, 0.8], 
                y: [0, -6, 0] 
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-full max-w-[650px] h-[360px] sm:h-[400px] md:h-[440px]"
            >
              
              {/* Back Leather Cover (Simulated depth shadow) */}
              <div className="absolute inset-0 bg-[#0B0B0B] border border-white/5 rounded-2xl shadow-[20px_20px_50px_rgba(0,0,0,0.95)]" />

              {/* Physical Book Body */}
              <div className="absolute inset-[4px] bg-[#111111] rounded-xl border border-white/10 flex overflow-hidden shadow-inner">
                
                {/* Simulated leather texture overlay */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] mix-blend-overlay pointer-events-none" />

                {/* Left Page (Blank textured / subtle markings - Desktop only) */}
                <div className="hidden lg:flex lg:w-1/2 h-full bg-[#181818] border-r border-black/40 relative p-10 flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:12px_12px] opacity-45 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-black/[0.15] pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/85 to-transparent pointer-events-none z-10" />
                  
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                      Official Document
                    </span>
                    <div className="w-8 h-[1px] bg-[#FF7A00]/40 rounded" />
                  </div>
                  
                  <div className="flex flex-col items-center justify-center border border-white/5 bg-[#151515] p-5 rounded-2xl w-fit mx-auto my-auto shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8),_1px_1px_1px_rgba(255,255,255,0.05)] opacity-40 select-none">
                    <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center font-black text-sm text-white shadow-inner mb-2.5">
                      S
                    </div>
                    <span className="text-[8px] font-black tracking-widest text-white uppercase text-center block leading-normal">
                      SPORTIFY<br/>PLAYBOOK
                    </span>
                  </div>
                </div>

                {/* Spine styling (Desktop only) */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-black/90 via-[#1e1e1e] to-black/90 border-x border-black/60 z-20 shadow-[0_0_15px_rgba(0,0,0,0.9)]" />

                {/* Right Page (Active text content with swipe/flip gestures) */}
                <div className="w-full lg:w-1/2 h-full bg-[#1c1c1c] relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:12px_12px] opacity-45 pointer-events-none z-0" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-white/[0.01] via-transparent to-black/[0.15] pointer-events-none" />
                  
                  {/* Page spine shadow */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/85 to-transparent pointer-events-none z-10" />
                  
                  {/* Page depth thickness styling */}
                  <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-gradient-to-l from-[#FF7A00] to-transparent opacity-85 z-10" />

                  {/* Flipping page content container */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                      initial={{ rotateY: 90, opacity: 0, transformOrigin: "left center" }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.55, ease: "easeInOut" }}
                      className="w-full h-full p-6 sm:p-10 flex flex-col justify-between z-10 cursor-grab active:cursor-grabbing select-none"
                    >
                      <div className="space-y-4">
                        <span className="text-[9px] font-black tracking-widest text-[#FFC107] uppercase">
                          {PLAYBOOK_SECTIONS[currentPage].chapter}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight border-b border-white/5 pb-3">
                          {PLAYBOOK_SECTIONS[currentPage].title}
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm leading-[1.7] max-w-[28ch] font-medium whitespace-normal tracking-[0.02em]">
                          {PLAYBOOK_SECTIONS[currentPage].content}
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold border-t border-white/5 pt-3">
                        <span className="block lg:hidden text-[9px] text-gray-600 font-extrabold uppercase tracking-wide">
                          Swipe left/right to browse
                        </span>
                        <span className="hidden lg:inline">IIT Madras BS</span>
                        <span className="text-[#FF7A00] font-black text-sm">
                          0{currentPage + 1}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

        {/* Mobile Drawer Trigger Button */}
        <div className="lg:hidden flex justify-center mt-8">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-[#0b0b0b]/90 border border-[#FF7A00]/30 hover:border-[#FF7A00] text-white font-extrabold uppercase text-xs tracking-wider px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2"
          >
            <span>📖</span> Table of Contents
          </button>
        </div>

      </div>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            {/* Bottom Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute bottom-0 left-0 right-0 bg-[#0B0B0B]/98 border-t border-[#FF7A00]/30 rounded-t-3xl p-6 max-h-[75vh] overflow-y-auto"
            >
              <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-5" />
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black uppercase text-gray-500 tracking-widest">
                  TABLE OF CONTENTS
                </span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-400 hover:text-white text-3xl font-light px-2"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-2">
                {PLAYBOOK_SECTIONS.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      selectPage(idx);
                      setIsDrawerOpen(false);
                    }}
                    className="w-full text-left px-5 py-4 rounded-xl border border-transparent transition-all flex items-center justify-between"
                    style={{
                      backgroundColor: idx === currentPage ? "rgba(255,255,255,0.05)" : "transparent",
                      borderColor: idx === currentPage ? "rgba(255,122,0,0.4)" : "rgba(255,255,255,0.02)",
                      color: idx === currentPage ? "#FFC107" : ""
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black tracking-widest opacity-60 mb-0.5">{ch.chapter}</span>
                      <span className="text-sm font-black uppercase tracking-tight">{ch.title}</span>
                    </div>
                    <div className={`w-1.5 h-1.5 rounded-full ${idx === currentPage ? "bg-[#FF7A00]" : "bg-gray-600"}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
