import { CalendarDays, LayoutDashboard, Pencil } from "lucide-react";
import { cn } from "../../utils/cn.utils";
import Badge from "../badge.component";
import EntityCard from "./entity.card";

type CategoryCardType = {
    level?: number;
    product?: number;
    status: string;
    categoryName: string;
    description?: string;
    lastAnalysis?: string;
    className?: string;
    onEdit?: () => void;
};

export default function CategoryCard({
    level,
    product,
    status,
    categoryName,
    description,
    className,
    lastAnalysis,
    onEdit
}: CategoryCardType) {

    return (
        <EntityCard className={cn("flex flex-col gap-3 border-insight/40 ", className)}>

            <div className="flex items-center justify-between gap-2">

                <div className="flex min-w-0 items-center gap-2">

                    <div className="shrink-0 rounded-lg bg-blue-100 p-2 text-blue-600">
                        <LayoutDashboard size={22} />
                    </div>

                    <h3 className="truncate text-sm font-semibold text-brand-deep">
                        {categoryName}
                    </h3>

                </div>

                {level !== undefined && (
                    <Badge variant="insight">
                        {`Level ${level}`}
                    </Badge>
                )}

            </div>

            <hr className="border-border" />

            <p className="text-xs text-brand-deep">
                {description || `${categoryName} category`}
            </p>
            <div className="flex justify-between gap-5">

                <div>
                    <p className="text-xs text-slate-400">Products</p>
                    <p className="text-sm font-semibold">{product ?? 0}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-400">Status</p>
                    <p className={cn(
                        "text-sm font-semibold capitalize",
                        status.toLowerCase() === "active"
                            ? "text-green-600"
                            : "text-red-500"
                    )}>
                        {status}
                    </p>
                </div>

            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between gap-2">

                <div className="flex min-w-0 items-center gap-2 text-xs text-slate-400">

                    <CalendarDays size={14} />

                    <span className="truncate">
                        {lastAnalysis ? lastAnalysis : "Last Analysis date unavailable"}
                    </span>

                </div>

                <button
                    type="button"
                    onClick={onEdit}
                    aria-label={`Edit ${categoryName}`}
                    className="shrink-0 rounded-md p-1 text-brand-deep transition-colors hover:bg-blue-100 hover:text-blue-600"
                >
                    <Pencil size={15} />
                </button>

            </div>

        </EntityCard>
    );
}