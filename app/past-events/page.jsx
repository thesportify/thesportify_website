"use client";

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import EventsList from "@/components/pastEventsList"
import { pastEvents as staticPastEvents } from "@/lib/data";
import { db, hasFirebaseConfig } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";

const isParadoxEvent = (e) => [
  "event-pbl-2026",
  "event-pcl-2026",
  "event-volleyvibes-2026",
  "event-kampusrun-2026",
  "event-iplauction-2026",
  "event-zumba-2026",
  "event-echo-2026"
].includes(e.id);

const parseEventDate = (event) => {
  if (event.isRKM || event.id === "event-rkm-2026") {
    return new Date(2026, 1, 22); // 22 Feb 2026
  }
  const dateStr = event.date;
  if (!dateStr) return new Date(0);

  let year = 2025; // default fallback
  const yearMatch = dateStr.match(/\b(202\d)\b/);
  if (yearMatch) {
    year = parseInt(yearMatch[1], 10);
  }

  const months = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11
  };

  let month = 0;
  const lowerStr = dateStr.toLowerCase();
  for (const [key, value] of Object.entries(months)) {
    if (lowerStr.includes(key)) {
      month = value;
      break;
    }
  }

  let day = 1;
  const dayMatch = dateStr.match(/\b(\d{1,2})(?:st|nd|rd|th)?\b/);
  if (dayMatch) {
    day = parseInt(dayMatch[1], 10);
  }

  return new Date(year, month, day);
};

export default function PastEventsPage() {
  const [events, setEvents] = useState(() => {
    const filtered = staticPastEvents.filter(e => !isParadoxEvent(e));
    return [...filtered].sort((a, b) => parseEventDate(b) - parseEventDate(a));
  });

  // Scroll to the top of the page whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0) // Scrolls to the top when the component mounts or route changes
  }, []) // Dependency array ensures this happens on route change

  useEffect(() => {
    if (!hasFirebaseConfig) {
      return;
    }

    const fetchEvents = async () => {
      try {
        const q = query(
          collection(db, "events"),
          where("eventType", "==", "past"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const fetchedEvents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const filteredStaticEvents = staticPastEvents.filter(e => !isParadoxEvent(e));
        const combined = [...fetchedEvents, ...filteredStaticEvents];
        setEvents(combined.sort((a, b) => parseEventDate(b) - parseEventDate(a)));
      } catch (error) {
        console.error("Error fetching events:", error);
        const filtered = staticPastEvents.filter(e => !isParadoxEvent(e));
        setEvents(filtered.sort((a, b) => parseEventDate(b) - parseEventDate(a)));
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 lg:px-20 py-16">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-center mt-12 text-white relative">
          Past{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] to-[#ffe808]">Events</span>
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

        {/* Events List */}
        <EventsList events={events} />
      </div>
      <Footer />
    </main>
  )
}
