"use client";

import { LuFileText, LuTag, LuCalendar, LuChevronLeft } from "react-icons/lu";
import Link from "next/link";
import SectionHeader from "../../components/vscode/SectionHeader";

export default function BlogContentPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 font-mono animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/Blogs" className="flex items-center gap-2 text-[#a3e635]/60 hover:text-[#a3e635] text-xs mb-8 transition-colors">
        <LuChevronLeft size={14} />
        BACK_TO_ARCHIVE
      </Link>

      <div className="mb-10 relative">
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#a3e635]"></div>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-4 glow-text leading-tight">
          Learning from Lion & Tigers: Adapting Strategy to Context
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-[10px] text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
                <LuCalendar size={12} className="text-[#a3e635]" />
                <span>DATA_ENTRY: 2024-03-30</span>
            </div>
            <div className="flex items-center gap-2">
                <LuFileText size={12} className="text-[#a3e635]" />
                <span>TYPE: DOCTRINE_ANALYSIS</span>
            </div>
            <div className="flex items-center gap-2">
                <LuTag size={12} className="text-[#a3e635]" />
                <span>TAGS: STRATEGY_TACTICS_ADAPTABILITY</span>
            </div>
        </div>
      </div>

      <div className="p-8 bg-[#0a1a15]/40 backdrop-blur-sm border border-[#a3e635]/10 rounded-lg space-y-8 text-gray-300 leading-relaxed text-sm">
        <section className="space-y-4">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#a3e635] first-letter:mr-2 first-letter:float-left">
                Everyone wants to be a lion, the king of the jungle – majestic, powerful, and roaring in dominance. Yet, when it comes to guerrilla warfare, revolutionary movements, or grassroots struggles, adopting the lion's approach can lead to failure. Especially on this land, this terrain. Here, the metaphorical tiger reigns supreme. The tiger's strategy, not the lion's, holds lessons for survival and success.
            </p>
            <p>
                At first glance, this idea may seem unusual. But reflect on it: a tiger's approach offers a more fitting strategy for today's realities than the lion's.
            </p>
        </section>

        <section className="bg-white/5 p-6 border-l-2 border-[#a3e635]">
            <h2 className="text-[#a3e635] font-bold uppercase tracking-widest mb-4">The Context: Then and Now</h2>
            <p className="mb-4">
                During the time of the Sahaba (companions of the Prophet Muhammad ﷺ) or the reigns of Muslim sultans, battles were fought in open fields, often head-on. These wars demanded the lion's bravery, its boldness, and its leadership in the forefront. The Muslim community was already in power, and their strategies reflected their dominance.
            </p>
            <p>
                But today's reality is drastically different. Muslims are not sitting on thrones or commanding empires. The environment demands adaptability, stealth, and strategic camouflage – qualities that align more with the tiger than the lion.
            </p>
            <p>
                Yet, many are stuck romanticizing historical eras, attempting to emulate the lion's roar when the situation calls for the tiger's quiet hunt.
            </p>
        </section>

        <section className="space-y-4">
            <h2 className="text-white font-bold uppercase mb-2">[ INTEL: THE TIGER'S APPROACH ]</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-black/40 border border-white/5 rounded">
                    <h3 className="text-white text-xs font-bold mb-2">LIONS: VISIBLE_GROUP_SPEC</h3>
                    <p className="text-[11px] text-gray-500 italic">
                        Lions live in prides, openly claiming territories. Their strength lies in numbers, and their roar signals power. While this works well in open savannahs, where visibility is an advantage, such a strategy fails in dense forests where stealth is key.
                    </p>
                </div>
                <div className="p-4 bg-black/40 border border-[#a3e635]/20 rounded">
                    <h3 className="text-[#a3e635] text-xs font-bold mb-2">TIGERS: SOLITARY_CAMO_SPEC</h3>
                    <p className="text-[11px] text-[#a3e635]/70 italic">
                        Tigers are solitary hunters. They blend seamlessly into their surroundings, thanks to their striped coats that mimic the shadows of trees. They strike silently, with precision.
                    </p>
                </div>
            </div>
        </section>

        <section className="space-y-6">
            <h2 className="text-white font-bold uppercase">[ LESSONS_FOR_TODAY ]</h2>
            <div className="space-y-4 font-mono text-[13px]">
                <div className="flex gap-4">
                    <span className="text-[#a3e635] font-bold">01_</span>
                    <div>
                        <span className="text-white block font-bold uppercase">Adapt to the Terrain</span>
                        Just as lions thrive on open plains but struggle in forests, strategies suited for one context may not work in another. Visible, loud, and centralized approaches make one an easy target. Instead, stealth, adaptability, and decentralization are more effective.
                    </div>
                </div>
                <div className="flex gap-4">
                    <span className="text-[#a3e635] font-bold">02_</span>
                    <div>
                        <span className="text-white block font-bold uppercase">Avoid Unnecessary Confrontation</span>
                        Tigers don't attack without reason. They are calculated, saving their energy for meaningful pursuits. Similarly, not every challenge requires a direct confrontation. Knowing when to engage and when to hold back is crucial.
                    </div>
                </div>
                <div className="flex gap-4">
                    <span className="text-[#a3e635] font-bold">03_</span>
                    <div>
                        <span className="text-white block font-bold uppercase">Blend In Strategically</span>
                        Camouflage is the tiger's greatest asset. This means blending into society, understanding its nuances, and working from within to achieve goals. Loud declarations of intent may backfire where subtlety is a stronger ally.
                    </div>
                </div>
                <div className="flex gap-4">
                    <span className="text-[#a3e635] font-bold">04_</span>
                    <div>
                        <span className="text-white block font-bold uppercase">Recognize Individual Strengths</span>
                        While lions rely on the pride, tigers operate alone. In certain contexts, individual efforts, personal resilience, and independent thinking are more effective than group dynamics.
                    </div>
                </div>
            </div>
        </section>

        <section className="p-6 bg-[#a3e635]/5 border border-[#a3e635]/20 rounded-lg italic">
            <h2 className="text-[#a3e635] font-bold not-italic mb-2 uppercase">Misplaced Expectations</h2>
            "Forcing one to adopt the other's strategy can lead to failure. Recognizing which method suits the situation is the first step toward victory."
        </section>

        <section className="pt-10 border-t border-white/5 text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-6">SIGNAL_ARCHIVE_END // SAJID_ISLAM</p>
            <Link 
                href="/Blogs"
                className="px-8 py-3 bg-[#166534] text-white font-black text-xs uppercase tracking-widest hover:bg-[#a3e635] hover:text-black transition-all"
            >
                Return_To_Intel_Stream
            </Link>
        </section>
      </div>
    </div>
  );
}
