"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import logo from "../assets/sportify_logo1.png";
import Image from "next/image";

const navLinks = [
  { name: "Past Events", path: "/past-events" },
  { name: "Chronicles", path: "/chronicle" },
  { name: "Highlights", path: "/highlights" },
  { name: "Verification", path: "/verify" },
  { name: "Team", path: "/team" },
  { name: "Helpdesk", path: "/helpdesk" },
  { name: "Grievance", path: "/grievance" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[9999] bg-[rgba(5,5,5,0.85)] backdrop-blur-[20px] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5"
    >
      {/* Thin orange bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#FF7A00] opacity-30"></div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center space-x-3 group outline-none"
          >
            <Image
              src={logo || "/placeholder.svg"}
              alt="Sportify Logo"
              className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-500 group-hover:scale-105"
              width={48}
              height={48}
            />
            <span className="font-bold text-xl md:text-2xl tracking-wide text-white transition-opacity duration-300 group-hover:opacity-80">
              SPORTIFY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-sm font-medium py-2 transition-colors duration-300 group outline-none ${
                    pathname === link.path
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}

                  {/* Orange underline animation */}
                  <span
                    className={`absolute left-0 bottom-0 h-[1px] bg-[#FF7A00] transition-all duration-500 ease-out ${
                      pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Mobile Navigation */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 transition-colors focus:outline-none">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#050505]/95 backdrop-blur-xl text-white pt-12 pb-6 px-6 border-l border-white/10 w-full sm:max-w-sm overflow-y-auto h-full scrollbar-none">
                <div className="flex flex-col justify-between min-h-[calc(100vh-96px)]">
                  <div>
                    {/* Branding inside menu */}
                    <div className="flex items-center space-x-3 pb-6 border-b border-white/5 mb-4">
                      <Image
                        src={logo || "/placeholder.svg"}
                        alt="Sportify Logo"
                        className="w-8 h-8"
                        width={32}
                        height={32}
                      />
                      <span className="font-black text-lg tracking-wider text-white">
                        SPORTIFY
                      </span>
                    </div>

                    <nav className="flex flex-col space-y-1 mt-2">
                      {navLinks.map((link) => {
                        const isActive = pathname === link.path;
                        return (
                          <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setOpen(false)}
                            className={`group flex items-center justify-between py-3.5 px-2 border-b border-white/5 transition-all duration-300 outline-none ${
                              isActive ? "text-[#FF7A00]" : "text-white/70 hover:text-white"
                            }`}
                          >
                            <span className="text-base font-black uppercase tracking-widest group-hover:translate-x-1.5 transition-transform duration-300">
                              {link.name}
                            </span>
                            <div className="flex items-center space-x-2">
                              {isActive ? (
                                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-[#FF7A00] rounded">
                                  ACTIVE
                                </span>
                              ) : (
                                <span className="text-[10px] font-mono text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                  // GO
                                </span>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Footer in Drawer */}
                  <div className="pt-6 border-t border-white/5 mt-6 text-[8px] font-mono text-gray-500 space-y-1">
                    <div>SPORTIFY CONSOLE // MOBILE V2.5</div>
                    <div>STATUS: ACTIVE // LIVE FEED OK</div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;