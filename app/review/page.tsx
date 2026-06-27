"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { campaign, creators as seedCreators } from "@/lib/mockData";
import type { Creator, Status, ReviewState, AIReview } from "@/lib/types";
import { CreatorCard } from "@/components/review/CreatorCard";
import { CreatorProfile } from "@/components/review/CreatorProfile";
import { AIRecommendationCard } from "@/components/review/AIRecommendationCard";
import { DecisionActions } from "@/components/review/DecisionActions";

export default function ReviewPage() {
  const [creators, setCreators] = useState<Creator[]>(seedCreators);
  const [selectedId, setSelectedId] = useState<string>(seedCreators[0].id);
  const [reviews, setReviews] = useState<Record<string, ReviewState>>({});

  const selected = creators.find((c) => c.id === selectedId)!;
  const review: ReviewState = reviews[selectedId] ?? { phase: "idle" };

  function setStatus(id: string, status: Status) {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  }

  function scoreFor(id: string): number | null {
    const r = reviews[id];
    return r?.phase === "done" ? r.result.fitScore : null;
  }

  async function runReview() {
    setReviews((r) => ({ ...r, [selectedId]: { phase: "loading" } }));
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaign, creator: selected }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data: AIReview = await res.json();
      setReviews((r) => ({
        ...r,
        [selectedId]: { phase: "done", result: data },
      }));
    } catch (e) {
      setReviews((r) => ({
        ...r,
        [selectedId]: {
          phase: "error",
          message: e instanceof Error ? e.message : "Something went wrong",
        },
      }));
    }
  }

  return (
    <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-6 md:grid-cols-[320px_1fr]">
      <aside className="space-y-3">
        <h2 className="px-1 text-xs font-bold uppercase tracking-wide text-ink-soft">
          Applicants ({creators.length})
        </h2>
        {creators.map((c) => (
          <CreatorCard
            key={c.id}
            creator={c}
            isSelected={c.id === selectedId}
            score={scoreFor(c.id)}
            onSelect={() => setSelectedId(c.id)}
          />
        ))}
      </aside>

      <section key={selectedId} className="space-y-3">
        <h2 className="px-1 text-xs font-bold uppercase tracking-wide text-ink-soft">
          Process
        </h2>
        <div className="animate-fadeIn space-y-6 rounded-xl border border-line bg-white p-6">
          <CreatorProfile creator={selected} />

          <button
            onClick={runReview}
            disabled={review.phase === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 mb-2
                     font-semibold text-white transition-colors hover:bg-brand/90 disabled:opacity-60 cursor-pointer"
          >
            {review.phase === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Reviewing…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Run AI Review
              </>
            )}
          </button>

          <AIRecommendationCard state={review} />

          <DecisionActions
            status={selected.status}
            onDecide={(status) => setStatus(selectedId, status)}
          />
        </div>
      </section>
    </main>
  );
}
