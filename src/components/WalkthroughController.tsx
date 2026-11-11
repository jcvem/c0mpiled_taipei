"use client";

import React, { useState, useEffect } from "react";
import { useGrantStore } from "@/lib/store";
import {
  Play,
  Square,
  Sparkles,
  Clock,
  Volume2,
} from "lucide-react";

interface Step {
  seconds: number;
  label: string;
  labelEn: string;
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
    language,
  } = useGrantStore();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const steps: Step[] = [
    {
      seconds: 0,
      label: "第 1 階段：重設狀態並貼上政府網址",
      labelEn: "Step 1: Ingest Government Portal URL",
      voiceover:
        "\"When a founder applies for a government grant, they fail because of cross-doc traps and unwritten reviewer landmines. Watch GrantOS ingest a raw government portal.\"",
      action: () => {
        resetAll();
      },
    },
    {
      seconds: 8,
      label: "秒級爬蟲與法規 AST 編譯",
      labelEn: "Step 2: 4-Second Crawler & AST Compiler",
      voiceover:
        "\"In 4 seconds, GrantOS crawls the official portal, downloads all 5 buried PDFs, and compiles them into a live linter AST.\"",
      action: async () => {
        await runHarvester();
      },
    },
    {
      seconds: 24,
      label: "定位審查雷區：API Wrapper 陷阱",
      labelEn: "Step 3: Reviewer Red Flag (API Wrapper Phrasing)",
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
      labelEn: "Step 4: Inspect PDF Citation & 1-Click Guided Fix",
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
      labelEn: "Step 5: Budget Canvas (Purge Employer Insurance & Match Capital)",
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
      labelEn: "Step 6: Vault Reconcile (Pass Rate jumps to 98% Audit-Ready)",
      voiceover:
        "\"In the left evidence vault, we auto-verified the missing local tax certificate. Pre-review pass rate rockets from 24% to 98% Audit-Ready!\"",
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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-3xl bg-white/98 border border-slate-300 rounded-xl shadow-2xl p-4 text-xs font-sans backdrop-blur animate-slideUp">
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="font-bold text-slate-900 text-sm">
            {language === "en"
              ? "90-Second Demo Teleprompter & Director"
              : "90秒影片錄製導播與英文講稿提示器"}
          </span>
        </div>

        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1.5 text-slate-700 font-bold bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>
              {Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, "0")} / 1:30
            </span>
          </div>

          {!isPlaying ? (
            <button
              onClick={handleStart}
              className="flex items-center space-x-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md shadow-xs transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{language === "en" ? "Play Sequence" : "開始播放 (Auto-Play)"}</span>
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex items-center space-x-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-md shadow-xs transition"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>{language === "en" ? "Pause" : "暫停導播"}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xs px-2 py-1 font-medium"
          >
            {language === "en" ? "Close" : "關閉"}
          </button>
        </div>
      </div>

      {/* Current Step Description & Subtitle Cue */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div className="text-[10px] text-slate-500 font-bold uppercase mb-1 flex items-center space-x-1">
            <span>
              {language === "en"
                ? `Active Demo Action (${currentStepIndex + 1}/6):`
                : `當前畫面步驟 (Step ${currentStepIndex + 1}/6):`}
            </span>
          </div>
          <div className="text-slate-900 font-semibold text-xs mb-1">
            {language === "en" ? currentStep.labelEn : currentStep.label}
          </div>
          <div className="text-slate-500 text-[11px] font-mono">
            Trigger: {currentStep.seconds}s
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div className="text-[10px] text-slate-600 font-bold uppercase mb-1 flex items-center space-x-1">
            <Volume2 className="w-3.5 h-3.5 text-blue-600" />
            <span>90s Pitch Voiceover Cue (English Script):</span>
          </div>
          <div className="text-slate-700 italic text-[11px] leading-relaxed">
            {currentStep.voiceover}
          </div>
        </div>
      </div>
    </div>
  );
}
