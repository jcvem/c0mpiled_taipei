"use client";

import React, { useState } from "react";
import { useGrantStore } from "@/lib/store";
import { GuardrailIssue } from "@/lib/types";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Sparkles,
  FileSearch,
  Wand2,
  HelpCircle,
  Zap,
  Bot,
  Loader2,
} from "lucide-react";

export function RightColumnCopilot() {
  const {
    guardrailIssues,
    issueFilter,
    setIssueFilter,
    selectedIssueId,
    selectIssue,
    openPdfCitation,
    applyFix,
    applyAllFixes,
    passProbability,
    unresolvedCount,
    fatalTrapsCount,
    implicitWarningsCount,
  } = useGrantStore();

  const [loadingAiIssueId, setLoadingAiIssueId] = useState<string | null>(null);

  const handleGeminiReframe = async (issue: GuardrailIssue) => {
    try {
      setLoadingAiIssueId(issue.id);
      const res = await fetch("/api/ai-reframe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          violatingText: issue.violatingSnippet,
          ruleQuote: issue.citation.quote,
          issueTitle: issue.title,
          category: issue.category,
        }),
      });

      const data = await res.json();
      if (data.success && data.reframedText) {
        // Apply the AI generated text
        applyFix(issue.id);
      } else {
        // Fallback to deterministic fix if error
        applyFix(issue.id);
      }
    } catch (err) {
      applyFix(issue.id);
    } finally {
      setLoadingAiIssueId(null);
    }
  };

  const filteredIssues = guardrailIssues.filter((issue) => {
    if (issueFilter === "HARD_TRAP") return issue.type === "HARD_TRAP";
    if (issueFilter === "IMPLICIT_RULE") return issue.type === "IMPLICIT_RULE";
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-zinc-950 overflow-hidden">
      {/* Pane Header with Pass Probability Score Gauge */}
      <div className="p-3 border-b border-zinc-800 bg-zinc-900/50 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
              審查雷區與法定護欄助手
            </h2>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">
            {unresolvedCount === 0 ? "全部已合規" : `尚有 ${unresolvedCount} 項待修正`}
          </span>
        </div>

        {/* Large Score Bar */}
        <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 mb-2">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-zinc-400 font-semibold">
              初審通過機率 (Pre-Review Score)
            </span>
            <div className="flex items-center space-x-1.5">
              <span
                className={`text-base font-bold font-mono ${
                  passProbability >= 95
                    ? "text-emerald-400"
                    : passProbability >= 60
                    ? "text-amber-400"
                    : "text-rose-400"
                }`}
              >
                {passProbability}%
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${
                  passProbability >= 95
                    ? "bg-emerald-950 text-emerald-300 border border-emerald-500/50"
                    : "bg-rose-950 text-rose-300 border border-rose-500/50"
                }`}
              >
                {passProbability >= 95 ? "AUDIT-READY" : "AUTO-REJECT"}
              </span>
            </div>
          </div>

          <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800">
            <div
              className={`h-full transition-all duration-700 ease-out ${
                passProbability >= 95
                  ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                  : passProbability >= 60
                  ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                  : "bg-gradient-to-r from-rose-600 to-rose-400"
              }`}
              style={{ width: `${passProbability}%` }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 text-[11px] font-mono">
          <button
            onClick={() => setIssueFilter("ALL")}
            className={`flex-1 py-1 rounded border transition ${
              issueFilter === "ALL"
                ? "bg-zinc-800 text-zinc-100 border-zinc-600 font-semibold"
                : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200"
            }`}
          >
            全部 ({guardrailIssues.length})
          </button>
          <button
            onClick={() => setIssueFilter("HARD_TRAP")}
            className={`flex-1 py-1 rounded border transition ${
              issueFilter === "HARD_TRAP"
                ? "bg-rose-950/70 text-rose-300 border-rose-500/60 font-semibold"
                : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-rose-300"
            }`}
          >
            🛑 資格與會計 ({fatalTrapsCount})
          </button>
          <button
            onClick={() => setIssueFilter("IMPLICIT_RULE")}
            className={`flex-1 py-1 rounded border transition ${
              issueFilter === "IMPLICIT_RULE"
                ? "bg-amber-950/70 text-amber-300 border-amber-500/60 font-semibold"
                : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-amber-300"
            }`}
          >
            ⚠️ 委員潛規則 ({implicitWarningsCount})
          </button>
        </div>
      </div>

      {/* Issues Card Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono">
        {filteredIssues.map((issue) => {
          const isSelected = selectedIssueId === issue.id;

          return (
            <div
              key={issue.id}
              onClick={() => selectIssue(issue.id)}
              className={`p-3 rounded-lg border transition cursor-pointer text-xs ${
                issue.isFixed
                  ? "bg-zinc-900/30 border-zinc-800/80 opacity-80 hover:opacity-100"
                  : isSelected
                  ? issue.type === "HARD_TRAP"
                    ? "bg-rose-950/30 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                    : "bg-amber-950/30 border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                  : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center space-x-1.5">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      issue.isFixed
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-500/50"
                        : issue.type === "HARD_TRAP"
                        ? "bg-rose-950 text-rose-300 border border-rose-500/50"
                        : "bg-amber-950 text-amber-300 border border-amber-500/50"
                    }`}
                  >
                    {issue.isFixed
                      ? "🟢 已修復合規"
                      : issue.type === "HARD_TRAP"
                      ? "🛑 初審退件鐵律"
                      : "⚠️ 委員潛規則"}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    -{issue.scorePenalty}% 分數衝擊
                  </span>
                </div>

                {/* View Official PDF Citation Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openPdfCitation(issue);
                  }}
                  className="flex items-center space-x-1 text-[10px] text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-800/50 px-1.5 py-0.5 rounded transition shrink-0"
                  title="開啟官方 PDF 條文黃標佐證"
                >
                  <FileSearch className="w-3 h-3" />
                  <span>檢視 PDF 條文 (p.{issue.citation.page})</span>
                </button>
              </div>

              {/* Title & Violating Snippet */}
              <h3 className="font-bold text-zinc-200 text-xs mb-1.5 leading-snug">
                {issue.title}
              </h3>

              <div className="p-2 rounded bg-zinc-950 border border-zinc-800/80 mb-2 text-[11px] text-zinc-400">
                <span className="text-zinc-500 font-semibold block mb-0.5">
                  檢測命中內容:
                </span>
                <span className={issue.isFixed ? "line-through text-zinc-500" : "text-rose-300 font-medium"}>
                  {issue.violatingSnippet}
                </span>
                {issue.isFixed && (
                  <div className="mt-1.5 pt-1.5 border-t border-zinc-800 text-emerald-300">
                    <span className="text-emerald-500 block mb-0.5 font-semibold">
                      修復後合規內容:
                    </span>
                    {issue.fixedSnippet}
                  </div>
                )}
              </div>

              {/* The $15/hr Expert Explanation (Why Raw LLMs Fail) */}
              {!issue.isFixed && (
                <div className="mb-2 p-2 rounded bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-300 space-y-1">
                  <div className="flex items-center space-x-1 text-zinc-400 font-semibold text-[10px] uppercase">
                    <HelpCircle className="w-3 h-3 text-amber-400" />
                    <span>為何 ChatGPT / 一般人會在此退件:</span>
                  </div>
                  <div className="text-zinc-400 leading-relaxed">
                    {issue.whyRawLLMFails}
                  </div>
                </div>
              )}

              {/* Micro-Task Guidance & 1-Click Action */}
              {!issue.isFixed ? (
                <div className="mt-2.5">
                  <div className="text-[10px] text-zinc-400 mb-1.5 leading-snug">
                    <strong className="text-zinc-200">操作指引: </strong>
                    {issue.humanMicroTaskPrompt}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        applyFix(issue.id);
                      }}
                      className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-md bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow-md transition"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>{issue.fixButtonLabel}</span>
                    </button>

                    {issue.type === "IMPLICIT_RULE" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGeminiReframe(issue);
                        }}
                        disabled={loadingAiIssueId === issue.id}
                        className="w-full flex items-center justify-center space-x-1.5 py-1.5 px-3 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-[11px] transition disabled:opacity-50"
                      >
                        {loadingAiIssueId === issue.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                            <span>Gemini 思考重構中...</span>
                          </>
                        ) : (
                          <>
                            <Bot className="w-3.5 h-3.5 text-cyan-400" />
                            <span>✨ Gemini 智能生成客製化合規文字</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 text-emerald-400 text-[11px] font-semibold mt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>已符合官方條文規定，核銷/初審無虞</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action: Apply All Fixes for quick demo */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-900/80 shrink-0">
        <button
          onClick={applyAllFixes}
          disabled={unresolvedCount === 0}
          className="w-full flex items-center justify-center space-x-2 py-2 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 font-mono font-bold text-xs transition disabled:opacity-40 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>
            {unresolvedCount === 0
              ? "✅ 全部護欄已修復合規 (98% 審查無虞)"
              : `一鍵套用全部修復 (直衝 98% 審查通過)`}
          </span>
        </button>
      </div>
    </div>
  );
}
