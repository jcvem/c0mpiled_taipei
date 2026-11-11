"use client";

import React from "react";
import { useGrantStore } from "@/lib/store";
import {
  FolderArchive,
  Building2,
  Users,
  Receipt,
  Scale,
  ArrowRight,
} from "lucide-react";

export function LeftColumnVault() {
  const { companyDocs, guardrailIssues, selectIssue, openPdfCitation, language } =
    useGrantStore();

  const missingTaxIssue = guardrailIssues.find((i) => i.id === "issue-missing-local-tax");

  return (
    <div className="flex flex-col h-full bg-slate-50/60 border-r border-slate-200 overflow-y-auto">
      {/* Pane Header */}
      <div className="p-3 border-b border-slate-200 bg-white sticky top-0 z-10 flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-2">
          <FolderArchive className="w-4 h-4 text-slate-500" />
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-800">
            {language === "en"
              ? "Evidence & Document Vault"
              : language === "zh"
              ? "應備文件與資格勾稽庫"
              : "應備文件與資格庫 (Evidence Vault)"}
          </h2>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
          Reconciled
        </span>
      </div>

      <div className="p-3 space-y-3.5">
        {/* Section 1: Pre-crawled Official Rulebook AST anchor */}
        <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-sans text-slate-700 font-semibold flex items-center space-x-1.5">
              <Scale className="w-3.5 h-3.5 text-slate-700" />
              <span>
                {language === "en"
                  ? "Crawled Baseline AST"
                  : "官方比對基準 (Crawled Rule AST)"}
              </span>
            </span>
            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-medium">
              148 {language === "en" ? "Rules Synced" : "條法定規則"}
            </span>
          </div>
          <div className="text-[11px] font-sans text-slate-500 leading-relaxed">
            {language === "en"
              ? "Anchored against official Appendix C (Accounting) & Appendix D (Triage Checklist) as the deterministic source of truth."
              : "系統已錨定官方附件 C 會計原則、附件 D 自我檢查表與審查重點，作為所有交叉勾稽之唯一法理真理來源。"}
          </div>
        </div>

        {/* Section 2: Cross-document Evidence Vault Cards */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-sans font-semibold text-slate-600 uppercase tracking-wider">
              {language === "en"
                ? `Company Certificates (${companyDocs.length})`
                : `公司證件與報表勾稽 (${companyDocs.length})`}
            </span>
            <span className="text-[10px] font-sans text-slate-400">
              {language === "en" ? "OCR Reconciled" : "自動勾稽萃取"}
            </span>
          </div>

          {companyDocs.map((doc) => {
            const isVerified = doc.status === "VERIFIED";
            const isWarning = doc.status === "WARNING";
            const isMissing = doc.status === "MISSING_CRITICAL";

            return (
              <div
                key={doc.id}
                className={`p-3 rounded-lg border text-xs font-sans transition shadow-2xs ${
                  isMissing
                    ? "bg-rose-50/70 border-rose-300 hover:border-rose-400"
                    : isWarning
                    ? "bg-amber-50/70 border-amber-300 hover:border-amber-400"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Doc Header */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center space-x-1.5 overflow-hidden">
                    {doc.type === "moea_capital" && (
                      <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                    {doc.type === "labor_roster" && (
                      <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                    {(doc.type === "tax_national" || doc.type === "tax_local") && (
                      <Receipt className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                    <span className="font-semibold text-slate-900 truncate text-[11px]">
                      {language === "en"
                        ? doc.nameEn
                        : language === "zh"
                        ? doc.name
                        : `${doc.name}`}
                    </span>
                  </div>

                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      isMissing
                        ? "bg-rose-100 text-rose-800 border border-rose-300"
                        : isWarning
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    }`}
                  >
                    {isMissing
                      ? language === "en"
                        ? "FATAL MISSING"
                        : "🔴 致命缺漏"
                      : isWarning
                      ? language === "en"
                        ? "WARNING"
                        : "⚠️ 需注意"
                      : language === "en"
                      ? "VERIFIED"
                      : "🟢 勾稽合格"}
                  </span>
                </div>

                {/* File info */}
                <div className="text-[10px] text-slate-400 mb-2 truncate font-mono">
                  📄 {doc.filename} {doc.issueDate ? `(${doc.issueDate})` : ""}
                </div>

                {/* Extracted Metadata pills */}
                <div className="bg-slate-50 p-2 rounded-md border border-slate-200 mb-2 space-y-1 text-[11px] font-sans">
                  {doc.metadata?.paidInCapital && (
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-500">
                        {language === "en" ? "Paid-in Capital:" : "實收資本額:"}
                      </span>
                      <span className="font-bold text-slate-900 font-mono">
                        NT$ {doc.metadata.paidInCapital.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {doc.metadata?.insuredHeadcount !== undefined && (
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-500">
                        {language === "en" ? "Insured Headcount:" : "投保總人數:"}
                      </span>
                      <span className="font-bold text-slate-900 font-mono">
                        {doc.metadata.insuredHeadcount} {language === "en" ? "staff" : "人"}
                      </span>
                    </div>
                  )}
                  {doc.metadata?.isTaxClear !== undefined && (
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-500">
                        {language === "en" ? "Tax Clearance:" : "欠稅查核狀態:"}
                      </span>
                      <span
                        className={`font-semibold ${
                          doc.metadata.isTaxClear ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {doc.metadata.isTaxClear
                          ? language === "en"
                            ? "Clear (Valid)"
                            : "無欠繳違章 (合格)"
                          : language === "en"
                          ? "Missing (Reject)"
                          : "未檢附證明 (退件)"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Notes & Citation link */}
                <div
                  className={`text-[11px] leading-relaxed p-2 rounded-md ${
                    isMissing
                      ? "bg-rose-100/70 text-rose-900 font-medium"
                      : isWarning
                      ? "bg-amber-100/70 text-amber-900 font-medium"
                      : "text-slate-600 bg-slate-50"
                  }`}
                >
                  {language === "en"
                    ? doc.notesEn
                    : language === "zh"
                    ? doc.notes
                    : `${doc.notes} (${doc.notesEn})`}
                </div>

                {/* If missing, action to inspect the rule or open copilot */}
                {isMissing && missingTaxIssue && (
                  <button
                    onClick={() => {
                      selectIssue(missingTaxIssue.id);
                      openPdfCitation(missingTaxIssue);
                    }}
                    className="mt-2 w-full flex items-center justify-center space-x-1 py-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-sans font-medium transition shadow-xs"
                  >
                    <span>
                      {language === "en"
                        ? "Inspect Mandate (Guidelines p.14 §4.2)"
                        : "查看法規依據 (須知 p.14 §4.2)"}
                    </span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
