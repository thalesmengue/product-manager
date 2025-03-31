import React, { useState } from 'react';
import { useProducts } from '@/hooks/use-products.tsx';
import { Product } from '@/types/product.ts';
import ProductPagination from "@/components/products/pagination.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductModal } from '@/components/products/product-modal.tsx';
import { DeleteAlert } from '@/components/products/delete-alert';
import {Trash2} from "lucide-react";

export function ProductTable() {
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [deletingProductId, setDeletingProductId] = useState<number | null>(null);

    const { productsQuery, deleteProductMutation } = useProducts(page, perPage, search);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput);
        setPage(1);
    };

    const handleDelete = (id: number) => {
        deleteProductMutation.mutate(id, {
            onSuccess: () => {
                setDeletingProductId(null);
            },
        });
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Products</CardTitle>
                    <Button onClick={() => setIsCreateModalOpen(true)}>Add Product</Button>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                        <Input
                            placeholder="Search products..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="max-w-sm"
                        />
                        <Button type="submit">Search</Button>
                    </form>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {productsQuery.isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-10">
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : productsQuery.data?.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-10">
                                            No products found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    productsQuery.data?.data.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium">{product.name}</TableCell>
                                            <TableCell>{product.sku}</TableCell>
                                            <TableCell>${product.price.toFixed(2)}</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={product.is_active ? "success" : "destructive"}
                                                >
                                                    {product.is_active ? "Active" : "Inactive"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setEditingProduct(product)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => setDeletingProductId(product.id)}
                                                >
                                                    <Trash2 />
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <ProductPagination
                        page={page}
                        setPage={setPage}
                        productsQuery={productsQuery}
                    />
                </CardContent>
            </Card>

            <ProductModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                product={null}
            />

            {editingProduct && (
                <ProductModal
                    isOpen={!!editingProduct}
                    onClose={() => setEditingProduct(null)}
                    product={editingProduct}
                />
            )}

            <DeleteAlert
                isOpen={!!deletingProductId}
                onClose={() => setDeletingProductId(null)}
                onConfirm={() => deletingProductId && handleDelete(deletingProductId)}
            />
        </div>
    );
}