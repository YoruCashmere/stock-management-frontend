import Card from "./body.card";
import TrendBadge from "./trendBadge.component";
import { panelClass } from "../../utils/styles.utils";
import { formatUnits } from "../../utils/format.utils";
import type { RankedVariantI } from "../../interfaces/categoryDashboard.interface";
// import ProgressionBar from "../progressBar.component";

// COMPONENT 3 - VariantRankingCard: ONE component used TWICE (top 5 and bottom 5).
//
// LESSON: never build "TopFive" and "BottomFive" separately. They look the same, only the data and
// the colour change, so we use a prop (`tone`). This is the heart of reusable components.
//
// LESSON 2: the bar width is a percentage = value / biggest value * 100.
// We take `scaleMax` as a prop so BOTH lists share the same scale: a bar of 12 units next to a bar of
// 1420 units then honestly looks tiny, which is the truth.

type VariantRankingType = {
    title: string;
    subtitle: string;
    items: RankedVariantI[];
    scaleMax: number;
    tone: "best" | "worst";
};

const barColour = { best: "bg-success", worst: "bg-danger" };
const rankColour = { best: "bg-page text-brand-forest", worst: "bg-red-100 text-red-700" };

export default function VariantRankingCard({ title, subtitle, items, scaleMax, tone }: VariantRankingType) {
    return (
        <Card className={panelClass}>
            <h2 className="text-sm font-bold text-slate-800">{title}</h2>
            <p className="mb-2 text-xs text-slate-500">{subtitle}</p>

            {/* Always handle the empty case. A blank card looks like a bug. */}
            {items.length === 0 && <p className="py-6 text-center text-xs text-slate-400">No sales data yet.</p>}

            <ol className="divide-y divide-slate-100">
                {items.map((item, index) => {
                    const width = scaleMax > 0 ? Math.min(100, (item.unitsSold / scaleMax) * 100) : 0;
                    return (
                        // `key` must be a stable unique id. It tells React which row is which when the list changes.
                        <li key={item.productAttributeId} className="flex items-center gap-3 py-2.5">
                            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold ${rankColour[tone]}`}>
                                {index + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-semibold text-slate-700">{item.SKU}</p>
                                <div className="mt-1 flex items-center gap-2">
                                    <TrendBadge trend={item.trend} />
                                </div>
                                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">
                                    <div className={`h-full rounded-full ${barColour[tone]}`} style={{ width: `${width}%` }} />
                                </div>
                                {/* <ProgressionBar initialUnits={25} actualUnits={6}></ProgressionBar> */}

                            </div>
                            <span className="text-sm font-semibold text-slate-800">{formatUnits(item.unitsSold)}</span>
                        </li>
                    );
                })}
            </ol>
        </Card>
    );
}
