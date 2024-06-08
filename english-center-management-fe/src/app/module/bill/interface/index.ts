export interface RevenueRequest {
    type: string;
    year: number;
    quarter?: number;
}

export interface RevenueResponse {
    label: string;
    value: number;
}

export interface StatisticBillRequest {
    date?: Date;
}

export interface StatisticBillResponse {
    totalPrice: number;
    totalBill: number;
    label: string;
}
