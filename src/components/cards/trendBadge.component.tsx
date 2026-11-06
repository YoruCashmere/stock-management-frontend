import Badge from "../badge.component";
import type { TrendType } from "../../interfaces/categoryDashboard.interface";

// COMPONENT 1 - TrendBadge: the smallest useful component.
//
// LESSON: wrap an existing component instead of copying it.
// Badge already knows colours and shape. TrendBadge only adds ONE decision: "which trend gets which look".
// A lookup object (a "map") replaces a long if / else chain and is easy to extend.

type BadgeVariant = "success" | "info" | "warning" | "insight" | "pending";

const trendLook: Record<TrendType, { label: string; variant: BadgeVariant }> = {
    FAST_MOVING: { label: "Fast-moving", variant: "success" },
    STABLE: { label: "Stable", variant: "info" },
    SLOW_MOVING: { label: "Slow-moving", variant: "warning" },
    NEW_UNCERTAIN_TREND: { label: "New / uncertain", variant: "insight" },
    NEVER_SOLD: { label: "Never sold", variant: "pending" },
};

export default function TrendBadge({ trend }: { trend: TrendType }) {
    const { label, variant } = trendLook[trend];
    // Badge has big padding by default. Our className wins because your cn() uses tailwind-merge.
    return (
        <Badge variant={variant} className="rounded-md px-2 py-0.5 text-xs">
            {label}
        </Badge>
    );
}
