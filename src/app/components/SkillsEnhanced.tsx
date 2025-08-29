"use client";

import React, { useState, useEffect } from "react";
import {
  FaCheck,
  FaCode,
  FaDatabase,
  FaChartLine,
  FaTools,
  FaProjectDiagram,
} from "react-icons/fa";

interface Skill {
  name: string;
  level: number;
  icon: React.ComponentType;
  category: string;
}

const SkillsEnhanced = () => {
  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({});

  const skills: Skill[] = [
    { name: "Digital Sales & Marketing", level: 85, icon: FaChartLine, category: "Business" },
    { name: "Data Analysis & Reporting", level: 90, icon: FaDatabase, category: "Analytics" },
    { name: "Market Analysis & Research", level: 80, icon: FaChartLine, category: "Business" },
    { name: "Product Development & Management", level: 75, icon: FaProjectDiagram, category: "Management" },
    { name: "React & Next.js", level: 85, icon: FaCode, category: "Frontend" },
    { name: "Python & Data Science", level: 80, icon: FaDatabase, category: "Programming" },
    { name: "SQL & Database Management", level: 85, icon: FaDatabase, category: "Database" },
    { name: "Tailwind CSS & Bootstrap", level: 90, icon: FaTools, category: "Frontend" },
  ];

  const workflows = [
    { name: "Cross Functional Teams", icon: FaCheck },
    { name: "Agile Development & Scrum", icon: FaCheck },
    { name: "Data-Driven Decision Making", icon: FaCheck },
    { name: "Strategic Planning", icon: FaCheck },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const levels: { [key: string]: number } = {};
      skills.forEach((skill) => {
        levels[skill.name] = skill.level;
      });
      setAnimatedLevels(levels);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const categories = [...new Set(skills.map(skill => skill.category))];

  const SkillBar = ({ skill }: { skill: Skill }) => {
    const animatedLevel = animatedLevels[skill.name] || 0;
    
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <skill.icon className="text-blue-400" />
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
          <span className="text-sm text-blue-400 font-semibold">{skill.level}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${animatedLevel}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <section
      className="p-3 lg:p-5 flex flex-col items-center text-white animate-fade-in"
      id="skills"
    >
      <div className="w-full max-w-6xl">
        <h2 className="mb-8 text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Skills & Expertise
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {categories.map((category) => (
            <div key={category} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-amber-400">{category}</h3>
              {getSkillsByCategory(category).map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-amber-400">Workflow & Methodologies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflows.map((workflow, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
                <workflow.icon className="text-green-400" />
                <span>{workflow.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsEnhanced;
