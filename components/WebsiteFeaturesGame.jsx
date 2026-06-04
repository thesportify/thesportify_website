"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Award, 
  BookOpen, 
  HelpCircle, 
  ShieldAlert, 
  ChevronRight, 
  RotateCcw,
  Gamepad2,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import sportsBG from "../assets/stadium_neon_bg.png";

// Features data mapped to goal targets and goalie dives
const featuresData = [
  {
    id: "chronicles",
    name: "Sportify Chronicles",
    icon: BookOpen,
    targetName: "TOP LEFT BIN",
    diveState: "dive-left-top",
    description: "Our historical sports archive. View lists of leadership core committees, tenure records, and milestones that shaped the society.",
    tagline: "Explore our rich history of student athletics.",
    link: "/chronicle",
    actionText: "Browse Chronicles"
  },
  {
    id: "newsletter",
    name: "The Podium Newsletter",
    icon: Trophy,
    targetName: "TOP RIGHT BIN",
    diveState: "dive-right-top",
    description: "A monthly digital sports digest. Covers match reports, global sporting highlights, technology in sports, and community interviews.",
    tagline: "Read athlete profiles and technical sports analyses.",
    link: "/chronicle#newsletter",
    actionText: "Read Latest Edition"
  },
  {
    id: "certify",
    name: "Digital Certifications",
    icon: Award,
    targetName: "DEAD CENTER",
    diveState: "jump-center",
    description: "Instant certificate generation. Generate, download, and verify official participation and coordination credentials for all Sportify events.",
    tagline: "Verifiable credentials for student athletes.",
    link: "/certify",
    actionText: "Verify Certificates"
  },
  {
    id: "helpdesk",
    name: "Sports Helpdesk",
    icon: HelpCircle,
    targetName: "BOTTOM LEFT",
    diveState: "lunge-left-bottom",
    description: "Interactive community helpdesk. Submit general queries, get information on meetups, and request event coordination support.",
    tagline: "Quick answers for all sports activities.",
    link: "/helpdesk",
    actionText: "Open Helpdesk"
  },
  {
    id: "grievance",
    name: "Grievance Portal",
    icon: ShieldAlert,
    targetName: "BOTTOM RIGHT",
    diveState: "lunge-right-bottom",
    description: "Safe & structured grievance resolution. Includes dedicated reporting categories for general play concerns and women-focused Sportify Her safety guidelines.",
    tagline: "Ensuring clean play and fair sports environment.",
    link: "/grievance",
    actionText: "File Query / Concern"
  }
];

// Goalkeeper coordinate variants for 3D diving animations
const goalieVariants = {
  idle: {
    x: [ -12, 12, -12 ],
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      x: {
        repeat: Infinity,
        duration: 2.2,
        ease: "easeInOut"
      }
    }
  },
  "dive-left-top": {
    x: -85,
    y: -30,
    rotate: -40,
    scale: 0.85,
    transition: { type: "spring", stiffness: 130, damping: 14 }
  },
  "dive-right-top": {
    x: 85,
    y: -30,
    rotate: 40,
    scale: 0.85,
    transition: { type: "spring", stiffness: 130, damping: 14 }
  },
  "lunge-left-bottom": {
    x: -75,
    y: 12,
    rotate: -65,
    scale: 0.85,
    transition: { type: "spring", stiffness: 130, damping: 14 }
  },
  "lunge-right-bottom": {
    x: 75,
    y: 12,
    rotate: 65,
    scale: 0.85,
    transition: { type: "spring", stiffness: 130, damping: 14 }
  },
  "jump-center": {
    x: 0,
    y: -25,
    rotate: 0,
    scale: 1.05,
    transition: { type: "spring", stiffness: 160, damping: 12 }
  }
};

// Target positions relative to the entire parent arena frame (single source of truth)
const targetsConfig = {
  chronicles: {
    ball: { left: "22%", top: "18%", scale: 0.35, rotate: 720 },
    shadow: { left: "22%", top: "54%", scale: 0.35, opacity: 0.15 }
  },
  newsletter: {
    ball: { left: "78%", top: "18%", scale: 0.35, rotate: -720 },
    shadow: { left: "78%", top: "54%", scale: 0.35, opacity: 0.15 }
  },
  certify: {
    ball: { left: "50%", top: "28%", scale: 0.32, rotate: 360 },
    shadow: { left: "50%", top: "54%", scale: 0.32, opacity: 0.15 }
  },
  helpdesk: {
    ball: { left: "22%", top: "44%", scale: 0.38, rotate: 540 },
    shadow: { left: "22%", top: "54%", scale: 0.38, opacity: 0.25 }
  },
  grievance: {
    ball: { left: "78%", top: "44%", scale: 0.38, rotate: -540 },
    shadow: { left: "78%", top: "54%", scale: 0.38, opacity: 0.25 }
  }
};

const commentaryLines = [
  "TOP BINS! Unbelievable strike!",
  "GOOOAAL! Goalkeeper stood no chance!",
  "What a hit! Clean into the corner!",
  "Sensational shot! Right in the target!",
  "Clinical finish! You've scored!"
];

export default function WebsiteFeaturesGame() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isKicking, setIsKicking] = useState(false);
  const [hasScored, setHasScored] = useState(false);
  const [hoveredTarget, setHoveredTarget] = useState(null);
  const [commentary, setCommentary] = useState("");
  const [goalieState, setGoalieState] = useState("idle");

  const handleShoot = (feature) => {
    if (isKicking) return; // Prevent double clicks during active kick animation

    // Auto-reset ball if a new shot is initiated after scoring
    if (hasScored) {
      setHasScored(false);
    }

    setIsKicking(true);
    setActiveFeature(feature);
    setGoalieState(feature.diveState);

    // Pick commentary line
    const randCommentary = commentaryLines[Math.floor(Math.random() * commentaryLines.length)];
    setCommentary(randCommentary);

    // Delay showing target unlock until kick completes
    setTimeout(() => {
      setHasScored(true);
      setIsKicking(false);
    }, 850);
  };

  const handleReset = () => {
    setHasScored(false);
    setActiveFeature(null);
    setIsKicking(false);
    setHoveredTarget(null);
    setGoalieState("idle");
  };

  // Helper to get SVG curved Bezier path coordinates based on viewBox="0 0 100 100"
  const getTrajectoryPath = (targetId) => {
    let tx, ty;
    switch (targetId) {
      case "chronicles":
        tx = 22; ty = 18;
        break;
      case "newsletter":
        tx = 78; ty = 18;
        break;
      case "certify":
        tx = 50; ty = 28;
        break;
      case "helpdesk":
        tx = 22; ty = 44;
        break;
      case "grievance":
        tx = 78; ty = 44;
        break;
      default:
        return "";
    }
    // Control point to create 3D height arc bending upwards
    const cx = (50 + tx) / 2;
    const cy = Math.min(82, ty) - 15;
    return `M 50 82 Q ${cx} ${cy} ${tx} ${ty}`;
  };

  return (
    <section 
      className="relative py-24 bg-cover bg-center overflow-hidden px-4 md:px-8 border-y border-gray-900/50"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${sportsBG.src})`,
      }}
    >
      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.95) 100%) pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full border border-orange-500/20 mb-2 shadow-[0_0_15px_rgba(249,115,22,0.15)] animate-pulse">
            <Gamepad2 className="h-6 w-6 text-orange-400" />
            <span className="ml-2 text-xs font-bold text-orange-400 uppercase tracking-widest">Interactive 3D Arena</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
            PLAY THE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffaa00] to-[#ffe808] drop-shadow-[0_2px_10px_rgba(255,90,0,0.15)]">
              SPORTIFY FIELD
            </span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Take aim in the 3D Goal! Outsmart the goalkeeper and score a penalty kick to unlock key website portals.
          </p>
        </div>

        {/* 3D Game Arena Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Upper Column: Tilted 3D Arena */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            {/* Arena Container */}
            <div className="relative w-full aspect-[4/3.2] max-w-[500px] bg-gradient-to-b from-[#020617] via-[#052e16]/20 to-[#022c22]/10 border border-slate-900/60 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
              
              {/* Stadium Lights Effect */}
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

              {/* 3D Turf pitch ground plane */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[46%] z-0" 
                style={{ perspective: "1000px" }}
              >
                <div 
                  className="w-full h-[200%] bg-emerald-950/40 origin-top"
                  style={{
                    transform: "rotateX(62deg)",
                    backgroundImage: `
                      repeating-linear-gradient(to bottom, #064e3b 0px, #064e3b 25px, #047857 25px, #047857 50px),
                      radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%)
                    `
                  }}
                >
                  {/* Chalk Lines */}
                  {/* Goal Line boundary */}
                  <div className="absolute top-0 left-[2%] right-[2%] h-[3px] bg-white/30" />
                  {/* Penalty Box */}
                  <div className="absolute top-0 left-[20%] right-[20%] h-[38%] border-b-[3px] border-x-[3px] border-white/20 rounded-b-2xl" />
                  {/* Penalty Spot */}
                  <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-4 h-4 bg-white/75 rounded-full shadow-lg" />
                </div>
              </div>

              {/* Upright Goalpost Frame (Standing vertical relative to pitch) */}
              <div className="absolute top-[10%] left-[8%] right-[8%] bottom-[46%] border-t-8 border-x-8 border-white rounded-t-xl z-10 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex flex-col justify-end bg-black/40">
                
                {/* Visual Net Grid */}
                <div 
                  className="absolute inset-0 opacity-[0.12] pointer-events-none"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(45deg, transparent, transparent 8px, #ffffff 8px, #ffffff 9px),
                      repeating-linear-gradient(-45deg, transparent, transparent 8px, #ffffff 8px, #ffffff 9px)
                    `
                  }}
                />

                {/* Goalkeeper Silhouette */}
                <motion.div
                  className="absolute bottom-0 left-[43%] w-[14%] h-[55px] z-20 flex flex-col items-center justify-end origin-bottom"
                  variants={goalieVariants}
                  animate={goalieState}
                >
                  {/* Jersey and Arms */}
                  <div className="w-10 h-9 bg-orange-600 rounded-t-xl border-t-2 border-x-2 border-white flex items-center justify-center text-white shadow-lg relative">
                    <ShieldAlert className="h-4 w-4 text-white/90" />
                    {/* Glowing gloves */}
                    <div className="absolute -left-2.5 top-1.5 w-3 h-3 bg-yellow-400 rounded-full border border-white shadow animate-pulse" />
                    <div className="absolute -right-2.5 top-1.5 w-3 h-3 bg-yellow-400 rounded-full border border-white shadow animate-pulse" />
                  </div>
                  {/* Goalkeeper Head */}
                  <div className="w-6 h-6 bg-orange-300 rounded-full border-2 border-white absolute top-[-10px] shadow" />
                  <span className="text-[7px] bg-black/95 border border-gray-800 px-1 py-0.5 rounded text-white font-black uppercase tracking-wider mt-1 relative z-10">
                    KEEPER
                  </span>
                </motion.div>
              </div>

              {/* 3D Floating Target Rings - Placed directly in the parent Arena coordinates for perfect 3D alignment */}
              {featuresData.map((feature) => {
                const TargetIcon = feature.icon;
                const pos = targetsConfig[feature.id].ball;

                return (
                  <button
                    key={feature.id}
                    onMouseEnter={() => setHoveredTarget(feature.id)}
                    onMouseLeave={() => setHoveredTarget(null)}
                    onClick={() => handleShoot(feature)}
                    disabled={isKicking}
                    className={`absolute w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border-2 z-30 ${
                      hoveredTarget === feature.id
                        ? "bg-yellow-500/20 border-yellow-400 scale-110 shadow-[0_0_20px_#facc15] text-yellow-300"
                        : "bg-black/70 border-orange-500/60 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.35)] hover:border-yellow-400 hover:text-yellow-300"
                    }`}
                    style={{
                      transform: "translate(-50%, -50%)",
                      left: pos.left,
                      top: pos.top
                    }}
                  >
                    <TargetIcon className="h-5 w-5 md:h-6 md:w-6" />
                    
                    {/* Ripple Wave expanding when Hit */}
                    {hasScored && activeFeature?.id === feature.id && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-yellow-400 pointer-events-none"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    )}
                  </button>
                );
              })}

              {/* Aiming Guideline Layer (SVG viewBox acting as percentage space) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                {hoveredTarget && !isKicking && !hasScored && (
                  <motion.path
                    d={getTrajectoryPath(hoveredTarget)}
                    fill="none"
                    stroke="url(#aiming-gradient)"
                    strokeWidth="1.2"
                    strokeDasharray="4, 4"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                )}
                <defs>
                  <linearGradient id="aiming-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#ff5a00" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ffe808" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Dynamic Football Shadow (Slides on ground plane) */}
              <motion.div
                className="absolute w-12 h-3 bg-black/60 rounded-full blur-[2px] z-10 pointer-events-none origin-center"
                style={{ transform: "translate(-50%, -50%)" }}
                animate={
                  activeFeature && isKicking
                    ? {
                        left: targetsConfig[activeFeature.id].shadow.left,
                        top: targetsConfig[activeFeature.id].shadow.top,
                        scale: targetsConfig[activeFeature.id].shadow.scale,
                        opacity: targetsConfig[activeFeature.id].shadow.opacity,
                        transition: { duration: 0.8, ease: "easeOut" }
                      }
                    : {
                        left: "50%",
                        top: "84%",
                        scale: 1,
                        opacity: 0.65
                      }
                }
              />

              {/* Football Ball (Flies in 3D arc) */}
              <motion.div
                className="absolute w-12 h-12 bg-white rounded-full border-4 border-black/95 flex items-center justify-center shadow-xl z-30 pointer-events-none origin-center"
                style={{
                  transform: "translate(-50%, -50%)",
                  backgroundImage: `radial-gradient(circle at 35% 35%, #ffffff 0%, #d1d5db 60%, #4b5563 100%)`
                }}
                animate={
                  activeFeature && isKicking
                    ? {
                        left: targetsConfig[activeFeature.id].ball.left,
                        top: targetsConfig[activeFeature.id].ball.top,
                        scale: targetsConfig[activeFeature.id].ball.scale,
                        rotate: targetsConfig[activeFeature.id].ball.rotate,
                        y: [0, -75, 0], // Parabolic height jump
                        transition: {
                          duration: 0.85,
                          ease: "easeOut",
                          y: { duration: 0.85, times: [0, 0.45, 1], ease: ["easeOut", "easeIn"] }
                        }
                      }
                    : {
                        left: "50%",
                        top: "82%",
                        scale: 1,
                        rotate: 0,
                        y: 0
                      }
                }
              >
                {/* Football Pentagons Pattern */}
                <div className="w-full h-full opacity-70 flex items-center justify-center font-bold text-black text-xl select-none">
                  ⚽
                </div>
              </motion.div>

              {/* Commentary/HUD bar */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/80 border border-slate-900 rounded-full px-4.5 py-1.5 z-40 max-w-[90%] text-center shadow-lg">
                <span className="text-[10px] md:text-xs text-orange-400 font-extrabold uppercase tracking-widest">
                  {hoveredTarget && !isKicking
                    ? `AIMING AT: ${featuresData.find(f => f.id === hoveredTarget)?.targetName}`
                    : isKicking
                    ? "SHOT FIRED! ⚡"
                    : "TAP A TARGET IN THE GOAL & SHOOT"
                  }
                </span>
              </div>

            </div>

            {/* Quick Trigger Button below Field */}
            <div className="mt-4 flex items-center justify-center h-12 w-full">
              {hoveredTarget && !isKicking && (
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() => handleShoot(featuresData.find(f => f.id === hoveredTarget))}
                  className="py-2.5 px-6 rounded-full bg-gradient-to-r from-orange-600 via-yellow-500 to-yellow-400 hover:from-orange-500 hover:to-yellow-300 text-black font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.45)] cursor-pointer flex items-center space-x-2 border-2 border-white/20"
                >
                  <span>KICK BALL ⚽</span>
                </motion.button>
              )}
            </div>

          </div>

          {/* Right / Lower Column: Unlocked Card / Instructions */}
          <div className="lg:col-span-5 w-full">
            <AnimatePresence mode="wait">
              {!hasScored ? (
                // Walkthrough/Tutorial Card
                <motion.div
                  key="tutorial"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[#070b14]/80 backdrop-blur-md border-2 border-gray-900 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 flex flex-col justify-center min-h-[360px]"
                >
                  <div className="flex items-center space-x-3 border-b border-gray-900 pb-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20 text-orange-400">
                      <Gamepad2 className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">
                      HOW TO PLAY
                    </h3>
                  </div>
                  
                  <ul className="space-y-4 text-xs md:text-sm text-gray-300">
                    <li className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[10px] font-black text-orange-400 mt-0.5 shrink-0">
                        1
                      </div>
                      <p className="leading-relaxed">
                        <strong>Aim at a Target</strong>: Hover or tap any of the glowing neon rings inside the goalpost to target that website feature.
                      </p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[10px] font-black text-orange-400 mt-0.5 shrink-0">
                        2
                      </div>
                      <p className="leading-relaxed">
                        <strong>Strike the Ball</strong>: Click the target directly or press the <strong>KICK BALL</strong> button to launch the football in 3D.
                      </p>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[10px] font-black text-orange-400 mt-0.5 shrink-0">
                        3
                      </div>
                      <p className="leading-relaxed">
                        <strong>Score & Unlock</strong>: Outsmart the diving goalkeeper to score! This reveals detailed feature information and navigation links.
                      </p>
                    </li>
                  </ul>
                  
                  <div className="pt-2 text-center">
                    <span className="text-[10px] bg-orange-500/5 border border-orange-500/10 text-orange-400 font-bold uppercase tracking-widest px-4.5 py-2.5 rounded-full inline-block animate-pulse">
                      ⚽ Hover targets to view trajectory
                    </span>
                  </div>
                </motion.div>
              ) : (
                // Success / Unlocked Portal Card
                <motion.div
                  key="portal-unlocked"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#070b14]/85 backdrop-blur-md border-2 border-orange-500/30 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_rgba(234,88,12,0.15)] flex flex-col justify-between min-h-[365px]"
                >
                  <div className="space-y-5">
                    {/* Goal Banner */}
                    <div className="flex items-center justify-between border-b border-gray-900 pb-4">
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider shadow-md inline-block">
                            GOOAL!
                          </span>
                          <span className="flex items-center text-[9px] text-[#ffe808] font-bold uppercase tracking-wider">
                            <Sparkles className="h-3 w-3 mr-0.5 animate-pulse text-[#ffe808]" />
                            Beat the Keeper
                          </span>
                        </div>
                        <h4 className="text-xs text-gray-500 uppercase tracking-widest font-black mt-1.5">
                          {activeFeature.targetName}
                        </h4>
                      </div>
                      <div className="p-2.5 bg-orange-500/20 rounded-xl border border-orange-500/30 text-orange-400">
                        {(() => {
                          const IconComp = activeFeature.icon;
                          return <IconComp className="h-5 w-5" />;
                        })()}
                      </div>
                    </div>

                    {/* Commentary */}
                    <p className="text-[#ffe808] text-xs font-black uppercase tracking-wider italic">
                      &ldquo;{commentary}&rdquo;
                    </p>

                    {/* Feature descriptions */}
                    <div className="space-y-1">
                      <h3 className="text-lg md:text-xl font-extrabold text-white uppercase tracking-tight">
                        {activeFeature.name}
                      </h3>
                      <p className="text-xs text-orange-400/90 font-bold tracking-wider">
                        {activeFeature.tagline}
                      </p>
                    </div>

                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                      {activeFeature.description}
                    </p>
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-6 border-t border-gray-900 flex items-center justify-between gap-2">
                    <button
                      onClick={handleReset}
                      className="py-2.5 px-3 rounded-xl bg-gray-950 border border-gray-900 hover:border-orange-500/30 text-gray-400 hover:text-white transition-all text-xs font-black uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Reset Spot</span>
                    </button>
                    
                    <Link
                      href={activeFeature.link}
                      className="py-2.5 px-4.5 rounded-xl bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black font-black text-xs tracking-wider uppercase transition-all flex items-center space-x-1 shadow-[0_4px_15px_rgba(234,88,12,0.15)] animate-pulse"
                    >
                      <span>{activeFeature.actionText}</span>
                      <ChevronRight className="h-3.5 w-3.5 stroke-[3px]" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
