"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Import lucide icons
import { Flame, Play, Pause, Camera, X, Volume2, VolumeX, Eye, Trophy, Award, Sparkles, Tv, HardDrive } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import images for highlights
import DelhiBadminton1 from "@/assets/Meetups/DelhiBadminton1.jpg";
import DelhiBadminton2 from "@/assets/Meetups/DelhiBadminton2.png";
import DelhiBadminton3 from "@/assets/Meetups/DelhiBadminton3.jpg";
import DelhiHockey1 from "@/assets/Meetups/DelhiHockey1.jpg";
import DelhiHockey2 from "@/assets/Meetups/DelhiHockey2.jpg";
import KanpurCricket1 from "@/assets/Meetups/KanpurCricket1.png";
import KanpurCricket2 from "@/assets/Meetups/KanpurCricket2.png";
import LucknowCricket1 from "@/assets/Meetups/LucknowCricket1.jpg";
import LucknowCricket2 from "@/assets/Meetups/LucknowCricket2.jpg";
import TeamCelebration from "@/assets/athlete_mixed_team.png";
import ChennaiFootball from "@/assets/RKM26 - Chennai Chapter.jpg";
import LucknowTrophy from "@/assets/RKM - Lucknow Chapter.jpg";
import JaipurMeetup from "@/assets/RKM26 - Jaipur Chapter.jpg";

// Paradox Sub-sections Metadata
const PARADOX_SUBSECTIONS = [
  {
    id: "closing-ceremony",
    chapter: "01",
    name: "Closing Ceremony",
    timecode: "21:30:00",
    desc: "Emotional final moments, group cheers, and the heavy trophy lifts under stadium floodlights.",
    photos: [TeamCelebration, LucknowTrophy, JaipurMeetup, DelhiBadminton2]
  },
  {
    id: "certificate-distribution",
    chapter: "02",
    name: "Team Certificate Distribution",
    timecode: "19:45:00",
    desc: "Honoring our technical leads, web operations team, and active coordinators on stage.",
    photos: [LucknowTrophy, ChennaiFootball, TeamCelebration, KanpurCricket1]
  },
  {
    id: "badminton",
    chapter: "03",
    name: "Paradox Badminton League",
    timecode: "11:00:00",
    desc: "Lightning singles court playoff showdowns and precision racquet drops.",
    photos: ["/events/badminton.jpg", DelhiBadminton1, DelhiBadminton2, DelhiBadminton3, JaipurMeetup]
  },
  {
    id: "football",
    chapter: "04",
    name: "Paradox Champions League",
    timecode: "17:00:00",
    desc: "High-octane goals, defensive sweeps, and penalty shootouts that defined the festival.",
    photos: ["/events/football.jpg", ChennaiFootball, KanpurCricket1, LucknowCricket2]
  },
  {
    id: "volleyball",
    chapter: "05",
    name: "VolleyVibes",
    timecode: "15:30:00",
    desc: "Spikes, massive defensive blocks, and high energy from the roaring court stands.",
    photos: ["/events/volleyball.jpg", DelhiBadminton2, LucknowCricket1, JaipurMeetup]
  },
  {
    id: "kampus-run",
    chapter: "06",
    name: "Kampus Run",
    timecode: "06:15:00",
    desc: "The early morning 5K marathon challenge across the scenic IIT Madras campus lines.",
    photos: ["/events/run.jpg", JaipurMeetup, DelhiHockey2, DelhiBadminton1]
  },
  {
    id: "ipl-auction",
    chapter: "07",
    name: "IPL Auction Showdown",
    timecode: "14:00:00",
    desc: "Strategic bidding wars, team budgeting calculations, and record-breaking player acquisitions.",
    photos: ["/events/cricket.jpg", KanpurCricket2, LucknowCricket2, TeamCelebration]
  },
  {
    id: "zumba",
    chapter: "08",
    name: "The Burn Club (Zumba Workshop)",
    timecode: "08:30:00",
    desc: "High-energy beats, group fitness routines, and athletic training workshops.",
    photos: ["/events/zumba.jpg", TeamCelebration, JaipurMeetup, DelhiBadminton2]
  },
  {
    id: "echo-prometheus",
    chapter: "09",
    name: "ECHO//PROMETHEUS",
    timecode: "16:00:00",
    desc: "Esports arena battles, screen clutches, and strategic gameplay showdowns.",
    photos: ["/events/tech.jpg", LucknowTrophy, KanpurCricket1, LucknowCricket2]
  }
];

// Community Wall Masonry Content
const COMMUNITY_WALL_ITEMS = [
  {
    type: "chapter",
    title: "National RKM Championships",
    count: "200+ Players",
    date: "22 Feb 2026",
    location: "Chennai Chapter"
  },
  {
    type: "quote",
    text: "We came for sports. We stayed for people.",
    author: "Sportify Diaries"
  },
  {
    type: "chapter",
    title: "Lucknow Cricket Chapter",
    count: "80 Players",
    date: "18 Feb 2026",
    location: "Lucknow Chapter"
  },
  {
    type: "image",
    image: ChennaiFootball,
    caption: "Late night playoffs finals under floodlights"
  },
  {
    type: "chapter",
    title: "Delhi Badminton Meetup",
    count: "14 Players",
    date: "15 Nov 2025",
    location: "Delhi Chapter"
  },
  {
    type: "quote",
    text: "Every city became home.",
    author: "Sportify Diaries"
  },
  {
    type: "chapter",
    title: "Chennai RKM Football Open",
    count: "110 Players",
    date: "22 Feb 2026",
    location: "Chennai Chapter"
  },
  {
    type: "image",
    image: LucknowTrophy,
    caption: "Championship victory and team celebrations"
  },
  {
    type: "chapter",
    title: "Kanpur Turf Cricket",
    count: "22 Players",
    date: "16 Nov 2025",
    location: "Kanpur Chapter"
  },
  {
    type: "chapter",
    title: "Delhi Badminton Championship",
    count: "18 Players",
    date: "15 Nov 2025",
    location: "Delhi Chapter"
  },
  {
    type: "quote",
    text: "Some trophies faded. Friendships didn't.",
    author: "Sportify Diaries"
  },
  {
    type: "chapter",
    title: "Lucknow Regional Cup",
    count: "60 Players",
    date: "18 Feb 2026",
    location: "Lucknow Chapter"
  },
  {
    type: "image",
    image: JaipurMeetup,
    caption: "Jaipur regional meetup cohort gathering"
  },
  {
    type: "chapter",
    title: "Jaipur Turf Meetup",
    count: "40 Players",
    date: "24 Nov 2025",
    location: "Jaipur Chapter"
  },
  {
    type: "chapter",
    title: "Delhi National Hockey Cheer",
    count: "50 Supporters",
    date: "23 Oct 2024",
    location: "Delhi Chapter"
  }
];

// Broadcast Deck Multi-cam Videos
const CAM_FEEDS = [
  {
    id: "cam-1",
    name: "CAM_01 // THE OPENING CEREMONY",
    desc: "Torch run and flags parade kick-starting the festival.",
    videoSrc: "/RKM.mp4",
    badge: "MAIN FEED"
  },
  {
    id: "cam-2",
    name: "CAM_02 // CLASH OF RIVALS",
    desc: "Behind-the-scenes high stakes match points and huddles.",
    videoSrc: "/RKM.mp4",
    badge: "B-ROLL FEED"
  },
  {
    id: "cam-3",
    name: "CAM_03 // PODIUM VICTORY",
    desc: "Closing ceremonies, trophy lift, and final celebrations.",
    videoSrc: "/RKM.mp4",
    badge: "AUDIENCE CORNER"
  }
];

// Creative Video Reels Data (Concluding general reels at the bottom)
const REELS_DATA = [
  {
    id: "rkm-highlights",
    title: "RKM Championship Highlights",
    badge: "Live Reel",
    year: "2026",
    videoSrc: "/RKM.mp4",
    poster: ChennaiFootball
  },
  {
    id: "mumbai-playoff",
    title: "Mumbai Regional Playoff",
    badge: "Event Recap",
    year: "2026",
    videoSrc: "/RKM.mp4",
    poster: JaipurMeetup
  },
  {
    id: "paradox-aftermovie-reel",
    title: "Paradox '26 Cinematic Recap",
    badge: "Cinematic Cut",
    year: "2026",
    videoSrc: "/RKM.mp4",
    poster: TeamCelebration
  }
];

// Stats Configuration
const STATS = [
  { value: "4 Days", label: "DURATION" },
  { value: "12 Houses", label: "COMPETITION" },
  { value: "1,000+", label: "PARTICIPANTS" },
  { value: "20+", label: "EVENTS" },
  { value: "8+", label: "CITIES REPRESENTED" }
];

export default function HighlightsPage() {
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null);
  const [selectedSubId, setSelectedSubId] = useState("closing-ceremony");
  const [activePlayer, setActivePlayer] = useState(null); // 'aftermovie', 'broadcast', or 'reel-id'

  // Aftermovie Video Controls
  const aftermovieVideoRef = useRef(null);
  const [isAftermoviePlaying, setIsAftermoviePlaying] = useState(false);
  const [aftermovieActiveChapter, setAftermovieActiveChapter] = useState(0);

  const aftermovieChapters = [
    { name: "OPENING CEREMONY", time: 0, label: "00:00" },
    { name: "TOURNAMENTS START", time: 5, label: "00:05" },
    { name: "RIVALRY CLASHES", time: 12, label: "00:12" },
    { name: "CHAPTER MEETUPS", time: 20, label: "00:20" },
    { name: "CHAMPIONSHIP LIFT", time: 28, label: "00:28" }
  ];

  // Broadcast Control Room Video Controls
  const [selectedCam, setSelectedCam] = useState(CAM_FEEDS[0]);
  const monitorVideoRef = useRef(null);
  const [isMonitorPlaying, setIsMonitorPlaying] = useState(false);
  const [isMonitorMuted, setIsMonitorMuted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [timecode, setTimecode] = useState("00:42:15:00");

  // Coordinate multiple video players to ensure only one plays at a time
  useEffect(() => {
    if (!activePlayer) return;
    
    if (activePlayer === "aftermovie") {
      if (monitorVideoRef.current) {
        monitorVideoRef.current.pause();
        setIsMonitorPlaying(false);
      }
    } else if (activePlayer === "broadcast") {
      if (aftermovieVideoRef.current) {
        aftermovieVideoRef.current.pause();
        setIsAftermoviePlaying(false);
      }
    } else if (activePlayer.startsWith("reel-")) {
      if (aftermovieVideoRef.current) {
        aftermovieVideoRef.current.pause();
        setIsAftermoviePlaying(false);
      }
      if (monitorVideoRef.current) {
        monitorVideoRef.current.pause();
        setIsMonitorPlaying(false);
      }
    }
  }, [activePlayer]);

  // Simulate Broadcast Timecode Counter
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % 30;
      const pad = (n) => String(n).padStart(2, '0');
      const now = new Date();
      const h = pad(now.getHours() % 12);
      const m = pad(now.getMinutes());
      const s = pad(now.getSeconds());
      const f = pad(frame);
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 33); // ~30 fps
    return () => clearInterval(interval);
  }, []);

  const handleSeekAftermovie = (time) => {
    if (aftermovieVideoRef.current) {
      aftermovieVideoRef.current.currentTime = time;
      setActivePlayer("aftermovie");
      aftermovieVideoRef.current.play().catch((err) => console.log("Autoplay failed:", err));
      setIsAftermoviePlaying(true);
    }
  };

  const handleAftermovieTimeUpdate = () => {
    if (!aftermovieVideoRef.current) return;
    const currTime = aftermovieVideoRef.current.currentTime;
    let activeIdx = 0;
    for (let i = aftermovieChapters.length - 1; i >= 0; i--) {
      if (currTime >= aftermovieChapters[i].time) {
        activeIdx = i;
        break;
      }
    }
    setAftermovieActiveChapter(activeIdx);
  };

  const toggleAftermoviePlay = () => {
    if (!aftermovieVideoRef.current) return;
    if (isAftermoviePlaying) {
      aftermovieVideoRef.current.pause();
      setIsAftermoviePlaying(false);
      if (activePlayer === "aftermovie") {
        setActivePlayer(null);
      }
    } else {
      setActivePlayer("aftermovie");
      aftermovieVideoRef.current.play().catch((err) => console.log(err));
      setIsAftermoviePlaying(true);
    }
  };

  const handleCamSwitch = (cam) => {
    if (cam.id === selectedCam.id) return;
    setGlitchActive(true);
    setIsMonitorPlaying(false);
    setSelectedCam(cam);
    setTimeout(() => {
      setGlitchActive(false);
      if (monitorVideoRef.current) {
        monitorVideoRef.current.load();
        setActivePlayer("broadcast");
        monitorVideoRef.current.play().catch((err) => console.log("Autoplay failed:", err));
        setIsMonitorPlaying(true);
      }
    }, 250);
  };

  const toggleMonitorPlay = () => {
    if (!monitorVideoRef.current) return;
    if (isMonitorPlaying) {
      monitorVideoRef.current.pause();
      setIsMonitorPlaying(false);
      if (activePlayer === "broadcast") {
        setActivePlayer(null);
      }
    } else {
      setActivePlayer("broadcast");
      monitorVideoRef.current.play().catch((err) => console.log(err));
      setIsMonitorPlaying(true);
    }
  };

  const selectedSubsection = PARADOX_SUBSECTIONS.find(sub => sub.id === selectedSubId);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#FF7A00]/30 selection:text-white overflow-x-hidden relative">
      <Navbar />

      {/* Global CSS Style Injection for Marquees and 3D Skew Animations */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-custom {
          animation: marquee 30s linear infinite;
        }



        /* Glitch animation for camera feeds switching */
        @keyframes glitch-flash {
          0% { opacity: 0.9; }
          10% { transform: translate(-2px, 1px) skewX(2deg); opacity: 0.7; }
          30% { transform: translate(1px, -2px) skewX(-1deg); }
          50% { transform: translate(-1px, 2px) skewX(1deg); opacity: 0.8; }
          70% { transform: translate(2px, -1px); }
          90% { transform: translate(-2px, 1px); }
          100% { opacity: 1; }
        }
        .glitch-effect {
          animation: glitch-flash 0.25s linear infinite;
        }
      `}</style>

      {/* Live Sports Commentary Marquee Header Banner */}
      <div className="w-full bg-[#FF7A00] py-2.5 overflow-hidden border-b border-[#FF7A00]/25 select-none relative z-[999] mt-[72px] md:mt-[76px]">
        <div className="flex whitespace-nowrap animate-marquee-custom uppercase tracking-widest text-[10px] font-black text-black gap-12">
          <span>★ LIVE FROM SPORTS FIELD: DELHI CHAPTER CHAMPIONS CLAMP VICTORY! ★</span>
          <span>★ CHENNAI SOAR HIGH IN FOOTBALL FINALS ★</span>
          <span>★ RE-LIVE THE MAJESTIC TROPHY LIFTS ★</span>
          <span>★ PLAYBOOKS UPDATE: OVER 2,000 MEMORIES ARCHIVED ★</span>
          <span>★ SHADOW PLAYOFFS IN MUMBAI AND JAIPUR MEETUPS COMPLETED ★</span>
          <span>★ LIVE FROM SPORTS FIELD: DELHI CHAPTER CHAMPIONS CLAMP VICTORY! ★</span>
          <span>★ CHENNAI SOAR HIGH IN FOOTBALL FINALS ★</span>
          <span>★ RE-LIVE THE MAJESTIC TROPHY LIFTS ★</span>
          <span>★ PLAYBOOKS UPDATE: OVER 2,000 MEMORIES ARCHIVED ★</span>
          <span>★ SHADOW PLAYOFFS IN MUMBAI AND JAIPUR MEETUPS COMPLETED ★</span>
        </div>
      </div>

      {/* 1. Commentary Style Hero Header */}
      <section className="relative w-full py-16 md:py-24 flex flex-col items-center justify-center overflow-hidden bg-black">
        {/* Soft Background Spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF7A00]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-20 container mx-auto px-6 text-center max-w-4xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#FF7A00]/10 border border-[#FF7A00]/20 rounded-full mb-6 shadow-[0_0_15px_rgba(255,122,0,0.1)]"
          >
            <Flame className="h-4 w-4 text-[#FF7A00] animate-pulse" />
            <span className="text-[10px] uppercase font-mono font-black tracking-widest text-[#FFC107]">
              OFFICIAL BROADCAST // LIVE COMM
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white font-sans">
              &ldquo;AND THE CROWD <br className="hidden sm:inline" />
              <span className="text-[#FF7A00] text-transparent bg-clip-text bg-gradient-to-r from-[#FF523A] to-[#FFC107]">GOES WILD!</span>&rdquo;
            </h1>
            <p className="text-base sm:text-xl font-bold text-gray-400 uppercase tracking-widest pt-4">
              Highlights of the Heroes • Cinematic Archive
            </p>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent mx-auto mt-4" />
            <p className="text-gray-300 font-serif italic text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
              &ldquo;Reliving the split-second clutches, the deafening roars, and the legendary podium finishes that forged our student-led sports legacy.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Paradox '26 Aftermovie Section */}
      <section className="py-20 bg-[#080808] border-t border-white/5 relative z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Metadata & Descriptions */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#FF7A00] font-mono">
                OFFICIAL HIGHLIGHTS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
                PARADOX '26 <br />
                <span className="text-[#FFC107]">AFTERMOVIE</span>
              </h2>
              <div className="w-16 h-[2px] bg-[#FF7A00]" />
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                4 days. Thousands of memories. One unforgettable festival. Click the timestamps below the screen to explore specific chapters in this highlight documentary.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={toggleAftermoviePlay}
                  className="px-6 py-3.5 bg-[#121212] border border-white/10 hover:border-[#FF7A00]/50 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2.5 outline-none shadow-lg"
                >
                  <Play className="h-4 w-4 fill-white text-white" />
                  Watch Full Film
                </button>
              </div>
            </div>

            {/* Right Column: Custom Interactive Video Player */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
                <video
                  ref={aftermovieVideoRef}
                  src="/RKM.mp4"
                  className="w-full h-full object-cover"
                  onTimeUpdate={handleAftermovieTimeUpdate}
                  onClick={toggleAftermoviePlay}
                  playsInline
                />
                
                {/* Big Circular Orange Play Button Overlay */}
                <AnimatePresence>
                  {!isAftermoviePlaying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={toggleAftermoviePlay}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 cursor-pointer z-20"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#FF7A00] flex items-center justify-center shadow-[0_0_30px_rgba(255,122,0,0.55)] hover:scale-110 transition-transform duration-300">
                        <Play className="h-7 w-7 fill-black text-black ml-1" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC107] mt-4 drop-shadow-md">
                        PLAY PARADOX AFTERMOVIE
                      </span>
                      <span className="text-[8px] font-bold text-gray-400 mt-1">
                        DURATION: 00:45 • SOUND ON
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Video Playback State Badge Overlay */}
                {isAftermoviePlaying && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-[9px] font-mono tracking-widest text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    PLAYING LIVE
                  </div>
                )}
              </div>

              {/* Interactive Chapters Grid Timeline */}
              <div className="grid grid-cols-5 gap-2 pt-2 text-left">
                {aftermovieChapters.map((ch, idx) => {
                  const isActive = aftermovieActiveChapter === idx;
                  return (
                    <button
                      key={ch.name}
                      onClick={() => handleSeekAftermovie(ch.time)}
                      className="flex flex-col text-left group cursor-pointer border-none outline-none focus:outline-none transition-all"
                    >
                      {/* Accent highlight line */}
                      <div className={`h-[3px] w-full rounded-full transition-all duration-300 mb-2 ${
                        isActive ? "bg-[#FF7A00]" : "bg-white/10 group-hover:bg-white/30"
                      }`} />
                      <span className={`text-[7px] md:text-[9px] font-black tracking-wider transition-colors duration-300 block line-clamp-1 uppercase ${
                        isActive ? "text-[#FFC107]" : "text-gray-500 group-hover:text-gray-300"
                      }`}>
                        {ch.name}
                      </span>
                      <span className="text-[7px] md:text-[8px] font-mono font-bold text-gray-600 group-hover:text-gray-400 mt-0.5">
                        {ch.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Statistics Centered Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-20 text-center border-t border-white/5 mt-16">
            {STATS.map((s) => (
              <div key={s.label} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#FFC107] uppercase tracking-tight">
                  {s.value}
                </p>
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Paradox '26 Photos: THE FILMSTRIP DOCUMENTARY (Upgraded UX with left timeline Chapters slate and Pinterest auto-height grid) */}
      <section className="py-24 bg-[#050505] border-t border-white/5 relative z-20">
        <div className="container mx-auto px-6 max-w-6xl space-y-16">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] font-mono">
              EXCLUSIVE STAGE ARCHIVES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
              PARADOX '26 CAPTURES
            </h2>
            <div className="h-[2px] w-20 bg-[#FF7A00] rounded-full mx-auto" />
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Experience the visual archive modeled like a documentary chapter-roll. Select a film strip chapter on the left to reveal the natural auto-adjusting Pinterest photo grid.
            </p>
          </div>

          {/* Upgraded Layout: Left side vertical film slate list, Right side Pinterest grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Filmstrip Chapters Slate */}
            <div className="lg:col-span-4 space-y-3 bg-[#0a0a0a] p-4 rounded-3xl border border-white/5 shadow-2xl relative">
              <div className="absolute top-0 right-4 h-full w-[1px] bg-white/5 pointer-events-none hidden lg:block" />
              
              <div className="flex items-center space-x-2.5 pb-3 border-b border-white/5 mb-2 px-2">
                <HardDrive className="h-4 w-4 text-[#FF7A00]" />
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-gray-400">
                  FILM REEL SECTIONS // 7 CHAPTERS
                </span>
              </div>

              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-3 pb-2 lg:pb-0 scrollbar-none snap-x">
                {PARADOX_SUBSECTIONS.map((sub) => {
                  const isActive = selectedSubId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubId(sub.id)}
                      className={`flex-shrink-0 snap-start w-60 lg:w-full flex items-center justify-between text-left p-3.5 rounded-2xl border transition-all duration-300 outline-none cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-[#FF7A00]/10 to-[#FFC107]/5 border-[#FF7A00]/40 shadow-lg shadow-orange-500/5 text-white"
                          : "bg-transparent border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <span className={`text-[10px] font-mono font-black tracking-widest ${
                          isActive ? "text-[#FFC107]" : "text-gray-700"
                        }`}>
                          {sub.chapter}
                        </span>
                        <div className="space-y-0.5">
                          <h4 className={`text-xs font-black uppercase tracking-wider ${
                            isActive ? "text-white" : "text-gray-400"
                          }`}>
                            {sub.name}
                          </h4>
                          <span className="text-[8px] font-mono font-bold text-gray-600 block">
                            TIMELINE: {sub.timecode}
                          </span>
                        </div>
                      </div>

                      {isActive && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]"></span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Pinterest Auto-height Masonry Grid */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-[#0b0b0b]/30 p-3 rounded-2xl border border-white/5 mb-4 text-left">
                <p className="text-[10px] text-gray-400 italic leading-relaxed pl-2 font-mono">
                  &ldquo;{selectedSubsection.desc}&rdquo;
                </p>
              </div>

              <motion.div
                key={selectedSubId}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="columns-2 md:columns-3 gap-4 space-y-4"
              >
                {selectedSubsection.photos.map((photo, pIdx) => {
                  const isStringSrc = typeof photo === "string";
                  return (
                    <div
                      key={pIdx}
                      className="break-inside-avoid relative rounded-2xl overflow-hidden border border-white/5 bg-[#0b0b0b] cursor-zoom-in group hover:border-[#FF7A00]/50 transition-all duration-300 shadow-md"
                      onClick={() => setFullscreenPhoto(photo)}
                    >
                      {isStringSrc ? (
                        <img
                          src={photo}
                          alt={`${selectedSubsection.name} Photo ${pIdx + 1}`}
                          className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500 rounded-2xl"
                        />
                      ) : (
                        <Image
                          src={photo}
                          alt={`${selectedSubsection.name} Photo ${pIdx + 1}`}
                          className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500 rounded-2xl"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-[9px] font-mono text-gray-300 font-bold uppercase tracking-widest">
                          ZOOM PHOTO
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Paradox Cinematic Video Edits: THE BROADCAST CONTROL DESK (Interactive sports video production switcher console) */}
      <section className="py-24 bg-[#080808] border-t border-white/5 relative z-20 overflow-hidden">
        {/* Soft background lens flares */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-6xl space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] font-mono">
              PARADOX BROADCAST DIVISION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
              CINEMATIC EDITS
            </h2>
            <div className="h-[2px] w-20 bg-[#FF7A00] rounded-full mx-auto" />
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Take the director seat in our interactive Multi-Cam Broadcast desk. Switch camera feeds below to mix specific cinematic Paradox cuts onto the main monitors.
            </p>
          </div>

          {/* Interactive Broadcast Console Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
            
            {/* Left Console Panel (8 Columns): Main Feed Monitor */}
            <div className="lg:col-span-8 flex flex-col justify-between bg-[#0e0e0e] border border-white/10 rounded-3xl p-5 shadow-2xl relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.02)_0%,transparent_80%)] pointer-events-none" />
              
              {/* Monitor Header with telemetry data */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3.5 mb-4 text-[9px] font-mono tracking-widest text-gray-500">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="text-[#FF7A00] font-black">RECORDING // LIVE FEED</span>
                </div>
                <div className="hidden sm:block">RESOLUTION: 1080P // H.264</div>
                <div className="text-white font-bold">{timecode}</div>
              </div>

              {/* Main CRT Widescreen Screen Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl group flex items-center justify-center">
                <video
                  ref={monitorVideoRef}
                  src={selectedCam.videoSrc}
                  className={`w-full h-full object-cover z-10 ${glitchActive ? "glitch-effect opacity-50 filter grayscale" : "opacity-90"}`}
                  loop
                  muted={isMonitorMuted}
                  playsInline
                />

                {/* Blinking Glitch Overlay during cam changes */}
                {glitchActive && (
                  <div className="absolute inset-0 bg-[#FF7A00]/10 mix-blend-color-dodge z-30 flex items-center justify-center pointer-events-none">
                    <div className="text-[#FF7A00] font-mono text-xl md:text-2xl font-black tracking-widest animate-pulse">
                      FEED SYNC ACTIVE...
                    </div>
                  </div>
                )}

                {/* Scanlines visual production grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_50%,rgba(0,0,0,0.12)_50%)] bg-[length:100%_4px] z-20 pointer-events-none" />

                {/* Curved lens reflection overlays */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/2 to-transparent z-25 pointer-events-none" />

                {/* Central Play/Pause Trigger Overlay */}
                <AnimatePresence>
                  {!isMonitorPlaying && !glitchActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={toggleMonitorPlay}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 cursor-pointer z-30"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/10 border border-white/25 hover:border-[#FF7A00]/50 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                        <Play className="h-6 w-6 fill-white text-white ml-0.5" />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#FFC107] mt-3">
                        CLICK SCREEN TO MONITOR CAM FEED
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mute Indicator overlay */}
                <div className="absolute bottom-4 right-4 z-30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMonitorMuted(!isMonitorMuted);
                    }}
                    className="p-2 rounded-lg bg-black/70 border border-white/10 text-white hover:border-[#FF7A00]/40 outline-none cursor-pointer"
                  >
                    {isMonitorMuted ? (
                      <VolumeX size={14} className="text-gray-400" />
                    ) : (
                      <Volume2 size={14} className="text-[#FF7A00]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Monitor Footer Console controls */}
              <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleMonitorPlay}
                    className="px-4 py-2 bg-[#FF7A00]/10 hover:bg-[#FF7A00]/20 border border-[#FF7A00]/30 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#FF7A00] flex items-center gap-1.5 cursor-pointer outline-none"
                  >
                    {isMonitorPlaying ? (
                      <>
                        <Pause size={10} className="fill-[#FF7A00]" />
                        <span>PAUSE MONITOR</span>
                      </>
                    ) : (
                      <>
                        <Play size={10} className="fill-[#FF7A00] ml-0.5" />
                        <span>RUN MONITOR</span>
                      </>
                    )}
                  </button>
                  <span className="text-[9px] font-mono text-gray-500 font-bold hidden sm:inline">
                    FEED STATE: {isMonitorPlaying ? "PLAYING" : "PAUSED"}
                  </span>
                </div>

                {/* Sound Equalizer Component */}
                <div className="flex items-end gap-1 px-3 py-1 bg-black/50 border border-white/5 rounded-xl h-7">
                  {Array(12).fill(0).map((_, i) => {
                    // Random height generator simulation
                    const heightVal = isMonitorPlaying ? Math.floor(Math.random() * 18) + 4 : 3;
                    return (
                      <span
                        key={i}
                        className="w-[2.5px] bg-[#FF7A00] rounded-full transition-all duration-100"
                        style={{ height: `${heightVal}px` }}
                      />
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Console Control Deck Panel (4 Columns): Multi-cam inputs */}
            <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col justify-between relative">
              <div className="space-y-4">
                <div className="flex items-center space-x-2.5 pb-3 border-b border-white/5">
                  <Tv className="h-4 w-4 text-[#FF7A00]" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider text-gray-400">
                    MIX CONSOLE // SELECT INPUT
                  </span>
                </div>

                {/* Subtitle feed guide */}
                <p className="text-[10px] text-gray-500 leading-normal font-bold">
                  Tap camera feeds below to routes specific timeline clips onto the monitor screen.
                </p>

                {/* Interactive Multi-cam sources list */}
                <div className="space-y-3.5 pt-2">
                  {CAM_FEEDS.map((cam) => {
                    const isSelected = selectedCam.id === cam.id;
                    return (
                      <button
                        key={cam.id}
                        onClick={() => handleCamSwitch(cam)}
                        className={`w-full flex flex-col p-3 rounded-2xl border text-left cursor-pointer transition-all duration-300 outline-none select-none relative overflow-hidden ${
                          isSelected
                            ? "bg-gradient-to-br from-[#FF7A00]/15 to-[#FFC107]/5 border-[#FF7A00]/40 shadow-lg"
                            : "bg-[#111111]/70 border-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {/* Selector indicator */}
                        {isSelected && (
                          <div className="absolute top-0 right-0 h-full w-[3px] bg-[#FF7A00]" />
                        )}

                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-[9px] font-mono font-black uppercase tracking-wider ${
                            isSelected ? "text-[#FFC107]" : "text-gray-500"
                          }`}>
                            {cam.name}
                          </span>
                          <span className="text-[8px] font-mono font-black px-1.5 py-0.5 bg-black/40 rounded border border-white/5 text-gray-400">
                            {cam.badge}
                          </span>
                        </div>
                        <p className={`text-[9.5px] leading-relaxed line-clamp-1 ${
                          isSelected ? "text-gray-300" : "text-gray-500"
                        }`}>
                          {cam.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Console system specs stamp */}
              <div className="pt-4 border-t border-white/5 mt-6 text-[8px] font-mono text-gray-600 space-y-1">
                <div>SYSTEM DECK: SPORTIFY BROADCAST UNIT 07</div>
                <div>SIGNAL INPUTS: ACTIVE OK // CLOCK STATE: STABLE</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. VISUAL CENTER: COMMUNITY WALL */}
      <section className="py-24 bg-[#070707] border-t border-white/5 relative z-20">
        <div className="container mx-auto px-6 max-w-6xl space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] font-mono">
              VISUAL CENTER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
              COMMUNITY WALL
            </h2>
            <div className="h-[2px] w-20 bg-[#FF7A00] rounded-full mx-auto" />
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              An asymmetrical compilation representing our players, houses, and meetups nationwide.
            </p>
          </div>

          {/* Masonry Columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {COMMUNITY_WALL_ITEMS.map((item, idx) => {
              if (item.type === "quote") {
                return (
                  <div
                    key={idx}
                    className="break-inside-avoid bg-[#0b0b0b]/60 border border-white/5 p-8 rounded-3xl text-center backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-orange-500/25 shadow-lg"
                  >
                    <span className="text-4xl font-serif text-[#FF7A00]/25 absolute top-4 left-6">“</span>
                    <p className="text-base md:text-lg font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFC107] leading-relaxed mb-4 relative z-10">
                      {item.text}
                    </p>
                    <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">
                      — {item.author}
                    </div>
                  </div>
                );
              }
              if (item.type === "chapter") {
                return (
                  <div
                    key={idx}
                    className="break-inside-avoid bg-[#0b0b0b]/80 border border-[#FF7A00]/15 p-6 rounded-3xl relative overflow-hidden transition-all duration-300 hover:border-orange-500/40 shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/5 to-transparent pointer-events-none" />
                    <span className="text-[8px] font-mono font-black uppercase tracking-widest text-[#FFC107] bg-white/5 px-2 py-0.5 border border-white/10 rounded">
                      {item.location}
                    </span>
                    <h4 className="text-lg font-black text-white uppercase mt-3 leading-tight">
                      {item.title}
                    </h4>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-extrabold text-[#FF7A00]">{item.count}</span>
                      <span className="text-[9px] text-gray-500 font-bold uppercase">{item.date}</span>
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={idx}
                  className="break-inside-avoid relative rounded-3xl overflow-hidden border border-white/5 bg-[#0b0b0b] group hover:border-[#FF7A00]/45 transition-all duration-300 cursor-zoom-in shadow-xl"
                  onClick={() => setFullscreenPhoto(item.image)}
                >
                  <Image
                    src={item.image}
                    alt={item.caption || "Community image"}
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-xs text-gray-300 font-medium">{item.caption}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Tilted Floating Reels Deck (Concluding general reels moved to bottom as requested) */}
      <section className="py-24 bg-[#050505] border-t border-white/5 relative z-20 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl space-y-16">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] font-mono">
              CINEMATIC GENERAL REELS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
              MEMORY REELS
            </h2>
            <div className="h-[2px] w-20 bg-[#FF7A00] rounded-full mx-auto" />
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Hover over any tilted card to preview highlights with live sound waves and 3D depth effects.
            </p>
          </div>

          {/* Interactive 3D Perspective Floating Deck Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto pt-6 pb-12">
            {REELS_DATA.map((reel, rIdx) => (
              <ReelDeckCard key={reel.id} reel={reel} index={rIdx} activePlayer={activePlayer} setActivePlayer={setActivePlayer} />
            ))}
          </div>

        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-[#070707] border-t border-white/5 relative z-20 text-center">
        <div className="container mx-auto px-6 max-w-2xl space-y-6">
          <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-none">
            Be Part of Our Legacy
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto">
            Participate in our next national events series, meetups, and online sports initiatives. Your journey begins here.
          </p>
          <div className="pt-4">
            <a
              href="https://forms.gle/p3155Ce9UUy9CrzW6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:scale-[1.03] shadow-[0_0_20px_rgba(255,122,0,0.3)] transition-all cursor-pointer border-none outline-none"
            >
              Apply For Membership
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Fullscreen Photo Lightbox Modal */}
      <AnimatePresence>
        {fullscreenPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
            onClick={() => setFullscreenPhoto(null)}
          >
            <button
              onClick={() => setFullscreenPhoto(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all z-50 cursor-pointer"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
            >
              {typeof fullscreenPhoto === "string" ? (
                <img
                  src={fullscreenPhoto}
                  alt="Fullscreen view"
                  className="object-contain max-w-full max-h-[85vh] rounded-2xl"
                />
              ) : (
                <Image
                  src={fullscreenPhoto}
                  alt="Fullscreen view"
                  className="object-contain w-full h-full"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ----------------------------------------------------
// Tilted Deck Card Subcomponent
// ----------------------------------------------------
function ReelDeckCard({ reel, index, activePlayer, setActivePlayer }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const isCurrentlyActive = activePlayer === `reel-${reel.id}`;

  useEffect(() => {
    if (isCurrentlyActive && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
      setIsPlaying(true);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [isCurrentlyActive]);

  const handleMouseEnter = () => {
    setActivePlayer(`reel-${reel.id}`);
  };

  const handleMouseLeave = () => {
    if (activePlayer === `reel-${reel.id}`) {
      setActivePlayer(null);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full max-w-[320px] mx-auto aspect-[9/16] rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/5 hover:border-[#FF7A00]/50 hover:shadow-[0_0_30px_rgba(255,122,0,0.2)] hover:scale-[1.03] transition-all duration-500 shadow-2xl flex flex-col justify-between cursor-pointer z-10"
    >
      <video
        ref={videoRef}
        src={reel.videoSrc}
        poster={reel.poster ? (typeof reel.poster === "string" ? reel.poster : reel.poster.src) : undefined}
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[1000ms] cubic-bezier(0.25, 1, 0.5, 1) scale-100 group-hover:scale-105"
      />

      {/* Dark overlay vignette layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-10 pointer-events-none" />

      {/* Sound wave / live equalizer visualization on hover */}
      {isPlaying && (
        <div className="absolute top-4 left-4 z-20 flex items-end gap-0.5 h-4">
          <span className="w-0.5 bg-[#FF7A00] animate-[marquee_1s_infinite_alternate] h-full" style={{ animationDelay: "0.1s" }} />
          <span className="w-0.5 bg-[#FF7A00] animate-[marquee_0.8s_infinite_alternate] h-2/3" style={{ animationDelay: "0.3s" }} />
          <span className="w-0.5 bg-[#FF7A00] animate-[marquee_1.2s_infinite_alternate] h-4/5" style={{ animationDelay: "0.5s" }} />
          <span className="w-0.5 bg-[#FF7A00] animate-[marquee_0.9s_infinite_alternate] h-1/2" style={{ animationDelay: "0.2s" }} />
        </div>
      )}

      {/* sound controls */}
      <div className="relative z-20 p-5 flex justify-end items-center w-full">
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-black/60 border border-white/10 hover:border-[#FF7A00]/50 text-white transition-all outline-none cursor-pointer flex items-center justify-center backdrop-blur-md shadow-md"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#FFC107]" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#FF7A00] animate-pulse" />
          )}
        </button>
      </div>

      <div className="relative z-20 p-6 space-y-2 mt-auto w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-12">
        <span className="inline-block px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-wider text-black bg-gradient-to-r from-[#FF7A00] to-[#FFC107] rounded-md shadow-md">
          {reel.badge}
        </span>
        <h4 className="text-lg font-black text-white uppercase leading-tight drop-shadow-md pt-1">
          {reel.title}
        </h4>
        <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold uppercase tracking-widest pt-2 border-t border-white/5">
          <span>{reel.year}</span>
          {!isPlaying && (
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-ping" />
              Hover to preview
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
