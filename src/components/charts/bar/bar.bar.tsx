import { stockCategories } from "../pie/circularPieControls.pie";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function StockBarChart() {
    return (
        <section className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-brand-deep">
                    Sales Overview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Monthly units sold
                </p>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={stockCategories}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -15,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#799fea"
                        />

                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                        />

                        <Tooltip />

                        <Bar
                            dataKey="amount"
                            fill="#2A6151"
                            radius={[6, 6, 0, 0]}
                            maxBarSize={42}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
