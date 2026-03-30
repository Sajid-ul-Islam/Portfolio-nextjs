import { LuUsers } from "react-icons/lu";

import SectionHeader from "../components/vscode/SectionHeader";
import { family } from "../data/portfolio";
import { cn } from "../lib/cn";

export const metadata = {
  title: "Family",
  description: "Family information and connections of Sajid Islam.",
  alternates: { canonical: "/Family" },
};

function FamilyMemberItem({ member }: { member: (typeof family)[number] }) {
  return (
    <div
      className={cn(
        "relative p-6 mb-4",
        "bg-[#0a1a15]/80 backdrop-blur-md border border-[#a3e635]/10 rounded-lg overflow-hidden group",
        "hover:border-[#a3e635]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(163,230,53,0.1)]",
        "before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#a3e635]/20 group-hover:before:bg-[#a3e635]"
      )}
    >
      {/* HUD Scanner Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#a3e635]/20 animate-scan-line"></div>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-bold text-[#a3e635] px-2 py-0.5 bg-[#a3e635]/10 border border-[#a3e635]/20 uppercase tracking-widest">
              {member.relation}
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-[#a3e635] transition-colors font-mono">
              {member.name}
            </h3>
          </div>
          
          <div className="space-y-4">
            {member.occupation && (
              <div className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 w-3 h-3 border border-[#a3e635]/40 rotate-45 group-hover:bg-[#a3e635]/20 transition-all"></div>
                <p className="text-sm text-gray-400 font-mono tracking-tight leading-relaxed">
                  <span className="text-gray-600 block text-[9px] uppercase font-bold mb-0.5">Assigned_Role_Archive:</span>
                  {member.occupation}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-2">
              {member.nameLink && (
                <a 
                  href={member.nameLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-[#a3e635] hover:text-white flex items-center gap-2 border-b border-[#a3e635]/20 hover:border-[#a3e635] transition-all uppercase"
                >
                  [ ACCESS_DOSSIER ]
                </a>
              )}
              {member.link && (
                <a 
                  href={member.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-[#a3e635] hover:text-white flex items-center gap-2 border-b border-[#a3e635]/20 hover:border-[#a3e635] transition-all uppercase"
                >
                  [ INTEL_UPLINK ]
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Decorative HUD Corner */}
        <div className="hidden sm:block opacity-20 group-hover:opacity-60 transition-opacity">
            <div className="w-12 h-12 border-r-2 border-t-2 border-[#a3e635]/40 rounded-tr-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default function FamilyPage() {
  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="mb-10 relative">
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#a3e635]"></div>
        <h1 className="text-4xl font-black text-white font-mono tracking-tighter uppercase mb-2 glow-text">
          Operative_Relations
        </h1>
        <p className="text-[#a3e635]/60 text-xs font-mono uppercase tracking-widest">
          Personal Network & Biological Affiliates // Secure Archive
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-4xl">
        {family.map((member, index) => (
          <FamilyMemberItem key={`${member.name}-${index}`} member={member} />
        ))}
      </div>

      {/* Decorative footer element */}
      <div className="pt-10 flex items-center gap-4 opacity-30">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#a3e635]/40 to-transparent"></div>
        <span className="text-[10px] font-mono whitespace-nowrap text-[#a3e635]">END_OF_DOSSIER</span>
        <div className="h-2 w-2 bg-[#a3e635]"></div>
      </div>
    </div>
  );
}
