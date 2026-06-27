type Tone = "green" | "amber" | "red";

const tones: Record<Tone, string> = {
  green: "border-green-300 text-green-700 hover:bg-green-50",
  amber: "border-amber-300 text-amber-700 hover:bg-amber-50",
  red: "border-red-300 text-red-700 hover:bg-red-50",
};

const activeTones: Record<Tone, string> = {
  green: "bg-green-600 text-white border-green-600",
  amber: "bg-amber-500 text-white border-amber-500",
  red: "bg-red-600 text-white border-red-600",
};

export function DecisionButton({
  icon,
  label,
  onClick,
  active,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
  tone: Tone;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 cursor-pointer
        text-sm font-medium transition-all ${
          active ? activeTones[tone] : tones[tone]
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
