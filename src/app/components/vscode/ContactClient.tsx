"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { LuAlertCircle, LuCheckCircle, LuSend } from "react-icons/lu";

import Button from "./Button";
import Input from "./Input";
import SectionHeader from "./SectionHeader";
import SocialLinks from "./SocialLinks";
import Textarea from "./Textarea";
import { cn } from "../../lib/cn";

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
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#a3e635]"></div>
        <h1 className="text-4xl font-black text-white font-mono tracking-tighter uppercase mb-2 glow-text">
          Establish_Uplink
        </h1>
        <p className="text-[#a3e635]/60 text-xs font-mono uppercase tracking-widest">
          Secure Communications Protocol // Signal Transmission
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-[#0a1a15]/80 backdrop-blur-md border border-[#a3e635]/10 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#a3e635]/20 rounded-tr-lg"></div>
            <h2 className="text-sm font-bold text-[#a3e635] mb-4 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[#a3e635] animate-pulse"></span>
              Operative_Channels
            </h2>
            <p className="text-[11px] text-gray-500 font-mono mb-6 uppercase leading-tight">
              Direct connection nodes for immediate response. Pulse verified.
            </p>
            <div className="grid grid-cols-1 gap-2">
               <SocialLinks />
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-gray-600 uppercase">Signal_Status:</span>
                <span className="text-[#a3e635]">STABLE [99.9%]</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-gray-600 uppercase">Encryption:</span>
                <span className="text-[#a3e635]">ML_V5_RSA_4096</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-gray-600 uppercase">Station:</span>
                <span className="text-[#a3e635]">DHAKA_NODE_0x1</span>
              </div>
            </div>
          </div>
        </section>

        <section className="lg:col-span-7">
          <div className="p-8 bg-[#0a1a15]/40 backdrop-blur-sm border border-[#a3e635]/10 rounded-lg relative">
            <h2 className="text-sm font-bold text-white mb-6 uppercase tracking-widest font-mono">
              [ TRANSMIT_MESSAGE ]
            </h2>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-[#a3e635]/5 border border-[#a3e635]/20 rounded animate-fade-in">
                <LuCheckCircle size={48} className="text-[#a3e635] mb-4 drop-shadow-[0_0_10px_rgba(163,230,53,0.5)]" />
                <h3 className="text-xl font-bold text-white mb-2 font-mono uppercase">
                  Uplink_Confirmed
                </h3>
                <p className="text-sm text-[#a3e635]/70 font-mono mb-6 uppercase tracking-tight">
                  Message successfully integrated into archive.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2 bg-transparent border border-[#a3e635] text-[#a3e635] font-bold text-[10px] uppercase tracking-widest hover:bg-[#a3e635] hover:text-[#051410] transition-all"
                >
                  Return_To_Comms
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
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 font-mono">Input_Name</label>
                    <input
                      name="name"
                      placeholder="IDENTIFY_YOURSELF"
                      value={form.name}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className={cn(
                        "w-full px-4 py-3 bg-black/40 border-2 border-white/5 rounded text-white font-mono text-xs",
                        "focus:outline-none focus:border-[#a3e635]/50 focus:bg-black/60 transition-all",
                        errors.name && "border-red-500/50"
                      )}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 font-mono">Input_Email</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="RETURN_ADDRESS"
                      value={form.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className={cn(
                        "w-full px-4 py-3 bg-black/40 border-2 border-white/5 rounded text-white font-mono text-xs",
                        "focus:outline-none focus:border-[#a3e635]/50 focus:bg-black/60 transition-all",
                        errors.email && "border-red-500/50"
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 font-mono">Mission_Subject</label>
                  <input
                    name="subject"
                    placeholder="PROTOCOL_OBJECTIVE"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 bg-black/40 border-2 border-white/5 rounded text-white font-mono text-xs focus:outline-none focus:border-[#a3e635]/50 focus:bg-black/60 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 font-mono">Data_Stream</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="ENCODE_YOUR_MESSAGE_HERE..."
                    value={form.message}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className={cn(
                      "w-full px-4 py-3 bg-black/40 border-2 border-white/5 rounded text-white font-mono text-xs resize-none",
                      "focus:outline-none focus:border-[#a3e635]/50 focus:bg-black/60 transition-all",
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
                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-tight">
                      {errorMessage || "TRANS_FAILURE: SIGNAL_INTERRUPTED"}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "w-full py-4 bg-[#166534] text-white font-black text-xs uppercase tracking-[0.2em] relative overflow-hidden group/btn transition-all hover:bg-[#a3e635] hover:text-[#051410] active:scale-[0.98]",
                    status === "loading" && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {status === "loading" ? "Uplink_In_Progress..." : (
                      <>
                        Initiate_Transmission
                        <LuSend size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                  {/* Button Glitch Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-loading-slide"></div>
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
