"use client";

import { useState, useEffect } from "react";
import { Fingerprint, Loader2, ShieldCheck, Lock } from "lucide-react";
import { cn } from "../../lib/cn";

type IntroAnimationProps = {
  onComplete?: () => void;
};

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [step, setStep] = useState(0); // 0: Init, 1: Scanning, 2: Access Granted, 3: Exit
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Initialization
    const initTimer = setTimeout(() => setStep(1), 1000);

    // Phase 2: Scanning Progress
    const scanInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setStep(2);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Phase 3: Access Granted -> Exit
    const exitTimer = setTimeout(() => {
      if (step === 2) setStep(3);
    }, 6500);

    return () => {
      clearTimeout(initTimer);
      clearInterval(scanInterval);
      clearTimeout(exitTimer);
    };
  }, [step]);

  if (step === 3) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#051410] flex flex-col items-center justify-center font-mono transition-opacity duration-1000 ${step === 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative w-[80vw] max-w-[16rem] aspect-square flex flex-col items-center justify-center border border-[#a3e635]/30 rounded-2xl bg-black/60 shadow-[0_0_50px_rgba(163,230,53,0.2)] overflow-hidden backdrop-blur-sm">
        {/* Scanning Area */}
        {step === 1 && (
          <>
            <div
              className="absolute left-0 right-0 h-12 bg-gradient-to-b from-transparent to-[#a3e635]/30 border-b border-[#a3e635] shadow-[0_2px_15px_#a3e635] z-10"
              style={{ top: `calc(${progress}% - 3rem)` }}
            ></div>
            <div className="absolute inset-0 bg-[#a3e635]/5 animate-pulse"></div>
          </>
        )}

        {/* Scan Icon */}
        <div className="relative mb-6">
          {step < 2 ? (
            <Fingerprint size={80} className={cn("text-[#a3e635] transition-all duration-300", step === 1 ? "scale-110 drop-shadow-[0_0_10px_rgba(163,230,53,0.8)]" : "opacity-40")} />
          ) : (
            <ShieldCheck size={80} className="text-[#a3e635] animate-in zoom-in duration-500 drop-shadow-[0_0_15px_rgba(163,230,53,1)]" />
          )}

          <div className="absolute inset-0 -m-4 border-2 border-dashed border-[#a3e635]/30 rounded-full animate-spin [animation-duration:3s]"></div>
          <div className="absolute inset-0 -m-8 border border-[#a3e635]/10 rounded-full animate-ping [animation-duration:2s]"></div>
        </div>

        {/* Status Text */}
        <div className="text-center space-y-1">
          <div className="text-[10px] text-[#a3e635]/50 tracking-[0.3em] uppercase">Tactical_OS_Boot</div>
          <div className="text-sm font-bold text-[#a3e635]">
            {step === 0 && "INITIALIZING_SYSTEM..."}
            {step === 1 && `SCANNING_BIOMETRICS: ${progress}%`}
            {step === 2 && "ACCESS_GRANTED_WELCOME_SAJID"}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-[#a3e635]/20 w-full">
          <div
            className="h-full bg-[#a3e635] transition-all duration-300 ease-out shadow-[0_0_10px_#a3e635]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Background HUD decorative elements */}
      <div className="absolute top-10 left-10 text-[9px] text-[#a3e635]/30 space-y-1 opacity-50">
        <div>&gt; KERNEL_LOAD_OK</div>
        <div>&gt; NETWORK_UPLINK_ENCRYPTED</div>
        <div>&gt; AUTH_SERVICE_ACTIVE</div>
        <div>&gt; BYPASS_DETECTION_OFF</div>
      </div>

      <div className="absolute bottom-10 right-10 text-[9px] text-[#a3e635]/30 text-right opacity-50">
        <div>UID: 0x88492021</div>
        <div>LOCATION: 23.8103° N, 90.4125° E</div>
        <div>SIGNATURE: SHA256_VERIFIED</div>
      </div>

    </div>
  );
}
