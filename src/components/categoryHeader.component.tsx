import { Clock } from "lucide-react";
import Badge from "./badge.component";
import { formatDateTime } from "../utils/format.utils";

// COMPONENT 8 - CategoryHeader: title, level, "last calculated" and the warehouse scope.
//
// LESSON: this is a CONTROLLED component. It does not store the selected warehouse itself.
// The parent passes `warehouseId` (the value) and `onWarehouseChange` (what to do on change).
// One owner of the state = no two parts of the page ever disagree.
// Spec link: FP4 (show last calculation date) and FC13 (scope to a warehouse).

type CategoryHeaderType = {
    name: string;
    level: number;
    lastCalculatedAt: string;
    
};

export default function CategoryHeader({
    name, level, lastCalculatedAt,
}: CategoryHeaderType) {
    return (
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="text-xs text-slate-500">Catalogue / Categories</p>
                <div className="mt-1 flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-brand-deep">{name}</h1>
                    <Badge variant="insight" className="rounded-md px-2 py-0.5 text-xs">{`Level ${level}`}</Badge>
                </div>
            </div>

            <div className="flex flex-wrap items-end gap-3">
                <span className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                    <Clock size={14} />
                    Analysis calculated {formatDateTime(lastCalculatedAt)}
                </span>
            </div>
        </header>
    );
}
