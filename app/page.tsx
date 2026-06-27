import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { campaign } from "@/lib/mockData";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-8 px-6">
      <div className="max-w-lg text-center">
        <h1 className="mt-2 text-5xl font-bold text-ink">
          Creator Intake Review Agent
        </h1>
        <p className="mt-6 text-lg text-ink-muted font-medium">
          Review creator applications for {campaign.campaignName}, run an AI fit
          assessment, and decide the next action.
        </p>
      </div>

      <Link
        href="/review"
        className="group flex items-center gap-2 rounded-lg bg-brand px-6 py-3
                   font-semibold text-white transition-colors hover:bg-brand/90"
      >
        Start reviewing
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </main>
  );
}
