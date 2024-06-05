import Image from "next/image";
import profilePic from "/public/img/profile.jpg";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-primary text-white flex flex-col items-center">
      <a href="#page-top" className="mt-8 mb-4">
        <Image
          src={profilePic}
          alt="Sajid Islam"
          className="rounded-full w-32 h-32"
        />
      </a>
      <ul className="flex flex-col space-y-4">
        <li>
          <a href="#about" className="hover:text-gray-400">
            About
          </a>
        </li>
        <li>
          <a href="#experience" className="hover:text-gray-400">
            Experience
          </a>
        </li>
        <li>
          <a href="#education" className="hover:text-gray-400">
            Education
          </a>
        </li>
        <li>
          <a href="#skills" className="hover:text-gray-400">
            Skills
          </a>
        </li>
        <li>
          <a href="#interests" className="hover:text-gray-400">
            Interests
          </a>
        </li>
        <li>
          <a href="#awards" className="hover:text-gray-400">
            Awards
          </a>
        </li>
        <li>
          <a href="#projects" className="hover:text-gray-400">
            Projects
          </a>
        </li>
        <li>
          <a
            href="https://drive.google.com/file/d/1V5hGl1LIDtOWRn8hgcAtzNwxDfWwI1L_/view?usp=drive_link"
            target="_blank"
            className="hover:text-gray-400"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}
