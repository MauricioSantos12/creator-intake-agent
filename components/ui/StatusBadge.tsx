import { Check, X, HelpCircle } from "lucide-react";
import type { Status } from "@/lib/types";

const config: Record<
  Exclude<Status, "pending">,
  { className: string; icon: React.ReactNode }
> = {
  approved: {
    className: "bg-green-100 text-green-700",
    icon: <Check className="h-3 w-3" />,
  },
  rejected: {
    className: "bg-red-100 text-red-700",
    icon: <X className="h-3 w-3" />,
  },
  needs_info: {
    className: "bg-amber-100 text-amber-700",
    icon: <HelpCircle className="h-3 w-3" />,
  },
};

export function StatusBadge({ status }: { status: Status }) {
  if (status === "pending") return null;

  const { className, icon } = config[status];
  return (
    <span
      className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium capitalize ${className}`}
    >
      {icon}
      {status.replace("_", " ")}
    </span>
  );
}
