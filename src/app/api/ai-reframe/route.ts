import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { violatingText, ruleQuote, category, issueTitle } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: "GEMINI_API_KEY is not configured",
      });
    }

    const systemInstruction = `你是一位擁有10年經驗的台灣政府研發補助案（如經濟部SBIR、台北市SITI）資深審查與核銷會計專家。
請根據審查法規條文，將申請者撰寫的危險語彙（如單純串接商用API、過度商業化營收KPI、違反會計法規的編列）改寫為具備高技術自主性、可客觀工程驗收、完全符合政府核銷法規之精準文字。
請直接輸出改寫後的繁體中文內容，無需客套話或額外解釋。`;

    const promptText = `【審查違規項目】：${issueTitle} (${category})
【官方審查法規依據】：${ruleQuote}
【原計畫書違規文字】：${violatingText}

請將上述違規文字重新撰寫為審查委員認可之高度自主研發、客觀可驗收之論述：`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemInstruction}\n\n${promptText}` }],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { success: false, error: `Gemini API error: ${res.statusText}`, details: errText },
        { status: 500 }
      );
    }

    const data = await res.json();
    const candidateText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    return NextResponse.json({
      success: true,
      reframedText: candidateText,
      model: "gemini-1.5-flash",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to call Gemini API" },
      { status: 500 }
    );
  }
}

