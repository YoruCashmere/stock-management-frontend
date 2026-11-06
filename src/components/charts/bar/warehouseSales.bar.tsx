import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Card from "../../cards/body.card";
import Badge from "../../badge.component";
import { panelClass } from "../../../utils/styles.utils";
import { formatUnits } from "../../../utils/format.utils";
import type { WarehouseSalesI } from "../../../interfaces/categoryDashboard.interface";

// COMPONENT 4 - WarehouseSalesBarChart.
//
// LESSON: your existing StockBarChart imports FIXED data (stockCategories) inside the file, so it can
// only ever show that one dataset. A reusable chart takes its data as a PROP. That is the only change.
//
// LESSON 2: Recharts <Cell> lets you colour ONE bar differently. The best warehouse is green,
// the others are grey, so the eye goes to the winner first. Colour should carry meaning.

type WarehouseSalesType = {
    data: WarehouseSalesI[];
    title?: string;
};

export default function WarehouseSalesBarChart({ data, title = "Best selling warehouses" }: WarehouseSalesType) {
    // Sort a COPY ([...data]). Never sort props directly: it would change the parent's array.
    const sorted = [...data].sort((a, b) => b.unitsSold - a.unitsSold);
    const total = sorted.reduce((sum, row) => sum + row.unitsSold, 0);
    const leader = sorted[0];
    const leaderShare = leader && total > 0 ? Math.round((leader.unitsSold / total) * 100) : 0;

    return (
        <Card className={panelClass}>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                <div>
                    <h2 className="text-sm font-bold text-slate-800">{title}</h2>
                    <p className="text-xs text-slate-500">Units sold in this category</p>
                </div>
                {leader && (
                    <Badge variant="success" className="rounded-md px-2 py-0.5 text-xs">
                        {leader.name} leads, {leaderShare}%
                    </Badge>
                )}
            </div>

            {/* ResponsiveContainer needs a parent with a real height, or the chart is invisible. */}
            <div className="h-60 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sorted} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip formatter={(value) => [`${formatUnits(Number(value))} units`, "Sales"]} />
                        <Bar dataKey="unitsSold" radius={[6, 6, 0, 0]} maxBarSize={42}>
                            {sorted.map((row, index) => (
                                <Cell key={row.warehouseId} fill={index === 0 ? "#2A6151" : "#B2B7AA"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
