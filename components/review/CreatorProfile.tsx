import type { Creator } from "@/lib/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Stat } from "@/components/ui/Stat";

export function CreatorProfile({ creator }: { creator: Creator }) {
  return (
    <>
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold text-ink">
            {creator.creatorName}
          </h2>
          <StatusBadge status={creator.status} />
        </div>
        <p className="text-clay text-xs">
          {creator.handle} · {creator.platform}
        </p>
        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <Stat label="Followers" value={creator.followers.toLocaleString()} />
          <Stat label="Engagement" value={`${creator.engagementRate}%`} />
        </div>
        <p className="text-sm text-ink-muted">{creator.audienceSummary}</p>
      </div>

      <div className="rounded-lg bg-cream p-4 flex flex-col gap-2 mb-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-clay">
          Application message
        </p>
        <p className="text-sm text-ink-muted">{creator.applicationMessage}</p>
      </div>
    </>
  );
}
