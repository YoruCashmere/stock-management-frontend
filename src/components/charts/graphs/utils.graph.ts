export type SalesPeriodType = "week" | "month" | "year";
export interface SalesRecordI {
    date: string;
    quantity: number;
}
export interface SaleChartPointI {
    date: string,
    label: string,
    quantity: number | null
}
export interface ChartI {
    data: SalesRecordI[],
    title?: string,
    initialPeriod: SalesPeriodType
}
export interface SalesChartOptionI {
    period: SalesPeriodType,
    year: number,
    month: number,
    weekStart: string,
    dataComplete: boolean
}
export interface SalesChartControlsI {
    period: SalesPeriodType;
    year: number;
    month: number;
    weekStart: string;
    onPeriodChange: (period: SalesPeriodType) => void;
    onYearChange: (year: number) => void;
    onMonthChange: (month: number) => void;
    onWeekStartChange: (date: string) => void;
}
const DAY_IN_MS = 24 * 60 * 60 * 1000;

function parseDate(date: string) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!match) throw new Error(`Invalid date format: ${date}`);
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const parsedDate = new Date(Date.UTC(year, month - 1, day));
    return parsedDate;
}
function formatDate(date: Date): string {
    return [
        date.getUTCFullYear(),
        String(date.getUTCMonth() + 1).padStart(2, "0"),
        String(date.getUTCDay()).padStart(2, "0")
    ].join("-");
}
function addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + days * DAY_IN_MS);
}

function getPeriodBound(option: SalesChartOptionI) {
    const { period, month, weekStart, year } = option;
    if (period == 'week') {
        const start = parseDate(weekStart);
        if (start.getUTCDay() != 1) throw new Error("The selected week must start on monday");
        return {
            start,
            end: addDays(start, 6)
        };
    }

    if (period === "month") {
        const start = new Date(Date.UTC(year, month, 1));
        return {
            start,
            end: new Date(Date.UTC(year, month + 1, 0))
        }
    }
    return {
        start: new Date(Date.UTC(year, 0, 1)),
        end: new Date(Date.UTC(year, 11, 31))
    }
}

function getDayLabel(date: Date): string {
    return Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        timeZone: "UTC"
    }).format(date);
}
function getMonthLabel(date: Date): string {
    return new Intl.DateTimeFormat("en-GB", {
        month: "short",
        timeZone: "UTC",
    }).format(date);
}
export function buildSaleChartData(
    records: SalesRecordI[],
    options: SalesChartOptionI
): SaleChartPointI[] {
    const { period, dataComplete } = options;
    const { start, end } = getPeriodBound(options);
    const totals = new Map<string, number>();
    for (const record of records) {
        const date = parseDate(record.date);
        if (!Number.isFinite(record.quantity) || record.quantity < 0) {
            throw new Error(`Invalid sales quantity for ${record.date}`);
        }
        if (date < start || date > end) continue;
        const key = period === "year" ? record.date.slice(0, 7) : record.date;
        totals.set(
            key, (totals.get(key) ?? 0) + record.quantity
        );
    }
    const points: SaleChartPointI[] = [];

    if (period === "year") {
        for (let month = 0; month < 12; month++) {
            const date = new Date(
                Date.UTC(start.getUTCFullYear(), month, 1),
            );

            const key = formatDate(date).slice(0, 7);

            points.push({
                date: key,
                label: getMonthLabel(date),
                quantity: totals.has(key)
                    ? totals.get(key)!
                    : dataComplete
                        ? 0
                        : null,
            });
        }

        return points;
    }

    for (
        let timestamp = start.getTime();
        timestamp <= end.getTime();
        timestamp += DAY_IN_MS
    ) {
        const date = new Date(timestamp);
        const key = formatDate(date);

        points.push({
            date: key,
            label: getDayLabel(date),
            quantity: totals.has(key)
                ? totals.get(key)!
                : dataComplete
                    ? 0
                    : null,
        });
    }

    return points;
}