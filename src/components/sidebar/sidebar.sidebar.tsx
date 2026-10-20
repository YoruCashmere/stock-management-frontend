import Logo from "./logo.sidebar"
import SidebarNavigator from "./navigator.sidebar"

type sidebarType = {
    expanded: boolean
}
export default function Sidebar({ expanded }: sidebarType) {
    return (
        <aside className={
            `h-full overflow-hidden rounded-2xl border border-brand-laurel/30 bg-white shadow-md 
                transition-all duration-500 ${expanded ? "w-64 p-5 opacity-100" : "w-0 p-0 opacity-0"}`
        }>
            <div className="flex h-full min-w-0 flex-col p-100 m-20">
                <div className="mb-8">
                    <Logo expanded={true} ></Logo>
                </div>
                <SidebarNavigator expanded={true}></SidebarNavigator>
            </div>

        </aside>
    )
}