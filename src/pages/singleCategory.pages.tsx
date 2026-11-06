import { useState } from "react";
import { useParams } from "react-router-dom";
import { Banknote, Boxes, Megaphone, ShoppingBasket } from "lucide-react";

import Card from "../components/cards/body.card";
import SalesChart from "../components/charts/graphs/graph.graph";
import WarehouseSalesBarChart from "../components/charts/bar/warehouseSales.bar";
import StatCard from "../components/cards/stat.card";
import VariantRankingCard from "../components/cards/variantRanking.card";
import AlertsPanel from "../components/cards/alertsPanel.card";
import SubCategorySection from "../components/subCategorySection.component";
import CategoryHeader from "../components/categoryHeader.component";
import PeakSaleBanner from "../components/peakSaleBanner.component";
import { Skeleton } from "../components/skeletonAndLoader.component";

import { useCategoryDashboard } from "../utils/categoryDashboard.utils";
import { formatUnits, formatXAF } from "../utils/format.utils";
import { panelClass } from "../utils/styles.utils";
import UserTable from "../components/table/DataTable.table";

// THE PAGE - it owns the data and the state, and ASSEMBLES the small components.
// Reading order: hook gives data -> handle loading and error -> lay out the 3 columns -> subcategories.
//
// Layout idea: `grid-cols-1` on a phone (everything stacked), and on a big screen
// `xl:grid-cols-[18rem_minmax(0,1fr)_20rem]` = left 18rem | centre takes the rest | right 20rem.
// `minmax(0,1fr)` is important: without the 0, a wide chart can push the grid wider than the screen.
// This satisfies FC2 of your spec (display correctly on all screens).

function PageSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-72" />
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[18rem_minmax(0,1fr)_20rem]">
                <div className="space-y-4"><Skeleton className="h-72" /><Skeleton className="h-72" /></div>
                <div className="space-y-4"><Skeleton className="h-24" /><Skeleton className="h-80" /><Skeleton className="h-72" /></div>
                <Skeleton className="h-96" />
            </div>
        </div>
    );
}

export default function SingleCategory() {
    // useParams reads :id from the URL /categories/:id
    const { id } = useParams();
    const { data, isLoading, error } = useCategoryDashboard(id);

    // The page OWNS this state and hands it down to the header (controlled component).
    const [warehouseId, setWarehouseId] = useState("all");

    // Alert buttons are not wired to the backend yet. This is the single place to do it later.
    function handleAlertAction(alertId: string, action: string) {
        console.log("alert action", { alertId, action });
    }

    // Early returns: deal with the unhappy paths FIRST so the main layout below stays simple.
    if (isLoading) return <section className="min-h-full bg-shell p-4 sm:p-5"><PageSkeleton /></section>;

    if (error || !data) {
        return (
            <section className="min-h-full bg-shell p-4 sm:p-5">
                <Card className={panelClass}>
                    <p className="text-sm font-semibold text-danger">Could not load this category</p>
                    <p className="mt-1 text-xs text-slate-500">{error ?? "No data returned."} Refresh the page to try again.</p>
                </Card>
            </section>
        );
    }

    const bestUnits = data.topVariants[0]?.unitsSold ?? 0;

    return (
        <section className="min-h-full space-y-4 bg-shell p-4 sm:p-5">
            <CategoryHeader
                name={data.categoryName}
                level={data.level}
                lastCalculatedAt={data.lastCalculatedAt}
                
            />

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-7">
                {/* LEFT COLUMN: top 5 above, bottom 5 below */}
                <div className="min-w-0 space-y-4 col-span-2">
                    <VariantRankingCard
                        title="Top 5 variants"
                        subtitle="Units sold, completed orders only"
                        items={data.topVariants}
                        scaleMax={bestUnits}
                        tone="best"
                    />
                    <VariantRankingCard
                        title="Bottom 5 variants"
                        subtitle="Lowest units sold"
                        items={data.bottomVariants}
                        scaleMax={bestUnits}
                        tone="worst"
                    />
                </div>

                {/* CENTRE COLUMN: KPIs, banner, sales graph, warehouses */}
                <div className="min-w-0 space-y-4 xl:col-span-3">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <StatCard title="Units sold" value={formatUnits(data.totals.unitsSold)} icon={ShoppingBasket} />
                        <StatCard title="Revenue (XAF)" value={formatXAF(data.totals.revenueXAF)} icon={Banknote} />
                        <StatCard
                            title="Variants with sales"
                            value={`${data.totals.variantsWithSales} / ${data.totals.totalVariants}`}
                            hint={`${data.totals.totalVariants - data.totals.variantsWithSales} never sold`}
                            icon={Boxes}
                        />
                        <StatCard
                            title="Campaign sales excluded"
                            value={formatUnits(data.totals.campaignUnitsExcluded)}
                            hint="units, not counted in velocity"
                            icon={Megaphone}
                            tone="warn"
                        />
                    </div>

                    <PeakSaleBanner peakSale={data.peakSale} />

                    {/* Existing component, reused as it is. */}
                    <SalesChart data={data.sales} title={`Sales of ${data.categoryName}`} initialPeriod="year" />
                    {/* <WarehouseSalesBarChart data={data.warehouses} /> */}

                </div>

                {/* RIGHT COLUMN: alerts */}
                <div className="min-w-0 space-y-5 xl:col-span-2 ">
                    <WarehouseSalesBarChart data={data.warehouses} />
                    <div className="sticky top-5 self-start ">
                        <AlertsPanel alerts={data.alerts} onAction={handleAlertAction} />
                    </div>

                </div>
                <div className="xl:col-span-5 ">
                    <SubCategorySection items={data.subCategories} />
                    {/* <UserTable></UserTable> */}
                </div>
            </div>
        </section>
    );
}
