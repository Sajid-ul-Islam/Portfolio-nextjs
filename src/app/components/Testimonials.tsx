"use client";
import React from "react";
import { testimonials } from "../data";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-dark-lighter">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="border-b-4 border-accent pb-2">Testimonials</span>
          </h2>
          <p className="text-gray-400">What collaborators say</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-dark border border-white/5 hover:border-primary/30 transition-all duration-300"
            >
              <FaQuoteLeft className="text-accent text-xl mb-4" />
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {t.quote}
              </p>
              <div className="text-white font-semibold">{t.name}</div>
              <div className="text-xs text-gray-400">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
