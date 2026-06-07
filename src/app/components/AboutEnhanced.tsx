"use client";

import React from "react";
import { FaEnvelope, FaWhatsapp, FaFileDownload, FaTerminal } from "react-icons/fa";
import Panel from "./vscode/Panel";
import { personalInfo } from "../data";

export default function AboutEnhanced() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* VS Code syntax header */}
            <div className="mb-6 border-b border-white/10 pb-3">
                <h2 className="text-lg md:text-xl font-bold text-[var(--vscode-text-primary)] tracking-widest flex items-center gap-2 font-mono">
                    <FaTerminal className="text-cyan-400" />
                    <span className="text-purple-400">const</span>
                    <span className="text-blue-400">Profile</span>
                    <span className="text-white">=</span>
                    <span className="text-yellow-300">{`{`}</span>
                </h2>
            </div>

            {/* Bento Box Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-2 md:ml-4 border-l border-white/10 pl-4 md:pl-6 pb-4">

                {/* Main Bio Box (Spans 2 columns on desktop) */}
                <Panel className="md:col-span-2 p-8 relative overflow-hidden group bg-[#0d1117]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 transition-all duration-500">
                    {/* Subtle Gradient Glow */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700"></div>

                    <div className="relative z-10">
                        <p className="font-mono text-xs text-cyan-400/80 mb-4 tracking-wider uppercase">
                            {/* IDENTITY_CONFIRMED */}
                        </p>
                        <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                            {personalInfo.name}
                        </h1>
                        <h2 className="text-xl md:text-2xl font-semibold text-white/90 mb-6 font-sans">
                            {personalInfo.title}
                        </h2>
                        <p className="text-sm md:text-base text-[var(--vscode-text-secondary)] leading-relaxed font-sans max-w-2xl">
                            {personalInfo.bio}
                        </p>
                    </div>
                </Panel>

                {/* Quick Actions / Contact Box */}
                <Panel className="col-span-1 p-8 flex flex-col justify-center space-y-4 bg-[#0d1117]/80 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 relative overflow-hidden group">
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700"></div>

                    <div className="relative z-10 w-full space-y-4 font-mono">
                        <p className="text-xs text-purple-400/80 mb-2 tracking-wider uppercase">
                            {/* ESTABLISH_CONNECTION */}
                        </p>

                        <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 w-full px-4 py-3 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 rounded-lg text-white text-sm font-medium transition-all group/btn">
                            <FaFileDownload className="text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                            <span>Download.Resume()</span>
                        </a>

                        <a href={`mailto:${personalInfo.email}`}
                            className="flex items-center gap-3 w-full px-4 py-3 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 rounded-lg text-white text-sm font-medium transition-all group/btn">
                            <FaEnvelope className="text-blue-400 group-hover/btn:scale-110 transition-transform" />
                            <span>Send.Email()</span>
                        </a>

                        <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 w-full px-4 py-3 bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/50 rounded-lg text-white text-sm font-medium transition-all group/btn">
                            <FaWhatsapp className="text-green-400 group-hover/btn:scale-110 transition-transform" />
                            <span>Ping.WhatsApp()</span>
                        </a>
                    </div>
                </Panel>
            </div>

            {/* VS Code syntax footer */}
            <div className="text-lg md:text-xl font-bold text-yellow-300 tracking-widest mt-2 font-mono">
                {`};`}
            </div>
        </div>
    );
}