"use client";

import { useEffect, useState } from "react";
import { X, Award, Star, Trophy, Users, Compass, CheckCircle, ExternalLink, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reportData = {
  "2025-26": {
    title: "Tenure Report 2025–26",
    subtitle: "The Expansion Year",
    period: "Oct 2025 – Jun 2026",
    leadership: "Aman Sagar & Krish Gupta",
    reportUrl: "https://drive.google.com/file/d/1EBeQzusvg8N1N00m6_32gppdhUXqnuXJ/view?usp=sharing",
    sections: [
      {
        id: "overview",
        title: "Overview",
        icon: Award,
        content: "Sportify transformed from a 220-member group into a 745+ member ecosystem with 24.2% female representation, expanding its offline presence to 30+ cities and establishing itself as the premier sports body of the IIT Madras BS Degree Program."
      },
      {
        id: "key-highlights",
        title: "Key Highlights",
        icon: Star,
        isList: true,
        items: [
          "Active membership scaled from 220+ to 745+",
          "Female representation grew from 3% to 24.2%",
          "Regional meetups expanded to 30+ cities across India",
          "RKM 2026 delivered across 8 metropolitan zones simultaneously",
          "2,000+ event registrations during Margazhi Fest 2026",
          "Launched Sportify Her, Certificate Portal, and Grievance Portal"
        ]
      },
      {
        id: "flagship-initiatives",
        title: "Flagship Initiatives",
        icon: Trophy,
        isSubsections: true,
        subsections: [
          {
            title: "SPORTIFY HER",
            description: "Women-centric vertical achieving 28.7% female membership through dedicated competitions and training."
          },
          {
            title: "Rashtriya Khel Mahotsav 2026",
            description: "Multi-city tournament held across 8 cities — the largest offline initiative to date."
          },
          {
            title: "Sportify Quiz League (SQL)",
            description: "Weekly digital trivia competition across two full seasons, attracting hundreds of participants weekly."
          }
        ]
      },
      {
        id: "transformation",
        title: "Transformation Metrics",
        icon: TrendingUp,
        isMetrics: true,
        metrics: [
          { label: "Members", before: "220+", after: "745+" },
          { label: "Women %", before: "3%", after: "24.2%" },
          { label: "Cities", before: "15", after: "30+" },
          { label: "Events", before: "5", after: "12+" }
        ]
      },
      {
        id: "roadmap",
        title: "Future Roadmap",
        icon: Compass,
        content: "National-level inter-house leagues, offline sports summits at IIT Madras, expanded regional pickleball and football tournaments, and a dedicated sports analytics vertical."
      },
      {
        id: "acknowledgements",
        title: "Acknowledgements",
        icon: CheckCircle,
        content: "Deepest gratitude to the IIT Madras BS Degree Program administration, coordinators, and our dedicated team of volunteers whose support translated vision into reality."
      }
    ]
  }
};

export default function TenureReportModal({ isOpen, onClose, tenure }) {
  const [activeNavId, setActiveNavId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const report = reportData[tenure];
  if (!report) return null;

  const handleNavClick = (sectionId) => {
    setActiveNavId(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-3xl h-full bg-[#0a0f1d] border-l border-gray-800 shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-800/80 bg-black/50 flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#ff9a00] font-bold bg-[#ff9a00]/10 px-2 py-0.5 rounded-md border border-[#ff9a00]/20">
                    {report.period}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                    • {report.subtitle}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  {report.title}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Led by <span className="text-gray-200 font-medium">{report.leadership}</span>
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2.5 bg-gray-900/60 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-full border border-gray-800 hover:border-red-500/30 transition-all duration-300 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar navigation for desktop — improved visibility */}
              <div className="hidden md:flex flex-col w-56 border-r border-gray-800/60 bg-black/40 p-4 overflow-y-auto custom-scrollbar shrink-0">
                <h4 className="text-[10px] uppercase tracking-widest text-[#ff9a00] font-bold mb-3 px-2">
                  Sections
                </h4>
                <nav className="space-y-0.5">
                  {report.sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeNavId === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleNavClick(section.id)}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 text-left ${
                          isActive
                            ? "bg-[#ff9a00]/15 border border-[#ff9a00]/25 text-[#ffce00]"
                            : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-[#ffce00]" : "text-[#ff7e00]"}`} />
                        <span className="truncate">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Quick access to official report */}
                <div className="mt-auto pt-4 border-t border-gray-800/60">
                  <a
                    href={report.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-bold text-[#ff9a00] hover:text-[#ffce00] hover:bg-[#ff9a00]/10 border border-transparent hover:border-[#ff9a00]/20 transition-all duration-200"
                  >
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    <span>Full Official Report</span>
                  </a>
                </div>
              </div>

              {/* Main report body — compact */}
              <div className="flex-1 p-5 md:p-8 overflow-y-auto custom-scrollbar scroll-smooth">
                <div className="max-w-2xl mx-auto space-y-6 pb-12">
                  {report.sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <section
                        key={section.id}
                        id={section.id}
                        className="scroll-mt-4 bg-gray-950/40 border border-gray-900/80 rounded-2xl p-5 backdrop-blur-xs hover:border-gray-800 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-2.5 mb-3">
                          <div className="p-1.5 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-lg border border-orange-500/20">
                            <Icon className="h-4 w-4 text-[#ff9a00]" />
                          </div>
                          <h3 className="text-base font-bold text-white tracking-tight">
                            {section.title}
                          </h3>
                        </div>

                        {section.isList ? (
                          <ul className="space-y-2 pl-1">
                            {section.items.map((item, idx) => (
                              <li key={idx} className="flex items-start space-x-2.5 text-gray-300 text-sm leading-relaxed">
                                <div className="w-1 h-1 rounded-full bg-[#ff9a00] mt-2 shrink-0"></div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : section.isSubsections ? (
                          <div className="space-y-3">
                            {section.subsections.map((sub, idx) => (
                              <div
                                key={idx}
                                className="bg-black/30 border border-gray-900/50 p-3.5 rounded-xl"
                              >
                                <h4 className="font-semibold text-[#ffaa44] text-sm">
                                  {sub.title}
                                </h4>
                                <p className="text-gray-400 text-xs leading-relaxed mt-1">
                                  {sub.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : section.isMetrics ? (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {section.metrics.map((m, idx) => (
                              <div key={idx} className="bg-black/40 border border-gray-900/60 rounded-xl p-3 text-center">
                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{m.label}</p>
                                <div className="flex items-center justify-center space-x-1.5 mt-1">
                                  <span className="text-gray-500 text-xs line-through">{m.before}</span>
                                  <span className="text-[#ff9a00] text-[10px]">→</span>
                                  <span className="text-white text-sm font-extrabold">{m.after}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-300 leading-relaxed text-sm">
                            {section.content}
                          </p>
                        )}
                      </section>
                    );
                  })}

                  {/* Official Report Link Banner at the end */}
                  <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-2xl p-5 text-center space-y-2.5">
                    <h4 className="text-sm font-bold text-white tracking-tight">Full Official Tenure Report</h4>
                    <p className="text-gray-400 text-xs leading-relaxed max-w-md mx-auto">
                      For the complete, detailed report with all sections, download the official document.
                    </p>
                    <a
                      href={report.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-white text-xs font-semibold py-2 px-5 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(234,88,12,0.15)] hover:shadow-[0_4px_20px_rgba(234,88,12,0.25)]"
                    >
                      <span>Open Official Report</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
