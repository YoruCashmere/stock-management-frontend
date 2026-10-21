import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import SidebarRail from "./rails.sidebar";
import SidebarPanel from "./sidebarPanel.sidebar";

export default function Sidebar() {
    const [expanded, setExpanded] = useState(true);

    function toggleSidebar() {
        setExpanded((currentExpanded) => !currentExpanded);
    }

    function handleSettingsClick() {
        console.log("Settings clicked");
    }

    return (
        <div className="flex h-full shrink-0 items-stretch gap-3">
            <div className="relative flex h-full shrink-0">
                <SidebarRail
                    onSettingClick={handleSettingsClick}
                />

                <button
                    type="button"
                    onClick={toggleSidebar}
                    aria-label={
                        expanded ? "Collapse sidebar" : "Expand sidebar"
                    }
                    title={
                        expanded ? "Collapse sidebar" : "Expand sidebar"
                    }
                    className="absolute -right-2 top-8 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-brand-laurel/40 bg-white text-brand-deep shadow-sm transition-colors hover:bg-brand-cream"
                >
                    {expanded ? (
                        <PanelLeftClose size={16} />
                    ) : (
                        <PanelLeftOpen size={16} />
                    )}
                </button>
            </div>

            <SidebarPanel expanded={expanded} />
        </div>
    );
}