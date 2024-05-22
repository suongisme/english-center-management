import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../common/interface';
import { environment } from 'environment';
import {
    CreateCheckinRequest,
    SearchCheckinRequest,
    SearchCheckinResponse,
} from '../interface';
import { mappingDataResponse } from '../../common/utils';

@Injectable({
    providedIn: 'root',
})
export class CheckinService {
    private httpClient = inject(HttpClient);

    public searchCheckin(
        request: SearchCheckinRequest,
    ): Observable<SearchCheckinResponse[]> {
        const response = this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/checkin/search`,
            request,
        );
        return mappingDataResponse(response);
    }

    public validateCheckinToday(timetableId: number): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(
            `${environment.BE_URL}/checkin/validate-checkin-today`,
            {
                params: {
                    timetableId: timetableId,
                },
            },
        );
    }

    public createCheckin(
        request: CreateCheckinRequest,
    ): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/checkin`,
            request,
        );
    }
}
