"use client";

import React, { useState } from "react";
import { useGrantStore } from "@/lib/store";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert,
  Award,
  Sparkles,
  Lock,
} from "lucide-react";

export function LandingHero({
  onLaunchIde,
  onStartWalkthrough,
}: {
  onLaunchIde: () => void;
  onStartWalkthrough: () => void;
}) {
  const {
    portalUrl,
    setPortalUrl,
    selectPortalPreset,
    selectedPortalKey,
    runHarvester,
    language,
    setLanguage,
  } = useGrantStore();

  const [inputUrl, setInputUrl] = useState(portalUrl);

  const handleHarvestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl) {
      setPortalUrl(inputUrl);
    }
    onLaunchIde();
    await runHarvester();
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-slate-900 flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Top Minimalist Header */}
      <header className="h-16 px-6 sm:px-12 flex items-center justify-between border-b border-slate-200/70 bg-[#fcfbfa]/80 backdrop-blur sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-md bg-slate-950 flex items-center justify-center font-mono font-bold text-white text-xs shadow-xs">
            G0
          </div>
          <span className="font-bold text-base tracking-tight text-slate-900 font-sans">
            GrantOS
          </span>
        </div>

        {/* Navigation items matching the uploaded design */}
        <nav className="flex items-center space-x-6 sm:space-x-8 text-xs font-sans text-slate-600">
          <button
            onClick={onLaunchIde}
            className="hover:text-slate-950 transition font-medium hidden sm:inline"
          >
            Platform
          </button>
          <a
            href="#expert"
            className="hover:text-slate-950 transition font-medium hidden md:inline"
          >
            The $15/hr Expert
          </a>
          <span className="text-slate-400 font-mono text-[11px] hidden lg:inline">
            Compliance AST v1.15
          </span>
          <button
            onClick={onStartWalkthrough}
            className="hover:text-slate-950 transition font-medium flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Demo</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-200/60 p-0.5 rounded-md text-[11px]">
            <button
              onClick={() => setLanguage("bilingual")}
              className={`px-2 py-0.5 rounded transition ${
                language === "bilingual"
                  ? "bg-white text-slate-900 font-semibold shadow-2xs"
                  : "text-slate-500"
              }`}
            >
              EN / 中
            </button>
            <button
              onClick={() => setLanguage("zh")}
              className={`px-2 py-0.5 rounded transition ${
                language === "zh"
                  ? "bg-white text-slate-900 font-semibold shadow-2xs"
                  : "text-slate-500"
              }`}
            >
              繁中
            </button>
          </div>

          <button
            onClick={onLaunchIde}
            className="px-3.5 py-1.5 rounded-md bg-slate-950 hover:bg-slate-800 text-white font-medium text-xs shadow-xs transition"
          >
            Launch IDE ↗
          </button>
        </nav>
      </header>

      {/* Main Hero Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-12 pb-16 max-w-5xl mx-auto w-full text-center">
        {/* Eyebrow Kicker */}
        <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase mb-4 font-semibold">
          PRE-SUBMISSION DEFENSE ENGINE
        </div>

        {/* Hero Title in High-Elegance Editorial Serif */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-slate-950 tracking-tight leading-[1.12] max-w-3xl mb-5 font-normal">
          Never miss a 1 Million NTD grant chance for a slipped document.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed mb-10 font-sans">
          The Deterministic Grant Compiler & Guardrail IDE.
          <br className="hidden sm:inline" /> Stop losing funding to 20% agency fees and hidden audit traps.
        </p>

        {/* 4-Stat Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl py-6 border-y border-slate-200/80 mb-10 text-center">
          <div className="space-y-1">
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-950">
              NT$ 1,200,000
            </div>
            <div className="text-[11px] text-slate-500 font-sans leading-tight">
              Average Grant Lost to Document Error
            </div>
          </div>

          <div className="space-y-1 md:border-l border-slate-200/70">
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-950">
              140+
            </div>
            <div className="text-[11px] text-slate-500 font-sans leading-tight">
              Deterministic Guardrails & Unwritten Rules
            </div>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-200/70 pt-3 md:pt-0">
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-950">
              NT$ 300,000+
            </div>
            <div className="text-[11px] text-slate-500 font-sans leading-tight">
              Saved Per Application (20% Agency Cut)
            </div>
          </div>

          <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-200/70 pt-3 md:pt-0">
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-950">
              98.4%
            </div>
            <div className="text-[11px] text-slate-500 font-sans leading-tight">
              Audit-Ready Success Rate
            </div>
          </div>
        </div>

        {/* Command Bar Input matching the screenshot */}
        <form
          onSubmit={handleHarvestSubmit}
          className="w-full max-w-xl flex items-center bg-white p-1.5 rounded-lg border border-slate-300 shadow-sm focus-within:ring-2 focus-within:ring-slate-900/10 focus-within:border-slate-500 transition mb-4"
        >
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Paste any gov grant URL..."
            className="flex-1 px-3 py-2 text-xs font-mono text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center space-x-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 rounded-md text-xs font-sans font-medium transition shadow-2xs shrink-0"
          >
            <span>Harvest Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick chip presets */}
        <div className="flex items-center space-x-2 text-[11px] text-slate-500 mb-12">
          <span>Quick presets:</span>
          <button
            type="button"
            onClick={() => {
              selectPortalPreset("siti");
              setInputUrl("https://www.industry-incentive.taipei/about/13");
            }}
            className="underline hover:text-slate-900 transition"
          >
            Taipei SITI 2026
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => {
              selectPortalPreset("sbir");
              setInputUrl("https://www.sbir.org.tw/apply/115");
            }}
            className="underline hover:text-slate-900 transition"
          >
            MOEA SBIR 115
          </button>
        </div>

        {/* Interactive UI Mockup Teaser Cards (Matching the bottom of the uploaded image) */}
        <div
          onClick={onLaunchIde}
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-3.5 text-left cursor-pointer group"
          title="Click to launch live Guardrail IDE"
        >
          {/* Card 1: Pre-Review Audit (3 cols) */}
          <div className="md:col-span-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm group-hover:border-slate-300 group-hover:shadow-md transition">
            <div className="text-xs font-bold text-slate-900 mb-1 font-sans">
              Pre-Review Audit
            </div>
            <div className="text-xs font-bold font-mono text-rose-600 mb-3 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
              <span>24% — Auto-Reject Risk</span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-600 font-sans">
              <div className="flex items-center space-x-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Capital match (1:1 limit)</span>
              </div>
              <div className="flex items-center space-x-1.5 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Account ratio (Personnel ≦ 60%)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Required Vault (4 cols) */}
          <div className="md:col-span-4 bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm group-hover:border-slate-300 group-hover:shadow-md transition">
            <div className="text-xs font-bold text-slate-900 mb-2 font-sans">
              Required Vault
            </div>
            <div className="space-y-2 text-[11px] font-sans">
              <div className="flex items-center space-x-2 text-slate-700">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">變更登記表.pdf</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">10月勞保名冊.pdf</span>
              </div>
              <div className="p-1.5 rounded-md bg-rose-50 border border-rose-200 text-rose-800 flex items-center space-x-1.5 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span className="truncate">Missing 北市稅捐處無欠稅證明.pdf</span>
              </div>
            </div>
          </div>

          {/* Card 3: Implicit Reviewer Rules (2 cols) */}
          <div className="md:col-span-2 bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm group-hover:border-slate-300 group-hover:shadow-md transition hidden md:block">
            <div className="text-xs font-bold text-slate-900 mb-2 font-sans">
              Implicit Rules
            </div>
            <div className="space-y-2 text-[11px] text-slate-600">
              <div className="truncate text-amber-800 font-medium">
                • API Wrapper Check
              </div>
              <div className="truncate text-amber-800 font-medium">
                • Milestone Clawbacks
              </div>
            </div>
          </div>

          {/* Card 4: Pre-Audit Verification Certificate (3 cols, floating aesthetic) */}
          <div className="md:col-span-3 bg-white p-4 rounded-xl border border-slate-200/90 shadow-md group-hover:border-slate-400 group-hover:shadow-lg transition relative overflow-hidden">
            <div className="text-[11px] font-bold text-slate-900 mb-2 font-sans flex items-center justify-between">
              <span>Pre-Audit Certificate</span>
              <Award className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="space-y-1.5 text-[9px] font-mono text-slate-500 mb-2">
              <div className="flex items-center justify-between">
                <span className="px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Verified
                </span>
                <span className="truncate text-slate-400 ml-1">
                  SHA-256: 48c125..733c
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  Verified
                </span>
                <span className="truncate text-slate-400 ml-1">
                  SHA-256: 256cbb..1832
                </span>
              </div>
            </div>
            <div className="pt-1.5 border-t border-slate-100 flex justify-between text-[10px] font-mono text-slate-800 font-bold">
              <span>GOS-115-SBIR-0942</span>
              <span className="text-emerald-700">Audit-Ready</span>
            </div>
          </div>
        </div>

        {/* Micro-callout for live IDE launch */}
        <div className="mt-6 text-xs text-slate-500 flex items-center space-x-2">
          <span>Click any card or the button above to enter the Live Guardrail IDE</span>
          <span className="font-mono text-slate-400">→</span>
        </div>
      </main>

      {/* Brad Flora RFS Thesis Section */}
      <section
        id="expert"
        className="border-t border-slate-200/80 bg-white py-14 px-6 sm:px-12"
      >
        <div className="max-w-4xl mx-auto space-y-6 text-left">
          <div className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
            YC RFS // THE $15-AN-HOUR EXPERT
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-slate-900">
            Why Grant Consultants Charge 20% Cut — And How GrantOS Replaces Them.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed font-sans">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm">
                1. The Unwritten Reviewer Conventions (審查委員潛規則)
              </div>
              <p>
                Founders and ChatGPT write things that sound great to Silicon Valley VCs (&quot;We use OpenAI APIs and RAG&quot;), which is the exact reason academic reviewers kill the grant for &quot;Mere Technology Adoption, Not Innovation&quot;. GrantOS embeds 10 years of audit conventions directly into live linter squiggles.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm">
                2. Cross-Document Administrative Disqualification Gates
              </div>
              <p>
                35% of all grant applicants are rejected before a judge reads page 1 due to statutory math mismatches: Paid-in capital less than matching funds, employer insurance illegally booked in R&D payroll, or missing local municipal tax certificates. GrantOS reconciles these with deterministic cryptographic proof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 py-8 px-6 text-center text-xs text-slate-500 font-sans">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-900">GrantOS</span>
            <span>// c0mpiled-18 Taipei (YC Startup School Hackathon)</span>
          </div>
          <div>Built for Taiwan 115 SBIR & Taipei SITI R&D Grants</div>
        </div>
      </footer>
    </div>
  );
}
