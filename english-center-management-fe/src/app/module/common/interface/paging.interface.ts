export interface PagingRequest<T> {
    pageNo?: number;
    pageSize?: number;
    data: T;
}

export interface PagingResponse<T> {
    items: T[];
    totalItems: number;
    totalPage: number;
}
