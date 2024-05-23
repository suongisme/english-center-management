import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
    CreateGradeBookRequest,
    DetailResponse,
    SearchGradeBookResponse,
} from '../interface';
import { Observable } from 'rxjs';
import { ApiResponse, PagingResponse } from '../../common/interface';
import { environment } from 'environment';
import { mappingDataResponse } from '../../common/utils';

@Injectable({
    providedIn: 'root',
})
export class GradebookService {
    private httpClient = inject(HttpClient);

    public createGradeBook(
        request: CreateGradeBookRequest,
    ): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/grade-book`,
            request,
        );
    }

    public searchGradeBook(): Observable<
        PagingResponse<SearchGradeBookResponse>
    > {
        const apiResponse = this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/grade-book/search`,
            {},
        );
        return mappingDataResponse(apiResponse);
    }

    public getDetail(id: number): Observable<DetailResponse[]> {
        const apiResponse = this.httpClient.get<ApiResponse>(
            `${environment.BE_URL}/grade-book/detail`,
            {
                params: {
                    id: id,
                },
            },
        );
        return mappingDataResponse(apiResponse);
    }
}
