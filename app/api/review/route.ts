import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { ReviewSchema, type Campaign, type Creator } from "@/lib/types";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompt";
import { getCachedReview, setCachedReview } from "@/lib/reviewCache";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  let campaign: Campaign;
  let creator: Creator;

  try {
    const body = await req.json();
    campaign = body.campaign;
    creator = body.creator;
    if (!campaign || !creator) throw new Error();
  } catch {
    return NextResponse.json(
      { error: "Request must include campaign and creator" },
      { status: 400 }
    );
  }

  // 1) ¿Ya tenemos esta combinación cacheada?
  const cached = getCachedReview(campaign, creator);
  if (cached) {
    return NextResponse.json(cached, {
      headers: { "X-Cache": "HIT" },
    });
  }

  try {
    const completion = await openai.chat.completions.parse({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(campaign, creator) },
      ],
      response_format: zodResponseFormat(ReviewSchema, "creator_review"),
    });

    const review = completion.choices[0].message.parsed;

    if (!review) {
      return NextResponse.json(
        { error: "AI returned no structured result" },
        { status: 502 }
      );
    }

    // 2) Guardar para la próxima vez.
    setCachedReview(campaign, creator, review);

    return NextResponse.json(review, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "AI review failed" },
      { status: 502 }
    );
  }
}
