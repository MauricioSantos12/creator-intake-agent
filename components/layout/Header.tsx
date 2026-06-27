import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { campaign } from "@/lib/mockData";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-line bg-white px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand/10">
          <Sparkles className="h-4 w-4 text-brand" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-ink">
            {campaign.brandName}
          </h1>
        </div>
      </div>
      <Link
        href="/"
        className="group flex items-center gap-2 rounded-lg bg-brand px-3 py-1.5
                   text-sm font-semibold text-white transition-colors hover:bg-brand/90"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back
      </Link>
    </header>
  );
}
