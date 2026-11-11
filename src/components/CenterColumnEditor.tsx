"use client";

import React from "react";
import { useGrantStore } from "@/lib/store";
import {
  FileCode,
  TableProperties,
  AlertTriangle,
  CheckCircle2,
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
    language,
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
  const selfFunded = isCapitalFixed ? 1000000 : 1500000;
  const paidInCapital = 1000000;

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 overflow-hidden">
      {/* Tab Switcher Header */}
      <div className="h-10 border-b border-slate-200 bg-slate-50/80 px-3 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveEditorTab("proposal")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-sans rounded-t-md transition ${
              activeEditorTab === "proposal"
                ? "bg-white text-slate-900 border-t border-x border-slate-200 font-bold shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-rose-600" />
            <span>
              {language === "en"
                ? "Appendix A: Proposal Canvas (.odt)"
                : "附件A_研發計畫書草稿.odt"}
            </span>
            {proposalParagraphs.some((p) => p.hasIssue) && (
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse ml-1" />
            )}
          </button>

          <button
            onClick={() => setActiveEditorTab("budget")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-sans rounded-t-md transition ${
              activeEditorTab === "budget"
                ? "bg-white text-slate-900 border-t border-x border-slate-200 font-bold shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <TableProperties className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {language === "en"
                ? "Appendix B: Budget Sheet (.xlsx)"
                : "附件B_經費預算試算表.xlsx"}
            </span>
            {budgetItems.some((b) => b.hasViolation) && (
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse ml-1" />
            )}
          </button>
        </div>

        <div className="text-[11px] font-sans text-slate-400 hidden sm:block">
          {activeEditorTab === "proposal"
            ? language === "en"
              ? "Live ESLint Linter Mode"
              : "即時法規語法檢核 (ESLint Mode)"
            : language === "en"
            ? "Statutory Cap Enforcement"
            : "法定科目上限自動勾稽"}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40">
        {activeEditorTab === "proposal" ? (
          /* Proposal Draft Canvas with Squiggly Underlines */
          <div className="space-y-4 font-sans text-xs">
            <div className="p-2.5 bg-blue-50/60 rounded-md border border-blue-200/80 flex items-center justify-between text-blue-900 text-[11px]">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  {language === "en"
                    ? "Red/amber wavy lines indicate regulatory disqualification traps or reviewer landmines. Click underlines to inspect citations."
                    : "紅/黃波浪底線代表命中法規退件條款或委員潛規則，點擊底線可定位護欄卡片與官方條文。"}
                </span>
              </div>
            </div>

            {proposalParagraphs.map((p) => {
              const matchedIssue = guardrailIssues.find((i) => i.id === p.issueId);
              const isSelected = p.issueId && selectedIssueId === p.issueId;

              const displayTitle =
                language === "en"
                  ? p.sectionTitleEn
                  : language === "zh"
                  ? p.sectionTitle
                  : `${p.sectionTitle} (${p.sectionTitleEn})`;

              const contentText = language === "en" ? p.contentEn : p.content;
              const targetHighlight =
                language === "en" ? p.highlightedTextEn : p.highlightedText;

              return (
                <div
                  key={p.id}
                  className={`p-4 rounded-lg border transition shadow-2xs ${
                    p.hasIssue
                      ? isSelected
                        ? "bg-white border-rose-400 shadow-md ring-1 ring-rose-200"
                        : "bg-white border-slate-200 hover:border-slate-300"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800 text-xs">
                      {displayTitle}
                    </span>
                    {p.hasIssue && matchedIssue && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-sans font-semibold ${
                          matchedIssue.type === "HARD_TRAP"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {matchedIssue.type === "HARD_TRAP"
                          ? language === "en"
                            ? "FATAL GATE TRAP"
                            : "🛑 初審退件陷阱"
                          : language === "en"
                          ? "REVIEWER RED FLAG"
                          : "⚠️ 委員潛規則雷區"}
                      </span>
                    )}
                    {!p.hasIssue && (
                      <span className="text-[10px] text-emerald-700 flex items-center space-x-1 font-sans font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {language === "en" ? "Audit Passed" : "已通過語法檢核"}
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Paragraph text rendering with interactive wavy underline */}
                  <div className="text-slate-700 leading-relaxed text-xs">
                    {p.hasIssue && targetHighlight && matchedIssue ? (
                      <div>
                        {contentText.split(targetHighlight)[0]}
                        <span
                          onClick={() => {
                            selectIssue(matchedIssue.id);
                            openPdfCitation(matchedIssue);
                          }}
                          className={`${
                            matchedIssue.type === "HARD_TRAP"
                              ? "linter-squiggled-red"
                              : "linter-squiggled-amber"
                          } font-semibold`}
                          title={
                            language === "en"
                              ? "Click to inspect official rubric & 1-click fix"
                              : "點擊檢視官方審查指標與一鍵修復"
                          }
                        >
                          {targetHighlight}
                        </span>
                        {contentText.split(targetHighlight)[1]}
                      </div>
                    ) : (
                      <div className="whitespace-pre-line text-slate-700">
                        {contentText}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Budget Table Canvas with statutory meters */
          <div className="space-y-4 font-sans text-xs">
            {/* Statutory Guardrail Progress Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Personnel Cap Meter */}
              <div
                className={`p-3.5 rounded-lg border transition shadow-2xs ${
                  personnelPercentage > 60
                    ? "bg-rose-50/60 border-rose-300"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-600 font-semibold text-[11px]">
                    {language === "en"
                      ? "Personnel % (Statutory Cap ≦ 60%)"
                      : "人事費佔總經費比重 (法定上限 ≦ 60%)"}
                  </span>
                  <span
                    className={`font-bold font-mono ${
                      personnelPercentage > 60
                        ? "text-rose-700 text-sm"
                        : "text-emerald-700"
                    }`}
                  >
                    {personnelPercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full transition-all duration-500 ${
                      personnelPercentage > 60
                        ? "bg-rose-600"
                        : "bg-emerald-600"
                    }`}
                    style={{ width: `${Math.min(100, personnelPercentage)}%` }}
                  />
                </div>
                <div className="mt-1.5 text-[10px] text-slate-500 flex justify-between font-mono">
                  <span>
                    {language === "en"
                      ? "Appendix C Guidelines p.1"
                      : "依據: 附件C會計原則 p.1"}
                  </span>
                  <span className="font-semibold">
                    {personnelPercentage > 60
                      ? language === "en"
                        ? "❌ EXCEEDS CAP"
                        : "❌ 超出法定上限"
                      : language === "en"
                      ? "✅ COMPLIANT"
                      : "✅ 合規"}
                  </span>
                </div>
              </div>

              {/* Capital Cap Meter */}
              <div
                className={`p-3.5 rounded-lg border transition shadow-2xs ${
                  !isCapitalFixed
                    ? "bg-rose-50/60 border-rose-300"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-600 font-semibold text-[11px]">
                    {language === "en"
                      ? `Matching (NT$ ${selfFunded.toLocaleString()}) vs Capital`
                      : `自籌款 (NT$ ${selfFunded.toLocaleString()}) vs 實收資本額`}
                  </span>
                  <span
                    className={`font-bold font-mono ${
                      !isCapitalFixed
                        ? "text-rose-700 text-sm"
                        : "text-emerald-700"
                    }`}
                  >
                    {!isCapitalFixed
                      ? language === "en"
                        ? "Exceeds NT$ 500k"
                        : "超額 NT$ 50萬"
                      : language === "en"
                      ? "1:1 Match OK"
                      : "符合 1:1 上限"}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full transition-all duration-500 ${
                      !isCapitalFixed ? "bg-rose-600" : "bg-emerald-600"
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        (selfFunded / paidInCapital) * 100
                      )}%`,
                    }}
                  />
                </div>
                <div className="mt-1.5 text-[10px] text-slate-500 flex justify-between font-mono">
                  <span>
                    {language === "en"
                      ? "Paid Capital: NT$ 1.0M"
                      : "實收資本額: NT$ 1,000,000"}
                  </span>
                  <span className="font-semibold">
                    {!isCapitalFixed
                      ? language === "en"
                        ? "❌ DISQUALIFIED"
                        : "❌ 自籌款超標"
                      : language === "en"
                      ? "✅ VERIFIED"
                      : "✅ 勾稽合格"}
                  </span>
                </div>
              </div>
            </div>

            {/* Budget Line Items Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-800">
                  {language === "en"
                    ? "Reimbursement Budget Breakdown"
                    : "經費科目明細表 (核銷對照)"}
                </span>
                <span className="text-[11px] text-slate-500">
                  {language === "en" ? "Total Budget: " : "總經費預算: "}
                  <strong className="text-slate-900 font-mono text-sm">
                    NT$ {totalBudget.toLocaleString()}
                  </strong>
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {budgetItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 transition ${
                      item.hasViolation
                        ? "bg-rose-50/50 hover:bg-rose-50"
                        : "hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px] border border-slate-200">
                          {language === "en" ? item.categoryEn : item.category}
                        </span>
                        <span className="font-medium text-slate-900">
                          {language === "en"
                            ? item.nameEn
                            : language === "zh"
                            ? item.name
                            : `${item.name} (${item.nameEn})`}
                        </span>
                      </div>
                      <span className="font-bold font-mono text-slate-900 text-sm">
                        NT$ {item.amount.toLocaleString()}
                      </span>
                    </div>

                    {item.hasViolation && (
                      <div className="mt-2 p-2 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-between text-rose-800 text-[11px]">
                        <div className="flex items-center space-x-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>
                            {language === "en"
                              ? item.violationMessageEn
                              : item.violationMessage}
                          </span>
                        </div>
                        {personnelIssue && (
                          <button
                            onClick={() => {
                              selectIssue(personnelIssue.id);
                              openPdfCitation(personnelIssue);
                            }}
                            className="ml-2 text-rose-700 font-medium underline hover:text-rose-900 shrink-0 text-[10px]"
                          >
                            {language === "en" ? "View Rule" : "查看核銷原則"}
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
