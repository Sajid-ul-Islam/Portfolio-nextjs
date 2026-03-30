"use client";

import { useState } from "react";
import { Sparkles, Loader2, Info } from "lucide-react";
import Button from "./Button";

type AIInsightButtonProps = {
  projectTitle: string;
  projectDescription: string;
  technologies: string[];
};

export default function AIInsightButton({ projectTitle, projectDescription, technologies }: AIInsightButtonProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    setLoading(true);
    setInsight(null);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `Generate a deep business and technical insight for the project "${projectTitle}". 
            Context: ${projectDescription}. 
            Tech: ${technologies.join(", ")}. 
            Response should be roughly 2-3 sentences, very professional, and start with [INTEL_ANALYSIS].`
          }],
          model: "gemini-1.5-flash"
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setInsight(data.content);
    } catch (err) {
      console.error(err);
      setInsight("[ERROR]: ANALYTICS_SYSTEM_OFFLINE. ENSURE GEMINI_API_KEY IS SECURED.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-4 rounded-lg border border-[#a3e635]/20 bg-[#a3e635]/5 group">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-[#a3e635]/10 text-[#a3e635]">
            <Sparkles size={20} className={loading ? "animate-spin text-yellow-400" : ""} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight uppercase">AI Deep Insight Engine</h4>
            <p className="text-[10px] text-[#a3e635]/50 font-mono">NEURAL_NET_V1.5 // DATA_CORRELATION_ACTIVE</p>
          </div>
        </div>
        {!insight && !loading && (
          <Button 
            onClick={generateInsight}
            className="bg-[#a3e635] text-black hover:bg-[#bef264] border-none px-4 py-1.5 h-auto text-xs font-bold"
          >
            GENERATE_INTEL
          </Button>
        )}
      </div>

      {(loading || insight) && (
        <div className="mt-4 pt-4 border-t border-[#a3e635]/10 animate-in fade-in duration-500">
           {loading ? (
             <div className="flex items-center gap-3 text-gray-500 italic text-xs animate-pulse">
                <Loader2 size={14} className="animate-spin" />
                EXTRACTING_BUSINESS_VAL_METRICS...
             </div>
           ) : (
             <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#a3e635]/70 uppercase tracking-widest">
                   <Info size={10} />
                   Security Clearanced Analysis
                </div>
                <p className="text-sm text-gray-300 leading-relaxed font-mono">
                  {insight}
                </p>
                <div className="text-[8px] text-gray-600 uppercase text-right">
                  System: Gemini Pro // Source: Neural_Buffer_09
                </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
}
