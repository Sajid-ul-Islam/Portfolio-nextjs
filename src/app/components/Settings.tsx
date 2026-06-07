"use client";

import React, { useState, useEffect } from 'react';
import { LuSettings, LuX, LuCheck, LuPalette, LuTerminal } from 'react-icons/lu';
import Panel from './vscode/Panel';

export const themes = [
    {
        id: 'github-dark',
        name: 'GitHub Dark',
        colors: { bg: '#0d1117', accent: '#a3e635', primary: '#ffffff', secondary: '#8b949e' }
    },
    {
        id: 'monokai',
        name: 'Monokai',
        colors: { bg: '#272822', accent: '#f92672', primary: '#f8f8f2', secondary: '#75715e' }
    },
    {
        id: 'dracula',
        name: 'Dracula',
        colors: { bg: '#282a36', accent: '#bd93f9', primary: '#f8f8f2', secondary: '#6272a4' }
    },
    {
        id: 'nord',
        name: 'Nord',
        colors: { bg: '#2e3440', accent: '#88c0d0', primary: '#eceff4', secondary: '#4c566a' }
    }
];

export const applyTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty('--vscode-bg', theme.colors.bg);
    root.style.setProperty('--vscode-accent', theme.colors.accent);
    root.style.setProperty('--vscode-text-primary', theme.colors.primary);
    root.style.setProperty('--vscode-text-secondary', theme.colors.secondary);
    localStorage.setItem('vscode-theme', themeId);
};

export default function Settings() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('github-dark');

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        const handleKeydown = (e: KeyboardEvent) => {
            // Standard VS Code shortcut: Ctrl + ,
            if ((e.ctrlKey || e.metaKey) && e.key === ',') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };

        document.addEventListener('open-settings', handleOpen);
        window.addEventListener('keydown', handleKeydown);

        const savedTheme = localStorage.getItem('vscode-theme') || 'github-dark';
        handleApplyTheme(savedTheme);

        return () => {
            document.removeEventListener('open-settings', handleOpen);
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [isOpen]); // Removed applyTheme from deps to avoid unnecessary cycles

    const handleApplyTheme = (themeId: string) => {
        applyTheme(themeId);
        setCurrentTheme(themeId);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <Panel className="w-full max-w-lg p-8 relative shadow-2xl border border-white/10 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--vscode-accent)]" />

                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-[var(--vscode-text-secondary)] hover:text-white transition-colors">
                    <LuX size={20} />
                </button>

                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                    <LuSettings className="text-[var(--vscode-accent)]" size={24} />
                    <h2 className="text-xl font-bold font-mono tracking-tight text-[var(--vscode-text-primary)]">Settings</h2>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-mono uppercase tracking-widest text-[var(--vscode-accent)] mb-4 block">
                            {'// Workbench: Color Theme'}
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                            {themes.map((theme) => (
                                <button
                                    key={theme.id}
                                    onClick={() => handleApplyTheme(theme.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded border font-mono text-sm transition-all group ${currentTheme === theme.id
                                        ? 'bg-[var(--vscode-accent)] text-black border-[var(--vscode-accent)]'
                                        : 'bg-[#0d1117] border-white/5 text-[var(--vscode-text-secondary)] hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <LuPalette className={currentTheme === theme.id ? 'text-black' : 'text-[var(--vscode-accent)]'} />
                                        <span>{theme.name}</span>
                                    </div>
                                    {currentTheme === theme.id && <LuCheck size={18} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[var(--vscode-text-secondary)]">
                    <div className="flex items-center gap-2">
                        <LuTerminal size={12} />
                        <span>{'> settings.json updated locally.'}</span>
                    </div>
                </div>
            </Panel>
        </div>
    );
}