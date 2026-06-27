"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

import DelhiBadminton1 from "../assets/Meetups/DelhiBadminton1.jpg";
import DelhiBadminton2 from "../assets/Meetups/DelhiBadminton2.png";
import DelhiHockey1 from "../assets/Meetups/DelhiHockey1.jpg";
import KanpurCricket1 from "../assets/Meetups/KanpurCricket1.png";
import KanpurCricket2 from "../assets/Meetups/KanpurCricket2.png";
import LucknowCricket1 from "../assets/Meetups/LucknowCricket1.jpg";
import LucknowCricket2 from "../assets/Meetups/LucknowCricket2.jpg";

const MEMORIES = [
  { type: "image", src: DelhiBadminton1, label: "Delhi Badminton Meetup", count: "14 Players", year: "2025" },
  { type: "quote", text: "Some matches end. Memories don't.", author: "Sportify Diaries" },
  { type: "image", src: DelhiBadminton2, label: "Delhi Badminton Playoff", count: "18 Players", year: "2025" },
  { type: "video", src: "/RKM.mp4", label: "RKM Championship Highlights", count: "Live Reel", year: "2026" },
  { type: "image", src: DelhiHockey1, label: "Delhi Hockey Championship", count: "30 Cheerleaders", year: "2025" },
  { type: "quote", text: "We came for sports. We stayed for people.", author: "Sportify Diaries" },
  { type: "image", src: KanpurCricket1, label: "Kanpur Turf Match", count: "22 Players", year: "2025" },
  { type: "image", src: KanpurCricket2, label: "Kanpur Cricket Finals", count: "150+ Crowds", year: "2025" },
  { type: "image", src: LucknowCricket1, label: "Lucknow Cricket Meetup", count: "25 Players", year: "2025" },
  { type: "quote", text: "Every city became home.", author: "Sportify Diaries" },
  { type: "image", src: LucknowCricket2, label: "Lucknow Cricket Final Match", count: "Championship Hub", year: "2025" }
];

export default function MeetupsGallery() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const scrollTweenRef = useRef(null);

  const duplicatedMemories = [...MEMORIES, ...MEMORIES, ...MEMORIES];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackWidth = track.scrollWidth / 3;

    // Continuous infinite auto-scroll completing cycle slowly in 45s
    scrollTweenRef.current = gsap.to(track, {
      x: `-=${trackWidth}`,
      ease: "none",
      duration: 45,
      repeat: -1,
      modifiers: {
        x: (x) => {
          const val = parseFloat(x);
          if (val <= -trackWidth * 2) {
            return `${val + trackWidth}px`;
          }
          return `${val}px`;
        }
      }
    });

    return () => {
      if (scrollTweenRef.current) scrollTweenRef.current.kill();
    };
  }, []);

  const handleMouseEnter = (e, idx) => {
    setHoveredIdx(idx);
    
    // Pause horizontal track movement immediately
    if (scrollTweenRef.current) scrollTweenRef.current.pause();

    // Fade in video sound smoothly
    const videoEl = e.currentTarget.querySelector("video");
    if (videoEl) {
      videoEl.muted = false;
      videoEl.volume = 0;
      gsap.to(videoEl, { volume: 0.8, duration: 0.4 });
    }
  };

  const handleMouseLeave = (e) => {
    setHoveredIdx(null);
    
    // Resume horizontal track movement immediately
    if (scrollTweenRef.current) scrollTweenRef.current.play();

    // Fade out video sound smoothly
    const videoEl = e.currentTarget.querySelector("video");
    if (videoEl) {
      gsap.to(videoEl, {
        volume: 0,
        duration: 0.4,
        onComplete: () => {
          videoEl.muted = true;
        }
      });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-28 bg-[#050505] overflow-hidden border-b border-white/5 select-none z-30"
      id="meetups-gallery"
    >
      {/* Edge Vignette Overlays */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-64 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-64 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-6 mb-16 relative z-10 text-center">
        <span className="text-xs md:text-sm font-black tracking-widest text-[#FF7A00] uppercase block mb-3 animate-pulse">
          Memories That Built Our Community
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
          THE SPORTIFY{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFC107] to-white">
            CHRONOLOGY
          </span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed font-medium mb-3">
          Cheering on stadium galleries, local turf meetups, and cross-country networks.
        </p>
        <p className="text-gray-500 text-[11px] uppercase tracking-widest max-w-xl mx-auto font-bold opacity-85">
          Hover to preview memories. Audio will play on interaction.
        </p>
      </div>

      {/* Scroller Rail */}
      <div className="w-full flex items-center relative overflow-hidden py-6">
        <div 
          ref={trackRef}
          className="flex gap-6 md:gap-10 whitespace-nowrap will-change-transform overflow-visible scrollbar-none w-full"
        >
          {duplicatedMemories.map((item, idx) => {
            const isAnyHovered = hoveredIdx !== null;
            const isCurrentHovered = hoveredIdx === idx;

            if (item.type === "quote") {
              return (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[80vw] sm:w-[420px] h-[45vh] md:h-[480px] snap-center flex flex-col justify-center items-center p-12 bg-[#0b0b0b]/60 border border-white/5 rounded-[32px] text-center select-none backdrop-blur-[10px] relative overflow-hidden transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.025)_0%,transparent_60%)]" />
                  
                  {/* Decorative glowing quote mark symbol */}
                  <span className="text-5xl font-serif text-[#FF7A00]/20 select-none absolute top-10 left-10">“</span>
                  
                  <p className="text-xl md:text-3xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFC107] leading-relaxed whitespace-normal max-w-xs drop-shadow-[0_2px_8px_rgba(255,122,0,0.1)] relative z-10">
                    {item.text}
                  </p>
                  
                  <div className="w-8 h-[1px] bg-gradient-to-r from-[#FF7A00] to-transparent mt-8" />
                  
                  <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-4">
                    {item.author}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={idx}
                onMouseEnter={(e) => handleMouseEnter(e, idx)}
                onMouseLeave={handleMouseLeave}
                className={`flex-shrink-0 w-[80vw] sm:w-[480px] h-[45vh] md:h-[480px] snap-center relative rounded-[32px] overflow-hidden bg-[#0b0b0b] border transition-all duration-300 ease-out origin-center cursor-pointer ${
                  isCurrentHovered 
                    ? "border-[#FF7A00]/50 shadow-[0_0_30px_rgba(255,122,0,0.25)]" 
                    : isAnyHovered 
                      ? "border-white/5 opacity-40 blur-[1px]" 
                      : "border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.7)]"
                }`}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes="(max-width: 768px) 80vw, 480px"
                    className="object-cover pointer-events-none select-none"
                    priority={idx < 5}
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/35 z-10 pointer-events-none" />

                {/* Subtitle labels */}
                <div className="absolute bottom-6 left-6 z-20 pointer-events-none flex flex-col gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC107] bg-[#050505]/75 px-3.5 py-1.5 rounded-full border border-white/5 backdrop-blur-[10px] w-fit">
                    {item.label}
                  </span>
                  <div className="flex gap-2 text-[9px] font-bold text-gray-400">
                    <span className="bg-[#050505]/60 px-2.5 py-1 rounded border border-white/5 backdrop-blur-[10px]">{item.count}</span>
                    <span className="bg-[#050505]/60 px-2.5 py-1 rounded border border-white/5 backdrop-blur-[10px]">{item.year}</span>
                  </div>
                </div>
                
                <div className="absolute inset-0 border border-white/10 rounded-[32px] z-30 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
      
    </section>
  );
}