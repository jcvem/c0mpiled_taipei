"use client";

import React from "react";
import { useGrantStore } from "@/lib/store";
import {
  FileCode,
  TableProperties,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingDown,
  Info,
} from "lucide-react";

export function CenterColumnEditor() {
  const {
    activeEditorTab,
    setActiveEditorTab,
    proposalParagraphs,
    budgetItems,
    guardrailIssues,
    selectedIssueId,
    selectIssue,
    openPdfCitation,
  } = useGrantStore();

  const capitalIssue = guardrailIssues.find((i) => i.id === "issue-capital-cap");
  const personnelIssue = guardrailIssues.find(
    (i) => i.id === "issue-personnel-insurance"
  );

  // Compute live budget summary
  const totalBudget = budgetItems.reduce((acc, item) => acc + item.amount, 0);
  const personnelItem = budgetItems.find((b) => b.category === "人事費");
  const personnelAmount = personnelItem ? personnelItem.amount : 0;
  const personnelPercentage = totalBudget > 0 ? (personnelAmount / totalBudget) * 100 : 0;

  const isCapitalFixed = capitalIssue?.isFixed;
  const subsidyRequested = isCapitalFixed ? 1000000 : 1500000;
  const selfFunded = isCapitalFixed ? 1000000 : 1500000;
  const paidInCapital = 1000000;

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-zinc-800 overflow-hidden">
      {/* Tab Switcher Header */}
      <div className="h-10 border-b border-zinc-800 bg-zinc-900/60 px-3 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveEditorTab("proposal")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded-t-md transition ${
              activeEditorTab === "proposal"
                ? "bg-zinc-950 text-zinc-100 border-t border-x border-zinc-700 font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-rose-400" />
            <span>附件A_研發計畫書草稿.odt</span>
            {proposalParagraphs.some((p) => p.hasIssue) && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse ml-1" />
            )}
          </button>

          <button
            onClick={() => setActiveEditorTab("budget")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono rounded-t-md transition ${
              activeEditorTab === "budget"
                ? "bg-zinc-950 text-zinc-100 border-t border-x border-zinc-700 font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <TableProperties className="w-3.5 h-3.5 text-emerald-400" />
            <span>附件B_經費預算試算表.xlsx</span>
            {budgetItems.some((b) => b.hasViolation) && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse ml-1" />
            )}
          </button>
        </div>

        <div className="text-[11px] font-mono text-zinc-500 hidden sm:block">
          {activeEditorTab === "proposal"
            ? "Live ESLint Linter Mode"
            : "Formula & Cap Enforcement Mode"}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeEditorTab === "proposal" ? (
          /* Proposal Draft Canvas with Squiggly Underlines */
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800 flex items-center justify-between text-zinc-400 text-[11px]">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>
                  紅/黃波浪底線代表命中法規退件條款或委員潛規則，點擊底線可定位護欄卡片與官方條文。
                </span>
              </div>
            </div>

            {proposalParagraphs.map((p) => {
              const matchedIssue = guardrailIssues.find((i) => i.id === p.issueId);
              const isSelected = p.issueId && selectedIssueId === p.issueId;

              return (
                <div
                  key={p.id}
                  className={`p-3.5 rounded-lg border transition ${
                    p.hasIssue
                      ? isSelected
                        ? "bg-zinc-900/90 border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                        : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                      : "bg-zinc-950 border-zinc-800/80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-zinc-300 text-xs">
                      {p.sectionTitle}
                    </span>
                    {p.hasIssue && matchedIssue && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                          matchedIssue.type === "HARD_TRAP"
                            ? "bg-rose-950/80 text-rose-300 border border-rose-700/60"
                            : "bg-amber-950/80 text-amber-300 border border-amber-700/60"
                        }`}
                      >
                        {matchedIssue.type === "HARD_TRAP"
                          ? "🛑 初審退件陷阱"
                          : "⚠️ 委員潛規則雷區"}
                      </span>
                    )}
                    {!p.hasIssue && (
                      <span className="text-[10px] text-emerald-400 flex items-center space-x-1 font-mono">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>已通過語法檢核</span>
                      </span>
                    )}
                  </div>

                  {/* Paragraph text rendering with interactive wavy underline */}
                  <div className="text-zinc-300 leading-relaxed text-xs">
                    {p.hasIssue && p.highlightedText && matchedIssue ? (
                      <div>
                        {p.content.split(p.highlightedText)[0]}
                        <span
                          onClick={() => {
                            selectIssue(matchedIssue.id);
                            openPdfCitation(matchedIssue);
                          }}
                          className={`${
                            matchedIssue.type === "HARD_TRAP"
                              ? "linter-squiggled-red text-rose-200"
                              : "linter-squiggled-amber text-amber-200"
                          } font-semibold`}
                          title="點擊檢視官方審查指標與一鍵修復"
                        >
                          {p.highlightedText}
                        </span>
                        {p.content.split(p.highlightedText)[1]}
                      </div>
                    ) : (
                      <div className="whitespace-pre-line text-zinc-300">
                        {p.content}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Budget Table Canvas with statutory meters */
          <div className="space-y-4 font-mono text-xs">
            {/* Statutory Guardrail Progress Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Personnel Cap Meter */}
              <div
                className={`p-3 rounded-lg border transition ${
                  personnelPercentage > 60
                    ? "bg-rose-950/30 border-rose-500/50"
                    : "bg-zinc-900/60 border-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-zinc-400 font-semibold text-[11px]">
                    人事費佔總經費比重 (法定上限 ≦ 60%)
                  </span>
                  <span
                    className={`font-bold ${
                      personnelPercentage > 60
                        ? "text-rose-400 text-sm animate-pulse"
                        : "text-emerald-400"
                    }`}
                  >
                    {personnelPercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      personnelPercentage > 60
                        ? "bg-rose-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min(100, personnelPercentage)}%` }}
                  />
                </div>
                <div className="mt-1 text-[10px] text-zinc-500 flex justify-between">
                  <span>依據: 附件C會計原則 p.1</span>
                  <span>
                    {personnelPercentage > 60 ? "❌ 超出法定上限" : "✅ 合規"}
                  </span>
                </div>
              </div>

              {/* Capital Cap Meter */}
              <div
                className={`p-3 rounded-lg border transition ${
                  !isCapitalFixed
                    ? "bg-rose-950/30 border-rose-500/50"
                    : "bg-zinc-900/60 border-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-zinc-400 font-semibold text-[11px]">
                    自籌款 (NT$ {selfFunded.toLocaleString()}) vs 實收資本額
                  </span>
                  <span
                    className={`font-bold ${
                      !isCapitalFixed
                        ? "text-rose-400 text-sm animate-pulse"
                        : "text-emerald-400"
                    }`}
                  >
                    {!isCapitalFixed ? "超額 NT$ 50萬" : "符合 1:1 上限"}
                  </span>
                </div>
                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      !isCapitalFixed ? "bg-rose-500" : "bg-emerald-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        (selfFunded / paidInCapital) * 100
                      )}%`,
                    }}
                  />
                </div>
                <div className="mt-1 text-[10px] text-zinc-500 flex justify-between">
                  <span>實收資本額: NT$ 1,000,000</span>
                  <span>{!isCapitalFixed ? "❌ 自籌款超標" : "✅ 勾稽合格"}</span>
                </div>
              </div>
            </div>

            {/* Budget Line Items Table */}
            <div className="bg-zinc-900/60 rounded-lg border border-zinc-800 overflow-hidden">
              <div className="p-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                <span className="font-bold text-zinc-200">
                  經費科目明細表 (核銷對照)
                </span>
                <span className="text-[11px] text-zinc-400">
                  總經費預算:{" "}
                  <strong className="text-zinc-100 font-mono text-sm">
                    NT$ {totalBudget.toLocaleString()}
                  </strong>
                </span>
              </div>

              <div className="divide-y divide-zinc-800 text-xs">
                {budgetItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 transition ${
                      item.hasViolation
                        ? "bg-rose-950/20 hover:bg-rose-950/30"
                        : "hover:bg-zinc-900/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold text-[10px]">
                          {item.category}
                        </span>
                        <span className="font-medium text-zinc-200">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-bold font-mono text-zinc-100 text-sm">
                        NT$ {item.amount.toLocaleString()}
                      </span>
                    </div>

                    {item.hasViolation && (
                      <div className="mt-2 p-2 rounded bg-rose-950/50 border border-rose-500/40 flex items-center justify-between text-rose-300 text-[11px]">
                        <div className="flex items-center space-x-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>{item.violationMessage}</span>
                        </div>
                        {personnelIssue && (
                          <button
                            onClick={() => {
                              selectIssue(personnelIssue.id);
                              openPdfCitation(personnelIssue);
                            }}
                            className="ml-2 text-rose-200 underline hover:text-white shrink-0 text-[10px]"
                          >
                            查看核銷原則
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

