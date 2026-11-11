"use client";

import React from "react";
import { useGrantStore } from "@/lib/store";
import {
  X,
  FileText,
  Bookmark,
  CheckCircle,
  ExternalLink,
  ShieldAlert,
  Printer,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export function PdfCitationDrawer() {
  const { activePdfCitationIssue, closePdfCitation, applyFix } = useGrantStore();

  if (!activePdfCitationIssue) return null;

  const { citation, title, type, humanMicroTaskPrompt, fixButtonLabel, isFixed, id } =
    activePdfCitationIssue;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
      {/* Slide-over Container */}
      <div className="w-full max-w-xl bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl font-mono text-xs">
        {/* Top Bar */}
        <div className="p-3 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <div className="flex flex-col">
              <span className="font-bold text-zinc-200 text-xs">
                官方原版 PDF 條文抽屜
              </span>
              <span className="text-[10px] text-zinc-500">
                GrantOS 双向法條錨定引擎 (Page {citation.page})
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={closePdfCitation}
              className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Simulated Viewer */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900/40">
          {/* Simulated White Paper PDF Page */}
          <div className="bg-white text-zinc-900 rounded shadow-xl border border-zinc-300 p-6 relative font-serif">
            {/* Watermark / Seal */}
            <div className="absolute top-6 right-6 border-2 border-red-800/40 text-red-800/40 rounded px-2 py-1 text-[10px] font-sans font-bold uppercase rotate-12 pointer-events-none">
              官方核定版 OFFICIAL
            </div>

            {/* Document Header */}
            <div className="border-b-2 border-zinc-900 pb-3 mb-4 text-center">
              <div className="text-[11px] text-zinc-600 font-sans tracking-widest uppercase">
                中華民國 115 年度政府創新科技研發專案
              </div>
              <h1 className="text-base font-bold text-zinc-950 font-sans mt-1">
                {citation.docName}
              </h1>
              <div className="text-[10px] text-zinc-500 font-sans mt-0.5">
                頁碼：第 {citation.page} 頁 / 節次：{citation.section}
              </div>
            </div>

            {/* Simulated Official Paragraphs */}
            <div className="space-y-3 text-xs leading-relaxed text-zinc-800">
              <p className="text-zinc-600 text-[11px]">
                ...前項申請計畫經形式初審小組核對，若有資格未符或要件缺漏者，將依相關管理作業規範辦理。所有經費編列與會計科目核銷，皆依據審計法規及專案查核要點辦理，凡有違反下列原則者，概不予受理或於期末核銷予以剔除：
              </p>

              {/* The Yellow Highlight Box over Cited Law */}
              <div className="p-3 bg-yellow-200/90 border-l-4 border-yellow-600 rounded-r shadow-sm text-zinc-950 font-medium text-xs leading-relaxed my-2">
                <div className="text-[10px] font-sans font-bold text-yellow-900 uppercase tracking-wider mb-1 flex items-center space-x-1">
                  <span>★ 審查法規錨定依據 ({citation.section}):</span>
                </div>
                {citation.quote}
              </div>

              <p className="text-zinc-600 text-[11px]">
                各申請單位務必依本手冊所載規範確實自我勾稽，避免於第一階段書面形式審查即遭資格駁回。經費編列請以實際研發所需本薪為限，若涉及委外或顧問費用，需於計畫書中充分說明必要性與不可替代性...
              </p>
            </div>

            {/* Official Footer */}
            <div className="border-t border-zinc-300 pt-3 mt-6 flex justify-between text-[10px] font-sans text-zinc-500">
              <span>經濟部中小及新創企業署 / 臺北市政府產業發展局 印製</span>
              <span>Page {citation.page}</span>
            </div>
          </div>

          {/* Issue Summary & Quick Action Card */}
          <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800 font-mono">
            <div className="flex items-center space-x-1.5 text-rose-400 font-bold mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>命中違規：{title}</span>
            </div>
            <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
              {humanMicroTaskPrompt}
            </p>

            {!isFixed ? (
              <button
                onClick={() => {
                  applyFix(id);
                  closePdfCitation();
                }}
                className="w-full py-2 px-3 rounded bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow-md transition"
              >
                {fixButtonLabel}
              </button>
            ) : (
              <div className="flex items-center justify-center space-x-1.5 py-1.5 text-emerald-400 font-semibold bg-emerald-950/60 rounded border border-emerald-500/30">
                <CheckCircle className="w-4 h-4" />
                <span>此項條文要求已 100% 修正並合規</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

