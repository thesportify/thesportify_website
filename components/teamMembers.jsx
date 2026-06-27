import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Flame,
} from "lucide-react";
import Image from "next/image";

// Bio data mappings for core and team members
const MEMBER_BIOS = {
  "Aman Sagar": "Leading the strategic execution, structural transition, and overall governance of the society.",
  "Krish Gupta": "Spearheading regional expansion, offline chapters, sports meetups, and female inclusion initiatives.",
  "Anshul Sati": "Coordinating core operations, inter-branch communication, and administrative tasks.",
  "Jahanvi Singh": "Overseeing coordinates and leading the Women's Wing to promote inclusion and female athleticism.",
  "Pratishta Mishra": "Coordinating outreach and supporting leadership of the Women's Wing initiatives.",
  "Lata": "Driving female participation and organizing targeted sports initiatives to build a diverse community.",
  "Pavithra C": "Executing female inclusion meetups and community sports programs.",
  "Varad Rajadhyax": "Orchestrating national meetups, event logistics, and offline tournament operations.",
  "Aryan Kumar Singh": "Coordinating regional operations, match setups, and tournament logistics.",
  "Nidhish Kumar": "Assisting in turf setups, sport meetups, and local event executions.",
  "Ritesh Kumar Maurya": "Supporting event logistics, scoreboard operations, and venue management.",
  "Methelesh Kumar Rattu": "Directing the tech stack, web systems, and data analytics pipelines for the society.",
  "Nikhil Kumar Shah": "Technical Architect & Web Ops, managing site reliability, integrations, and operational tools.",
  "Sovit Kumar": "Engineering digital platforms, web tools, and interactive dashboards.",
  "Ansh Chauhan": "Managing public relations, student outreach, and community engagement.",
  "Sarthak Sharma": "Leading outreach strategy, sponsor relations, and external communications.",
  "Pratham": "Developing outreach campaigns and building university-wide sports networks.",
  "Ayush Kumar Thakur": "Coordinating social media campaigns and public announcements.",
  "Krishna Gupta": "Assisting in public relations and community feedback channels.",
  "Satveer Singh Shekhawat": "Managing regional outreach and chapter announcements.",
  "Deepak Kumar Gupta": "Leading the design system, social media branding, and creative multimedia assets.",
  "Saurabh": "Crafting visual identities, banners, and digital flyers for tournaments.",
  "Ashwin Verma": "Creating video recaps, highlight reels, and digital media content.",
  "Ansh Kumar": "Designing promotional assets and graphics for event marketing.",
  "Akshay Singh": "Editing photographs, handling media coverages, and poster designs."
};

const getBio = (name, category) => {
  if (MEMBER_BIOS[name]) return MEMBER_BIOS[name];
  switch (category) {
    case "Tech & Analytics":
      return "Engineering digital experiences, analytics dashboards, and interactive platforms for the Sportify community.";
    case "Secretaries":
      return "Assisting the core council in administrative planning and organizational execution.";
    case "Women's Wing":
      return "Driving female participation and organizing targeted sports initiatives to build a diverse community.";
    case "Events & Operations":
      return "Executing logistics, match setups, and coordination of tournaments and sports meetups.";
    case "PR & Outreach":
      return "Managing public relations, community engagement, brand partnerships, and social communication.";
    case "Design & Media":
      return "Crafting visual identities, graphic assets, and digital media content to represent the Sportify brand.";
    default:
      return "Dedicated member of The Sportify Society, helping spread the flame of sports nationwide.";
  }
};

export default function TeamMembers({ teamMembersByYear = {} }) {
  const years = Object.keys(teamMembersByYear).sort((a, b) => b.localeCompare(a));
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const departments = [
    "Secretaries",
    "Women's Wing",
    "Events & Operations",
    "Tech & Analytics",
    "PR & Outreach",
    "Design & Media",
  ];

  const [selectedDept, setSelectedDept] = useState("Secretaries");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);

  // Filter members by selected year
  const allYearMembers = teamMembersByYear[selectedYear] || [];

  // Filter members by active department
  const filteredMembers = allYearMembers.filter(
    (m) => m.category === selectedDept
  );

  // Reset active carousel index when department or year changes
  useEffect(() => {
    setActiveIndex(0);
    setIsDeptDropdownOpen(false);
  }, [selectedDept, selectedYear]);

  const len = filteredMembers.length;

  const handlePrev = () => {
    if (len === 0) return;
    setActiveIndex((prev) => (prev === 0 ? len - 1 : prev - 1));
  };

  const handleNext = () => {
    if (len === 0) return;
    setActiveIndex((prev) => (prev === len - 1 ? 0 : prev + 1));
  };

  // Circular indices for 3D Cover Flow slots
  const leftIndex = len > 1 ? (activeIndex - 1 + len) % len : null;
  const rightIndex = len > 2 ? (activeIndex + 1) % len : (len === 2 && activeIndex === 0 ? 1 : null);

  const centerMember = len > 0 ? filteredMembers[activeIndex] : null;
  const leftMember = leftIndex !== null ? filteredMembers[leftIndex] : null;
  const rightMember = rightIndex !== null ? filteredMembers[rightIndex] : null;

  return (
    <div className="w-full text-white bg-transparent">
      
      {/* Year Selection & Section Title bar */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-[#FF7A00] animate-pulse" />
          <span className="text-sm font-black uppercase tracking-widest text-[#FFC107] font-mono">
            Sportify Roster
          </span>
        </div>

        {/* Year Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0B0B0B] border border-white/10 rounded-xl text-xs text-white font-bold tracking-wider hover:border-orange-500/30 transition-all duration-300 focus:outline-none"
          >
            <Calendar size={12} className="text-[#FF7A00]" />
            <span>{selectedYear} COUNCIL</span>
            <ChevronDown size={12} className="text-gray-400" />
          </button>

          <AnimatePresence>
            {isYearDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 mt-2 min-w-[160px] bg-[#0B0B0B] border border-white/10 rounded-xl p-1 shadow-2xl z-[50]"
              >
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setIsYearDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      selectedYear === year ? "bg-orange-500/20 text-[#FFC107]" : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{year} Council</span>
                    {selectedYear === year && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFC107] shadow-[0_0_6px_#FFC107]" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Department Dropdown selector (visible on lg:hidden) */}
      <div className="lg:hidden relative w-full max-w-[280px] mx-auto mb-8 z-50">
        <button
          onClick={() => setIsDeptDropdownOpen(!isDeptDropdownOpen)}
          className="w-full flex items-center justify-between px-5 py-3 bg-[#0B0B0B]/90 border border-white/10 rounded-2xl text-xs text-white font-extrabold tracking-wider hover:border-orange-500/30 transition-all duration-300 focus:outline-none"
        >
          <span className="text-[#FFC107] uppercase tracking-widest">{selectedDept}</span>
          <ChevronDown 
            size={14} 
            className={`text-gray-400 transition-transform duration-300 ${isDeptDropdownOpen ? "rotate-180" : ""}`} 
          />
        </button>

        <AnimatePresence>
          {isDeptDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="absolute left-0 right-0 mt-2 bg-[#0B0B0B] border border-white/10 rounded-2xl p-1.5 shadow-2xl z-50 overflow-hidden"
            >
              {departments.map((dept) => {
                const isActive = selectedDept === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedDept(dept);
                      setIsDeptDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                      isActive 
                        ? "bg-orange-500/20 text-[#FFC107]" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{dept}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFC107] shadow-[0_0_6px_#FFC107]" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Horizontal Department Navigation Tab Bar (visible on lg:flex) */}
      <div className="hidden lg:flex gap-2.5 mb-10 overflow-x-auto pb-3 pt-1 custom-scrollbar w-full justify-center select-none">
        {departments.map((dept) => {
          const isActive = selectedDept === dept;
          return (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 border focus:outline-none ${
                isActive
                  ? "bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-orange-500/50 text-[#FFC107] shadow-[0_0_20px_rgba(255,122,0,0.15)]"
                  : "bg-black/40 border-white/5 text-gray-400 hover:text-white hover:border-white/10"
              }`}
            >
              {dept}
            </button>
          );
        })}
      </div>

      {centerMember ? (
        <div className="flex flex-col items-center select-none">
          {/* Active Department Team Section Header Title */}
          <h3 className="text-lg md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFC107] uppercase tracking-widest mb-6 flex items-center gap-2 drop-shadow-md">
            <span>{selectedDept} Team</span>
          </h3>

          {/* 3D Cover Flow Carousel Container */}
          <div 
            className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 relative py-8 max-w-5xl mx-auto w-full"
            style={{ perspective: "1200px" }}
          >
            {/* Left circular navigation button */}
            <button
              onClick={handlePrev}
              className="flex-shrink-0 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/45 border border-white/10 text-gray-400 hover:text-white hover:border-[#FF7A00]/50 hover:bg-[#FF7A00]/10 transition-all duration-300 shadow-md focus:outline-none z-40"
              aria-label="Previous Member"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Left Card Slot */}
            <AnimatePresence mode="popLayout">
              {leftMember && (
                <motion.div
                  key={`left-${leftMember.id}`}
                  onClick={handlePrev}
                  initial={{ opacity: 0, rotateY: 35, scale: 0.75 }}
                  animate={{ opacity: 0.45, rotateY: 20, scale: 0.85 }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="hidden sm:block relative w-44 md:w-48 aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-[#0B0B0B]/85 cursor-pointer origin-right select-none shadow-xl hover:opacity-65 transition-opacity"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Image
                    src={leftMember.image || "/placeholder.svg"}
                    alt={leftMember.name}
                    fill
                    sizes="200px"
                    className="object-cover object-top pointer-events-none filter brightness-[0.6]"
                    unoptimized={typeof leftMember.image === "string" && leftMember.image.startsWith("data:")}
                  />
                  {/* Text Overlay for Left Card */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent p-4 pt-10 flex flex-col justify-end text-center pointer-events-none">
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wide truncate">
                      {leftMember.name}
                    </h5>
                    <span className="text-[8px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5 font-mono">
                      {leftMember.position}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Center High-Impact Highlight Card */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`center-${centerMember.id}`}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1.04, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative w-56 sm:w-60 md:w-64 aspect-[3/4] rounded-3xl overflow-hidden border-2 border-[#FF7A00]/50 bg-slate-900 shadow-[0_0_35px_rgba(255,122,0,0.22)] z-30 select-none"
              >
                <Image
                  src={centerMember.image || "/placeholder.svg"}
                  alt={centerMember.name}
                  fill
                  sizes="(max-width: 768px) 240px, 300px"
                  className="object-cover object-top pointer-events-none"
                  unoptimized={typeof centerMember.image === "string" && centerMember.image.startsWith("data:")}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Right Card Slot */}
            <AnimatePresence mode="popLayout">
              {rightMember && (
                <motion.div
                  key={`right-${rightMember.id}`}
                  onClick={handleNext}
                  initial={{ opacity: 0, rotateY: -35, scale: 0.75 }}
                  animate={{ opacity: 0.45, rotateY: -20, scale: 0.85 }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="hidden sm:block relative w-44 md:w-48 aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-[#0B0B0B]/85 cursor-pointer origin-left select-none shadow-xl hover:opacity-65 transition-opacity"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Image
                    src={rightMember.image || "/placeholder.svg"}
                    alt={rightMember.name}
                    fill
                    sizes="200px"
                    className="object-cover object-top pointer-events-none filter brightness-[0.6]"
                    unoptimized={typeof rightMember.image === "string" && rightMember.image.startsWith("data:")}
                  />
                  {/* Text Overlay for Right Card */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 to-transparent p-4 pt-10 flex flex-col justify-end text-center pointer-events-none">
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wide truncate">
                      {rightMember.name}
                    </h5>
                    <span className="text-[8px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5 font-mono">
                      {rightMember.position}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right circular navigation button */}
            <button
              onClick={handleNext}
              className="flex-shrink-0 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-black/45 border border-white/10 text-gray-400 hover:text-white hover:border-[#FF7A00]/50 hover:bg-[#FF7A00]/10 transition-all duration-300 shadow-md focus:outline-none z-40"
              aria-label="Next Member"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Active Center Member Bio Details Underneath Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`details-${centerMember.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-center mt-8 space-y-4 max-w-xl mx-auto px-4 z-10"
            >
              <div className="space-y-1">
                <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide">
                  {centerMember.name}
                </h4>
                <p className="text-[#FFC107] text-[11px] md:text-xs font-black uppercase tracking-widest font-mono">
                  {centerMember.position}
                </p>
              </div>

              <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-md mx-auto font-medium">
                {getBio(centerMember.name, centerMember.category)}
              </p>

              {/* Social links */}
              <div className="flex gap-4 justify-center border-t border-white/5 pt-4" onClick={(e) => e.stopPropagation()}>
                {centerMember.linkedin && (
                  <a
                    href={centerMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#FF7A00] hover:border-orange-500/40 hover:scale-110 shadow-md transition-all duration-300"
                    title="LinkedIn Profile"
                  >
                    <Linkedin size={16} />
                  </a>
                )}
                {centerMember.email && (
                  <a
                    href={`mailto:${centerMember.email}`}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#FF7A00] hover:border-orange-500/40 hover:scale-110 shadow-md transition-all duration-300"
                    title="Send Email"
                  >
                    <Mail size={16} />
                  </a>
                )}
                {centerMember.github && (
                  <a
                    href={centerMember.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#FF7A00] hover:border-orange-500/40 hover:scale-110 shadow-md transition-all duration-300"
                    title="GitHub Profile"
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center text-gray-500 bg-[#0B0B0B]/50 p-8 rounded-2xl border border-white/5">
          No team records found for the selection.
        </div>
      )}
    </div>
  );
}
