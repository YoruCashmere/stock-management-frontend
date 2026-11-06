import Badge from "../badge.component";
import Button from "../button.components";
import type { AlertCodeType, CategoryAlertI } from "../../interfaces/categoryDashboard.interface";

// COMPONENT 5 - AlertCard: one alert with its reason and its buttons.
//
// LESSON: the component does NOT decide what "Approve" does. It only calls `onAction` and tells the
// parent which alert and which button. This is called "lifting state up": the card is dumb and
// reusable, the page (which owns the data) is smart. It also respects FC10 of your spec:
// the system never acts alone, a human presses the button.

const codeLook: Record<AlertCodeType, { label: string; variant: "info" | "insight" | "warning" | "danger" }> = {
    A1: { label: "A1 Ramp-up approaching", variant: "info" },
    A4: { label: "A4 Peak sale candidate", variant: "insight" },
    A5: { label: "A5 Low stock", variant: "warning" },
    A6: { label: "A6 Near expiry", variant: "danger" },
};

const codeActions: Record<AlertCodeType, string[]> = {
    A1: ["Approve", "Decline", "Mute"],
    A4: ["Confirm", "Decline"],
    A5: ["Suggest move", "Mute"],
    A6: ["View batch", "Mute"],
};

type AlertCardType = {
    alert: CategoryAlertI;
    onAction: (alertId: string, action: string) => void;
};

export default function AlertCard({ alert, onAction }: AlertCardType) {
    const look = codeLook[alert.code];
    return (
        <article className="rounded-xl border border-slate-200 p-3">
            <div className="flex items-center justify-between gap-2">
                <Badge variant={look.variant} className="rounded-md px-2 py-0.5 text-xs">{look.label}</Badge>
                <span className="truncate text-xs text-slate-400">{alert.warehouseName}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-800">{alert.title}</p>
            {/* FC8 explainability: a recommendation without a reason is not allowed. */}
            <p className="mt-1 text-xs text-slate-500">Why: {alert.reason}</p>
            <div className="mt-3 flex flex-wrap gap-2">
                {codeActions[alert.code].map((action, index) => (
                    <Button
                        key={action}
                        size="sm"
                        variant={index === 0 ? "primary" : "secondary"}
                        // type="button" stops the button from submitting a form by accident
                        type="button"
                        onClick={() => onAction(alert.id, action)}
                    >
                        {action}
                    </Button>
                ))}
            </div>
        </article>
    );
}
