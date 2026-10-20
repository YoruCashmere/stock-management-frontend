type BrandLogo = { expanded: boolean };
export default function Logo({ expanded }: BrandLogo) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 rounded-2xl items-center justify-center brand-deep-green text-blue-500">
                <span className="font-bold text-sm">
                    s
                </span>
            </div>
            {
                expanded && (
                    <div className="text-lg white-space font-bold text-brand-deep">
                        StockDemandLense
                    </div>
                )
            }
        </div>
    )
}