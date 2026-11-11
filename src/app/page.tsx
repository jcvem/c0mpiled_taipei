"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { UrlHarvesterBar } from "@/components/UrlHarvesterBar";
import { LeftColumnVault } from "@/components/LeftColumnVault";
import { CenterColumnEditor } from "@/components/CenterColumnEditor";
import { RightColumnCopilot } from "@/components/RightColumnCopilot";
import { PdfCitationDrawer } from "@/components/PdfCitationDrawer";
import { WalkthroughController } from "@/components/WalkthroughController";
import { ExportAuditModal } from "@/components/ExportAuditModal";
import { MobileActivePane } from "@/lib/types";
import { useGrantStore } from "@/lib/store";
import { FolderArchive, FileCode, ShieldAlert } from "lucide-react";

export default function Home() {
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [mobilePane, setMobilePane] = useState<MobileActivePane>("editor");
  const { language, unresolvedCount } = useGrantStore();

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-100 selection:text-rose-900">
      {/* 1. Header Navbar */}
      <Navbar
        onStartWalkthrough={() => setIsWalkthroughOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* 2. Stage 1: 1-URL Rule Harvester Bar */}
      <UrlHarvesterBar />

      {/* Mobile / Small screen Pane Switcher */}
      <div className="flex lg:hidden border-b border-slate-200 bg-white px-2 py-1.5 space-x-1 sticky top-14 z-20">
        <button
          onClick={() => setMobilePane("vault")}
          className={`flex-1 py-1.5 px-2 rounded-md text-xs font-sans font-medium flex items-center justify-center space-x-1 transition ${
            mobilePane === "vault"
              ? "bg-slate-900 text-white shadow-2xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <FolderArchive className="w-3.5 h-3.5" />
          <span>{language === "en" ? "Vault" : "文件庫"}</span>
        </button>

        <button
          onClick={() => setMobilePane("editor")}
          className={`flex-1 py-1.5 px-2 rounded-md text-xs font-sans font-medium flex items-center justify-center space-x-1 transition ${
            mobilePane === "editor"
              ? "bg-slate-900 text-white shadow-2xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>{language === "en" ? "Canvas" : "計畫書與預算"}</span>
        </button>

        <button
          onClick={() => setMobilePane("copilot")}
          className={`flex-1 py-1.5 px-2 rounded-md text-xs font-sans font-medium flex items-center justify-center space-x-1 transition relative ${
            mobilePane === "copilot"
              ? "bg-slate-900 text-white shadow-2xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
          <span>{language === "en" ? "Copilot" : "護欄助手"}</span>
          {unresolvedCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500 ml-1" />
          )}
        </button>
      </div>

      {/* 3. Stage 2: 3-Column Guardrail IDE */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-8.5rem)] bg-slate-50">
        {/* Left Column: Document & Evidence Vault (3 cols) */}
        <section
          className={`lg:col-span-3 h-[calc(100vh-12rem)] lg:h-auto border-b lg:border-b-0 ${
            mobilePane === "vault" ? "block" : "hidden lg:block"
          }`}
        >
          <LeftColumnVault />
        </section>

        {/* Center Column: The Grant Editor & Budget Canvas (5 cols) */}
        <section
          className={`lg:col-span-5 h-[calc(100vh-12rem)] lg:h-auto border-b lg:border-b-0 ${
            mobilePane === "editor" ? "block" : "hidden lg:block"
          }`}
        >
          <CenterColumnEditor />
        </section>

        {/* Right Column: Guardrail Copilot & Traps (4 cols) */}
        <section
          className={`lg:col-span-4 h-[calc(100vh-12rem)] lg:h-auto ${
            mobilePane === "copilot" ? "block" : "hidden lg:block"
          }`}
        >
          <RightColumnCopilot />
        </section>
      </div>

      {/* Slide-over Official PDF Citation Drawer */}
      <PdfCitationDrawer />

      {/* Export Official Package & Certificate Modal */}
      <ExportAuditModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* 90-Second Demo Video Director / Teleprompter */}
      <WalkthroughController
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
      />
    </main>
  );
}
