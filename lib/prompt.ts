import type { Campaign, Creator } from "./types";

export const SYSTEM_PROMPT = `You are a creator-fit review agent for an influencer marketing platform.
You evaluate whether a creator is a good fit for a specific brand campaign.

Rules:
- Ground every judgment ONLY in the campaign and creator data provided. Do not invent followers, metrics, audience traits, or past deals that are not given.
- If something needed for a confident decision is missing, say so in "missingInfo" and lean toward "needs_info" or "manual_review" rather than guessing.
- Be concise and specific. Reference actual data points (platform, audience, engagement, content style, brand-safety notes).
- Respond with a SINGLE valid JSON object and nothing else. No markdown, no code fences, no commentary.

Output schema:
{
  "fitScore": number (1-10),
  "recommendation": "approve" | "reject" | "needs_info" | "manual_review",
  "reasoning": string,
  "risks": string[],
  "missingInfo": string[],
  "suggestedReply": string
}`;

export function buildUserPrompt(campaign: Campaign, creator: Creator): string {
  return `CAMPAIGN
Brand: ${campaign.brandName}
Name: ${campaign.campaignName}
Goal: ${campaign.campaignGoal}
Target audience: ${campaign.targetAudience}
Platforms: ${campaign.platforms.join(", ")}
Budget range: ${campaign.budgetRange}
Requirements:
${campaign.requirements.map((r) => `- ${r}`).join("\n")}
Brand safety notes: ${campaign.brandSafetyNotes}

CREATOR
Name: ${creator.creatorName} (${creator.handle})
Platform: ${creator.platform}
Followers: ${creator.followers}
Engagement rate: ${creator.engagementRate}%
Audience: ${creator.audienceSummary}
Content style: ${creator.contentStyle}
Application message: "${creator.applicationMessage}"
Past brand deals: ${creator.pastBrandDeals.join(", ") || "none provided"}

Evaluate this creator's fit for the campaign and return the JSON object.`;
}
