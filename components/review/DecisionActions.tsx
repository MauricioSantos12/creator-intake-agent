import { Check, HelpCircle, X } from "lucide-react";
import type { Status } from "@/lib/types";
import { DecisionButton } from "@/components/ui/DecisionButton";

export function DecisionActions({
  status,
  onDecide,
}: {
  status: Status;
  onDecide: (status: Status) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 border-t border-line pt-4">
      <DecisionButton
        icon={<Check className="h-4 w-4" />}
        label="Approve"
        onClick={() => onDecide("approved")}
        active={status === "approved"}
        tone="green"
      />
      <DecisionButton
        icon={<HelpCircle className="h-4 w-4" />}
        label="Needs Info"
        onClick={() => onDecide("needs_info")}
        active={status === "needs_info"}
        tone="amber"
      />
      <DecisionButton
        icon={<X className="h-4 w-4" />}
        label="Reject"
        onClick={() => onDecide("rejected")}
        active={status === "rejected"}
        tone="red"
      />
    </div>
  );
}
