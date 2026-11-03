import Card from "../components/cards/body.card";
import CategoryCard from "../components/cards/categoryCard.card";
import Pagination from "../components/pagination.component";
import usePagination from "../utils/pagination.utils";

export default function CategoriesPage() {

    // Temporary data for testing
    const categories = [
        {
            id: 1,
            categoryName: "Electronics",
            level: 1,
            product: 45,
            status: "active"
        },
        {
            id: 2,
            categoryName: "Laptops",
            level: 2,
            product: 20,
            stock: 65,
            status: "active"
        },
        {
            id: 3,
            categoryName: "Smartphones",
            level: 2,
            product: 15,
            status: "active"
        },
        {
            id: 4,
            categoryName: "Audio Accessories",
            level: 2,
            product: 10,
            status: "active"
        },
        {
            id: 5,
            categoryName: "Groceries",
            level: 1,
            product: 60,
            stock: 200,
            status: "active"
        },
        {
            id: 6,
            categoryName: "Dairy",
            level: 2,
            product: 18,
            stock: 90,
            status: "active"
        },
        {
            id: 7,
            categoryName: "Fresh Produce",
            level: 2,
            product: 25,
            status: "active"
        },
        {
            id: 8,
            categoryName: "Fashion",
            level: 1,
            product: 30,
            status: "active"
        },
        {
            id: 9,
            categoryName: "Footwear",
            level: 2,
            product: 12,
            status: "active"
        }
    ];

    const {
        currentItems,
        currentPage,
        totalPages,
        setCurrentPage,
        totalItems,
        itemsPerPage
    } = usePagination(categories, 8);

    return (

        <main className="bg-shell p-5">
            <div>
                <h2 className="text-xl font-semibold text-brand-deep">
                    Categories
                </h2>

                <p className="text-sm text-slate-500">
                    Manage your product categories
                </p>
            </div>
            <div className="">
                {/* <Card size="sm">

                </Card> */}
            </div>
            <section className="space-y-4 p-4 ">

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                    {currentItems.map((category) => (

                        <CategoryCard
                            key={category.id}
                            categoryName={category.categoryName}
                            level={category.level}
                            product={category.product}
                            status={category.status}
                        />

                    ))}

                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />

            </section>
        </main>
    );
}