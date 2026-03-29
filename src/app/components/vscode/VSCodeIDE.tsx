"use client";

import { useState } from "react";
import ActivityBar from "./ActivityBar";
import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import Terminal from "./Terminal";
import AIChat from "./AIChat";

export default function VSCodeIDE({ children }: { children: React.ReactNode }) {
  const [activeSide, setActiveSide] = useState<"explorer" | "search" | "git" | "extensions" | "account" | "settings" | "terminal" | "chat">('explorer');
  const [activeFile, setActiveFile] = useState('about');
  const [showTerminal, setShowTerminal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  const handleSidebarChange = (id: "explorer" | "search" | "git" | "extensions" | "account" | "settings" | "terminal" | "chat") => {
    if (id === 'terminal') {
      setShowTerminal(!showTerminal);
    } else if (id === 'chat') {
      setShowAIChat(!showAIChat);
    } else {
      setActiveSide(id);
    }
  };

  const handleActiveFileChange = (id: string) => {
    setActiveFile(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#121212] flex-col overflow-hidden text-white font-sans selection:bg-[#a3e635]/30">
        <div className="flex flex-1 w-full overflow-hidden">
            <ActivityBar activeItem={activeSide} onItemClick={handleSidebarChange} />
            <Sidebar activePanel={activeSide} />
            
            <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e] relative">
                {/* Editor Tabs */}
                <div className="h-9 w-full bg-[#1e1e1e] border-b border-[#a3e635]/10 flex overflow-x-auto scrollbar-none items-center">
                    {['about', 'experience', 'education', 'skills', 'projects', 'awards'].map(f => (
                        <button
                            key={f}
                            onClick={() => handleActiveFileChange(f)}
                            className={`h-full px-4 text-xs font-mono flex items-center justify-center border-r border-[#a3e635]/5 min-w-[120px] transition-all duration-200 relative group truncate ${
                                activeFile === f 
                                    ? 'bg-[#1e1e1e] text-[#a3e635] border-t-2 border-t-[#a3e635]' 
                                    : 'bg-[#2d2d2d] text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            <span>{f}.{f === 'about' ? 'py' : f === 'experience' ? 'json' : f === 'projects' ? 'tsx' : 'txt'}</span>
                            {activeFile === f && (
                                <span className="ml-2 w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_rgba(163,230,53,0.8)]"></span>
                            )}
                            <span 
                                className="absolute right-2 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity" 
                                onClick={(e) => e.stopPropagation()}
                            >
                                ×
                            </span>
                        </button>
                    ))}
                </div>

                {/* Breadcrumbs */}
                <div className="h-6 w-full bg-[#1e1e1e]/50 border-b border-[#a3e635]/5 px-4 flex items-center gap-2 text-[10px] text-gray-500 font-mono tracking-widest">
                    <span className="opacity-40">SAJID_PORTFOLIO</span>
                    <span className="opacity-20">&gt;</span>
                    <span className="text-[#a3e635]/50 activeFile capitalize">{activeFile}</span>
                </div>

                {/* Editor Content Area */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#a3e635]/20 p-2 lg:p-4 bg-[#1e1e1e] selection:bg-[#a3e635]/30">
                    <div className="max-w-4xl mx-auto space-y-32 py-20 pb-64">
                        {children}
                    </div>
                </div>

                {/* Bottom Panels (Terminal) */}
                {showTerminal && (
                    <div className="absolute bottom-0 left-0 right-0 h-64 z-50">
                        <Terminal onClose={() => setShowTerminal(false)} />
                    </div>
                )}
            </div>
        </div>

        {/* Floating AI Chat Bot */}
        <div className="fixed bottom-10 right-10 z-[2000]">
            {!showAIChat && (
                <button 
                    onClick={() => setShowAIChat(true)}
                    className="w-14 h-14 rounded-full bg-[#a3e635] text-black shadow-[0_0_20px_rgba(163,230,53,0.6)] flex items-center justify-center text-2xl hover:scale-110 transition-all duration-300 animate-bounce cursor-pointer border-2 border-black"
                    title="ACTIVATE_AI"
                >
                    🤖
                </button>
            )}
            {showAIChat && <AIChat onClose={() => setShowAIChat(false)} />}
        </div>

        <StatusBar />
        
        {/* HUD Elements from index.html */}
        <div className="scanlines fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] opacity-[0.03]"></div>
    </div>
  );
}
