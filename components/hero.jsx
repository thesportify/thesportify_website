"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/sportify_logo1.png";
import HeroSpotlights from "./HeroSpotlights";
import stadiumSilhouette from "../assets/stadium_glow_bg.png";

import DelhiBadminton from "../assets/Meetups/DelhiBadminton1.jpg";
import KanpurCricket from "../assets/Meetups/KanpurCricket1.png";
import ChennaiFootball from "../assets/RKM26 - Chennai Chapter.jpg";
import LucknowTrophy from "../assets/RKM - Lucknow Chapter.jpg";
import TeamCelebration from "../assets/athlete_mixed_team.png";

// Magnetic Hover Wrapper Component
function MagneticWrapper({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 12 });
  const springY = useSpring(y, { stiffness: 120, damping: 12 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic pull distance cap
    x.set(distanceX * 0.4);
    y.set(distanceY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full w-full flex items-center justify-center"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

const HERO_IMAGES = [
  DelhiBadminton,
  KanpurCricket,
  ChennaiFootball,
  LucknowTrophy,
  TeamCelebration
];

export default function Hero() {
  const bgRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 15 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 15 });

  const logoGlow = useMotionValue(0.5);
  const smoothLogoGlow = useSpring(logoGlow, { stiffness: 100, damping: 20 });
  const logoFilter = useTransform(smoothLogoGlow, [0, 1], [
    "drop-shadow(0 0 15px rgba(255,122,0,0.35))",
    "drop-shadow(0 0 45px rgba(255,122,0,0.85))"
  ]);

  const fogX = useTransform(smoothMouseX, (val) => val * 0.6);
  const fogY = useTransform(smoothMouseY, (val) => val * 0.6);
  const embersX = useTransform(smoothMouseX, (val) => val * 1.5);
  const embersY = useTransform(smoothMouseY, (val) => val * 1.5);

  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [embers, setEmbers] = useState([]);

  // Sequence background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Generate embers
  useEffect(() => {
    const list = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 4 + 1.5,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 5
    }));
    setEmbers(list);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xOffset = (clientX / window.innerWidth - 0.5) * 20; // max shift 20px
      const yOffset = (clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(xOffset);
      mouseY.set(yOffset);

      // Distance from center
      const dx = clientX - window.innerWidth / 2;
      const dy = clientY - window.innerHeight / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight) / 2;
      const intensity = 1 - Math.min(dist / maxDist, 1);
      logoGlow.set(intensity);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, logoGlow]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white">
      
      {/* 1. Black Background (Static) */}
      <div className="absolute inset-0 bg-[#050505] z-0 pointer-events-none" />

      {/* 2. Dark Stadium Silhouette (Static) */}
      <div className="absolute inset-0 z-10 opacity-35 pointer-events-none">
        <Image
          src={stadiumSilhouette}
          alt="Stadium Silhouette"
          fill
          className="object-cover"
        />
      </div>

      {/* Extreme subtle dark overlay */}
      <div className="absolute inset-0 z-15 bg-[#050505]/92 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.08)_0%,transparent_80%)] z-15 pointer-events-none" />
      
      {/* 3. Fog Layer (Shifts slightly) */}
      <motion.div 
        style={{ x: fogX, y: fogY }}
        className="absolute inset-0 pointer-events-none z-20 overflow-hidden mix-blend-screen opacity-20"
      >
        <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.06)_0%,transparent_60%)] blur-[80px] animate-[spin_50s_linear_infinite]" />
        <div className="absolute w-[180%] h-[180%] bottom-[-40%] right-[-40%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_50%)] blur-[70px] animate-[spin_40s_linear_infinite_reverse]" />
      </motion.div>

      {/* 4. Very Low Opacity Sports Footage (Static background sequence, 8-12% opacity) */}
      <div className="absolute inset-0 w-full h-full opacity-10 z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImgIdx}
            initial={{ opacity: 0, scale: 1.0 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1.8, ease: "easeInOut" },
              scale: { duration: 5.5, ease: "linear" } 
            }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[currentImgIdx]}
              alt="Sportify Hero Backdrop"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 5. Orange Particles / Embers (Shifts slightly) */}
      <motion.div 
        style={{ x: embersX, y: embersY }}
        className="absolute inset-0 pointer-events-none z-40 overflow-hidden"
      >
        {embers.map((ember) => (
          <motion.div
            key={ember.id}
            className="absolute rounded-full bg-[#FF7A00]/50 blur-[0.5px]"
            style={{
              left: `${ember.x}%`,
              bottom: "-5%",
              width: ember.size,
              height: ember.size,
            }}
            animate={{
              y: ["0vh", "-110vh"],
              x: ["0vw", `${Math.random() * 10 - 5}vw`],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: ember.duration,
              delay: ember.delay,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>

      {/* Volumetric Spotlights Canvas */}
      <HeroSpotlights />

      {/* Stadium Light Overlay & Particles */}
      <div className="absolute inset-0 z-45 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(255,193,7,0.08)_0%,transparent_60%)]" />

      {/* 6. Main Hero Content */}
      <div className="relative z-50 flex flex-col items-center justify-center max-w-5xl px-4 text-center mt-12 sm:mt-16 md:-translate-y-[40px]">
        
        {/* Logo with reveal animation & interactive glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: logoFilter }}
          className="relative mb-10"
        >
          {/* Subtle radial orange glow (Olympic torch glow) */}
          <div className="absolute inset-[-40px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.15)_0%,transparent_70%)] pointer-events-none z-0 blur-lg" />

          <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto">
            <Image
              src={logo}
              alt="Sportify Logo"
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-[clamp(3rem,13vw,4.5rem)] md:text-[clamp(4rem,7vw,7rem)] font-extrabold tracking-tight leading-[0.9] text-center mb-8 uppercase"
        >
          Spreading The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFC107] to-white drop-shadow-[0_0_20px_rgba(255,122,0,0.3)]">
            Flame of Sports
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-0 leading-relaxed font-medium"
        >
          Join IIT Madras BS Degree Sports Society and become part of a community that celebrates athleticism, teamwork, and the undying spirit of competition.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-md mx-auto mt-12"
        >
          {/* Join Sportify Button */}
          <div className="w-full sm:w-1/2 h-14">
            <MagneticWrapper>
              <Link
                href="https://forms.gle/p3155Ce9UUy9CrzW6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(255,122,0,0.4)] border border-orange-400/40 relative overflow-hidden group transition-all"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Flame className="h-4.5 w-4.5 fill-black" />
                  Join Sportify
                </span>
              </Link>
            </MagneticWrapper>
          </div>

          {/* Explore Events Button */}
          <div className="w-full sm:w-1/2 h-14">
            <MagneticWrapper>
              <Link
                href="#sportify-in-paradox"
                className="w-full h-full flex items-center justify-center rounded-xl bg-[#0b0b0b]/80 border-2 border-white/10 hover:border-orange-500/40 text-white font-extrabold text-sm uppercase tracking-wider backdrop-blur-md relative overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Events
                  <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </MagneticWrapper>
          </div>
        </motion.div>

        {/* Bottom Scroll Indicator - Minimalist premium Nike style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center select-none cursor-pointer mt-8"
          onClick={() => {
            document.getElementById("spirit-wall")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[#FF7A00] text-sm animate-[bounce_2s_infinite]">↓</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF7A00] my-2">
            ENTER THE ARENA
          </span>
          {/* Tiny animated glowing line */}
          <div className="relative w-24 h-[1px] bg-white/10 mt-1 overflow-hidden">
            <motion.div 
              animate={{ left: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent shadow-[0_0_8px_#FF7A00]" 
            />
          </div>
        </motion.div>
      </div>
      
    </div>
  );
}
