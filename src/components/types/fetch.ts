export interface FetchParams {
    url: string;
    method: string;
    body?: any;
    token?: string;
}
  
export interface ApiResponse<T = any> {
    code: number;
    message?: string;
    data?: T;
    success?: boolean;
}

export interface ProductCounts {
    totalProducts: number;
    totalActiveProducts: number;
    totalInactiveProducts: number;
}

export interface ProductPagination {
    currentPage: number;
    totalPages: number;
    limit: number | 'all';
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    ObjectModelData?: any;
    type: string;
    category: string[];
    status: 'active' | 'inactive';
    stripeProductId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetProductsResponse {
    success: boolean;
    message: string;
    data: Product[];
    totalMatchedProducts: number;
    counts: ProductCounts;
    appliedFilters: {
        filter: any;
        sort: {
            sortBy: string;
            sortOrder: string;
        };
        status: string;
    };
    pagination: ProductPagination;
}