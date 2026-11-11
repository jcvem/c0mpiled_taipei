"use client";

import React from "react";
import { useGrantStore } from "@/lib/store";
import {
  X,
  Bookmark,
  CheckCircle,
  ShieldAlert,
} from "lucide-react";

export function PdfCitationDrawer() {
  const { activePdfCitationIssue, closePdfCitation, applyFix, language } =
    useGrantStore();

  if (!activePdfCitationIssue) return null;

  const {
    citation,
    title,
    titleEn,
    humanMicroTaskPrompt,
    humanMicroTaskPromptEn,
    fixButtonLabel,
    fixButtonLabelEn,
    isFixed,
    id,
  } = activePdfCitationIssue;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Slide-over Container */}
      <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl font-sans text-xs">
        {/* Top Bar */}
        <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4 text-slate-700" />
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-xs">
                {language === "en"
                  ? "Official PDF Citation Drawer"
                  : "官方原版 PDF 條文抽屜"}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                GrantOS Bi-directional Citation Engine (Page {citation.page})
              </span>
            </div>
          </div>

          <button
            onClick={closePdfCitation}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PDF Simulated Viewer */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-100/70">
          {/* Simulated White Paper PDF Page */}
          <div className="bg-white text-slate-900 rounded-lg shadow-md border border-slate-300 p-6 relative font-serif">
            {/* Watermark / Seal */}
            <div className="absolute top-6 right-6 border-2 border-red-700/60 text-red-700/70 rounded px-2.5 py-1 text-[10px] font-sans font-bold uppercase rotate-12 pointer-events-none tracking-wider">
              官方核定版 OFFICIAL
            </div>

            {/* Document Header */}
            <div className="border-b-2 border-slate-900 pb-3 mb-4 text-center">
              <div className="text-[11px] text-slate-600 font-sans tracking-widest uppercase">
                {language === "en"
                  ? "Republic of China 2026 Government R&D Subsidy Program"
                  : "中華民國 115 年度政府創新科技研發專案"}
              </div>
              <h1 className="text-base font-bold text-slate-950 font-sans mt-1">
                {language === "en" ? citation.docNameEn : citation.docName}
              </h1>
              <div className="text-[10px] text-slate-500 font-sans mt-0.5 font-mono">
                {language === "en"
                  ? `Page ${citation.page} / Section: ${citation.section}`
                  : `頁碼：第 ${citation.page} 頁 / 節次：${citation.section}`}
              </div>
            </div>

            {/* Simulated Official Paragraphs */}
            <div className="space-y-3 text-xs leading-relaxed text-slate-800">
              <p className="text-slate-600 text-[11px]">
                {language === "en"
                  ? "...The preliminary review committee shall strictly verify applicant qualifications against official criteria. Any non-compliance with the following statutory requirements will result in disqualification or audit clawbacks during final settlement:"
                  : "...前項申請計畫經形式初審小組核對，若有資格未符或要件缺漏者，將依相關管理作業規範辦理。凡有違反下列原則者，概不予受理或於期末核銷予以剔除："}
              </p>

              {/* The Yellow Highlight Box over Cited Law */}
              <div className="p-3.5 bg-yellow-100 border-l-4 border-yellow-600 rounded-r-md shadow-2xs text-slate-950 font-medium text-xs leading-relaxed my-2.5">
                <div className="text-[10px] font-sans font-bold text-yellow-900 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <span>★ 審查法規錨定依據 ({citation.section}):</span>
                </div>
                <div className="font-serif">
                  {language === "en" ? citation.quoteEn : citation.quote}
                </div>
                {language === "bilingual" && (
                  <div className="mt-2 pt-2 border-t border-yellow-300 text-[11px] text-slate-700 italic">
                    {citation.quoteEn}
                  </div>
                )}
              </div>

              <p className="text-slate-600 text-[11px]">
                {language === "en"
                  ? "All applicants must adhere to the accounting thresholds stipulated herein. Personnel expenses must reflect legitimate engineering base wages only..."
                  : "各申請單位務必依本手冊所載規範確實自我勾稽，避免於第一階段書面形式審查即遭資格駁回。經費編列請以實際研發所需本薪為限..."}
              </p>
            </div>

            {/* Official Footer */}
            <div className="border-t border-slate-200 pt-3 mt-6 flex justify-between text-[10px] font-sans text-slate-500">
              <span>
                {language === "en"
                  ? "Taiwan MOEA / Taipei City Government DOED"
                  : "經濟部中小及新創企業署 / 臺北市政府產業發展局 印製"}
              </span>
              <span className="font-mono">Page {citation.page}</span>
            </div>
          </div>

          {/* Issue Summary & Quick Action Card */}
          <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm font-sans">
            <div className="flex items-center space-x-1.5 text-rose-700 font-bold mb-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>
                {language === "en" ? "Violation Detected: " : "命中違規："}
                {language === "en" ? titleEn : title}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
              {language === "en" ? humanMicroTaskPromptEn : humanMicroTaskPrompt}
            </p>

            {!isFixed ? (
              <button
                onClick={() => {
                  applyFix(id);
                  closePdfCitation();
                }}
                className="w-full py-2 px-3 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-xs transition"
              >
                {language === "en" ? fixButtonLabelEn : fixButtonLabel}
              </button>
            ) : (
              <div className="flex items-center justify-center space-x-1.5 py-2 text-emerald-800 font-semibold bg-emerald-50 rounded-md border border-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === "en"
                    ? "This regulatory requirement is 100% compliant."
                    : "此項條文要求已 100% 修正並合規"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
