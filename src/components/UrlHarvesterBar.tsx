"use client";

import React, { useState } from "react";
import { useGrantStore } from "@/lib/store";
import {
  Globe,
  Terminal,
  FileText,
  ChevronDown,
  ChevronUp,
  Play,
  Cpu,
} from "lucide-react";

export function UrlHarvesterBar() {
  const {
    portalUrl,
    setPortalUrl,
    selectedPortalKey,
    selectPortalPreset,
    runHarvester,
    isHarvesting,
    harvestProgress,
    harvestLogs,
    crawledDocs,
    language,
  } = useGrantStore();

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const handleCompile = async () => {
    setIsTerminalOpen(true);
    await runHarvester();
  };

  return (
    <div className="border-b border-slate-200 bg-white p-3 sm:px-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Left: Input Command Bar */}
        <div className="flex-1 flex items-center space-x-2">
          <div className="relative flex-1 flex items-center">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={portalUrl}
              onChange={(e) => setPortalUrl(e.target.value)}
              placeholder={
                language === "en"
                  ? "Paste Government Portal URL (e.g. https://www.industry-incentive.taipei/...)"
                  : "貼上政府補助官網網址 (e.g. https://www.industry-incentive.taipei/...)"
              }
              className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-md py-1.5 pl-9 pr-3 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition shadow-2xs"
            />
          </div>

          <button
            onClick={handleCompile}
            disabled={isHarvesting}
            className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-md text-xs font-sans font-medium transition disabled:opacity-50 shrink-0 shadow-xs"
          >
            {isHarvesting ? (
              <>
                <Cpu className="w-3.5 h-3.5 animate-spin text-slate-300" />
                <span>
                  {language === "en" ? "Compiling AST..." : "編譯法規 AST..."}
                </span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>
                  {language === "en"
                    ? "Crawl & Compile AST"
                    : "爬取官網須知 (Compile AST)"}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Right: Preset quick chips & Terminal toggle */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-[11px] font-sans text-slate-400 hidden xl:inline">
            {language === "en" ? "Quick Presets:" : "官方預設："}
          </span>
          <button
            onClick={() => selectPortalPreset("siti")}
            className={`px-2.5 py-1 text-xs font-sans rounded-md border transition ${
              selectedPortalKey === "siti"
                ? "bg-slate-100 text-slate-900 border-slate-300 font-semibold shadow-2xs"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            {language === "en" ? "Taipei SITI" : "臺北 SITI 115"}
          </button>
          <button
            onClick={() => selectPortalPreset("sbir")}
            className={`px-2.5 py-1 text-xs font-sans rounded-md border transition ${
              selectedPortalKey === "sbir"
                ? "bg-slate-100 text-slate-900 border-slate-300 font-semibold shadow-2xs"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            {language === "en" ? "Taiwan SBIR" : "經濟部 SBIR 115"}
          </button>

          <button
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-sans text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-md transition shadow-2xs"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span>
              {language === "en"
                ? `Crawler Logs (${crawledDocs.length})`
                : `爬蟲日誌 (${crawledDocs.length} 份)`}
            </span>
            {isTerminalOpen ? (
              <ChevronUp className="w-3 h-3 text-slate-400" />
            ) : (
              <ChevronDown className="w-3 h-3 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Live Terminal & Crawled Attachments Tree */}
      {(isTerminalOpen || isHarvesting) && (
        <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono shadow-2xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-slate-800">
                {language === "en"
                  ? "Stage 1: Government Portal Crawler & Legal AST Compiler"
                  : "Stage 1: 秒級須知爬蟲與法規 AST 編譯器"}
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              {language === "en" ? "Progress:" : "進度:"} {harvestProgress}% |{" "}
              {selectedPortalKey.toUpperCase()}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-3">
            <div
              className="bg-slate-900 h-full transition-all duration-300"
              style={{ width: `${harvestProgress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Terminal Logs */}
            <div className="bg-white p-2.5 rounded-md border border-slate-200 max-h-40 overflow-y-auto space-y-1.5">
              {harvestLogs.length === 0 ? (
                <div className="text-slate-400 text-[11px]">
                  {language === "en"
                    ? "Awaiting trigger... Click [Crawl & Compile AST] to discover attachments."
                    : "等待觸發編譯... 點擊 [爬取官網須知] 啟動遞迴下載與 AST 解析。"}
                </div>
              ) : (
                harvestLogs.map((log, index) => (
                  <div
                    key={index}
                    className="text-[11px] text-slate-700 leading-relaxed font-mono"
                  >
                    {language === "en"
                      ? log.en
                      : language === "zh"
                      ? log.zh
                      : `${log.zh} / ${log.en}`}
                  </div>
                ))
              )}
            </div>

            {/* Discovered Government Attachments */}
            <div className="bg-white p-2.5 rounded-md border border-slate-200 max-h-40 overflow-y-auto space-y-1.5">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">
                {language === "en"
                  ? `Official Downloaded Packages (${crawledDocs.length}):`
                  : `官方下載附件清單 (${crawledDocs.length} 件):`}
              </div>
              {crawledDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between text-[11px] p-1.5 rounded bg-slate-50 border border-slate-200 hover:border-slate-300 transition"
                >
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <FileText className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span className="truncate text-slate-800 font-medium font-sans">
                      {language === "en" ? doc.titleEn : doc.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-slate-500 shrink-0 font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-medium">
                      {doc.pages} {language === "en" ? "pgs" : "頁"}
                    </span>
                    <span className="text-emerald-700 font-semibold">
                      +{doc.parsedRulesCount} rules
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
