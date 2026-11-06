import { Link } from "react-router-dom";
import CategoryCard from "./cards/categoryCard.card";
import type { SubCategorySummaryI } from "../interfaces/categoryDashboard.interface";

// COMPONENT 7 - SubCategorySection: the row that is allowed to disappear.
//
// You asked that the page looks the same when there are no level 2 categories.
// The trick is `return null`: a component may render NOTHING. The grid above it never moves
// because this section is the LAST thing in the page and takes no space when empty.
//
// We REUSE your CategoryCard as it is. We only wrap it in <Link> so a click opens that category.

export default function SubCategorySection({ items }: { items: SubCategorySummaryI[] }) {
    if (items.length === 0) return null;

    return (
        <section className="space-y-3">
            <div className="flex items-baseline justify-between">
                <h2 className="text-base font-bold text-brand-deep">Subcategories</h2>
                <span className="text-xs text-slate-500">{items.length} level 2 categories</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {items.map((item) => (
                    <Link key={item.id} to={`/categories/${item.id}`} className="block">
                        <CategoryCard
                            categoryName={item.categoryName}
                            level={item.level}
                            product={item.products}
                            status={item.status}
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
}
