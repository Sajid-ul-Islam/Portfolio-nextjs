"use client";

import { useState } from "react";
import Image from "next/image";
import profilePic from "/public/img/profile.jpg";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 h-full w-full lg:w-64 bg-primary text-white flex flex-col items-center">
      <a className="mt-8 mb-4" href="#page-top">
        <span className="block lg:hidden text-center">Sajid Islam</span>
        <span className="hidden lg:block">
          <Image
            src={profilePic}
            alt="Sajid Islam"
            className="rounded-full mx-auto"
            width={128}
            height={128}
          />
        </span>
      </a>
      <button
        className="lg:hidden block text-white"
        onClick={() => setIsOpen(!isOpen)}
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
      <div
        className={`lg:flex ${
          isOpen ? "block" : "hidden"
        } flex-col items-center w-full`}
        id="navbarSupportedContent"
      >
        <ul className="flex flex-col items-center lg:items-start lg:space-y-4 w-full lg:w-auto">
          <li className="nav-item">
            <a
              className="nav-link hover:text-gray-400"
              href="#about"
              onClick={handleLinkClick}
            >
              About
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link hover:text-gray-400"
              href="#experience"
              onClick={handleLinkClick}
            >
              Experience
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link hover:text-gray-400"
              href="#education"
              onClick={handleLinkClick}
            >
              Education
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link hover:text-gray-400"
              href="#skills"
              onClick={handleLinkClick}
            >
              Skills
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link hover:text-gray-400"
              href="#interests"
              onClick={handleLinkClick}
            >
              Interests
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link hover:text-gray-400"
              href="#awards"
              onClick={handleLinkClick}
            >
              Awards
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link hover:text-gray-400"
              href="#projects"
              onClick={handleLinkClick}
            >
              Projects
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link hover:text-gray-400"
              href="https://drive.google.com/file/d/1V5hGl1LIDtOWRn8hgcAtzNwxDfWwI1L_/view?usp=drive_link"
              target="_blank"
              onClick={handleLinkClick}
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
