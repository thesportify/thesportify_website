"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { drawPath } from "../lib/indiaMapData.js";

import LucknowImg from "../assets/RKM - Lucknow Chapter.jpg";
import ChennaiImg from "../assets/RKM26 - Chennai Chapter.jpg";
import DelhiImg from "../assets/RKM26 - Delhi Chapter.jpg";
import HydBadImg from "../assets/RKM26 - Hyderabad Chapter.jpg";
import KolkataImg from "../assets/RKM26 - Kolkata Chapter.jpg";
import MumbaiImg from "../assets/RKM26 - Mumbai Chapter.jpg";
import JaipurImg from "../assets/RKM26 - Jaipur Chapter.jpg";
import PatnaImg from "../assets/RKM26 -Patna Chapter.jpg";

const PHOTOS_DRIVE_LINK = "https://drive.google.com/drive/folders/1Jaz9kdMbLGtucr7fznjE6Hq92FhPlhcW?usp=drive_link";

// Calibrated SVG coordinate positions inside the 774x792 viewBox for each offline chapter hub
const CITIES = [
  { id: "delhi", name: "Delhi", state: "Delhi", x: 233, y: 220, players: "150+", event: "Cricket & Badminton Playoffs", date: "21 Feb 2026", hasLine: true, images: [DelhiImg, JaipurImg, LucknowImg] },
  { id: "lucknow", name: "Lucknow", state: "Uttar Pradesh", x: 298, y: 250, players: "80+", event: "Cricket Chapter Meetup", date: "18 Feb 2026", hasLine: true, images: [LucknowImg, PatnaImg, DelhiImg] },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", x: 138, y: 475, players: "110+", event: "Badminton Regional Finals", date: "21 Feb 2026", hasLine: true, images: [MumbaiImg, HydBadImg, ChennaiImg] },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", x: 200, y: 250, players: "60+", event: "Cricket Turf Meetup", date: "24 Nov 2025", hasLine: true, images: [JaipurImg, DelhiImg, LucknowImg] },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", x: 282, y: 503, players: "130+", event: "Badminton Open", date: "22 Feb 2026", hasLine: true, images: [HydBadImg, MumbaiImg, ChennaiImg] },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", x: 525, y: 355, players: "100+", event: "Cricket Chapter Tournament", date: "22 Feb 2026", hasLine: true, images: [KolkataImg, ChennaiImg, MumbaiImg] },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", x: 290, y: 638, players: "200+", event: "Host Hub Events & Trials", date: "22 Feb 2026", isHost: true, images: [ChennaiImg, HydBadImg, MumbaiImg] },
  { id: "patna", name: "Patna", state: "Bihar", x: 450, y: 285, players: "85+", event: "Cricket Meetup", date: "25 Feb 2026", hasLine: true, images: [PatnaImg, KolkataImg, LucknowImg] }
];


const getBezierPath = (start, end) => {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const scale = Math.min(len * 0.18, 90); 
  const px = -dy / len;
  const py = dx / len;
  const controlX = midX + px * scale;
  const controlY = midY + py * scale;
  return `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
};

export default function RashtriyaKhelMahotsav() {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const [hoveredHub, setHoveredHub] = useState(null);
  const [selectedMobileHub, setSelectedMobileHub] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    // Map animation sequences
    const timers = [
      setTimeout(() => setActivePhase(1), 500),  // Step 2: Fade markers in
      setTimeout(() => setActivePhase(2), 1200), // Step 3: Draw connection lines (1.5s duration)
      setTimeout(() => setActivePhase(3), 2700), // Step 4: Pulsing active state & traveling particles
    ];

    return () => timers.forEach(clearTimeout);
  }, [inView]);

  // Image rotation carousel loop (every 2 seconds on hovered hub)
  useEffect(() => {
    if (!hoveredHub) return;
    setCarouselIdx(0);
    const interval = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, [hoveredHub]);

  // Rotate images in mobile modal too
  useEffect(() => {
    if (!selectedMobileHub) return;
    setCarouselIdx(0);
    const interval = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, [selectedMobileHub]);

  // Map predefined calibrated coordinate positions
  const projectedHubs = {};
  CITIES.forEach(c => {
    projectedHubs[c.id] = { x: c.x, y: c.y };
  });

  const chennaiCoords = projectedHubs["chennai"];

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] py-20 overflow-hidden select-none z-30 flex flex-col justify-center items-center border-b border-white/5"
      id="rkm-2026"
    >
      <style>{`
        @keyframes marker-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        .marker-pulse {
          animation: marker-pulse 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Background Haze Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#FF7A00]/5 blur-[150px] rounded-full" />
      </div>

      {/* Narrative Header ABOVE the Map */}
      <div className="relative z-20 text-center max-w-2xl px-4 mb-10 pointer-events-none">
        <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] text-[#FF7A00] uppercase block mb-4 animate-pulse">
          THE SPORTIFY NETWORK
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-3">
          8 CHAPTERS.<br />
          1 NATION.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFC107] drop-shadow-[0_2px_15px_rgba(255,122,0,0.25)]">
            1 SPIRIT.
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium max-w-[600px] mx-auto mt-4 opacity-75 leading-relaxed">
          Explore our nationwide chapters.
          <br />
          Hover over a city to view past events, photos, and community highlights.
        </p>
      </div>

      {/* SVG Interactive Map Container */}
      <div className="relative w-full overflow-x-auto md:overflow-visible scrollbar-none flex justify-start md:justify-center items-center py-6 px-4 cursor-grab active:cursor-grabbing z-10">
        <div className="relative w-[520px] md:w-full max-w-[650px] aspect-[774/792] flex-shrink-0">
          <svg viewBox="0 0 774 792" className="w-full h-full select-none">
            {/* Gradients */}
            <defs>
              <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFC107" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* India States Paths (Hover path to trigger state highlights) */}
            <g id="states-group" className="opacity-80">
              {Object.entries(drawPath).map(([stateName, pathD]) => {
                const isStateHovered = hoveredHub?.state === stateName;
                return (
                  <path
                    key={stateName}
                    d={pathD}
                    fill={isStateHovered ? "rgba(255, 122, 0, 0.12)" : "#0B0B0B"}
                    stroke={isStateHovered ? "#FF7A00" : "rgba(255, 122, 0, 0.35)"}
                    strokeWidth={isStateHovered ? "1.8" : "0.7"}
                    className="transition-all duration-300 ease-in-out cursor-pointer"
                    onMouseEnter={() => {
                      const associatedHub = CITIES.find(c => c.state === stateName);
                      if (associatedHub && !isMobile) setHoveredHub(associatedHub);
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) setHoveredHub(null);
                    }}
                    onClick={() => {
                      const associatedHub = CITIES.find(c => c.state === stateName);
                      if (associatedHub && isMobile) setSelectedMobileHub(associatedHub);
                    }}
                  />
                );
              })}
            </g>

            {/* Flight Path Lines (Chennai -> active hubs) */}
            {CITIES.filter((h) => h.hasLine && !h.isHost).map((hub) => {
              const startCoords = projectedHubs[hub.id];
              const bezierPath = getBezierPath(chennaiCoords, startCoords);
              const isLineVisible = activePhase >= 2;
              return (
                <g key={`path-${hub.id}`}>
                  <path
                    id={`curve-${hub.id}`}
                    d={bezierPath}
                    fill="none"
                    stroke="#FF7A00"
                    strokeWidth="1.5"
                    strokeOpacity="0.35"
                    strokeDasharray="400"
                    strokeDashoffset={isLineVisible ? "0" : "400"}
                    className="transition-all duration-[1500ms] ease-in-out"
                  />
                  {/* Animated Traveling Particle */}
                  {activePhase >= 3 && (
                    <circle r="3" fill="#FFC107" className="filter drop-shadow-[0_0_8px_#FFC107]">
                      <animateMotion dur={`${2.2 + Math.random() * 1.5}s`} repeatCount="indefinite">
                        <mpath href={`#curve-${hub.id}`} />
                      </animateMotion>
                    </circle>
                  )}
                </g>
              );
            })}

            {/* City Pins / Glowing Nodes */}
            {CITIES.map((hub) => {
              const coords = projectedHubs[hub.id];
              const isNodeVisible = activePhase >= 1;
              const isHovered = hoveredHub?.id === hub.id;
              const isHost = hub.isHost;

              return (
                <g
                  key={`pin-${hub.id}`}
                  className={`cursor-pointer group ${isNodeVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
                  onMouseEnter={() => !isMobile && setHoveredHub(hub)}
                  onMouseLeave={() => !isMobile && setHoveredHub(null)}
                  onClick={() => {
                    if (isMobile) {
                      setSelectedMobileHub(hub);
                    } else {
                      window.open(PHOTOS_DRIVE_LINK, "_blank");
                    }
                  }}
                >
                  {/* Outer Pulsing Aura */}
                  {isNodeVisible && (
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isHovered ? 12 : isHost ? 8 : 6}
                      fill={isHost ? "rgba(255, 193, 7, 0.25)" : "rgba(255, 122, 0, 0.3)"}
                      className="transition-all duration-300"
                    >
                      <animate
                        attributeName="r"
                        values={`${isHost ? 8 : 6};${isHost ? 16 : 12};${isHost ? 8 : 6}`}
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Core Pin Dot (Pulsing via keyframes on hover) */}
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={isHost ? 5.5 : 3.5}
                    fill={isHost ? "#FFC107" : "#FF7A00"}
                    style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
                    className={`transition-all duration-300 ${isHovered ? "marker-pulse" : ""}`}
                  />
                </g>
              );
            })}
          </svg>

          {/* Desktop Hover Card with Auto-Rotating Image Carousel (2s Interval) */}
          {hoveredHub && !isMobile && (
            <div
              className="absolute z-50 bg-[#0B0B0B]/95 border border-[#FF7A00]/30 rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(255,122,0,0.22)] backdrop-blur-md text-left w-64 pointer-events-none transition-all duration-200"
              style={{
                left: `${(projectedHubs[hoveredHub.id].x / 774) * 100}%`,
                top: `${(projectedHubs[hoveredHub.id].y / 792) * 100}%`,
                transform: "translate(-50%, -115%)",
              }}
            >
              {/* Event Image Carousel */}
              <div className="relative w-full h-36 bg-black overflow-hidden">
                <Image
                  src={hoveredHub.images[carouselIdx]}
                  alt={hoveredHub.name}
                  fill
                  className="object-cover transition-all duration-700 ease-in-out"
                  sizes="256px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-black/30 pointer-events-none" />
                
                {/* Carousel dots indicator */}
                <div className="absolute top-3 right-3 flex gap-1 z-20 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {hoveredHub.images.map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === carouselIdx ? "bg-[#FF7A00] scale-110" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Card text content */}
              <div className="p-4 space-y-2">
                <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center justify-between">
                  {hoveredHub.name} Hub
                  {hoveredHub.isHost && (
                    <span className="text-[8px] font-black uppercase text-black px-1.5 py-0.5 rounded bg-[#FFC107]">
                      HOST
                    </span>
                  )}
                </h4>
                <span className="text-[9px] font-extrabold uppercase text-gray-500 tracking-wider">
                  {hoveredHub.state} Chapter
                </span>
                <p className="text-[11px] text-[#FF7A00] font-black uppercase tracking-widest leading-snug">
                  {hoveredHub.event}
                </p>
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider pt-2 border-t border-white/5">
                  <span>{hoveredHub.players} Players</span>
                  <span className="text-gray-500">{hoveredHub.date}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet (Slide-up Panel on Touch with Carousel) */}
      {selectedMobileHub && isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B0B]/98 border-t border-[#FF7A00]/30 rounded-t-3xl p-6 shadow-[0_-10px_35px_rgba(0,0,0,0.9)] backdrop-blur-lg">
          <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-4" />
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                {selectedMobileHub.name}
                {selectedMobileHub.isHost && (
                  <span className="text-xs font-black uppercase text-black px-2 py-0.5 rounded bg-[#FFC107]">
                    Host Hub
                  </span>
                )}
              </h4>
              <span className="text-xs font-extrabold uppercase text-gray-500 tracking-wider">
                {selectedMobileHub.state} Chapter
              </span>
              <p className="text-sm text-[#FF7A00] font-black uppercase tracking-wider mt-1">
                {selectedMobileHub.event}
              </p>
            </div>
            <button
              onClick={() => setSelectedMobileHub(null)}
              className="text-gray-400 hover:text-white text-3xl font-light px-2"
            >
              &times;
            </button>
          </div>

          {/* Carousel Image on Mobile */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-black">
            <Image
              src={selectedMobileHub.images[carouselIdx]}
              alt={selectedMobileHub.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-3 right-3 flex gap-1 z-20 bg-black/40 px-2 py-0.5 rounded-full">
              {selectedMobileHub.images.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === carouselIdx ? "bg-[#FF7A00]" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-300 font-semibold mb-6 uppercase tracking-wider">
            <p className="flex justify-between">
              <span className="text-gray-500">Players Count:</span>
              <span>{selectedMobileHub.players} Active Members</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">Timeline:</span>
              <span>{selectedMobileHub.date}</span>
            </p>
          </div>
          
          <a
            href={PHOTOS_DRIVE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-black font-extrabold text-xs uppercase tracking-wider transition-all"
          >
            View Chapter Media
          </a>
        </div>
      )}
      {/* Visual Directory List */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 mt-12 mb-6">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {CITIES.map((hub) => {
            const isHovered = hoveredHub?.id === hub.id;
            return (
              <button
                key={hub.id}
                onMouseEnter={() => !isMobile && setHoveredHub(hub)}
                onMouseLeave={() => !isMobile && setHoveredHub(null)}
                onClick={() => {
                  if (isMobile) {
                    setSelectedMobileHub(hub);
                  } else {
                    window.open(PHOTOS_DRIVE_LINK, "_blank");
                  }
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider border transition-all duration-300 cursor-pointer outline-none ${
                  isHovered
                    ? "bg-gradient-to-r from-[#FF7A00] to-[#FFC107] border-orange-400 text-black shadow-[0_0_20px_rgba(255,122,0,0.3)] scale-105"
                    : "bg-[#0b0b0b] border-white/10 text-gray-300 hover:border-orange-500/50 hover:text-white"
                }`}
              >
                {hub.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}