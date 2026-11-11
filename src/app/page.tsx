"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { UrlHarvesterBar } from "@/components/UrlHarvesterBar";
import { LeftColumnVault } from "@/components/LeftColumnVault";
import { CenterColumnEditor } from "@/components/CenterColumnEditor";
import { RightColumnCopilot } from "@/components/RightColumnCopilot";
import { PdfCitationDrawer } from "@/components/PdfCitationDrawer";
import { WalkthroughController } from "@/components/WalkthroughController";

export default function Home() {
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-rose-500/20">
      {/* 1. Header Navbar */}
      <Navbar onStartWalkthrough={() => setIsWalkthroughOpen(true)} />

      {/* 2. Stage 1: 1-URL Rule Harvester Bar */}
      <UrlHarvesterBar />

      {/* 3. Stage 2: 3-Column Guardrail IDE */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-8.5rem)]">
        {/* Left Column: Document & Evidence Vault (3 cols) */}
        <section className="lg:col-span-3 h-[600px] lg:h-auto border-b lg:border-b-0">
          <LeftColumnVault />
        </section>

        {/* Center Column: The Grant Editor & Budget Canvas (5 cols) */}
        <section className="lg:col-span-5 h-[600px] lg:h-auto border-b lg:border-b-0">
          <CenterColumnEditor />
        </section>

        {/* Right Column: Guardrail Copilot & Traps (4 cols) */}
        <section className="lg:col-span-4 h-[600px] lg:h-auto">
          <RightColumnCopilot />
        </section>
      </div>

      {/* Slide-over Official PDF Citation Drawer */}
      <PdfCitationDrawer />

      {/* 90-Second Demo Video Director / Teleprompter */}
      <WalkthroughController
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
      />
    </main>
  );
}

