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
    <html lang="zh-TW" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen selection:bg-rose-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

