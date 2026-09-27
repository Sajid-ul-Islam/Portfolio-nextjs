"use client";

import React, { useState } from "react";
import { LuPhoneCall, LuMessageCircle, LuMail, LuSparkles, LuX, LuSend } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/cn";
import { personalInfo } from "../../data/portfolio";

export default function MobileQuickContact() {
  const [open, setOpen] = useState(false);

  const whatsappUrl = `https://wa.me/8801824526054?text=${encodeURIComponent(
    "Hi Sajid, I saw your portfolio and would like to discuss a project / opportunity."
  )}`;

  return (
    <div className="md:hidden fixed bottom-20 right-4 z-40">
      {/* Expanded Quick Action Menu */}
      {open && (
        <div className="flex flex-col items-end gap-2.5 mb-3 animate-in slide-in-from-bottom-3 fade-in duration-200">
          {/* WhatsApp Direct */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#25D366] text-white shadow-xl hover:opacity-95 active:scale-95 transition-all text-xs font-semibold font-sans"
          >
            <span>WhatsApp Sajid</span>
            <FaWhatsapp size={16} />
          </a>

          {/* Email Direct */}
          <a
            href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20from%20Portfolio`}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[var(--vscode-sideBar-background)] text-white border border-white/10 shadow-xl hover:bg-white/10 active:scale-95 transition-all text-xs font-semibold font-sans"
          >
            <span>Email Direct</span>
            <LuMail size={15} className="text-[var(--vscode-accent)]" />
          </a>

          {/* Call / Phone */}
          <a
            href="tel:+8801824526054"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[var(--vscode-sideBar-background)] text-white border border-white/10 shadow-xl hover:bg-white/10 active:scale-95 transition-all text-xs font-semibold font-sans"
          >
            <span>Call Mobile</span>
            <LuPhoneCall size={15} className="text-sky-400" />
          </a>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Quick Contact Sajid"
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300",
          open
            ? "bg-red-500/90 rotate-90 scale-95"
            : "bg-[var(--vscode-accent)] text-black hover:scale-105 active:scale-95 shadow-[var(--vscode-accent)]/30 ring-4 ring-[var(--vscode-accent)]/20"
        )}
      >
        {open ? <LuX size={20} /> : <LuSend size={18} className="translate-x-[1px]" />}
      </button>
    </div>
  );
}
