import type React from "react";
import { cn } from "../../utils/cn.utils";

type EntityCardType = {
    children: React.ReactNode;
    className?: string;
};

export default function EntityCard({ children, className }: EntityCardType) {
    return (
        <article className={cn(
            "rounded-xl border border-border bg-shell p-3 shadow-md",
            "transition ease-in duration-250 hover:shadow-[10px_10px_5px_#374151]/20 hover:translate-x-3 hover:translate-y-3",
            // "",
            className
        )}>
            {children}
        </article>
    );
}