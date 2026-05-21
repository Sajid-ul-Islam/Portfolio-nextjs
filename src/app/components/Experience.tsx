"use client";
import React, { useState } from 'react';
import { experience } from '../data';
import { FaBriefcase, FaChevronDown } from 'react-icons/fa';

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-20 bg-dark-lighter">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="border-b-4 border-primary pb-2">Experience</span>
          </h2>
          <p className="text-gray-400">My professional journey</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-primary to-accent opacity-30"></div>

          {experience.map((exp, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

              {/* Animated Dot on Line */}
              <div className={`absolute left-[-5px] md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full z-10 mt-6 shadow-lg transition-all duration-500 border-2 border-dark ${expandedIndex === index ? 'bg-primary shadow-primary/50 scale-125' : 'bg-accent shadow-accent/50 hover:scale-110'}`}></div>

              {/* Content Card */}
              <div className="md:w-1/2 pl-8 md:pl-0 md:pr-12 md:text-right group">
                <div
                  onClick={() => toggleExpand(index)}
                  className={`p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 backdrop-blur-sm cursor-pointer ${index % 2 === 0 && 'md:text-left md:ml-12 md:pr-0'}`}
                >
                  <div className={`flex items-center justify-between gap-3 mb-2 text-primary w-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex items-center gap-2 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <FaBriefcase className="text-lg" />
                      <span className="text-sm font-semibold tracking-wider text-accent">{exp.company}</span>
                    </div>
                    <div className="flex-shrink-0 text-gray-500 opacity-40 group-hover:opacity-100 transition-opacity">
                      <FaChevronDown className={`transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{exp.role}</h3>
                  {exp.group && <p className="text-sm text-gray-500 mb-3">{exp.group}</p>}

                  <div className={`grid transition-all duration-300 ease-in-out ${expandedIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <ul className="space-y-2">
                        {exp.tasks.map((task, i) => (
                          <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0"></span>
                            <span className={index % 2 === 0 ? 'text-left' : 'text-left md:text-right'}>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spacer for other side */}
              <div className="md:w-1/2 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
