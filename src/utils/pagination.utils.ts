import { useEffect, useMemo, useState } from "react";

export default function usePagination<T>(
    items: T[],
    itemsPerPage: number = 8
) {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const safePage = Math.min(currentPage, Math.max(1, totalPages));
    const startIndex = (safePage - 1) * itemsPerPage;
    const currentItems = useMemo(() => {

        return items.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    }, [items, startIndex, itemsPerPage]);
    useEffect(() => {

        if (currentPage !== safePage) {
            setCurrentPage(safePage);
        }

    }, [currentPage, safePage]);

    return {
        currentItems,
        currentPage: safePage,
        totalPages,
        setCurrentPage,
        totalItems: items.length,
        itemsPerPage
    };
}