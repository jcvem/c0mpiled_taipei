export type DocType =
  | "GUIDELINES"
  | "ACCOUNTING"
  | "RUBRIC"
  | "CHECKLIST"
  | "ANNOUNCEMENT";

export interface CrawledDoc {
  id: string;
  title: string;
  titleEn: string;
  filename: string;
  pages: number;
  parsedRulesCount: number;
  source: string;
  type: DocType;
  fileSize: string;
  summary: string;
  summaryEn: string;
  downloadUrl?: string;
}

export type VaultDocStatus = "VERIFIED" | "WARNING" | "MISSING_CRITICAL";

export interface CompanyVaultDoc {
  id: string;
  name: string;
  nameEn: string;
  filename: string;
  type: "moea_capital" | "labor_roster" | "tax_national" | "tax_local" | "presentation_deck";
  status: VaultDocStatus;
  issueDate?: string;
  metadata?: {
    paidInCapital?: number;
    registeredLocation?: string;
    registeredLocationEn?: string;
    insuredHeadcount?: number;
    flaggedPersonnel?: string;
    flaggedPersonnelEn?: string;
    isTaxClear?: boolean;
    validityDays?: number;
  };
  notes: string;
  notesEn: string;
  requiredByCitation?: string;
  downloadUrl?: string;
}

export type IssueType = "HARD_TRAP" | "IMPLICIT_RULE";
export type IssueSeverity = "FATAL" | "HIGH";

export interface RuleCitation {
  docName: string;
  docNameEn: string;
  page: number;
  section: string;
  quote: string;
  quoteEn: string;
  realDocUrl?: string;
}

export interface GuardrailIssue {
  id: string;
  type: IssueType;
  severity: IssueSeverity;
  category: string;
  categoryEn: string;
  title: string;
  titleEn: string;
  citation: RuleCitation;
  violatingSnippet: string;
  violatingSnippetEn: string;
  locationLabel: string;
  locationLabelEn: string;
  whyRawLLMFails: string;
  whyRawLLMFailsEn: string;
  humanMicroTaskPrompt: string;
  humanMicroTaskPromptEn: string;
  fixButtonLabel: string;
  fixButtonLabelEn: string;
  isFixed: boolean;
  scorePenalty: number;
  fixedSnippet: string;
  fixedSnippetEn: string;
}

export interface BudgetItem {
  id: string;
  category: "人事費" | "消耗性器材" | "委託研究費" | "雲端運算/維護費";
  categoryEn: "Personnel" | "Consumables/Hardware" | "Subcontracting/R&D" | "Cloud Infrastructure";
  name: string;
  nameEn: string;
  amount: number;
  hasViolation: boolean;
  violationMessage?: string;
  violationMessageEn?: string;
}

export interface ProposalParagraph {
  id: string;
  sectionTitle: string;
  sectionTitleEn: string;
  content: string;
  contentEn: string;
  hasIssue: boolean;
  issueId?: string;
  highlightedText?: string;
  highlightedTextEn?: string;
}

export interface GrantPortalConfig {
  id: string;
  name: string;
  nameEn: string;
  portalUrl: string;
  agency: string;
  agencyEn: string;
  maxSubsidy: number;
  crawledDocs: CrawledDoc[];
}

export type AppLanguage = "bilingual" | "zh" | "en";
export type MobileActivePane = "vault" | "editor" | "copilot";
