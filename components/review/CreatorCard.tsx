import { Sparkles } from "lucide-react";
import type { Creator } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function CreatorCard({
  creator,
  isSelected,
  score,
  onSelect,
}: {
  creator: Creator;
  isSelected: boolean;
  score: number | null;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? "border-brand bg-white shadow-md ring-1 ring-brand/30"
            : "border-line bg-white hover:border-clay/40 hover:shadow-md"
        }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-ink">{creator.creatorName}</p>
          <p className="text-sm text-clay">{creator.handle}</p>
        </div>
        {score !== null && (
          <span className="flex items-center gap-1 rounded-full bg-brand/10 px-2 py-1 text-sm font-semibold text-brand">
            <Sparkles className="h-3 w-3" />
            {score}/10
          </span>
        )}
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-xs text-ink-soft">{creator.platform}</span>
        {creator.status != "pending" && <StatusBadge status={creator.status} />}
      </div>
    </button>
  );
}
