import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GrantOS // ESLint & Pre-Flight Compiler for Government Grants",
  description:
    "Zero-config government grant URL harvester and real-time guardrail IDE for Taiwan SBIR & Taipei SITI grants.",
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
