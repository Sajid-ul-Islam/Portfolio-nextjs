"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LuCalculator,
  LuCheck,
  LuClock,
  LuExternalLink,
  LuLayers,
  LuMessageSquare,
  LuSend,
  LuSparkles,
  LuZap,
} from "react-icons/lu";
import { cn } from "@/lib/cn";
import Badge from "./Badge";

type ServiceType = {
  id: string;
  name: string;
  desc: string;
  baseDays: number;
  icon: string;
  recommendedStack: string[];
};

const SERVICE_OPTIONS: ServiceType[] = [
  {
    id: "web-dev",
    name: "Custom Web Application",
    desc: "Next.js / React high-performance responsive web application with modern UX",
    baseDays: 14,
    icon: "🌐",
    recommendedStack: ["Next.js 16", "React 18", "Tailwind CSS", "TypeScript", "Vercel"],
  },
  {
    id: "ecom-store",
    name: "E-Commerce & Storefront",
    desc: "WooCommerce / Headless commerce store with payment gateway and inventory",
    baseDays: 20,
    icon: "🛍️",
    recommendedStack: ["WordPress", "WooCommerce", "REST API", "Payment Gateways", "Next.js"],
  },
  {
    id: "ecom-app",
    name: "E-Commerce + Mobile Sync",
    desc: "Synchronized web store and cross-platform mobile app on a single backend",
    baseDays: 30,
    icon: "📱",
    recommendedStack: ["WooCommerce", "Flutter / React Native", "REST API", "Webhooks"],
  },
  {
    id: "lms-platform",
    name: "LMS & Online Academy",
    desc: "Course management, student portals, quizzes, certificates, and video streaming",
    baseDays: 25,
    icon: "🎓",
    recommendedStack: ["Tutor LMS / Custom LMS", "HLS Video Streaming", "Next.js", "Stripe / bKash"],
  },
  {
    id: "ai-bots",
    name: "AI Bot & Business Automation",
    desc: "Automated Telegram / WhatsApp customer support bots and RAG pipelines",
    baseDays: 10,
    icon: "🤖",
    recommendedStack: ["Python", "FastAPI", "Telegram Bot API", "Twilio WhatsApp", "RAG / LLM"],
  },
  {
    id: "bi-dashboard",
    name: "BI Analytics & Dashboard",
    desc: "Executive operational dashboard, automated reporting pipelines, and KPIs",
    baseDays: 12,
    icon: "📊",
    recommendedStack: ["Power BI", "Python", "SQL", "Tableau", "Streamlit"],
  },
];

type AddOn = {
  id: string;
  name: string;
  desc: string;
  extraDays: number;
};

const ADD_ONS: AddOn[] = [
  {
    id: "bot-integration",
    name: "WhatsApp / Telegram Bot Sync",
    desc: "Real-time order/lead dispatch alerts to Telegram or WhatsApp",
    extraDays: 4,
  },
  {
    id: "seo-optimization",
    name: "Advanced SEO & Meta Suite",
    desc: "Schema markup, dynamic OpenGraph cards, sitemaps, and Core Web Vitals audit",
    extraDays: 3,
  },
  {
    id: "hls-streaming",
    name: "Live & On-Demand Video Player",
    desc: "Optimized adaptive bitrate HLS.js streaming integration",
    extraDays: 5,
  },
  {
    id: "monthly-maintenance",
    name: "24/7 Support & Maintenance",
    desc: "Ongoing security patches, daily backups, and uptime monitoring",
    extraDays: 0,
  },
];

export default function ProjectEstimator() {
  const [selectedService, setSelectedService] = useState<string>("web-dev");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["seo-optimization"]);
  const [timelineUrgency, setTimelineUrgency] = useState<"standard" | "accelerated">("standard");
  const [clientName, setClientName] = useState("");
  const [clientDetails, setClientDetails] = useState("");

  const currentService = SERVICE_OPTIONS.find((s) => s.id === selectedService) || SERVICE_OPTIONS[0];

  const totalDays = (() => {
    let days = currentService.baseDays;
    selectedAddons.forEach((addonId) => {
      const addon = ADD_ONS.find((a) => a.id === addonId);
      if (addon) days += addon.extraDays;
    });
    if (timelineUrgency === "accelerated") {
      days = Math.max(7, Math.round(days * 0.7));
    }
    return days;
  })();

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const selectedAddonObjects = ADD_ONS.filter((a) => selectedAddons.includes(a.id));

  const generateWhatsAppMessage = () => {
    const text = `Hello Sajid, I'm interested in a project scope through CybrCraft:
- Service: ${currentService.name}
- Add-ons: ${selectedAddonObjects.map((a) => a.name).join(", ") || "None"}
- Timeline: Approx. ${totalDays} days (${timelineUrgency === "accelerated" ? "Accelerated Sprint" : "Standard Delivery"})
- Recommended Stack: ${currentService.recommendedStack.join(", ")}
${clientName ? `- Name: ${clientName}` : ""}
${clientDetails ? `- Details: ${clientDetails}` : ""}

Let's discuss this project!`;
    return `https://wa.me/+8801824526054?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-panel border border-[var(--vscode-border)] p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--vscode-accent)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="info" className="font-mono text-[10px]">
                <LuSparkles className="inline mr-1" />
                CybrCraft Project Engineering
              </Badge>
              <Badge className="font-mono text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                Instant Brief Generator
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--vscode-text-primary)]">
              Interactive Scope & Architecture Estimator
            </h2>
            <p className="text-vscode-sm text-[var(--vscode-text-secondary)] mt-1 max-w-2xl">
              Configure your software solution, calculate delivery timeline, inspect the recommended technology stack, and export an instant project brief.
            </p>
          </div>
          <a
            href="https://cybrcraft.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--vscode-accent)] text-vscode-xs font-mono font-bold text-[var(--vscode-text-primary)] hover:text-[var(--vscode-accent)] transition-all flex-shrink-0"
          >
            Visit cybrcraft.com
            <LuExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Configuration Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Select Primary Solution */}
          <div className="glass-panel border border-[var(--vscode-border)] p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-vscode-sm font-bold text-[var(--vscode-text-primary)] font-mono uppercase tracking-wider">
              <LuLayers className="text-[var(--vscode-accent)]" />
              1. Select Solution Type
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICE_OPTIONS.map((service) => {
                const isSelected = selectedService === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedService(service.id)}
                    className={cn(
                      "flex flex-col text-left p-4 rounded-xl border transition-all duration-200 relative",
                      isSelected
                        ? "bg-[var(--vscode-accent)]/15 border-[var(--vscode-accent)] shadow-lg shadow-[var(--vscode-accent)]/10"
                        : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{service.icon}</span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[var(--vscode-accent)] text-white flex items-center justify-center text-xs">
                          <LuCheck size={12} />
                        </span>
                      )}
                    </div>
                    <span className="text-vscode-sm font-bold text-[var(--vscode-text-primary)]">
                      {service.name}
                    </span>
                    <span className="text-vscode-xs text-[var(--vscode-text-secondary)] mt-1 line-clamp-2">
                      {service.desc}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--vscode-accent)] mt-3">
                      ~{service.baseDays} Days Base
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Optional Capabilities & Add-ons */}
          <div className="glass-panel border border-[var(--vscode-border)] p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-vscode-sm font-bold text-[var(--vscode-text-primary)] font-mono uppercase tracking-wider">
              <LuZap className="text-[var(--vscode-accent)]" />
              2. Optional Capabilities & Features
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADD_ONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={cn(
                      "flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all",
                      isSelected
                        ? "bg-[var(--vscode-accent)]/10 border-[var(--vscode-accent)]/60"
                        : "bg-white/[0.02] border-white/5 hover:border-white/20"
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors",
                        isSelected
                          ? "bg-[var(--vscode-accent)] border-[var(--vscode-accent)] text-white"
                          : "border-[var(--vscode-border)] bg-transparent"
                      )}
                    >
                      {isSelected && <LuCheck size={10} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-vscode-xs font-bold text-[var(--vscode-text-primary)]">
                        {addon.name}
                      </div>
                      <div className="text-[11px] text-[var(--vscode-text-secondary)] mt-0.5">
                        {addon.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Delivery Pace & Notes */}
          <div className="glass-panel border border-[var(--vscode-border)] p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-vscode-sm font-bold text-[var(--vscode-text-primary)] font-mono uppercase tracking-wider">
              <LuClock className="text-[var(--vscode-accent)]" />
              3. Delivery Timeline Mode
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTimelineUrgency("standard")}
                className={cn(
                  "p-3.5 rounded-xl border text-center font-mono text-vscode-xs transition-all",
                  timelineUrgency === "standard"
                    ? "bg-[var(--vscode-accent)]/15 border-[var(--vscode-accent)] font-bold text-white"
                    : "bg-white/[0.02] border-white/5 text-[var(--vscode-text-secondary)]"
                )}
              >
                Standard Delivery Pace
              </button>
              <button
                type="button"
                onClick={() => setTimelineUrgency("accelerated")}
                className={cn(
                  "p-3.5 rounded-xl border text-center font-mono text-vscode-xs transition-all",
                  timelineUrgency === "accelerated"
                    ? "bg-[var(--vscode-accent)]/15 border-[var(--vscode-accent)] font-bold text-white"
                    : "bg-white/[0.02] border-white/5 text-[var(--vscode-text-secondary)]"
                )}
              >
                ⚡ Accelerated Sprint (-30% Time)
              </button>
            </div>

            <div className="pt-2 space-y-3">
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Your Name / Organization (Optional)"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-[var(--vscode-border)] text-vscode-sm text-[var(--vscode-text-primary)] focus:outline-none focus:border-[var(--vscode-accent)]"
              />
              <textarea
                value={clientDetails}
                onChange={(e) => setClientDetails(e.target.value)}
                placeholder="Brief project details, references, or specific requirements..."
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-[var(--vscode-border)] text-vscode-sm text-[var(--vscode-text-primary)] focus:outline-none focus:border-[var(--vscode-accent)] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Project Brief & Export */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel border border-[var(--vscode-border)] p-6 sm:p-8 rounded-2xl relative sticky top-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <LuCalculator className="text-[var(--vscode-accent)]" size={18} />
                <span className="font-mono text-vscode-sm font-bold uppercase tracking-wider text-[var(--vscode-text-primary)]">
                  Live Scope Summary
                </span>
              </div>
              <Badge variant="info" className="font-mono text-[9px]">
                Ready for Consultation
              </Badge>
            </div>

            {/* Estimated Metric Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] uppercase font-mono text-[var(--vscode-text-secondary)]">
                  Estimated Timeline
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--vscode-accent)] mt-1">
                  ~{totalDays} <span className="text-xs font-normal text-[var(--vscode-text-secondary)]">Days</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] uppercase font-mono text-[var(--vscode-text-secondary)]">
                  Scope Scale
                </div>
                <div className="text-base sm:text-lg font-bold text-[var(--vscode-text-primary)] mt-2 truncate">
                  {currentService.name.split(" ")[0]} Project
                </div>
              </div>
            </div>

            {/* Architecture Stack */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-[var(--vscode-text-secondary)] uppercase tracking-wider">
                Recommended Technology Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentService.recommendedStack.map((tech) => (
                  <Badge key={tech} className="bg-[var(--vscode-editor-background)] text-[10px] font-mono border-white/10">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Included Deliverables */}
            <div className="space-y-2 text-vscode-xs text-[var(--vscode-text-secondary)] font-sans border-t border-white/5 pt-4">
              <div className="font-bold text-[var(--vscode-text-primary)] font-mono text-[11px] uppercase tracking-wider mb-1">
                Deliverables Breakdown:
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>{currentService.name} (Core Architecture)</span>
              </div>
              {selectedAddonObjects.map((addon) => (
                <div key={addon.id} className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>{addon.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Codebase handover, deployment, and live configuration</span>
              </div>
            </div>

            {/* Direct Connect Action Buttons */}
            <div className="pt-2 space-y-3">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-vscode-sm transition-all shadow-lg shadow-emerald-900/20 active:scale-98"
              >
                <LuMessageSquare size={16} />
                Send Project Brief via WhatsApp
              </a>

              <a
                href={`/contact?subject=${encodeURIComponent(`Project Scope: ${currentService.name}`)}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[var(--vscode-text-primary)] font-mono text-vscode-xs transition-all"
              >
                <LuSend size={14} />
                Send via Contact Form
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
