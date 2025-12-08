"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Interests", href: "#interests" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-dark/80 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Sajid<span className="text-white">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-gray-300 hover:text-accent font-medium transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1V5hGl1LIDtOWRn8hgcAtzNwxDfWwI1L_/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-dark/95 backdrop-blur-xl border-t border-white/10 p-6 md:hidden flex flex-col space-y-4 shadow-2xl animate-fade-in">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-white text-lg font-medium hover:text-accent"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1V5hGl1LIDtOWRn8hgcAtzNwxDfWwI1L_/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold"
              onClick={() => setIsOpen(false)}
            >
              Download Resume
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
