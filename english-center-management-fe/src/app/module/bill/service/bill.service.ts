import { Injectable, inject } from '@angular/core';
import {
    RevenueRequest,
    RevenueResponse,
    StatisticBillResponse,
    StatisticBillRequest,
} from '../interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../common/interface';
import { environment } from 'environment';
import { mappingDataResponse } from '../../common/utils';

@Injectable({
    providedIn: 'root',
})
export class BillService {
    private httpClient = inject(HttpClient);

    public statisticRevenue(
        request: RevenueRequest,
    ): Observable<RevenueResponse[]> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/bills/statistic-revenue`,
            request,
        );
        return mappingDataResponse(apiResponse);
    }

    public statisticBill(
        request: StatisticBillRequest,
    ): Observable<StatisticBillResponse> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/bills/statistic-bill`,
            request,
        );
        return mappingDataResponse(apiResponse);
    }
}
