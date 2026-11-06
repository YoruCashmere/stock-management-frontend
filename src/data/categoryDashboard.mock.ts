import type { CategoryDashboardI } from "../interfaces/categoryDashboard.interface";

// STEP 2 - FAKE DATA THAT MATCHES THE INTERFACE.
// You can build and style the whole page without waiting for the backend.
// TypeScript will complain if this object ever drifts away from the interface.

export const categoryDashboardMock: CategoryDashboardI = {
    id: "cat-electronics",
    categoryName: "Electronics",
    level: 1,
    lastCalculatedAt: "2026-11-04T00:00:00.000Z",
    totals: {
        unitsSold: 9480,
        revenueXAF: 412600000,
        variantsWithSales: 73,
        totalVariants: 81,
        campaignUnitsExcluded: 640,
    },
    peakSale: { peakSaleName: "Festive Period", startsInDays: 27 },
    topVariants: [
        { productAttributeId: "a1", SKU: "PULSEWAVE-BLUE", unitsSold: 1420, trend: "FAST_MOVING" },
        { productAttributeId: "a2", SKU: "TITAN-SILVER", unitsSold: 1195, trend: "STABLE" },
        { productAttributeId: "a3", SKU: "BASSBOOM-RED", unitsSold: 1008, trend: "FAST_MOVING" },
        { productAttributeId: "a4", SKU: "PULSEWAVE-WHITE", unitsSold: 880, trend: "STABLE" },
        { productAttributeId: "a5", SKU: "NOVA-X12-BLACK", unitsSold: 766, trend: "NEW_UNCERTAIN_TREND" },
    ],
    bottomVariants: [
        { productAttributeId: "b1", SKU: "STACKPRO-BEIGE", unitsSold: 12, trend: "SLOW_MOVING" },
        { productAttributeId: "b2", SKU: "TITAN-BLUE", unitsSold: 31, trend: "SLOW_MOVING" },
        { productAttributeId: "b3", SKU: "NOVA-X12-BLUE", unitsSold: 48, trend: "NEW_UNCERTAIN_TREND" },
        { productAttributeId: "b4", SKU: "SHIELDGRIP-BLUE", unitsSold: 63, trend: "SLOW_MOVING" },
        { productAttributeId: "b5", SKU: "SNEAKER-NEONGREEN", unitsSold: 0, trend: "NEVER_SOLD" },
    ],
    warehouses: [
        { warehouseId: "w1", name: "Douala Central", unitsSold: 2400 },
        { warehouseId: "w2", name: "Yaoundé Main", unitsSold: 1750 },
        { warehouseId: "w3", name: "Douala Port", unitsSold: 1320 },
        { warehouseId: "w4", name: "Bafoussam", unitsSold: 980 },
        { warehouseId: "w5", name: "Garoua", unitsSold: 720 },
        { warehouseId: "w6", name: "Buea", unitsSold: 610 },
    ],
    sales: [
        { date: "2026-01-15", quantity: 420 }, { date: "2026-02-15", quantity: 610 },
        { date: "2026-03-15", quantity: 980 }, { date: "2026-04-15", quantity: 860 },
        { date: "2026-05-15", quantity: 720 }, { date: "2026-06-15", quantity: 540 },
        { date: "2026-07-15", quantity: 430 }, { date: "2026-08-15", quantity: 610 },
        { date: "2026-09-15", quantity: 760 }, { date: "2026-10-15", quantity: 890 },
        { date: "2026-11-02", quantity: 1020 },
    ],
    alerts: [
        {
            id: "al1", code: "A1", title: "Earbuds Blue: restock 180 units", warehouseName: "Douala Central",
            reason: "Peak-window target of 7 days of cover x demand share 60%, current stock 64.",
        },
        {
            id: "al2", code: "A6", title: "Yogurt 500 ml: 3 days to expiry", warehouseName: "Douala Port",
            reason: "Nearest expiry is inside the 14-day urgent window, 42 units left.",
        },
        {
            id: "al3", code: "A5", title: "Speaker Red: 8 units left", warehouseName: "Yaoundé Main",
            reason: "At or below the 10-unit threshold, about 6 days of stock remaining.",
        },
        {
            id: "al4", code: "A4", title: "Nova X12: possible peak sale", warehouseName: "Network",
            reason: "Two sales spikes about one year apart, within the 31-day tolerance. Needs your confirmation.",
        },
    ],
    subCategories: [
        { id: "c2", categoryName: "Laptops", level: 2, products: 24, status: "active" },
        { id: "c3", categoryName: "Smartphones", level: 2, products: 31, status: "active" },
        { id: "c4", categoryName: "Audio Accessories", level: 2, products: 18, status: "active" },
    ],
};
