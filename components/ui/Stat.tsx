export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line p-2 px-3 flex flex-col gap-2">
      <p className="text-xs text-ink-soft">{label}</p>
      <p className="font-semibold text-ink">{value}</p>
    </div>
  );
}
