import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { mappingDataResponse } from '@ecm-module/common';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '@ecm-module/common';
import { PagingRequest, PagingResponse } from '@ecm-module/common';
import {
    CreateTestingRequest,
    GetTestingResponse,
    SearchTestingRequest,
    SearchTestingResponse,
    UpdateTestingRequest,
} from '../interface';

@Injectable({
    providedIn: 'root',
})
export class TestingService {
    public static readonly ENDPOINT = `${environment.BE_URL}/testings`;

    private readonly httpClient = inject(HttpClient);

    public createTesting(
        request: CreateTestingRequest,
    ): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(
            TestingService.ENDPOINT,
            request,
        );
    }

    public updateTesting(
        request: UpdateTestingRequest,
    ): Observable<ApiResponse> {
        return this.httpClient.put<ApiResponse>(
            TestingService.ENDPOINT,
            request,
        );
    }

    public searchTesting(
        request: PagingRequest<SearchTestingRequest>,
    ): Observable<PagingResponse<SearchTestingResponse>> {
        const response = this.httpClient.post<ApiResponse>(
            `${TestingService.ENDPOINT}/search`,
            request,
        );
        return mappingDataResponse<PagingResponse<SearchTestingResponse>>(
            response,
        );
    }

    public getById(testingId: number): Observable<GetTestingResponse> {
        const response = this.httpClient.get<ApiResponse>(
            TestingService.ENDPOINT,
            {
                params: {
                    testingId: testingId,
                },
            },
        );
        return mappingDataResponse<GetTestingResponse>(response);
    }
}
