import { useState } from "react";

import Card from "../components/cards/body.card";
import Badge from "../components/badge.component";
import ComboBox from "../components/comboBox.component";

import type { warehouseI } from "../interfaces/warehouse.interface";
import type { StockLevelI } from "../components/charts/pie/utils.pie";
import type { SalesRecordI } from "../components/charts/graphs/utils.graph";

import SalesChart from "../components/charts/graphs/graph.graph";
import CircularCircleChart from "../components/charts/pie/circularPieControls.pie";

import {
    ShoppingBasket,
    Package,
    AlertTriangle,
    TrendingUp,
    ShoppingCart,
    Boxes,
    ArrowRight,
    Truck,

} from "lucide-react";
import ProgressionBar from "../components/progressBar.component";
import StockBarChart from "../components/charts/bar/bar.bar";


// ==========================================
// 1. SAMPLE DATA
// ==========================================

const warehouses: warehouseI[] = [
    { id: "w001", warehouseName: "Central Warehouse", position: "cam", region: "lit" },
    { id: "w002", warehouseName: "Littoral Warehouse", position: "cam", region: "lit" },
    { id: "w003", warehouseName: "North West Warehouse", position: "cam", region: "nw" },
    { id: "w004", warehouseName: "South West Warehouse", position: "cam", region: "sw" },
    { id: "w005", warehouseName: "East Warehouse", position: "cam", region: "est" },
    { id: "w006", warehouseName: "Adamawa Warehouse", position: "cam", region: "ada" },
];


// Sales records for the existing SalesChart component.

const salesData: SalesRecordI[] = [
    { date: "2026-05-01", quantity: 520 },
    { date: "2026-05-10", quantity: 300 },
    { date: "2026-05-20", quantity: 400 },

    { date: "2026-06-03", quantity: 800 },
    { date: "2026-06-15", quantity: 600 },

    { date: "2026-07-02", quantity: 900 },
    { date: "2026-07-17", quantity: 750 },

    { date: "2026-08-05", quantity: 1100 },
    { date: "2026-08-18", quantity: 1150 },

    { date: "2026-09-04", quantity: 1300 },
    { date: "2026-09-15", quantity: 1542 },

    { date: "2026-10-02", quantity: 1400 },
    { date: "2026-10-10", quantity: 1600 },
    { date: "2026-10-20", quantity: 2000 },
];


// Stock distribution for the pie chart.

const stockData: StockLevelI[] = [
    {
        id: "w001",
        name: "Central",
        amount: 2340,
        color: "#167C4A",
    },
    {
        id: "w002",
        name: "Littoral",
        amount: 1820,
        color: "#F5B82E",
    },
    {
        id: "w003",
        name: "North West",
        amount: 1540,
        color: "#F49B38",
    },
    {
        id: "w004",
        name: "South West",
        amount: 1240,
        color: "#E94B4B",
    },
    {
        id: "w005",
        name: "East",
        amount: 980,
        color: "#5287B8",
    },
    {
        id: "w006",
        name: "Adamawa",
        amount: 840,
        color: "#8A6BBE",
    },
];


// Sales by warehouse.

const warehouseSales = [
    { name: "Central", amount: 2340 },
    { name: "Littoral", amount: 1820 },
    { name: "North West", amount: 1540 },
    { name: "South West", amount: 1240 },
    { name: "East", amount: 980 },
    { name: "Adamawa", amount: 840 },
];


// Sales performance by variant.

const variants = [
    { sku: "FIL-SELOHKKT", units: 3210 },
    { sku: "FIL-SELOHKKT-B", units: 1240 },
    { sku: "FIL-SELOHKKT-C", units: 620 },
    { sku: "FIL-SELOHKKT-D", units: 178 },
];


// Recent activities.

const recentActivities = [
    {
        id: 1,
        title: "Sale recorded",
        description: "Central Warehouse",
        time: "2h ago",
        quantity: "+120 units",
        icon: ShoppingCart,
        color: "bg-emerald-100 text-emerald-700",
    },
    {
        id: 2,
        title: "Stock received",
        description: "Littoral Warehouse",
        time: "5h ago",
        quantity: "+500 units",
        icon: Package,
        color: "bg-blue-100 text-blue-700",
    },
    {
        id: 3,
        title: "Transfer completed",
        description: "North West → Central",
        time: "1 day ago",
        quantity: "+300 units",
        icon: Truck,
        color: "bg-amber-100 text-amber-700",
    },
    {
        id: 4,
        title: "Low stock alert",
        description: "South West Warehouse",
        time: "1 day ago",
        quantity: "12 units left",
        icon: AlertTriangle,
        color: "bg-red-100 text-red-600",
    },
];


// ==========================================
// 2. REUSABLE KPI CARD
// ==========================================

type StatCardProps = {
    title: string;
    value: string;
    description: string;
    icon: React.ElementType;
    iconColor: string;
    trend?: string;
    trendColor?: string;
};

function StatCard({
    title,
    value,
    description,
    icon: Icon,
    iconColor,
    trend,
    trendColor = "text-success",
}: StatCardProps) {

    return (
        <Card className="flex min-w-0 items-start gap-4 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${iconColor}`}>
                <Icon size={23} />
            </div>

            <div className="min-w-0 flex-1">

                <p className="text-sm font-medium text-slate-500">
                    {title}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-800">
                    {value}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-2">

                    {trend && (
                        <span className={`text-sm font-semibold ${trendColor}`}>
                            {trend}
                        </span>
                    )}

                    <span className="text-xs text-slate-500">
                        {description}
                    </span>

                </div>

            </div>

        </Card>
    );
}


// ==========================================
// 3. MAIN PRODUCT PAGE
// ==========================================

export default function SingleProduct() {

    const [selectedVariant, setSelectedVariant] = useState("w001");

    const totalStock = stockData.reduce(
        (total, warehouse) => total + warehouse.amount,
        0
    );

    const totalUnitsSold = warehouseSales.reduce(
        (total, warehouse) => total + warehouse.amount,
        0
    );

    const totalVariantSales = variants.reduce(
        (total, variant) => total + variant.units,
        0
    );

    return (

        <section className="min-h-full space-y-4 bg-shell p-4 sm:p-5">

            {/* ==================================
                PRODUCT INFORMATION
            ================================== */}

            <Card className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white shadow-sm lg:flex-row lg:items-center">

                {/* Product information */}

                <div className="flex min-w-0 flex-col gap-5 sm:flex-row">

                    {/* Product image placeholder */}

                    <div className="grid h-32 w-full shrink-0 place-items-center rounded-xl bg-brand-cream text-sm text-slate-500 sm:w-32">
                        Product Image
                    </div>

                    {/* Product details */}

                    <div className="min-w-0 space-y-3">

                        <h1 className="text-2xl font-bold text-slate-800">
                            Frozen Ball
                        </h1>

                        <div className="flex flex-wrap items-center gap-3">

                            <p className="text-sm text-slate-500">
                                SKU: FIL-SELOHKKT
                            </p>

                            <Badge
                                variant="success"
                                className="rounded-full px-3 py-1 text-xs"
                            >
                                Active
                            </Badge>

                        </div>

                        <div className="flex flex-wrap gap-10">

                            <div>
                                <p className="text-xs text-slate-400">
                                    Category
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    Fresh Produce
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Brand
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    TechPro
                                </p>
                            </div>

                        </div>

                        <p className="max-w-lg text-sm leading-relaxed text-slate-500">
                            Discover the excellent quality of Frozen Ball,
                            made with carefully selected ingredients.
                        </p>

                    </div>

                </div>


                {/* Variant selector */}

                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end lg:w-auto">

                    <div className="w-full sm:w-64">

                        <ComboBox
                            label="Variant"
                            placeholder="Select variant"
                            warehouses={warehouses}
                            value={selectedVariant}
                            onValueChange={setSelectedVariant}
                            inputClassName="bg-white rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-brand-forest"
                        />

                    </div>
                </div>

            </Card>


            {/* ==================================
                KPI CARDS
            ================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">

                <StatCard
                    title="Total Units Sold"
                    value={totalUnitsSold.toLocaleString()}
                    description="vs previous 30 days"
                    trend="+12%"
                    icon={ShoppingBasket}
                    iconColor="bg-emerald-100 text-emerald-700"
                />

                <StatCard
                    title="Total Stock Available"
                    value={totalStock.toLocaleString()}
                    description="vs previous 30 days"
                    trend="+5%"
                    icon={Boxes}
                    iconColor="bg-emerald-100 text-emerald-700"
                />

                <StatCard
                    title="Low Stock Warehouses"
                    value="2"
                    description="View details"
                    icon={AlertTriangle}
                    iconColor="bg-amber-100 text-amber-600"
                    trendColor="text-amber-600"
                />

                <StatCard
                    title="Top Performing Warehouse"
                    value="Central"
                    description="2,340 units sold"
                    icon={TrendingUp}
                    iconColor="bg-emerald-100 text-emerald-700"
                    trend=""
                />

            </div>


            {/* ==================================
                SALES TREND + STOCK DISTRIBUTION
            ================================== */}

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">

                {/* Sales trend */}

                <div className="min-w-0 xl:col-span-3">

                    <SalesChart
                        data={salesData}
                        title="Sales Trend"
                        initialPeriod="year"
                    />

                </div>


                {/* Stock distribution */}

                <div className="min-w-0 xl:col-span-2">

                    <CircularCircleChart
                        categories={stockData}
                        title="Total Units"
                    />

                </div>

            </div>


            {/* ==================================
                BOTTOM PERFORMANCE ROW
            ================================== */}

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">


                {/* SALES BY WAREHOUSE */}

                <Card className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-4">

                    <div className="mb-5 flex items-center justify-between">

                        <h2 className="text-base font-bold text-slate-800">
                            Sales by Warehouse
                        </h2>

                        <span className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600">
                            Units Sold
                        </span>

                    </div>

                    <div className="h-64 w-full">
                        <StockBarChart></StockBarChart>
                    </div>

                </Card>


                {/* SALES PERFORMANCE BY VARIANT */}

                <Card className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-4">

                    <div className="mb-5">

                        <h2 className="text-base font-bold text-slate-800">
                            Sales Performance by Variant
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Compare units sold across product SKUs.
                        </p>

                    </div>


                    {/* Table heading */}

                    <div className="grid grid-cols-12 gap-2 border-b border-slate-100 pb-3 text-xs font-medium text-slate-400">

                        <span className="col-span-5">
                            Variant
                        </span>

                        <span className="col-span-7">
                            Units Sold / Percentage
                        </span>

                    </div>


                    {/* Variant rows */}

                    <div className="divide-y divide-slate-100">

                        {variants.map((variant, index) => {

                            const percentage = totalVariantSales > 0
                                ? (variant.units / totalVariantSales) * 100
                                : 0;

                            return (

                                <div
                                    key={variant.sku}
                                    className="grid grid-cols-12 items-center gap-2 py-4"
                                >

                                    <div className="col-span-5 min-w-0">

                                        <p className="truncate text-xs font-medium text-slate-700">
                                            {variant.sku}
                                        </p>

                                        {index === 0 && (

                                            <Badge
                                                variant="success"
                                                className="mt-2 rounded-full px-2 py-1 text-[10px]"
                                            >
                                                Best Seller
                                            </Badge>

                                        )}

                                    </div>


                                    <div className="col-span-7 min-w-0">
                                        <ProgressionBar initialUnits={100} actualUnits={percentage}></ProgressionBar>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                </Card>


                {/* RECENT ACTIVITY */}

                <Card className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-4">

                    <div className="mb-5 flex items-center justify-between">

                        <h2 className="text-base font-bold text-slate-800">
                            Recent Activity
                        </h2>

                        <button
                            type="button"
                            className="flex items-center gap-1 text-xs font-semibold text-brand-forest hover:underline"
                        >
                            View All
                            <ArrowRight size={14} />
                        </button>

                    </div>


                    <div className="divide-y divide-slate-100">

                        {recentActivities.map((activity) => {

                            const Icon = activity.icon;

                            return (

                                <div
                                    key={activity.id}
                                    className="flex items-center gap-3 py-3"
                                >

                                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${activity.color}`}>
                                        <Icon size={19} />
                                    </div>


                                    <div className="min-w-0 flex-1">

                                        <p className="truncate text-sm font-semibold text-slate-700">
                                            {activity.title}
                                        </p>

                                        <p className="truncate text-xs text-slate-500">
                                            {activity.description}
                                        </p>

                                    </div>


                                    <div className="shrink-0 text-right">

                                        <p className="text-xs text-slate-400">
                                            {activity.time}
                                        </p>

                                        <p className={`mt-1 text-xs font-semibold ${activity.title === "Low stock alert"
                                            ? "text-red-500"
                                            : "text-success"
                                            }`}>
                                            {activity.quantity}
                                        </p>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                </Card>

            </div>

        </section>

    );

}