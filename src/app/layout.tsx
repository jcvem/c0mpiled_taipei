import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GrantOS // ESLint & Pre-Flight Compiler for Government Grants",
  description:
    "Zero-config government grant URL harvester and real-time guardrail IDE for Taiwan SBIR & Taipei SITI grants.",
  metadataBase: new URL("https://c0mpiled-taipei.web.app"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg" },
    ],
  },
  openGraph: {
    title: "GrantOS // ESLint & Pre-Flight Compiler for Government Grants",
    description:
      "Turn a $15/hr operations assistant into a Senior Grant Auditor with live statutory accounting & reviewer guardrails.",
    url: "https://c0mpiled-taipei.web.app",
    siteName: "GrantOS",
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrantOS // ESLint for Government Grants",
    description:
      "Deterministic grant compiler & pre-flight linter for Taiwan SBIR & Taipei SITI grants.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="bg-slate-50 text-slate-900 min-h-screen selection:bg-rose-100 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}
