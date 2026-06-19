"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/sportify_logo1.png";
import HeroBG from "../assets/SportifyHero.jpg";
import { Button } from "../ui/buttons";

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white pt-8 px-2 sm:pt-12 sm:px-4">
      
      {/* 1. Background Image with Brightness filter for richness */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={HeroBG}
          alt="Sportify Hero Backdrop"
          fill
          priority
          className="object-cover"
          style={{ filter: "brightness(1.15)" }}
          sizes="100vw"
        />
        {/* Top vignette to darken header area for high contrast navbar */}
        <div 
          className="absolute top-0 left-0 right-0 h-64 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, rgba(5, 5, 5, 0.9) 0%, rgba(5, 5, 5, 0.3) 50%, rgba(5, 5, 5, 0) 100%)" }}
        />
        {/* Bottom vignette to fade into next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-95 z-10" />
      </div>

      {/* 3. Logo & Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl px-4 mt-12">
        
        {/* Floating Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 relative"
        >
          <div className="w-32 h-32 sm:w-44 sm:h-44 md:w-60 md:h-60 mx-auto drop-shadow-[0_4px_30px_rgba(255,122,0,0.3)]">
            <Image
              src={logo}
              alt="Sportify Logo"
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </motion.div>

        {/* Central Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white font-sans whitespace-normal"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
            Spreading the{" "}
            <span className="text-[#FF523A]">Flame</span>{" "}
            <span className="text-[#FFC107]">of Sports</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Join IIT Madras BS Degree Sports Society and be part of a community that celebrates athleticism, teamwork, and the undying spirit of competition.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto"
        >
          {/* Join Sportify Button (Google Form Link) */}
          <Link
            href="https://forms.gle/p3155Ce9UUy9CrzW6"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FF523A] to-[#FFC107] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,82,58,0.25)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 border-none rounded-xl"
            >
              <Flame className="h-4.5 w-4.5 fill-black text-black" />
              <span>Join Sportify</span>
            </Button>
          </Link>

          {/* Explore Events Button (Internal Link) */}
          <div className="w-full sm:w-auto p-[1px] rounded-xl bg-gradient-to-r from-[#FF523A]/60 to-[#FFC107]/60 hover:from-[#FF523A] hover:to-[#FFC107] transition-all">
            <Link href="/past-events" className="block w-full h-full">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-4 bg-[#050505] text-[#FFC107] hover:text-white font-extrabold text-xs uppercase tracking-wider active:scale-95 transition-all rounded-xl flex items-center justify-center border-none"
              >
                Explore Events
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
      
    </div>
  );
}


