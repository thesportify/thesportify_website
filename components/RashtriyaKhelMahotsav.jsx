'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import rkmLogo from '../assets/RKM2.png';
import mapImage from '../assets/map.png';
import { Calendar, MapPin, Trophy, Users, ChevronDown } from 'lucide-react';



export default function RashtriyaKhelMahotsav() {
  const [showDetails, setShowDetails] = useState(false);
  const [hoveredState, setHoveredState] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);



  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-black"
      id="rkm-2026"
    >
      <div className="relative z-0">
        <div className="container mx-auto">
        
        {/* Section Header (two-column: text left, image right) - WITH VIDEO BACKGROUND */}
        <div className="relative grid grid-cols-1 md:grid-cols-[55%_45%] scroll-reveal items-center overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-full bg-black z-[-1]"></div>
          
          <video
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            className="absolute z-0 opacity-50 hidden md:block"
            style={{
              top: '55%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '35%',
              height: '35%',
              objectFit: 'contain',
            }}
          >
            <source src="/RKM.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-[1]"></div>
          
          <div className="relative z-10 space-y-4 pt-2 px-6 pb-6 md:pt-6 md:pl-20 md:pr-12 order-1 md:order-1">
            {/* Header Text */}
            <div>
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                  <Image 
                    src={rkmLogo} 
                    alt="RKM Logo" 
                    fill 
                    className="object-contain drop-shadow-[0_0_20px_rgba(255,140,0,0.5)]" 
                    priority 
                  />
                </div>
              </div>
              <h2 className="text-[1.625rem] sm:text-[2rem] md:text-[2.7rem] font-bold mb-3 md:mb-4 text-white text-left" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)' }}>
                Sportify{" "}
                <span 
                  className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--flame))] via-[hsl(var(--flame-light))] to-[hsl(var(--off-white))]" 
                  style={{
                    filter: 'brightness(1.4) saturate(1.2) drop-shadow(0 0 0 transparent)',
                    textShadow: 'none'
                  }}
                >
                  Rashtriya Khel Mahotsav
                </span>{" "}
                2026
              </h2>
              <p className="text-gray-200 max-w-3xl text-left text-[0.9rem] sm:text-[1.08rem] mb-2" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.7)' }}>
                A Pan-India Sports Series by Sportify Society, IIT Madras BS
              </p>
              <p className="text-[1.2rem] sm:text-[1.35rem] md:text-[1.62rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--flame))] via-[hsl(var(--off-white))] to-green-400 mt-4 text-left" style={{ filter: 'drop-shadow(2px 2px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 15px rgba(0,0,0,0.8))' }}>
                "One Nation. One Spirit. One Game."
              </p>
            </div>

            {/* Quick Info Grid */}
            <div className="max-w-xl">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-[hsl(var(--flame-dark))/60] to-[hsl(var(--flame))/50] border border-[hsl(var(--flame))/50] rounded-lg p-2 md:p-2.5 backdrop-blur-md bg-black/30">
                  <p className="text-[0.6rem] md:text-[0.7rem] text-gray-400 mb-0.5 md:mb-1">Event Period</p>
                  <p className="text-[0.75rem] md:text-[0.94rem] font-bold text-white">18th - 22nd Feb 2026</p>
                </div>
                <div className="bg-gradient-to-br from-primary/60 to-accent/50 border border-accent/50 rounded-lg p-2 md:p-2.5 backdrop-blur-md bg-black/30">
                  <p className="text-[0.6rem] md:text-[0.7rem] text-gray-400 mb-0.5 md:mb-1">8 Cities</p>
                  <p className="text-[0.75rem] md:text-[0.94rem] font-bold text-white">Pan-India Coverage</p>
                </div>
                <div className="bg-gradient-to-br from-[hsl(var(--flame-dark))/60] to-[hsl(var(--flame))/50] border border-[hsl(var(--flame))/50] rounded-lg p-2 md:p-2.5 backdrop-blur-md bg-black/30">
                  <p className="text-[0.6rem] md:text-[0.7rem] text-gray-400 mb-0.5 md:mb-1">Sports</p>
                  <p className="text-[0.75rem] md:text-[0.94rem] font-bold text-white">Badminton + Cricket</p>
                </div>
                <div className="bg-gradient-to-br from-[hsl(var(--flame-dark))/60] to-[hsl(var(--flame))/50] border border-[hsl(var(--flame))/50] rounded-lg p-2 md:p-2.5 backdrop-blur-md bg-black/30">
                  <p className="text-[0.6rem] md:text-[0.7rem] text-gray-400 mb-0.5 md:mb-1">Format</p>
                  <p className="text-[0.75rem] md:text-[0.94rem] font-bold text-white">Knockout Tournament</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: India map with cities */}
          <div className="relative z-10 flex items-center justify-center p-6 order-2 md:order-2">
            <div className="relative w-full h-[50vh] md:h-[85vh] max-h-[400px] md:max-h-[690px]">
              <Image src={mapImage} alt="India Map with Cities" fill className="object-contain drop-shadow-xl" />
            </div>
          </div>
        </div>

        {/* Divider after video section */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[hsl(var(--flame))] to-transparent mb-12 rounded-full"></div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto scroll-reveal">
          
          {/* City Schedule with Interactive Map */}
          {/* ...removed map and city legend section... */}

          {/* More Details Button */}
          <div className="text-center mb-8">
            <motion.button
              onClick={() => setShowDetails(!showDetails)}
              className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffepad8] text-black font-bold rounded-full text-sm md:text-base shadow-lg hover:shadow-[0_0_30px_rgba(255,206,0,0.5)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                {showDetails ? 'Hide Details' : 'More Details'}
                <motion.div
                  animate={{ rotate: showDetails ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </span>
            </motion.button>
          </div>

          {/* Expandable Details Section */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <div className="space-y-6 md:space-y-8">
                  
                  {/* City Schedule */}
                  <div className="bg-gradient-to-br from-card to-background border border-border rounded-2xl p-4 md:p-8 backdrop-blur-sm">
                    <h3 className="text-base md:text-2xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2">
                      <span className="text-lg md:text-2xl">📅</span> Event Schedule by City
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                      {/* Lucknow */}
                      <div className="bg-card/40 border border-[hsl(var(--flame))]/30 rounded-xl p-3 md:p-4 hover:border-[hsl(var(--flame))]/60 transition-all">
                        <div className="flex items-start justify-between mb-1.5 md:mb-2">
                          <h4 className="text-sm md:text-base font-bold text-[hsl(var(--flame))]">📍 Lucknow</h4>
                          <span className="text-[10px] md:text-xs text-muted-foreground bg-[hsl(var(--flame))]/10 px-1.5 md:px-2 py-0.5 rounded-full">18 Feb</span>
                        </div>
                        <p className="text-foreground text-xs md:text-sm font-semibold">🏏 Cricket</p>
                      </div>

                      {/* Delhi */}
                      <div className="bg-card/40 border border-[hsl(var(--flame))]/30 rounded-xl p-3 md:p-4 hover:border-[hsl(var(--flame))]/60 transition-all">
                        <div className="flex items-start justify-between mb-1.5 md:mb-2">
                          <h4 className="text-sm md:text-base font-bold text-[hsl(var(--flame))]">📍 Delhi</h4>
                          <span className="text-[10px] md:text-xs text-muted-foreground bg-[hsl(var(--flame))]/10 px-1.5 md:px-2 py-0.5 rounded-full">21 Feb</span>
                        </div>
                        <p className="text-foreground text-xs md:text-sm font-semibold">🏏 Cricket & 🏸 Badminton</p>
                      </div>

                      {/* Mumbai */}
                      <div className="bg-card/40 border border-[hsl(var(--flame))]/30 rounded-xl p-3 md:p-4 hover:border-[hsl(var(--flame))]/60 transition-all">
                        <div className="flex items-start justify-between mb-1.5 md:mb-2">
                          <h4 className="text-sm md:text-base font-bold text-[hsl(var(--flame))]">📍 Mumbai</h4>
                          <span className="text-[10px] md:text-xs text-muted-foreground bg-[hsl(var(--flame))]/10 px-1.5 md:px-2 py-0.5 rounded-full">21 Feb</span>
                        </div>
                        <p className="text-foreground text-xs md:text-sm font-semibold">🏸 Badminton</p>
                      </div>

                      {/* Jaipur */}
                      <div className="bg-card/40 border border-[hsl(var(--flame))]/30 rounded-xl p-3 md:p-4 hover:border-[hsl(var(--flame))]/60 transition-all">
                        <div className="flex items-start justify-between mb-1.5 md:mb-2">
                          <h4 className="text-sm md:text-base font-bold text-[hsl(var(--flame))]">📍 Jaipur</h4>
                          <span className="text-[10px] md:text-xs text-muted-foreground bg-[hsl(var(--flame))]/10 px-1.5 md:px-2 py-0.5 rounded-full">22 Feb</span>
                        </div>
                        <p className="text-foreground text-xs md:text-sm font-semibold">🏏 Cricket</p>
                      </div>

                      {/* Hyderabad */}
                      <div className="bg-card/40 border border-[hsl(var(--flame))]/30 rounded-xl p-3 md:p-4 hover:border-[hsl(var(--flame))]/60 transition-all">
                        <div className="flex items-start justify-between mb-1.5 md:mb-2">
                          <h4 className="text-sm md:text-base font-bold text-[hsl(var(--flame))]">📍 Hyderabad</h4>
                          <span className="text-[10px] md:text-xs text-muted-foreground bg-[hsl(var(--flame))]/10 px-1.5 md:px-2 py-0.5 rounded-full">22 Feb</span>
                        </div>
                        <p className="text-foreground text-xs md:text-sm font-semibold">🏸 Badminton</p>
                      </div>

                      {/* Kolkata */}
                      <div className="bg-card/40 border border-[hsl(var(--flame))]/30 rounded-xl p-3 md:p-4 hover:border-[hsl(var(--flame))]/60 transition-all">
                        <div className="flex items-start justify-between mb-1.5 md:mb-2">
                          <h4 className="text-sm md:text-base font-bold text-[hsl(var(--flame))]">📍 Kolkata</h4>
                          <span className="text-[10px] md:text-xs text-muted-foreground bg-[hsl(var(--flame))]/10 px-1.5 md:px-2 py-0.5 rounded-full">22 Feb</span>
                        </div>
                        <p className="text-foreground text-xs md:text-sm font-semibold">🏏 Cricket</p>
                      </div>

                      {/* Chennai */}
                      <div className="bg-card/40 border border-[hsl(var(--flame))]/30 rounded-xl p-3 md:p-4 hover:border-[hsl(var(--flame))]/60 transition-all">
                        <div className="flex items-start justify-between mb-1.5 md:mb-2">
                          <h4 className="text-sm md:text-base font-bold text-[hsl(var(--flame))]">📍 Chennai</h4>
                          <span className="text-[10px] md:text-xs text-muted-foreground bg-[hsl(var(--flame))]/10 px-1.5 md:px-2 py-0.5 rounded-full">22 Feb</span>
                        </div>
                        <p className="text-foreground text-xs md:text-sm font-semibold">🏸 Badminton</p>
                      </div>

                      {/* Patna */}
                      <div className="bg-card/40 border border-[hsl(var(--flame))]/30 rounded-xl p-3 md:p-4 hover:border-[hsl(var(--flame))]/60 transition-all">
                        <div className="flex items-start justify-between mb-1.5 md:mb-2">
                          <h4 className="text-sm md:text-base font-bold text-[hsl(var(--flame))]">📍 Patna</h4>
                          <span className="text-[10px] md:text-xs text-muted-foreground bg-[hsl(var(--flame))]/10 px-1.5 md:px-2 py-0.5 rounded-full">22 Feb</span>
                        </div>
                        <p className="text-foreground text-xs md:text-sm font-semibold">🏸 Badminton</p>
                      </div>
                    </div>
                  </div>

                  {/* Rewards & Recognition */}
                  <div className="bg-black/70 backdrop-blur-xl border border-[hsl(var(--flame))]/40 rounded-2xl p-4 md:p-6">
                    <h3 className="text-sm md:text-xl font-bold text-foreground mb-4 md:mb-5 text-center">🎁 Rewards & Recognition</h3>
                    
                    <div className="grid md:grid-cols-3 gap-3 md:gap-4">
                      <motion.div 
                        className="relative bg-black/60 backdrop-blur-xl border-2 border-[hsl(var(--flame))]/40 rounded-lg p-3 md:p-4 text-center overflow-hidden group hover:shadow-[0_0_40px_rgba(255,140,0,0.6)] hover:border-[hsl(var(--flame))]/80 transition-all"
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-[hsl(var(--flame))]/10 rounded-full -mr-6 -mt-6 md:-mr-8 md:-mt-8 group-hover:scale-150 transition-transform"></div>
                        <div className="relative z-10">
                          <div className="inline-block p-1.5 md:p-2 bg-[hsl(var(--flame))]/20 rounded-full mb-2">
                            <Trophy className="w-4 h-4 md:w-6 md:h-6 text-[hsl(var(--flame))]" />
                          </div>
                          <h4 className="text-xs md:text-base font-bold text-[hsl(var(--flame))] mb-1 md:mb-2">Prize Pool</h4>
                          <div className="mb-0.5 md:mb-1">
                            <span className="text-base md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--flame))] to-[hsl(var(--flame-light))]">₹9,600</span>
                          </div>
                          <p className="text-[9px] md:text-xs text-gray-300 font-medium">Total across all cities</p>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="relative bg-black/60 backdrop-blur-xl border-2 border-[hsl(var(--flame-light))]/40 rounded-lg p-3 md:p-4 text-center overflow-hidden group hover:shadow-[0_0_40px_rgba(255,200,0,0.6)] hover:border-[hsl(var(--flame-light))]/80 transition-all"
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-[hsl(var(--flame-light))]/10 rounded-full -mr-6 -mt-6 md:-mr-8 md:-mt-8 group-hover:scale-150 transition-transform"></div>
                        <div className="relative z-10">
                          <div className="inline-block p-1.5 md:p-2 bg-[hsl(var(--flame-light))]/20 rounded-full mb-2">
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-[hsl(var(--flame-light))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                          <h4 className="text-xs md:text-base font-bold text-[hsl(var(--flame-light))] mb-1 md:mb-2">Winner Certificates</h4>
                          <p className="text-[9px] md:text-xs text-gray-300 font-medium leading-relaxed">Official certificates for all winners</p>
                        </div>
                      </motion.div>

                      <motion.div 
                        className="relative bg-black/60 backdrop-blur-xl border-2 border-accent/40 rounded-lg p-3 md:p-4 text-center overflow-hidden group hover:shadow-[0_0_40px_rgba(120,200,255,0.6)] hover:border-accent/80 transition-all"
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-full -mr-6 -mt-6 md:-mr-8 md:-mt-8 group-hover:scale-150 transition-transform"></div>
                        <div className="relative z-10">
                          <div className="inline-block p-1.5 md:p-2 bg-accent/20 rounded-full mb-2">
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <h4 className="text-xs md:text-base font-bold text-accent mb-1 md:mb-2">Participation Certificates</h4>
                          <p className="text-[9px] md:text-xs text-gray-300 font-medium leading-relaxed">For all participants</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Registration Button */}
          <motion.div 
            className="text-center mt-12 md:mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Ready to Participate?</h3>
            <p className="text-muted-foreground text-sm md:text-base mb-6">
              Register now and be part of the nation's biggest sports celebration
            </p>
            <Link href="/rkm-registration">
              <motion.button
                className="group relative px-10 md:px-14 py-4 md:py-5 bg-gradient-to-r from-[hsl(var(--flame))] via-[hsl(var(--flame-light))] to-[hsl(var(--flame))] text-black font-bold rounded-full text-lg md:text-xl shadow-lg hover:shadow-[0_0_40px_rgba(255,140,0,0.6)] transition-all overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Trophy className="w-5 h-5 md:w-6 md:h-6" />
                  Register Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--flame-light))] to-[hsl(var(--flame))] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
            </Link>
          </motion.div>

        </div>
        </div>
      </div>
    </section>
  );
}
