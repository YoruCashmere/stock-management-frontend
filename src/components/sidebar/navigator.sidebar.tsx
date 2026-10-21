import { NavLink } from "react-router-dom";
import {
    LayoutDashboard, Package, Warehouse,
    ArrowLeftRight, ClipboardList, ChartNoAxesCombined,
} from "lucide-react";
import { cn } from "../../utils/cn.utils";

const navigationItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Inventory", path: "/inventory", icon: Package },
    { label: "Warehouses", path: "/warehouses", icon: Warehouse },
    { label: "Transfers", path: "/transfers", icon: ArrowLeftRight },
    { label: "Restock Suggestions", path: "/restock", icon: ClipboardList },
    { label: "Reports", path: "/reports", icon: ChartNoAxesCombined },
];

type Props = { expanded: boolean };

export default function SidebarNavigator({ expanded }: Props) {
    return (
        <ul className="flex flex-col gap-2">
            {navigationItems.map(({ label, path, icon: Icon }) => (
                <li key={path}>
                    <NavLink
                        to={path}
                        title={!expanded ? label : undefined}
                        className={({ isActive }) =>
                            cn(
                                "flex h-10 items-center overflow-hidden rounded-xl transition-colors",
                                isActive
                                    ? "bg-ink-active text-white ring-1 ring-inset ring-white/15"
                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                            )
                        }
                    >
                        <span className="grid h-10 w-10 shrink-0 place-items-center">
                            <Icon className="h-5 w-5" />
                        </span>
                        <span
                            className={cn(
                                "whitespace-nowrap pr-3 text-sm font-medium transition-opacity duration-300",
                                expanded ? "opacity-100 delay-200" : "opacity-0"
                            )}
                        >
                            {label}
                        </span>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}