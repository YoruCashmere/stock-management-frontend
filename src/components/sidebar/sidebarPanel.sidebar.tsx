import BrandLogo from "./logo.sidebar";
import SidebarNavigator from "./navigator.sidebar";

type SidebarPanelProps = {
    expanded: boolean;
};

export default function SidebarPanel({
    expanded,
}: SidebarPanelProps) {
    return (
        <aside
            className={`h-full overflow-hidden rounded-2xl border border-brand-laurel/30 bg-white shadow-sm transition-all duration-300 ${expanded ? "w-64 p-5 opacity-100" : "w-0 p-0 opacity-0"
                }`}
        >
            <div className="flex h-full min-w-0 flex-col">
                <div className="mb-8">
                    <BrandLogo expanded={expanded} />
                </div>
                <SidebarNavigator expanded={expanded} />
            </div>
        </aside>
    );
}