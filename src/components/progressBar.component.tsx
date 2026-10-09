import { useState, useEffect } from "react";
type ProgressBarType = {
    initialUnits: number,
    actualUnits: number,
}
export default function ProgressionBar({ initialUnits, actualUnits }: ProgressBarType) {
    const percentage = initialUnits > 0 ? (actualUnits / initialUnits) * 100 : 0;
    const safePercentage = Math.min(Math.max(0, percentage), 100);
    const gaugeColours = safePercentage == 0 ? "bg-red-700" : safePercentage <= 20 ? "bg-red-500" :
        safePercentage <= 50 ? "bg-amber-500" : "bg-green-500";
    const trackPercentage = safePercentage === 0 ? "bg-red-950" : "bg-brand-laurel";
    const [animationPercent, setAnimationPercent] = useState(100);
    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setAnimationPercent(safePercentage);
        })
        return () => cancelAnimationFrame(frame)
    },[safePercentage] )
    return (
        <div className="w-full min-w-24 space-y-1">
            <div className="flex item-center justify-between gap-2 text-xs">
                <span className="text-gray-500">
                    {actualUnits}/{initialUnits}
                </span>
                <span>
                    {Math.round(safePercentage)}%
                </span>
            </div>
            <div className={`overflow-hidden rounded-full ${trackPercentage} h-4`}
                role="progressbar"
                aria-label="i dont know its use"
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={safePercentage}
            >
                <div className={`h-full  rounded-full transition-[width] duration-700 ease-out ${gaugeColours}`}
                    style={{ width: `${animationPercent}%` }}>
                </div>
            </div>


        </div>
    )
}