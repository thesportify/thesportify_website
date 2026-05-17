"use client";

import { useEffect } from "react";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import featurepagebg from "@/assets/FeaturePageBG.jpeg";
import { featuredEvents } from "@/lib/data";

export default function FeaturedEventsPage() {
  
  // Scroll to the top of the page whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts or route changes
  }, []); // Dependency on location ensures this happens on route change

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950"
    style={{
              backgroundImage: `url(${featurepagebg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 1,
            }}>
      <div className="container mx-auto px-4 sm:px-10 py-10 md:py-16">
        {/* New Header Section */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl font-bold text-center mb-12 mt-12 text-white relative">
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] to-[#ffe808]">Events</span>
          <div className="absolute -bottom-4 left-0 right-0 flex justify-center w-full">
            <div className="relative h-[2px] w-3/5 sm:w-4/5">
              {/* Main gradient underline */}
              <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5a00] to-transparent rounded-full"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 h-[1px] bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 rounded-full blur-sm"></div>

              {/* Extra subtle reflection */}
              <div className="absolute inset-0 h-[1px] top-[3px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-[0.5px]"></div>
            </div>
          </div>
        </h1>
          <span className="text-orange-300 text-center text-lg font-medium">Handpicked highlights & special moments</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {featuredEvents.map((event) => (
            <article key={event.id} className="bg-gradient-to-t from-[#232526] via-[#414345]/30 to-[#232526]/10 rounded-2xl shadow-xl border border-gray-700 p-5 flex flex-col gap-5 h-full">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-[0_0_20px_8px_rgba(35,37,38,0.65),0_0_40px_12px_rgba(35,37,38,0.35)] bg-black">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#ff5a00]/80 to-[#ffe808]/80 text-black text-xs font-semibold w-fit">
                    {event.category}
                  </span>
                  <span className="text-orange-100 text-sm">
                    {event.date}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white leading-tight">{event.title}</h3>

                <p className="text-white text-sm leading-relaxed opacity-90">
                  {event.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {event.tags && event.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded-full bg-[#181818] text-orange-300 text-xs font-medium border border-orange-700/40">
                      {tag}
                    </span>
                  ))}
                </div>

                {event.link ? (
                  <Link
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full py-2 rounded-lg bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black font-bold text-sm transition-all transform hover:scale-[1.02]"
                  >
                    Register Now
                  </Link>
                ) : (
                  <div className="inline-flex items-center justify-center w-full py-2 rounded-lg border border-orange-500/40 text-orange-100 font-bold text-sm">
                    Details Coming Soon
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}