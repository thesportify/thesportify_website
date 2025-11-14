import Image from "next/image";

import DelhiBadminton1 from "../assets/Meetups/DelhiBadminton1.jpg";
import DelhiBadminton2 from "../assets/Meetups/DelhiBadminton2.png";
import DelhiBadminton3 from "../assets/Meetups/DelhiBadminton3.jpg";
import DelhiHockey1 from "../assets/Meetups/DelhiHockey1.jpg";
import DelhiHockey2 from "../assets/Meetups/DelhiHockey2.jpg";
import KanpurCricket1 from "../assets/Meetups/KanpurCricket1.png";
import KanpurCricket2 from "../assets/Meetups/KanpurCricket2.png";
import LucknowCricket1 from "../assets/Meetups/LucknowCricket1.jpg";
import LucknowCricket2 from "../assets/Meetups/LucknowCricket2.jpg";

import meetupBG from "../assets/MeetupBG.png";


export default function MeetupsGallery() {
  return (
    <section
      className="pt-[4rem] pb-[6rem] bg-gradient-to-br from-black via-[#1a1a1a] to-black dark:bg-gray-950 px-4 md:px-16 overflow-hidden sm:overflow-visible relative"
      id="meetups-gallery"
      style={{
              backgroundImage: `url(${meetupBG.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 1,
            }}
    >
      <div className="container mx-auto px-0 sm:px-4 relative">

        <div className="text-center mb-28 md:mb-16 scroll-reveal px-3 py-6 sm:px-0 sm:py-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
            Meetups Across{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a00] via-[#ffce00] to-[#ffe808]">
              India
            </span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
            A joy-filled photo gallery of our society's meetups in various cities, celebrating sports and togetherness. Relive the moments of fun, friendship, and sporting spirit!
          </p>
        </div>

        <div className="meetups-album">
          <Photos/>
          <Meetups/>
        </div>
      </div>
    </section>
  );
}


function Photos() {
  const images = [
    { src: DelhiBadminton1, alt: "Delhi Badminton Meetup 1" },
    { src: DelhiBadminton2, alt: "Delhi Badminton Meetup 2" },
    { src: DelhiBadminton3, alt: "Delhi Badminton Meetup 3" },
    { src: DelhiHockey1, alt: "Delhi Hockey Meetup 1" },
    { src: DelhiHockey2, alt: "Delhi Hockey Meetup 2" },
    { src: KanpurCricket1, alt: "Kanpur Cricket Meetup 1" },
    { src: KanpurCricket2, alt: "Kanpur Cricket Meetup 2" },
    { src: LucknowCricket1, alt: "Lucknow Cricket Meetup 1" },
    { src: LucknowCricket2, alt: "Lucknow Cricket Meetup 2" },
  ];
  const positions = [
    { top: '-15%', left: '0', rotate: '-6deg' },
    { top: '20%', left: '25%', rotate: '4deg' },
    { top: '-18%', right: '0', rotate: '3deg' },
    { top: '5%', right: '25%', rotate: '-5deg' },
    { bottom: '-8%', left: '8%', rotate: '2deg' },
    { bottom: '12%', right: '5%', rotate: '-3deg' },
    { bottom: '-8%', left: '38%', rotate: '3deg' },
    { bottom: '-7%', right: '-2%', rotate: '-3deg' },
    { left: '-4%', bottom: '15%', rotate: '-4deg' },
  ];

  return <div className="absolute inset-0">
    {images.map((img, idx) => {
      const style = {
        ...positions[idx],
        transform: `${positions[idx].transform || ''} rotate(${positions[idx].rotate})`,
      };
      return (
        <div key={idx} style={style} className="meetup-photo animate-glow-card">
          <Image
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover rounded-xl"
            loading="lazy"
          />

          <div className="absolute top-2 right-2 px-3 py-1 rounded-lg backdrop-blur-md bg-black/40 text-xs font-semibold text-white drop-shadow flex items-center justify-end">
            {img.alt}
          </div>
        </div>
      );
    })}
  </div>
}


function Meetups() {
  const meetupsData = [
    {
      id: "meetup-1",
      title: "Kanpur Sports Cricket Meetup",
      date: "20 September, 2025",
      location: "Fazalganj Shastri Nagar, Kanpur",
      description: "A vibrant cricket meetup in Kanpur organized by Sportify where students gathered for matches, snacks, and plenty of cricket banter in a fun community setting.",
      tags: ["Cricket", "Meetup", "Kanpur", "Community"],
      instaLink: "https://www.instagram.com/p/DPLJcGlkkfs/?img_index=1"
    },
    {
      id: "meetup-2",
      title: "Delhi Badminton Meetup",
      date: "7 September, 2025",
      location: "Power Smash Academy, Delhi",
      description: "Badminton lovers in Delhi gathered at Power Smash Academy for exciting rallies, friendly matches, and a fun community sports meetup.",
      tags: ["Badminton", "Meetup", "Delhi", "Community"],
      instaLink: "https://www.instagram.com/p/DOjSIvuk98Z/?img_index=1"
    },
    {
      id: "meetup-3",
      title: "Lucknow Football Meetup",
      date: "25 March, 2025",
      location: "Players Town (Turf) near BBAU, Lucknow",
      description: "A passionate football meetup in Lucknow where fans connected over the game with friendly matches and a shared love for the sport.",
      tags: ["Football", "Meetup", "Lucknow", "Community"],
      instaLink: "https://www.instagram.com/p/DGGHB6yy_xQ/?img_index=1"
    },
    {
      id: "meetup-4",
      title: "Delhi Meetup - India vs Germany Hockey",
      date: "23 October, 2024",
      location: "Major Dhyan Chand National Stadium, New Delhi",
      description: "Sportify Society hosted a meetup to cheer on the Indian National Hockey Team during the India vs Germany Hockey Bilateral Series. The event united sports-loving students for live support of the home team.",
      tags: ["Hockey", "Meetup", "Live Event", "India vs Germany", "Cheer"],
      instaLink: "https://www.instagram.com/p/DBjBrWST_p1/?img_index=1"
    }
  ];

  return <div className="absolute inset-0 flex items-center justify-center gap-[2rem] flex-wrap max-md:overflow-y-auto">
    {meetupsData.map((meetup, idx) => {
    return (
      <div key={meetup.id} className={"bg-gradient-to-r from-gray-900 via-gray-800 to-yellow-700 rounded-xl md:shadow-[0_32px_80px_0_rgba(20,20,20,0.7),0_12px_40px_0_rgba(0,0,0,0.5)] border-2 border-gray-700 p-4 inline-flex flex-col items-center transition-transform duration-300 !w-[270px] relative"}>
        <span className="absolute top-2 left-2 w-3 h-3 bg-gradient-to-br from-yellow-400 via-orange-400 to-gray-400 rounded-full border border-gray-700 shadow-md" ></span>
        <span className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-yellow-400 via-orange-400 to-gray-400 rounded-full border border-gray-700 shadow-md" ></span>
        <span className="absolute bottom-2 left-2 w-3 h-3 bg-gradient-to-br from-yellow-400 via-orange-400 to-gray-400 rounded-full border border-gray-700 shadow-md" ></span>
        <span className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-br from-yellow-400 via-orange-400 to-gray-400 rounded-full border border-gray-700 shadow-md" ></span>
        <h3 className="text-lg font-bold text-white mb-3 text-center">{meetup.title}</h3>
        <span className="text-xs text-yellow-200 mb-4 block font-[500]">{meetup.date} | {meetup.location}</span>
        <p className="text-xs text-gray-200 mb-5 text-center">{meetup.description.length > 150 ? meetup.description.slice(0, 150) + '...' : meetup.description}</p>
        <div className="flex flex-wrap gap-1 mb-2 justify-center">
          {meetup.tags.map((tag, i) => (
            <span key={i} className="px-1 py-0.5 bg-gradient-to-r from-orange-900 via-orange-700 to-yellow-700 text-white text-[10px] rounded-full shadow">{tag}</span>
          ))}
        </div>
        <a href={meetup.instaLink} target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-400 font-semibold underline hover:text-yellow-200">View on Instagram</a>
      </div>
    );
    })}
  </div>
}