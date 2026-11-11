export type DocType =
  | "GUIDELINES"
  | "ACCOUNTING"
  | "RUBRIC"
  | "CHECKLIST"
  | "ANNOUNCEMENT";

export interface CrawledDoc {
  id: string;
  title: string;
  filename: string;
  pages: number;
  parsedRulesCount: number;
  source: string;
  type: DocType;
  fileSize: string;
  summary: string;
}

export type VaultDocStatus = "VERIFIED" | "WARNING" | "MISSING_CRITICAL";

export interface CompanyVaultDoc {
  id: string;
  name: string;
  filename: string;
  type: "moea_capital" | "labor_roster" | "tax_national" | "tax_local" | "presentation_deck";
  status: VaultDocStatus;
  issueDate?: string;
  metadata?: {
    paidInCapital?: number;
    registeredLocation?: string;
    insuredHeadcount?: number;
    flaggedPersonnel?: string;
    isTaxClear?: boolean;
    validityDays?: number;
  };
  notes: string;
  requiredByCitation?: string;
}

export type IssueType = "HARD_TRAP" | "IMPLICIT_RULE";
export type IssueSeverity = "FATAL" | "HIGH";

export interface RuleCitation {
  docName: string;
  page: number;
  section: string;
  quote: string;
  highlightCoordinates?: { top: number; height: number }; // For visual PDF drawer simulation
}

export interface GuardrailIssue {
  id: string;
  type: IssueType;
  severity: IssueSeverity;
  category: string;
  title: string;
  citation: RuleCitation;
  violatingSnippet: string;
  locationLabel: string;
  whyRawLLMFails: string;
  humanMicroTaskPrompt: string;
  fixButtonLabel: string;
  isFixed: boolean;
  scorePenalty: number;
  fixedSnippet: string;
}

export interface BudgetItem {
  id: string;
  category: "人事費" | "消耗性器材" | "委託研究費" | "雲端運算/維護費";
  name: string;
  amount: number;
  hasViolation: boolean;
  violationMessage?: string;
}

export interface ProposalParagraph {
  id: string;
  sectionTitle: string;
  content: string;
  hasIssue: boolean;
  issueId?: string;
  highlightedText?: string;
}

export interface GrantPortalConfig {
  id: string;
  name: string;
  portalUrl: string;
  agency: string;
  maxSubsidy: number;
  crawledDocs: CrawledDoc[];
}

