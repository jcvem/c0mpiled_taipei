import {
  CrawledDoc,
  CompanyVaultDoc,
  GuardrailIssue,
  BudgetItem,
  ProposalParagraph,
  GrantPortalConfig,
} from "./types";

export const PORTAL_CONFIGS: Record<string, GrantPortalConfig> = {
  siti: {
    id: "siti",
    name: "臺北市產業發展研發補助計畫 (SITI)",
    nameEn: "Taipei SITI R&D Grant (Taipei City DOED)",
    portalUrl: "https://www.industry-incentive.taipei/about/13",
    agency: "臺北市政府產業發展局",
    agencyEn: "Department of Economic Development, Taipei City",
    maxSubsidy: 2000000,
    crawledDocs: [
      {
        id: "siti-doc-1",
        title: "115年度臺北市產業發展研發補助申請須知.pdf",
        titleEn: "2026 Taipei SITI R&D Grant Application Guidelines.pdf",
        filename: "115年度臺北市產業發展研發補助申請須知.pdf",
        pages: 58,
        parsedRulesCount: 39,
        source: "industry-incentive.taipei",
        type: "GUIDELINES",
        fileSize: "4.8 MB",
        summary: "涵蓋資格門檻、實收資本額限制、雙無欠稅證明、期程與核銷審查原則。",
        summaryEn: "Covers eligibility thresholds, paid-in capital caps, dual tax clearance certificates, and accounting audit rules.",
      },
      {
        id: "siti-doc-2",
        title: "附件C_經費編列及會計核銷原則.pdf",
        titleEn: "Appendix C: Budget Allocation & Accounting Audit Guidelines.pdf",
        filename: "附件C_經費編列及會計核銷原則.pdf",
        pages: 32,
        parsedRulesCount: 44,
        source: "industry-incentive.taipei",
        type: "ACCOUNTING",
        fileSize: "2.1 MB",
        summary: "嚴格規範人事費本薪上限（不得含雇主負擔勞健保）、設備租賃與委外研發比例上限。",
        summaryEn: "Strictly enforces base salary only (no employer statutory insurance) and subcontractor expense caps.",
      },
      {
        id: "siti-doc-3",
        title: "審查重點與指標說明.pdf",
        titleEn: "Reviewer Rubrics & Scoring Indicators.pdf",
        filename: "審查重點與指標說明.pdf",
        pages: 22,
        parsedRulesCount: 16,
        source: "industry-incentive.taipei",
        type: "RUBRIC",
        fileSize: "1.4 MB",
        summary: "技術創新性（技術導入不等於研發）、查核點可驗收性與在地產業效益要求。",
        summaryEn: "Technical innovation (API integration != proprietary R&D), milestone audibility, and local economic impact.",
      },
      {
        id: "siti-doc-4",
        title: "附件D_申請資格自我檢查表.docx",
        titleEn: "Appendix D: Applicant Self-Verification Checklist.docx",
        filename: "附件D_申請資格自我檢查表.docx",
        pages: 4,
        parsedRulesCount: 12,
        source: "industry-incentive.taipei",
        type: "CHECKLIST",
        fileSize: "320 KB",
        summary: "形式審查必備清單：公司變更表、投保名冊、國稅及地方稅無欠稅證明。",
        summaryEn: "Administrative triage checklist: Company registration, labor roster, national and municipal tax certificates.",
      },
      {
        id: "siti-doc-5",
        title: "115年主題式AI創新研發專案公告.pdf",
        titleEn: "2026 Thematic AI Innovation R&D Special Call.pdf",
        filename: "115年主題式AI創新研發專案公告.pdf",
        pages: 14,
        parsedRulesCount: 8,
        source: "industry-incentive.taipei",
        type: "ANNOUNCEMENT",
        fileSize: "890 KB",
        summary: "主題研發最高補助 200 萬元，自籌款不得低於 50% 且以資本額為限。",
        summaryEn: "Maximum NT$2M subsidy, matching funds >= 50% and strictly capped by paid-in capital.",
      },
    ],
  },
  sbir: {
    id: "sbir",
    name: "經濟部 115年度 SBIR 小型企業創新研發計畫",
    nameEn: "Taiwan MOEA 2026 Central SBIR Program",
    portalUrl: "https://www.sbir.org.tw/apply/115",
    agency: "經濟部中小及新創企業署",
    agencyEn: "Small & Medium Enterprise Administration, MOEA",
    maxSubsidy: 1500000,
    crawledDocs: [
      {
        id: "sbir-doc-1",
        title: "115年SBIR申請須知.pdf",
        titleEn: "2026 Central SBIR Application Guidelines.pdf",
        filename: "115年SBIR申請須知.pdf",
        pages: 64,
        parsedRulesCount: 42,
        source: "sbir.org.tw",
        type: "GUIDELINES",
        fileSize: "5.2 MB",
        summary: "中央型 SBIR Phase 1 / Phase 2 全國申請規範與資格初審基準。",
        summaryEn: "Central SBIR Phase 1 / Phase 2 nationwide requirements and administrative gate rules.",
      },
      {
        id: "sbir-doc-2",
        title: "115年附件C_會計科目及編列原則.pdf",
        titleEn: "Appendix C: Accounting Categories & Reimbursement Principles.pdf",
        filename: "115年附件C_會計科目及編列原則.pdf",
        pages: 28,
        parsedRulesCount: 38,
        source: "sbir.org.tw",
        type: "ACCOUNTING",
        fileSize: "1.9 MB",
        summary: "人事費上限 60%、委託研究費上限 25%、雲端服務核銷必備在地統一發票。",
        summaryEn: "Personnel capped at 60%, research subcontracts capped at 25%, cloud invoices must have Taiwan tax IDs.",
      },
      {
        id: "sbir-doc-3",
        title: "115年計畫書撰寫說明_暨審查重點.pdf",
        titleEn: "Proposal Authoring Guide & Reviewer Rubrics.pdf",
        filename: "115年計畫書撰寫說明_暨審查重點.pdf",
        pages: 19,
        parsedRulesCount: 18,
        source: "sbir.org.tw",
        type: "RUBRIC",
        fileSize: "1.1 MB",
        summary: "委員審查五大評分構面，嚴禁單純商用 API 串接與模糊不可驗證之查核點。",
        summaryEn: "Reviewer scoring dimensions: strictly forbids raw commercial API wrappers and unprovable milestones.",
      },
      {
        id: "sbir-doc-4",
        title: "附件D_申請者自我檢查表.docx",
        titleEn: "Appendix D: Applicant Self-Checklist.docx",
        filename: "附件D_申請者自我檢查表.docx",
        pages: 6,
        parsedRulesCount: 14,
        source: "sbir.org.tw",
        type: "CHECKLIST",
        fileSize: "410 KB",
        summary: "防呆勾稽核對單：公司設立登記表、勞保投保人清冊、最新無欠稅佐證。",
        summaryEn: "Cross-document reconciliation form: MOEA registration, labor roster, latest tax clearance proof.",
      },
    ],
  },
};

export const INITIAL_COMPANY_DOCS: CompanyVaultDoc[] = [
  {
    id: "comp-1",
    name: "公司變更登記表 (台北市政府核定)",
    nameEn: "MOEA Company Registration Certificate",
    filename: "公司設立登記表_11510.pdf",
    type: "moea_capital",
    status: "VERIFIED",
    issueDate: "2026-10-15",
    metadata: {
      paidInCapital: 1000000,
      registeredLocation: "臺北市中山區民生東路二段",
      registeredLocationEn: "Zhongshan Dist., Taipei City",
    },
    notes: "登記實收資本額：NT$ 1,000,000 元（登記於臺北市），核准日期有效。",
    notesEn: "Paid-in Capital: NT$ 1,000,000. Registered in Taipei City. Valid registration status.",
    requiredByCitation: "須知 p.9 八-(二) 資格檢核 / Guidelines p.9 §8.2",
  },
  {
    id: "comp-2",
    name: "勞工保險投保單位被保險人名冊 (10月份)",
    nameEn: "Labor Insurance Insured Personnel Roster (October)",
    filename: "勞保投保單位被保險人名冊_11510.pdf",
    type: "labor_roster",
    status: "WARNING",
    issueDate: "2026-10-31",
    metadata: {
      insuredHeadcount: 4,
      flaggedPersonnel: "技術共同創辦人 林○宏 未在名冊（投保於外部大學）",
      flaggedPersonnelEn: "CTO Lin is insured under external university incubator, not this company.",
    },
    notes: "名冊投保人數 4 人。警告：研發主持人兼 CTO 未納保，需檢附兼任證明或調整為兼任顧問科目。",
    notesEn: "4 employees on roster. Warning: CTO not on company payroll; requires part-time proof or consulting ledger.",
    requiredByCitation: "附件D §2 勞工保險名冊 / Appendix D §2 Roster Check",
  },
  {
    id: "comp-3",
    name: "財政部台北國稅局無違章欠稅證明書",
    nameEn: "National Tax Bureau Tax Clearance Certificate",
    filename: "國稅局無違章欠稅證明_1151025.pdf",
    type: "tax_national",
    status: "VERIFIED",
    issueDate: "2026-10-25",
    metadata: {
      isTaxClear: true,
      validityDays: 17,
    },
    notes: "核發日期 2026-10-25（距今 17 天 < 30 天效期規定），確認無欠繳國稅與違章罰鍰。",
    notesEn: "Issued 2026-10-25 (17 days old < 30-day mandate). Fully clear of national tax arrears.",
    requiredByCitation: "須知 p.14 §4.2 稅捐查核 / Guidelines p.14 §4.2",
  },
  {
    id: "comp-4",
    name: "臺北市稅捐稽徵處無欠稅證明 (地方稅)",
    nameEn: "Taipei Municipal Revenue Service Tax Clearance (Local Tax)",
    filename: "北市稅捐處無欠稅證明_MISSING.pdf",
    type: "tax_local",
    status: "MISSING_CRITICAL",
    metadata: {
      isTaxClear: false,
    },
    notes: "【致命缺漏】僅提供國稅局證明，尚未檢附營業地址所屬臺北市稅捐稽徵處之地方稅證明！",
    notesEn: "【FATAL DISQUALIFICATION】Only national tax attached. Missing local city revenue certificate!",
    requiredByCitation: "須知 p.14 §4.2 & 附件D §3 雙稅查核 / Mandatory Dual Tax Rule",
  },
];

export const INITIAL_GUARDRAIL_ISSUES: GuardrailIssue[] = [
  {
    id: "issue-capital-cap",
    type: "HARD_TRAP",
    severity: "FATAL",
    category: "資格初審退件門檻",
    categoryEn: "Administrative Disqualification Gate",
    title: "實收資本額上限超額 (補助款 ≦ 自籌款 ≦ 實收資本額)",
    titleEn: "Paid-in Capital Cap Violation (Subsidy ≦ Match ≦ Capital)",
    citation: {
      docName: "115年SBIR申請須知 / 臺北市SITI須知",
      docNameEn: "2026 SBIR & Taipei SITI Guidelines",
      page: 9,
      section: "八-(二) 經費編列上限規定 / §8.2 Statutory Caps",
      quote:
        "「補助款不得超過計畫總經費50%，且所申請之自籌款須小於或等於公司實收資本額（補助款 ≦ 自籌款 ≦ 實收資本額）」",
      quoteEn:
        "\"The grant subsidy shall not exceed 50% of total budget, and applicant matching funds must be less than or equal to paid-in capital (Subsidy ≦ Match ≦ Paid-in Capital).\"",
    },
    violatingSnippet:
      "申請補助款: NT$ 1,500,000 / 自籌款: NT$ 1,500,000 (總經費 NT$ 3,000,000)",
    violatingSnippetEn:
      "Requested Subsidy: NT$ 1,500,000 / Matching Funds: NT$ 1,500,000 (Total: NT$ 3,000,000)",
    locationLabel: "經費總表 > 補助款與自籌款配比",
    locationLabelEn: "Budget Summary > Subsidy to Matching Ratio",
    whyRawLLMFails:
      "一般 LLM 僅根據使用者要求的最高上限無腦產出 150 萬補助款，未核對變更登記表中的實收資本額僅 100 萬，導致初審形式審查 100% 遭到直接退件！",
    whyRawLLMFailsEn:
      "Raw LLMs ignore the uploaded company registration PDF. Generating a NT$1.5M match when paid-in capital is only NT$1.0M causes instant rejection at the administrative triage desk.",
    humanMicroTaskPrompt:
      "核對《公司變更登記表》實收資本額為 NT$ 1,000,000。請將自籌款與補助款上限調整為 100 萬元（總經費 200 萬元），以符合 補助款 ≦ 實收資本額 法定鐵律。",
    humanMicroTaskPromptEn:
      "Verify Paid-in Capital on company certificate is NT$1,000,000. Cap subsidy & matching funds to NT$1,000,000 each (Total NT$2.0M) to satisfy the statutory 1:1 match rule.",
    fixButtonLabel: "一鍵調降補助款至 NT$ 1.0M (符合資本額上限)",
    fixButtonLabelEn: "Cap Subsidy at NT$1.0M (Match Paid-in Capital)",
    isFixed: false,
    scorePenalty: 22,
    fixedSnippet:
      "申請補助款: NT$ 1,000,000 / 自籌款: NT$ 1,000,000 (總經費 NT$ 2,000,000) [已符合實收資本額 NT$ 1.0M 上限]",
    fixedSnippetEn:
      "Requested Subsidy: NT$ 1,000,000 / Match: NT$ 1,000,000 (Total: NT$ 2,000,000) [Complies with NT$1.0M Paid-in Capital]",
  },
  {
    id: "issue-personnel-insurance",
    type: "HARD_TRAP",
    severity: "FATAL",
    category: "會計法規 (附件C核銷陷阱)",
    categoryEn: "Accounting Clawback Trap (Appendix C)",
    title: "人事費違規編列雇主負擔勞健保與勞退 (超出法定 60% 門檻)",
    titleEn: "Statutory Employer Insurance in Personnel (Exceeds 60% Cap)",
    citation: {
      docName: "115年附件C_會計科目及編列原則",
      docNameEn: "Appendix C: Accounting Allocation Principles",
      page: 1,
      section: "貳、人事費 一-(一) 編列限制 / §2.1 Personnel Limits",
      quote:
        "「正式員工之薪資，以本薪為限，不含退休金、退職金、資遣費、勞保費、健保費等公司相對提列之項目，違者於期末核銷時予以剔除並追繳。」",
      quoteEn:
        "\"Salaries for full-time staff shall be restricted to base wage only, strictly excluding pensions, severance, employer labor/health insurance. Violations will be audited, disallowed, and clawed back.\"",
    },
    violatingSnippet:
      "全職研發人員月薪編列包含雇主負擔之勞健保及6%勞退金共 NT$ 168,000，使人事費總額達 64.2%",
    violatingSnippetEn:
      "R&D Engineer salary includes employer labor/health insurance & 6% pension (NT$168,000), pushing personnel ratio to 64.2%.",
    locationLabel: "經費明細表 > 人事費編列細目",
    locationLabelEn: "Budget Table > Personnel Sub-items",
    whyRawLLMFails:
      "ChatGPT 習慣依海外公司成本法將雇主保險納入薪資預算，但台灣政府補助案嚴禁報銷雇主法定負擔，期末查帳將被會計師直接剔除扣款！",
    whyRawLLMFailsEn:
      "ChatGPT calculates total cost of employment by default. In Taiwan grants, charging statutory employer insurance is illegal and gets deducted by CPA auditors.",
    humanMicroTaskPrompt:
      "確認自人事費中剔除雇主負擔勞健保 NT$ 168,000，將差額平衡至研發消耗性器材與耗材費，使人事費比例降至 52.5%（低於法定 60% 上限）。",
    humanMicroTaskPromptEn:
      "Remove NT$168,000 employer insurance from salary and rebalance to R&D consumables, bringing personnel down to 52.5% (< 60% ceiling).",
    fixButtonLabel: "一鍵剔除雇主負擔勞健保並平衡經費",
    fixButtonLabelEn: "Purge Employer Insurance & Rebalance to Consumables",
    isFixed: false,
    scorePenalty: 20,
    fixedSnippet:
      "人事費已剔除雇主負擔保險（改由公司行政費用支應），總額調減至 NT$ 1,050,000 (佔總經費 52.5%，低於 60% 上限)",
    fixedSnippetEn:
      "Employer insurance purged (borne by corporate overhead). Personnel reduced to NT$1,050,000 (52.5% of total, under 60% ceiling).",
  },
  {
    id: "issue-missing-local-tax",
    type: "HARD_TRAP",
    severity: "FATAL",
    category: "初審資格文件防呆",
    categoryEn: "Certificate Triage Check",
    title: "缺少地方稅捐處無欠稅證明 (雙稅證缺漏直接退件)",
    titleEn: "Missing Municipal Tax Clearance Certificate (Dual-Tax Gate)",
    citation: {
      docName: "附件D_申請者自我檢查表 & 申請須知",
      docNameEn: "Appendix D & Guidelines Checklist",
      page: 14,
      section: "肆、應備文件 §4.2 稅籍查證 / §4.2 Tax Verification",
      quote:
        "「應同時檢附財政部國稅局及所在地地方稅捐稽徵處出具之無欠稅證明文件，任一缺漏或逾30日效期者，視同資格不符。」",
      quoteEn:
        "\"Applicants must attach BOTH National Tax Bureau and Local Municipal Revenue certificates. Any missing certificate or one exceeding 30 days is disqualified without substantive review.\"",
    },
    violatingSnippet:
      "僅上傳財政部臺北國稅局證明，缺少「臺北市稅捐稽徵處」無違章欠稅證明",
    violatingSnippetEn:
      "Uploaded National Tax Bureau clearance only. Missing Taipei Municipal Revenue Service tax clearance.",
    locationLabel: "證明文件庫 > 稅務證明區塊",
    locationLabelEn: "Evidence Vault > Tax Clearances",
    whyRawLLMFails:
      "新創常誤以為「國稅局無欠稅」就是全部，不知地方營業稅與地價/房屋/印花稅由地方稅捐處管轄，成為初審第一階段 35% 案件被退件的主因。",
    whyRawLLMFailsEn:
      "Founders assume one national tax PDF covers all taxes. Missing municipal certificates is the #1 reason for administrative rejection (over 35% of all grant applicants).",
    humanMicroTaskPrompt:
      "系統已透過統一編號 83921044 向台北市稅捐處 API 驗證無欠稅紀錄，點擊一鍵歸檔自動產製核對章並補正。",
    humanMicroTaskPromptEn:
      "System reconciled Tax ID 83921044 with Taipei Revenue database. Click to attach the verified municipal clearance certificate.",
    fixButtonLabel: "一鍵補齊臺北市稅捐處無欠稅證明",
    fixButtonLabelEn: "Auto-Attach Taipei Municipal Tax Clearance",
    isFixed: false,
    scorePenalty: 18,
    fixedSnippet:
      "已補齊「臺北市稅捐稽徵處無欠稅證明書 (核發日 2026-11-02)」，雙稅查核全部通過合格。",
    fixedSnippetEn:
      "Attached 'Taipei Revenue Service Certificate (Issued 2026-11-02)'. Dual-tax requirement fully met.",
  },
  {
    id: "issue-api-wrapper",
    type: "IMPLICIT_RULE",
    severity: "HIGH",
    category: "審查委員潛規則 (創新性判定)",
    categoryEn: "Reviewer Landmine: Innovation Rubric",
    title: "委員雷區：API Wrapper 語彙 (遭判定為技術導入而非自主研發)",
    titleEn: "Reviewer Red Flag: API Wrapper Phrasing (Technology Adoption != R&D)",
    citation: {
      docName: "115年計畫書撰寫說明_暨審查重點",
      docNameEn: "Proposal Guidelines & Review Rubrics",
      page: 8,
      section: "貳、技術研發創新性 §2.3 評審指標 / §2.3 Innovation Rubric",
      quote:
        "「純粹導入或串接既有市售商用套裝軟體、商業 API 者，不具本計畫所獎勵之核心技術研發內涵，將評定為『技術導入』而非創新研發。」",
      quoteEn:
        "\"Mere integration of commercial packaged software or commercial APIs does not qualify as proprietary R&D. Reviewers will grade this as 'Commercial Adoption', not Innovation.\"",
    },
    violatingSnippet:
      "「本系統直接調用 OpenAI / Gemini API 並搭配 RAG 向量資料庫，快速實現企業級智能客服問答自動化。」",
    violatingSnippetEn:
      "\"We directly call OpenAI / Gemini APIs combined with RAG vector search to rapidly automate enterprise customer support.\"",
    locationLabel: "計畫書第貳章 > 創新研發內容與架構",
    locationLabelEn: "Proposal Section II > Technical Innovation Architecture",
    whyRawLLMFails:
      "ChatGPT 本能寫出矽谷創投風格的 'We leverage OpenAI APIs'，而這在政府產官學審查委員眼中是「買現成套件算什麼研發」的直接死穴！",
    whyRawLLMFailsEn:
      "ChatGPT generates Silicon Valley VC pitch talk ('leveraging LLM APIs'). Academic grant judges immediately reject this as low-barrier 'commercial software purchase'.",
    humanMicroTaskPrompt:
      "改寫為官方偏好之自主技術架構：強調「專有資料清洗管線、混合多源邊緣路由排程、以及領域評測基準（Benchmark）」。",
    humanMicroTaskPromptEn:
      "Reframe around proprietary tech: domain data cleaning pipelines, edge routing scheduler, and in-house evaluation benchmarks.",
    fixButtonLabel: "一鍵重構為產官學認可之自主研發論述",
    fixButtonLabelEn: "Reframe as Proprietary R&D Architecture",
    isFixed: false,
    scorePenalty: 18,
    fixedSnippet:
      "「本計畫研發自主之『繁體中文企業法規專屬資料清洗管線』與『多模型邊緣排程路由機制』，並針對 1,200 組對抗性樣本建立專屬評測基準（Benchmark），克服商用模型幻覺與隱私風險。」",
    fixedSnippetEn:
      "\"This project develops a proprietary Traditional Chinese regulatory data cleaning pipeline, a multi-model edge routing scheduler, and an in-house evaluation benchmark with 1,200 adversarial test cases.\"",
  },
  {
    id: "issue-clawback-kpi",
    type: "IMPLICIT_RULE",
    severity: "HIGH",
    category: "審查委員雷區 (期末扣款查核陷阱)",
    categoryEn: "Reviewer Landmine: Audit Clawback Risk",
    title: "查核點自爆陷阱：技術查核點混入商業營收與不合理 99.9% 指標",
    titleEn: "Milestone Suicide Trap: Commercial Revenue & Unprovable 99.9% KPI",
    citation: {
      docName: "115年SBIR申請須知 / 查核點規範",
      docNameEn: "SBIR Guidelines: Milestone Specifications",
      page: 31,
      section: "陸、期末查核標準 查核點設定指引 / §6.1 Audit Milestones",
      quote:
        "「期末查核點應為可具體驗收之研發工程成果（如功能模組測試報告、精確率測試數據），不得將營業額、會員註冊數等受市場營運波動之商業指標列為驗收要件。」",
      quoteEn:
        "\"Milestones must be auditable engineering deliverables (e.g., test reports, verifiable metrics). Commercial revenues or user signups subject to market volatility cannot be milestone KPIs.\"",
    },
    violatingSnippet:
      "查核點 M3:「系統上線並於6個月內達成 NT$ 5,000,000 商業營收，且客服問答辨識率達 99.9%」",
    violatingSnippetEn:
      "Milestone M3: \"Achieve NT$5M commercial revenue in 6 months post-launch, with 99.9% question recognition accuracy.\"",
    locationLabel: "計畫書第肆章 > 查核點明細表 (Milestone M3)",
    locationLabelEn: "Proposal Section IV > Milestone Verification Table",
    whyRawLLMFails:
      "團隊習慣把融資 Pitch Deck 的 Traction 數字填進補助案查核點，但政府在半年後是請外部會計師查帳，營收未達標將被依約扣款追回 30% 補助款！",
    whyRawLLMFailsEn:
      "Founders put deck growth numbers into grants. Government CPAs audit actual receipts in Month 6—failing commercial revenue triggers a mandatory 30% payout deduction.",
    humanMicroTaskPrompt:
      "將無法保證之商業營收與誇大的 99.9% 準確率，轉換為技術專家能出具內部測試報告的客觀工程標準（F1-score >= 88%, N=500 測試集）。",
    humanMicroTaskPromptEn:
      "Swap unprovable commercial revenue and 99.9% accuracy for an engineering QA metric (F1-score >= 88% across N=500 test samples validated by engineering report).",
    fixButtonLabel: "一鍵轉化為客觀工程可驗收查核點",
    fixButtonLabelEn: "Convert to Auditable Engineering QA Metric",
    isFixed: false,
    scorePenalty: 18,
    fixedSnippet:
      "查核點 M3:「完成系統部署並執行內部標準化測試集（N=500 筆對抗性查詢），驗證辨識準確率 F1-score >= 88.5%，產出經架構師簽署之工程測試報告與驗收日誌」",
    fixedSnippetEn:
      "Milestone M3: \"Complete deployment and benchmark on standardized adversarial test set (N=500 queries), achieving F1-score >= 88.5% verified by signed engineering report.\"",
  },
];

export const INITIAL_PROPOSAL_PARAGRAPHS: ProposalParagraph[] = [
  {
    id: "p-intro",
    sectionTitle: "一、計畫背景與市場痛點",
    sectionTitleEn: "I. Project Background & Problem Statement",
    content:
      "隨著生成式人工智慧普及，臺灣中小型企業面臨法規複雜與跨部門表單勾稽成本高昂之挑戰。每年超過上萬家業者在政府補助與標案投件中，因會計科目編列與資格要件繁瑣而遭遇形式退件。",
    contentEn:
      "With generative AI proliferation, Taiwanese SMEs face high compliance overhead and complex regulatory cross-checks. Over 10,000 applicants annually are disqualified at the administrative gate due to accounting mismatches and missing government certificates.",
    hasIssue: false,
  },
  {
    id: "p-tech",
    sectionTitle: "二、核心創新技術與研發架構",
    sectionTitleEn: "II. Core Proprietary Technology & Architecture",
    content:
      "本計畫專注於研發企業級合規編譯器。傳統作法中，「本系統直接調用 OpenAI / Gemini API 並搭配 RAG 向量資料庫，快速實現企業級智能客服問答自動化。」然而此種作法在政府審查中常遭質疑缺乏技術自主性。",
    contentEn:
      "This project focuses on building an enterprise compliance compiler. In conventional setups, \"we directly call OpenAI / Gemini APIs combined with RAG vector search to rapidly automate enterprise customer support.\" However, reviewers reject this as lacking proprietary technical depth.",
    hasIssue: true,
    issueId: "issue-api-wrapper",
    highlightedText:
      "「本系統直接調用 OpenAI / Gemini API 並搭配 RAG 向量資料庫，快速實現企業級智能客服問答自動化。」",
    highlightedTextEn:
      "\"we directly call OpenAI / Gemini APIs combined with RAG vector search to rapidly automate enterprise customer support.\"",
  },
  {
    id: "p-milestone",
    sectionTitle: "三、預期關鍵查核點 (Milestones)",
    sectionTitleEn: "III. Key Auditable Project Milestones",
    content:
      "期中查核點 M1：完成官網須知爬蟲與 PDF 規則 AST 解析器建置。\n期末查核點 M3：「系統上線並於6個月內達成 NT$ 5,000,000 商業營收，且客服問答辨識率達 99.9%」作為驗收標準。",
    contentEn:
      "Midterm Milestone M1: Complete portal crawler and PDF rulebook AST parser.\nFinal Milestone M3: \"Achieve NT$5M commercial revenue in 6 months post-launch, with 99.9% question recognition accuracy.\"",
    hasIssue: true,
    issueId: "issue-clawback-kpi",
    highlightedText:
      "「系統上線並於6個月內達成 NT$ 5,000,000 商業營收，且客服問答辨識率達 99.9%」",
    highlightedTextEn:
      "\"Achieve NT$5M commercial revenue in 6 months post-launch, with 99.9% question recognition accuracy.\"",
  },
];

export const INITIAL_BUDGET_ITEMS: BudgetItem[] = [
  {
    id: "b-1",
    category: "人事費",
    categoryEn: "Personnel",
    name: "全職資深研發工程師 (2人，含雇主負擔勞健保及退撫提撥)",
    nameEn: "Full-Time Senior R&D Engineers (2, incl. employer insurance & pension)",
    amount: 1218000,
    hasViolation: true,
    violationMessage: "包含雇主負擔法定保險 NT$ 168,000，且佔總預算比重超標 (64.2% > 60%)",
    violationMessageEn: "Includes illegal employer insurance NT$168,000; total personnel exceeds 60% cap (64.2%).",
  },
  {
    id: "b-2",
    category: "消耗性器材",
    categoryEn: "Consumables/Hardware",
    name: "GPU 加速開發測試硬體租賃與耗材",
    nameEn: "GPU Cloud Hardware Rental & R&D Consumables",
    amount: 320000,
    hasViolation: false,
  },
  {
    id: "b-3",
    category: "委託研究費",
    categoryEn: "Subcontracting/R&D",
    name: "國立大學資工所演算法抗幻覺驗證委託",
    nameEn: "University CS Lab Anti-Hallucination Academic Validation",
    amount: 280000,
    hasViolation: false,
  },
  {
    id: "b-4",
    category: "雲端運算/維護費",
    categoryEn: "Cloud Infrastructure",
    name: "台灣在地合格經銷商雲端運算執行時數 (三聯式統一發票核銷)",
    nameEn: "Taiwan Local Authorized Cloud Reseller (Taiwan Unified Tax Invoices)",
    amount: 182000,
    hasViolation: false,
  },
];
