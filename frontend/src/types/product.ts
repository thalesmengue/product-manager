export interface Product {
    id: number;
    name: string;
    description: string | null;
    sku: string;
    price: number;
    category: string;
    is_active: boolean;
    created_at: string;
    updated_at: string | null;
}

export interface ProductFormData {
    name: string;
    description: string | null;
    sku: string;
    price: number;
    category: string;
    is_active: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export type ProductsResponse = PaginatedResponse<Product>;