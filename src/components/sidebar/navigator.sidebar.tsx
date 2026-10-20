import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Warehouse,
    ArrowLeftRight,
    ClipboardList,
    ChartNoAxesCombined,
    Sidebar,
} from "lucide-react";

const navigationItems = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Inventory",
        path: "/inventory",
        icon: Package,
    },
    {
        label: "Warehouses",
        path: "/warehouses",
        icon: Warehouse,
    },
    {
        label: "Transfers",
        path: "/transfers",
        icon: ArrowLeftRight,
    },
    {
        label: "Restock Suggestions",
        path: "/restock",
        icon: ClipboardList,
    },
    {
        label: "Reports",
        path: "/reports",
        icon: ChartNoAxesCombined,
    },
    {
        label: "Sidebar",
        path: "/sidebar",
        icon: Sidebar,
    }
];

type SidebarNavigationProps = {
    expanded: boolean;
};

export default function SidebarNavigator({
    expanded,
}: SidebarNavigationProps) {
    return (
        <nav className="flex flex-col gap-3 p-200">
            {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        title={!expanded ? item.label : undefined}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${isActive
                                ? "bg-brand-deep text-white"
                                : "text-brand-deep hover:bg-brand-laurel/20"
                            } ${expanded ? "" : "justify-center"}`
                        }
                    >
                        <Icon className="h-5 w-5 shrink-0" />

                        {expanded && (
                            <span className="whitespace-nowrap text-sm font-medium">
                                {item.label}
                            </span>
                        )}
                    </NavLink>
                );
            })}
        </nav>
    );
}