import { Leaf } from "lucide-react";
import { cn } from "../../utils/cn.utils";

type LogoProps = { expanded: boolean };

export default function Logo({ expanded }: LogoProps) {
    return (
        <div className="flex h-11 items-center justify-center gap-3 px-2.5">
            <Leaf className="h-5 w-5 shrink-0 text-sage" />
            <span
                className={cn(
                    "whitespace-nowrap text-sm font-bold tracking-wide text-white transition-opacity duration-300",
                    expanded ? "opacity-100 delay-200" : "opacity-0 " 
                )}
            >
                StockDemandLens
            </span>
        </div>
    );
}