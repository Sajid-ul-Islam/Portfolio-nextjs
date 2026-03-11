"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", label: "Home", href: "/#hero" },
    { id: "experience", label: "Experience", href: "/#experience" },
    { id: "education", label: "Education", href: "/#education" },
    { id: "skills", label: "Skills", href: "/#skills" },
    { id: "projects", label: "Projects", href: "/#projects" },
    { id: "interests", label: "Interests", href: "/#interests" },
    { id: "family", label: "Family", href: "/#family" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-dark/80 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Sajid<span className="text-white">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`font-medium transition-colors relative group ${
                activeSection === item.id ? "text-accent" : "text-gray-300 hover:text-accent"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all ${
                  activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </a>
          ))}
          <a
            href="/#contact"
            className="px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            Let&apos;s Talk
          </a>
          <a
            href="https://drive.google.com/file/d/1V5hGl1LIDtOWRn8hgcAtzNwxDfWwI1L_/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
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
              href="/#contact"
              className="text-primary font-bold"
              onClick={() => setIsOpen(false)}
            >
              Let&apos;s Talk
            </a>
            <a
              href="https://drive.google.com/file/d/1V5hGl1LIDtOWRn8hgcAtzNwxDfWwI1L_/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold"
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
