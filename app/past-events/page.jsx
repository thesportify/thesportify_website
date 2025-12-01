"use client";

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import EventsList from "@/components/pastEventsList"
import { pastEvents as staticPastEvents } from "@/lib/data";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export default function PastEventsPage() {
  const [events, setEvents] = useState(staticPastEvents);
  const [loading, setLoading] = useState(true);

  // Scroll to the top of the page whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0) // Scrolls to the top when the component mounts or route changes
  }, []) // Dependency array ensures this happens on route change

  useEffect(() => {
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
        // Merge dynamic events (first) with static events (last)
        setEvents([...fetchedEvents, ...staticPastEvents]);
      } catch (error) {
        console.error("Error fetching events:", error);
        // On error, keep static events
        setEvents(staticPastEvents);
      } finally {
        setLoading(false);
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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />
          </div>
        ) : (
          <EventsList events={events} />
        )}
      </div>
      <Footer />
    </main>
  )
}
