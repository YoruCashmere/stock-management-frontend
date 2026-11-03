import { MapPin, Package, Warehouse } from "lucide-react";
import Badge from "../badge.component";
import EntityCard from "./entity.card";

type WarehouseCardType = {
    warehouseName: string;
    location: string;
    products: number;
    capacity: number;
    status: string;
    onClick?: () => void;
};

export default function WarehouseCard({
    warehouseName,
    location,
    products,
    capacity,
    status,
    onClick
}: WarehouseCardType) {

    return (
        <EntityCard className="flex flex-col gap-3">

            {/* Header */}
            <div className="flex items-center justify-between gap-2">

                <div className="flex min-w-0 items-center gap-2">

                    <div className="shrink-0 rounded-lg bg-blue-100 p-2 text-blue-600">
                        <Warehouse size={22} />
                    </div>

                    <h3 className="truncate text-sm font-semibold text-brand-deep">
                        {warehouseName}
                    </h3>

                </div>

                <Badge variant="insight">
                    {status}
                </Badge>

            </div>

            <hr className="border-border" />

            {/* Location */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={14} />
                {location}
            </div>

            {/* Statistics */}
            <div className="flex items-center justify-between gap-2">

                <div className="flex items-center gap-1 text-xs text-brand-deep">
                    <Package size={14} />
                    <span>{products.toLocaleString()} products</span>
                </div>

                <div className="text-xs font-medium text-brand-deep">
                    {capacity}% capacity
                </div>

            </div>

            {/* Capacity Progress */}
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">

                <div
                    className="h-full rounded-full bg-brand-laurel"
                    style={{ width: `${Math.min(100, Math.max(0, capacity))}%` }}
                />

            </div>

            <button
                type="button"
                onClick={onClick}
                className="self-end text-xs font-medium text-blue-600 hover:underline"
            >
                View warehouse →
            </button>

        </EntityCard>
    );
}