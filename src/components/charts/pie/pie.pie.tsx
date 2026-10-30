import StockBarChart from "../bar/bar.bar";
import CircularCircleChart from "./circularPieControls.pie";
import { stockCategories } from "./circularPieControls.pie"

export default function StockChartTest() {
    return (
        <main className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-md flex gap-5">
                <CircularCircleChart
                    categories={stockCategories}
                    title="Expenditure Category"
                />
                <StockBarChart ></StockBarChart>
            </div>
        </main>
    )
}