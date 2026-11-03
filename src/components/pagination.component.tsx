import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationType = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange
}: PaginationType) {

    if (totalPages <= 1) return null;

    // Display a maximum of five page numbers
    const startPage = Math.max(
        1,
        Math.min(currentPage - 2, totalPages - 4)
    );

    const endPage = Math.min(totalPages, startPage + 4);

    const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    const startItem = (currentPage - 1) * itemsPerPage + 1;

    const endItem = Math.min(
        currentPage * itemsPerPage,
        totalItems
    );

    return (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">

            {/* Records information */}
            <p className="text-xs text-slate-500">
                Showing {startItem} - {endItem} of {totalItems} records
            </p>

            {/* Navigation */}
            <div className="flex items-center gap-1">

                {/* Previous */}
                <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    aria-label="Previous page"
                    className="rounded-lg border border-slate-200 p-2 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronLeft size={17} />
                </button>

                {/* Page Numbers */}
                {pages.map((page) => (

                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={`min-w-9 rounded-lg border px-3 py-2 text-sm transition-colors ${currentPage === page
                                ? "border-brand-forest bg-brand-forest text-white"
                                : "border-slate-200 hover:bg-slate-100"
                            }`}
                    >
                        {page}
                    </button>

                ))}

                {/* Next */}
                <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    aria-label="Next page"
                    className="rounded-lg border border-slate-200 p-2 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronRight size={17} />
                </button>

            </div>

        </div>
    );
}