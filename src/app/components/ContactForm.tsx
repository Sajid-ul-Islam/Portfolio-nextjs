"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Panel from "./vscode/Panel";

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formRef.current) return;
        setStatus("loading");

        try {
            // Note: Replace these placeholders with your actual EmailJS Service ID, Template ID, and Public Key.
            // You can also pass these from process.env.NEXT_PUBLIC_... inside your .env.local
            await emailjs.sendForm(
                "YOUR_SERVICE_ID",
                "YOUR_TEMPLATE_ID",
                formRef.current,
                "YOUR_PUBLIC_KEY"
            );

            setStatus("success");
            formRef.current.reset();

            // Reset success message after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error) {
            console.error("Failed to send message:", error);
            setStatus("error");
        }
    };

    return (
        <Panel className="p-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--vscode-text-primary)] mb-2">Initialize Connection</h2>
                <p className="text-sm text-[var(--vscode-text-secondary)]">
                    Fill out the parameters below to open a direct comm-link with my inbox.
                </p>
            </div>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="user_name" className="text-xs font-mono text-[var(--vscode-accent)]">
                        const name =
                    </label>
                    <input
                        type="text"
                        name="user_name"
                        id="user_name"
                        required
                        placeholder='"John Doe"'
                        className="w-full bg-[#0d1117] border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--vscode-accent)] font-mono"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="user_email" className="text-xs font-mono text-[var(--vscode-accent)]">
                        const email =
                    </label>
                    <input
                        type="email"
                        name="user_email"
                        id="user_email"
                        required
                        placeholder='"john@example.com"'
                        className="w-full bg-[#0d1117] border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--vscode-accent)] font-mono"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-mono text-[var(--vscode-accent)]">
                        const message =
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        required
                        rows={5}
                        placeholder='`Hello, I would like to discuss...`'
                        className="w-full bg-[#0d1117] border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--vscode-accent)] font-mono resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3 px-4 bg-[var(--vscode-accent)] hover:bg-[var(--vscode-accent)]/80 text-black font-bold rounded font-mono text-sm transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                >
                    {status === "loading" ? "TRANSMITTING..." : "await sendEmail()"}
                </button>

                {status === "success" && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded text-xs font-mono text-center">
            // Request fulfilled. Message transmitted successfully.
                    </div>
                )}

                {status === "error" && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded text-xs font-mono text-center">
            /* ERROR: Transmission failed. Please try again later. */
                    </div>
                )}
            </form>
        </Panel>
    );
}
