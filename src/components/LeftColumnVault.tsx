"use client";

import React from "react";
import { useGrantStore } from "@/lib/store";
import {
  FolderArchive,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  BadgeAlert,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  Users,
  Receipt,
  Scale,
} from "lucide-react";

export function LeftColumnVault() {
  const { companyDocs, crawledDocs, guardrailIssues, selectIssue, openPdfCitation } =
    useGrantStore();

  const missingTaxIssue = guardrailIssues.find((i) => i.id === "issue-missing-local-tax");
  const capitalIssue = guardrailIssues.find((i) => i.id === "issue-capital-cap");

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-zinc-800 overflow-y-auto">
      {/* Pane Header */}
      <div className="p-3 border-b border-zinc-800 bg-zinc-900/40 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FolderArchive className="w-4 h-4 text-zinc-400" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
            應備文件與資格勾稽庫
          </h2>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
          Vault v1.0
        </span>
      </div>

      <div className="p-3 space-y-4">
        {/* Section 1: Pre-crawled Official Rulebook AST anchor */}
        <div className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-zinc-400 font-semibold flex items-center space-x-1.5">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>官方比對基準 (Crawled Rule AST)</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 rounded">
              已同步 148 條法定規則
            </span>
          </div>
          <div className="text-[11px] font-mono text-zinc-500 leading-relaxed">
            系統已錨定官方附件 C 會計原則、附件 D 自我檢查表與審查重點，作為所有交叉勾稽之唯一法理真理來源。
          </div>
        </div>

        {/* Section 2: Cross-document Evidence Vault Cards */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">
              公司證件與報表勾稽 ({companyDocs.length})
            </span>
            <span className="text-[10px] font-mono text-zinc-500">自動 OCR 萃取</span>
          </div>

          {companyDocs.map((doc) => {
            const isVerified = doc.status === "VERIFIED";
            const isWarning = doc.status === "WARNING";
            const isMissing = doc.status === "MISSING_CRITICAL";

            return (
              <div
                key={doc.id}
                className={`p-2.5 rounded-lg border text-xs font-mono transition ${
                  isMissing
                    ? "bg-rose-950/20 border-rose-500/40 hover:border-rose-500/60"
                    : isWarning
                    ? "bg-amber-950/20 border-amber-500/40 hover:border-amber-500/60"
                    : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {/* Doc Header */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center space-x-1.5 overflow-hidden">
                    {doc.type === "moea_capital" && (
                      <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    )}
                    {doc.type === "labor_roster" && (
                      <Users className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    )}
                    {(doc.type === "tax_national" || doc.type === "tax_local") && (
                      <Receipt className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    )}
                    <span className="font-semibold text-zinc-200 truncate text-[11px]">
                      {doc.name}
                    </span>
                  </div>

                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      isMissing
                        ? "bg-rose-900/60 text-rose-300 border border-rose-700/60 animate-pulse"
                        : isWarning
                        ? "bg-amber-900/60 text-amber-300 border border-amber-700/60"
                        : "bg-emerald-950/80 text-emerald-300 border border-emerald-700/60"
                    }`}
                  >
                    {isMissing
                      ? "🔴 致命缺漏"
                      : isWarning
                      ? "⚠️ 需注意"
                      : "🟢 勾稽合格"}
                  </span>
                </div>

                {/* File info */}
                <div className="text-[10px] text-zinc-500 mb-2 truncate">
                  📄 {doc.filename} {doc.issueDate ? `(${doc.issueDate})` : ""}
                </div>

                {/* Extracted Metadata pills */}
                <div className="bg-zinc-950/70 p-2 rounded border border-zinc-800/80 mb-2 space-y-1 text-[11px]">
                  {doc.metadata?.paidInCapital && (
                    <div className="flex justify-between text-zinc-300">
                      <span className="text-zinc-500">實收資本額:</span>
                      <span className="font-bold text-zinc-200">
                        NT$ {doc.metadata.paidInCapital.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {doc.metadata?.insuredHeadcount !== undefined && (
                    <div className="flex justify-between text-zinc-300">
                      <span className="text-zinc-500">投保總人數:</span>
                      <span className="font-bold text-zinc-200">
                        {doc.metadata.insuredHeadcount} 人 (含全職工程師)
                      </span>
                    </div>
                  )}
                  {doc.metadata?.isTaxClear !== undefined && (
                    <div className="flex justify-between text-zinc-300">
                      <span className="text-zinc-500">欠稅查核狀態:</span>
                      <span
                        className={`font-semibold ${
                          doc.metadata.isTaxClear ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {doc.metadata.isTaxClear ? "無欠繳違章 (合格)" : "未檢附證明 (退件)"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Notes & Citation link */}
                <div
                  className={`text-[10px] leading-relaxed p-1.5 rounded ${
                    isMissing
                      ? "bg-rose-950/40 text-rose-300"
                      : isWarning
                      ? "bg-amber-950/40 text-amber-300"
                      : "text-zinc-400"
                  }`}
                >
                  {doc.notes}
                </div>

                {/* If missing, action to inspect the rule or open copilot */}
                {isMissing && missingTaxIssue && (
                  <button
                    onClick={() => {
                      selectIssue(missingTaxIssue.id);
                      openPdfCitation(missingTaxIssue);
                    }}
                    className="mt-2 w-full flex items-center justify-center space-x-1 py-1 rounded bg-rose-900/30 hover:bg-rose-900/50 border border-rose-500/40 text-rose-200 text-[10px] font-mono transition"
                  >
                    <span>查看法規依據 (須知 p.14 §4.2)</span>
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

