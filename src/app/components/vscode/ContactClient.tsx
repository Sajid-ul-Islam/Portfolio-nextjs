"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { LuAlertCircle, LuCheckCircle, LuSend } from "react-icons/lu";

import SocialLinks from "./SocialLinks";
import { cn } from "@/lib/cn";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactClient() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captchaEnabled = Boolean(turnstileSiteKey);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!captchaEnabled) return;
    (window as typeof window & {
      onTurnstileSuccess?: (token: string) => void;
      onTurnstileExpired?: () => void;
    }).onTurnstileSuccess = (token: string) => {
      setCaptchaToken(token);
    };
    (window as typeof window & {
      onTurnstileExpired?: () => void;
    }).onTurnstileExpired = () => {
      setCaptchaToken("");
    };
  }, [captchaEnabled]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Invalid email address";
    }
    if (!form.message.trim()) nextErrors.message = "Message is required";
    if (captchaEnabled && !captchaToken) {
      nextErrors.captcha = "Please verify the captcha";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          captchaToken,
          honeypot,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setCaptchaToken("");
        setHoneypot("");
      } else {
        const payload = await response.json().catch(() => null);
        setErrorMessage(payload?.error ?? "Failed to send message. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("Failed to send message. Please try again.");
      setStatus("error");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
      {captchaEnabled ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}
      <div className="mb-10 relative">
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-12 bg-[var(--vscode-accent)]"></div>
        <h1 className="text-4xl font-extrabold text-[var(--vscode-text-primary)] mb-2">
          Get in Touch
        </h1>
        <p className="text-[var(--vscode-accent)] text-xs font-mono uppercase tracking-widest">
          Let's collaborate on BI, data pipelines, and analyst tooling
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-[var(--vscode-sideBar-background)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)]/20 transition-all rounded-lg relative overflow-hidden group">
            <h2 className="text-sm font-bold text-[var(--vscode-accent)] mb-4 uppercase tracking-widest flex items-center gap-2 font-mono">
              <span className="w-2 h-2 bg-[var(--vscode-accent)] rounded-full"></span>
              Operative Channels
            </h2>
            <p className="text-xs text-[var(--vscode-text-secondary)] mb-6 leading-relaxed">
              Reach out through these active connection links for immediate response.
            </p>
            <div className="grid grid-cols-1 gap-2">
               <SocialLinks />
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 space-y-4 font-mono">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-gray-500 uppercase">Location:</span>
                <span className="text-[var(--vscode-text-primary)]">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-gray-500 uppercase">Availability:</span>
                <span className="text-[var(--vscode-text-primary)]">Open to Contracts & Roles</span>
              </div>
            </div>
          </div>
        </section>

        <section className="lg:col-span-7">
          <div className="p-8 bg-[var(--vscode-sideBar-background)]/40 border border-[var(--vscode-border)] rounded-lg relative">
            <h2 className="text-sm font-bold text-[var(--vscode-text-primary)] mb-6 uppercase tracking-widest font-mono">
              [ Send Message ]
            </h2>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-[var(--vscode-accent)]/5 border border-[var(--vscode-accent)]/20 rounded animate-fade-in">
                <LuCheckCircle size={48} className="text-[var(--vscode-accent)] mb-4" />
                <h3 className="text-xl font-bold text-[var(--vscode-text-primary)] mb-2 font-mono uppercase">
                  Message Sent
                </h3>
                <p className="text-sm text-[var(--vscode-text-secondary)] font-mono mb-6 uppercase tracking-tight">
                  Your message was sent successfully. I will get back to you shortly.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2 bg-transparent border border-[var(--vscode-accent)] text-[var(--vscode-accent)] font-bold text-[10px] uppercase tracking-widest hover:bg-[var(--vscode-accent)] hover:text-white transition-all font-mono"
                >
                  Back to Contact Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 font-mono">Your Name</label>
                    <input
                      name="name"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className={cn(
                        "w-full px-4 py-3 bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] rounded text-[var(--vscode-text-primary)] font-mono text-xs",
                        "focus:outline-none focus:border-[var(--vscode-focusBorder)] transition-all",
                        errors.name && "border-red-500/50"
                      )}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 font-mono">Your Email</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className={cn(
                        "w-full px-4 py-3 bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] rounded text-[var(--vscode-text-primary)] font-mono text-xs",
                        "focus:outline-none focus:border-[var(--vscode-focusBorder)] transition-all",
                        errors.email && "border-red-500/50"
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 font-mono">Subject</label>
                  <input
                    name="subject"
                    placeholder="Subject line"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] rounded text-[var(--vscode-text-primary)] font-mono text-xs focus:outline-none focus:border-[var(--vscode-focusBorder)] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 font-mono">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="How can I help you?"
                    value={form.message}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className={cn(
                      "w-full px-4 py-3 bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] rounded text-[var(--vscode-text-primary)] font-mono text-xs resize-none",
                      "focus:outline-none focus:border-[var(--vscode-focusBorder)] transition-all",
                      errors.message && "border-red-500/50"
                    )}
                  />
                </div>

                {captchaEnabled && (
                  <div className="py-2">
                    <div
                      className="cf-turnstile"
                      data-sitekey={turnstileSiteKey}
                      data-callback="onTurnstileSuccess"
                      data-expired-callback="onTurnstileExpired"
                    />
                    {errors.captcha && (
                      <p className="text-[10px] text-red-500 mt-1 uppercase font-bold tracking-tighter">{errors.captcha}</p>
                    )}
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded">
                    <LuAlertCircle size={14} className="text-red-500" />
                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-tight font-mono">
                      {errorMessage || "Transmission failure: Signal Interrupted"}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "w-full py-4 bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)] font-bold text-xs uppercase tracking-[0.2em] font-mono relative overflow-hidden group/btn transition-all hover:bg-[var(--vscode-button-hoverBackground)] active:scale-[0.98]",
                    status === "loading" && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {status === "loading" ? "Sending..." : (
                      <>
                        Send Message
                        <LuSend size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
