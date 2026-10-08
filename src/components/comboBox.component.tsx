import React, { useState } from "react";
import { type warehouseI } from "../interfaces/warehouse.interface";
import { cn } from "../utils/cn.utils";

type ComboBoxType = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className" | "value" | "onChange"
> & {
    warehouses: warehouseI[];
    label?: string;
    placeholder?: string;
    value: string;
    onValueChange: (value: string) => void;
    className?: string;
    inputClassName?: string;
};

function ComboBox({
    warehouses,
    label,
    placeholder = "Select warehouse",
    value,
    onValueChange,
    className,
    inputClassName,
    ...props
}: ComboBoxType) {
    const [isOpen, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const selectedOption = warehouses.find(
        (warehouse) => String(warehouse.id) === String(value)
    );

    const filteredWarehouses = warehouses.filter((warehouse) =>
        warehouse.warehouseName
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const handleSelect = (warehouse: warehouseI) => {
        onValueChange(String(warehouse.id));
        setSearch("");
        setOpen(false);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newSearch = e.target.value;

        setSearch(newSearch);
        setOpen(true);
    };

    const handleFocus = () => {
        setOpen(true);
        setSearch("");
    };

    return (
        <div
            className={cn("relative w-full", className)}
            onBlur={(e) => {
                if (
                    !e.currentTarget.contains(
                        e.relatedTarget as Node | null
                    )
                ) {
                    setOpen(false);
                    setSearch("");
                }
            }}
        >
            {label && (
                <label className="mb-2 block text-sm font-medium text-brand-forest">
                    {label}
                </label>
            )}

            <div className="relative w-full">
                <input
                    {...props}
                    value={
                        isOpen
                            ? search
                            : selectedOption?.warehouseName ?? ""
                    }
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    placeholder={
                        isOpen
                            ? placeholder
                            : selectedOption?.warehouseName ?? placeholder
                    }
                    className={cn(
                        "w-full rounded-md border border-brand-laurel",
                        "bg-brand-forest px-3 py-2 pr-10 text-white outline-none",
                        "focus:border-brand-forest placeholder:text-white/60",
                        inputClassName
                    )}
                />

                <button
                    type="button"
                    tabIndex={-1}
                    onMouseDown={(e) => {
                        e.preventDefault();
                    }}
                    onClick={() => {
                        setOpen((prev) => !prev);

                        if (!isOpen) {
                            setSearch("");
                        }
                    }}
                    className="
                        absolute right-2 top-1/2 flex h-7 w-7
                        -translate-y-1/2 items-center justify-center
                        rounded-md text-white hover:bg-white/10
                    "
                >
                    ⌄
                </button>
            </div>

            {isOpen && (
                <div
                    className="
                        absolute left-0 top-full z-50 mt-1 max-h-[25vh]
                        w-full overflow-y-auto rounded-md
                        border border-brand-laurel bg-brand-forest
                        shadow-lg
                    "
                >
                    {filteredWarehouses.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-white/70">
                            No warehouses found
                        </div>
                    ) : (
                        filteredWarehouses.map((warehouse) => (
                            <button
                                key={warehouse.id}
                                type="button"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                }}
                                onClick={() => {
                                    handleSelect(warehouse);
                                }}
                                className={cn(
                                    "block w-full px-3 py-2 text-left text-white",
                                    "hover:bg-white/10",
                                    String(warehouse.id) ===
                                        String(value) &&
                                        "bg-white/20"
                                )}
                            >
                                {warehouse.warehouseName}
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default ComboBox;

