"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import NewsletterComponent from "@/components/ThePodium";
import TenureReportModal from "@/components/TenureReportModal";
import podiumBG from "@/assets/PodiumBG.jpeg";

// Import core leadership images
// (using direct ImageKit URLs in component)

import { Users, MapPin, Award, Trophy, Star, ChevronRight, Eye } from "lucide-react";

export default function ChroniclePage() {
  const [activeSection, setActiveSection] = useState("tenure");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTenure, setSelectedTenure] = useState("2025-26");

  const tenureRef = useRef(null);
  const newsletterRef = useRef(null);

  // Scroll handler to highlight active sub-nav item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header/navbar

      const tenureTop = tenureRef.current?.offsetTop || 0;
      const newsletterTop = newsletterRef.current?.offsetTop || Infinity;

      if (scrollPosition >= newsletterTop - 100) {
        setActiveSection("newsletter");
      } else {
        setActiveSection("tenure");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const targetRef = sectionId === "tenure" ? tenureRef : newsletterRef;
    if (targetRef.current) {
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
        <div className="sticky top-20 z-40 flex justify-center mb-16">
          <div className="bg-[#0b0f1d]/75 backdrop-blur-lg border border-gray-900 rounded-2xl p-1.5 shadow-2xl flex space-x-1.5">
            <button
              onClick={() => scrollToSection("tenure")}
              className={`flex items-center space-x-2 py-2.5 px-6 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
                activeSection === "tenure"
                  ? "bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 text-[#ff9a00] shadow-[0_0_15px_rgba(255,154,0,0.1)]"
                  : "text-gray-400 hover:text-white border border-transparent hover:bg-gray-900/30"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Tenure Reports</span>
            </button>
            <button
              onClick={() => scrollToSection("newsletter")}
              className={`flex items-center space-x-2 py-2.5 px-6 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
                activeSection === "newsletter"
                  ? "bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 text-[#ff9a00] shadow-[0_0_15px_rgba(255,154,0,0.1)]"
                  : "text-gray-400 hover:text-white border border-transparent hover:bg-gray-900/30"
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>The Podium Newsletter</span>
            </button>
          </div>
        </div>

        {/* Section 1: Tenure Reports */}
        <section ref={tenureRef} className="space-y-8 scroll-mt-28 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-900 pb-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center space-x-2 tracking-tight">
                <Users className="h-6 w-6 text-[#ff9a00]" />
                <span>TENURE REPORTS</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Explore the annual reports and leadership teams that shaped The Sportify Society.
              </p>
            </div>
            <button
              onClick={() => openReport("2025-26")}
              className="mt-4 md:mt-0 flex items-center space-x-1.5 text-xs font-bold text-gray-400 hover:text-white transition-all duration-300"
            >
              <span>View Latest Report</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Full-width Layout (Matching Newsletter block format) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Panel: Leadership Team (Secretary & Deputy Secretary) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              
              {/* Leader Card 1: Secretary */}
              <div className="backdrop-blur-md rounded-3xl p-6 border border-gray-900 bg-gray-900/40 hover:border-gray-800 transition-all duration-300 flex items-center space-x-6">
                <div className="relative w-28 h-36 md:w-32 md:h-40 rounded-2xl overflow-hidden border-2 border-[#ff9a00]/30 shadow-[0_0_15px_rgba(255,154,0,0.1)] bg-slate-900 shrink-0">
                  <Image
                    src="https://ik.imagekit.io/meth/AmanSagar.png?updatedAt=1762873838881"
                    alt="Aman Sagar"
                    fill
                    sizes="(max-width: 768px) 112px, 128px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-[#ffaa44] font-extrabold bg-[#ff9a00]/10 px-2.5 py-1 rounded-md border border-[#ff9a00]/20 inline-block">
                    Secretary
                  </span>
                  <h3 className="text-lg md:text-xl font-extrabold text-white">
                    Aman Sagar
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Leading the strategic execution, structural transition, and overall governance of the society.
                  </p>
                </div>
              </div>

              {/* Leader Card 2: Deputy Secretary */}
              <div className="backdrop-blur-md rounded-3xl p-6 border border-gray-900 bg-gray-900/40 hover:border-gray-800 transition-all duration-300 flex items-center space-x-6">
                <div className="relative w-28 h-36 md:w-32 md:h-40 rounded-2xl overflow-hidden border-2 border-[#ff9a00]/30 shadow-[0_0_15px_rgba(255,154,0,0.1)] bg-slate-900 shrink-0">
                  <Image
                    src="https://ik.imagekit.io/meth/Krish%20Gupta.png?updatedAt=1762873851641"
                    alt="Krish Gupta"
                    fill
                    sizes="(max-width: 768px) 112px, 128px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-[#ffaa44] font-extrabold bg-[#ff9a00]/10 px-2.5 py-1 rounded-md border border-[#ff9a00]/20 inline-block">
                    Deputy Secretary
                  </span>
                  <h3 className="text-lg md:text-xl font-extrabold text-white">
                    Krish Gupta
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Spearheading regional expansion, offline chapters, sports meetups, and female inclusion initiatives.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Panel: Tenure Overview, Metrics, and Button */}
            <div className="lg:col-span-7 bg-[#070b14]/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border-2 border-[#ff9a00] shadow-[0_0_30px_rgba(255,154,0,0.06)] hover:border-[#ff9a00]/85 transition-all duration-500 flex flex-col justify-between gap-6">
              
              {/* Header block */}
              <div className="flex items-center justify-between border-b border-gray-900 pb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                    TENURE 2025 – 26
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm italic font-medium tracking-wide mt-0.5">
                    The Expansion Year
                  </p>
                </div>
                <span className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider shadow-md">
                  CURRENT
                </span>
              </div>

              {/* Brief Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                The tenure of The Sportify Society from October 12, 2025, to June 2026 was marked by structural reforms, strategic expansion, and increased inclusivity. It scaled active student membership to over 700, launched key verticals like SPORTIFY HER, and expanded the physical meetup presence across 30+ cities in India.
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
                
                {/* Metric 1 */}
                <div className="bg-black/20 border border-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2 hover:border-gray-800 transition-all duration-300">
                  <div className="p-1.5 bg-[#ff9a00]/5 rounded-lg border border-[#ff9a00]/10">
                    <Users className="h-5 w-5 text-[#ff9a00]" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-lg md:text-xl font-extrabold text-white">745+</div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">Members</div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-black/20 border border-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2 hover:border-gray-800 transition-all duration-300">
                  <div className="p-1.5 bg-[#ff9a00]/5 rounded-lg border border-[#ff9a00]/10">
                    <MapPin className="h-5 w-5 text-[#ff9a00]" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-lg md:text-xl font-extrabold text-white">30+</div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">Cities</div>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-black/20 border border-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2 hover:border-gray-800 transition-all duration-300">
                  <div className="p-1.5 bg-[#ff9a00]/5 rounded-lg border border-[#ff9a00]/10">
                    <Award className="h-5 w-5 text-[#ff9a00]" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-lg md:text-xl font-extrabold text-white">24.2%</div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">Women %</div>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-black/20 border border-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-2 hover:border-gray-800 transition-all duration-300">
                  <div className="p-1.5 bg-[#ff9a00]/5 rounded-lg border border-[#ff9a00]/10">
                    <Trophy className="h-5 w-5 text-[#ff9a00]" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-lg md:text-xl font-extrabold text-white">12+</div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">Events</div>
                  </div>
                </div>

              </div>

              {/* View Button */}
              <button
                onClick={() => openReport("2025-26")}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black font-extrabold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_4px_25px_rgba(234,88,12,0.15)] hover:shadow-[0_4px_30px_rgba(234,88,12,0.3)] cursor-pointer"
              >
                <span>View Full Report</span>
                <ChevronRight className="h-4 w-4 stroke-[3px]" />
              </button>

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
