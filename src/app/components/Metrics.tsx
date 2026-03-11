"use client";
import React from "react";
import { metrics } from "../data";

const Metrics = () => {
  return (
    <section id="metrics" className="py-16 bg-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-dark-lighter border border-white/5 hover:border-accent/40 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {item.value}
              </div>
              <div className="text-sm uppercase tracking-wider text-accent mb-1">
                {item.label}
              </div>
              <div className="text-xs text-gray-400">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
