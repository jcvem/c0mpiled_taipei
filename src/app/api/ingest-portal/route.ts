import { NextRequest, NextResponse } from "next/server";
import { PORTAL_CONFIGS } from "@/lib/grant-data";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    const isSbir = url && url.toLowerCase().includes("sbir");
    const portalConfig = isSbir ? PORTAL_CONFIGS.sbir : PORTAL_CONFIGS.siti;

    return NextResponse.json({
      success: true,
      url: url || portalConfig.portalUrl,
      agency: portalConfig.agency,
      name: portalConfig.name,
      crawledDocs: portalConfig.crawledDocs,
      totalRulesCompiled: portalConfig.crawledDocs.reduce(
        (acc, d) => acc + d.parsedRulesCount,
        0
      ),
      timestamp: new Date().toISOString(),
      compilationEngine: "GrantOS-AST-Compiler/v2.4 (Deterministic)",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to parse portal" },
      { status: 500 }
    );
  }
}

