"use client";

import { useState } from "react";
import { BookOpen, Download, ExternalLink, Calendar, Star, Award, Scroll } from "lucide-react";

const chaptersData = [
  {
    chapter: "COVER PAGE",
    title: "CONSTITUTION OF SPORTIFY",
    summary: "Official Constitution of Sportify, the Sports Society of the IIT Madras BS Degree Programme. Adopted on 31st October 2025. Explore specific chapters using the menu below.",
    page: 1
  },
  {
    chapter: "CHAPTER I",
    title: "INTERPRETATION AND DEFINITIONS",
    summary: "Defines key terms such as 'Sportify', 'Member', 'Voting Member', 'Executive Council' (EC), 'Student Affairs', 'SEC', 'Institute', and 'Sportify Her'.",
    page: 5
  },
  {
    chapter: "CHAPTER II",
    title: "NAME, VISION, MISSION AND OBJECTIVES",
    summary: "Establishes the name 'Sportify: IIT Madras BS Degree Sports Society'. Details the mission of promoting physical fitness, and objectives like tournaments, workshops, and female inclusion.",
    page: 7
  },
  {
    chapter: "CHAPTER III",
    title: "MEMBERSHIP AND PARTICIPATION",
    summary: "Defines categories of membership: General Member, Volunteer, Core Team Member, and Office Bearer. Highlights voting eligibility (registered for 30+ days and participated in 1+ event).",
    page: 9
  },
  {
    chapter: "CHAPTER IV",
    title: "GOVERNANCE STRUCTURE",
    summary: "Consists of the General Body (GB) and the Executive Council (EC). EC comprises Secretary, Deputy Secretary, Coordinator - Sportify Her, and Web Administrator. Establishes the Council of Advisors.",
    page: 12
  },
  {
    chapter: "CHAPTER V",
    title: "OFFICE BEARERS AND DUTIES",
    summary: "Outlines specific responsibilities of the Secretary (principal executive), Deputy Secretary (operations and coordination), and Web Administrator (digital infrastructure).",
    page: 15
  },
  {
    chapter: "CHAPTER VI",
    title: "SPORTIFY HER",
    summary: "Sets the mandate for the official women-focused wing, designed to encourage, support, and enhance participation of women students in sports, fitness, and leadership.",
    page: 19
  },
  {
    chapter: "CHAPTER VII",
    title: "MENTORS AND ADVISORY COMMITTEE",
    summary: "Composed of former Secretaries, Deputy Secretaries, and SEC officials. Functions as the advisory, continuity, oversight, and grievance redressal body of the society.",
    page: 20
  },
  {
    chapter: "CHAPTER VIII",
    title: "ELECTIONS, ELIGIBILITY AND SUCCESSION",
    summary: "Specifies candidates must have completed 3 terms, 32 credits, have a CGPA >= 7.5, and a clean disciplinary record. Online secure voting details.",
    page: 21
  },
  {
    chapter: "CHAPTER IX",
    title: "MEETINGS AND DECISION MAKING",
    summary: "Defines the frequency of meetings: EC must meet at least once a month, and the General Body once every two months. Outlines quorum requirements.",
    page: 23
  },
  {
    chapter: "CHAPTER X",
    title: "FINANCIAL MANAGEMENT",
    summary: "Requires prior written sanction from Student Affairs for expenditures. Restricts cash handling. Directs sponsorships through the Students Activities Trust.",
    page: 24
  },
  {
    chapter: "CHAPTER XI",
    title: "REPORTING AND RECORDS",
    summary: "Mandates submitting Term and Annual Reports to the Sports Committee. Outlines transition handovers and permanent record keeping in the G-Drive.",
    page: 26
  },
  {
    chapter: "CHAPTER XII",
    title: "AMENDMENT AND SUPREMACY",
    summary: "Requires a two-thirds (2/3) majority vote of the General Body and subsequent written approval from Student Affairs to amend the Constitution.",
    page: 27
  },
  {
    chapter: "CHAPTER XIII",
    title: "DISSOLUTION AND SUCCESSION",
    summary: "Requires approval of Student Affairs for dissolution. All assets and funds revert to the Sports Committee upon dissolution.",
    page: 27
  },
  {
    chapter: "CHAPTER XIV",
    title: "MISCELLANEOUS",
    summary: "Addresses conflict resolution, interpretation supremacy of Student Affairs policies, and non-retroactivity of constitutional provisions.",
    page: 28
  },
  {
    chapter: "SCHEDULE I",
    title: "OFFICIAL EMAIL AND BRANDING",
    summary: "Official email (thesportify.society@study.iitm.ac.in), official tagline ('Spreading the Joy of Sports'), and institutional disclaimer.",
    page: 29
  },
  {
    chapter: "SCHEDULE II",
    title: "ORGANISATIONAL STRUCTURE",
    summary: "Visual chart mapping the General Body, Council of Advisors, Executive Council, Coordinators, Core Team Members, and Volunteers.",
    page: 29
  }
];

const ConstitutionSection = () => {
  const [selectedChapter, setSelectedChapter] = useState(0);

  const driveViewLink = "https://drive.google.com/file/d/1Rc6Kc4KT3hvOxmQdercUmf5RdafTsypW/view?usp=sharing";
  const pdfDownloadPath = "/Sportify's Constitution.pdf";
  const driveEmbedLink = `/Sportify's%20Constitution.pdf#page=${chaptersData[selectedChapter].page}`;

  return (
    <div className="relative w-full min-h-screen pt-4 pb-4 md:pt-10 md:pb-10 px-4 md:px-8 rounded bg-transparent">
      {/* Top-right corner border */}
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-0 right-0 w-1 h-32 bg-linear-to-b from-orange-600 via-yellow-500 to-transparent rounded-tr"></div>
        <div className="absolute top-0 right-0 w-32 h-1 bg-linear-to-r from-transparent via-yellow-500 to-orange-600 rounded-tr"></div>
      </div>

      {/* Bottom-left corner border */}
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-0 left-0 w-1 h-32 bg-linear-to-t from-orange-600 via-yellow-500 to-transparent rounded-bl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-1 bg-linear-to-r from-orange-600 via-yellow-500 to-transparent rounded-bl"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section - Introduction and Chapter Explorer */}
        <div
          className="lg:col-span-5 backdrop-blur-md rounded-3xl p-6 shadow-xl overflow-hidden hover:border-gray-800 transition-all duration-300 flex flex-col justify-between"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.6)",
            border: "2px solid rgba(31, 41, 55, 1)",
          }}
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-center tracking-tight text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-yellow-500 to-yellow-300">
                Official Constitution
              </h2>
              <div className="w-44 h-1 bg-orange-500 mx-auto rounded mt-2"></div>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-center text-sm md:text-base">
              Adopted on October 31, 2025, the Constitution governs the establishment, functioning, and operations of Sportify, the official sports society of the IIT Madras BS Degree Programme.
            </p>

            {/* Chapter Selection list */}
            <div className="relative mt-6 bg-linear-to-br from-gray-800/70 to-black/70 rounded-2xl p-4 border border-gray-800">
              <span className="text-xs uppercase tracking-wider text-gray-400 block mb-3 font-semibold text-center">
                Explore Chapters & Schedules
              </span>
              
              {/* Scrollable list of chapters */}
              <div className="max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {chaptersData.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedChapter(index)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                      index === selectedChapter
                        ? "bg-orange-500/10 border-orange-500/30 text-[#ff9a00] shadow-[0_0_10px_rgba(255,154,0,0.05)]"
                        : "bg-black/30 border-transparent text-gray-400 hover:text-white hover:bg-gray-900/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Scroll className={`h-4 w-4 shrink-0 ${index === selectedChapter ? "text-orange-400" : "text-gray-500"}`} />
                      <div className="truncate">
                        <span className="text-[10px] block font-bold tracking-wider opacity-85 leading-none">
                          {item.chapter}
                        </span>
                        <span className="text-xs font-semibold truncate block">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <a
              href={driveViewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-black font-extrabold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(234,88,12,0.1)] cursor-pointer"
            >
              <ExternalLink className="h-4 w-4 stroke-[3px]" />
              <span>Drive Link</span>
            </a>
            <a
              href={pdfDownloadPath}
              download
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gray-950 border border-gray-800 hover:border-orange-500/30 text-white font-extrabold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Right Section - PDF Viewer and Chapter Details */}
        <div
          className="lg:col-span-7 bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300 flex flex-col justify-between"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.6)",
            border: "2px solid rgba(31, 41, 55, 1)",
          }}
        >
          {/* Header bar */}
          <div className="bg-black/40 p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
              </div>
              <h2 className="text-sm md:text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-yellow-500 to-yellow-300 uppercase tracking-wide">
                Sportify Constitution
              </h2>
              <div className="w-16"></div>
            </div>
          </div>

          {/* PDF Viewer with stylized frame */}
          <div className="relative grow p-4">
            <div className="relative grow rounded-xl overflow-hidden border border-gray-700 bg-black/30 h-full min-h-[500px]">
              <iframe
                key={selectedChapter}
                src={driveEmbedLink}
                className="w-full h-full"
                title="Sportify Constitution"
                allow="autoplay"
                loading="lazy"
              ></iframe>

              {/* Hover fallback details */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-center p-6 bg-black/80 rounded-xl border border-gray-700 max-w-sm">
                  <p className="text-white mb-4">
                    If the PDF viewer does not load, you can view the constitution directly in your browser or download it:
                  </p>
                  <div className="flex justify-center space-x-4 pointer-events-auto">
                    <a
                      href={driveViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-orange-600 px-4 py-2 rounded-lg text-black font-semibold hover:bg-orange-500 transition-all duration-300"
                    >
                      Open on Drive
                    </a>
                    <a
                      href={pdfDownloadPath}
                      download
                      className="inline-block bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg text-white font-semibold hover:border-gray-500 transition-all duration-300"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Details Panel */}
          <div className="bg-black/40 rounded-xl p-4 border-t border-gray-800/55">
            <h3 className="flex items-center text-sm md:text-base font-bold text-white mb-2 uppercase tracking-wide">
              <BookOpen className="h-5 w-5 text-orange-400 mr-2" />
              {chaptersData[selectedChapter].chapter} - {chaptersData[selectedChapter].title}
            </h3>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed" style={{ minHeight: "3.5rem" }}>
              {chaptersData[selectedChapter].summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstitutionSection;
