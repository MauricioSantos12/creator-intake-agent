import { z } from "zod";

export type Platform = "TikTok" | "Instagram" | "YouTube";
export type Status = "pending" | "approved" | "rejected" | "needs_info";
export type Recommendation =
  | "approve"
  | "reject"
  | "needs_info"
  | "manual_review";

export interface Campaign {
  brandName: string;
  campaignName: string;
  campaignGoal: string;
  targetAudience: string;
  platforms: Platform[];
  budgetRange: string;
  requirements: string[];
  brandSafetyNotes: string;
}

export interface Creator {
  id: string;
  creatorName: string;
  handle: string;
  platform: Platform;
  followers: number;
  engagementRate: number;
  audienceSummary: string;
  contentStyle: string;
  applicationMessage: string;
  pastBrandDeals: string[];
  status: Status;
}

// --- AI review: schema (runtime) + tipo derivado ---
export const ReviewSchema = z.object({
  fitScore: z.number().min(1).max(10),
  recommendation: z.enum(["approve", "reject", "needs_info", "manual_review"]),
  reasoning: z.string(),
  risks: z.array(z.string()),
  missingInfo: z.array(z.string()),
  suggestedReply: z.string(),
});

export type AIReview = z.infer<typeof ReviewSchema>;

// Estado del review por creator (lo usa la página)
export type ReviewState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "error"; message: string }
  | { phase: "done"; result: AIReview };
