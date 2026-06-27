# Creator Intake Review Agent

An internal tool that helps a campaign manager review creator applications for a brand campaign, run an AI-powered fit review, and choose a next action (approve, reject, or request more info).

Built for the GlowPop Summer Launch campaign as a single-page review workspace: a creator list on the left, and a detailed review panel on the right with a real, server-side AI fit assessment.

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** (theme tokens defined in CSS)
- **OpenAI** SDK with structured outputs (`gpt-4o`)
- **Zod** for schema validation of the AI response
- **lucide-react** for icons
- **Open Sans** via `next/font` (self-hosted, no runtime fetch)

## Getting started

### Prerequisites

- Node.js 18.18 or newer
- An OpenAI API key

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env.local
# then open .env.local and add your OpenAI key

# 3. Run the dev server
npm run dev
```

Open http://localhost:3000. The landing page links to `/review`, the main workspace.

## Environment variables

Create a `.env.local` file in the project root:

```bash
# Required. Your OpenAI API key (used only on the server).
OPENAI_API_KEY=sk-...

# Optional. When "true", AI reviews are cached in memory so the same
# campaign + creator combination is not sent to the model twice.
# Any other value (or unset) disables the cache.
SAVE_RECOMMENDATIONS=false
```

The key is read only inside the server-side API route and is never exposed to the browser. `.env.local` is git-ignored by default.

> Note: environment variables are read when the server starts. If you change `.env.local`, restart the dev server for the new values to take effect.

## Project structure

```
app/
  layout.tsx              Root layout: fonts, footer (shown on every page)
  page.tsx                Landing page (no header)
  review/
    layout.tsx            Adds the header to the /review branch only
    page.tsx              Two-panel review workspace (owns all state)
  api/
    review/route.ts       Server-side AI call

components/
  ui/                     Generic, domain-agnostic pieces
    StatusBadge.tsx
    Stat.tsx
    ResultList.tsx
    DecisionButton.tsx
  review/                 Domain-aware components
    CreatorCard.tsx
    CreatorProfile.tsx
    AIRecommendationCard.tsx
    DecisionActions.tsx
  layout/
    Header.tsx
    Footer.tsx

lib/
  types.ts                Shared types + Zod review schema
  mockData.ts             Seed campaign and creators
  prompt.ts               System prompt + user prompt builder
  reviewCache.ts          In-memory cache, gated by SAVE_RECOMMENDATIONS
```

State lives in `app/review/page.tsx` and flows down through props; components are presentational and emit callbacks. The split between `ui/` and `review/` is by responsibility: `ui/` knows nothing about creators or campaigns, while `review/` is intentionally coupled to the domain.

## AI agent design

The agent runs entirely server-side in `app/api/review/route.ts`. The client posts the selected creator and the fixed campaign to the route; the API key never leaves the server.

**Grounding.** The system prompt (`lib/prompt.ts`) instructs the model to judge fit using only the supplied campaign and creator data, to avoid inventing metrics or facts, and to lean toward `needs_info` or `manual_review` when something needed for a confident decision is missing. The user prompt passes only the provided fields (campaign goal, target audience, platforms, requirements, brand-safety notes, creator profile, application message, and past brand deals).

**Structured output.** Rather than parsing free text, the route uses OpenAI structured outputs with a Zod schema (`ReviewSchema`). The model is constrained to return an object matching the schema exactly:

```
fitScore        number 1–10
recommendation  approve | reject | needs_info | manual_review
reasoning       string
risks           string[]
missingInfo     string[]
suggestedReply  string
```

Because the schema is enforced at the API level, malformed responses are largely prevented at the source instead of being repaired after the fact.

**Error handling.** The route returns distinct status codes: `400` for a malformed request (missing campaign or creator), `502` when the model errors or returns no parsed result. The UI models the review as a small state machine (`idle | loading | error | done`) and renders a clear state for each, including a friendly error card when a request fails.

**Caching.** When `SAVE_RECOMMENDATIONS=true`, results are cached in memory keyed by campaign name + creator id, so re-running a review for the same pair returns instantly without another model call. Responses carry an `X-Cache: HIT | MISS` header for easy debugging. When the flag is off, the cache is a no-op.

## Tradeoffs and what I'd improve with more time

- **In-memory cache.** The cache is a module-level `Map`, which is simple and dependency-free but is cleared on server restart and isn't shared across instances. In production I'd move it to Redis or persist reviews in a database, keyed by a hash of the campaign and creator content rather than just the id.

- **State is in React only.** Status changes and review results live in component state with no persistence, which matches the scope of the exercise. With more time I'd persist decisions so a refresh doesn't reset the board.

- **Single fixed campaign.** The campaign is hardcoded seed data. A real version would support multiple campaigns and a way to switch between them, which would also change the cache key strategy.

- **No automated tests.** Given the time budget I prioritized the UI and the review flow. I'd add unit tests around the prompt builder, the cache gating logic, and the API route's error branches, plus a couple of component tests for the review state machine.

- **Model string.** The model is pinned to `gpt-4o`. Model names change over time, so before a real deployment I'd confirm the current identifier and consider making it configurable via an environment variable.

- **Accessibility and polish.** Icon-only links carry `aria-label`s and states are clearly communicated, but with more time I'd do a full keyboard-navigation and contrast pass, especially around the warm secondary color which I deliberately kept to decorative/hierarchy roles rather than critical text.

## AI assistance during development

This project was built with the help of Claude Opus 4.8, used as a pair-programming assistant for advising on architecture decisions, generating and refining UI components, and answering implementation questions throughout the build. All generated code was reviewed, adapted, and integrated by me.
```
