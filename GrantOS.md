# Project Specification: GrantOS — The Deterministic Grant Compiler & Guardrail IDE

**Hackathon Track:** YC Startup School Hackathon (c0mpiled-18 Taipei) — "The $15-an-Hour Expert" (Brad Flora RFS)
**Target Build Time:** 2.5 Hours (Optimized for a high-impact 90-second demo video)

## 1. Product Core & Architecture Overview

GrantOS turns a founder or a $15/hr junior operations generalist into a Senior Government Grant Auditor. Instead of generating generic LLM essay fluff, GrantOS acts as:

1. **A Zero-Config Grant Portal Harvester:** User inputs a government grant URL (e.g., Taiwan MOEA SBIR `https://sbir.org.tw/sbir/dw_apply` or Taipei SITI `https://www.industry-incentive.taipei/about/13`). The system crawls the page, downloads all buried official PDFs/DOCX/ODT rulebooks (`115年SBIR申請須知.pdf`, `附件C_會計科目及編列原則.pdf`, `附件D_自我檢查表.docx`, etc.), and compiles them into a deterministic JSON Rule AST with exact page/section citations.
2. **An "ESLint for Government Grants" Guardrail IDE:** Cross-checks the company's uploaded certificates and proposal draft against two guardrail layers:
   - **Layer A: Hard Disqualification & Accounting Traps (資格缺漏與附件C會計退件陷阱)** — Cross-document math & missing mandatory files.
   - **Layer B: Implicit Reviewer Conventions (審查委員潛規則與扣款雷區)** — Unwritten industry rules (e.g., "API Wrapper phrasing", "Commercial revenue in technical milestones causing clawbacks", "Paid-in capital cap violation").

---

## 2. Tech Stack & Design System (Strict Constraints)

- **Framework:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React icons, Framer Motion (for crisp 60fps transitions during the 90s video).
- **Aesthetic Direction:** Functionalist, minimalist Bauhaus / Dieter Rams industrial UI.
  - **Palette:** Monochromatic slate/zinc base (`bg-zinc-950`, `bg-zinc-900`, `border-zinc-800`, `text-zinc-100`, `font-mono` for all numbers, codes, citations, and rules).
  - **Semantic Status Accents Only:**
    - Fatal Hard Trap: `rose-500` (`bg-rose-500/10 border-rose-500/40 text-rose-400`)
    - Implicit Reviewer Convention: `amber-400` (`bg-amber-400/10 border-amber-400/40 text-amber-300`)
    - Verified / Audit-Safe: `emerald-400` (`bg-emerald-400/10 border-emerald-400/40 text-emerald-300`)
- **State Management:** Single reactive client store (`useGrantStore` via Zustand or React Context) so every "1-Click Human Verification Fix" instantaneously updates:
  1. The Pre-Review Pass Probability Meter (`24% AUTO-REJECT` -> `98% AUDIT-READY`),
  2. The inline red/amber lint highlights in the Proposal & Budget Editor,
  3. The Budget Constraint Progress Bars (`人事費 %`, `消耗性器材 %`, `補助款 vs 實收資本額`).

---

## 3. Phase-by-Phase Implementation Plan

### PHASE 1: Data Models & Pre-Cached Real Taiwan Grant Rulebooks (`src/lib/grant-data.ts`)

Create a deterministic data layer containing real 115年度 (2026) Taiwan MOEA SBIR and Taipei SITI rules so the demo runs at 60fps with zero network flakiness:

1. **Crawled Portal Manifest (`CrawledDoc[]`):**
   - `doc-1`: `115年SBIR申請須知.pdf` (64 pages, parsed 42 rules, source: `sbir.org.tw`)
   - `doc-2`: `115年附件C_會計科目及編列原則.pdf` (28 pages, parsed 38 accounting caps)
   - `doc-3`: `115年計畫書撰寫說明_暨審查重點.pdf` (19 pages, parsed 18 reviewer rubrics)
   - `doc-4`: `附件D_申請者自我檢查表.docx` (Mandatory certificates checklist)
   - `doc-5`: `臺北市SITI_115年第2梯次AI創新應用主題式研發公告.pdf` (Cap: NT$2M, Paid Internship mandate)

2. **Company Evidence Vault (`CompanyVaultDoc[]`):**
   - `comp-1`: `公司變更登記表_11510.pdf` — Extracted Metadata: `Paid-in Capital (實收資本額): NT$ 1,000,000`, `Location: Taipei City`. (Status: `VERIFIED`)
   - `comp-2`: `10月份勞保投保單位被保險人名冊.pdf` — Extracted Metadata: `Insured Headcount: 4`, `Missing: Co-founder CTO Lin not listed on roster`. (Status: `WARNING`)
   - `comp-3`: `國稅局無違章欠稅證明.pdf` — Extracted Metadata: `Issued: 2026-10-25 (<30 days)`. (Status: `VERIFIED`)
   - `comp-4`: `地方稅捐處(北市稅捐稽徵處)無欠稅證明.pdf` — Status: `MISSING_CRITICAL` (Required by `附件D §3`: Must provide BOTH National and Local tax certificates!).

3. **The 5 High-Impact Guardrail Issues (`GuardrailIssue[]`):**
   Each issue must include: `id`, `type` (`HARD_TRAP` | `IMPLICIT_RULE`), `severity` (`FATAL` | `HIGH`), `title`, `citation` (exact doc name + page + verbatim Chinese quote), `violatingTextOrNumber`, `whyRawLLMFails`, `humanMicroTaskPrompt` (the simple verification question for the $15/hr operator), `fixButtonLabel`, and `afterFixState`.

   - **Issue #1 (`HARD_TRAP` - Capital Cap Violation):**
     - *Rule Citation:* `115年SBIR申請須知 p.9 八-(二)` — `「補助款不得超過計畫總經費50%，且所申請之自籌款須小於或等於公司實收資本額（補助款 ≦ 自籌款 ≦ 實收資本額）」`
     - *Detection:* Draft requests `NT$ 1,500,000` subsidy + `NT$ 1,500,000` self-funded (`總經費 300萬`), but `變更登記表.pdf` shows Paid-in Capital is `NT$ 1,000,000`.
     - *$15/hr Micro-Task:* "Verify Paid-in Capital on `變更登記表.pdf` Box 6 is NT$1,000,000. Re-cap total budget to NT$2,000,000 (Subsidy: NT$1M / Self-funded: NT$1M) or attach Financing Attestation."
     - *1-Click Fix:* `[Cap Subsidy at NT$1.0M to Match Paid-in Capital]`

   - **Issue #2 (`HARD_TRAP` - Statutory Insurance in Personnel Budget):**
     - *Rule Citation:* `115年附件C_會計科目及編列原則 p.1` — `「正式員工之薪資，不含退休金、退職金、資遣費、勞保費、健保費等公司相對提列之項目」`
     - *Detection:* R&D Personnel row includes `NT$ 168,000` of Employer Labor/Health Insurance & 6% Pension, pushing Personnel ratio to `64.2%` (exceeding the `60%` cap).
     - *$15/
