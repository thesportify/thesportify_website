'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Music } from 'lucide-react';
import { MdSportsCricket } from "react-icons/md";
import { GiShuttlecock } from "react-icons/gi";
import { FaRunning, FaVolleyballBall, FaLaptopCode, FaFutbol } from "react-icons/fa";
import paradoxBG from "../assets/stadium_orange_bg.png";

const EVENTS = [
  {
    id: 1,
    title: 'Paradox Badminton League',
    category: 'One Court. One Battle. One Champion.',
    description: 'The Paradox Badminton League is a high-intensity inter-house badminton tournament where precision meets pressure. With short-format matches, every rally matters and every shot has consequences. Players rely on footwork, control, and quick thinking to stay ahead. There’s no time to recover here - only to adapt, respond, and execute.',
    icon: <GiShuttlecock />,
    image: '/events/badminton.png',
    color: 'from-[#ff9a00] to-[#ffce00]',
    link: 'https://www.iitmparadox.org/events/sports/87', 
  },
  {
    id: 2,
    title: 'Paradox Champions League',
    category: 'Dribble. Dash. Dominate.',
    description: 'The Paradox Champions League brings fast-paced, structured football where teamwork defines the game. With 7-a-side gameplay, quick transitions, sharp passing, and disciplined defending are essential. Every moment creates an opportunity, and every mistake can change the outcome. Teams that stay organized, focused, and clinical will take control.',
    icon: <FaFutbol />,
    image: '/events/football.png',
    color: 'from-orange-500 to-[#ff9a00]',
    link: 'https://www.iitmparadox.org/events/sports/78',
  },
  {
    id: 3,
    title: 'VolleyVibes',
    category: 'Spike the Rivalry',
    description: 'VolleyVibes is an inter-house Volleyball tournament built on rhythm, communication, and control. Every rally demands sharp reflexes, quick decisions, and seamless teamwork - from precise sets to powerful finishes. Momentum can shift in seconds, and consistency becomes your biggest strength. Stay sharp. Stay ready. Stay in the game.',
    icon: <FaVolleyballBall />,
    image: '/events/volleyball.png',
    color: 'from-yellow-400 to-[#ffe808]',
    link: 'https://www.iitmparadox.org/events/sports/83',
  },
  {
    id: 4,
    title: 'Kampus Run',
    category: 'Miles With Purpose.',
    description: 'Kampus Run is more than a race - it’s a step towards better mental and physical well-being. With a 3 KM fun run and a 5 KM competitive run, participants can choose their pace and purpose. It’s about taking a break from routine, finding your rhythm, and finishing with a sense of clarity. Whether you compete or just run, every step counts. Run for your mind. Run for yourself.',
    icon: <FaRunning />,
    image: '/events/run.png',
    color: 'from-amber-400 to-yellow-400',
    link: 'https://www.iitmparadox.org/events/sports/75',
  },
  {
    id: 5,
    title: 'IPL Auction Showdown',
    category: 'Bid. Strategize. Conquer.',
    description: 'The IPL Auction Showdown places you in the role of a team owner, where building the right squad is the real challenge. With a fixed budget and competitive bidding, every decision shapes your team’s strength. Balancing risk, timing your bids, and adapting to the room are what set the best apart. It’s not about luck - it’s about thinking ahead.',
    icon: <MdSportsCricket />,
    image: '/events/cricket.png',
    color: 'from-[#ff5a00] to-[#ff9a00]',
    link: 'https://www.iitmparadox.org/events/sports/76', 
  },
  {
    id: 6,
    title: 'The Burn Club (Zumba Workshop)',
    category: 'Zumba. Sweat. Repeat.',
    description: 'The Burn Club is a high-energy Zumba session designed to help you reset and recharge. With music, movement, and an open atmosphere, it’s about letting go of stress and enjoying the moment. No pressure, no judgment - just movement, energy, and a better state of mind when you walk out.',
    icon: <Music />,
    image: '/events/zumba.png',
    color: 'from-[#ffce00] to-[#ffe808]',
    link: 'https://www.iitmparadox.org/events/sports/79',
  },
  {
    id: 7,
    title: 'ECHO//PROMETHEUS',
    category: 'Twelve sleuths. Four Destinations. One answer.',
    description: 'ECHO // PROMETHEUS is a multi-stage technical investigation where teams move through challenges in cryptography, coding, cybersecurity, and live deduction. Each act builds on the last, pushing you to analyse, adapt, and connect the pieces under pressure. It’s not just about solving problems - it’s about solving the entire story.',
    icon: <FaLaptopCode />,
    image: '/events/tech.png',
    color: 'from-orange-400 to-yellow-400',
    link: 'https://www.iitmparadox.org/events/technicals/60',
  },
];

export default function SportifyInParadox() {
  const [activeEventId, setActiveEventId] = useState(1);
  const activeEvent = EVENTS.find(e => e.id === activeEventId);

  return (
    <section 
      className="relative w-full py-16 md:py-24 overflow-hidden bg-cover bg-center border-b border-gray-900/50" 
      id="sportify-in-paradox"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.88)), url(${paradoxBG.src})`,
      }}
    >
      
      {/* Preload all images invisibly to eliminate flickering and delays on click */}
      <div className="absolute w-0 h-0 overflow-hidden opacity-0 pointer-events-none -z-50">
        {EVENTS.map((event) => (
          <img key={`preload-${event.id}`} src={event.image} alt="" />
        ))}
      </div>

      {/* Dynamic Background Glow based on active event */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-0">
        <AnimatePresence mode="wait">
          <motion.div 
             key={activeEvent.id}
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 0.15, scale: 1 }}
             exit={{ opacity: 0, scale: 1.1 }}
             transition={{ duration: 0.8 }}
             className={`w-[600px] h-[600px] rounded-full blur-[150px] bg-gradient-to-r ${activeEvent.color}`}
          />
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-semibold tracking-wider mb-4 uppercase">
              7 events. One stage.
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Paradox 2026 |{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] via-[#ff5a00] to-[#ffe808]">
                Sportify Events
              </span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              From high-intensity sports to strategy and energy-driven experiences.
            </p>
          </motion.div>
        </div>

        {/* Centered Hub Layout */}
        <div className="flex flex-col w-full max-w-6xl mx-auto">
          
          {/* Top: Interactive Navigation Pills */}
          <div className="relative w-full mb-8 lg:mb-12">
            
            {/* Mobile Scroll Indicator */}
            <div className="flex lg:hidden justify-between items-center mb-3 px-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Select Event
              </span>
              <motion.span 
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#ff5a00] uppercase tracking-widest"
              >
                Swipe <ArrowRight className="w-3 h-3" />
              </motion.span>
            </div>

            {/* Right Edge Fade for Mobile to indicate overflow */}
            <div className="absolute right-0 top-8 bottom-4 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none lg:hidden z-10" />

            <div className="flex overflow-x-auto lg:flex-wrap lg:justify-center gap-3 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
               {EVENTS.map((event) => {
               const isActive = activeEventId === event.id;
               return (
                  <button
                    key={event.id}
                    onClick={() => setActiveEventId(event.id)}
                    className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 lg:px-6 lg:py-4 rounded-2xl min-w-[200px] w-max text-left transition-all duration-300 snap-center border ${
                      isActive 
                      ? `bg-gradient-to-r ${event.color} border-transparent scale-100 shadow-[0_0_30px_rgba(255,90,0,0.3)]` 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-400 scale-95 hover:scale-100'
                    }`}
                  >
                    <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-black text-white' : 'bg-white/10 text-gray-400'}`}>
                      {React.cloneElement(event.icon, { className: "w-5 h-5" })}
                    </div>
                    <span className={`font-extrabold text-[14px] lg:text-base whitespace-nowrap leading-tight ${isActive ? 'text-black' : 'text-gray-300'}`}>
                      {event.title}
                    </span>
                  </button>
               );
             })}
          </div>
        </div>

          {/* Bottom: Active Event Cinematic Showcase */}
          <div className="w-full max-w-5xl mx-auto flex items-stretch">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.95 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  className={`w-full relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 sm:p-8 lg:p-16 flex flex-col justify-center min-h-[400px] lg:min-h-[550px] group`}
                >
                   
                   {/* DYNAMIC CINEMATIC BACKGROUND (WOW FACTOR) */}
                   <div className="absolute inset-0 bg-black z-0" />
                   
                   {/* Blurred background to perfectly fill the box on mobile */}
                   <motion.img 
                      src={activeEvent.image}
                      alt="background blur"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover opacity-30 blur-2xl z-0 lg:hidden"
                   />
                   
                   {/* Main image: uncropped on mobile (contain), perfectly filled on laptop (cover) */}
                   <motion.img 
                      src={activeEvent.image}
                      alt={activeEvent.title}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                      className={`absolute inset-0 w-full h-full object-contain lg:object-cover ${activeEvent.id === 4 ? 'lg:object-top' : 'lg:object-center'} opacity-70 mix-blend-screen z-0`}
                   />

                   {/* Solid gradient overlay for text readability and branding */}
                   <div className={`absolute inset-0 bg-gradient-to-br ${activeEvent.color} opacity-[0.85] mix-blend-color z-0`} />
                   <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0`} />
                   
                   <div className="relative z-10 flex flex-col gap-4 lg:gap-6 items-start mt-auto md:mt-0 w-full">
                     <span className={`inline-block px-3 py-1 lg:px-4 lg:py-1.5 text-[10px] lg:text-sm font-black uppercase tracking-widest rounded-md bg-gradient-to-r ${activeEvent.color} text-black shadow-lg`}>
                        {activeEvent.category}
                     </span>
                     
                     <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter max-w-3xl drop-shadow-2xl">
                        {activeEvent.title}
                     </h3>
                     
                     <p className="text-gray-200 font-bold text-sm sm:text-base lg:text-xl leading-relaxed max-w-2xl mb-2 lg:mb-6 drop-shadow-md">
                        {activeEvent.description}
                     </p>
                     
                     <a href={activeEvent.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto mt-2">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex justify-center items-center gap-2 lg:gap-3 w-full sm:w-auto px-6 py-4 lg:px-8 lg:py-5 rounded-xl lg:rounded-2xl bg-gradient-to-r ${activeEvent.color} text-black font-black text-sm lg:text-lg shadow-[0_0_30px_rgba(255,90,0,0.4)] hover:shadow-[0_0_40px_rgba(255,90,0,0.8)] transition-all group-hover:scale-105`}
                        >
                           Register Now
                           <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                     </a>
                   </div>
                </motion.div>
              </AnimatePresence>
           </div>
           
           {/* View All Events Button */}
           <div className="flex justify-center items-center mt-12 md:mt-16 w-full">
             <Link href="/events">
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-orange-500/50 hover:border-orange-400 transition-colors"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-yellow-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                 <span className="relative z-10 flex items-center gap-3 text-white font-bold text-lg tracking-wide uppercase">
                   View All Events
                   <ArrowRight className="w-5 h-5 text-orange-400 group-hover:text-yellow-400 transition-colors group-hover:translate-x-1" />
                 </span>
               </motion.button>
             </Link>
           </div>

        </div>
      </div>
    </section>
  );
}
