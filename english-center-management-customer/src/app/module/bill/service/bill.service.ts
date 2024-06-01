import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import {
    BillDetailResponse,
    BillResponse,
    PaymentRequest,
    PaymentResponse,
    SearchBillRequest,
} from '../interface';
import { ApiResponse } from '../../common/interface';
import { mappingDataResponse } from '../../common/utils';

@Injectable({
    providedIn: 'root',
})
export class BillService {
    private endpoint = `${environment.BE_URL}/bills`;
    private httpClient = inject(HttpClient);

    public getUserBill(
        request: SearchBillRequest = {},
    ): Observable<BillResponse[]> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            this.endpoint + '/get-bill',
            request,
        );
        return mappingDataResponse(apiResponse);
    }

    public getDetailBill(billId: number): Observable<BillDetailResponse[]> {
        const apiResponse = this.httpClient.get<ApiResponse>(
            this.endpoint + '/get-detail',
            {
                params: {
                    billId: billId,
                },
            },
        );
        return mappingDataResponse(apiResponse);
    }

    public payment(request: PaymentRequest): Observable<PaymentResponse> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            this.endpoint + '/payment',
            request,
        );
        return mappingDataResponse(apiResponse);
    }
}
