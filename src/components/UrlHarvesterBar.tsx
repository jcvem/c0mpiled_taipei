"use client";

import React, { useState } from "react";
import { useGrantStore } from "@/lib/store";
import {
  Globe,
  Terminal,
  FileCheck2,
  FileText,
  ChevronDown,
  ChevronUp,
  Download,
  CheckCircle2,
  AlertTriangle,
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
    hasHarvested,
    crawledDocs,
  } = useGrantStore();

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const handlePreset = (key: string) => {
    selectPortalPreset(key);
  };

  const handleCompile = async () => {
    setIsTerminalOpen(true);
    await runHarvester();
  };

  return (
    <div className="border-b border-zinc-800 bg-zinc-900/50 p-3 sm:px-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Left: Input Command Bar */}
        <div className="flex-1 flex items-center space-x-2">
          <div className="relative flex-1 flex items-center">
            <Globe className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={portalUrl}
              onChange={(e) => setPortalUrl(e.target.value)}
              placeholder="貼上政府補助官網網址 (e.g. https://www.industry-incentive.taipei/...)"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-md py-1.5 pl-9 pr-3 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition"
            />
          </div>

          <button
            onClick={handleCompile}
            disabled={isHarvesting}
            className="flex items-center space-x-1.5 bg-zinc-100 hover:bg-white text-zinc-950 px-3.5 py-1.5 rounded-md text-xs font-mono font-semibold transition disabled:opacity-50 shrink-0 shadow-sm"
          >
            {isHarvesting ? (
              <>
                <Cpu className="w-3.5 h-3.5 animate-spin text-zinc-800" />
                <span>編譯法規 AST...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>爬取官網須知 (Compile AST)</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Preset quick chips & Terminal toggle */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-[11px] font-mono text-zinc-500 hidden xl:inline">
            快速預設:
          </span>
          <button
            onClick={() => handlePreset("siti")}
            className={`px-2 py-1 text-xs font-mono rounded border transition ${
              selectedPortalKey === "siti"
                ? "bg-zinc-800 text-zinc-100 border-zinc-600 font-medium"
                : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200"
            }`}
          >
            臺北 SITI 115
          </button>
          <button
            onClick={() => handlePreset("sbir")}
            className={`px-2 py-1 text-xs font-mono rounded border transition ${
              selectedPortalKey === "sbir"
                ? "bg-zinc-800 text-zinc-100 border-zinc-600 font-medium"
                : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200"
            }`}
          >
            經濟部 SBIR 115
          </button>

          <button
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="flex items-center space-x-1 px-2 py-1 text-xs font-mono text-zinc-400 hover:text-zinc-200 bg-zinc-950 border border-zinc-800 rounded transition"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>日誌 ({crawledDocs.length} 份文件)</span>
            {isTerminalOpen ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {/* Live Terminal & Crawled Attachments Tree */}
      {(isTerminalOpen || isHarvesting) && (
        <div className="mt-3 p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-xs font-mono">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/80">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-zinc-300">
                Stage 1: 秒級須知爬蟲與法規 AST 編譯器
              </span>
            </div>
            <div className="text-[10px] text-zinc-500">
              進度: {harvestProgress}% | 來源: {selectedPortalKey.toUpperCase()}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden mb-3">
            <div
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full transition-all duration-300"
              style={{ width: `${harvestProgress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Terminal Logs */}
            <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800/60 max-h-40 overflow-y-auto space-y-1">
              {harvestLogs.length === 0 ? (
                <div className="text-zinc-500 text-[11px]">
                  等待觸發編譯... 點擊 [爬取官網須知] 啟動遞迴下載與 AST 解析。
                </div>
              ) : (
                harvestLogs.map((log, index) => (
                  <div
                    key={index}
                    className="text-[11px] text-zinc-300 leading-relaxed font-mono"
                  >
                    {log}
                  </div>
                ))
              )}
            </div>

            {/* Discovered Government Attachments */}
            <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800/60 max-h-40 overflow-y-auto space-y-1.5">
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
                官方下載附件清單 ({crawledDocs.length} 件):
              </div>
              {crawledDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between text-[11px] p-1.5 rounded bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 transition"
                >
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <FileText className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate text-zinc-200 font-medium">
                      {doc.filename}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-zinc-400 shrink-0 font-mono">
                    <span className="px-1 py-0.2 rounded bg-zinc-800 text-zinc-300">
                      {doc.pages} 頁
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      +{doc.parsedRulesCount} 條規則
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

