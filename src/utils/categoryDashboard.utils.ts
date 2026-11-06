import { useEffect, useState } from "react";
import type { CategoryDashboardI } from "../interfaces/categoryDashboard.interface";
import { categoryDashboardMock } from "../data/categoryDashboard.mock";

// STEP 4 - A CUSTOM HOOK: the only place that knows where the data comes from.
// Components never call axios. They call this hook. When the backend endpoint exists you
// replace the body of `load` and NOTHING else in the app changes.
//
// A hook is a function whose name starts with "use" and that may call other hooks (useState, useEffect).
// It returns the three things every screen needs: the data, "am I loading?", "did it fail?".

type DashboardState = {
    data: CategoryDashboardI | null;
    isLoading: boolean;
    error: string | null;
};

export function useCategoryDashboard(categoryId: string | undefined): DashboardState {
    const [state, setState] = useState<DashboardState>({ data: null, isLoading: true, error: null });

    useEffect(() => {
        // `cancelled` stops a slow request from overwriting a newer one
        // (the user clicks category A, then quickly category B).
        let cancelled = false;

        async function load() {
            try {
                // LATER, when the backend route exists:
                //   import api from "../../api/axios";
                //   const response = await api.get<CategoryDashboardI>(`/categories/${categoryId}/analytics`);
                //   const data = response.data;
                await new Promise((resolve) => setTimeout(resolve, 600)); // pretend the network is slow
                const data: CategoryDashboardI = { ...categoryDashboardMock, id: categoryId ?? categoryDashboardMock.id };
                if (!cancelled) setState({ data, isLoading: false, error: null });
            } catch (err) {
                const message = err instanceof Error ? err.message : "Could not load this category";
                if (!cancelled) setState({ data: null, isLoading: false, error: message });
            }
        }

        load();
        return () => {
            cancelled = true; // cleanup runs when categoryId changes or the page closes
        };
    }, [categoryId]);

    return state;
}
