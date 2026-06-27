import type { AIReview, Campaign, Creator } from "./types";

const CACHE_ENABLED = process.env.SAVE_RECOMMENDATIONS === "true";

const cache = new Map<string, AIReview>();

function makeKey(campaign: Campaign, creator: Creator): string {
  return `${campaign.campaignName}::${creator.id}`;
}

export function getCachedReview(
  campaign: Campaign,
  creator: Creator
): AIReview | null {
  if (!CACHE_ENABLED) return null;
  return cache.get(makeKey(campaign, creator)) ?? null;
}

export function setCachedReview(
  campaign: Campaign,
  creator: Creator,
  review: AIReview
): void {
  if (!CACHE_ENABLED) return;
  cache.set(makeKey(campaign, creator), review);
}
