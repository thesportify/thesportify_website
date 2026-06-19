"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Flame, 
  Users, 
  Shield, 
  Award, 
  Scale, 
  ExternalLink, 
  ArrowRight,
  BookOpen,
  Sparkles,
  Gamepad2
} from "lucide-react";
import Link from "next/link";
import sportsBG from "../assets/stadium_glow_bg.png";

const PLAYBOOK_DATA = [
  {
    id: "preamble",
    label: "Core Playbook",
    icon: Flame,
    title: "Spreading the Flame of Sportsmanship",
    subtitle: "Vision, Mission & Goals",
    pageNumber: 1,
    description: "Our foundation is built on physical wellness, team synergy, and competitive excellence. We believe in spreading the joy of sports to every corner of the IIT Madras BS program.",
    highlights: [
      "Inclusive Play: Creating sports programs and tournaments open to players of all skill levels.",
      "The Joy of Sports: Fostering lifelong fitness habits and pure passion for athletic games.",
      "Regional Communities: Extending the playfield by building offline sports hubs across India.",
      "True Sportsmanship: Promoting fair play, respect, discipline, and ethical coordination."
    ]
  },
  {
    id: "roster",
    label: "Team Roster",
    icon: Users,
    title: "Building the Roster",
    subtitle: "Squad Levels & Participation",
    pageNumber: 2,
    description: "Every player counts. The constitution outlines structured roles from general members to volunteers, core squad members, and elected captains.",
    highlights: [
      "Player Categories: General Member, active Volunteer, Core Squad, and Office Bearer.",
      "Active Contributions: Volunteers gain key roles in coordinating, refereeing, and managing events.",
      "Voter Registration: Requires being registered on the roster for at least 30 days.",
      "Active Player Vote: Voting rights belong exclusively to members who participate in at least 1 meetup."
    ]
  },
  {
    id: "coaching",
    label: "Coaching Staff",
    icon: Shield,
    title: "Captaincy & Tactical Guidance",
    subtitle: "Executive Council & Referees",
    pageNumber: 3,
    description: "Detailed administration protocols. The Captain (Secretary) and Co-Captain (Deputy Secretary) lead tactical execution under the guidance of referees and mentors.",
    highlights: [
      "Executive Council (EC): Led by the Secretary and Deputy Secretary for society operations.",
      "Women's Wing Captain: A dedicated Coordinator leading the 'Sportify Her' division for female inclusion.",
      "Council of Advisors: Composed of former captains to guide transitions and preserve institutional memory.",
      "Mentors' Referees: Oversight board reviewing ethical conduct, election rules, and grievances."
    ]
  },
  {
    id: "trials",
    label: "Qualifying Trials",
    icon: Award,
    title: "Qualifying for the Positions",
    subtitle: "Eligibility & Election Rules",
    pageNumber: 4,
    description: "Only players with demonstrated commitment, academic discipline, and high integrity can qualify for executive positions of responsibility.",
    highlights: [
      "Playtime Check: Candidates must have completed at least 3 academic terms and 32 credits.",
      "Fitness Index (CGPA): A solid academic score (CGPA >= 7.5) is required to file nominations.",
      "Clean Sheet Record: Zero record of academic malpractice or disciplinary action.",
      "SEC Supervision: Standardized manifestos, public debates, and secure online ballots."
    ]
  },
  {
    id: "fairplay",
    label: "Fair Play Code",
    icon: Scale,
    title: "Financial Discipline & Integrity",
    subtitle: "Expenditure Controls & Audits",
    pageNumber: 5,
    description: "Strict fiscal discipline keeps the game clean. The constitution guarantees complete financial transparency and auditing for all society assets.",
    highlights: [
      "Official Sanction: No society expenditure can occur without prior written Student Affairs approval.",
      "Trust-Only Sponsorship: All sponsorship resources must flow through the IIT Madras trust.",
      "Cashless Play: Accepting, handling, or transacting cash sponsorships is strictly prohibited.",
      "Cap Limit: Major financial commitments above ₹10,000 require multi-level approvals."
    ]
  }
];

export default function ConstitutionPreview() {
  const [activeTab, setActiveTab] = useState("preamble");
  const [isFlipped, setIsFlipped] = useState(false);

  const currentTab = PLAYBOOK_DATA.find((tab) => tab.id === activeTab) || PLAYBOOK_DATA[0];
  const ActiveIcon = currentTab.icon;

  const driveLink = "https://drive.google.com/file/d/1Rc6Kc4KT3hvOxmQdercUmf5RdafTsypW/view?usp=sharing";

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    setIsFlipped(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsFlipped(false);
    }, 300); // synchronizes with 3D rotation flip midpoint
  };

  return (
    <section 
      className="relative py-24 bg-cover bg-center overflow-hidden px-4 md:px-8 border-y border-white/5"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(5,5,5,0.92), rgba(5,5,5,0.95)), url(${sportsBG.src})`,
      }}
    >
      
      {/* Stadium overlay background effect */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 40%, rgba(5,5,5,0.98) 100%) pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-[#FF7A00]/10 to-[#FFC107]/10 rounded-full border border-orange-500/20 mb-2 shadow-[0_0_15px_rgba(255,122,0,0.1)]">
            <Trophy className="h-6 w-6 text-orange-400 animate-pulse" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            THE SPORTIFY{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FFC107] to-white drop-shadow-[0_2px_10px_rgba(255,122,0,0.15)]">
              PLAYBOOK
            </span>
          </h2>
          
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Rules, captaincy guidelines, and the core sports code adopted to govern the Official Sports Society of the IIT Madras BS Degree Programme.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Tabs Selector */}
          <div className="lg:col-span-4 flex flex-col space-y-2.5">
            <span className="text-[10px] lg:text-xs font-black text-gray-500 uppercase tracking-widest block mb-1">
              Playbook Index
            </span>
            
            <div className="flex flex-row lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3 overflow-x-auto pb-3 lg:pb-0 scroll-smooth">
              {PLAYBOOK_DATA.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center space-x-3 border rounded-xl py-3 px-4 transition-all duration-300 cursor-pointer shrink-0 lg:w-full lg:text-left lg:px-5 lg:py-4.5 lg:rounded-2xl lg:space-x-4 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FF7A00]/15 to-[#FFC107]/15 border-[#FF7A00]/30 text-[#FF7A00] shadow-[0_0_20px_rgba(255,122,0,0.08)]"
                        : "bg-[#0b0b0b]/60 border-white/5 hover:border-white/10 text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors lg:p-2.5 lg:rounded-xl ${isActive ? "bg-orange-500/20 text-[#FF7A00]" : "bg-black/50 text-gray-500"}`}>
                      <TabIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                    </div>
                    <div>
                      <span className="hidden lg:block text-[9px] text-gray-500 uppercase tracking-widest font-black leading-none mb-1">
                        Page {tab.pageNumber}
                      </span>
                      <span className="text-xs lg:text-sm font-extrabold block uppercase tracking-tight">
                        {tab.label}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activePlaybookIndicator"
                        className="hidden lg:block w-1.5 h-6 bg-gradient-to-b from-[#FF7A00] to-[#FFC107] rounded-full ml-auto"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Interactive 3D Digital Page Flip Book */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            {/* 3D Book Container */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[1.5/1] bg-transparent perspective-[1500px]">
              
              {/* Actual 3D Book Cover / Page */}
              <div 
                className="absolute inset-0 bg-[#070b14]/90 rounded-3xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] grid grid-cols-2 overflow-hidden transition-transform duration-600 ease-in-out transform-style-preserve-3d"
                style={{
                  transform: isFlipped ? "rotateY(-15deg) scale(0.98)" : "rotateY(0deg) scale(1)",
                }}
              >
                
                {/* Book Spine / Binding shadow in the center */}
                <div className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-gradient-to-r from-black/50 via-black/10 to-black/50 z-30 pointer-events-none" />

                {/* LEFT PAGE (Index & Chapter Cover) */}
                <div className="p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#0c0c0c] to-[#070707] border-r border-white/5 relative">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-orange-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#FFC107]">
                        IIT Madras Sportify Code
                      </span>
                    </div>

                    <div className="pt-6">
                      <h4 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-1">
                        THE SQUAD
                      </h4>
                      <h4 className="text-2xl sm:text-3xl font-black text-orange-500 uppercase tracking-tighter leading-none">
                        PLAYBOOK
                      </h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2">
                        Official Charter &bull; 2026 Edition
                      </p>
                    </div>

                    <div className="pt-8 space-y-2.5">
                      {PLAYBOOK_DATA.map((p) => (
                        <div 
                          key={p.id}
                          className={`flex items-center justify-between text-[11px] font-bold ${
                            p.id === activeTab ? "text-orange-400" : "text-gray-500"
                          }`}
                        >
                          <span className="uppercase">{p.label}</span>
                          <span>p. {p.pageNumber}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-600 uppercase tracking-widest">
                    <span>Authentic Sports Society</span>
                  </div>
                </div>

                {/* RIGHT PAGE (Dynamic Content Panel) */}
                <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#0b0b0b] relative">
                  
                  {/* Glowing Stadium Spotlights Overlay */}
                  <div className="absolute inset-0 bg-radial-gradient(circle at 75% 20%, rgba(255,122,0,0.06) 0%, transparent 60%) pointer-events-none" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5 relative z-10"
                    >
                      <div className="flex items-start justify-between border-b border-white/5 pb-4">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#FFC107] font-black px-2 py-0.5 rounded bg-[#FF7A00]/10 border border-[#FF7A00]/25">
                            Page {currentTab.pageNumber}
                          </span>
                          <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mt-1.5">
                            {currentTab.title}
                          </h3>
                        </div>
                        <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-[#FF7A00]">
                          <ActiveIcon className="h-5 w-5" />
                        </div>
                      </div>

                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-medium">
                        {currentTab.description}
                      </p>

                      {/* Highlights lists */}
                      <div className="space-y-3.5 pt-2">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block">
                          Rule Highlights
                        </span>
                        
                        <div className="grid grid-cols-1 gap-2.5">
                          {currentTab.highlights.slice(0, 3).map((hl, i) => {
                            const [title, desc] = hl.split(": ");
                            return (
                              <div key={i} className="flex gap-2.5 items-start p-2 rounded-xl bg-black/40 border border-white/5">
                                <Gamepad2 className="w-4 h-4 text-[#FF7A00] mt-0.5 flex-shrink-0" />
                                <div className="text-[11px] leading-relaxed text-gray-400 font-medium">
                                  <strong className="text-white uppercase font-extrabold mr-1">{title}:</strong>
                                  {desc}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Right Page Footer Call to Action */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between z-10 relative">
                    <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">
                      *Official Charter Article
                    </span>
                    <a
                      href={driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[9px] font-black text-[#FF7A00] hover:text-[#FFC107] uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      <span>Full Playbook</span>
                      <ExternalLink className="w-3 h-3 stroke-[2.5px]" />
                    </a>
                  </div>

                </div>

              </div>

              {/* Realistic Page Shadow Underlay */}
              <div className="absolute -bottom-4 inset-x-8 h-4 bg-black/80 blur-xl z-0 pointer-events-none rounded-full" />
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}
