"use client";
import React from 'react';
import { education } from '../data';
import { FaGraduationCap } from 'react-icons/fa';

const Education = () => {
  return (
    <section id="education" className="py-20 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="border-b-4 border-accent pb-2">Education</span>
          </h2>
          <p className="text-gray-400">My academic background</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {education.map((edu, index) => (
            <div key={index} className="group relative p-8 rounded-2xl bg-dark-lighter border border-white/5 hover:border-accent/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/10">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaGraduationCap size={24} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {edu.institution}
                </h3>

                <p className="text-gray-300 font-medium mb-4">
                  {edu.degree}
                </p>

                <a
                  href={edu.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2"
                >
                  Visit Website &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
