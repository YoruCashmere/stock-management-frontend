import { cn } from "../utils/cn.utils";
import React from "react";

type SelectType =
    React.SelectHTMLAttributes<HTMLSelectElement> & {
        label?: string;
        error?: string;
    };
function Select({ label, error, children, className, ...props }: SelectType) {
    return(
        <div className="flex flex-col gap-2 fleX-auto">
            {label && <label className="text-sm font-medium text-brand-deep">{label}</label>}
            <select
                className={cn(
                    "rounded-lg border border-brand-laurel px-3 py-2",
                    "bg-white text-brand-deep",
                    "outline-none",
                    "focus:border-brand-forest",
                    className
                )}
                {...props}
            >
                {children}
            </select>
        </div>
    )
   
}

export default Select;