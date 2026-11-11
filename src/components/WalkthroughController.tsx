"use client";

import React, { useState, useEffect } from "react";
import { useGrantStore } from "@/lib/store";
import {
  Play,
  Square,
  Sparkles,
  ChevronRight,
  Clock,
  Volume2,
} from "lucide-react";

interface Step {
  seconds: number;
  label: string;
  voiceover: string;
  action: () => void;
}

export function WalkthroughController({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    resetAll,
    runHarvester,
    selectIssue,
    openPdfCitation,
    closePdfCitation,
    applyFix,
    setActiveEditorTab,
    guardrailIssues,
  } = useGrantStore();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const steps: Step[] = [
    {
      seconds: 0,
      label: "第 1 階段：重設狀態並貼上政府網址",
      voiceover:
        "\"When a founder applies for a government grant, they fail because of cross-doc traps and unwritten reviewer landmines. Watch GrantOS ingest a raw government portal.\"",
      action: () => {
        resetAll();
      },
    },
    {
      seconds: 8,
      label: "秒級爬蟲與法規 AST 編譯",
      voiceover:
        "\"In 4 seconds, GrantOS crawls the official portal, downloads all 5 buried PDFs, and compiles them into a live linter AST.\"",
      action: async () => {
        await runHarvester();
      },
    },
    {
      seconds: 24,
      label: "定位審查雷區：API Wrapper 陷阱",
      voiceover:
        "\"In the center canvas, GrantOS flags 'OpenAI API' with a linter squiggly line. Government reviewers reject commercial APIs as 'mere adoption'.\"",
      action: () => {
        const issue = guardrailIssues.find((i) => i.id === "issue-api-wrapper");
        if (issue) {
          selectIssue(issue.id);
          openPdfCitation(issue);
        }
      },
    },
    {
      seconds: 40,
      label: "檢視原版 PDF 條文並一鍵重構",
      voiceover:
        "\"Clicking the warning opens the exact government guideline. With one click, our operator reframes it into proprietary edge routing and benchmark QA.\"",
      action: () => {
        closePdfCitation();
        applyFix("issue-api-wrapper");
      },
    },
    {
      seconds: 55,
      label: "切換經費編列：法定會計鐵律勾稽",
      voiceover:
        "\"In the budget canvas, we caught employer insurance illegally included in R&D salary. One click purges it, keeping personnel under the 60% legal cap.\"",
      action: () => {
        setActiveEditorTab("budget");
        applyFix("issue-personnel-insurance");
        applyFix("issue-capital-cap");
      },
    },
    {
      seconds: 70,
      label: "文件庫勾稽：補正雙無欠稅證明",
      voiceover:
        "\"In the left evidence vault, we auto-verified the missing local tax certificate. Pre-review pass rate rockets from 26% to 98% Audit-Ready!\"",
      action: () => {
        setActiveEditorTab("proposal");
        applyFix("issue-missing-local-tax");
        applyFix("issue-clawback-kpi");
      },
    },
  ];

  // Timer loop when playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          // Check step triggers
          const nextStep = steps.findIndex((s) => s.seconds === next);
          if (nextStep !== -1) {
            setCurrentStepIndex(nextStep);
            steps[nextStep].action();
          }
          if (next >= 85) {
            setIsPlaying(false);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleStart = () => {
    setElapsed(0);
    setCurrentStepIndex(0);
    steps[0].action();
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  if (!isOpen) return null;

  const currentStep = steps[currentStepIndex];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-3xl bg-zinc-950/95 border-2 border-amber-500/80 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.25)] p-4 text-xs font-mono backdrop-blur animate-slideUp">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span className="font-bold text-zinc-100 text-sm">
            90-Second Demo Video Director (劇本排練與自動導播)
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-zinc-300 font-bold bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, "0")} / 1:30
            </span>
          </div>

          {!isPlaying ? (
            <button
              onClick={handleStart}
              className="flex items-center space-x-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded shadow transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>開始播放 (Auto-Play)</span>
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex items-center space-x-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded shadow transition"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>暫停導播</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 text-xs px-2 py-1"
          >
            關閉
          </button>
        </div>
      </div>

      {/* Current Step Description & Subtitle Cue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
          <div className="text-[10px] text-amber-400 font-bold uppercase mb-1 flex items-center space-x-1">
            <span>當前畫面步驟 (Step {currentStepIndex + 1}/6):</span>
          </div>
          <div className="text-zinc-200 font-semibold text-xs mb-1">
            {currentStep.label}
          </div>
          <div className="text-zinc-500 text-[11px]">
            觸發秒數: {currentStep.seconds}s
          </div>
        </div>

        <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
          <div className="text-[10px] text-cyan-400 font-bold uppercase mb-1 flex items-center space-x-1">
            <Volume2 className="w-3.5 h-3.5" />
            <span>90秒英文錄影講稿提示 (Teleprompter Cue):</span>
          </div>
          <div className="text-zinc-300 italic text-[11px] leading-relaxed">
            {currentStep.voiceover}
          </div>
        </div>
      </div>
    </div>
  );
}

