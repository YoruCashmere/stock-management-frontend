import { Bell, MessageSquare, Moon, Search, Sun, Grid2x2, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function UpperLayout() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <header className="flex items-center justify-between gap-4 bg-page px-6 py-3 rounded-2xl">
            <div className="flex items-center gap-4">

                <div className="flex items-center gap-2 bg-shell rounded-xl border border-slate-100 px-3 py-2 
                            focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20">
                    <Search size={20} className="text-slate-400" />
                    <input
                        autoFocus
                        type="search"
                        placeholder="Search for products, warehouses..."
                        className="w-72 bg-transparent text-sm outline-none placeholder:text-slate-500"
                    />
                </div>

            </div>
            <div className="flex items-center gap-4">
                <button className="relative bg-shell grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-50">
                    <Bell size={20} />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>

                {/* Chat */}
                <button className="grid h-10 bg-shell  w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-50">
                    <MessageSquare size={20} />
                </button>

                {/* Dark mode toggle */}
                <button
                    onClick={() => setDarkMode((p) => !p)}
                    className="grid h-10 bg-shell  w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-50"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Apps grid */}
                <button className="grid h-10 w-10 bg-shell  place-items-center rounded-lg text-slate-600 hover:bg-slate-50">
                    <Grid2x2 size={20} />
                </button>

                {/* Divider */}
                <div className="h-8 w-px bg-slate-800/20" />

                {/* User block */}
                <button className="flex bg-shell  items-center gap-3 rounded-lg px-2 py-1 hover:bg-slate-50">
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="Jprofile pic"
                        className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="text-left leading-tight">
                        <p className="text-sm font-semibold text-slate-800">Joan Taylor</p>
                        <p className="text-xs text-slate-500">Admin</p>
                    </div>
                    <ChevronDown size={16} className="text-slate-400" />
                </button>
            </div>
        </header>
    );
}