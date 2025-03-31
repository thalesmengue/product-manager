import { ProductTable } from "../components/products/product-table";

export default function Dashboard() {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Dashboard</h2>
            </div>
            <ProductTable />
        </div>
    );
}