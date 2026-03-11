"use client";
import React from "react";
import { posts } from "../data";

const Insights = () => {
  return (
    <section id="blog" className="py-20 bg-paper">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-2">
              Insights
            </h2>
            <p className="text-ink/70">Thoughts on analytics, BI, and growth</p>
          </div>
          <a
            href="#"
            className="text-ink/70 hover:text-ink underline decoration-dotted"
          >
            View all
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={post.link}
              className="p-6 rounded-2xl bg-white border border-ink/10 hover:border-ink/40 transition-all"
            >
              <div className="text-xs uppercase tracking-wider text-ink/60 mb-3">
                {post.category}
              </div>
              <h3 className="text-lg font-semibold text-ink">
                {post.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
