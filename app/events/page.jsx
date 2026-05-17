"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Music, CalendarDays, Sparkles, Filter } from 'lucide-react';
import { MdSportsCricket } from "react-icons/md";
import { GiShuttlecock } from "react-icons/gi";
import { FaRunning, FaVolleyballBall, FaLaptopCode, FaFutbol } from "react-icons/fa";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const EVENTS_DATA = [
  {
    id: 1,
    title: 'Paradox Badminton League',
    category: 'One Court. One Battle. One Champion.',
    filterType: 'Sports',
    description: 'The Paradox Badminton League is a high-intensity inter-house badminton tournament where precision meets pressure. With short-format matches, every rally matters and every shot has consequences. Players rely on footwork, control, and quick thinking to stay ahead. There’s no time to recover here - only to adapt, respond, and execute.',
    poster: '/events/poster/Badminton_.png',
    color: 'from-[#ff9a00] to-[#ffce00]',
    icon: <GiShuttlecock className="w-6 h-6" />,
    link: 'https://www.iitmparadox.org/events/sports/87', 
  },
  {
    id: 2,
    title: 'Paradox Champions League',
    category: 'Dribble. Dash. Dominate.',
    filterType: 'Sports',
    description: 'The Paradox Champions League brings fast-paced, structured football where teamwork defines the game. With 7-a-side gameplay, quick transitions, sharp passing, and disciplined defending are essential. Every moment creates an opportunity, and every mistake can change the outcome. Teams that stay organized, focused, and clinical will take control.',
    poster: '/events/poster/footbal.png',
    color: 'from-orange-500 to-[#ff9a00]',
    icon: <FaFutbol className="w-6 h-6" />,
    link: 'https://www.iitmparadox.org/events/sports/78',
  },
  {
    id: 3,
    title: 'VolleyVibes',
    category: 'Spike the Rivalry',
    filterType: 'Sports',
    description: 'VolleyVibes is an inter-house Volleyball tournament built on rhythm, communication, and control. Every rally demands sharp reflexes, quick decisions, and seamless teamwork - from precise sets to powerful finishes. Momentum can shift in seconds, and consistency becomes your biggest strength. Stay sharp. Stay ready. Stay in the game.',
    poster: '/events/poster/Volleyball_.png',
    color: 'from-yellow-400 to-[#ffe808]',
    icon: <FaVolleyballBall className="w-6 h-6" />,
    link: 'https://www.iitmparadox.org/events/sports/83',
  },
  {
    id: 4,
    title: 'Kampus Run',
    category: 'Miles With Purpose.',
    filterType: 'Fitness',
    description: 'Kampus Run is more than a race - it’s a step towards better mental and physical well-being. With a 3 KM fun run and a 5 KM competitive run, participants can choose their pace and purpose. It’s about taking a break from routine, finding your rhythm, and finishing with a sense of clarity. Whether you compete or just run, every step counts. Run for your mind. Run for yourself.',
    poster: '/events/poster/kampus_run.png',
    color: 'from-amber-400 to-yellow-400',
    icon: <FaRunning className="w-6 h-6" />,
    link: 'https://www.iitmparadox.org/events/sports/75',
  },
  {
    id: 5,
    title: 'IPL Auction Showdown',
    category: 'Bid. Strategize. Conquer.',
    filterType: 'Strategy',
    description: 'The IPL Auction Showdown places you in the role of a team owner, where building the right squad is the real challenge. With a fixed budget and competitive bidding, every decision shapes your team’s strength. Balancing risk, timing your bids, and adapting to the room are what set the best apart. It’s not about luck - it’s about thinking ahead.',
    poster: '/events/poster/IPL Auction_.png',
    color: 'from-[#ff5a00] to-[#ff9a00]',
    icon: <MdSportsCricket className="w-6 h-6" />,
    link: 'https://www.iitmparadox.org/events/sports/76', 
  },
  {
    id: 6,
    title: 'The Burn Club (Zumba Workshop)',
    category: 'Zumba. Sweat. Repeat.',
    filterType: 'Fitness',
    description: 'The Burn Club is a high-energy Zumba session designed to help you reset and recharge. With music, movement, and an open atmosphere, it’s about letting go of stress and enjoying the moment. No pressure, no judgment - just movement, energy, and a better state of mind when you walk out.',
    poster: '/events/poster/Zumba.png',
    color: 'from-[#ffce00] to-[#ffe808]',
    icon: <Music className="w-6 h-6" />,
    link: 'https://www.iitmparadox.org/events/sports/79',
  },
  {
    id: 7,
    title: 'ECHO//PROMETHEUS',
    category: 'Twelve sleuths. Four Destinations. One answer.',
    filterType: 'Technical',
    description: 'ECHO // PROMETHEUS is a multi-stage technical investigation where teams move through challenges in cryptography, coding, cybersecurity, and live deduction. Each act builds on the last, pushing you to analyse, adapt, and connect the pieces under pressure. It’s not just about solving problems - it’s about solving the entire story.',
    poster: '/events/poster/ECHO.png',
    color: 'from-orange-400 to-yellow-400',
    icon: <FaLaptopCode className="w-6 h-6" />,
    link: 'https://www.iitmparadox.org/events/technicals/60',
  },
];

const CATEGORIES = ["All", "Sports", "Fitness", "Strategy", "Technical"];

const Marquee = () => {
  return (
    <div className="absolute top-1/2 left-0 w-full overflow-hidden -translate-y-1/2 opacity-5 pointer-events-none z-0 rotate-[-4deg] scale-110">
      <motion.div 
        animate={{ x: [0, -2000] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...Array(6)].map((_, i) => (
          <span 
            key={i} 
            className="text-[120px] md:text-[180px] font-black px-8 uppercase"
            style={{ WebkitTextStroke: '2px white', color: 'transparent' }}
          >
            PARADOX 2026 EVENT SHOWDOWN
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const EventCard = ({ event, index }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-orange-500/40 transition-all duration-500 flex flex-col h-full shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_20px_50px_rgba(255,90,0,0.15)]"
    >
      {/* Interactive Spotlight Effect */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 mix-blend-screen"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 120, 0, 0.15), transparent 40%)`
        }}
      />
      
      {/* Changed aspect ratio to better display posters completely, removed heavy dark overlays */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-black rounded-t-[2rem]">
        <Image 
           src={event.poster}
           alt={event.title}
           fill
           className={`object-contain object-top group-hover:scale-105 transition-all duration-700 ease-out`}
        />
        {/* Subtle gradient just to ensure the badge text is readable, no heavy black shadow */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent z-10" />
        
        {/* Floating Category Badge */}
        <div className="absolute top-5 right-5 z-20">
          <div className="relative">
             <div className="absolute inset-0 bg-black/50 blur-md rounded-full" />
             <span className={`relative flex items-center gap-1.5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full bg-gradient-to-r ${event.color} text-black shadow-[0_0_20px_rgba(255,90,0,0.4)]`}>
                <Sparkles className="w-3 h-3" />
                {event.category}
             </span>
          </div>
        </div>
      </div>

      <div className="relative p-6 sm:p-8 flex flex-col flex-grow z-20 bg-[#0a0a0a]">
         {/* Floating Icon Container */}
         <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${event.color} text-black shadow-[0_10px_30px_rgba(255,90,0,0.3)] transform group-hover:-translate-y-2 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
            {event.icon}
         </div>
         
         <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 tracking-tight drop-shadow-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-orange-300 transition-colors duration-300">
            {event.title}
         </h3>
         
         <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 flex-grow">
            {event.description}
         </p>
         
         <Link href={event.link} target="_blank" rel="noopener noreferrer" className="mt-auto block relative z-30">
            <button className={`relative w-full py-4 rounded-xl flex items-center justify-center gap-3 overflow-hidden bg-white/5 border border-white/10 group/btn transition-all duration-300 hover:border-transparent`}>
              <div className={`absolute inset-0 bg-gradient-to-r ${event.color} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`} />
              <span className="relative z-10 text-white group-hover/btn:text-black font-extrabold text-sm uppercase tracking-wider transition-colors duration-300">
                Register Now
              </span>
              <ArrowRight className="relative z-10 w-5 h-5 text-white group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all duration-300" />
            </button>
         </Link>
      </div>
    </motion.div>
  );
};

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  
  const filteredEvents = activeFilter === "All" 
    ? EVENTS_DATA 
    : EVENTS_DATA.filter(event => event.filterType === activeFilter);

  return (
    <main className="min-h-screen bg-black flex flex-col selection:bg-orange-500/30">
      <Navbar />
      
      {/* Cinematic Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[60vh]">
        {/* Hyped Infinite Marquee Background */}
        <Marquee />

        {/* Dynamic Glow Ambience */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <motion.div style={{ y: y1 }} className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-orange-600/15 rounded-full blur-[150px] mix-blend-screen" />
           <motion.div style={{ y: y1 }} className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-yellow-500/10 rounded-full blur-[150px] mix-blend-screen" />
           <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center max-w-5xl">
           <motion.div
             initial={{ opacity: 0, scale: 0.9, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
           >
             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-sm font-black tracking-widest uppercase mb-8 shadow-[0_0_30px_rgba(255,90,0,0.2)] backdrop-blur-md">
               <CalendarDays className="w-4 h-4" />
               7 events. One stage.
             </div>
             
             <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black text-white leading-[1.1] tracking-tighter mb-8 drop-shadow-2xl">
                Paradox 2026<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] via-[#ff5a00] to-[#ffe808] filter drop-shadow-[0_0_20px_rgba(255,90,0,0.5)]">
                   Sportify Events
                </span>
             </h1>
             
             <p className="text-gray-300 text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
                From high-intensity sports to strategy and energy-driven experiences.
             </p>
           </motion.div>
        </div>
      </section>

      {/* Interactive Filter & Grid Section */}
      <section className="relative pb-32 px-4 sm:px-6 lg:px-12 z-10 -mt-10">
         <div className="max-w-[1400px] mx-auto">
            
            {/* Filter Bar */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 lg:mb-16"
            >
               <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm">
                  <Filter className="w-5 h-5 text-orange-500" />
                  Filter Events
               </div>
               
               <div className="flex flex-wrap justify-center gap-3">
                  {CATEGORIES.map((cat) => (
                     <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                           activeFilter === cat 
                           ? 'bg-gradient-to-r from-orange-600 to-yellow-500 text-black shadow-[0_0_20px_rgba(255,90,0,0.4)] scale-105'
                           : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </motion.div>

            {/* Events Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
               <AnimatePresence mode="popLayout">
                  {filteredEvents.map((event, index) => (
                     <EventCard key={event.id} event={event} index={index} />
                  ))}
               </AnimatePresence>
            </motion.div>
            
            {/* Empty State */}
            {filteredEvents.length === 0 && (
               <div className="py-20 text-center">
                  <h3 className="text-2xl text-gray-400 font-bold">No events found for this category.</h3>
               </div>
            )}
            
         </div>
      </section>

      <Footer />
    </main>
  );
}
