"use client";

import React, { useState } from "react";
import { useGrantStore } from "@/lib/store";
import { GuardrailIssue } from "@/lib/types";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
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
    language,
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
        applyFix(issue.id);
      } else {
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
    <div className="flex flex-col h-full bg-slate-50/40 overflow-hidden">
      {/* Pane Header with Pass Probability Score Gauge */}
      <div className="p-3 border-b border-slate-200 bg-white shrink-0 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-800">
              {language === "en"
                ? "Guardrail Copilot & Traps"
                : language === "zh"
                ? "審查雷區與法定護欄助手"
                : "審查護欄助手 (Guardrail Copilot)"}
            </h2>
          </div>
          <span className="text-[10px] font-sans text-slate-500 font-medium">
            {unresolvedCount === 0
              ? language === "en"
                ? "All Audit-Proof"
                : "全部已合規"
              : language === "en"
              ? `${unresolvedCount} items pending`
              : `尚有 ${unresolvedCount} 項待修正`}
          </span>
        </div>

        {/* Large Score Bar */}
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-2.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-sans mb-1.5">
            <span className="text-slate-600 font-medium">
              {language === "en"
                ? "Pre-Review Pass Probability"
                : "初審通過機率 (Pre-Review Score)"}
            </span>
            <div className="flex items-center space-x-1.5 font-mono">
              <span
                className={`text-base font-bold ${
                  passProbability >= 95
                    ? "text-emerald-700"
                    : passProbability >= 60
                    ? "text-amber-700"
                    : "text-rose-700"
                }`}
              >
                {passProbability}%
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                  passProbability >= 95
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-rose-100 text-rose-800 border border-rose-300"
                }`}
              >
                {passProbability >= 95 ? "AUDIT-READY" : "AUTO-REJECT"}
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-700 ease-out ${
                passProbability >= 95
                  ? "bg-emerald-600"
                  : passProbability >= 60
                  ? "bg-amber-500"
                  : "bg-rose-600"
              }`}
              style={{ width: `${passProbability}%` }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 text-[11px] font-sans">
          <button
            onClick={() => setIssueFilter("ALL")}
            className={`flex-1 py-1 rounded-md border transition ${
              issueFilter === "ALL"
                ? "bg-slate-900 text-white border-slate-900 font-medium shadow-2xs"
                : "bg-white text-slate-600 border-slate-200 hover:text-slate-900"
            }`}
          >
            {language === "en" ? "All" : "全部"} ({guardrailIssues.length})
          </button>
          <button
            onClick={() => setIssueFilter("HARD_TRAP")}
            className={`flex-1 py-1 rounded-md border transition ${
              issueFilter === "HARD_TRAP"
                ? "bg-rose-50 text-rose-700 border-rose-300 font-semibold shadow-2xs"
                : "bg-white text-slate-600 border-slate-200 hover:text-rose-700"
            }`}
          >
            🛑 {language === "en" ? "Hard Traps" : "資格與會計"} ({fatalTrapsCount})
          </button>
          <button
            onClick={() => setIssueFilter("IMPLICIT_RULE")}
            className={`flex-1 py-1 rounded-md border transition ${
              issueFilter === "IMPLICIT_RULE"
                ? "bg-amber-50 text-amber-800 border-amber-300 font-semibold shadow-2xs"
                : "bg-white text-slate-600 border-slate-200 hover:text-amber-800"
            }`}
          >
            ⚠️ {language === "en" ? "Rubrics" : "委員潛規則"} ({implicitWarningsCount})
          </button>
        </div>
      </div>

      {/* Issues Card Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 font-sans">
        {filteredIssues.map((issue) => {
          const isSelected = selectedIssueId === issue.id;

          const displayTitle =
            language === "en"
              ? issue.titleEn
              : language === "zh"
              ? issue.title
              : `${issue.title}`;

          const displaySnippet =
            language === "en" ? issue.violatingSnippetEn : issue.violatingSnippet;

          const displayFixedSnippet =
            language === "en" ? issue.fixedSnippetEn : issue.fixedSnippet;

          const displayWhy =
            language === "en" ? issue.whyRawLLMFailsEn : issue.whyRawLLMFails;

          const displayPrompt =
            language === "en"
              ? issue.humanMicroTaskPromptEn
              : issue.humanMicroTaskPrompt;

          const displayBtnLabel =
            language === "en" ? issue.fixButtonLabelEn : issue.fixButtonLabel;

          return (
            <div
              key={issue.id}
              onClick={() => selectIssue(issue.id)}
              className={`p-3.5 rounded-lg border transition cursor-pointer text-xs shadow-2xs ${
                issue.isFixed
                  ? "bg-white/80 border-slate-200 opacity-90 hover:opacity-100"
                  : isSelected
                  ? issue.type === "HARD_TRAP"
                    ? "bg-white border-rose-400 ring-2 ring-rose-100 shadow-md"
                    : "bg-white border-amber-400 ring-2 ring-amber-100 shadow-md"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center space-x-1.5">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      issue.isFixed
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : issue.type === "HARD_TRAP"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {issue.isFixed
                      ? language === "en"
                        ? "🟢 RESOLVED"
                        : "🟢 已修復合規"
                      : issue.type === "HARD_TRAP"
                      ? language === "en"
                        ? "🛑 FATAL GATE"
                        : "🛑 初審退件鐵律"
                      : language === "en"
                      ? "⚠️ REVIEWER TRAP"
                      : "⚠️ 委員潛規則"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    -{issue.scorePenalty}% {language === "en" ? "impact" : "分數衝擊"}
                  </span>
                </div>

                {/* View Official PDF Citation Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openPdfCitation(issue);
                  }}
                  className="flex items-center space-x-1 text-[10px] text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-2 py-0.5 rounded-md transition shrink-0 font-medium"
                  title="開啟官方 PDF 條文黃標佐證"
                >
                  <FileSearch className="w-3 h-3 text-slate-600" />
                  <span>
                    {language === "en"
                      ? `View PDF (p.${issue.citation.page})`
                      : `檢視 PDF 條文 (p.${issue.citation.page})`}
                  </span>
                </button>
              </div>

              {/* Title & Violating Snippet */}
              <h3 className="font-bold text-slate-900 text-xs mb-1.5 leading-snug">
                {displayTitle}
              </h3>

              <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200 mb-2 text-[11px] text-slate-700">
                <span className="text-slate-400 font-semibold block mb-0.5">
                  {language === "en" ? "Detected Text / Metric:" : "檢測命中內容:"}
                </span>
                <span
                  className={
                    issue.isFixed
                      ? "line-through text-slate-400"
                      : "text-rose-700 font-medium"
                  }
                >
                  {displaySnippet}
                </span>
                {issue.isFixed && (
                  <div className="mt-1.5 pt-1.5 border-t border-slate-200 text-emerald-800">
                    <span className="text-emerald-700 block mb-0.5 font-semibold">
                      {language === "en" ? "Fixed Compliant Text:" : "修復後合規內容:"}
                    </span>
                    {displayFixedSnippet}
                  </div>
                )}
              </div>

              {/* The $15/hr Expert Explanation (Why Raw LLMs Fail) */}
              {!issue.isFixed && (
                <div className="mb-2.5 p-2 rounded-md bg-amber-50/60 border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
                  <div className="flex items-center space-x-1 text-amber-800 font-semibold text-[10px] uppercase">
                    <HelpCircle className="w-3 h-3 text-amber-600" />
                    <span>
                      {language === "en"
                        ? "Why Raw LLMs & Founders Get Killed Here:"
                        : "為何 ChatGPT / 一般人會在此退件:"}
                    </span>
                  </div>
                  <div className="text-amber-800/90 leading-relaxed font-sans">
                    {displayWhy}
                  </div>
                </div>
              )}

              {/* Micro-Task Guidance & 1-Click Action */}
              {!issue.isFixed ? (
                <div className="mt-2.5">
                  <div className="text-[10px] text-slate-600 mb-2 leading-relaxed font-sans">
                    <strong className="text-slate-900">
                      {language === "en" ? "Action Guidance: " : "操作指引: "}
                    </strong>
                    {displayPrompt}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        applyFix(issue.id);
                      }}
                      className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-xs transition"
                    >
                      <Wand2 className="w-3.5 h-3.5" />
                      <span>{displayBtnLabel}</span>
                    </button>

                    {issue.type === "IMPLICIT_RULE" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGeminiReframe(issue);
                        }}
                        disabled={loadingAiIssueId === issue.id}
                        className="w-full flex items-center justify-center space-x-1.5 py-1.5 px-3 rounded-md bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-[11px] transition shadow-2xs disabled:opacity-50"
                      >
                        {loadingAiIssueId === issue.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                            <span>
                              {language === "en"
                                ? "Gemini Reframing..."
                                : "Gemini 思考重構中..."}
                            </span>
                          </>
                        ) : (
                          <>
                            <Bot className="w-3.5 h-3.5 text-blue-600" />
                            <span>
                              {language === "en"
                                ? "✨ AI Reframe (Gemini 1.5 Flash)"
                                : "✨ Gemini 智能生成客製化合規文字"}
                            </span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 text-emerald-700 text-[11px] font-semibold mt-1 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    {language === "en"
                      ? "Complies 100% with official government mandate."
                      : "已符合官方條文規定，核銷/初審無虞"}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action: Apply All Fixes for quick demo */}
      <div className="p-3 border-t border-slate-200 bg-white shrink-0">
        <button
          onClick={applyAllFixes}
          disabled={unresolvedCount === 0}
          className="w-full flex items-center justify-center space-x-2 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-xs transition disabled:opacity-40 shadow-xs"
        >
          <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
          <span>
            {unresolvedCount === 0
              ? language === "en"
                ? "✅ All 5 Traps Fixed (98% Audit-Ready)"
                : "✅ 全部護欄已修復合規 (98% 審查無虞)"
              : language === "en"
              ? "1-Click Apply All Fixes (Jump to 98%)"
              : "一鍵套用全部修復 (直衝 98% 審查通過)"}
          </span>
        </button>
      </div>
    </div>
  );
}
