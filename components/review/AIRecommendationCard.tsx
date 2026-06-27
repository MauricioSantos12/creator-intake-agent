import { Sparkles, Loader2, AlertTriangle } from "lucide-react";
import type { ReviewState } from "@/lib/types";
import { ResultList } from "@/components/ui/ResultList";

export function AIRecommendationCard({ state }: { state: ReviewState }) {
  if (state.phase === "idle") {
    return (
      <p className="flex items-center justify-center gap-2 text-center text-sm text-ink-soft font-bold">
        <Sparkles className="h-4 w-4 text-clay" />
        Run an AI review to see a fit assessment.
      </p>
    );
  }
  if (state.phase === "loading") {
    return (
      <div className="flex items-center justify-center gap-2 py-2 text-ink-muted font-bold">
        Analyzing fit…
      </div>
    );
  }
  if (state.phase === "error") {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 font-bold">
        <AlertTriangle className="mt-1 h-5 w-5 shrink-0" />
        <div>
          <p className="font-medium">Review failed</p>
          <p>{state.message}</p>
        </div>
      </div>
    );
  }

  const r = state.result;
  return (
    <div className="animate-fadeIn space-y-4 rounded-xl border border-brand/20 bg-brand/[0.04] p-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Fit score
          </p>
          <p className="text-3xl font-bold text-brand">{r.fitScore}/10</p>
        </div>
        <span className="rounded-full bg-brand px-3 py-1 text-sm font-semibold capitalize text-white">
          {r.recommendation.replace("_", " ")}
        </span>
      </div>

      <p className="text-sm text-ink-muted">{r.reasoning}</p>

      {r.risks.length > 0 && <ResultList title="Risks" items={r.risks} />}
      {r.missingInfo.length > 0 && (
        <ResultList title="Missing info" items={r.missingInfo} />
      )}

      <div className="rounded-lg bg-white p-4">
        <p className="text-md font-bold uppercase tracking-wide text-clay">
          Suggested reply
        </p>
        <p className="mt-2 text-sm text-ink-muted">{r.suggestedReply}</p>
      </div>
    </div>
  );
}
