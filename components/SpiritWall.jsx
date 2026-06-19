"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import DelhiBadminton1 from "../assets/Meetups/DelhiBadminton1.jpg";
import DelhiHockey1 from "../assets/Meetups/DelhiHockey1.jpg";
import TeamCelebration from "../assets/athlete_mixed_team.png";
import LucknowTrophy from "../assets/RKM - Lucknow Chapter.jpg";

import DelhiMeetup from "../assets/Meetups/DelhiBadminton1.jpg";
import KanpurMeetup from "../assets/Meetups/KanpurCricket1.png";
import ChennaiMeetup from "../assets/RKM26 - Chennai Chapter.jpg";

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    word: "PLAY.",
    color: "text-white",
    image: DelhiBadminton1,
    bgPosition: "object-center",
  },
  {
    word: "COMPETE.",
    color: "text-[#FF7A00]",
    image: DelhiHockey1,
    bgPosition: "object-top",
  },
  {
    word: "CONNECT.",
    color: "text-white",
    image: TeamCelebration,
    bgPosition: "object-center",
    subtitle: "Sport is where strangers become teammates.",
    showSubgrid: true
  },
  {
    word: "GROW.",
    color: "text-[#FFC107]",
    image: LucknowTrophy,
    bgPosition: "object-center",
    subtitle: "WHERE STRANGERS BECOME TEAMMATES",
  }
];

export default function SpiritWall() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Pin the main container for 4 screens worth of scrolling on desktop
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      });

      sectionsRef.current.forEach((section, i) => {
        if (!section) return;
        
        const word = section.querySelector(".spirit-word");
        const bg = section.querySelector(".spirit-bg");
        const subGrid = section.querySelector(".spirit-subgrid");

        // Set initial states
        if (i !== 0) {
          gsap.set(section, { autoAlpha: 0 });
          gsap.set(word, { scale: 0.8, opacity: 0 });
          gsap.set(bg, { scale: 1.15 });
          if (subGrid) gsap.set(subGrid, { y: 40, opacity: 0, pointerEvents: "none" });
        } else {
          gsap.set(word, { scale: 1, opacity: 1 });
          gsap.set(bg, { scale: 1.05 });
        }

        // Timeline for each scene
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=400%",
            scrub: 1,
          }
        });

        const startProgress = i * 0.25;
        const endProgress = (i + 1) * 0.25;

        // If not the first scene, fade it in
        if (i !== 0) {
          tl.to(section, { autoAlpha: 1, duration: 0.05 }, startProgress - 0.05);
          tl.to(word, { scale: 1, opacity: 1, duration: 0.1 }, startProgress - 0.05);
          tl.to(bg, { scale: 1.05, duration: 0.25 }, startProgress - 0.05);
        }

        // Background slow zoom during its active phase
        tl.to(bg, { scale: 1, duration: 0.25 }, startProgress);
        
        // Word slow scale up during its active phase
        tl.to(word, { scale: 1.06, duration: 0.25 }, startProgress);

        // Subgrid animation for CONNECT section
        if (subGrid) {
          tl.to(subGrid, { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.15 }, startProgress + 0.05);
        }

        // If not the last scene, fade it out
        if (i !== SCENES.length - 1) {
          tl.to(section, { autoAlpha: 0, duration: 0.05 }, endProgress);
          tl.to(word, { scale: 1.25, opacity: 0, duration: 0.05 }, endProgress);
          if (subGrid) {
            tl.to(subGrid, { y: -20, opacity: 0, pointerEvents: "none", duration: 0.05 }, endProgress);
          }
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div 
      id="spirit-wall" 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#050505] overflow-y-auto md:overflow-hidden snap-y snap-mandatory scrollbar-none z-30 flex flex-col md:block"
    >
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-slow-center {
          0%, 100% { transform: scale(1.05) translateY(0); }
          50% { transform: scale(1.05) translateY(-8px); }
        }
        .float-card-1 {
          animation: float-slow 6s ease-in-out infinite;
        }
        .float-card-2 {
          animation: float-slow-center 6s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .float-card-3 {
          animation: float-slow 6s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}</style>
      
      {SCENES.map((scene, i) => (
        <div 
          key={i}
          ref={(el) => (sectionsRef.current[i] = el)}
          className="relative md:absolute inset-0 md:inset-auto md:w-full md:h-full w-full h-screen flex-shrink-0 snap-start flex items-center justify-center overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full spirit-bg overflow-hidden pointer-events-none">
            <Image 
              src={scene.image} 
              alt={scene.word} 
              fill 
              priority={i === 0}
              className={`object-cover ${scene.bgPosition} opacity-25`} 
            />
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/50 to-[#050505]/95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-90" />
          </div>

          {/* Typography */}
          <div className="relative z-10 flex flex-col items-center justify-center spirit-word text-center px-6 w-full">
            <h2 className={`text-[40vw] sm:text-[30vw] md:text-[18vw] font-black leading-none tracking-tighter uppercase ${scene.color} drop-shadow-[0_0_30px_rgba(0,0,0,0.85)]`}>
              {scene.word}
            </h2>
            {scene.subtitle && (
              <p className={`text-gray-300 text-sm sm:text-base md:text-lg font-bold tracking-widest max-w-xl mt-6 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] ${scene.word === "GROW." ? "opacity-70" : "opacity-90"}`}>
                {scene.subtitle}
              </p>
            )}

            {/* Small Emotional Subgrid of Images (Connect slide) */}
            {scene.showSubgrid && (
              <div className="spirit-subgrid flex justify-start md:justify-center gap-4 mt-8 sm:mt-10 opacity-100 md:opacity-0 md:pointer-events-none overflow-x-auto md:overflow-x-visible snap-x snap-mandatory w-full max-w-full px-6 md:px-0 scrollbar-none">
                <div className="relative flex-shrink-0 w-48 h-48 md:w-36 md:h-36 rounded-xl overflow-hidden border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.8)] snap-center float-card-1">
                  <Image src={KanpurMeetup} alt="Laughter" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="relative flex-shrink-0 w-48 h-48 md:w-36 md:h-36 rounded-xl overflow-hidden border border-[#FF7A00]/20 shadow-[0_4px_15px_rgba(255,122,0,0.12)] snap-center float-card-2">
                  <Image src={ChennaiMeetup} alt="Celebrations" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="relative flex-shrink-0 w-48 h-48 md:w-36 md:h-36 rounded-xl overflow-hidden border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.8)] snap-center float-card-3">
                  <Image src={DelhiMeetup} alt="Handshakes" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      
    </div>
  );
}
