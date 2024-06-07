import React from "react";
import {
  FaChartLine,
  FaDollarSign,
  FaBriefcase,
  FaBook,
  FaLaptop,
} from "react-icons/fa";

const Interests = () => {
  const interests = [
    { name: "Data Science", icon: FaChartLine },
    { name: "Economics", icon: FaDollarSign },
    { name: "Business", icon: FaBriefcase },
    { name: "History", icon: FaBook },
    { name: "Technology", icon: FaLaptop },
  ];

  return (
    <section
      className="p-3 lg:p-5 flex flex-col items-center text-white"
      id="interests"
    >
      <div className="w-full p-5 rounded-lg shadow-lg bg-black">
        <h2 className="mb-5 text-3xl font-bold text-left">Interests</h2>
        <ul className="space-y-2 px-5">
          {interests.map((interest, index) => (
            <li key={index} className="flex items-center">
              <interest.icon className="text-primary mr-3" />
              {interest.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Interests;
