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
  Download, 
  ArrowRight,
  BookOpen,
  Target,
  Gamepad2,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import sportsBG from "../assets/stadium_glow_bg.png";

const playbookData = [
  {
    id: "playbook",
    label: "Core Playbook",
    icon: Flame,
    title: "Spreading the Flame of Sportsmanship",
    subtitle: "Vision, Mission & Goals",
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
  const [activeTab, setActiveTab] = useState("playbook");
  const currentTab = playbookData.find((tab) => tab.id === activeTab) || playbookData[0];
  const ActiveIcon = currentTab.icon;

  const driveLink = "https://drive.google.com/file/d/1Rc6Kc4KT3hvOxmQdercUmf5RdafTsypW/view?usp=sharing";
  const pdfPath = "/Sportify's Constitution.pdf";

  return (
    <section 
      className="relative py-24 bg-cover bg-center overflow-hidden px-4 md:px-8 border-y border-gray-900/50"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.45)), url(${sportsBG.src})`,
      }}
    >
      {/* Dynamic sports graphics overlay */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.8) 100%) pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full border border-orange-500/20 mb-2 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
            <Trophy className="h-6 w-6 text-orange-400 animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
            THE SPORTIFY{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffaa00] to-[#ffe808] drop-shadow-[0_2px_10px_rgba(255,90,0,0.15)]">
              PLAYBOOK
            </span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Rules, captaincy guidelines, and the core sports code adopted to govern the Official Sports Society of the IIT Madras BS Degree Programme.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Tabs Selector */}
          <div className="lg:col-span-4 flex flex-col space-y-2.5">
            {/* Playbook Header Label & Mobile Scroll Hint */}
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[10px] lg:text-xs font-black text-gray-500 uppercase tracking-widest block">
                Playbook Sections
              </span>
              <span className="text-[9px] font-black text-[#ffaa00] uppercase tracking-widest flex items-center gap-1 lg:hidden animate-pulse">
                Swipe for more ➔
              </span>
            </div>
            
            <div className="relative w-full">
              {/* Fade out mask indicator on mobile scroll container right side */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/85 to-transparent pointer-events-none lg:hidden z-20" />
              
              <div className="flex flex-row lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3 overflow-x-auto no-scrollbar pb-3 lg:pb-0 max-w-[90vw] lg:max-w-none scroll-smooth z-10 relative">
                {playbookData.map((tab) => {
                  const TabIcon = tab.icon;
                  const isActive = tab.id === activeTab;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-3 border rounded-xl py-3 px-4 transition-all duration-300 cursor-pointer shrink-0 lg:w-full lg:text-left lg:px-5 lg:py-4.5 lg:rounded-2xl lg:space-x-4 ${
                        isActive
                          ? "bg-gradient-to-r from-[#ff5a00]/15 to-[#ffaa00]/15 border-orange-500/35 text-orange-400 shadow-[0_0_20px_rgba(234,88,12,0.08)]"
                          : "bg-[#0b0f19]/60 backdrop-blur-md border-gray-900/60 hover:border-gray-800/80 hover:bg-gray-900/25 text-gray-400 hover:text-gray-200"
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors lg:p-2.5 lg:rounded-xl ${isActive ? "bg-orange-500/20 text-orange-400" : "bg-black/50 text-gray-500"}`}>
                        <TabIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                      </div>
                      <div>
                        <span className="hidden lg:block text-[10px] text-gray-500 uppercase tracking-widest font-black leading-none mb-1.5">
                          {tab.id === "playbook" ? "PREAMBLE" : "RULES"}
                        </span>
                        <span className="text-xs lg:text-sm font-extrabold block">
                          {tab.label}
                        </span>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activePlaybookIndicator"
                          className="hidden lg:block w-1.5 h-6 bg-gradient-to-b from-[#ff5a00] to-[#ffaa00] rounded-full ml-auto"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: Tab Content Display */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-[#070b14]/85 backdrop-blur-md border-2 border-gray-900 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between min-h-0 lg:min-h-[460px] hover:border-gray-800 transition-all duration-300"
              >
                <div className="space-y-6">
                  {/* Title & Icon Header */}
                  <div className="flex items-start justify-between border-b border-gray-900 pb-5">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#ffaa44] font-black px-2.5 py-1 rounded-md bg-[#ff9a00]/10 border border-[#ff9a00]/20">
                          {currentTab.id}
                        </span>
                        {activeTab === "playbook" && (
                          <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider shadow-md flex items-center gap-1">
                            <Sparkles className="h-2.5 w-2.5" />
                            <span>JOY OF SPORTS</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase">
                        {currentTab.title}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm italic font-medium tracking-wide mt-0.5">
                        {currentTab.subtitle}
                      </p>
                    </div>
                    
                    <div className="p-3.5 bg-gradient-to-br from-[#ff5a00]/10 to-[#ffaa00]/10 rounded-2xl border border-orange-500/20 text-orange-400 shrink-0 shadow-[0_0_10px_rgba(249,115,22,0.05)]">
                      <ActiveIcon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                    {currentTab.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest">
                      Rules & Strategies
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentTab.highlights.map((highlight, index) => {
                        const [title, desc] = highlight.split(": ");
                        return (
                          <div 
                            key={index}
                            className="p-4 rounded-2xl bg-black/40 border border-gray-950/80 hover:border-orange-500/20 transition-all duration-300 flex items-start space-x-3 group"
                          >
                            <Gamepad2 className="h-4.5 w-4.5 text-orange-500/60 mt-0.5 shrink-0 group-hover:text-orange-400 transition-colors" />
                            <div className="text-xs leading-relaxed text-gray-400">
                              <strong className="text-gray-200 block font-extrabold mb-0.5 group-hover:text-white transition-colors">
                                {title}
                              </strong>
                              {desc}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Explorer Call to Action */}
                <div className="mt-8 pt-6 border-t border-gray-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <span className="text-[11px] text-gray-500 font-semibold italic">
                    *Refer to the official document for final articles and amendments.
                  </span>
                  
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/chronicle#constitution"
                      className="text-xs font-black text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-1.5 uppercase tracking-wider"
                    >
                      <span>Playbook Viewer</span>
                      <ArrowRight className="h-3.5 w-3.5 stroke-[2.5px]" />
                    </Link>
                    
                    <a
                      href={driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-5 rounded-xl bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black font-black text-xs tracking-wider uppercase transition-all duration-300 flex items-center space-x-1.5 shadow-[0_4px_20px_rgba(234,88,12,0.15)] cursor-pointer"
                    >
                      <ExternalLink className="h-3.5 w-3.5 stroke-[3px]" />
                      <span>Full Playbook</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
