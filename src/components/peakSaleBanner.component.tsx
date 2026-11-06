import { Flag } from "lucide-react";
import { RAMP_UP_LEAD_DAYS } from "../utils/policy.utils";
import type { PeakSaleBannerI } from "../interfaces/categoryDashboard.interface";

// COMPONENT 9 - PeakSaleBanner: conditional rendering.
//
// `peakSale` can be null (no peak sale coming). A component that may have nothing to show returns null.
// Spec link: FP6 and rule R6 (ramp-up watch starts 21 days before a peak sale).

export default function PeakSaleBanner({ peakSale }: { peakSale: PeakSaleBannerI | null }) {
    if (!peakSale) return null;
    const inRampUp = peakSale.startsInDays <= RAMP_UP_LEAD_DAYS;

    return (
        <div className="flex items-center gap-2 rounded-xl border border-info/30 bg-info/10 px-4 py-2.5 text-sm text-slate-700">
            <Flag size={16} className="shrink-0 text-info" />
            <span>
                <strong>{peakSale.peakSaleName}</strong> starts in {peakSale.startsInDays} days
                {inRampUp ? ": ramp-up watch is active, check your restock alerts." : "."}
            </span>
        </div>
    );
}
