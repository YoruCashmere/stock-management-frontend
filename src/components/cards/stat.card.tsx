import type { LucideIcon } from "lucide-react";
import Card from "./body.card";
import { panelClass } from "../../utils/styles.utils";

// COMPONENT 2 - StatCard (KPI tile).
//
// LESSON: your singleProduct page defines StatCard INSIDE the page file, so no other page can use it.
// Moving it to its own file makes it reusable. Props are the "settings" of a component:
// same component, different title / value / icon.
//
// `icon: LucideIcon` means "pass the icon itself, not <Icon />". We render it as <Icon /> below.

type StatCardType = {
    title: string;
    value: string;
    hint?: string;
    icon: LucideIcon;
    tone?: "good" | "warn";
};

const toneStyle = {
    good: "bg-emerald-100 text-emerald-700",
    warn: "bg-amber-100 text-amber-600",
};

export default function StatCard({ title, value, hint, icon: Icon, tone = "good" }: StatCardType) {
    return (
        <Card className={`flex min-w-0 items-start gap-3 ${panelClass}`}>
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${toneStyle[tone]}`}>
                <Icon size={20} />
            </div>
            <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500">{title}</p>
                {/* truncate stops a long number from breaking the layout on small screens */}
                <p className="truncate text-xl font-bold text-slate-800">{value}</p>
                {hint && <p className="text-xs text-slate-500">{hint}</p>}
            </div>
        </Card>
    );
}
