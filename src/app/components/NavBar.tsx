"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import profilePic from "/public/img/profile.jpg";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev: boolean) => !prev);
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#interests", label: "Interests" },
    { href: "#awards", label: "Awards" },
    { href: "#projects", label: "Projects" },
    {
      href: "https://drive.google.com/file/d/1V5hGl1LIDtOWRn8hgcAtzNwxDfWwI1L_/view?usp=drive_link",
      label: "Resume",
      external: true,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full lg:w-64 bg-slate-900/95 backdrop-blur-sm text-white flex flex-col items-center z-50 p-2 lg:p-4 border-r border-slate-700/50">
      <div className="flex items-center justify-between w-full lg:flex-col">
        <a href="#page-top" className="flex items-center lg:flex-col lg:mb-4">
          <Image
            src={profilePic}
            alt="Sajid Islam"
            className="hidden lg:block rounded-full border-4 border-white mr-3 lg:mr-0 lg:mb-2"
            width={120}
            height={120}
          />
        </a>
        <button
          className="lg:hidden block text-white hover:text-blue-400 transition-colors duration-200"
          onClick={toggleMenu}
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`lg:flex ${
          isOpen ? "flex" : "hidden"
        } flex-col lg:flex-col items-center w-full`}
        id="navbarSupportedContent"
      >
        <ul className="flex flex-col lg:flex-col items-center w-full lg:w-auto lg:space-y-4">
          {navItems.map((item, index) => (
            <li className="nav-item" key={index}>
              <a
                className="nav-link hover:text-gray-400 p-2"
                href={item.href}
                onClick={handleLinkClick}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : ""}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
