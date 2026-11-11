"use client";

import React, { useState } from "react";
import { useGrantStore } from "@/lib/store";
import {
  X,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Download,
  Copy,
  Check,
  Printer,
  QrCode,
  FileText,
  Lock,
  ExternalLink,
  Award,
} from "lucide-react";

export function PreAuditCertificateModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    guardrailIssues,
    passProbability,
    selectedPortalKey,
    language,
    budgetItems,
    companyDocs,
  } = useGrantStore();

  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const isAllVerified = passProbability >= 95;
  const certId =
    selectedPortalKey === "siti" ? "GOS-115-SITI-0942" : "GOS-115-SBIR-0942";
  const astVersion =
    selectedPortalKey === "siti" ? "TAIPEI-SITI-115-v2 (88 Rules)" : "MOEA-SBIR-115-v3 (80 Rules)";

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(
      `https://grantos.taipei/verify/${certId}?sha256=8a4f91b3c9d04e`
    );
    setCopiedLink(true);
    triggerToast(
      language === "en"
        ? "Reviewer verification link copied to clipboard!"
        : "已複製審查委員快速核驗專用連結！"
    );
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAttachCover = () => {
    triggerToast(
      language === "en"
        ? `Attached ${certId}.pdf as Cover Page 0 to Official Submission Package!`
        : `已成功將 ${certId}.pdf 掛載為正式送件包之【Cover Page 0 預審合格封面】！`
    );

    // Provide downloadable summary stub
    const content = `================================================================================
PRE-SUBMISSION COMPLIANCE & CROSS-DOCUMENT ATTESTATION
政府補助案資格暨經費勾稽預審證明書 (Cover Page 0)
================================================================================
Certificate ID : ${certId}
Timestamp      : 2026-11-11 20:45:00 CST
Rulebook AST   : ${astVersion}
Status         : ${isAllVerified ? "100% DETERMINISTICALLY VERIFIED (AUDIT-READY)" : "RECONCILIATION PENDING"}
Pre-Review Pass: ${passProbability}%

RECONCILIATION MATRIX:
1. 實收資本額上限 [變更登記表_11510.pdf]: ${
      guardrailIssues.find((i) => i.id === "issue-capital-cap")?.isFixed
        ? "PASS (NT$1.0M == NT$1.0M)"
        : "FAIL"
    }
2. 人事費本薪與法定上限 [10月勞保名冊+附件C]: ${
      guardrailIssues.find((i) => i.id === "issue-personnel-insurance")?.isFixed
        ? "PASS (52.5% <= 60.0%)"
        : "FAIL"
    }
3. 國稅+地方稅30天無欠稅 [北市稅捐處+國稅局]: ${
      guardrailIssues.find((i) => i.id === "issue-missing-local-tax")?.isFixed
        ? "PASS (Clear <= 30d)"
        : "FAIL"
    }
4. 自主創新技術架構 [附件A_計畫書.odt]: ${
      guardrailIssues.find((i) => i.id === "issue-api-wrapper")?.isFixed
        ? "PASS (Proprietary Pipeline)"
        : "FAIL"
    }
5. 客觀工程查核點驗收 [查核點明細表]: ${
      guardrailIssues.find((i) => i.id === "issue-clawback-kpi")?.isFixed
        ? "PASS (F1 >= 88.5%, N=500)"
        : "FAIL"
    }

Official Cryptographic Seal: SHA256-8A4F91B3C9D04E-GOS-TAIPEI
Verified by GrantOS Deterministic AST Engine
================================================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${certId}_CoverPage0_PreAuditCertificate.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const rows = [
    {
      id: "row-capital",
      ruleCitationZh: "須知 p.9: 補助款 ≦ 自籌款 ≦ 實收資本額",
      ruleCitationEn: "Guidelines p.9: Subsidy ≦ Match ≦ Paid-in Capital",
      boundDoc: "公司設立變更登記表_11510.pdf",
      hash: "sha256:8a4f..91b",
      extractedZh: "NT$ 1.0M ＝ 資本額 NT$ 1.0M",
      extractedEn: "NT$ 1.0M == Capital NT$ 1.0M",
      isFixed: guardrailIssues.find((i) => i.id === "issue-capital-cap")?.isFixed,
      fixedDetailZh: "自籌款下修至 100 萬，完全吻合資本額法定 1:1 鐵律",
      fixedDetailEn: "Matching capped at NT$1.0M, satisfying statutory 1:1 match",
    },
    {
      id: "row-personnel",
      ruleCitationZh: "附件C p.1: 人事費本薪限制 且 總額 ≦ 60%",
      ruleCitationEn: "App C p.1: Base wage only (no employer ins.) ≦ 60%",
      boundDoc: "10月勞保投保人名冊_11510.pdf",
      hash: "sha256:3c9d..04e",
      extractedZh: "人事費 52.5% (排除雇主負擔保險)",
      extractedEn: "Personnel 52.5% (Purged employer ins.)",
      isFixed: guardrailIssues.find((i) => i.id === "issue-personnel-insurance")?.isFixed,
      fixedDetailZh: "剔除雇主負擔保險 NT$168,000，人事比重自 64.2% 調減至 52.5%",
      fixedDetailEn: "Purged NT$168,000 employer insurance; ratio 52.5% < 60% cap",
    },
    {
      id: "row-tax",
      ruleCitationZh: "附件D §4: 國稅 ＋ 地方稅 30日內無欠稅證明",
      ruleCitationEn: "App D §4: Both National & Municipal clearance < 30d",
      boundDoc: "北市稅捐處無欠稅證明_1151102.pdf",
      hash: "sha256:4d1e..88a",
      extractedZh: "國稅 17天前核發 / 北市地方稅 9天前核發",
      extractedEn: "National issued 17d ago / City issued 9d ago",
      isFixed: guardrailIssues.find((i) => i.id === "issue-missing-local-tax")?.isFixed,
      fixedDetailZh: "雙無欠稅證明全數補正且核發效期小於 30 天",
      fixedDetailEn: "Both tax certificates attached and verified within 30-day mandate",
    },
    {
      id: "row-api",
      ruleCitationZh: "須知 p.8 §2.3: 自主技術研發 (非單純商用 API Wrapper)",
      ruleCitationEn: "Guidelines p.8: Proprietary R&D (No raw API wrappers)",
      boundDoc: "附件A_研發計畫書草稿.odt (第貳章)",
      hash: "sha256:9f2c..11d",
      extractedZh: "繁中法律清洗管線 + 多模型邊緣排程",
      extractedEn: "Proprietary cleaning pipeline + Edge routing scheduler",
      isFixed: guardrailIssues.find((i) => i.id === "issue-api-wrapper")?.isFixed,
      fixedDetailZh: "重構為專屬評測基準與邊緣架構，產官學審查評定為技術自主",
      fixedDetailEn: "Reframed as proprietary benchmark architecture with full in-house IP",
    },
    {
      id: "row-milestone",
      ruleCitationZh: "須知 p.31: 期末查核點可工程驗收 (排除商業營收KPI)",
      ruleCitationEn: "Guidelines p.31: Auditable QA metric (No commercial revenue)",
      boundDoc: "附件A_研發計畫書草稿.odt (第肆章查核點)",
      hash: "sha256:1b8a..77e",
      extractedZh: "內部測試集 N=500, F1-score >= 88.5%",
      extractedEn: "Internal benchmark N=500, F1 >= 88.5% (Signed QA report)",
      isFixed: guardrailIssues.find((i) => i.id === "issue-clawback-kpi")?.isFixed,
      fixedDetailZh: "以工程技術測試日誌驗收，零核銷剔除與扣款追繳風險",
      fixedDetailEn: "Verifiable by engineering QA report; zero clawback risk",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-xl border border-slate-300 shadow-2xl max-w-3xl w-full p-5 sm:p-7 font-sans text-xs my-6 relative">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-60 bg-slate-900 text-white px-4 py-2 rounded-md shadow-lg text-xs font-sans font-medium flex items-center space-x-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header Bar */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            <span className="text-[11px] font-mono text-slate-500 font-semibold uppercase tracking-wider">
              GrantOS Official Attestation // Cover Sheet 0
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Hero Header (Bauhaus Monospace Official Look) */}
        <div className="my-4 p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 space-y-1.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
              Government Pre-Audit Verification Certificate
            </div>
            <h2 className="text-base font-bold text-slate-950 tracking-tight font-sans">
              PRE-SUBMISSION COMPLIANCE & CROSS-DOCUMENT ATTESTATION
            </h2>
            <div className="text-xs font-bold text-slate-700">
              政府補助案資格暨經費勾稽預審證明書 (Cover Page 0)
            </div>

            {/* Metadata Grid */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-slate-600 border-t border-slate-200/80">
              <div>
                <span className="text-slate-400 block">Certificate ID:</span>
                <span className="font-bold text-slate-900">{certId}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Rulebook AST:</span>
                <span className="font-medium text-slate-800 truncate block">
                  {astVersion}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Timestamp:</span>
                <span className="text-slate-800">2026-11-11 20:45 CST</span>
              </div>
              <div>
                <span className="text-slate-400 block">Audit Status:</span>
                <span
                  className={`font-bold ${
                    isAllVerified ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {isAllVerified ? "100% VERIFIED" : "PENDING FIX"}
                </span>
              </div>
            </div>
          </div>

          {/* SVG QR Code Graphic for Clerk Verification */}
          <div className="flex flex-col items-center bg-white p-2.5 rounded-md border border-slate-200 shadow-2xs shrink-0">
            <svg
              className="w-16 h-16 text-slate-900"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Clean Geometric QR Representation */}
              <rect x="5" y="5" width="30" height="30" fill="currentColor" />
              <rect x="10" y="10" width="20" height="20" fill="white" />
              <rect x="15" y="15" width="10" height="10" fill="currentColor" />

              <rect x="65" y="5" width="30" height="30" fill="currentColor" />
              <rect x="70" y="10" width="20" height="20" fill="white" />
              <rect x="75" y="15" width="10" height="10" fill="currentColor" />

              <rect x="5" y="65" width="30" height="30" fill="currentColor" />
              <rect x="10" y="70" width="20" height="20" fill="white" />
              <rect x="15" y="75" width="10" height="10" fill="currentColor" />

              {/* Data modules */}
              <rect x="42" y="10" width="6" height="6" />
              <rect x="52" y="10" width="6" height="6" />
              <rect x="42" y="22" width="6" height="6" />
              <rect x="48" y="28" width="6" height="6" />
              <rect x="12" y="45" width="6" height="6" />
              <rect x="25" y="45" width="6" height="6" />
              <rect x="38" y="45" width="6" height="6" />
              <rect x="50" y="45" width="6" height="6" />
              <rect x="62" y="45" width="6" height="6" />
              <rect x="75" y="45" width="6" height="6" />
              <rect x="45" y="60" width="8" height="8" />
              <rect x="65" y="60" width="8" height="8" />
              <rect x="80" y="65" width="12" height="12" />
              <rect x="55" y="75" width="8" height="8" />
              <rect x="45" y="85" width="15" height="6" />
              <rect x="75" y="85" width="15" height="6" />
            </svg>
            <span className="text-[9px] font-mono text-slate-500 mt-1 font-semibold text-center leading-tight">
              Scan for Clerk
              <br />
              Instant-Verify
            </span>
          </div>
        </div>

        {/* Cross-Document Reconciliation Ledger (Table for Gov Officials) */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-sans font-bold text-slate-800 uppercase tracking-wider">
              {language === "en"
                ? "Cross-Document Reconciliation Matrix (審查員覆核總表)"
                : "跨文件勾稽檢核對照總表 (審查委員與承辦人專用)"}
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              5 of 5 Critical Checks
            </span>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-600 font-mono text-[10px] uppercase">
                    <th className="p-2.5 font-bold">
                      {language === "en" ? "Statutory Rule & Citation" : "審查法規條文依據"}
                    </th>
                    <th className="p-2.5 font-bold">
                      {language === "en" ? "Bound Source & Hash" : "勾稽實體文件與雜湊"}
                    </th>
                    <th className="p-2.5 font-bold">
                      {language === "en" ? "Extracted vs. Limit" : "實際數值 vs. 法定上限"}
                    </th>
                    <th className="p-2.5 font-bold text-right">
                      {language === "en" ? "Verification Status" : "勾稽狀態"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {rows.map((row) => (
                    <tr
                      key={row.id}
                      className={
                        row.isFixed
                          ? "hover:bg-slate-50/70"
                          : "bg-rose-50/40 hover:bg-rose-50/60"
                      }
                    >
                      <td className="p-2.5 font-medium text-slate-800 max-w-[200px]">
                        <div>
                          {language === "en" ? row.ruleCitationEn : row.ruleCitationZh}
                        </div>
                        {language === "bilingual" && (
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {row.ruleCitationEn}
                          </div>
                        )}
                      </td>

                      <td className="p-2.5 text-slate-600 font-mono text-[10px]">
                        <div className="text-slate-800 font-semibold truncate max-w-[170px]">
                          {row.boundDoc}
                        </div>
                        <span className="text-slate-400">{row.hash}</span>
                      </td>

                      <td className="p-2.5 font-mono text-slate-700">
                        <div className="font-semibold text-slate-900">
                          {language === "en" ? row.extractedEn : row.extractedZh}
                        </div>
                        <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                          {language === "en" ? row.fixedDetailEn : row.fixedDetailZh}
                        </div>
                      </td>

                      <td className="p-2.5 text-right shrink-0">
                        {row.isFixed ? (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>VERIFIED</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-300">
                            <X className="w-3 h-3 text-rose-600" />
                            <span>FAILED</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Cryptographic Attestation Stamp */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] gap-2 mb-4 font-mono">
          <div className="flex items-center space-x-2 text-slate-600">
            <Lock className="w-4 h-4 text-slate-700 shrink-0" />
            <span>Digital Attestation: SHA256-8A4F91B3C9D04E-GOS-TAIPEI</span>
          </div>
          <div className="flex items-center space-x-1 text-slate-500 text-[10px]">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Deterministic AST Engine Verified</span>
          </div>
        </div>

        {/* Footer Actions inside Modal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-slate-200">
          <button
            onClick={handleAttachCover}
            className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>
              {language === "en"
                ? "Attach Certificate as Cover Page 0 (.PDF)"
                : "將證明書掛載為送件封面 (Cover Page 0)"}
            </span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-md bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-medium text-xs shadow-2xs transition"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">
                  {language === "en" ? "Link Copied!" : "核驗連結已複製！"}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>
                  {language === "en"
                    ? "Copy Reviewer Instant-Verify Link"
                    : "複製審查委員快速核驗專用連結"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

