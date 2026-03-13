"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = React.useMemo(() => [
    { id: "hero", label: "Home", href: "/#hero" },
    { id: "about", label: "About", href: "/#about" },
    { id: "portfolio", label: "Portfolio", href: "/#portfolio" },
    { id: "blog", label: "Insights", href: "/#blog" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ], []);

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
  }, [navItems]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-paper/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-ink"
        >
          Sajid<span className="text-ink/40">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`font-medium transition-colors relative group ${
                activeSection === item.id ? "text-ink" : "text-ink/70 hover:text-ink"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-ink transition-all ${
                  activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </a>
          ))}
          <a
            href="/#contact"
            className="px-4 py-2 rounded-full border border-ink/20 text-ink hover:bg-ink hover:text-paper transition-all duration-300"
          >
            Let&apos;s Talk
          </a>
          <a
            href="https://drive.google.com/file/d/1V5hGl1LIDtOWRn8hgcAtzNwxDfWwI1L_/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-ink/10 text-ink hover:bg-ink hover:text-paper transition-all duration-300"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-ink text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-paper/95 backdrop-blur-xl border-t border-ink/10 p-6 md:hidden flex flex-col space-y-4 shadow-2xl animate-fade-in">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-ink text-lg font-medium hover:text-ink/60"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contact"
              className="text-ink font-bold"
              onClick={() => setIsOpen(false)}
            >
              Let&apos;s Talk
            </a>
            <a
              href="https://drive.google.com/file/d/1V5hGl1LIDtOWRn8hgcAtzNwxDfWwI1L_/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink font-bold"
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
