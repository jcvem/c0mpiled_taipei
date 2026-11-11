import { create } from "zustand";
import {
  CrawledDoc,
  CompanyVaultDoc,
  GuardrailIssue,
  BudgetItem,
  ProposalParagraph,
  AppLanguage,
} from "./types";
import {
  PORTAL_CONFIGS,
  INITIAL_COMPANY_DOCS,
  INITIAL_GUARDRAIL_ISSUES,
  INITIAL_PROPOSAL_PARAGRAPHS,
  INITIAL_BUDGET_ITEMS,
} from "./grant-data";

interface GrantStore {
  // Language & Theme state
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;

  // Portal Harvester state
  portalUrl: string;
  selectedPortalKey: string;
  isHarvesting: boolean;
  harvestProgress: number;
  harvestLogs: { zh: string; en: string }[];
  hasHarvested: boolean;
  crawledDocs: CrawledDoc[];

  // 3-Pane IDE state
  companyDocs: CompanyVaultDoc[];
  guardrailIssues: GuardrailIssue[];
  budgetItems: BudgetItem[];
  proposalParagraphs: ProposalParagraph[];
  activeEditorTab: "proposal" | "budget";
  issueFilter: "ALL" | "HARD_TRAP" | "IMPLICIT_RULE";
  selectedIssueId: string | null;
  activePdfCitationIssue: GuardrailIssue | null;

  // Computed state
  passProbability: number;
  unresolvedCount: number;
  fatalTrapsCount: number;
  implicitWarningsCount: number;

  // Actions
  setPortalUrl: (url: string) => void;
  selectPortalPreset: (key: string) => void;
  runHarvester: () => Promise<void>;
  setActiveEditorTab: (tab: "proposal" | "budget") => void;
  setIssueFilter: (filter: "ALL" | "HARD_TRAP" | "IMPLICIT_RULE") => void;
  selectIssue: (id: string | null) => void;
  openPdfCitation: (issue: GuardrailIssue) => void;
  closePdfCitation: () => void;
  applyFix: (issueId: string) => void;
  applyAllFixes: () => void;
  resetAll: () => void;
}

function calculateScore(issues: GuardrailIssue[]): number {
  let score = 98;
  for (const issue of issues) {
    if (!issue.isFixed) {
      score -= issue.scorePenalty;
    }
  }
  return Math.max(18, score);
}

export const useGrantStore = create<GrantStore>((set, get) => ({
  language: "bilingual", // Default to bilingual so both TW and EN users thrive
  setLanguage: (lang) => set({ language: lang }),

  portalUrl: PORTAL_CONFIGS.siti.portalUrl,
  selectedPortalKey: "siti",
  isHarvesting: false,
  harvestProgress: 0,
  harvestLogs: [],
  hasHarvested: true,
  crawledDocs: PORTAL_CONFIGS.siti.crawledDocs,

  companyDocs: INITIAL_COMPANY_DOCS,
  guardrailIssues: INITIAL_GUARDRAIL_ISSUES,
  budgetItems: INITIAL_BUDGET_ITEMS,
  proposalParagraphs: INITIAL_PROPOSAL_PARAGRAPHS,
  activeEditorTab: "proposal",
  issueFilter: "ALL",
  selectedIssueId: "issue-api-wrapper",
  activePdfCitationIssue: null,

  passProbability: calculateScore(INITIAL_GUARDRAIL_ISSUES),
  unresolvedCount: INITIAL_GUARDRAIL_ISSUES.filter((i) => !i.isFixed).length,
  fatalTrapsCount: INITIAL_GUARDRAIL_ISSUES.filter(
    (i) => !i.isFixed && i.type === "HARD_TRAP"
  ).length,
  implicitWarningsCount: INITIAL_GUARDRAIL_ISSUES.filter(
    (i) => !i.isFixed && i.type === "IMPLICIT_RULE"
  ).length,

  setPortalUrl: (url: string) => set({ portalUrl: url }),

  selectPortalPreset: (key: string) => {
    const config = PORTAL_CONFIGS[key] || PORTAL_CONFIGS.siti;
    set({
      selectedPortalKey: key,
      portalUrl: config.portalUrl,
      crawledDocs: config.crawledDocs,
    });
  },

  runHarvester: async () => {
    set({
      isHarvesting: true,
      harvestProgress: 5,
      harvestLogs: [
        {
          zh: "🚀 正在連線至政府補助入口網...",
          en: "Connecting to official government grant portal...",
        },
      ],
    });

    const steps = [
      {
        progress: 25,
        zh: "🕷️ 遞迴偵測並下載官方附件（PDF / DOCX / ODT）5 件...",
        en: "Recursively discovering and downloading 5 official PDF / DOCX packages...",
      },
      {
        progress: 50,
        zh: "⚙️ 解析《115年附件C_會計科目及編列原則》法定硬限制...",
        en: "Extracting deterministic statutory caps from Appendix C (Accounting Guidelines)...",
      },
      {
        progress: 75,
        zh: "🧠 編譯《審查重點說明》委員潛規則語彙與自爆查核點 AST...",
        en: "Compiling unwritten reviewer rubrics and milestone clawback rules into AST...",
      },
      {
        progress: 95,
        zh: "📎 完成雙向錨定：全數規則已超連結至官方 PDF 頁碼...",
        en: "Bi-directional anchoring complete: All linter rules hyperlinked to page citations...",
      },
      {
        progress: 100,
        zh: "✨ 規則編譯完成！已即時掛載至 GrantOS 護欄防護網。",
        en: "Rule compilation complete. Live guardrail engine active.",
      },
    ];

    for (const step of steps) {
      await new Promise((res) => setTimeout(res, 450));
      set((state) => ({
        harvestProgress: step.progress,
        harvestLogs: [
          ...state.harvestLogs,
          { zh: step.zh, en: step.en },
        ],
      }));
    }

    set({ isHarvesting: false, hasHarvested: true });
  },

  setActiveEditorTab: (tab) => set({ activeEditorTab: tab }),

  setIssueFilter: (filter) => set({ issueFilter: filter }),

  selectIssue: (id) => set({ selectedIssueId: id }),

  openPdfCitation: (issue) => set({ activePdfCitationIssue: issue }),

  closePdfCitation: () => set({ activePdfCitationIssue: null }),

  applyFix: (issueId: string) => {
    const state = get();
    const updatedIssues = state.guardrailIssues.map((issue) => {
      if (issue.id === issueId) {
        return { ...issue, isFixed: true };
      }
      return issue;
    });

    let updatedParagraphs = [...state.proposalParagraphs];
    let updatedBudget = [...state.budgetItems];
    let updatedCompanyDocs = [...state.companyDocs];

    if (issueId === "issue-api-wrapper") {
      updatedParagraphs = updatedParagraphs.map((p) => {
        if (p.issueId === "issue-api-wrapper") {
          return {
            ...p,
            content:
              "本計畫專注於研發企業級合規編譯器。「本計畫研發自主之『繁體中文企業法規專屬資料清洗管線』與『多模型邊緣排程路由機制』，並針對 1,200 組對抗性樣本建立專屬評測基準（Benchmark），克服商用模型幻覺與隱私風險。」核心技術自主可控。",
            contentEn:
              "This project develops an enterprise compliance compiler. \"This project develops a proprietary Traditional Chinese regulatory data cleaning pipeline, a multi-model edge routing scheduler, and an in-house evaluation benchmark with 1,200 adversarial test cases.\" Core IP remains fully in-house.",
            hasIssue: false,
          };
        }
        return p;
      });
    }

    if (issueId === "issue-clawback-kpi") {
      updatedParagraphs = updatedParagraphs.map((p) => {
        if (p.issueId === "issue-clawback-kpi") {
          return {
            ...p,
            content:
              "期中查核點 M1：完成官網須知爬蟲與 PDF 規則 AST 解析器建置。\n期末查核點 M3：「完成系統部署並執行內部標準化測試集（N=500 筆對抗性查詢），驗證辨識準確率 F1-score >= 88.5%，產出經架構師簽署之工程測試報告與驗收日誌」作為驗收標準。",
            contentEn:
              "Midterm Milestone M1: Complete portal crawler and PDF rulebook AST parser.\nFinal Milestone M3: \"Complete deployment and benchmark on standardized adversarial test set (N=500 queries), achieving F1-score >= 88.5% verified by signed engineering report.\"",
            hasIssue: false,
          };
        }
        return p;
      });
    }

    if (issueId === "issue-personnel-insurance") {
      updatedBudget = updatedBudget.map((b) => {
        if (b.category === "人事費") {
          return {
            ...b,
            name: "全職資深研發工程師 (2人，依法僅列本薪，排除雇主法定負擔)",
            nameEn: "Full-Time Senior R&D Engineers (2, Base Salary Only, Excl. Employer Insurance)",
            amount: 1050000,
            hasViolation: false,
            violationMessage: undefined,
            violationMessageEn: undefined,
          };
        }
        if (b.category === "消耗性器材") {
          return {
            ...b,
            amount: 488000,
          };
        }
        return b;
      });
    }

    if (issueId === "issue-missing-local-tax") {
      updatedCompanyDocs = updatedCompanyDocs.map((doc) => {
        if (doc.type === "tax_local") {
          return {
            ...doc,
            status: "VERIFIED" as const,
            filename: "臺北市稅捐稽徵處無欠稅證明_1151102.pdf",
            issueDate: "2026-11-02",
            metadata: { isTaxClear: true, validityDays: 9 },
            notes: "【已補齊】臺北市稅捐稽徵處無違章欠稅核發證明，效期有效，雙稅查核全部合規！",
            notesEn: "【ATTACHED】Taipei Municipal Revenue Tax Clearance verified. Valid. Dual-tax compliance 100%.",
          };
        }
        return doc;
      });
    }

    const newScore = calculateScore(updatedIssues);
    const newUnresolved = updatedIssues.filter((i) => !i.isFixed).length;
    const newFatal = updatedIssues.filter(
      (i) => !i.isFixed && i.type === "HARD_TRAP"
    ).length;
    const newImplicit = updatedIssues.filter(
      (i) => !i.isFixed && i.type === "IMPLICIT_RULE"
    ).length;

    set({
      guardrailIssues: updatedIssues,
      proposalParagraphs: updatedParagraphs,
      budgetItems: updatedBudget,
      companyDocs: updatedCompanyDocs,
      passProbability: newScore,
      unresolvedCount: newUnresolved,
      fatalTrapsCount: newFatal,
      implicitWarningsCount: newImplicit,
    });
  },

  applyAllFixes: () => {
    const issues = get().guardrailIssues;
    for (const issue of issues) {
      if (!issue.isFixed) {
        get().applyFix(issue.id);
      }
    }
  },

  resetAll: () => {
    set({
      guardrailIssues: INITIAL_GUARDRAIL_ISSUES,
      proposalParagraphs: INITIAL_PROPOSAL_PARAGRAPHS,
      budgetItems: INITIAL_BUDGET_ITEMS,
      companyDocs: INITIAL_COMPANY_DOCS,
      passProbability: calculateScore(INITIAL_GUARDRAIL_ISSUES),
      unresolvedCount: INITIAL_GUARDRAIL_ISSUES.length,
      fatalTrapsCount: INITIAL_GUARDRAIL_ISSUES.filter(
        (i) => i.type === "HARD_TRAP"
      ).length,
      implicitWarningsCount: INITIAL_GUARDRAIL_ISSUES.filter(
        (i) => i.type === "IMPLICIT_RULE"
      ).length,
      selectedIssueId: "issue-api-wrapper",
      activePdfCitationIssue: null,
    });
  },
}));
