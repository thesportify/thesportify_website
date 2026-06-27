"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import logo from "../assets/sportify_logo1.png";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [particles, setParticles] = useState([]);

  // Generate a few footer embers
  useEffect(() => {
    const list = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1.5,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }));
    setParticles(list);
  }, []);

  return (
    <footer className="relative bg-[#050505] text-white pt-20 pb-10 overflow-hidden border-t border-white/5 select-none">
      
      {/* Stadium Light Orange Bar Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent shadow-[0_0_15px_#FF7A00] z-20" />
      
      {/* Dynamic Embers Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#FF7A00]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start justify-between pb-12 border-b border-white/5">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="Sportify Logo"
                width={50}
                height={50}
                className="mr-1 filter drop-shadow-[0_0_15px_rgba(255,122,0,0.3)]"
              />
              <h3 className="text-2xl font-black tracking-wider text-white uppercase">
                THE SPORTIFY
              </h3>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
              IIT Madras BS Degree Sports Society — spreading the flame of sports, fostering a community of athletes, and celebrating competition.
            </p>

            {/* Social Coordinates */}
            <div className="flex gap-4 pt-2">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/sportify_iitm/" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/the-sportify-society/" },
                { Icon: Youtube, href: "https://www.youtube.com/@thesportifyiitmbs/" },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-white/5 bg-[#0b0b0b] text-gray-500 hover:text-[#FF7A00] hover:border-[#FF7A00]/40 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Coordinates */}
          <div className="flex flex-col items-start md:items-end space-y-4">
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest text-[#FFC107]">
                Contact Box
              </h4>
            </div>

            <div className="flex flex-col gap-3.5 w-full md:items-end">
              <div className="flex flex-wrap gap-2.5 justify-start md:justify-end">
                <a
                  href="tel:+919878449480"
                  className="inline-flex items-center bg-white/5 hover:bg-[#FF7A00]/10 border border-white/5 hover:border-[#FF7A00]/30 text-gray-300 hover:text-white px-3.5 py-2 rounded-xl transition-all duration-300 text-xs font-bold"
                >
                  <Phone className="h-3.5 w-3.5 mr-2 text-[#FF7A00]" />
                  +91 9878449480
                </a>
                
                <a
                  href="tel:+917870825906"
                  className="inline-flex items-center bg-white/5 hover:bg-[#FF7A00]/10 border border-white/5 hover:border-[#FF7A00]/30 text-gray-300 hover:text-white px-3.5 py-2 rounded-xl transition-all duration-300 text-xs font-bold"
                >
                  <Phone className="h-3.5 w-3.5 mr-2 text-[#FF7A00]" />
                  +91 7870825906
                </a>
              </div>

              <a
                href="mailto:thesportify.society@study.iitm.ac.in"
                className="inline-flex items-center bg-white/5 hover:bg-[#FF7A00]/10 border border-white/5 hover:border-[#FF7A00]/30 text-gray-300 hover:text-white px-4 py-2.5 rounded-xl transition-all duration-300 text-xs font-bold w-max"
              >
                <Mail className="h-3.5 w-3.5 mr-2 text-[#FF7A00]" />
                thesportify.society@study.iitm.ac.in
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-medium">
            © {currentYear}{" "}
            <span className="text-white font-extrabold">THE SPORTIFY</span>. All
            rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A00]">
              Official Sports Society
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
