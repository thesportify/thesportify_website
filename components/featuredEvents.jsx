"use client"

import { useEffect, useRef, useState } from "react";
import featEve1 from '../assets/Featured-events/Event-1.jpg';
import featEve2 from '../assets/Featured-events/Event-2.png';
import featEve3 from '../assets/Featured-events/Event-3.jpg';
import featureBG from '../assets/FeaturedBG.jpg';
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import { Loader2 } from "lucide-react";

const fallbackFeaturedEvents = [
  {
    id: "featured-1",
    title: "Ultimate IPL Auction",
    date: "24 April - 27 April, 2025",
    description:
      "Participants stepped into the shoes of franchise owners, bidding strategically to build their dream teams under a fixed budget. The event was filled with intense bidding wars, clever tactics, and loads of cricket.",
    image: featEve1,
    link: "#",
    tags: ["Cricket", "Auction", "Strategy", "Teamwork"],
  },
  {
    id: "featured-2",
    date: "5 June - 6 June, 2025",
    description:
      "Get ready to put your sports knowledge to the ultimate test! The Ultimate Sports Quiz at Paradox’25 is a thrilling challenge for sports enthusiasts, testing knowledge of legendary moments, records, and tricky questions.",
    image: featEve2,
    link: "#",
    tags: ["Quiz", "Sports", "Trivia"],
  },
  {
    id: "featured-3",
    title: "The Pavilion - Episode 2",
    date: "13 May, 2025",
    description:
      "Prof. Mahesh Panchagnula from IIT Madras discussed how technology, data science, and AI are transforming sports analytics and athletic performance in Episode 2 of The Pavilion.",
    image: featEve3,
    link: "#",
    tags: ["Technology", "AI", "Sports Analytics"],
  },
];

export default function FeaturedEvents() {
  const sectionRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(
          collection(db, "events"),
          where("eventType", "==", "featured")
        );
        const querySnapshot = await getDocs(q);
        const fetchedEvents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const sortedEvents = [...fetchedEvents].sort((left, right) => {
          const leftTime = left.createdAt?.seconds ?? 0;
          const rightTime = right.createdAt?.seconds ?? 0;
          return rightTime - leftTime;
        });

        setEvents(sortedEvents.length > 0 ? sortedEvents : fallbackFeaturedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents(fallbackFeaturedEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
  }, [events]);

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-20 bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950 px-4 sm:px-6 md:px-16 relative"
      id="featured-events"
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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="flex justify-center items-center h-40 scroll-reveal">
            <p className="text-2xl font-bold text-gray-500 animate-pulse">
              Events Coming Soon
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-28 scroll-reveal items-stretch justify-items-center">
            {events.map((event, index) => {
              // Trim description only if it exists
              const trimmedDesc = event.description && event.description.length > 200
                ? event.description.slice(0, 200) + "..."
                : event.description || "";

              const imageSrc = event.image || "/placeholder.svg";
              const isStaticImage = typeof imageSrc !== "string";

              return (
                <div
                  key={event.id}
                  className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row transform hover:scale-[1.02] transition-all duration-300 animate-glow-card max-w-[22rem] sm:max-w-sm md:max-w-[36rem] w-full h-full"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image Container with black background for containment */}
                  <div className="w-full md:w-2/5 h-[24rem] sm:h-[32rem] md:h-auto relative flex items-center justify-center bg-black">
                    <Image
                      src={imageSrc}
                      alt={event.title}
                      width={500}
                      height={500}
                      className="object-contain w-full h-full transition-all duration-300 rounded-lg p-2"
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
                      {event.tags && event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-gray-800 text-[#f69e34]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Register Button */}
                    <Link href={event.link || "#"} target="_blank" rel="noopener noreferrer" className="inline-block text-center w-full py-2 rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black font-bold text-sm transition-all transform hover:scale-[1.02]">
                      Register Now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
