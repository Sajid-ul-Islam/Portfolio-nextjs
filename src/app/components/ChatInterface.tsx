"use client";

import React, { useState } from "react";
import Panel from "./vscode/Panel";
import { FaCopy, FaCheck } from "react-icons/fa";

type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function ChatInterface() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshMessage, setRefreshMessage] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: "1", role: "assistant", content: "Hello! I am the AI agent for this portfolio. What would you like to know?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRefreshSnapshot = async () => {
        setIsRefreshing(true);
        setRefreshMessage("> INITIATING_SCRAPE...");
        try {
            // Calls the website scraping endpoint detailed in your README
            const res = await fetch('/api/site', { method: 'POST' });
            if (!res.ok) throw new Error("Failed to refresh");
            setRefreshMessage("> SNAPSHOT_UPDATED_SUCCESSFULLY");
        } catch (err) {
            setRefreshMessage("> ERROR_UPDATING_SNAPSHOT");
        } finally {
            setIsRefreshing(false);
            setTimeout(() => setRefreshMessage(""), 4000);
        }
    };

    const handleCopy = (id: string, text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const content = input.trim();
        if (!content || isLoading) return;

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content,
        };
        const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "",
        };
        const nextMessages = [...messages, userMessage];

        setMessages([...nextMessages, assistantMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: nextMessages.map(({ role, content }) => ({ role, content })),
                }),
            });

            if (!response.ok) throw new Error("Chat request failed");

            if (!response.body) {
                const text = await response.text();
                setMessages((current) =>
                    current.map((message) =>
                        message.id === assistantMessage.id ? { ...message, content: text } : message
                    )
                );
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let streamedContent = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                streamedContent += decoder.decode(value, { stream: true });
                setMessages((current) =>
                    current.map((message) =>
                        message.id === assistantMessage.id
                            ? { ...message, content: streamedContent }
                            : message
                    )
                );
            }
        } catch (error) {
            setMessages((current) =>
                current.map((message) =>
                    message.id === assistantMessage.id
                        ? { ...message, content: "Unable to reach the AI agent right now." }
                        : message
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Panel className="flex flex-col h-[500px] max-w-2xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-[var(--vscode-text-secondary)]">
                    SYSTEM // AI_AGENT_UPLINK
                </span>
                <div className="flex items-center gap-3">
                    {refreshMessage && <span className="text-xs text-[var(--vscode-accent)] font-mono animate-pulse">{refreshMessage}</span>}
                    <button
                        type="button"
                        onClick={handleRefreshSnapshot}
                        disabled={isRefreshing}
                        className="px-3 py-1 bg-[var(--vscode-bg)] hover:bg-white/5 border border-white/10 text-[var(--vscode-text-secondary)] hover:text-white text-xs rounded font-mono transition-colors disabled:opacity-50"
                    >
                        {isRefreshing ? "SCRAPING..." : "Refresh Site Snapshot"}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-4 py-3 rounded-lg max-w-[85%] text-sm ${m.role === 'user' ? 'bg-[var(--vscode-accent)] text-black' : 'bg-[var(--vscode-bg)] border border-white/10 text-[var(--vscode-text-primary)] group relative'}`}>
                            <div className="flex justify-between items-start mb-1.5 gap-4">
                                <span className={`font-bold text-xs opacity-50 font-mono ${m.role === 'user' ? 'text-black' : 'text-[var(--vscode-text-secondary)]'}`}>
                                    {m.role === 'user' ? 'YOU' : 'AI_AGENT'}
                                </span>
                                {m.role === 'assistant' && (
                                    <button
                                        onClick={() => handleCopy(m.id, m.content)}
                                        className="text-[var(--vscode-text-secondary)] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Copy to clipboard"
                                    >
                                        {copiedId === m.id ? <FaCheck className="text-green-400" size={12} /> : <FaCopy size={12} />}
                                    </button>
                                )}
                            </div>
                            <p className="whitespace-pre-wrap leading-relaxed font-sans">{m.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="text-[var(--vscode-accent)] text-xs animate-pulse font-mono">
                        {'> RETRIEVING_DATA...'}
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
