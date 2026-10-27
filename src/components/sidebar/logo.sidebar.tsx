import { Leaf } from "lucide-react";
import { cn } from "../../utils/cn.utils";

type LogoProps = { expanded: boolean };

export default function Logo({ expanded }: LogoProps) {
    return (
        <div className="flex h-10 items-center">
            <span className="grid h-10 w-10 shrink-0 place-items-center">
                <Leaf className="h-5 w-5 text-sage" />
            </span>
            <span className={cn("whitespace-nowrap pr-3 text-sm font-bold text-white transition-opacity duration-300", expanded ? "opacity-100 delay-200" : "opacity-0")}>
                StockDemandLens
            </span>
        </div>
    );
}