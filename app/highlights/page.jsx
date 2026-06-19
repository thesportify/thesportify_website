"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import podiumBG from "@/assets/PodiumBG.jpeg";

// Import pastEvents data from core database
import { pastEvents } from "@/lib/data";

// Import lucide icons
import { 
  Trophy, Play, Calendar, MapPin, Users, Flame, ChevronRight, 
  ChevronLeft, X, Film, Star, Heart, Volume2, VolumeX, Maximize2,
  Bookmark, Award, ArrowRight
} from "lucide-react";
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

// Milestones Stats
const AFTERMOVIE_STATS = [
  { value: 4, suffix: " Days", label: "Duration" },
  { value: 12, suffix: " Houses", label: "Competition" },
  { value: 1000, suffix: "+", label: "Participants" },
  { value: 20, suffix: "+", label: "Events" },
  { value: 8, suffix: "+", label: "Cities Represented" }
];

// Interactive Counter Component
function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1.5;
    const totalFrames = 60 * duration;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutQuad = progress * (2 - progress);
      setCount(Math.floor(easeOutQuad * value));

      if (frame >= totalFrames) {
        clearInterval(counter);
        setCount(value);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// Aftermovie Chapters/Timestamps
const AFTERMOVIE_CHAPTERS = [
  { time: 0, label: "Opening Ceremony", stamp: "00:00" },
  { time: 5, label: "Tournaments Start", stamp: "00:05" },
  { time: 12, label: "Rivalry Clashes", stamp: "00:12" },
  { time: 20, label: "Chapter Meetups", stamp: "00:20" },
  { time: 28, label: "Championship Lift", stamp: "00:28" }
];

// Community Wall Media Database (Widescreen + Asymmetric Collage)
const COMMUNITY_WALL = [
  {
    id: "wall-1",
    type: "image",
    src: TeamCelebration,
    title: "National RKM Championships",
    date: "22 Feb 2026",
    city: "Chennai",
    players: "200+ Players",
    matches: "30 Matches",
    sports: ["Cricket", "Football", "Badminton"],
    description: "The ultimate national meet where online students from across India gathered in Chennai to compete for the national trophy under floodlights.",
    aspect: "landscape-large"
  },
  {
    id: "wall-q1",
    type: "quote",
    text: "We came for sports. We stayed for people.",
    author: "Sportify Diaries"
  },
  {
    id: "wall-2",
    type: "image",
    src: LucknowCricket1,
    title: "Lucknow Cricket Chapter",
    date: "18 Feb 2026",
    city: "Lucknow",
    players: "80 Players",
    matches: "8 Matches",
    sports: ["Cricket"],
    description: "An energetic winter cricket meetup on turf. Teams represented different houses competing in short-overs matches.",
    aspect: "portrait-tall"
  },
  {
    id: "wall-3",
    type: "image",
    src: DelhiBadminton1,
    title: "Delhi Badminton Meetup",
    date: "15 Nov 2025",
    city: "Delhi",
    players: "14 Players",
    matches: "6 Matches",
    sports: ["Badminton"],
    description: "A gathering of badminton players at the DTA Badminton Academy. Friendly matches, training tips, and doubles tournaments.",
    aspect: "square"
  },
  {
    id: "wall-4",
    type: "image",
    src: ChennaiFootball,
    title: "Chennai RKM Football Open",
    date: "22 Feb 2026",
    city: "Chennai",
    players: "110 Players",
    matches: "12 Matches",
    sports: ["Football"],
    description: "Fierce 7-a-side football tournament drawing squads from all academic houses. Crowded touchlines and nail-biting penalty shootouts.",
    aspect: "landscape-wide"
  },
  {
    id: "wall-q2",
    type: "quote",
    text: "Every city became home.",
    author: "Sportify Diaries"
  },
  {
    id: "wall-5",
    type: "image",
    src: KanpurCricket1,
    title: "Kanpur Turf Cricket",
    date: "16 Nov 2025",
    city: "Kanpur",
    players: "22 Players",
    matches: "4 Matches",
    sports: ["Cricket"],
    description: "Friendly evening cricket tournament under floodlights. High scores and great camaraderie among local students.",
    aspect: "portrait-tall"
  },
  {
    id: "wall-6",
    type: "image",
    src: DelhiBadminton2,
    title: "Delhi Badminton Championship",
    date: "15 Nov 2025",
    city: "Delhi",
    players: "18 Players",
    matches: "10 Matches",
    sports: ["Badminton"],
    description: "High-intensity regional playoffs in Delhi. Houses fought for spots in the national tournament.",
    aspect: "square"
  },
  {
    id: "wall-q3",
    type: "quote",
    text: "Some trophies faded. Friendships didn't.",
    author: "Sportify Diaries"
  },
  {
    id: "wall-7",
    type: "image",
    src: LucknowTrophy,
    title: "Lucknow Regional Cup",
    date: "18 Feb 2026",
    city: "Lucknow",
    players: "60 Players",
    matches: "5 Matches",
    sports: ["Cricket", "Badminton"],
    description: "A celebratory regional cup match. The event featured mixed-team formats to ensure equal gender participation.",
    aspect: "landscape-wide"
  },
  {
    id: "wall-8",
    type: "image",
    src: JaipurMeetup,
    title: "Jaipur Turf Meetup",
    date: "24 Nov 2025",
    city: "Jaipur",
    players: "40 Players",
    matches: "6 Matches",
    sports: ["Cricket"],
    description: "A community cricket meetup at Turbo Turf, Pink Square Mall, Jaipur. Friendly matches, net practice sessions, and skills drills.",
    aspect: "square"
  },
  {
    id: "wall-9",
    type: "image",
    src: DelhiHockey1,
    title: "Delhi National Hockey Cheer",
    date: "23 Oct 2024",
    city: "Delhi",
    players: "50 Supporters",
    matches: "1 Match",
    sports: ["Hockey"],
    description: "Sportify coordinated a meetup at Major Dhyan Chand National Stadium to support the Indian Hockey Team in their match against Germany.",
    aspect: "landscape-large"
  }
];

// Video Reels Database
const VIDEO_REELS = [
  { id: "v-1", src: "/RKM.mp4", label: "RKM Championship Highlights", count: "Live Reel", year: "2026" },
  { id: "v-2", src: "/RKM.mp4", label: "Mumbai Regional Playoff", count: "Event recap", year: "2026" },
  { id: "v-3", src: "/RKM.mp4", label: "Delhi Chapter Meetup", count: "Turf Reel", year: "2025" },
];

// Timeline Story of Sportify
const HISTORICAL_TIMELINE = [
  {
    year: "2024",
    title: "Foundation of Sportify",
    description: "Aligned student networks into structured operations. Organized first official watch parties and bilaterals, including a major hockey support gathering at Dhyan Chand National Stadium, Delhi.",
    badge: "THE START"
  },
  {
    year: "2025",
    title: "Pan-India Chapter Expansion",
    description: "Launched physical sports meetups in 30+ Indian cities (Delhi, Kanpur, Jaipur, Lucknow, Kolkata, Hyderabad, Mumbai). Over 700 active student players joined the offline operations network.",
    badge: "SCALING UP"
  },
  {
    year: "2026",
    title: "Flagship Arena Festivals",
    description: "Conducted Rashtriya Khel Mahotsav and the annual Paradox '26 flagship festival in Chennai. Unified athletes nationwide to compete across multiple sports under floodlights.",
    badge: "FLAGSHIPS"
  },
  {
    year: "Future",
    title: "National Sports Network",
    description: "Building permanent digital-to-physical regional networks, creating regular inter-house leagues, and providing elite sport sponsorships to student athletes.",
    badge: "VISION"
  }
];

// Featured Memories Database
const FEATURED_MEMORIES = [
  {
    id: "mem-pbl",
    title: "Paradox Badminton League",
    subtitle: "PBL 2026",
    date: "22 Feb 2026",
    location: "IIT Madras",
    photoCount: 86,
    videoCount: 2,
    participants: 48,
    teams: 12,
    coverImage: TeamCelebration,
    photos: [DelhiBadminton1, DelhiBadminton2, DelhiBadminton3, JaipurMeetup],
    videos: [
      { id: "v1", title: "Match Point Rally", duration: "0:24", src: "/RKM.mp4" },
      { id: "v2", title: "Trophy Ceremony", duration: "0:45", src: "/RKM.mp4" }
    ]
  },
  {
    id: "mem-pcl",
    title: "Paradox Champions League",
    subtitle: "PCL 2026",
    date: "21 Feb 2026",
    location: "IIT Madras",
    photoCount: 73,
    videoCount: 3,
    participants: 88,
    teams: 8,
    coverImage: ChennaiFootball,
    photos: [ChennaiFootball, TeamCelebration, LucknowTrophy, KanpurCricket1],
    videos: [
      { id: "v1", title: "Opening Kickoff", duration: "0:15", src: "/RKM.mp4" },
      { id: "v2", title: "Winning Penalty", duration: "0:30", src: "/RKM.mp4" },
      { id: "v3", title: "Champions Celebration", duration: "0:50", src: "/RKM.mp4" }
    ]
  },
  {
    id: "mem-volley",
    title: "VolleyVibes",
    subtitle: "Volleyball Tournament",
    date: "22 Feb 2026",
    location: "IIT Madras",
    photoCount: 42,
    videoCount: 1,
    participants: 36,
    teams: 6,
    coverImage: LucknowTrophy,
    photos: [LucknowTrophy, LucknowCricket1, LucknowCricket2, JaipurMeetup],
    videos: [
      { id: "v1", title: "Fierce Spike Rally", duration: "0:20", src: "/RKM.mp4" }
    ]
  },
  {
    id: "mem-run",
    title: "Kampus Run",
    subtitle: "Athletics Open",
    date: "22 Feb 2026",
    location: "IIT Madras",
    photoCount: 65,
    videoCount: 1,
    participants: 120,
    teams: 0,
    coverImage: JaipurMeetup,
    photos: [DelhiHockey1, DelhiHockey2, KanpurCricket2, LucknowCricket1],
    videos: [
      { id: "v1", title: "Final Sprint & Finish", duration: "0:35", src: "/RKM.mp4" }
    ]
  }
];

export default function HighlightsPage() {
  const [selectedCity, setSelectedCity] = useState("All");
  
  // Modals state
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);
  const [selectedMemoryEvent, setSelectedMemoryEvent] = useState(null);
  const [activeModalVideo, setActiveModalVideo] = useState(null);

  // Video Aftermovie Chapter state
  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  // Video Reels sound hover state
  const [hoveredVideoIdx, setHoveredVideoIdx] = useState(null);



  // Filter community wall photos
  const filteredWallPhotos = COMMUNITY_WALL.filter((item) => {
    if (selectedCity === "All") return true;
    if (item.type === "quote") return false;
    return item.city && item.city.toLowerCase() === selectedCity.toLowerCase();
  });

  // Safe navigation inside fullscreen view
  const onlyImages = COMMUNITY_WALL.filter(item => item.type === "image");
  const currentImageIdxInFiltered = onlyImages.findIndex(img => 
    fullscreenImageIndex !== null && onlyImages[fullscreenImageIndex]?.id === img.id
  );

  const handleNextImage = () => {
    if (currentImageIdxInFiltered === -1) return;
    const nextIdx = (currentImageIdxInFiltered + 1) % onlyImages.length;
    const actualGalIdx = COMMUNITY_WALL.findIndex(item => item.id === onlyImages[nextIdx].id);
    setFullscreenImageIndex(actualGalIdx);
  };

  const handlePrevImage = () => {
    if (currentImageIdxInFiltered === -1) return;
    const prevIdx = (currentImageIdxInFiltered - 1 + onlyImages.length) % onlyImages.length;
    const actualGalIdx = COMMUNITY_WALL.findIndex(item => item.id === onlyImages[prevIdx].id);
    setFullscreenImageIndex(actualGalIdx);
  };

  // Video timeline update check
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      let activeIdx = 0;
      for (let i = 0; i < AFTERMOVIE_CHAPTERS.length; i++) {
        if (time >= AFTERMOVIE_CHAPTERS[i].time) {
          activeIdx = i;
        }
      }
      setCurrentChapterIndex(activeIdx);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  // Jump to chapter timestamp
  const handleSeekChapter = (chapterTime, index) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = chapterTime;
      video.play().catch(() => {});
      setVideoPlaying(true);
      setCurrentChapterIndex(index);
    }
  };

  const toggleAftermovie = () => {
    const video = videoRef.current;
    if (video) {
      if (videoPlaying) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  // Video reels hover-sound handler
  const handleReelEnter = (e, idx) => {
    setHoveredVideoIdx(idx);
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.muted = false;
      video.volume = 0;
      video.play().catch(() => {});
      let vol = 0;
      const interval = setInterval(() => {
        vol += 0.1;
        if (vol >= 0.7) {
          video.volume = 0.7;
          clearInterval(interval);
        } else {
          video.volume = vol;
        }
      }, 35);
    }
  };

  const handleReelLeave = (e) => {
    setHoveredVideoIdx(null);
    const video = e.currentTarget.querySelector("video");
    if (video) {
      let vol = video.volume;
      const interval = setInterval(() => {
        vol -= 0.1;
        if (vol <= 0.05) {
          video.volume = 0;
          video.muted = true;
          video.pause();
          clearInterval(interval);
        } else {
          video.volume = vol;
        }
      }, 35);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#FF7A00]/30 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section: Paradox '26 Flagship Spotlights */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full-screen Background Video/Image */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src={TeamCelebration}
            alt="Paradox '26 Festival Celebration"
            fill
            priority
            className="object-cover opacity-25"
          />
          {/* Deep cinematic gradient filters */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/45 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.06)_0%,transparent_75%)] z-10" />
        </div>

        {/* Hero typography content */}
        <div className="relative z-20 container mx-auto px-6 text-center md:text-left max-w-6xl mt-12">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-gradient-to-r from-[#FF7A00]/15 to-[#FFC107]/15 border border-[#FF7A00]/30 rounded-full mb-6 mx-auto md:mx-0 shadow-md">
            <Flame className="h-4.5 w-4.5 text-[#FF7A00] animate-pulse" />
            <span className="text-[10px] uppercase font-mono font-black tracking-widest text-[#FFC107]">FLAGSHIP SPORTS FESTIVAL</span>
          </div>

          <div className="max-w-3xl space-y-6">
            <h1 className="text-[clamp(2.5rem,8vw,5.8rem)] font-black uppercase tracking-tight leading-[0.9] text-white">
              PARADOX '26
            </h1>

            <p className="text-gray-300 font-serif italic text-lg sm:text-2xl font-medium tracking-wide">
              "Where competition became celebration."
            </p>

            <p className="text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed font-medium">
              The annual flagship sports festival of IIT Madras BS, bringing together intense physical tournaments, strategy simulations, cross-country house rivalries, and unforgettable community bonds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <button 
                onClick={() => document.getElementById("flagship-events")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl hover:scale-[1.03] shadow-[0_0_25px_rgba(255,122,0,0.3)] transition-all cursor-pointer"
              >
                Explore Festival Events
              </button>
              <button 
                onClick={() => document.getElementById("aftermovie")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-white/5 border border-white/10 hover:border-orange-500/40 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="h-4 w-4 fill-white" />
                Watch Aftermovie
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Aftermovie Section with interactive timestamps */}
      <section id="aftermovie" className="relative w-full py-24 bg-[#0b0b0b]/30 border-y border-white/5 z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] block">OFFICIAL HIGHLIGHTS</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none">
                PARADOX '26<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFC107]">AFTERMOVIE</span>
              </h2>
              <div className="h-[2px] w-20 bg-[#FF7A00] rounded-full" />
              
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                4 days. Thousands of memories. One unforgettable festival. Click the timestamps below the screen to explore specific chapters in this highlight documentary.
              </p>

              <button
                onClick={toggleAftermovie}
                className="px-6 py-3.5 bg-white/5 border border-white/10 hover:border-orange-500/40 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
              >
                <Play className={`h-4 w-4 ${videoPlaying ? "fill-orange-500 text-orange-500" : "fill-white"}`} />
                <span>{videoPlaying ? "Pause Highlights" : "Watch Full Film"}</span>
              </button>
            </div>

            {/* Right Video Player Column */}
            <div className="lg:col-span-7 space-y-4">
              {/* Premium Video Container */}
              <div 
                onClick={toggleAftermovie}
                className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 group cursor-pointer shadow-2xl hover:border-orange-500/40 transition-colors duration-300"
              >
                <video
                  ref={videoRef}
                  src="/RKM.mp4"
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Cover poster overlay when not playing */}
                <AnimatePresence>
                  {!videoPlaying && (
                    <motion.div 
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30 z-10 flex flex-col items-center justify-center"
                    >
                      {/* Interactive play circle */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="h-6 w-6 fill-black translate-x-[2px]" />
                      </div>
                      <span className="text-xs uppercase font-black tracking-widest text-[#FFC107] mt-4">
                        ▶ PLAY PARADOX AFTERMOVIE
                      </span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">
                        DURATION: 00:45 • MUTED BY DEFAULT
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Interactive seek progress bar (Clickable timestamps) */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {AFTERMOVIE_CHAPTERS.map((chap, idx) => {
                  const isCurrent = currentChapterIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSeekChapter(chap.time, idx)}
                      className="group flex flex-col text-left space-y-1.5 focus:outline-none focus:ring-0 cursor-pointer"
                    >
                      {/* Timeline track segment */}
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden relative">
                        <div 
                          className={`absolute inset-y-0 left-0 transition-all duration-300 ${
                            isCurrent ? "w-full bg-[#FF7A00] shadow-[0_0_8px_#FF7A00]" : "w-0 bg-white/30 group-hover:w-full"
                          }`} 
                        />
                      </div>

                      {/* Info labels */}
                      <div className="px-0.5">
                        <span className={`text-[8px] font-black uppercase tracking-widest block transition-colors leading-none ${
                          isCurrent ? "text-[#FFC107]" : "text-gray-500 group-hover:text-white"
                        }`}>
                          {chap.label}
                        </span>
                        <span className="text-[9px] text-gray-600 font-bold font-mono">
                          {chap.stamp}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Counters strip under video */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-16 border-t border-white/5 mt-16 text-center">
            {AFTERMOVIE_STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFC107]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Flagship Events Section */}
      <section id="flagship-events" className="container mx-auto px-6 py-24 max-w-6xl space-y-12 z-20 relative">
        <div className="text-center md:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">FLAGSHIP FESTIVALS</span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">MAJOR ARENAS</h2>
          <div className="h-[2px] w-20 bg-[#FF7A00] rounded-full mx-auto md:mx-0" />
        </div>

        {/* Cinematic Grid of 3 Widescreen Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Paradox */}
          <div className="group rounded-[28px] overflow-hidden border border-white/10 bg-[#0B0B0B]/85 hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(255,122,0,0.1)] transition-all duration-500 flex flex-col justify-between">
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <Image src={TeamCelebration} alt="Paradox Fest" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute top-4 left-4 z-10 bg-black/60 border border-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">
                <span className="text-[8px] font-black text-[#FFC107] tracking-widest uppercase">FLAGSHIP EVENT</span>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Paradox '26</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  The primary athletic sports festival hosted at the IIT Madras campus, bringing together physical meetups and national finals.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[8px] font-black text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">1000+ Players</span>
                <span className="text-[8px] font-black text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">All Houses</span>
              </div>
            </div>
          </div>

          {/* Card 2: RKM */}
          <div className="group rounded-[28px] overflow-hidden border border-white/10 bg-[#0B0B0B]/85 hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(255,122,0,0.1)] transition-all duration-500 flex flex-col justify-between">
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <Image src={ChennaiFootball} alt="RKM Event" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute top-4 left-4 z-10 bg-black/60 border border-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">
                <span className="text-[8px] font-black text-[#FF7A00] tracking-widest uppercase">PAN-INDIA CHAMPIONSHIP</span>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Rashtriya Khel Mahotsav</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  The ultimate cross-country event connecting regional hubs with Chennai hosts, executing tournaments in major metro segments.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[8px] font-black text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">8+ Cities</span>
                <span className="text-[8px] font-black text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">Floodlights</span>
              </div>
            </div>
          </div>

          {/* Card 3: Margazhi */}
          <div className="group rounded-[28px] overflow-hidden border border-white/10 bg-[#0B0B0B]/85 hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(255,122,0,0.1)] transition-all duration-500 flex flex-col justify-between">
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <Image src={LucknowTrophy} alt="Margazhi Event" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute top-4 left-4 z-10 bg-black/60 border border-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">
                <span className="text-[8px] font-black text-orange-400 tracking-widest uppercase">WINTER CUP</span>
              </div>
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Margazhi '25</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  An intensive winter tournament featuring virtual quizzes, strategy auction setups, and chapter sports trials.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-[8px] font-black text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">Online + Offline</span>
                <span className="text-[8px] font-black text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">Strategy</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Historical Milestones (Story of Sportify) */}
      <section className="relative w-full py-24 bg-[#0b0b0b]/30 border-t border-white/5 z-20">
        <div className="container mx-auto px-6 max-w-4xl space-y-16">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC107]">OUR EVOLUTION</span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">THE STORY OF SPORTIFY</h2>
            <div className="h-[2px] w-20 bg-[#FFC107] rounded-full mx-auto" />
            <p className="text-gray-500 text-xs max-w-sm mx-auto mt-2">
              From an exploratory student initiative to a national collegiate sports network.
            </p>
          </div>

          {/* Simplified 4-step vertical timeline */}
          <div className="relative border-l border-white/10 ml-4 md:ml-32 py-2 space-y-12">
            {HISTORICAL_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative pl-8 group">
                {/* Node dot glow */}
                <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#FF7A00] border-4 border-black group-hover:scale-110 transition-transform duration-300 shadow-[0_0_10px_#FF7A00]" />
                
                {/* Left side Year (Desktop) */}
                <span className="absolute -left-32 top-0 text-xl font-black uppercase tracking-wider text-[#FF7A00] hidden md:block text-right w-24">
                  {item.year}
                </span>

                {/* Content block */}
                <div className="bg-[#0b0b0b]/60 border border-white/5 p-6 rounded-2xl space-y-3 hover:border-orange-500/20 hover:bg-[#0b0b0b]/90 transition-all duration-300 shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#FFC107] bg-white/5 px-2 py-0.5 border border-white/10 rounded">
                      {item.badge}
                    </span>
                    <span className="text-xs text-gray-500 font-bold md:hidden">Year: {item.year}</span>
                  </div>
                  <h4 className="text-lg font-black text-white uppercase">{item.title}</h4>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Featured Memories Section */}
      <section id="featured-memories" className="container mx-auto px-6 py-24 max-w-6xl space-y-10 z-20 relative">
        <div className="text-center md:text-left space-y-2 border-b border-white/5 pb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">ATMOSPHERE & CELEBRATION</span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">FEATURED MEMORIES</h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Step inside the visual archives of our flagship events. Click any gallery to explore photos, match points, and crowd reactions.
          </p>
        </div>

        {/* 4-Column Grid of Widescreen Gallery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_MEMORIES.map((memory) => (
            <div
              key={memory.id}
              onClick={() => setSelectedMemoryEvent(memory)}
              className="group cursor-pointer rounded-3xl overflow-hidden border border-white/5 bg-[#0B0B0B]/85 hover:border-orange-500/40 hover:shadow-[0_0_25px_rgba(255,122,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-black border-b border-white/5">
                <Image
                  src={memory.coverImage}
                  alt={memory.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 z-10 bg-black/60 border border-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">
                  <span className="text-[8px] font-black text-[#FFC107] tracking-widest uppercase">
                    {memory.subtitle}
                  </span>
                </div>
              </div>
              
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-[#FF7A00] transition-colors leading-snug">
                    {memory.title}
                  </h3>
                  <div className="flex gap-2 text-[9px] font-bold text-gray-500 uppercase">
                    <span>{memory.photoCount} Photos</span>
                    <span>•</span>
                    <span>{memory.videoCount} {memory.videoCount > 1 ? "Videos" : "Video"}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-2 text-[9px] uppercase font-mono font-black tracking-widest text-[#FF7A00]">
                  <span>{memory.location}</span>
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    View Memories <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Wall Section */}
      <section className="border-t border-white/5 bg-[#050505] py-20">
        <div className="container mx-auto px-6 max-w-6xl space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC107]">VISUAL CENTER</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">COMMUNITY WALL</h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                An asymmetrical compilation representing our players, houses, and meetups nationwide.
              </p>
            </div>

            {/* City Filter tabs */}
            <div className="flex flex-wrap items-center gap-1.5 mt-6 md:mt-0">
              {["All", "Chennai", "Delhi", "Lucknow", "Kanpur", "Jaipur"].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                    selectedCity === city
                      ? "bg-gradient-to-r from-[#FF7A00] to-[#FFC107] border-orange-400 text-black shadow-[0_0_15px_rgba(255,122,0,0.25)]"
                      : "bg-[#0B0B0B] border-white/5 hover:border-orange-500/30 text-gray-400 hover:text-white"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Asymmetrical CSS column grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredWallPhotos.map((item) => {
              if (item.type === "quote") {
                return (
                  <div
                    key={item.id}
                    className="break-inside-avoid w-full p-8 bg-[#0b0b0b]/60 border border-white/5 rounded-3xl text-center backdrop-blur-md relative overflow-hidden flex flex-col justify-center items-center shadow-lg min-h-[160px] group transition-all duration-300 hover:border-orange-500/20"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.025)_0%,transparent_60%)]" />
                    <span className="text-4xl font-serif text-[#FF7A00]/25 select-none absolute top-4 left-6">“</span>
                    <p className="text-lg md:text-xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFC107] whitespace-normal leading-relaxed relative z-10 px-4">
                      {item.text}
                    </p>
                    <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-4">
                      — {item.author}
                    </span>
                  </div>
                );
              }

              const globalIdx = COMMUNITY_WALL.findIndex(g => g.id === item.id);
              
              let cardHeightClass = "aspect-[4/3]";
              if (item.aspect === "portrait-tall") cardHeightClass = "aspect-[3/4]";
              if (item.aspect === "landscape-wide") cardHeightClass = "aspect-[16/9]";
              if (item.aspect === "landscape-large") cardHeightClass = "aspect-[16/10]";
              if (item.aspect === "square") cardHeightClass = "aspect-square";

              return (
                <div
                  key={item.id}
                  onClick={() => setFullscreenImageIndex(globalIdx)}
                  className={`break-inside-avoid w-full group cursor-pointer relative rounded-[28px] overflow-hidden border border-white/10 bg-[#0b0b0b] hover:border-orange-500/50 shadow-md transition-all duration-500 hover:shadow-[0_0_35px_rgba(255,122,0,0.18)] ${cardHeightClass}`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Deep cover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10" />

                  {/* Interactive detail block */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#FFC107] bg-black/60 px-2.5 py-1 rounded-md border border-white/5 backdrop-blur-md inline-block mb-2">
                      {item.city} Chapter
                    </span>
                    <h3 className="text-base font-extrabold text-white uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2 border-t border-white/5 pt-2">
                      <span>{item.players}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Memory Reel scroller */}
      <section className="container mx-auto px-6 py-20 max-w-6xl space-y-10 border-t border-white/5">
        <div className="text-center md:text-left space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] flex items-center gap-1 justify-center md:justify-start">
            <Film className="h-3.5 w-3.5" />
            CINEMATIC REELS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            MEMORY REELS
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Hover over any reel to preview highlights with audio. Move away anytime to pause.
          </p>
        </div>

        {/* Video Reel horizontal track */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VIDEO_REELS.map((item, idx) => (
            <div
              key={item.id}
              onMouseEnter={(e) => handleReelEnter(e, idx)}
              onMouseLeave={handleReelLeave}
              className="group relative aspect-[9/16] rounded-3xl overflow-hidden bg-[#0b0b0b] border border-white/10 hover:border-orange-500/50 shadow-lg cursor-pointer transition-all duration-300"
            >
              <video
                src={item.src}
                loop
                muted
                playsInline
                className="w-full h-full object-cover pointer-events-none select-none"
              />

              {/* Cover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none z-10" />

              {/* Floating controls indicator */}
              <div className="absolute top-4 right-4 z-20 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                {hoveredVideoIdx === idx ? (
                  <Volume2 className="h-3.5 w-3.5 text-[#FF7A00]" />
                ) : (
                  <VolumeX className="h-3.5 w-3.5 text-gray-500" />
                )}
                <span className="text-[8px] font-bold text-white uppercase tracking-wider">
                  {hoveredVideoIdx === idx ? "SOUND ON" : "MUTED"}
                </span>
              </div>

              {/* Labels */}
              <div className="absolute bottom-6 left-6 z-20 pointer-events-none space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC107] bg-black/50 px-2.5 py-1 rounded-md border border-white/5 backdrop-blur-md inline-block">
                  {item.label}
                </span>
                <div className="flex gap-2 text-[9px] font-bold text-gray-400">
                  <span className="bg-[#050505]/60 px-2 py-0.5 rounded border border-white/5 backdrop-blur-md">{item.count}</span>
                  <span className="bg-[#050505]/60 px-2 py-0.5 rounded border border-white/5 backdrop-blur-md">{item.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* Fullscreen Double-Column Gallery Modal Carousel */}
      <AnimatePresence>
        {fullscreenImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[99999] flex items-center justify-center p-4 sm:p-10 select-none"
          >
            <button
              onClick={() => setFullscreenImageIndex(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all z-50 cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Left Carousel Nav */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-3 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all z-45 cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Carousel Nav */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-3 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all z-45 cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>

            {/* Double-Column Content Panel */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#0b0b0b] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl max-w-5xl w-full max-h-[85vh] grid grid-cols-1 md:grid-cols-12 items-stretch"
            >
              {/* Left Column: Image Area */}
              <div className="md:col-span-7 relative bg-black min-h-[30vh] md:min-h-[500px] flex items-center justify-center overflow-hidden border-r border-white/5">
                <Image
                  src={COMMUNITY_WALL[fullscreenImageIndex]?.src}
                  alt={COMMUNITY_WALL[fullscreenImageIndex]?.title}
                  className="object-contain w-full h-full max-h-[50vh] md:max-h-[80vh] p-2"
                />
              </div>

              {/* Right Column: Detailed Info Panel */}
              <div className="md:col-span-5 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC107] bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                      {COMMUNITY_WALL[fullscreenImageIndex]?.city} Chapter
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      {COMMUNITY_WALL[fullscreenImageIndex]?.date}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight leading-snug">
                    {COMMUNITY_WALL[fullscreenImageIndex]?.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 py-1">
                    {COMMUNITY_WALL[fullscreenImageIndex]?.sports?.map((sport, idx) => (
                      <span key={idx} className="text-[9px] font-black uppercase text-black bg-[#FF7A00] px-2.5 py-0.5 rounded-full border border-orange-400/20">
                        {sport}
                      </span>
                    ))}
                    <span className="text-[9px] font-black uppercase text-[#FFC107] bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      {COMMUNITY_WALL[fullscreenImageIndex]?.players}
                    </span>
                    <span className="text-[9px] font-black uppercase text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      {COMMUNITY_WALL[fullscreenImageIndex]?.matches}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed pt-2">
                    {COMMUNITY_WALL[fullscreenImageIndex]?.description}
                  </p>
                </div>

                <div className="flex gap-4 border-t border-white/5 pt-5">
                  <button
                    onClick={handlePrevImage}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                    <span>Previous</span>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-black text-xs font-black uppercase tracking-wider transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Event Memory Gallery Modal */}
      <AnimatePresence>
        {selectedMemoryEvent !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[99999] flex items-center justify-center p-4 sm:p-10 select-none overflow-y-auto"
          >
            {/* Scrollable container inside viewport */}
            <div className="relative w-full max-w-5xl my-auto max-h-[90vh] bg-[#0b0b0b] border border-white/10 rounded-[32px] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 select-text">
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedMemoryEvent(null);
                  setActiveModalVideo(null);
                }}
                className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all cursor-pointer z-50"
              >
                <X size={20} />
              </button>

              {/* Title Header */}
              <div className="border-b border-white/5 pb-4 space-y-1 pr-12">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#FF7A00] bg-orange-500/10 px-2.5 py-1 rounded border border-orange-500/25 inline-block">
                  {selectedMemoryEvent.subtitle}
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight leading-none">
                  {selectedMemoryEvent.title}
                </h3>
                <p className="text-gray-500 text-xs font-bold font-mono">
                  {selectedMemoryEvent.date} • {selectedMemoryEvent.location}
                </p>
              </div>

              {/* Main Content Split Pane */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Photo Grid & Video Highlights */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Pinterest/Masonry Style Photo Grid */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-[#FFC107] border-l-2 border-[#FFC107] pl-2 leading-none">
                      Photo Gallery ({selectedMemoryEvent.photoCount} Shots)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedMemoryEvent.photos.map((pic, idx) => {
                        // Varying aspect ratios for dynamic layout
                        let aspect = "aspect-square";
                        if (idx === 0) aspect = "aspect-[4/3] sm:col-span-2";
                        if (idx === 3) aspect = "aspect-[16/10]";

                        return (
                          <div key={idx} className={`relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900 shadow-sm ${aspect}`}>
                            <Image
                              src={pic}
                              alt={`${selectedMemoryEvent.title} Highlight ${idx + 1}`}
                              fill
                              sizes="(max-width: 768px) 50vw, 300px"
                              className="object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Video Highlights list */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-[#FFC107] border-l-2 border-[#FFC107] pl-2 leading-none">
                      Video Highlights
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedMemoryEvent.videos.map((vid, idx) => (
                        <div
                          key={vid.id}
                          onClick={() => setActiveModalVideo(vid)}
                          className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-orange-500/40 rounded-2xl cursor-pointer hover:bg-white/10 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-black flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                              <Play className="h-4 w-4 fill-black translate-x-[1px]" />
                            </div>
                            <div>
                              <h5 className="text-xs font-black uppercase text-white tracking-wide leading-tight group-hover:text-[#FF7A00] transition-colors">
                                {vid.title}
                              </h5>
                              <span className="text-[9px] text-gray-500 font-bold font-mono">
                                Highlight {idx + 1} • {vid.duration} mins
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Side: Sidebar Info Card */}
                <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                  <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-gray-400 border-b border-white/5 pb-2">
                    Event Overview
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-medium">Date</span>
                      <span className="text-white font-bold">{selectedMemoryEvent.date}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-white/5 pt-3">
                      <span className="text-gray-500 font-medium">Venue</span>
                      <span className="text-white font-bold">{selectedMemoryEvent.location}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-white/5 pt-3">
                      <span className="text-gray-500 font-medium">Athletes</span>
                      <span className="text-white font-bold">{selectedMemoryEvent.participants} Participants</span>
                    </div>
                    {selectedMemoryEvent.teams > 0 && (
                      <div className="flex justify-between items-center text-xs border-t border-white/5 pt-3">
                        <span className="text-gray-500 font-medium">Brackets</span>
                        <span className="text-white font-bold">{selectedMemoryEvent.teams} Teams</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-xs border-t border-white/5 pt-3">
                      <span className="text-gray-500 font-medium">Media Assets</span>
                      <span className="text-[#FFC107] font-black uppercase">
                        {selectedMemoryEvent.photoCount} Photos • {selectedMemoryEvent.videoCount} Videos
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#050505] p-3 rounded-xl border border-white/5 text-[9px] text-gray-500 leading-relaxed text-center font-medium">
                    This media is part of the official Sportify Highlights Archive.
                  </div>
                </div>

              </div>

              {/* Close Button Footer */}
              <div className="border-t border-white/5 pt-4 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedMemoryEvent(null);
                    setActiveModalVideo(null);
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FFC107] text-black text-xs font-black uppercase tracking-wider transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Close Gallery
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Video Lightbox overlay for Modal Video Highlight */}
      <AnimatePresence>
        {activeModalVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100000] flex items-center justify-center p-4 sm:p-10 select-none"
          >
            <div className="relative w-full max-w-3xl aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
              {/* Close button */}
              <button
                onClick={() => setActiveModalVideo(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full bg-black/60 border border-white/10 hover:border-orange-500/40 transition-all cursor-pointer z-50"
              >
                <X size={16} />
              </button>

              <video
                src={activeModalVideo.src}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />

              {/* Float bar */}
              <div className="absolute bottom-4 left-4 z-40 bg-black/60 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md text-[9px] font-black uppercase text-[#FFC107] tracking-wider select-text">
                ▶ {activeModalVideo.title} • {activeModalVideo.duration} mins
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
