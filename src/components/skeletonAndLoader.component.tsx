import React from "react";
import { cn } from "../utils/cn.utils";
type LoaderType = {
    size?: "sm" | "md" | 'lg';
    className?: string
}
const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
}

type SkeletonProps = {
    className?: string;
};

function Loader({ size = 'lg' }: LoaderType) {
    return (
        <div className={
            cn(`${sizes[size]} animate-spin rounded-full border-4
             border-brand-cream border-t-brand-laurel`)}>
        </div>
    )
}

function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-gray-200",
                className
            )}
        />
    );
}

export { Loader ,Skeleton }