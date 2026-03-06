'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { BarChart2, Camera, CheckCircle, MapPin, Trophy, Users, Calendar, Tag } from 'lucide-react';

import bg1        from '../assets/PasteveBG1.jpeg';
import rkmLogo    from '../assets/RKM2.png';
import LucknowImg from '../assets/RKM - Lucknow Chapter.jpg';
import ChennaiImg from '../assets/RKM26 - Chennai Chapter.jpg';
import DelhiImg   from '../assets/RKM26 - Delhi Chapter.jpg';
import HydBadImg  from '../assets/RKM26 - Hyderabad Chapter.jpg';
import KolkataImg from '../assets/RKM26 - Kolkata Chapter.jpg';
import MumbaiImg  from '../assets/RKM26 - Mumbai Chapter.jpg';
import JaipurImg  from '../assets/RKM26 - Jaipur Chapter.jpg';
import PatnaImg   from '../assets/RKM26 -Patna Chapter.jpg';

const PHOTOS_DRIVE_LINK = 'https://drive.google.com/drive/folders/1Jaz9kdMbLGtucr7fznjE6Hq92FhPlhcW?usp=drive_link';

const ALL_PHOTOS = [
  { city: 'Delhi',    img: DelhiImg   },
  { city: 'Lucknow', img: LucknowImg },
  { city: 'Mumbai',  img: MumbaiImg  },
  { city: 'Jaipur',  img: JaipurImg  },
  { city: 'Hyderabad', img: HydBadImg },
  { city: 'Kolkata', img: KolkataImg },
  { city: 'Chennai', img: ChennaiImg },
  { city: 'Patna',   img: PatnaImg   },
];

const tags = ['Pan-India', 'Cricket', 'Badminton', 'Tournament', 'IIT Madras BS', '8 Cities'];

export default function RkmEventHighlight() {
  const [activeIdx, setActiveIdx] = useState(0);
  const featured = ALL_PHOTOS[activeIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative my-16 px-6 sm:px-12 py-16 rounded-2xl overflow-hidden"
      style={{
        backgroundImage: `url(${bg1.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/72 rounded-2xl" />

      {/* Orbital decorative rings */}
      <div className="absolute -z-10 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full border border-gray-700/30 -left-32 top-1/4" />
        <div className="absolute w-40 h-40 rounded-full border border-gray-700/20 -right-20 bottom-1/4" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">

        {/* ── Left: Interactive Gallery ── */}
        <div className="w-full lg:w-2/5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">8 City Chapters</p>
            <span className="text-[9px] text-[#ff5a00] font-bold">Click to explore</span>
          </div>

          {/* Large featured image */}
          <div className="relative w-full flex-1 min-h-[180px] rounded-xl overflow-hidden ring-1 ring-white/[0.08]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={featured.img}
                  alt={featured.city + ' - RKM 2026'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                {/* Featured badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 bg-[#ff5a00] rounded-md">
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[8px] font-extrabold tracking-widest uppercase">Featured</span>
                </div>
                {/* City counter */}
                <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded bg-black/60">
                  <span className="text-white text-[8px] font-bold">{activeIdx + 1}/8</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-bold text-sm leading-tight">{featured.city} Chapter</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="absolute bottom-2.5 right-3 flex gap-1 items-center">
              {ALL_PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIdx ? 'bg-[#ff5a00] w-3' : 'bg-white/30 w-1 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail grid 4x2 */}
          <div className="grid grid-cols-4 gap-1.5">
            {ALL_PHOTOS.map((p, i) => (
              <button
                key={p.city}
                onClick={() => setActiveIdx(i)}
                className={`relative h-[58px] rounded-lg overflow-hidden group transition-all duration-200 focus:outline-none ${
                  i === activeIdx
                    ? 'ring-2 ring-[#ff5a00] ring-offset-1 ring-offset-black/80 scale-[1.06]'
                    : 'opacity-50 hover:opacity-85 hover:scale-[1.04]'
                }`}
              >
                <Image
                  src={p.img}
                  alt={p.city}
                  fill
                  className="object-cover transition-transform duration-400 group-hover:scale-110"
                  sizes="10vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                <p className="absolute bottom-1 left-0 right-0 text-center text-white font-bold text-[7px] leading-tight px-0.5">{p.city}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: Event Details ── */}
        <div className="w-full lg:w-3/5 space-y-4 relative p-6 group backdrop-blur-sm bg-gray-900/20 rounded-xl border border-gray-800/50">

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none">
            <div className="absolute top-0 left-0 w-1 h-12 bg-gradient-to-b from-[#ff5a00] to-transparent transition-all duration-300 group-hover:h-32" />
            <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-[#ff5a00] to-transparent transition-all duration-300 group-hover:w-32" />
          </div>
          <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none">
            <div className="absolute bottom-0 right-0 w-1 h-12 bg-gradient-to-t from-[#ffe808] to-transparent transition-all duration-300 group-hover:h-32" />
            <div className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-l from-[#ffe808] to-transparent transition-all duration-300 group-hover:w-32" />
          </div>

          {/* Category badge + logo */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[#ff5a00] to-[#ffe808] text-black">
              Pan-India Tournament
            </span>
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image src={rkmLogo} alt="RKM Logo" fill sizes="40px"
                className="object-contain drop-shadow-[0_0_10px_rgba(255,140,0,0.4)]" />
            </div>
          </div>

          {/* Completed badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] font-bold tracking-wider uppercase">
            <CheckCircle className="w-3 h-3" />
            Event Completed - Feb 2026
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300">
            Sportify Rashtriya Khel Mahotsav 2026
          </h2>

          {/* Date & location */}
          <div className="flex flex-wrap gap-4 text-gray-300">
            <div className="flex items-center gap-2 hover:text-white transition-colors group/item">
              <span className="p-1 rounded-full bg-gray-800/50 group-hover/item:bg-[#ff5a00]/20">
                <Calendar className="w-4 h-4 text-[#ff5a00]" />
              </span>
              <span>18-22 Feb 2026</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors group/item">
              <span className="p-1 rounded-full bg-gray-800/50 group-hover/item:bg-[#ff5a00]/20">
                <MapPin className="w-4 h-4 text-[#ff5a00]" />
              </span>
              <span>8 Cities Across India</span>
            </div>
          </div>

          {/* Description */}
          <div className="relative overflow-hidden rounded-lg p-4 bg-gray-800/30">
            <p className="text-gray-300 leading-relaxed text-sm">
              India&apos;s first Pan-India multi-city sports series by Sportify Society, IIT Madras BS.
              Uniting cricket and badminton players across 8 cities with knockout tournaments,
              live coverage, and a total prize pool of Rs. 9,600 &mdash; RKM 2026 redefined student-led sports.
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <MapPin className="w-4 h-4 text-[#ff5a00]" />,  label: '8 Cities',  sub: 'Pan-India'           },
              { icon: <Trophy className="w-4 h-4 text-yellow-400" />, label: 'Rs. 9,600', sub: 'Prize Pool'           },
              { icon: <Users  className="w-4 h-4 text-green-400"  />, label: '2 Sports',  sub: 'Cricket & Badminton' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 p-3 bg-gray-800/40 rounded-xl border border-gray-700/40 text-center">
                {stat.icon}
                <p className="text-white font-bold text-sm">{stat.label}</p>
                <p className="text-gray-400 text-[10px]">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i}
                className="inline-flex items-center px-3 py-1 text-xs rounded-full bg-gray-800/70 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors backdrop-blur-sm">
                <Tag className="w-3 h-3 mr-1 text-[#ff5a00]" />
                {tag}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 pt-1">
            <a href="https://rkm-2026-analytics-dashboard.vercel.app/" target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#ff5a00] to-[#ffce00] text-black font-bold rounded-full text-sm shadow-md hover:shadow-[0_0_20px_rgba(255,90,0,0.45)] transition-all">
                <BarChart2 className="w-4 h-4" />
                View Event Report
              </motion.button>
            </a>
            <a href={PHOTOS_DRIVE_LINK} target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-full text-sm transition-all">
                <Camera className="w-4 h-4 text-[#ffce00]" />
                Photos &amp; Videos
              </motion.button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}