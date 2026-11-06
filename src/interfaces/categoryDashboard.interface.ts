// STEP 1 - DESCRIBE YOUR DATA BEFORE YOU DRAW ANYTHING.
// Every component below receives one of these shapes as props.
// If the backend later returns a slightly different shape, you only fix ONE place (the hook).

// The five trend classes from the Functional Specification (FP2) and your salesVelocity service.
export type TrendType =
    | "FAST_MOVING"
    | "STABLE"
    | "SLOW_MOVING"
    | "NEW_UNCERTAIN_TREND"
    | "NEVER_SOLD";

// One row in the "Top 5" and "Bottom 5" lists.
export interface RankedVariantI {
    productAttributeId: string;
    SKU: string;
    unitsSold: number;
    trend: TrendType;
}

// One bar in the "Best selling warehouses" chart.
export interface WarehouseSalesI {
    warehouseId: string;
    name: string;
    unitsSold: number;
}

// The alert codes come from Section 7 of the Functional Specification.
export type AlertCodeType = "A1" | "A4" | "A5" | "A6";

export interface CategoryAlertI {
    id: string;
    code: AlertCodeType;
    title: string;
    warehouseName: string;
    // FC8 (explainability): every recommendation must say WHY.
    reason: string;
}

// One level 2 category card. Same fields CategoryCard already accepts.
export interface SubCategorySummaryI {
    id: string;
    categoryName: string;
    level: number;
    products: number;
    status: string;
}

export interface PeakSaleBannerI {
    peakSaleName: string;
    startsInDays: number;
}

// The whole page in one object: one request, one loading state.
export interface CategoryDashboardI {
    id: string;
    categoryName: string;
    level: number;
    lastCalculatedAt: string; // ISO date string
    totals: {
        unitsSold: number;
        revenueXAF: number;
        variantsWithSales: number;
        totalVariants: number;
        campaignUnitsExcluded: number;
    };
    peakSale: PeakSaleBannerI | null;
    topVariants: RankedVariantI[];
    bottomVariants: RankedVariantI[];
    warehouses: WarehouseSalesI[];
    sales: { date: string; quantity: number }[]; // same shape SalesChart already expects
    alerts: CategoryAlertI[];
    subCategories: SubCategorySummaryI[]; // may be an empty array
}
