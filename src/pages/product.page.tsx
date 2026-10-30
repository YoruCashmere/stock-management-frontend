import SalesChart from "../components/charts/graphs/graph.graph";

import type {
    SalesRecordI,
} from "../components/charts/graphs/utils.graph";

export const salesData: SalesRecordI[] = [
    { date: "2026-10-01", quantity: 12 },
    { date: "2026-10-02", quantity: 18 },
    { date: "2026-10-03", quantity: 9 },

    { date: "2026-10-05", quantity: 24 },
    { date: "2026-10-07", quantity: 16 },

    { date: "2026-10-10", quantity: 31 },
    { date: "2026-10-10", quantity: 12 },

    { date: "2026-10-13", quantity: 22 },
    { date: "2026-10-15", quantity: 35 },

    { date: "2026-10-17", quantity: 27 },
    { date: "2026-10-19", quantity: 42 },

    { date: "2026-10-21", quantity: 36 },
    { date: "2026-10-23", quantity: 48 },

    { date: "2026-10-25", quantity: 33 },
    { date: "2026-10-27", quantity: 51 },

    { date: "2026-10-29", quantity: 44 },
    { date: "2026-10-31", quantity: 57 },
];

export default function SalesChartDemo() {
    return (
        <main className="min-h-screen bg-brand-ink p-4 sm:p-8">
            <div className="mx-auto max-w-6xl">
                <SalesChart
                    title="Product Sales"
                    data={salesData}
                    initialPeriod="month"
                />
            </div>
        </main>
    );
}