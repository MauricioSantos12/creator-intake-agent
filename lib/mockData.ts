import { Campaign, Creator } from "./types";

export const campaign: Campaign = {
  brandName: "GlowPop",
  campaignName: "GlowPop Summer Launch",
  campaignGoal:
    "Drive awareness and trial for a new SPF lip balm among Gen Z consumers.",
  targetAudience:
    "Gen Z women, beauty lovers, college students, skincare beginners",
  platforms: ["TikTok", "Instagram"],
  budgetRange: "$2,000 - $10,000 per creator",
  requirements: [
    "Creator must be comfortable showing product usage on camera",
    "Must mention SPF benefits",
    "Must not make medical claims",
    "Content should feel fun, casual, and summer-focused",
  ],
  brandSafetyNotes:
    "Avoid creators with controversial content, heavy profanity, or unsafe skincare claims.",
};

export const creators: Creator[] = [
  {
    id: "mia-lopez",
    creatorName: "Mia Lopez",
    handle: "@miaglow",
    platform: "TikTok",
    followers: 820000,
    engagementRate: 4.9,
    audienceSummary:
      "Gen Z women interested in beauty, skincare, and affordable routines.",
    contentStyle: "Fast-paced GRWM videos, humor, product reactions.",
    applicationMessage:
      "I can create a summer GRWM using the lip balm before heading to the beach.",
    pastBrandDeals: ["e.l.f.", "Bubble Skincare"],
    status: "pending",
  },
  {
    id: "daniel-kim",
    creatorName: "Daniel Kim",
    handle: "@danielreviews",
    platform: "YouTube",
    followers: 410000,
    engagementRate: 6.2,
    audienceSummary: "Tech and productivity audience, mostly men 18-34.",
    contentStyle: "Detailed review videos and comparison content.",
    applicationMessage:
      "I can review the product from an everyday carry perspective.",
    pastBrandDeals: ["Notion", "Samsung"],
    status: "pending",
  },
  {
    id: "ava-martinez",
    creatorName: "Ava Martinez",
    handle: "@avastyle",
    platform: "Instagram",
    followers: 1200000,
    engagementRate: 2.7,
    audienceSummary: "Fashion, travel, luxury lifestyle audience.",
    contentStyle: "Polished aspirational photo and Reel content.",
    applicationMessage:
      "This could fit naturally into my summer travel content.",
    pastBrandDeals: ["Revolve", "Dior Beauty"],
    status: "pending",
  },
];
