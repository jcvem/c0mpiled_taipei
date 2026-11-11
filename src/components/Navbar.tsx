"use client";

import React from "react";
import { useGrantStore } from "@/lib/store";
import {
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Cpu,
} from "lucide-react";

export function Navbar({ onStartWalkthrough }: { onStartWalkthrough: () => void }) {
  const {
    passProbability,
    unresolvedCount,
    fatalTrapsCount,
    resetAll,
    selectedPortalKey,
  } = useGrantStore();

  const isAuditReady = passProbability >= 95;

  return (
    <header className="h-14 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-40 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono font-bold text-rose-500 text-sm shadow-inner">
            G0
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm tracking-tight text-zinc-100 font-mono">
                GrantOS
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                ESLint for Grants
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">
              c0mpiled-18 // YC Startup School Hackathon
            </span>
          </div>
        </div>

        <div className="h-4 w-[1px] bg-zinc-800 mx-2 hidden sm:block" />

        <div className="hidden md:flex items-center space-x-2 text-xs font-mono">
          <span className="text-zinc-500">Target Rulebook:</span>
          <span className="text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
            {selectedPortalKey === "siti"
              ? "臺北市 SITI 115年第2梯次"
              : "經濟部 115年度 SBIR"}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Pass Probability Pill */}
        <div
          className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-mono font-semibold transition-all duration-300 ${
            isAuditReady
              ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              : "bg-rose-950/60 border-rose-500/50 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.15)]"
          }`}
        >
          {isAuditReady ? (
            <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
          )}
          <span>Pre-Review Pass:</span>
          <span className="text-sm font-bold">{passProbability}%</span>
          <span className="text-[10px] px-1 py-0.2 rounded bg-black/40">
            {isAuditReady ? "AUDIT-READY" : "AUTO-REJECT"}
          </span>
        </div>

        {/* Demo Walkthrough Trigger */}
        <button
          onClick={onStartWalkthrough}
          className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono rounded bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 hover:from-amber-500/30 hover:to-orange-500/30 transition-all shadow-sm"
          title="Play 90-second Demo Sequence"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold">90s Demo Autoplay</span>
        </button>

        {/* Reset State Button */}
        <button
          onClick={resetAll}
          className="p-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
          title="Reset to initial un-fixed state"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

