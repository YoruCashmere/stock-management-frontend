import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/sidebar.sidebar";
import UpperLayout from "./upper.layout";

export default function AppLayout() {
    return (
        <div className="flex h-screen w-screen gap-6 p-2 bg-page">
            <Sidebar></Sidebar>
            <main className="overflow-y-auto min-w-0 min-h-0 flex-1">
                <UpperLayout></UpperLayout>
                <div className="min-h-0 flex-1 overflow-y-auto rounded-3xl">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}