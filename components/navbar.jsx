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
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isScrolled
          ? "bg-[rgba(5,5,5,0.8)] backdrop-blur-[20px] py-2"
          : "bg-transparent py-6"
      }`}
    >
      {/* Thin orange bottom line */}
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-[#FF7A00] transition-opacity duration-500 ${isScrolled ? 'opacity-30' : 'opacity-0'}`}></div>

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
            <nav className="max-md:hidden md:flex items-center space-x-8">
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
              <SheetContent side="right" className="bg-[#050505] text-white pt-10 border-l border-white/10">
                <div className="flex flex-col space-y-8 mt-12">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setOpen(false)}
                      className={`text-2xl font-medium transition-colors duration-300 relative inline-block w-fit ${
                        pathname === link.path ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {link.name}
                      <span
                        className={`absolute left-0 -bottom-2 h-[2px] bg-[#FF7A00] transition-all duration-500 ease-out ${
                          pathname === link.path ? "w-full" : "w-0"
                        }`}
                      ></span>
                    </Link>
                  ))}
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