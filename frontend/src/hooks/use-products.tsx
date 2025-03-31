import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import { ProductFormData } from '@/types/product';
import { toast } from "sonner";

export function useProducts(page = 1, perPage = 10, search?: string) {
    const queryClient = useQueryClient();

    const productsQuery = useQuery({
        queryKey: ['products', page, perPage, search],
        queryFn: () => getProducts(page, perPage, search),
        keepPreviousData: true,
    });

    const createProductMutation = useMutation({
        mutationFn: (data: ProductFormData) => createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success("Product created successfully");
        },
        onError: () => {
            toast.error("Failed to create product");
        }
    });

    const updateProductMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<ProductFormData> }) =>
            updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success("Product updated successfully");
        },
        onError: () => {
            toast.error("Failed to update product");
        }
    });

    const deleteProductMutation = useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success("Product deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete product");
        }
    });

    return {
        productsQuery,
        createProductMutation,
        updateProductMutation,
        deleteProductMutation,
    };
}