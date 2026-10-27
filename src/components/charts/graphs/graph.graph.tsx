import { useMemo, useState } from "react";

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import SalesChartControls from "./controls.graph";

import {
    type ChartI,
    type SalesPeriodType,
    buildSaleChartData,
} from "./utils.graph";

function getMonday(date: Date): string {
    const result = new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
        ),
    );

    const day = result.getUTCDay();

    result.setUTCDate(
        result.getUTCDate() - (day === 0 ? 6 : day - 1),
    );

    return [
        result.getUTCFullYear(),
        String(result.getUTCMonth() + 1).padStart(2, "0"),
        String(result.getUTCDate()).padStart(2, "0"),
    ].join("-");
}

function formatDateRange(start: string, days: number): string {
    const [year, month, day] = start.split("-").map(Number);

    const first = new Date(Date.UTC(year, month - 1, day));

    const last = new Date(first);
    last.setUTCDate(last.getUTCDate() + days - 1);

    const formatter = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    });

    return `${formatter.format(first)} – ${formatter.format(last)}`;
}

export default function SalesChart({
    data,
    title = "Sales Overview",
    initialPeriod = "month",
}: ChartI) {
    const today = new Date();

    const [period, setPeriod] =
        useState<SalesPeriodType>(initialPeriod);

    const [year, setYear] = useState(today.getFullYear());

    const [month, setMonth] = useState(today.getMonth());

    const [weekStart, setWeekStart] = useState(
        () => getMonday(new Date()),
    );

    const [dataComplete, setDataComplete] = useState(false);

    const chartData = useMemo(() => {
        return buildSaleChartData(data, {
            period,
            year,
            month,
            weekStart,
            dataComplete,
        });
    }, [data, period, year, month, weekStart, dataComplete]);

    const selectedRange =
        period === "week"
            ? formatDateRange(weekStart, 7)
            : period === "month"
                ? new Intl.DateTimeFormat("en-GB", {
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                }).format(new Date(Date.UTC(year, month, 1)))
                : String(year);

    const knownPoints = chartData.filter(
        (point) => point.quantity !== null,
    );

    const totalSales = knownPoints.reduce(
        (total, point) => total + (point.quantity ?? 0),
        0,
    );

    const allDatesKnown = chartData.every(
        (point) => point.quantity !== null,
    );

    return (
        <section className="w-full min-w-0 rounded-2xl border border-brand-laurel/20 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-brand-deep sm:text-xl">
                            {title}
                        </h2>

                        <p className="text-sm text-brand-deep/60">
                            {selectedRange}
                        </p>
                    </div>

                    <div className="rounded-lg bg-brand-cream px-3 py-2">
                        <p className="text-xs text-brand-deep/60">
                            Recorded sales
                        </p>

                        <p className="text-xl font-bold text-brand-forest">
                            {totalSales.toLocaleString()}
                            <span className="ml-1 text-sm font-medium">
                                units
                            </span>
                        </p>

                        {!allDatesKnown && (
                            <p className="mt-1 text-xs text-brand-deep/60">
                                Partial data; total may be incomplete.
                            </p>
                        )}
                    </div>
                </div>

                <SalesChartControls
                    period={period}
                    year={year}
                    month={month}
                    weekStart={weekStart}
                    onPeriodChange={setPeriod}
                    onYearChange={setYear}
                    onMonthChange={setMonth}
                    onWeekStartChange={setWeekStart}
                />
            </div>

            <div className="h-72 w-full min-w-0 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 12,
                            left: -12,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="label"
                            tick={{ fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={period === "year" ? 8 : 18}
                        />

                        <YAxis
                            allowDecimals={false}
                            tick={{ fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                            width={45}
                        />

                        <Tooltip
                            labelFormatter={(_, payload) => {
                                const point = payload?.[0]?.payload;

                                return point?.date ?? "";
                            }}
                            formatter={(value) => [
                                value === null || value === undefined
                                    ? "No data"
                                    : `${Number(value).toLocaleString()} units`,
                                "Sales",
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey="quantity"
                            name="Units sold"
                            stroke="#285C45"
                            strokeWidth={3}
                            connectNulls={false}
                            dot={{
                                r: period === "year" ? 4 : 2,
                                fill: "#285C45",
                                strokeWidth: 0,
                            }}
                            activeDot={{ r: 6 }}
                            isAnimationActive
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-brand-laurel/20 pt-4">
                <p className="text-xs text-brand-deep/60">
                    {period === "year"
                        ? "Each point represents one month."
                        : "Each point represents one day."}
                </p>

                <button
                    type="button"
                    onClick={() => setDataComplete((previous) => !previous)}
                    className="text-xs font-medium text-brand-forest underline underline-offset-4"
                >
                    {dataComplete
                        ? "Mark data as incomplete"
                        : "Mark data as complete"}
                </button>
            </div>
        </section>
    );
}