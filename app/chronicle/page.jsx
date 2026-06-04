"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import NewsletterComponent from "@/components/ThePodium";
import ConstitutionSection from "@/components/ConstitutionSection";
import TenureReportModal from "@/components/TenureReportModal";
import podiumBG from "@/assets/PodiumBG.jpeg";

// Import core leadership images
// (using direct ImageKit URLs in component)

import { Users, MapPin, Award, Trophy, Star, ChevronRight, Eye, Calendar, ChevronDown, Scroll } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tenureReportsData = {
  "2026-27": {
    yearLabel: "2026-27",
    title: "TENURE 2026 – 27",
    subtitle: "Upcoming Tenure",
    isCurrent: false,
    description: "The upcoming tenure of The Sportify Society. Core council members, strategic plans, and execution frameworks will be established at the beginning of the academic cycle.",
    metrics: [
      { label: "Members", value: "—", icon: "users" },
      { label: "Cities", value: "—", icon: "map-pin" },
      { label: "Women %", value: "—", icon: "award" },
      { label: "Events", value: "—", icon: "trophy" }
    ],
    leaders: [
      {
        name: "To Be Appointed",
        position: "Secretary",
        image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='130' viewBox='0 0 100 130'><rect width='100%' height='100%' fill='%230f172a'/><circle cx='50' cy='50' r='20' fill='%231e293b'/><path d='M20 110 Q50 80 80 110' fill='%231e293b'/></svg>",
        description: "The incoming Secretary of the core council."
      },
      {
        name: "To Be Appointed",
        position: "Deputy Secretary",
        image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='130' viewBox='0 0 100 130'><rect width='100%' height='100%' fill='%230f172a'/><circle cx='50' cy='50' r='20' fill='%231e293b'/><path d='M20 110 Q50 80 80 110' fill='%231e293b'/></svg>",
        description: "The incoming Deputy Secretary of the core council."
      }
    ],
    isSkeleton: true
  },
  "2025-26": {
    yearLabel: "2025-26",
    title: "TENURE 2025 – 26",
    subtitle: "The Expansion Year",
    isCurrent: true,
    description: "The tenure of The Sportify Society from October 12, 2025, to June 2026 was marked by structural reforms, strategic expansion, and increased inclusivity. It scaled active student membership to over 700, launched key verticals like SPORTIFY HER, and expanded the physical meetup presence across 30+ cities in India.",
    metrics: [
      { label: "Members", value: "745+", icon: "users" },
      { label: "Cities", value: "30+", icon: "map-pin" },
      { label: "Women %", value: "24.2%", icon: "award" },
      { label: "Events", value: "12+", icon: "trophy" }
    ],
    leaders: [
      {
        name: "Aman Sagar",
        position: "Secretary",
        image: "https://ik.imagekit.io/meth/AmanSagar.png?updatedAt=1762873838881",
        description: "Leading the strategic execution, structural transition, and overall governance of the society."
      },
      {
        name: "Krish Gupta",
        position: "Deputy Secretary",
        image: "https://ik.imagekit.io/meth/Krish%20Gupta.png?updatedAt=1762873851641",
        description: "Spearheading regional expansion, offline chapters, sports meetups, and female inclusion initiatives."
      }
    ]
  }
};

export default function ChroniclePage() {
  const [activeSection, setActiveSection] = useState("tenure");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTenure, setSelectedTenure] = useState("2025-26");
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const tenureRef = useRef(null);
  const newsletterRef = useRef(null);
  const constitutionRef = useRef(null);

  const activeReport = tenureReportsData[selectedTenure] || tenureReportsData["2025-26"];

  // Scroll handler to highlight active sub-nav item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header/navbar

      const tenureTop = tenureRef.current?.offsetTop || 0;
      const newsletterTop = newsletterRef.current?.offsetTop || Infinity;
      const constitutionTop = constitutionRef.current?.offsetTop || Infinity;

      if (scrollPosition >= constitutionTop - 100) {
        setActiveSection("constitution");
      } else if (scrollPosition >= newsletterTop - 100) {
        setActiveSection("newsletter");
      } else {
        setActiveSection("tenure");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hash route scroll listener
  useEffect(() => {
    if (window.location.hash === "#constitution") {
      setTimeout(() => {
        scrollToSection("constitution");
      }, 500);
    }
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    let targetRef;
    if (sectionId === "tenure") {
      targetRef = tenureRef;
    } else if (sectionId === "newsletter") {
      targetRef = newsletterRef;
    } else if (sectionId === "constitution") {
      targetRef = constitutionRef;
    }
    if (targetRef && targetRef.current) {
      const topOffset = targetRef.current.offsetTop - 100;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  const openReport = (tenure) => {
    setSelectedTenure(tenure);
    setModalOpen(true);
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-black via-[#121420] to-black text-white selection:bg-[#ff9a00]/30 selection:text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.85)), url(${podiumBG.src})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-20">
        
        {/* Page Header */}
        <div className="text-center mt-12 mb-8 space-y-4">
          <div className="inline-flex items-center justify-center p-2.5 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full border border-orange-500/20 mb-2">
            <Star className="h-6 w-6 text-[#ff9a00] animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            SPORTIFY{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffaa00] to-[#ffe808]">
              CHRONICLE
            </span>
          </h1>
          <p className="text-gray-400 text-sm md:text-md max-w-xl mx-auto font-medium">
            A record of our leadership, achievements, events and publications through the years.
          </p>
        </div>

        {/* Floating Sub-Navigation Menu */}
        <div className="sticky top-20 z-40 flex justify-center mb-16 px-2">
          <div className="bg-[#0b0f1d]/75 backdrop-blur-lg border border-gray-900 rounded-2xl p-1 md:p-1.5 shadow-2xl flex space-x-1 sm:space-x-1.5 max-w-full md:max-w-xl lg:max-w-2xl">
            <button
              onClick={() => scrollToSection("tenure")}
              className={`flex items-center space-x-1.5 sm:space-x-2 py-2 px-2.5 sm:py-2.5 sm:px-4 md:px-6 rounded-xl text-[10px] sm:text-xs md:text-sm font-semibold transition-all duration-300 shrink-0 ${
                activeSection === "tenure"
                  ? "bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 text-[#ff9a00] shadow-[0_0_15px_rgba(255,154,0,0.1)]"
                  : "text-gray-400 hover:text-white border border-transparent hover:bg-gray-900/30"
              }`}
            >
              <Users className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>Tenures<span className="hidden sm:inline"> Reports</span></span>
            </button>
            <button
              onClick={() => scrollToSection("newsletter")}
              className={`flex items-center space-x-1.5 sm:space-x-2 py-2 px-2.5 sm:py-2.5 sm:px-4 md:px-6 rounded-xl text-[10px] sm:text-xs md:text-sm font-semibold transition-all duration-300 shrink-0 ${
                activeSection === "newsletter"
                  ? "bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 text-[#ff9a00] shadow-[0_0_15px_rgba(255,154,0,0.1)]"
                  : "text-gray-400 hover:text-white border border-transparent hover:bg-gray-900/30"
              }`}
            >
              <Trophy className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>The Podium<span className="hidden sm:inline"> Newsletter</span></span>
            </button>
            <button
              onClick={() => scrollToSection("constitution")}
              className={`flex items-center space-x-1.5 sm:space-x-2 py-2 px-2.5 sm:py-2.5 sm:px-4 md:px-6 rounded-xl text-[10px] sm:text-xs md:text-sm font-semibold transition-all duration-300 shrink-0 ${
                activeSection === "constitution"
                  ? "bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 text-[#ff9a00] shadow-[0_0_15px_rgba(255,154,0,0.1)]"
                  : "text-gray-400 hover:text-white border border-transparent hover:bg-gray-900/30"
              }`}
            >
              <Scroll className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>Constitution<span className="hidden sm:inline"> (Sportify)</span></span>
            </button>
          </div>
        </div>

        {/* Section 1: Tenure Reports */}
        <section ref={tenureRef} className="space-y-8 scroll-mt-28 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-900 pb-4">
            <div>
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold flex items-center space-x-2 tracking-tight">
                  <Users className="h-6 w-6 text-[#ff9a00]" />
                  <span>TENURE REPORTS</span>
                </h2>

                {/* Year Dropdown Selector */}
                <div className="relative">
                  <button
                    onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-950 border border-gray-800 rounded-xl text-xs text-white font-bold tracking-wider hover:border-orange-500/30 transition-all duration-300 focus:outline-none"
                  >
                    <Calendar size={12} className="text-[#ff5a00]" />
                    <span>{selectedTenure} TENURE</span>
                    <ChevronDown size={12} className="text-gray-400" />
                  </button>

                  <AnimatePresence>
                    {isYearDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        className="absolute left-0 mt-2 min-w-[150px] bg-gray-950 border border-gray-800 rounded-xl p-1 shadow-2xl z-[100]"
                      >
                        {Object.keys(tenureReportsData).map((year) => (
                          <button
                            key={year}
                            onClick={() => {
                              setSelectedTenure(year);
                              setIsYearDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                              selectedTenure === year ? "bg-orange-500/20 text-[#ffce00]" : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <span>{year} Tenure</span>
                            {selectedTenure === year && <div className="w-1 h-1 rounded-full bg-[#ffce00] shadow-[0_0_6px_#ffce00]" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Explore the annual reports and leadership teams that shaped The Sportify Society.
              </p>
            </div>
            
            {!activeReport.isSkeleton && (
              <button
                onClick={() => openReport(selectedTenure)}
                className="mt-4 md:mt-0 flex items-center space-x-1.5 text-xs font-bold text-gray-400 hover:text-white transition-all duration-300"
              >
                <span>View Tenure Report</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Full-width Layout (Matching Newsletter block format) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Panel: Leadership Team (Secretary & Deputy Secretary) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              
              {activeReport.leaders.map((leader, idx) => (
                <div key={idx} className="backdrop-blur-md rounded-3xl p-6 border border-gray-900 bg-gray-900/40 hover:border-gray-800 transition-all duration-300 flex items-center space-x-6">
                  <div className="relative w-28 h-36 md:w-32 md:h-40 rounded-2xl overflow-hidden border-2 border-[#ff9a00]/30 shadow-[0_0_15px_rgba(255,154,0,0.1)] bg-slate-900 shrink-0">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 768px) 112px, 128px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-[#ffaa44] font-extrabold bg-[#ff9a00]/10 px-2.5 py-1 rounded-md border border-[#ff9a00]/20 inline-block">
                      {leader.position}
                    </span>
                    <h3 className="text-lg md:text-xl font-extrabold text-white">
                      {leader.name}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {leader.description}
                    </p>
                  </div>
                </div>
              ))}

            </div>

            {/* Right Panel: Tenure Overview, Metrics, and Button */}
            <div className="lg:col-span-7 bg-[#070b14]/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border-2 border-[#ff9a00] shadow-[0_0_30px_rgba(255,154,0,0.06)] hover:border-[#ff9a00]/85 transition-all duration-500 flex flex-col justify-between gap-6">
              
              {/* Header block */}
              <div className="flex items-center justify-between border-b border-gray-900 pb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight uppercase">
                    {activeReport.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm italic font-medium tracking-wide mt-0.5">
                    {activeReport.subtitle}
                  </p>
                </div>
                {activeReport.isCurrent && (
                  <span className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider shadow-md">
                    CURRENT
                  </span>
                )}
              </div>

              {/* Brief Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {activeReport.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
                {activeReport.metrics.map((metric, idx) => {
                  let IconComponent = Users;
                  if (metric.icon === "map-pin") IconComponent = MapPin;
                  else if (metric.icon === "award") IconComponent = Award;
                  else if (metric.icon === "trophy") IconComponent = Trophy;

                  return (
                    <div key={idx} className="bg-black/20 border border-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2 hover:border-gray-800 transition-all duration-300">
                      <div className="p-1.5 bg-[#ff9a00]/5 rounded-lg border border-[#ff9a00]/10">
                        <IconComponent className="h-5 w-5 text-[#ff9a00]" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-lg md:text-xl font-extrabold text-white">{metric.value}</div>
                        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">{metric.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View Button */}
              {activeReport.isSkeleton ? (
                <button
                  disabled
                  className="w-full py-3.5 px-6 rounded-xl bg-gray-900/50 border border-gray-800/80 text-gray-500 font-extrabold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-not-allowed opacity-60"
                >
                  <span>Report Coming Soon</span>
                </button>
              ) : (
                <button
                  onClick={() => openReport(selectedTenure)}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black font-extrabold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_4px_25px_rgba(234,88,12,0.15)] hover:shadow-[0_4px_30px_rgba(234,88,12,0.3)] cursor-pointer"
                >
                  <span>View Full Report</span>
                  <ChevronRight className="h-4 w-4 stroke-[3px]" />
                </button>
              )}

            </div>

          </div>
        </section>

        {/* Section 2: The Podium Newsletter */}
        <section ref={newsletterRef} className="space-y-8 scroll-mt-28 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-900 pb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center space-x-2 tracking-tight">
                <Trophy className="h-6 w-6 text-[#ff9a00]" />
                <span>THE PODIUM NEWSLETTER</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Your monthly digest of everything sports. Read match reports, interviews, and features.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.querySelector('[ref="carouselRef"]') || document.getElementById("carousel-head");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              id="carousel-head"
              className="mt-4 md:mt-0 flex items-center space-x-1.5 text-xs font-bold text-gray-400 hover:text-white transition-all duration-300"
            >
              <span>Browse All Editions</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <NewsletterComponent />
        </section>

        {/* Section 3: Sportify Constitution */}
        <section id="constitution" ref={constitutionRef} className="space-y-8 scroll-mt-28 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-900 pb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center space-x-2 tracking-tight">
                <Scroll className="h-6 w-6 text-[#ff9a00]" />
                <span>SPORTIFY CONSTITUTION</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Official rules, roles, and administrative bylaws of the Sportify Sports Society.
              </p>
            </div>
          </div>

          <ConstitutionSection />
        </section>

      </div>

      <Footer />

      {/* Interactive Report Detail Modal */}
      <TenureReportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        tenure={selectedTenure}
      />
    </main>
  );
}
