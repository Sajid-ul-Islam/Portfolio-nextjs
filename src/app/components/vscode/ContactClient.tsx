"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { LuAlertCircle, LuCheckCircle, LuSend, LuMapPin, LuMail, LuPhone } from "react-icons/lu";
import { motion } from "framer-motion";

import SocialLinks from "./SocialLinks";
import { cn } from "@/lib/cn";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      {captchaEnabled ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Banner Section */}
        <motion.div variants={itemVariants} className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 glass-panel border border-[var(--vscode-border)] rounded-2xl relative overflow-hidden group shadow-xl">
            {/* Hover overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--vscode-accent)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="z-10 flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-bold tracking-wider border border-emerald-500/20 uppercase font-mono flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full availability-pulse" />
                  Available for contracts & roles
                </span>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--vscode-text-primary)] tracking-tight leading-tight">
                  Get in Touch
                </h1>
                <p className="text-vscode-sm text-[var(--vscode-accent)] font-semibold font-mono mt-1 uppercase tracking-wider">
                  Let&apos;s collaborate on BI, data pipelines, and analyst tooling
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Channels column */}
          <motion.section variants={itemVariants} className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 glass-panel border border-[var(--vscode-border)] rounded-2xl relative overflow-hidden group hover:border-[var(--vscode-accent)]/20 transition-all shadow-sm">
              <h2 className="text-sm font-bold text-[var(--vscode-accent)] mb-5 uppercase tracking-widest flex items-center gap-2.5 font-mono">
                <span className="w-2 h-2 bg-[var(--vscode-accent)] rounded-full animate-pulse"></span>
                Operative Channels
              </h2>
              <p className="text-vscode-sm text-[var(--vscode-text-secondary)] mb-6 leading-relaxed">
                Reach out through these active connection links for immediate response.
              </p>

              <div className="grid grid-cols-1 gap-3">
                 <SocialLinks />
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5 space-y-4 font-mono text-vscode-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <LuMapPin size={12} className="text-[var(--vscode-accent)]" />
                    Location:
                  </span>
                  <span className="text-[var(--vscode-text-primary)] font-medium">Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <LuMail size={12} className="text-[var(--vscode-accent)]" />
                    Preferred:
                  </span>
                  <span className="text-[var(--vscode-text-primary)] font-medium">Remote & Hybrid</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Form column */}
          <motion.section variants={itemVariants} className="lg:col-span-7">
            <div className="p-6 sm:p-8 glass-panel border border-[var(--vscode-border)] rounded-2xl relative shadow-md">
              <h2 className="text-sm font-bold text-[var(--vscode-text-primary)] mb-6 uppercase tracking-widest font-mono flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[var(--vscode-accent)] rounded-full"></span>
                Send Message
              </h2>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-[var(--vscode-accent)]/5 border border-[var(--vscode-accent)]/20 rounded-2xl animate-fade-in shadow-inner">
                  <LuCheckCircle size={44} className="text-[var(--vscode-accent)] mb-4" />
                  <h3 className="text-lg font-bold text-[var(--vscode-text-primary)] mb-1 font-mono uppercase tracking-wider">
                    Message Sent
                  </h3>
                  <p className="text-vscode-sm text-[var(--vscode-text-secondary)] font-mono mb-6 uppercase tracking-tight">
                    Thank you. I will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 bg-transparent border border-[var(--vscode-accent)] text-[var(--vscode-accent)] font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[var(--vscode-accent)] hover:text-white transition-all font-mono"
                  >
                    Back to Contact Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="form-name" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 font-mono">Your Name</label>
                      <input
                        id="form-name"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        className={cn(
                          "w-full px-4 py-3 bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] rounded-xl text-[var(--vscode-text-primary)] font-mono text-vscode-sm transition-all focus:outline-none focus:border-[var(--vscode-focusBorder)]",
                          errors.name && "border-red-500/50"
                        )}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="form-email" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 font-mono">Your Email</label>
                      <input
                        id="form-email"
                        name="email"
                        type="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        className={cn(
                          "w-full px-4 py-3 bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] rounded-xl text-[var(--vscode-text-primary)] font-mono text-vscode-sm transition-all focus:outline-none focus:border-[var(--vscode-focusBorder)]",
                          errors.email && "border-red-500/50"
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-subject" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 font-mono">Subject</label>
                    <input
                      id="form-subject"
                      name="subject"
                      placeholder="Subject line"
                      value={form.subject}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] rounded-xl text-[var(--vscode-text-primary)] font-mono text-vscode-sm transition-all focus:outline-none focus:border-[var(--vscode-focusBorder)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-message" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 font-mono">Message</label>
                    <textarea
                      id="form-message"
                      name="message"
                      rows={5}
                      placeholder="How can I help you?"
                      value={form.message}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className={cn(
                        "w-full px-4 py-3 bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] rounded-xl text-[var(--vscode-text-primary)] font-mono text-vscode-sm resize-none transition-all focus:outline-none focus:border-[var(--vscode-focusBorder)]",
                        errors.message && "border-red-500/50"
                      )}
                    />
                  </div>

                  {captchaEnabled && (
                    <div className="py-2 font-mono">
                      <div
                        className="cf-turnstile"
                        data-sitekey={turnstileSiteKey}
                        data-callback="onTurnstileSuccess"
                        data-expired-callback="onTurnstileExpired"
                      />
                      {errors.captcha && (
                        <p className="text-[10px] text-red-400 mt-1 uppercase font-bold tracking-wider">{errors.captcha}</p>
                      )}
                    </div>
                  )}

                  {status === "error" && (
                    <div className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <LuAlertCircle size={14} className="text-red-400" />
                      <span className="text-[10px] text-red-400 font-bold uppercase tracking-wide font-mono">
                        {errorMessage || "Transmission failure: Signal Interrupted"}
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={cn(
                      "w-full py-3.5 bg-[var(--vscode-accent)] text-white font-bold text-xs uppercase tracking-[0.2em] font-mono relative overflow-hidden group/btn transition-all hover:opacity-90 active:scale-[0.98] rounded-xl shadow-md shadow-[var(--vscode-accent)]/20",
                      status === "loading" && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === "loading" ? "Transmitting..." : (
                        <>
                          Send Message
                          <LuSend size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
