import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Calendar,
  Flame,
  User,
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

  // Accordion open state: only one department remains open at a time. Secretaries is open by default
  const [activeDept, setActiveDept] = useState("Secretaries");

  const toggleDept = (dept) => {
    const nextDept = activeDept === dept ? null : dept;
    setActiveDept(nextDept);

    // Auto-select department lead/first member on accordion change
    if (nextDept) {
      const deptMembers = allYearMembers.filter((m) => m.category === nextDept);
      if (deptMembers.length > 0) {
        setSelectedMember(deptMembers[0]);
      }

      // Auto-scroll selected department header into focus
      setTimeout(() => {
        const headerEl = document.getElementById(`dept-header-${nextDept.replace(/\s+/g, "-")}`);
        if (headerEl) {
          headerEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 100);
    }
  };

  // Keep track of the active selected member
  const [selectedMember, setSelectedMember] = useState(null);
  const detailPanelRef = useRef(null);

  // Filter members by selected year
  const allYearMembers = teamMembersByYear[selectedYear] || [];

  // Set default active member when year changes
  useEffect(() => {
    if (allYearMembers.length > 0) {
      setSelectedMember(allYearMembers[0]);
    } else {
      setSelectedMember(null);
    }
  }, [selectedYear, allYearMembers]);

  // Expand the department accordion of the clicked member
  const handleSelectMember = (member, dept) => {
    setSelectedMember(member);
    // Smooth scroll detailed panel into view on mobile
    if (window.innerWidth < 768 && detailPanelRef.current) {
      detailPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full text-white bg-transparent">
      
      {/* Year Selection bar */}
      <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-[#FF7A00] animate-pulse" />
          <span className="text-sm font-black uppercase tracking-widest text-[#FFC107] font-mono">
            Sportify Roster
          </span>
        </div>

        {/* Desktop / Mobile Dropdown */}
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

      {allYearMembers.length > 0 ? (
        /* Double Column Split-Pane Directory */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Large High-Impact Highlight Card */}
          <div ref={detailPanelRef} className="md:col-span-5 relative">
            <AnimatePresence mode="wait">
              {selectedMember && (
                <motion.div
                  key={selectedMember.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-[#0B0B0B]/80 border border-white/10 rounded-[32px] p-6 md:p-8 flex flex-col justify-between items-center text-center shadow-2xl relative overflow-hidden backdrop-blur-md"
                >
                  {/* Subtle background glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF7A00]/5 rounded-full blur-[80px] pointer-events-none" />

                  {/* Photo Frame (Widescreen styling with premium custom hover classes) */}
                  <div className="relative w-full aspect-[4/5] max-w-[280px] rounded-3xl overflow-hidden border-2 border-white/10 bg-slate-900 group shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#FF7A00]/80 hover:shadow-[0_0_40px_rgba(255,122,0,0.25)]">
                    <Image
                      src={selectedMember.image || "/placeholder.svg"}
                      alt={selectedMember.name}
                      fill
                      sizes="(max-width: 768px) 280px, 320px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      unoptimized={typeof selectedMember.image === "string" && selectedMember.image.startsWith("data:")}
                      priority
                    />
                  </div>

                  {/* Details Information */}
                  <div className="mt-6 space-y-3 z-10 w-full">
                    <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-[#FFC107] font-black bg-[#FF7A00]/10 px-3 py-1 rounded-md border border-[#FF7A00]/25 inline-block">
                      {selectedMember.position}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide">
                      {selectedMember.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-medium">
                      {getBio(selectedMember.name, selectedMember.category)}
                    </p>
                  </div>

                  {/* Social Buttons Block */}
                  <div className="flex gap-4 mt-6 border-t border-white/5 pt-6 w-full justify-center z-10">
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#FF7A00] hover:border-orange-500/40 hover:scale-110 shadow-md transition-all duration-300"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="h-4.5 w-4.5" />
                      </a>
                    )}
                    {selectedMember.email && (
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#FF7A00] hover:border-orange-500/40 hover:scale-110 shadow-md transition-all duration-300"
                        title="Send Email"
                      >
                        <Mail className="h-4.5 w-4.5" />
                      </a>
                    )}
                    {selectedMember.github && (
                      <a
                        href={selectedMember.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#FF7A00] hover:border-orange-500/40 hover:scale-110 shadow-md transition-all duration-300"
                        title="GitHub Profile"
                      >
                        <Github className="h-4.5 w-4.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Vertical Roster organized by Departments */}
          <div className="md:col-span-7 space-y-4">
            {departments.map((dept) => {
              const deptMembers = allYearMembers.filter(
                (m) => m.category === dept
              );
              
              if (deptMembers.length === 0) return null;

              const isExpanded = activeDept === dept;

              return (
                <div
                  key={dept}
                  className="bg-[#0B0B0B]/40 border border-white/5 rounded-2xl overflow-hidden shadow-lg transition-colors hover:border-white/10"
                >
                  {/* Department Heading Button */}
                  <button
                    id={`dept-header-${dept.replace(/\s+/g, "-")}`}
                    onClick={() => toggleDept(dept)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left bg-[#0B0B0B]/60 transition-colors focus:outline-none scroll-mt-24"
                  >
                    <span className="text-sm font-black uppercase tracking-widest text-[#FF7A00]">
                      {dept}
                    </span>
                    <span className="text-gray-400 transition-transform duration-300">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  {/* Accordion Member List */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-white/5"
                      >
                        <div className="p-3 space-y-1.5">
                          {deptMembers.map((member) => {
                            const isSelected = selectedMember?.id === member.id;
                            return (
                              <div
                                key={member.id}
                                onClick={() => handleSelectMember(member, dept)}
                                className={`w-full px-4 py-3 flex items-center justify-between rounded-xl cursor-pointer transition-all duration-300 group hover:-translate-y-[2px] ${
                                  isSelected
                                    ? "bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/40 shadow-[0_0_15px_rgba(255,122,0,0.12)]"
                                    : "bg-transparent border border-transparent hover:border-white/5 hover:bg-white/5"
                                }`}
                              >
                                <div className="flex items-center space-x-4">
                                  {/* Small round avatar */}
                                  <div className={`relative w-10 h-10 rounded-full overflow-hidden border transition-all duration-300 ${
                                    isSelected ? "border-[#FFC107]" : "border-white/10 group-hover:border-orange-500/40"
                                  }`}>
                                    {member.image ? (
                                      <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="40px"
                                        className="object-cover object-top"
                                        unoptimized={typeof member.image === "string" && member.image.startsWith("data:")}
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                        <User className="h-4 w-4 text-gray-500" />
                                      </div>
                                    )}
                                  </div>

                                  <div>
                                    <h4 className={`text-sm font-bold transition-colors ${
                                      isSelected ? "text-white" : "text-gray-300 group-hover:text-white"
                                    }`}>
                                      {member.name}
                                    </h4>
                                    <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                                      {member.position}
                                    </span>
                                  </div>
                                </div>

                                <ChevronRight
                                  size={14}
                                  className={`transition-all duration-300 ${
                                    isSelected
                                      ? "text-[#FFC107] translate-x-0"
                                      : "text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1"
                                  }`}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      ) : (
        <div className="text-center text-gray-500 bg-[#0B0B0B]/50 p-8 rounded-2xl border border-white/5">
          No team records found for the selection.
        </div>
      )}
    </div>
  );
}
