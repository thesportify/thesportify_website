"use client"

import { useEffect, useRef } from "react";
import featEve1 from "../assets/Featured-events/mindmuse.png";
import featEve2 from "../assets/Featured-events/actletics.jpg";
import featureBG from '../assets/FeaturedBG.jpg';
import Image from "next/image";
import Link from "next/link";


const pastEvents = [
  {
    id: "featured-1",
    title: "MindMuse – Women in Sports Edition",
    image: featEve1,
    date: "1 Dec - 8 Dec, 2025",
    location: "Online (Unstop)",
    category: "Quiz Competition",
    description:
      "MindMuse is more than just a quiz; it’s a celebration of the stories, achievements, and inspiration drawn from women athletes across the world. It’s also an opportunity for women learners to step forward, represent their Houses, and lead from the front.",
    isPast: false,
    tags: ["Women in Sports", "Quiz", "Empowerment"],
    link: "https://lnkd.in/ggswiYTz"
  },
  {
    id: "featured-2",
    title: "Actletics",
    image: featEve2,
    date: "26 Nov - 9 Dec, 2025",
    location: "Online (Instagram Reels)",
    category: "Cultural Fusion",
    description:
      "Sportify × Aayam bring you IITM BS’s first-ever sports + theatre fusion event! Create a 60–120 sec video where you act out iconic sports moments, do creative sports commentary, or add drama, parody, or theatre twists.",
    isPast: false,
    tags: ["Theatre", "Sports", "Creativity", "Reels"],
    link: "https://form.jotform.com/253252575784062"
  },
];

export default function PastEvents() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-20 bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950 px-4 sm:px-6 md:px-16 relative"
      id="past-events"
      style={{
        backgroundImage: `url(${featureBG.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 1,
      }}
    >
      <div className="container mx-auto px-0 sm:px-4">
        <div className="text-center mb-8 md:mb-12 scroll-reveal">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808]">
              Events
            </span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
            Check out our latest and upcoming events!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-28 scroll-reveal place-items-center">
          {pastEvents.slice(0, 2).map((event, index) => {
            // Trim description to 200 chars for uniformity
            const trimmedDesc = event.description.length > 200
              ? event.description.slice(0, 200) + "..."
              : event.description;
            return (
              <div
                key={event.id}
                className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row transform hover:scale-[1.02] transition-all duration-300 animate-glow-card max-w-[22rem] sm:max-w-sm md:max-w-[36rem] w-full"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="w-full md:w-2/5 h-[24rem] sm:h-[32rem] md:h-auto relative flex items-center justify-center">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="object-cover w-[85%] h-[95%] sm:w-[90%] sm:h-[90%] transition-all duration-300 rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="w-full md:w-3/5 p-4 sm:p-6 md:p-7 flex flex-col justify-center gap-2 sm:gap-3">
                  {/* Title + Date */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
                    <h3 className="text-base sm:text-lg font-bold text-white">{event.title}</h3>
                    <span className="text-xs text-white px-2 py-1 rounded bg-gradient-to-r from-[#ff4500]/20 via-[#ff6a00]/30 to-[#ffce00]/40 mt-1 sm:mt-0">
                      {event.date}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-1">
                    {trimmedDesc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-1 mb-4">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-gray-800 text-[#f69e34]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Register Button */}
                  <Link href={event.link} target="_blank" rel="noopener noreferrer" className="inline-block text-center w-full py-2 rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black font-bold text-sm transition-all transform hover:scale-[1.02]">
                    Register Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
