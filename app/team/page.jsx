"use client";

import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TeamMembers from "@/components/teamMembers";
import { teamMembersByYear } from "@/lib/data";

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
      <Footer />
    </main>
  );
}
