export interface BillResponse {
    id: number;
    createdDate: number;
    methodPayment: string;
    totalPrice: number;
    status: number;
}

export interface SearchBillRequest {
    fromDate?: string;
    toDate?: string;
}

export interface BillDetailResponse {
    id: number;
    courseName: string;
    teacherName: string;
    classRoomName: string;
    price: number;
    discount: number;
    score: number;
    note: string;
    timetableId: number;
}

export interface PaymentRequest {
    methodPayment: string;
    courseIds: number[];
}

export interface PaymentResponse {
    methodPayment: string;
}

export interface VnPayPaymentResponse extends PaymentResponse {
    paymentUrl: string;
}
