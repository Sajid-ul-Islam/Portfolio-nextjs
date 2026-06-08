"use client";

import React, { Component, ReactNode, ErrorInfo } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught a module crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-6 h-full w-full bg-[#0a0a0a]/80 backdrop-blur-sm border border-red-500/20 rounded text-red-500 font-mono text-xs overflow-hidden">
          <AlertTriangle size={32} className="mb-4 opacity-80 text-red-500" />
          <p className="font-bold tracking-widest uppercase mb-2">MODULE_CRITICAL_FAILURE</p>
          <p className="opacity-70 text-[10px] text-center max-w-[300px] leading-relaxed">
            {this.props.fallbackMessage || "Missing dependencies or API configuration prevented this module from initializing."}
          </p>
          <p className="mt-4 text-[9px] text-red-500/50 max-w-full truncate px-4">
            {this.state.error?.message}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}