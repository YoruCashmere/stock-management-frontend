import { BellOff } from "lucide-react";
import Card from "./body.card";
import Badge from "../badge.component";
import AlertCard from "./alert.card";
import { panelClass } from "../../utils/styles.utils";
import type { CategoryAlertI } from "../../interfaces/categoryDashboard.interface";

// COMPONENT 6 - AlertsPanel: a container that maps data to many AlertCards.
//
// LESSON: containers handle the LIST (header, count, empty state). Items handle ONE thing.
// `.map()` turns an array of data into an array of components. That is how all lists work in React.

type AlertsPanelType = {
    alerts: CategoryAlertI[];
    onAction: (alertId: string, action: string) => void;
};

export default function AlertsPanel({ alerts, onAction }: AlertsPanelType) {
    return (
        <Card className={panelClass}>
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-800">Alerts</h2>
                {alerts.length > 0 && (
                    <Badge variant="danger" className="rounded-md px-2 py-0.5 text-xs">{alerts.length} open</Badge>
                )}
            </div>

            {alerts.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-8 text-slate-400">
                    <BellOff size={22} />
                    <p className="text-xs">No open alerts for this category.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {alerts.map((alert) => (
                        <AlertCard key={alert.id} alert={alert} onAction={onAction} />
                    ))}
                </div>
            )}
        </Card>
    );
}
