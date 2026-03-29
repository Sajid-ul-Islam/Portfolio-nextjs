"use client";

import { useState } from "react";

const icons = [
  { id: 'explorer', icon: '📁', label: 'EXPLORER' },
  { id: 'search', icon: '🔍', label: 'SEARCH' },
  { id: 'git', icon: '🌿', label: 'GIT_SYNC' },
  { id: 'chat', icon: '🤖', label: 'AI_CHAT' },
  { id: 'terminal', icon: '💻', label: 'TERMINAL' },
  { id: 'settings', icon: '⚙️', bottom: true, label: 'SETTINGS' },
  { id: 'account', icon: '👤', bottom: true, label: 'ACCOUNT' },
];

export default function ActivityBar({ active, onChange }: { active: string, onChange: (id: string) => void }) {
  return (
    <div className="w-12 h-screen bg-[#0a0a0a] border-r border-[#a3e635]/20 flex flex-col items-center py-4 z-50">
      <div className="flex-1 space-y-4">
        {icons.filter(i => !i.bottom).map(i => (
          <button 
            key={i.id} 
            onClick={() => onChange(i.id)}
            title={i.label}
            className={`w-10 h-10 flex items-center justify-center text-xl transition-all duration-200 border-l-2 ${
              active === i.id 
                ? 'text-[#a3e635] border-[#a3e635] scale-110 drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]' 
                : 'text-gray-600 border-transparent hover:text-gray-400'
            }`}
          >
            {i.icon}
          </button>
        ))}
      </div>
      <div className="space-y-4 mb-4">
        {icons.filter(i => i.bottom).map(i => (
          <button 
            key={i.id} 
            onClick={() => onChange(i.id)}
            title={i.label}
            className={`w-10 h-10 flex items-center justify-center text-xl transition-all duration-200 border-l-2 ${
              active === i.id 
                ? 'text-[#a3e635] border-[#a3e635]' 
                : 'text-gray-600 border-transparent hover:text-gray-400'
            }`}
          >
            {i.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
