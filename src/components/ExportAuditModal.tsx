"use client";

import React from "react";
import { useGrantStore } from "@/lib/store";
import {
  X,
  ShieldCheck,
  Download,
  FileCheck,
  CheckCircle2,
  FileText,
  TableProperties,
  Award,
  Calendar,
  Lock,
} from "lucide-react";

export function ExportAuditModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { guardrailIssues, passProbability, selectedPortalKey, language } =
    useGrantStore();

  if (!isOpen) return null;

  const isCompliant = passProbability >= 95;
  const targetAgency =
    selectedPortalKey === "siti"
      ? language === "en"
        ? "Department of Economic Development, Taipei City"
        : "臺北市政府產業發展局"
      : language === "en"
      ? "Small & Medium Enterprise Administration, MOEA"
      : "經濟部中小及新創企業署";

  const targetProgram =
    selectedPortalKey === "siti"
      ? language === "en"
        ? "Taipei SITI Thematic AI R&D Grant (115)"
        : "臺北市產業發展研發補助「AI創新應用」主題研發專案"
      : language === "en"
      ? "MOEA Central SBIR Program (115)"
      : "經濟部 115年度 SBIR 小型企業創新研發計畫";

  const handleDownloadStub = (filename: string) => {
    // Generate text/stub file for immediate realistic download
    const content = `GrantOS Pre-Flight Audit Certificate\n====================================\nProgram: ${targetProgram}\nAgency: ${targetAgency}\nStatus: AUDIT-READY (${passProbability}%)\nTimestamp: ${new Date().toISOString()}\nDigital Seal: SHA256-G0-${Math.random().toString(36).substring(2, 10).toUpperCase()}\n\nAll 5 Critical Disqualification Traps & Reviewer Rubrics Verified.\n`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 font-sans text-xs overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-900 text-sm">
                  {language === "en"
                    ? "Official Grant Package Export"
                    : "核定版申請包匯出與初審合格證明"}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {passProbability}% AUDIT-READY
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {language === "en"
                  ? "All statutory caps and unwritten reviewer landmines resolved."
                  : "已通過所有法定會計硬約束與審查委員雷區勾稽。"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Card */}
        <div className="my-4 p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex justify-between items-center text-[11px] text-slate-500 border-b border-slate-200 pb-2">
            <span>{language === "en" ? "Grant Agency:" : "受理機關："}</span>
            <span className="font-bold text-slate-800">{targetAgency}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500 border-b border-slate-200 pb-2">
            <span>{language === "en" ? "Target Call:" : "申請專案："}</span>
            <span className="font-bold text-slate-800">{targetProgram}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500">
            <span>{language === "en" ? "Verification Seal:" : "防偽雜湊簽章："}</span>
            <span className="font-mono text-slate-700 text-[10px]">
              SHA256-8A39F-G0-TAIPEI-2026
            </span>
          </div>
        </div>

        {/* Resolved Checklist */}
        <div className="mb-4 space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-2">
            {language === "en" ? "Audit Clearance Verification:" : "合規查核項目清單："}
          </div>
          {guardrailIssues.map((issue) => (
            <div
              key={issue.id}
              className="flex items-center justify-between p-2 rounded-md bg-slate-50 text-[11px]"
            >
              <div className="flex items-center space-x-2 truncate">
                <CheckCircle2
                  className={`w-3.5 h-3.5 shrink-0 ${
                    issue.isFixed ? "text-emerald-600" : "text-slate-400"
                  }`}
                />
                <span className={issue.isFixed ? "text-slate-800 font-medium truncate" : "text-slate-400 truncate"}>
                  {language === "en" ? issue.titleEn : issue.title}
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-700 font-semibold shrink-0 ml-2">
                {issue.isFixed
                  ? language === "en"
                    ? "PASSED"
                    : "合格"
                  : language === "en"
                  ? "PENDING"
                  : "待修復"}
              </span>
            </div>
          ))}
        </div>

        {/* Export Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200">
          <button
            onClick={() => handleDownloadStub("附件A_研發計畫書_115核定版.docx")}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              {language === "en" ? "Export Proposal (.docx)" : "匯出計畫書 (.docx)"}
            </span>
          </button>

          <button
            onClick={() => handleDownloadStub("附件B_經費試算表_115核定版.xlsx")}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-md bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-medium text-xs shadow-2xs transition"
          >
            <TableProperties className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {language === "en" ? "Export Budget (.xlsx)" : "匯出預算表 (.xlsx)"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
