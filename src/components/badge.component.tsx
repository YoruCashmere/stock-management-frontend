import type React from "react"
import { cn } from "../utils/cn.utils";


const variantStyles = {
    success: "bg-success text-white",
    danger: "bg-danger text-white",
    warning: "bg-warning text-white",
    info: "bg-info text-white",
    insight: "bg-insight text-white",
    pending: "bg-pending text-black",
};
type badgeType = "info" | "danger" | "success" | "warning" | "insight" | "pending";

type BadgeType = {
    children: React.ReactNode;
    variant?: badgeType;
    className?: string
}



function Badge({ children, variant = "danger", className = "" }: BadgeType) {
return(
    <span className={cn("inline-flex items-center rounded-xl px-3 py-2 text-md font-medium" ,`${variantStyles[variant]} ${className}`)}>
        {children}
    </span>
)
}

export default Badge