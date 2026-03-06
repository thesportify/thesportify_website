'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { BarChart2, Camera, CheckCircle, MapPin, Trophy, Users, Calendar } from 'lucide-react';
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

const CHAPTERS = [
  { city: 'Delhi',     date: '21 Feb', sport: 'Cricket & Badminton', img: DelhiImg   },
  { city: 'Lucknow',  date: '18 Feb', sport: 'Cricket',             img: LucknowImg },
  { city: 'Mumbai',   date: '21 Feb', sport: 'Badminton',           img: MumbaiImg  },
  { city: 'Jaipur',   date: '22 Feb', sport: 'Cricket',             img: JaipurImg  },
  { city: 'Hyderabad',date: '22 Feb', sport: 'Badminton',           img: HydBadImg  },
  { city: 'Kolkata',  date: '22 Feb', sport: 'Cricket',             img: KolkataImg },
  { city: 'Chennai',  date: '22 Feb', sport: 'Badminton',           img: ChennaiImg },
  { city: 'Patna',    date: '22 Feb', sport: 'Badminton',           img: PatnaImg   },
];

export default function RashtriyaKhelMahotsav() {
  const [activeIdx, setActiveIdx] = useState(0);
  const featured = CHAPTERS[activeIdx];

  return (
    <section className="relative w-full bg-black py-16 md:py-24 overflow-hidden" id="rkm-2026">

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[560px] h-[560px] rounded-full bg-[#ff5a00]/6 blur-[150px]" />
        <div className="absolute -bottom-20 right-1/4 w-[420px] h-[300px] rounded-full bg-[#ffce00]/4 blur-[120px]" />
      </div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ff5a00]/35 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ff5a00]/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">

          {/* ── Left: Info Column ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="space-y-6"
          >
            {/* Logo + badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image src={rkmLogo} alt="RKM 2026" fill sizes="44px"
                  className="object-contain drop-shadow-[0_0_14px_rgba(255,140,0,0.5)]" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-[11px] font-bold tracking-wider uppercase">
                <CheckCircle className="w-3 h-3" />
                Event Completed &middot; Feb 2026
              </span>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-[2.25rem] font-extrabold text-white leading-tight">
                Sportify{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808]">
                  Rashtriya Khel Mahotsav
                </span>{' '}
                2026
              </h2>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                A Pan-India Sports Series by Sportify Society, IIT Madras BS
              </p>
              <p className="text-[#ffce00]/75 text-sm font-medium italic mt-1">
                &ldquo;One Nation. One Spirit. One Game.&rdquo;
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: <Calendar className="w-4 h-4 text-orange-400" />, label: 'Event Period', value: '18-22 Feb 2026'      },
                { icon: <MapPin   className="w-4 h-4 text-[#ff5a00]"  />, label: 'Coverage',     value: '8 Cities Pan-India'  },
                { icon: <Trophy   className="w-4 h-4 text-yellow-400" />, label: 'Prize Pool',    value: 'Rs. 9,600 Total'     },
                { icon: <Users    className="w-4 h-4 text-green-400"  />, label: 'Sports',        value: 'Cricket & Badminton' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2.5 px-3.5 py-3 bg-white/[0.04] border border-white/[0.07] rounded-xl">
                  <div className="p-1.5 bg-white/[0.06] rounded-lg flex-shrink-0">{s.icon}</div>
                  <div>
                    <p className="text-[10px] text-gray-500 leading-none mb-0.5">{s.label}</p>
                    <p className="text-xs font-semibold text-white leading-tight">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed">
              Sportify&apos;s largest ever inter-city sports tournament brought together IIT Madras BS
              students across 8 cities for a week of competitive cricket and badminton &mdash; knockout
              format, Rs. 9,600 prize pool, and winner &amp; participation certificates for all.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a href="https://rkm-2026-analytics-dashboard.vercel.app/" target="_blank" rel="noopener noreferrer">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5a00] to-[#ffce00] text-black font-bold text-sm shadow-[0_0_20px_rgba(255,90,0,0.25)] hover:shadow-[0_0_32px_rgba(255,90,0,0.45)] transition-shadow">
                  <BarChart2 className="w-4 h-4" />
                  View Event Report
                </motion.button>
              </a>
              <a href={PHOTOS_DRIVE_LINK} target="_blank" rel="noopener noreferrer">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.1] text-white font-semibold text-sm transition-colors">
                  <Camera className="w-4 h-4 text-[#ffce00]" />
                  Photos &amp; Videos
                </motion.button>
              </a>
            </div>
          </motion.div>

          {/* ── Right: Interactive Gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="flex flex-col gap-2.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                8 City Highlights
              </p>
              <span className="text-[10px] text-[#ff5a00] font-bold">Click to explore cities</span>
            </div>

            {/* Large featured image with crossfade */}
            <div className="relative w-full h-[320px] rounded-2xl overflow-hidden ring-1 ring-white/[0.08]">
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
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-white font-extrabold text-xl leading-tight">{featured.city} Chapter</p>
                      <p className="text-gray-300 text-xs mt-1">{featured.date} Feb 2026 &nbsp;&middot;&nbsp; {featured.sport}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#ff5a00]/90 text-white text-[9px] font-extrabold tracking-widest uppercase">
                      RKM 2026
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress pill indicators */}
              <div className="absolute top-3 right-3 flex gap-1 items-center">
                {CHAPTERS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIdx ? 'bg-[#ff5a00] w-5' : 'bg-white/30 w-1.5 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail filmstrip - all 8 cities */}
            <div className="grid grid-cols-8 gap-1.5">
              {CHAPTERS.map((ch, i) => (
                <button
                  key={ch.city}
                  onClick={() => setActiveIdx(i)}
                  className={`relative h-[60px] rounded-lg overflow-hidden group transition-all duration-200 focus:outline-none ${
                    i === activeIdx
                      ? 'ring-2 ring-[#ff5a00] ring-offset-1 ring-offset-black scale-[1.07]'
                      : 'opacity-50 hover:opacity-85 hover:scale-[1.05]'
                  }`}
                >
                  <Image
                    src={ch.img}
                    alt={ch.city}
                    fill
                    className="object-cover transition-transform duration-400 group-hover:scale-110"
                    sizes="8vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                  <p className="absolute bottom-1 left-0 right-0 text-center text-white font-bold text-[6.5px] leading-tight px-0.5">
                    {ch.city}
                  </p>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-0.5">
              <p className="text-[10px] text-gray-600">8 chapters &middot; 1 nation &middot; 1 spirit</p>
              <a
                href={PHOTOS_DRIVE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-[#ff5a00] font-semibold hover:underline"
              >
                All photos &rarr;
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}