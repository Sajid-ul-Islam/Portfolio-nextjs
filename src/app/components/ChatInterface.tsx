"use client";

import React from "react";
import { useChat } from "ai/react";
import Panel from "./vscode/Panel";

export default function ChatInterface() {
    // useChat automatically POSTs to the `/api/chat` endpoint by default
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        initialMessages: [
            { id: '1', role: 'assistant', content: 'Hello! I am the AI agent for this portfolio. What would you like to know?' }
        ]
    });

    return (
        <Panel className="flex flex-col h-[500px] max-w-2xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                {messages.map(m => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-4 py-3 rounded-lg max-w-[85%] text-sm ${m.role === 'user' ? 'bg-[var(--vscode-accent)] text-black' : 'bg-[#0d1117] border border-white/10 text-[var(--vscode-text-primary)]'}`}>
                            <span className={`font-bold text-xs opacity-50 block mb-1.5 font-mono ${m.role === 'user' ? 'text-black' : 'text-[var(--vscode-text-secondary)]'}`}>
                                {m.role === 'user' ? 'YOU' : 'AI_AGENT'}
                            </span>
                            <p className="whitespace-pre-wrap leading-relaxed font-sans">{m.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="text-[var(--vscode-accent)] text-xs animate-pulse font-mono">
            > RETRIEVING_DATA...
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3 border-t border-white/10 pt-4">
                <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask a question..."
                    className="flex-1 bg-[#0d1117] border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--vscode-accent)] font-mono transition-colors"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-6 py-2.5 bg-[var(--vscode-accent)] hover:bg-[var(--vscode-accent)]/80 text-black font-bold rounded font-mono text-sm transition-colors disabled:opacity-50 flex justify-center items-center"
                >
                    SEND
                </button>
            </form>
        </Panel>
    );
}