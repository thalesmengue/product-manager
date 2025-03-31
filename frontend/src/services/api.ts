import axios from 'axios';
import { Product, ProductFormData, ProductsResponse } from '@/types/product';

const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async (page = 1, perPage = 10, search?: string): Promise<ProductsResponse> => {
    const params = { page, per_page: perPage, ...(search && { search }) };
    const response = await api.get<ProductsResponse>('/products', { params });

    return response.data;
};

export const createProduct = async (product: ProductFormData): Promise<Product> => {
    const response = await api.post<Product>('/products', product);

    return response.data;
};

export const updateProduct = async (id: number, product: Partial<ProductFormData>): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, product);

    return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
};

export default api;