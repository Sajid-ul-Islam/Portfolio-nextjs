import React from "react";
import Link from "next/link";
import {
  FaEnvelope,
  FaWhatsapp,
  FaLinkedinIn,
  FaGithub,
  FaKaggle,
  FaFacebookF,
} from "react-icons/fa";

// Social links array
const socialLinks = [
  {
    href: "https://www.linkedin.com/in/sajidislamchowdhury/",
    icon: FaLinkedinIn,
  },
  { href: "https://github.com/saajiidi", icon: FaGithub },
  { href: "https://www.kaggle.com/saajiidi", icon: FaKaggle },
  {
    href: "https://www.facebook.com/Islam.Sajid.Chowdhury/",
    icon: FaFacebookF,
  },
];

// Family background array
const familyAndRelatives = [
  {
    relation: "Father",
    name: "Shahed Chowdhury",
    occupation: "Merchandiser, Stocklot Business",
  },
  {
    relation: "Mother",
    name: "Suraiya Haque",
    occupation: "Former KG School Teacher, House Wife",
  },
  {
    relation: "Paternal Grandfather",
    name: "Late. Mazharul Islam Chowdhury",
    occupation: "Former Head Master, PG Govt. High School",
  },
  {
    relation: "Maternal Grandfather",
    name: "Late. Shamsul Haque",
    occupation: "Former Govt. Officer, Land Acquisition",
  },
  {
    relation: "Paternal Uncle",
    name: "Nurul Alam Chowdhury",
    occupation: "Lieutenant Colonel (Rtd), Bangladesh Army",
  },
  {
    relation: "Maternal Uncle",
    name: "Moazzem Hossain",
    occupation: "Principal Officer (Rtd), Shonali Bank Ltd.",
  },
  {
    relation: "Paternal Uncle",
    name: "Farid Ahmed Chowdhury",
    occupation: "Head of Philosophy Dept. Chittagong College",
  },
  {
    relation: "Sibling (Younger)",
    name: "Sakib Islam",
    occupation:
      "Studied Fashion and Apparel Design at BUFT",
    link: "https://www.facebook.com/profile.php?id=61558077623189",
  },
];

const About = () => {
  return (
    <section
      className="p-3 lg:p-5 flex flex-col items-center text-white"
      id="about"
    >
      <div className="w-full p-5 rounded-lg shadow-lg">
        <h1 className="mb-0 text-4xl font-bold text-center">
          Sajid <span className="text-primary">Islam</span>
        </h1>
        <div className="mb-5 text-primary text-center">
          <p className="flex justify-center items-center">
            <FaEnvelope className="inline mr-2" />
            <a
              href="mailto:sajid.islam.chowdhury@gmail.com"
              className="text-white"
            >
              sajid.islam.chowdhury@gmail.com
            </a>
          </p>
          <p className="flex justify-center items-center">
            <FaWhatsapp className="inline mr-2" />
            <a href="tel:+880609784088" className="text-white">
              +8801609784088
            </a>
          </p>
        </div>

        <div className="social-icons flex justify-center space-x-4 mb-5">
          {socialLinks.map(({ href, icon: Icon }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              className="text-white text-3xl hover:scale-110 transition-transform"
            >
              <Icon />
            </a>
          ))}
        </div>

        <p className="mb-5 text-center">
          Experienced in leveraging data-driven insights to optimize business
          processes and drive strategic decision-making. Eager to contribute
          analytical expertise and technical proficiency to a dynamic
          organization.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-center">
          Family & Relatives
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {familyAndRelatives.map((member, index) => (
            <div key={index} className="p-4 bg-black rounded-lg shadow-md">
              <h3 className="mb-1 text-xl font-semibold">{member.relation}</h3>
              <p className="mb-1">{member.name}</p>
              <p>{member.occupation}</p>
              {member.link && (
                <Link href={member.link} legacyBehavior>
                  <a
                    className="text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Owner - Gear Master
                  </a>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
