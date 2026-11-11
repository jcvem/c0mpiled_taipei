"use client";

import React from "react";
import { useGrantStore } from "@/lib/store";
import { AppLanguage } from "@/lib/types";
import {
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Globe2,
} from "lucide-react";

export function Navbar({
  onStartWalkthrough,
  onOpenExport,
  onBackToLanding,
}: {
  onStartWalkthrough: () => void;
  onOpenExport: () => void;
  onBackToLanding?: () => void;
}) {
  const {
    passProbability,
    resetAll,
    selectedPortalKey,
    language,
    setLanguage,
  } = useGrantStore();

  const isAuditReady = passProbability >= 95;

  return (
    <header className="h-14 border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-40 px-4 flex items-center justify-between shadow-xs">
      <div className="flex items-center space-x-3">
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="flex items-center space-x-1 text-xs font-sans font-medium text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition mr-1"
            title="Return to Landing Overview"
          >
            <span>←</span>
            <span className="hidden sm:inline">Overview</span>
          </button>
        )}

        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center font-mono font-bold text-white text-xs shadow-xs">
            G0
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm tracking-tight text-slate-900 font-sans">
                GrantOS
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                ESLint for Grants
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-sans">
              c0mpiled-18 // YC Startup School Hackathon
            </span>
          </div>
        </div>

        <div className="h-4 w-[1px] bg-slate-200 mx-2 hidden sm:block" />

        <div className="hidden lg:flex items-center space-x-2 text-xs font-sans">
          <span className="text-slate-400">
            {language === "en" ? "Target Rulebook:" : "目標比對法規："}
          </span>
          <span className="text-slate-700 font-medium bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[11px]">
            {selectedPortalKey === "siti"
              ? language === "en"
                ? "Taipei SITI 2026 Batch 2"
                : "臺北市 SITI 115年第2梯次"
              : language === "en"
              ? "Taiwan MOEA SBIR 2026"
              : "經濟部 115年度 SBIR"}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2.5">
        {/* Language Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200 text-[11px] font-sans">
          <button
            onClick={() => setLanguage("bilingual")}
            className={`px-2 py-0.5 rounded transition font-medium ${
              language === "bilingual"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
            title="雙語對照模式 / Bilingual Mode"
          >
            雙語 / EN
          </button>
          <button
            onClick={() => setLanguage("zh")}
            className={`px-2 py-0.5 rounded transition font-medium ${
              language === "zh"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            繁中
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-2 py-0.5 rounded transition font-medium ${
              language === "en"
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            English
          </button>
        </div>

        {/* Pass Probability Pill - Clickable to open Export Certificate */}
        <button
          onClick={onOpenExport}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs font-mono font-semibold transition-all duration-300 hover:scale-[1.02] ${
            isAuditReady
              ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs cursor-pointer ring-2 ring-emerald-200"
              : "bg-rose-50 border-rose-300 text-rose-800 shadow-xs cursor-pointer"
          }`}
          title="點擊檢視核定證明與匯出申請包 / View Audit Certificate"
        >
          {isAuditReady ? (
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          )}
          <span className="hidden sm:inline">
            {language === "en" ? "Pass Rate:" : "初審通過率:"}
          </span>
          <span className="font-bold text-sm">{passProbability}%</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/80 border border-slate-200">
            {isAuditReady
              ? language === "en"
                ? "AUDIT-READY"
                : "通過初審"
              : language === "en"
              ? "AUTO-REJECT"
              : "初審退件"}
          </span>
        </button>

        {isAuditReady && (
          <button
            onClick={onOpenExport}
            className="hidden sm:flex items-center space-x-1 px-2.5 py-1 text-xs font-sans rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-xs transition animate-pulse"
          >
            <span>{language === "en" ? "Export Package" : "匯出核定申請包"}</span>
          </button>
        )}

        {/* Demo Walkthrough Trigger */}
        <button
          onClick={onStartWalkthrough}
          className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-sans rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-xs transition"
          title="Play 60-second Demo Sequence"
        >
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span className="hidden md:inline">60s Demo Autoplay</span>
          <span className="md:hidden">Demo</span>
        </button>

        {/* Reset State Button */}
        <button
          onClick={resetAll}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition"
          title="Reset to initial un-fixed state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
