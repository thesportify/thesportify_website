"use client";

import { useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TeamMembers from "@/components/teamMembers";
import { teamMembersByYear } from "@/lib/data";
import { Mail, Trophy, Sparkles, Link2, Award, Zap, Code, ShieldCheck } from "lucide-react";

export default function TeamPage() {
  // Scroll to the top of the page whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950 ">
      <Navbar />
      <div className="container mx-auto px-6 sm:px-20 py-16">
        {/* Page Header */}
        <div className="flex flex-col items-center mb-16 mt-12">
          <h1 className="text-4xl font-bold text-center mb-12 text-white relative">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] to-[#ffe808]">
              Team
            </span>
            {/* Stylish underline with gradient and glow effect */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-center w-full">
              <div className="relative h-[2px] w-3/5 sm:w-1/5">
                {/* Main gradient underline */}
                <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5a00] to-transparent rounded-full"></div>

                {/* Glow effect */}
                <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 rounded-full blur-sm"></div>

                {/* Extra subtle reflection */}
                <div className="absolute inset-0 h-[1px] top-[3px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-[0.5px]"></div>
              </div>
            </div>
          </h1>
        </div>

        {/* Pass the entire teamMembersByYear object to the component */}
        <TeamMembers teamMembersByYear={teamMembersByYear} />
      </div>

      {/* Wall of Heroes / Hall of Fame Section - Cinematic Full-Width Design */}
      <section className="relative w-full py-24 mt-20 bg-transparent border-t border-gray-900/60 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5a00]/30 to-transparent"></div>
        
        {/* Majestic Soft Ambient Glows */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#ffce00]/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-[#ff5a00]/5 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-20 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-[#ffce00]/10 to-[#ff5a00]/10 rounded-2xl border border-[#ffce00]/30 mb-4 shadow-[0_0_20px_rgba(255,206,0,0.1)] animate-pulse">
              <Trophy className="h-8 w-8 text-[#ffce00]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              Wall of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808] drop-shadow-[0_2px_10px_rgba(255,90,0,0.15)]">
                Heroes
              </span>
            </h2>
            <div className="h-[2px] w-24 bg-gradient-to-r from-[#ff5a00] to-[#ffe808] my-4 rounded-full"></div>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mt-1 leading-relaxed">
              Honoring the key innovators and architects who engineered the digital sports arena, built core society platforms, and automated operations.
            </p>
          </div>

          {/* Full-width widescreen Spotlight Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-12 items-stretch">
            
            {/* Left Column - Large Collectible Trading Plaque */}
            <div className="xl:col-span-5 relative group flex flex-col justify-between">
              {/* Outer Neon Glow Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffce00] via-[#ff5a00] to-[#ffe808] rounded-3xl opacity-20 group-hover:opacity-45 blur-md transition-opacity duration-500"></div>
              
              {/* Card Container */}
              <div className="relative flex-1 flex flex-col justify-between bg-[#0a0f1d] border border-[#ffce00]/30 rounded-3xl p-6 md:p-8 overflow-hidden z-10 transition-transform duration-500 group-hover:-translate-y-1">
                {/* Diagonal Holographic Sweep Line */}
                <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                
                {/* Tech Accents / Corner Borders */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ffce00] rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ffce00] rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ffce00] rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ffce00] rounded-br-3xl"></div>
                
                <div className="space-y-6 relative z-20">
                  {/* Plaque Header */}
                  <div className="flex items-center justify-between border-b border-gray-800/80 pb-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute h-5 w-5 bg-[#ffce00]/20 rounded-full animate-ping"></div>
                        <Sparkles className="h-4 w-4 text-[#ffce00]" />
                      </div>
                      <span className="text-xs font-black text-[#ffce00] tracking-widest uppercase font-mono">
                        LEGENDARY PLAYER
                      </span>
                    </div>
                    <span className="bg-[#ffce00]/10 border border-[#ffce00]/30 text-[#ffce00] text-[10px] font-black uppercase px-3 py-1 rounded-md tracking-wider">
                      TENURE 2025-26
                    </span>
                  </div>

                  {/* Photo Frame (Clean photo, no text overlay, no black gradient) */}
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#ffce00]/80 shadow-[0_0_30px_rgba(255,206,0,0.15)] bg-slate-900 group-hover:border-[#ffce00] transition-colors duration-300">
                    <Image
                      src="https://ik.imagekit.io/meth/%20NIKHIL%20KUMAR%20SHAH.webp?updatedAt=1762873843325"
                      alt="Nikhil Kumar Shah"
                      fill
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover object-top scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      priority
                    />
                    
                    {/* Glowing Overlay border inside */}
                    <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none"></div>
                  </div>

                  {/* Rarity & MVP Badges */}
                  <div className="flex items-center justify-center space-x-3 bg-black/40 border border-gray-800/80 rounded-xl py-3 px-4">
                    <div className="text-center flex-1 border-r border-gray-800/80">
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">ROLE</p>
                      <p className="text-xs text-white font-extrabold uppercase tracking-wide mt-0.5">DEV & OPS LEAD</p>
                    </div>
                    <div className="text-center flex-1 border-r border-gray-800/80">
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">EXPERTISE</p>
                      <p className="text-xs text-[#ffce00] font-extrabold uppercase tracking-wide mt-0.5">ELITE ARCHITECT</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">STATUS</p>
                      <p className="text-xs text-emerald-400 font-extrabold uppercase tracking-wide mt-0.5">VERIFIED MVP</p>
                    </div>
                  </div>

                  {/* Name & Title Plate below the badges - perfectly aligned at the bottom */}
                  <div className="flex flex-col items-center justify-center py-1 text-center mt-2">
                    <h3 className="text-2xl font-black text-white tracking-wide uppercase drop-shadow-md">
                      Nikhil Kumar Shah
                    </h3>
                    <p className="text-[#ffce00] text-xs font-extrabold uppercase tracking-widest mt-0.5">
                      Technical Architect & Web Ops
                    </p>
                  </div>
                </div>

                {/* Social Actions */}
                <div className="flex space-x-4 border-t border-gray-800/80 pt-5 mt-6 z-20">
                  <a
                    href="https://linktr.ee/Nikhil_Kumar_Shah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-[#ffce00] to-[#ffaa00] hover:from-[#ffe808] hover:to-[#ffce00] text-black text-xs font-black uppercase py-3.5 px-4 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(255,206,0,0.2)] hover:shadow-[0_4px_25px_rgba(255,206,0,0.35)] hover:scale-[1.02]"
                    aria-label="Linktree Profile"
                  >
                    <Link2 className="h-4 w-4 stroke-[3px]" />
                    <span>Linktree</span>
                  </a>
                  <a
                    href="mailto:25f2006470@ds.study.iitm.ac.in"
                    className="flex-1 flex items-center justify-center space-x-2 bg-white/5 hover:bg-[#ffce00]/10 border border-white/10 hover:border-[#ffce00]/40 text-white text-xs font-black uppercase py-3.5 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                    aria-label="Email Contact"
                  >
                    <Mail className="h-4 w-4 text-[#ffce00]" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Hall of Fame Analytics Showcase Dashboard */}
            <div className="xl:col-span-7 bg-[#0a0f1d] border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-between gap-10 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 bg-[#ffce00] rounded-full blur-[120px] pointer-events-none"></div>

              {/* Inductee details */}
              <div className="space-y-6 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center p-2 bg-[#ffce00]/10 border border-[#ffce00]/30 rounded-xl">
                    <Award className="h-5 w-5 text-[#ffce00] animate-pulse" />
                  </div>
                  <span className="text-[#ffce00] text-xs font-black tracking-widest uppercase font-mono">
                    HALL OF FAME INDUCTEE
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-none">
                  PIONEER OF DIGITAL INFRASTRUCTURE
                </h3>
                
                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-normal">
                  Inducted onto the Wall of Heroes for exceptional engineering contributions to The Sportify Society. Designed core platform layouts, optimized database pipelines, managed web hosting infrastructure, and established automated operations. A central figure behind the digital capabilities of the 2025-2026 tenure.
                </p>
              </div>

              {/* Technical Ratings Showcases */}
              <div className="bg-black/60 border border-gray-800/80 rounded-2xl p-6 md:p-8 space-y-6 relative z-10 backdrop-blur-sm">
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <h4 className="text-xs font-black tracking-widest text-[#ffce00] uppercase font-mono">
                    TECHNICAL SYSTEM CAPABILITIES
                  </h4>
                  <span className="text-[10px] text-[#ffce00] font-black uppercase font-mono tracking-wider">LEVEL: EXPERT ARCHITECT</span>
                </div>
                
                <div className="space-y-5">
                  {/* Rating 1 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-extrabold text-gray-300">
                      <span className="flex items-center space-x-2">
                        <Code className="h-4 w-4 text-[#ff9a00]" />
                        <span>Platform Systems Engineering (DEV)</span>
                      </span>
                      <span className="text-[#ffce00] text-xs uppercase tracking-wider font-mono">EXCEPTIONAL MASTERY</span>
                    </div>
                    <div className="h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-900 p-[1px]">
                      <div className="h-full bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808] rounded-full shadow-[0_0_10px_rgba(255,206,0,0.5)] w-full"></div>
                    </div>
                  </div>

                  {/* Rating 2 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-extrabold text-gray-300">
                      <span className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-[#ff9a00]" />
                        <span>Site Reliability & Web Operations (OPS)</span>
                      </span>
                      <span className="text-[#ffce00] text-xs uppercase tracking-wider font-mono">MISSION CRITICAL</span>
                    </div>
                    <div className="h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-900 p-[1px]">
                      <div className="h-full bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808] rounded-full shadow-[0_0_10px_rgba(255,206,0,0.5)] w-full"></div>
                    </div>
                  </div>

                  {/* Rating 3 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-extrabold text-gray-300">
                      <span className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-[#ff9a00]" />
                        <span>Automation & Data Systems (ANA)</span>
                      </span>
                      <span className="text-[#ffce00] text-xs uppercase tracking-wider font-mono">ADVANCED INTEGRATION</span>
                    </div>
                    <div className="h-2.5 bg-gray-950 rounded-full overflow-hidden border border-gray-900 p-[1px]">
                      <div className="h-full bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808] rounded-full shadow-[0_0_10px_rgba(255,206,0,0.5)] w-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accomplishments Grid (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="bg-gradient-to-b from-[#0a0f1d] to-[#04060d] border border-gray-800 hover:border-[#ffce00]/40 rounded-2xl p-5 space-y-2.5 transition-all duration-300">
                  <div className="flex items-center space-x-2 border-b border-gray-800 pb-2">
                    <ShieldCheck className="h-4 w-4 text-[#ffce00]" />
                    <span className="text-xs font-black uppercase text-white tracking-wider">Secure Portal Architectures</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    Engineered secure Helpdesk and Grievance portal networks to guarantee data integrity.
                  </p>
                </div>

                <div className="bg-gradient-to-b from-[#0a0f1d] to-[#04060d] border border-gray-800 hover:border-[#ffce00]/40 rounded-2xl p-5 space-y-2.5 transition-all duration-300">
                  <div className="flex items-center space-x-2 border-b border-gray-800 pb-2">
                    <ShieldCheck className="h-4 w-4 text-[#ffce00]" />
                    <span className="text-xs font-black uppercase text-white tracking-wider">Automated Data Engines</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    Created high-performance CSV parsing pipelines for instant, dynamic roster mapping.
                  </p>
                </div>

                <div className="bg-gradient-to-b from-[#0a0f1d] to-[#04060d] border border-gray-800 hover:border-[#ffce00]/40 rounded-2xl p-5 space-y-2.5 transition-all duration-300">
                  <div className="flex items-center space-x-2 border-b border-gray-800 pb-2">
                    <ShieldCheck className="h-4 w-4 text-[#ffce00]" />
                    <span className="text-xs font-black uppercase text-white tracking-wider">High-Availability Hosting</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    Structured resilient edge routing configurations, ensuring maximum performance under heavy traffic.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
