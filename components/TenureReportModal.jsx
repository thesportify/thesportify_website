"use client";

import { useEffect } from "react";
import { X, Calendar, Award, Star, Trophy, Users, ShieldAlert, Heart, Compass, CheckCircle, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const reportData = {
  "2025-26": {
    title: "Tenure Report 2025 - 2026",
    subtitle: "The Expansion Year",
    period: "October 12, 2025 - June 2026",
    leadership: "Krish Gupta & Aman Sagar",
    sections: [
      {
        id: "exec-summary",
        title: "Executive Summary",
        icon: Award,
        content: "The tenure of The Sportify Society from October 12, 2025, to June 2026 was marked by structural reforms, strategic expansion, and increased inclusivity. Under the leadership of Krish Gupta and Aman Sagar, Sportify transformed from a group with limited organization to a sustainable ecosystem with over 700 active members and 24% female representation. This period established the society as the premier sports organization for the IIT Madras BS Degree Program."
      },
      {
        id: "intro",
        title: "Introduction to The Sportify Society",
        icon: Compass,
        content: "The Sportify Society is the official sports body of the IIT Madras BS Degree Program. Its core mission is to promote sports through participation, analytics, and community interaction. Due to the unique online-hybrid nature of the BS program, the society connects students spread across various geographic locations through both digital tournaments and regional offline meetups."
      },
      {
        id: "vision-mission",
        title: "Vision, Mission & Core Values",
        icon: Trophy,
        content: "Our goal is building an inclusive sports community across India through sportsmanship, innovation, and passion. We aim to nurture talent, build competitive spirits, and foster peer-to-peer engagement by organizing events that cater to diverse athletic and analytical interests, ensuring every sports enthusiast finds a home here."
      },
      {
        id: "leadership",
        title: "Leadership Transition and Vision",
        icon: Users,
        content: "The start of the tenure under Secretary Aman Sagar and Deputy Secretary Krish Gupta marked a pivot towards structural transformation. The focus was set on community accessibility, transparency, and operational scalability, moving away from ad-hoc planning to systematic calendar-based execution."
      },
      {
        id: "strategic-priorities",
        title: "Strategic Priorities of the Tenure",
        icon: Star,
        content: "Two main strategic pillars defined this tenure: first, the rapid expansion of our offline presence to over 30 cities nationwide; second, a targeted push to increase women's membership. This successful inclusivity drive raised female representation in the society from just 3% at inception to over 24%."
      },
      {
        id: "org-structure",
        title: "Organizational Structure & Operations",
        icon: CheckCircle,
        content: "To guarantee operational efficiency across different regions, we implemented a standardized seven-step event lifecycle. This structured workflow covers ideation, planning, coordination, execution, marketing, feedback, and data-driven improvement, ensuring consistency in every event."
      },
      {
        id: "digital-infra",
        title: "Digital Infrastructure & Website",
        icon: Compass,
        content: "The official Sportify website was established and optimized as the central hub for events, announcements, registration tracking, and community visibility. It serves as the single source of truth for the entire student body, integrating all tools under a cohesive interface."
      },
      {
        id: "membership-analysis",
        title: "Membership and Community Analysis",
        icon: Users,
        content: "Following the December 2025 renewal cycle, active membership grew to over 700 registered members. This growth reflects the increased trust, value, and engagement that the society brought to the student community."
      },
      {
        id: "major-initiatives",
        title: "Major Initiatives & Launches",
        icon: Award,
        isSubsections: true,
        subsections: [
          {
            title: "SPORTIFY HER",
            description: "A specialized vertical created to foster female participation. It successfully achieved 28.7% female membership and high engagement rates through women-centric competitions, training, and discussion circles."
          },
          {
            title: "Certificate & Grievance Portals",
            description: "New digital platforms deployed to improve transparency and trust. The Certificate Verification Portal allows students to verify credentials, while the Grievance Portal provides a secure way to report issues directly to the core team."
          },
          {
            title: "Sportify Quiz League (SQL)",
            description: "A highly popular weekly digital trivia competition that sustained peer-to-peer engagement across two full seasons, attracting hundreds of participants weekly."
          }
        ]
      },
      {
        id: "events-portfolio",
        title: "Sportify Events Portfolio",
        icon: Trophy,
        content: "We offered a broad portfolio of activities to appeal to different interests. This included competitive online quizzes, strategy simulations (such as the IPL Auction), and large-scale offline athletic tournaments.",
        link: {
          text: "Official Report",
          url: "https://drive.google.com/file/d/1EBeQzusvg8N1N00m6_32gppdhUXqnuXJ/view?usp=sharing"
        }
      },
      {
        id: "orientation-nov",
        title: "Sportify Orientation (Nov 2025)",
        icon: Calendar,
        content: "The first official orientation session of the tenure was held in November 2025. It served as the introduction of our new core team, vision, and roadmap to the student body, drawing an audience of 178 active participants."
      },
      {
        id: "margazhi-fest",
        title: "Margazhi Fest 2026 Events",
        icon: Trophy,
        content: "During the Margazhi Fest 2026, Sportify hosted three major flagship events: the IPL Auction Showdown, the Sports Trivia Showdown, and The Traitors. These events collectively drew massive engagement, receiving over 2,000 registration requests."
      },
      {
        id: "actletics",
        title: "Actletics - Sports × Theatre",
        icon: Star,
        content: "A creative fusion competition where participants acted out and recreated iconic, historic moments from sports history on stage, combining performance arts with sports trivia."
      },
      {
        id: "mindmuse",
        title: "MindMuse - Women in Sports Quiz",
        icon: Heart,
        content: "An inter-house quiz competition celebrating the achievements and history of women in sports. It recorded high conversion rates and set a new standard for gender-inclusive events."
      },
      {
        id: "meetups",
        title: "Regional Sports Meetups",
        icon: Users,
        content: "To bridge the online gap, we organized physical meetups in major hubs across India, including Delhi, Kota, Jaipur, Chennai, Agra, Nagpur (where we hosted our first-ever pickleball event), and Pune. These meetups allowed students to play together and form local chapters."
      },
      {
        id: "rkm-2026",
        title: "Sportify Rashtriya Khel Mahotsav 2026",
        icon: Trophy,
        content: "Our largest offline initiative to date: a multi-city tournament held simultaneously across 8 cities. RKM 2026 brought the excitement of competitive athletics directly to the doorsteps of our nationwide student base."
      },
      {
        id: "internal-engagement",
        title: "Internal Community Initiatives",
        icon: Heart,
        content: "We hosted over 20 internal engagement sessions, including game nights, watch parties for major international matches (such as the IPL and cricket World Cup), and women-specific discussions to build tight-knit bonds within the society."
      },
      {
        id: "outreach",
        title: "Community Outreach & Media",
        icon: Compass,
        content: "We leverage social media and WhatsApp groups to share daily sports trivia, athlete spotlights, and match updates. This active digital footprint kept the brand visible and the community engaged outside of structured events."
      },
      {
        id: "orientation-mar",
        title: "Sportify Orientation (March 2026)",
        icon: Calendar,
        content: "The second orientation session of the year was held in March 2026. It focused on introducing upcoming roadmap initiatives, collecting feedback, and recruiting volunteers, seeing participation from 123 students."
      },
      {
        id: "challenges",
        title: "Challenges and Learnings",
        icon: ShieldAlert,
        content: "Navigating geographical distribution was our main hurdle. We addressed this by adopting a hybrid model—blending high-quality digital events with regional meetups. We also focused on retaining engagement between major tournaments with micro-competitions."
      },
      {
        id: "transformation",
        title: "Sportify Transformation: Oct 2025 - Mar 2026",
        icon: Star,
        content: "Our metrics show a clear before-and-after picture of the society's growth. Active membership surged from 220+ to 745+, female participation rose to over 24%, and regional coverage expanded from 15 cities to over 30 cities."
      },
      {
        id: "impact",
        title: "Tenure Impact Summary",
        icon: Award,
        content: "The overall impact of the tenure is defined by structured expansion, a reliable operational framework, and highly successful nation-wide festivals that brought the BS student community closer than ever before."
      },
      {
        id: "roadmap",
        title: "Future Roadmap",
        icon: Compass,
        content: "Looking forward, the roadmap includes launching national-level inter-house leagues, organizing offline sports summits at IIT Madras, expanding regional pickleball and football tournaments, and developing a dedicated sports analytics vertical."
      },
      {
        id: "acknowledgements",
        title: "Acknowledgements",
        icon: Heart,
        content: "We extend our deepest gratitude to the IIT Madras BS Degree Program administration, the coordinators, and our dedicated team of volunteers. Their support was instrumental in translating our vision into reality."
      },
      {
        id: "key-achievements",
        title: "Key Achievements at a Glance",
        icon: Star,
        isList: true,
        items: [
          "Grew active member database to 745+ members.",
          "Increased female student representation from 3% to 24.2%.",
          "Organized meetups and chapters in over 30 cities across India.",
          "Delivered RKM 2026 across 8 major metropolitan zones.",
          "Successfully launched Sportify Her, Certificate Portal, and Grievance Portal.",
          "Over 2,000 event registrations during Margazhi Fest 2026."
        ]
      },
      {
        id: "conclusion",
        title: "Conclusion",
        icon: CheckCircle,
        content: "The 2025-2026 tenure successfully established a resilient, structured foundation for sports in the IIT Madras BS Degree Program. Positioned as a rapidly growing society, Sportify is ready to climb to greater heights in the coming years."
      }
    ]
  },
  "2024-25": {
    title: "Tenure Report 2024 - 2025",
    subtitle: "The Foundation Year",
    period: "October 2024 - October 2025",
    leadership: "Aman Sagar & Krish Gupta",
    sections: [
      {
        id: "foundation-exec",
        title: "Executive Summary",
        icon: Award,
        content: "The 2024 - 2025 tenure laid the ground stones of The Sportify Society. It focused on drafting the initial charter, establishing the core values of sportsmanship and community, and recruiting the first batch of sports enthusiasts."
      },
      {
        id: "foundation-milestones",
        title: "Key Milestones",
        icon: Trophy,
        isList: true,
        items: [
          "Established the formal society charter and branding guidelines.",
          "Grew membership from zero to 220+ active participants.",
          "Pioneered the first series of online watch parties and sports quizzes.",
          "Connected students in 15 different cities through initial sports meetups."
        ]
      },
      {
        id: "foundation-impact",
        title: "Legacy & Impact",
        icon: Star,
        content: "The Foundation Year demonstrated that sports can unite a distributed online program. It set the baseline metrics and operational rules that paved the way for the massive expansion phase in the subsequent tenure."
      }
    ]
  }
};

export default function TenureReportModal({ isOpen, onClose, tenure }) {
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
            className="relative w-full max-w-5xl h-full bg-[#0a0f1d] border-l border-gray-800 shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-800 bg-black/40 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#ff9a00] font-semibold">
                  {report.period}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                  {report.title}
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  Led by <span className="text-gray-200 font-medium">{report.leadership}</span> • {report.subtitle}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-3 bg-gray-900/60 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-full border border-gray-800 hover:border-red-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar navigation for desktop */}
              <div className="hidden md:block w-72 border-r border-gray-900 bg-black/20 p-6 overflow-y-auto custom-scrollbar">
                <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-4">
                  Report Sections
                </h4>
                <nav className="space-y-1">
                  {report.sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-900/50 transition-all duration-200"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(section.id);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-[#ff7e00]" />
                        <span className="truncate">{section.title}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Main report body */}
              <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/10 via-[#0a0f1d] to-[#050811] scroll-smooth">
                <div className="max-w-3xl mx-auto space-y-12 pb-16">
                  {report.sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <section
                        key={section.id}
                        id={section.id}
                        className="scroll-mt-6 bg-gray-950/40 border border-gray-900/80 rounded-2xl p-6 backdrop-blur-xs hover:border-gray-800 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-xl border border-orange-500/20">
                            <Icon className="h-6 w-6 text-[#ff9a00]" />
                          </div>
                          <h3 className="text-xl font-bold text-white tracking-tight">
                            {section.title}
                          </h3>
                        </div>

                        {section.isList ? (
                          <ul className="space-y-3 pl-4 list-disc text-gray-300">
                            {section.items.map((item, idx) => (
                              <li key={idx} className="leading-relaxed">
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : section.isSubsections ? (
                          <div className="space-y-6 mt-4">
                            {section.subsections.map((sub, idx) => (
                              <div
                                key={idx}
                                className="bg-black/30 border border-gray-900/50 p-4 rounded-xl space-y-1.5"
                              >
                                <h4 className="font-semibold text-[#ffaa44] text-md">
                                  {sub.title}
                                </h4>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                  {sub.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-line">
                              {section.content}
                            </p>
                            {section.link && (
                              <div className="pt-2">
                                <a
                                  href={section.link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#ff9a00] hover:text-[#ffaa44] border border-[#ff9a00]/30 hover:border-[#ff9a00]/60 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 px-3 py-1.5 rounded-lg transition-all duration-300"
                                >
                                  <span>{section.link.text}</span>
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </section>
                    );
                  })}

                  {/* Official Report Link Banner at the end */}
                  <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-2xl p-6 text-center space-y-3 shadow-md backdrop-blur-xs">
                    <h4 className="text-lg font-bold text-white tracking-tight">Official Tenure Report</h4>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto">
                      Access the full, official document detailing structural reforms, strategic expansion, and achievements of the tenure.
                    </p>
                    <div className="pt-1">
                      <a
                        href="https://drive.google.com/file/d/1EBeQzusvg8N1N00m6_32gppdhUXqnuXJ/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-white text-xs md:text-sm font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(234,88,12,0.15)] hover:shadow-[0_4px_20px_rgba(234,88,12,0.25)]"
                      >
                        <span>Open Official Report</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
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
