"use client";
import React from 'react';
import { interests, awards } from '../data';
import { FaTrophy } from 'react-icons/fa';

const Interests = () => {
  return (
    <section id="interests" className="py-20 bg-dark-lighter relative">
      <div className="container mx-auto px-6">
        {/* Interests Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="border-b-4 border-primary pb-2">Interests & Passions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interests.map((item, index) => (
              <div key={index} className="p-6 rounded-xl bg-dark border border-white/5 hover:border-primary/30 transition-all duration-300 hover:bg-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards Section (Merged here for flow, or could be separate) */}
        {/* But NavBar links to #awards, so let's keep the ID accessible */}
        <div id="awards" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="border-b-4 border-accent pb-2">Awards & Certifications</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {awards.map((award, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-r from-dark to-dark-lighter border border-white/5 hover:border-accent/30 transition-all duration-300 flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <FaTrophy className="text-accent text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{award.name}</h4>
                  <span className="text-xs uppercase tracking-wider text-primary font-semibold block mb-2">{award.title}</span>
                  {award.details && <p className="text-gray-400 text-sm mb-2">{award.details}</p>}
                  <a
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-white underline decoration-dotted transition-colors"
                  >
                    View Certificate/Paper
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interests;
