import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn.utils";

type InputType = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    /** Icon shown inside the input, on the right side. */
    icon?: ReactNode;
    /** Anything shown on the right of the label row (a badge, a button...). */
    labelAction?: ReactNode;
    /** Extra classes for the <label> (e.g. a bigger font on desktop). */
    labelClassName?: string;
};

// For <input type="date">: hide the browser's own calendar icon but keep it
// clickable (stretched over the right side), so OUR icon shows instead.
const dateIndicator = cn(
    "[&::-webkit-calendar-picker-indicator]:absolute",
    "[&::-webkit-calendar-picker-indicator]:inset-y-0",
    "[&::-webkit-calendar-picker-indicator]:right-0",
    "[&::-webkit-calendar-picker-indicator]:h-full",
    "[&::-webkit-calendar-picker-indicator]:w-14",
    "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
    "[&::-webkit-calendar-picker-indicator]:opacity-0"
);

export default function Input({
    id,
    label,
    error,
    icon,
    labelAction,
    labelClassName,
    className,
    type,
    ...props
}: InputType) {
    // Use the supplied id, or generate one from the label.
    const inputId = id ?? label?.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    return (
        <div className="flex min-w-0 flex-1 flex-col gap-2">
            {/* Label row: label on the left, optional action on the right */}
            {(label || labelAction) && (
                <div className="flex min-h-8 items-center justify-between gap-2">
                    {label && (
                        <label
                            htmlFor={inputId}
                            className={cn(
                                "text-sm font-medium text-brand-deep",
                                labelClassName
                            )}
                        >
                            {label}
                        </label>
                    )}
                    {labelAction}
                </div>
            )}

            {/* `relative` lets us place the icon on top of the input */}
            <div className="relative">
                <input
                    id={inputId}
                    type={type}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    className={cn(
                        "w-full min-w-0 rounded-lg border ",
                        "border-brand-laurel bg-white text-brand-deep",
                        "outline-none transition-colors duration-200",
                        "placeholder:text-gray-400",
                        "focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20",
                        "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70",
                        error && "border-danger focus:border-danger focus:ring-danger/20",
                        type === "date" && dateIndicator,
                        className,
                        // LAST on purpose: reserves room for the icon and
                        // can't be overridden by a px-* in className.
                        icon && "pr-14"
                    )}
                    {...props}
                />

                {icon && (
                    <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-slate-500">
                        {icon}
                    </span>
                )}
            </div>

            {error && (
                <p
                    id={`${inputId}-error`}
                    className="text-sm text-danger"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    );
}
