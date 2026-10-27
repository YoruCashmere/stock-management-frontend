import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/sidebar.sidebar";

export default function AppLayout() {
    return (
        <div className="flex h-screen w-screen gap-6 bg-page p-2">
            <Sidebar></Sidebar>
            <main className="overflow-y-auto  min-w-0 min-h-0 flex-1 rounded-3xl bg-shell">
                <Outlet/>
            </main>
        </div>
    )
}