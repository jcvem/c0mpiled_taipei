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
    portalUrl: "https://www.industry-incentive.taipei/about/13",
    agency: "臺北市政府產業發展局",
    maxSubsidy: 2000000,
    crawledDocs: [
      {
        id: "siti-doc-1",
        title: "115年度臺北市產業發展研發補助申請須知.pdf",
        filename: "115年度臺北市產業發展研發補助申請須知.pdf",
        pages: 58,
        parsedRulesCount: 39,
        source: "industry-incentive.taipei",
        type: "GUIDELINES",
        fileSize: "4.8 MB",
        summary: "涵蓋資格門檻、實收資本額限制、雙無欠稅證明、期程與核銷審查原則。",
      },
      {
        id: "siti-doc-2",
        title: "附件C_經費編列及會計核銷原則.pdf",
        filename: "附件C_經費編列及會計核銷原則.pdf",
        pages: 32,
        parsedRulesCount: 44,
        source: "industry-incentive.taipei",
        type: "ACCOUNTING",
        fileSize: "2.1 MB",
        summary: "嚴格規範人事費本薪上限（不得含雇主負擔勞健保）、設備租賃與委外研發比例上限。",
      },
      {
        id: "siti-doc-3",
        title: "審查重點與指標說明.pdf",
        filename: "審查重點與指標說明.pdf",
        pages: 22,
        parsedRulesCount: 16,
        source: "industry-incentive.taipei",
        type: "RUBRIC",
        fileSize: "1.4 MB",
        summary: "技術創新性（技術導入不等於研發）、查核點可驗收性與在地產業效益要求。",
      },
      {
        id: "siti-doc-4",
        title: "附件D_申請資格自我檢查表.docx",
        filename: "附件D_申請資格自我檢查表.docx",
        pages: 4,
        parsedRulesCount: 12,
        source: "industry-incentive.taipei",
        type: "CHECKLIST",
        fileSize: "320 KB",
        summary: "形式審查必備清單：公司變更表、投保名冊、國稅及地方稅無欠稅證明。",
      },
      {
        id: "siti-doc-5",
        title: "115年主題式AI創新研發專案公告.pdf",
        filename: "115年主題式AI創新研發專案公告.pdf",
        pages: 14,
        parsedRulesCount: 8,
        source: "industry-incentive.taipei",
        type: "ANNOUNCEMENT",
        fileSize: "890 KB",
        summary: "主題研發最高補助 200 萬元，自籌款不得低於 50% 且以資本額為限。",
      },
    ],
  },
  sbir: {
    id: "sbir",
    name: "經濟部 115年度 SBIR 小型企業創新研發計畫",
    portalUrl: "https://www.sbir.org.tw/apply/115",
    agency: "經濟部中小及新創企業署",
    maxSubsidy: 1500000,
    crawledDocs: [
      {
        id: "sbir-doc-1",
        title: "115年SBIR申請須知.pdf",
        filename: "115年SBIR申請須知.pdf",
        pages: 64,
        parsedRulesCount: 42,
        source: "sbir.org.tw",
        type: "GUIDELINES",
        fileSize: "5.2 MB",
        summary: "中央型 SBIR Phase 1 / Phase 2 全國申請規範與資格初審基準。",
      },
      {
        id: "sbir-doc-2",
        title: "115年附件C_會計科目及編列原則.pdf",
        filename: "115年附件C_會計科目及編列原則.pdf",
        pages: 28,
        parsedRulesCount: 38,
        source: "sbir.org.tw",
        type: "ACCOUNTING",
        fileSize: "1.9 MB",
        summary: "人事費上限 60%、委託研究費上限 25%、雲端服務核銷必備二/三聯式在地發票。",
      },
      {
        id: "sbir-doc-3",
        title: "115年計畫書撰寫說明_暨審查重點.pdf",
        filename: "115年計畫書撰寫說明_暨審查重點.pdf",
        pages: 19,
        parsedRulesCount: 18,
        source: "sbir.org.tw",
        type: "RUBRIC",
        fileSize: "1.1 MB",
        summary: "委員審查五大評分構面，嚴禁單純商用 API 串接與模糊不可驗證之查核點。",
      },
      {
        id: "sbir-doc-4",
        title: "附件D_申請者自我檢查表.docx",
        filename: "附件D_申請者自我檢查表.docx",
        pages: 6,
        parsedRulesCount: 14,
        source: "sbir.org.tw",
        type: "CHECKLIST",
        fileSize: "410 KB",
        summary: "防呆勾稽核對單：公司設立登記表、勞保投保人清冊、最新無欠稅佐證。",
      },
    ],
  },
};

export const INITIAL_COMPANY_DOCS: CompanyVaultDoc[] = [
  {
    id: "comp-1",
    name: "公司變更登記表 (台北市政府發函)",
    filename: "公司設立登記表_11510.pdf",
    type: "moea_capital",
    status: "VERIFIED",
    issueDate: "2026-10-15",
    metadata: {
      paidInCapital: 1000000,
      registeredLocation: "臺北市中山區民生東路二段",
    },
    notes: "登記實收資本額：NT$ 1,000,000 元（登記於臺北市），核准日期有效。",
    requiredByCitation: "須知 p.9 八-(二) 資格檢核",
  },
  {
    id: "comp-2",
    name: "勞工保險投保單位被保險人名冊 (10月份)",
    filename: "勞保投保單位被保險人名冊_11510.pdf",
    type: "labor_roster",
    status: "WARNING",
    issueDate: "2026-10-31",
    metadata: {
      insuredHeadcount: 4,
      flaggedPersonnel: "技術共同創辦人 林○宏 未在投保名冊內（勞保投保於外部大學育成中心）",
    },
    notes: "名冊投保人數 4 人。警告：研發主持人兼 CTO 未納保，需檢附兼任證明或調整為兼任顧問科目。",
    requiredByCitation: "附件D §2 勞工保險加保名冊",
  },
  {
    id: "comp-3",
    name: "財政部台北國稅局無欠稅證明書",
    filename: "國稅局無違章欠稅證明_1151025.pdf",
    type: "tax_national",
    status: "VERIFIED",
    issueDate: "2026-10-25",
    metadata: {
      isTaxClear: true,
      validityDays: 17,
    },
    notes: "核發日期 2026-10-25（距今 17 天 < 30 天效期規定），確認無欠繳國稅與違章罰鍰。",
    requiredByCitation: "須知 p.14 §4.2 稅捐查核",
  },
  {
    id: "comp-4",
    name: "臺北市稅捐稽徵處無欠稅證明 (地方稅)",
    filename: "北市稅捐處無欠稅證明_MISSING.pdf",
    type: "tax_local",
    status: "MISSING_CRITICAL",
    metadata: {
      isTaxClear: false,
    },
    notes: "【致命缺漏】僅提供國稅局證明，尚未檢附營業地址所屬臺北市稅捐稽徵處之地方稅證明！",
    requiredByCitation: "須知 p.14 §4.2 & 附件D §3 雙稅查核條款",
  },
];

export const INITIAL_GUARDRAIL_ISSUES: GuardrailIssue[] = [
  {
    id: "issue-capital-cap",
    type: "HARD_TRAP",
    severity: "FATAL",
    category: "資格初審退件門檻",
    title: "實收資本額上限超額 (補助款 ≦ 自籌款 ≦ 實收資本額)",
    citation: {
      docName: "115年SBIR申請須知 / 臺北市SITI須知",
      page: 9,
      section: "八-(二) 經費編列上限規定",
      quote:
        "「補助款不得超過計畫總經費50%，且所申請之自籌款須小於或等於公司實收資本額（補助款 ≦ 自籌款 ≦ 實收資本額）」",
      highlightCoordinates: { top: 180, height: 42 },
    },
    violatingSnippet:
      "申請補助款: NT$ 1,500,000 / 自籌款: NT$ 1,500,000 (總經費 NT$ 3,000,000)",
    locationLabel: "經費總表 > 補助款與自籌款配比",
    whyRawLLMFails:
      "一般 LLM 僅根據使用者要求的最高上限無腦產出 150 萬補助款，未核對變更登記表中的實收資本額僅 100 萬，導致初審形式審查 100% 遭到直接退件！",
    humanMicroTaskPrompt:
      "核對《公司變更登記表》實收資本額為 NT$ 1,000,000。請將自籌款與補助款上限調整為 100 萬元（總經費 200 萬元），以符合 補助款 ≦ 實收資本額 法定鐵律。",
    fixButtonLabel: "一鍵調降補助款至 NT$ 1.0M (符合資本額上限)",
    isFixed: false,
    scorePenalty: 22,
    fixedSnippet:
      "申請補助款: NT$ 1,000,000 / 自籌款: NT$ 1,000,000 (總經費 NT$ 2,000,000) [已符合實收資本額 NT$ 1.0M 上限]",
  },
  {
    id: "issue-personnel-insurance",
    type: "HARD_TRAP",
    severity: "FATAL",
    category: "會計法規 (附件C核銷陷阱)",
    title: "人事費違規編列雇主負擔勞健保與勞退 (超出法定 60% 門檻)",
    citation: {
      docName: "115年附件C_會計科目及編列原則",
      page: 1,
      section: "貳、人事費 一-(一) 編列限制",
      quote:
        "「正式員工之薪資，以本薪為限，不含退休金、退職金、資遣費、勞保費、健保費等公司相對提列之項目，違者於期末核銷時予以剔除並追繳。」",
      highlightCoordinates: { top: 240, height: 50 },
    },
    violatingSnippet:
      "全職研發人員月薪編列包含雇主負擔之勞健保及6%勞退金共 NT$ 168,000，使人事費總額達 64.2%",
    locationLabel: "經費明細表 > 人事費編列細目",
    whyRawLLMFails:
      "ChatGPT 習慣依海外公司成本法將雇主保險納入薪資預算，但台灣政府補助案嚴禁報銷雇主法定負擔，期末查帳將被會計師直接剔除扣款！",
    humanMicroTaskPrompt:
      "確認自人事費中剔除雇主負擔勞健保 NT$ 168,000，將差額平衡至研發消耗性器材與耗材費，使人事費比例降至 52.5%（低於法定 60% 上限）。",
    fixButtonLabel: "一鍵剔除雇主負擔勞健保並平衡經費",
    isFixed: false,
    scorePenalty: 20,
    fixedSnippet:
      "人事費已剔除雇主負擔保險（改由公司行政費用支應），總額調減至 NT$ 1,050,000 (佔總經費 52.5%，低於 60% 上限)",
  },
  {
    id: "issue-missing-local-tax",
    type: "HARD_TRAP",
    severity: "FATAL",
    category: "初審資格文件防呆",
    title: "缺少地方稅捐處無欠稅證明 (雙稅證缺漏直接退件)",
    citation: {
      docName: "附件D_申請者自我檢查表 & 申請須知",
      page: 14,
      section: "肆、應備文件 §4.2 稅籍查證",
      quote:
        "「應同時檢附財政部國稅局及所在地地方稅捐稽徵處出具之無欠稅證明文件，任一缺漏或逾30日效期者，視同資格不符。」",
      highlightCoordinates: { top: 310, height: 45 },
    },
    violatingSnippet:
      "僅上傳財政部臺北國稅局證明，缺少「臺北市稅捐稽徵處」無違章欠稅證明",
    locationLabel: "證明文件庫 > 稅務證明區塊",
    whyRawLLMFails:
      "新創常誤以為「國稅局無欠稅」就是全部，不知地方營業稅與地價/房屋/印花稅由地方稅捐處管轄，成為初審第一階段 35% 案件被退件的主因。",
    humanMicroTaskPrompt:
      "系統已透過統一編號 83921044 向台北市稅捐處 API 驗證無欠稅紀錄，點擊一鍵歸檔自動產製核對章並補正。",
    fixButtonLabel: "一鍵補齊臺北市稅捐處無欠稅證明",
    isFixed: false,
    scorePenalty: 18,
    fixedSnippet:
      "已補齊「臺北市稅捐稽徵處無欠稅證明書 (核發日 2026-11-02)」，雙稅查核全部通過合格。",
  },
  {
    id: "issue-api-wrapper",
    type: "IMPLICIT_RULE",
    severity: "HIGH",
    category: "審查委員潛規則 (創新性判定)",
    title: "委員雷區：API Wrapper 語彙 (遭判定為技術導入而非自主研發)",
    citation: {
      docName: "115年計畫書撰寫說明_暨審查重點",
      page: 8,
      section: "貳、技術研發創新性 §2.3 評審指標",
      quote:
        "「純粹導入或串接既有市售商用套裝軟體、商業 API 者，不具本計畫所獎勵之核心技術研發內涵，將評定為『技術導入』而非創新研發。」",
      highlightCoordinates: { top: 120, height: 55 },
    },
    violatingSnippet:
      "「本系統直接調用 OpenAI / Gemini API 並搭配 RAG 向量資料庫，快速實現企業級智能客服問答自動化。」",
    locationLabel: "計畫書第貳章 > 創新研發內容與架構",
    whyRawLLMFails:
      "ChatGPT 本能寫出矽谷創投風格的 'We leverage OpenAI APIs'，而這在政府產官學審查委員眼中是「買現成套件算什麼研發」的直接死穴！",
    humanMicroTaskPrompt:
      "改寫為官方偏好之自主技術架構：強調「專有資料清洗管線、混合多源邊緣路由排程、以及領域評測基準（Benchmark）」。",
    fixButtonLabel: "一鍵重構為產官學認可之自主研發論述",
    isFixed: false,
    scorePenalty: 18,
    fixedSnippet:
      "「本計畫研發自主之『繁體中文企業法規專屬資料清洗管線』與『多模型邊緣排程路由機制』，並針對 1,200 組對抗性樣本建立專屬評測基準（Benchmark），克服商用模型幻覺與隱私風險。」",
  },
  {
    id: "issue-clawback-kpi",
    type: "IMPLICIT_RULE",
    severity: "HIGH",
    category: "審查委員雷區 (期末扣款查核陷阱)",
    title: "查核點自爆陷阱：技術查核點混入商業營收與不合理 99.9% 指標",
    citation: {
      docName: "115年SBIR申請須知 / 查核點規範",
      page: 31,
      section: "陸、期末查核標準 查核點設定指引",
      quote:
        "「期末查核點應為可具體驗收之研發工程成果（如功能模組測試報告、精確率測試數據），不得將營業額、會員註冊數等受市場營運波動之商業指標列為驗收要件。」",
      highlightCoordinates: { top: 380, height: 48 },
    },
    violatingSnippet:
      "查核點 M3:「系統上線並於6個月內達成 NT$ 5,000,000 商業營收，且客服問答辨識率達 99.9%」",
    locationLabel: "計畫書第肆章 > 查核點明細表 (Milestone M3)",
    whyRawLLMFails:
      "團隊習慣把融資 Pitch Deck 的 Traction 數字填進補助案查核點，但政府在半年後是請外部會計師查帳，營收未達標將被依約扣款追回 30% 補助款！",
    humanMicroTaskPrompt:
      "將無法保證之商業營收與誇大的 99.9% 準確率，轉換為技術專家能出具內部測試報告的客觀工程標準（F1-score >= 88%, N=500 測試集）。",
    fixButtonLabel: "一鍵轉化為客觀工程可驗收查核點",
    isFixed: false,
    scorePenalty: 18,
    fixedSnippet:
      "查核點 M3:「完成系統部署並執行內部標準化測試集（N=500 筆對抗性查詢），驗證辨識準確率 F1-score >= 88.5%，產出經架構師簽署之工程測試報告與驗收日誌」",
  },
];

export const INITIAL_PROPOSAL_PARAGRAPHS: ProposalParagraph[] = [
  {
    id: "p-intro",
    sectionTitle: "一、計畫背景與市場痛點",
    content:
      "隨著生成式人工智慧普及，臺灣中小型企業面臨法規複雜與跨部門表單勾稽成本高昂之挑戰。每年超過上萬家業者在政府補助與標案投件中，因會計科目編列與資格要件繁瑣而遭遇形式退件。",
    hasIssue: false,
  },
  {
    id: "p-tech",
    sectionTitle: "二、核心創新技術與研發架構",
    content:
      "本計畫專注於研發企業級合規編譯器。傳統作法中，「本系統直接調用 OpenAI / Gemini API 並搭配 RAG 向量資料庫，快速實現企業級智能客服問答自動化。」然而此種作法在政府審查中常遭質疑缺乏技術自主性。",
    hasIssue: true,
    issueId: "issue-api-wrapper",
    highlightedText:
      "「本系統直接調用 OpenAI / Gemini API 並搭配 RAG 向量資料庫，快速實現企業級智能客服問答自動化。」",
  },
  {
    id: "p-milestone",
    sectionTitle: "三、預期關鍵查核點 (Milestones)",
    content:
      "期中查核點 M1：完成官網須知爬蟲與 PDF 規則 AST 解析器建置。\n期末查核點 M3：「系統上線並於6個月內達成 NT$ 5,000,000 商業營收，且客服問答辨識率達 99.9%」作為驗收標準。",
    hasIssue: true,
    issueId: "issue-clawback-kpi",
    highlightedText:
      "「系統上線並於6個月內達成 NT$ 5,000,000 商業營收，且客服問答辨識率達 99.9%」",
  },
];

export const INITIAL_BUDGET_ITEMS: BudgetItem[] = [
  {
    id: "b-1",
    category: "人事費",
    name: "全職資深研發工程師 (2人，含雇主負擔勞健保及退撫提撥)",
    amount: 1218000,
    hasViolation: true,
    violationMessage: "包含雇主負擔法定保險 NT$ 168,000，且佔總預算比重超標 (64.2% > 60%)",
  },
  {
    id: "b-2",
    category: "消耗性器材",
    name: "GPU 加速開發測試硬體租賃與耗材",
    amount: 320000,
    hasViolation: false,
  },
  {
    id: "b-3",
    category: "委託研究費",
    name: "國立大學資工所演算法抗幻覺驗證委託",
    amount: 280000,
    hasViolation: false,
  },
  {
    id: "b-4",
    category: "雲端運算/維護費",
    name: "台灣在地合格經銷商雲端運算執行時數 (三聯式統一發票核銷)",
    amount: 182000,
    hasViolation: false,
  },
];

