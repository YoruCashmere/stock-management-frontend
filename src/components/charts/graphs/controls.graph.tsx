import type { SalesChartControlsI } from "./utils.graph";


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const inputClass =
    "rounded-lg border border-brand-laurel/40 bg-white px-3 py-2 text-sm text-brand-deep outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20";

const buttonClass =
    "rounded-lg px-3 py-2 text-sm font-medium transition-colors";

export default function SalesChartControls({
    period,
    year,
    month,
    weekStart,
    onPeriodChange,
    onYearChange,
    onMonthChange,
    onWeekStartChange,
}: SalesChartControlsI) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-lg bg-brand-cream p-1">
                {(["week", "month", "year"] as const).map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => onPeriodChange(option)}
                        aria-pressed={period === option}
                        className={`${buttonClass} ${period === option
                            ? "bg-brand-forest text-white shadow-sm"
                            : "text-brand-deep hover:bg-white"
                            }`}
                    >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                ))}
            </div>

            {period === "week" && (
                <label className="flex flex-col gap-1 text-xs font-medium text-brand-deep">
                    Week starting Monday

                    <input
                        type="date"
                        value={weekStart}
                        onChange={(event) =>
                            onWeekStartChange(event.target.value)
                        }
                        className={inputClass}
                    />
                </label>
            )}

            {period === "month" && (
                <label className="flex flex-col gap-1 text-xs font-medium text-brand-deep">
                    Month

                    <select
                        value={month}
                        onChange={(event) =>
                            onMonthChange(Number(event.target.value))
                        }
                        className={inputClass}
                    >
                        {months.map((name, index) => (
                            <option key={name} value={index}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
            )}

            {period !== "week" && (
                <label className="flex flex-col gap-1 text-xs font-medium text-brand-deep">
                    Year

                    <select
                        value={year}
                        onChange={(event) =>
                            onYearChange(Number(event.target.value))
                        }
                        className={inputClass}
                    >
                        {Array.from(
                            { length: 10 },
                            (_, index) => new Date().getFullYear() - 5 + index,
                        ).map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </label>
            )}
        </div>
    );
}