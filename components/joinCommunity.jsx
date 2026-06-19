"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import teamPhoto from "../assets/athlete_mixed_team.png";

export default function JoinCommunity() {
  const sectionRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Setup parallax scroll trigger logic with Framer Motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transform offsets
  const yParallax = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  // Generate background particle embers
  useEffect(() => {
    const list = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1.5,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 2,
    }));
    setParticles(list);
  }, []);

  const links = {
    becomeMember: "https://forms.gle/7SXKC73TnWmT5GZ96",
    joinWhatsapp: "https://forms.gle/7SXKC73TnWmT5GZ96",
    joinCommunity: "https://forms.gle/7SXKC73TnWmT5GZ96"
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 flex flex-col justify-center items-center bg-[#050505] overflow-hidden select-none z-30"
      id="community"
    >
      {/* Background Parallax Team Photo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          style={{ y: yParallax }}
          className="absolute -top-[20%] -bottom-[20%] left-0 right-0"
        >
          <Image
            src={teamPhoto}
            alt="Sportify Team Celebration"
            fill
            sizes="100vw"
            className="object-cover filter brightness-[0.25] contrast-[1.05]"
            priority
          />
        </motion.div>
        
        {/* Dark Shading & Orange Haze Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/75 to-[#050505] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.22)_0%,transparent_75%)] z-10" />
        
        {/* Stadium lighting glow */}
        <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-[#FF7A00]/12 to-transparent z-10" />
      </div>

      {/* Floating Particle Embers */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#FF7A00]/40 blur-[1px]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.15, 0.8, 0.15],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Narrative & Action Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 text-center max-w-5xl flex flex-col items-center justify-center space-y-16">
        
        {/* Primary Emotion Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="text-xs sm:text-sm font-black tracking-widest text-[#FFC107] uppercase block mb-2 animate-pulse">
            IIT Madras BS Sports Society
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-[-0.02em] leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFC107] to-white drop-shadow-[0_4px_25px_rgba(255,122,0,0.25)]">
            JOIN THE MOVEMENT
          </h2>
        </motion.div>

        {/* Secondary Statistics Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 w-full max-w-5xl border border-white/5 bg-black/55 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-14"
        >
          <div className="text-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-none uppercase tracking-tight">Across India</p>
            <p className="text-[9px] text-[#FF7A00] font-black uppercase tracking-widest mt-2.5">Active Chapters</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#FF7A00] leading-none uppercase tracking-tight">Hundreds of Players</p>
            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-2.5">Competing Weekly</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#FFC107] leading-none uppercase tracking-tight">Thousands of Memories</p>
            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-2.5">Forged on Court</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-none uppercase tracking-tight">One Spirit</p>
            <p className="text-[9px] text-[#FFC107] font-black uppercase tracking-widest mt-2.5">Connecting Us All</p>
          </div>
        </motion.div>

        {/* Buttons (Secondary Focus) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full max-w-2xl"
        >
          {/* Become Member */}
          <a
            href={links.becomeMember}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/3"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full py-4.5 px-6 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-black font-extrabold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,122,0,0.25)] border border-orange-400/20 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 inline-block mr-2" />
              Become Member
            </motion.button>
          </a>

          {/* Join WhatsApp */}
          <a
            href={links.joinWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/3"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full py-4.5 px-6 rounded-xl bg-[#0b0b0b] border border-white/10 hover:border-orange-500/40 text-white font-extrabold text-xs uppercase tracking-widest backdrop-blur-md shadow-xl cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 inline-block mr-2 text-[#FF7A00]" />
              Join WhatsApp
            </motion.button>
          </a>

          {/* Join Community */}
          <a
            href={links.joinCommunity}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/3"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full py-4.5 px-6 rounded-xl bg-[#0b0b0b] border border-white/10 hover:border-orange-500/40 text-white font-extrabold text-xs uppercase tracking-widest backdrop-blur-md shadow-xl cursor-pointer"
            >
              <Users className="w-4 h-4 inline-block mr-2 text-[#FFC107]" />
              Join Community
            </motion.button>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
