import Logo from "./logo.sidebar";
type SidebarRailsaType = {
    onSettingClick: () => void;
};
export default function SidebarRail({ onSettingClick }: SidebarRailsaType) {

    return (
        <aside className="flex h-full shrink-0 flex-col rounded-2xl border-brand-laurel/30
                        bg-white py-6 shadow-sm">
            <Logo expanded={true}/>
            <div className="flex-1">
                <button type="button" onClick={() => onSettingClick}
                    aria-label="opened Setting"
                    className="rotate-180 white-nowrap text-xs font-semibold tracking-[0.25em] 
                    text-brand-deep [wrriting-mode:vertical-rl hover:text-brand-forest 
                    ">
                </button>
                Setting
            </div>
        </aside>
    )
}