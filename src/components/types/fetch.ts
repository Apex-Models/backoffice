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

// Order types
export interface OrderCounts {
    totalOrders: number;
    totalSuccededOrders: number;
    totalFailedOrders: number;
    totalRefundedOrders: number;
}

export interface OrderPagination {
    currentPage: number;
    totalPages: number;
    limit: number | 'all';
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface OrderAddress {
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Order {
    id: number;
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    items: OrderItem[];
    total: number;
    orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentStatus: 'pending' | 'succeded' | 'failed' | 'refunded';
    address: OrderAddress;
    createdAt: string;
    updatedAt: string;
}

export interface GetOrdersResponse {
    success: boolean;
    message: string;
    data: Order[];
    totalMatchedOrders: number;
    counts: OrderCounts;
    appliedFilters: {
        filter: any;
        sort: {
            sortBy: string;
            sortOrder: string;
        };
        status: string;
    };
    pagination: OrderPagination;
}

export interface OrderFilterParams {
    filter?: {
        minTotal?: number | string;
        maxTotal?: number | string;
        orderStatus?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | null;
        paymentStatus?: 'pending' | 'succeded' | 'failed' | 'refunded' | null;
        customerName?: string;
    };
    sort?: {
        sortBy?: 'orderId' | 'customer' | 'date' | 'total' | 'orderStatus' | 'paymentStatus' | 'deliveryAddress' | 'address' | 'createdAt';
        sortOrder?: 'asc' | 'desc';
    };
    page?: number;
    limit?: number | null;
    status?: 'pending' | 'succeded' | 'failed' | 'refunded' | null;
}

// User/Customer types
export interface UserCounts {
    totalUsers: number;
    totalActiveUsers: number;
    totalUsersWithOrders: number;
    totalUsersWithoutOrders: number;
    totalSpent: number;
}

export interface UserPagination {
    currentPage: number;
    totalPages: number;
    limit: number | 'all';
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface UserAddress {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
}

export interface UserOrderSummary {
    totalOrders: number;
    totalSpent: number;
    lastOrderDate?: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address?: UserAddress;
    orderSummary: UserOrderSummary;
    createdAt: string;
    updatedAt: string;
}

export interface GetUsersResponse {
    success: boolean;
    message: string;
    data: User[];
    totalMatchedUsers: number;
    counts: UserCounts;
    appliedFilters: {
        filter: any;
        sort: {
            sortBy: string;
            sortOrder: string;
        };
        status: string;
    };
    pagination: UserPagination;
}

export interface UserFilterParams {
    filter?: {
        minSpent?: number | string;
        maxSpent?: number | string;
        hasOrders?: boolean | null;
        name?: string;
        city?: string;
    };
    sort?: {
        sortBy?: 'id' | 'name' | 'email' | 'totalSpent' | 'totalOrders' | 'createdAt' | 'lastOrder';
        sortOrder?: 'asc' | 'desc';
    };
    page?: number;
    limit?: number | null;
    status?: 'active' | 'with_orders' | 'without_orders' | null;
}