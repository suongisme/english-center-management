import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import {
    ApiResponse,
    PagingRequest,
    PagingResponse,
} from '../../common/interface';
import { mappingDataResponse } from '../../common/utils';
import {
    CreateGradeBookRequest,
    DetailResponse,
    GetStatisticScoreRequest,
    GetStatisticScoreResponse,
    SearchGradeBookResponse,
} from '../interface';

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

    public getStudentAndScore(
        timetableId: number,
    ): Observable<DetailResponse[]> {
        const apiResponse = this.httpClient.get<ApiResponse>(
            `${environment.BE_URL}/grade-book/user`,
            {
                params: {
                    timetableId: timetableId,
                },
            },
        );
        return mappingDataResponse(apiResponse);
    }

    public statisticScore(
        searchRequest: PagingRequest<GetStatisticScoreRequest>,
    ): Observable<PagingResponse<GetStatisticScoreResponse>> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/grade-book/statistic-score`,
            searchRequest,
        );
        return mappingDataResponse(apiResponse);
    }
}
