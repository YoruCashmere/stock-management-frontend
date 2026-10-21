import { useState } from "react";
import { ChevronsLeft, ChevronsRight, Settings } from "lucide-react";
import { cn } from "../../utils/cn.utils";
import Logo from "./logo.sidebar";
import SidebarNavigator from "./navigator.sidebar";

type SidebarProps = {
    defaultExpanded?: boolean;
    onSettingClick?: () => void;
};

export default function Sidebar({
    defaultExpanded = false,
    onSettingClick,
}: SidebarProps) {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <aside
            className={cn(
                // light outer layer
                "relative flex h-full shrink-0 flex-col items-center rounded-[28px] p-3",
                "bg-linear-to-br from-white to-shell",
                "shadow-[8px_8px_20px_#c9ced4,-6px_-6px_16px_#ffffff]",
                "transition-[width] duration-500 ease-in-out",
                expanded ? "w-64" : "w-19"
            )}
        >
            {/* dark inner layer: grows together with the light one */}
            <div
                className={cn(
                    "overflow-hidden rounded-3xl bg-linear-to-b from-ink to-ink-deep p-1.5",
                    "shadow-[4px_6px_14px_rgba(0,0,0,0.28)]",
                    "transition-[width] duration-500 ease-in-out",
                    expanded ? "w-full" : "w-13"
                )}
            >
                <div className="mb-3">
                    <Logo expanded={expanded} />
                </div>
                <SidebarNavigator expanded={expanded} />
            </div>

            {/* vertical brand text (fades out when expanded) */}
            <div className="flex w-full flex-1 items-center justify-center">
                <span
                    className={cn(
                        "rotate-180 text-[11px] font-semibold tracking-[0.35em] text-brand-laurel",
                        "[writing-mode:vertical-rl] transition-opacity duration-300",
                        expanded ? "opacity-0" : "opacity-80 delay-300"
                    )}
                >
                    STOCKDEMANDLENS
                </span>
            </div>

            {/* settings tile */}
            <button
                type="button"
                onClick={onSettingClick}
                aria-label="Open settings"
                title={!expanded ? "Settings" : undefined}
                className={cn(
                    "flex h-13 items-center gap-3 overflow-hidden rounded-2xl px-4 text-sage",
                    "bg-linear-to-b from-ink to-ink-deep",
                    "shadow-[4px_6px_14px_rgba(0,0,0,0.28)] hover:text-white",
                    "transition-[width] duration-500 ease-in-out",
                    expanded ? "w-full" : "w-13"
                )}
            >
                <span className="grid h-13 w-13 shrink-0 place-items-center">
                    <Settings className="h-5 w-5" />
                </span>
                <span className={cn("whitespace-nowrap pr-4 text-sm font-medium transition-opacity duration-300", expanded ? "opacity-100 delay-200" : "opacity-0")}>
                    Settings
                </span>
            </button>

            {/* dock toggle */}
            <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
                className="absolute -right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-leaf text-white shadow-md hover:bg-leaf-deep"
            >
                {expanded ? <ChevronsLeft size={14} /> : <ChevronsRight size={14} />}
            </button>
        </aside>
    );
}