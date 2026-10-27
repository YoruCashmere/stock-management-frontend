import type { StockLevelI } from "./utils.pie";
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts";
interface StockChartI {
    categories: StockLevelI[],
    title?: string
}
export const stockCategories: StockLevelI[] = [
    {
        id: "north_warehouse",
        name: "North warehouse",
        amount: 2400,
        color: "#075E54",
    },
    {
        id: "south_warehouse",
        name: "South warehouse",
        amount: 2100,
        color: "#003F3A",
    },
    {
        id: "west_warehouse",
        name: "west warehouse",
        amount: 1500,
        color: "#B7D0CA",
    },
    {
        id: "east_warehouse",
        name: "East warehouse",
        amount: 240,
        color: "ink",
    },
    {
        id: "southWest_warehouse",
        name: "South West warehouse",
        amount: 2100,
        color: "ink-active",
    },
    {
        id: "westEast_warehouse",
        name: "west East warehouse",
        amount: 20,
        color: "#B7D0CA",
    },
];

export default function CircularCircleChart({ categories, title = "Expenditure Chart" }: StockChartI) {
    const total = categories.reduce((sum, category) => sum + category.amount, 0);
    const chartData = categories.map((category) => ({
        ...category,
        percentage: total > 0 ? (category.amount / total) * 100 : 0,
    }));
    const formatAmount = (amount: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount);

    return (
        <section className="w-full p-6 rounded-2xl bg-white shadow-sm">
            <div className="mx-auto h-[320px] w-full max-w-[420px]">
                <div className="relative h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="amount"
                                nameKey="name"
                                innerRadius="65%"
                                outerRadius="82%"
                                paddingAngle={5}
                                stroke="none">
                                {chartData.map((category) => (
                                    <Cell
                                        key={category.id}
                                        fill={category.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => [
                                    formatAmount(Number(value))
                                ]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute insert-0 pointer-events-none flex justify-center items-center">
                        <div className="max-w-[150px] text-center">
                            <p className="text-sm font-semi-bold text-gray-600">
                                {title}
                            </p>
                            <p className="mt-2 text-xl font-bold text-gray-900">
                                {formatAmount(total)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 space-y-5">
                {chartData.map((category) => (
                    <div key={category.id} className="flex items-center gap-3">
                        <span className="h-3 rounded-full w-3 h-3 shrink-0"
                            style={{ background: category.color }}>
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm text-gray-600">
                            {category.name}
                        </span>

                        <span className="shrink-0 text-sm font-semibold text-gray-800">
                            {formatAmount(category.amount)}
                        </span>

                        <span className="w-12 shrink-0 text-right text-sm font-semibold text-emerald-800">
                            {Math.round(category.percentage)}%
                        </span>
                    </div>

                ))}
            </div>
        </section>
    )
}
