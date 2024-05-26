import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environment';
import { Observable, Subject } from 'rxjs';
import {
    ApiResponse,
    PagingRequest,
    PagingResponse,
} from '../../common/interface';
import { mappingDataResponse } from '../../common/utils';
import {
    CheckAnswerResponse,
    Question,
    SearchTestingRequest,
    SearchTestingResponse,
} from '../interface';

@Injectable({
    providedIn: 'root',
})
export class TestingService {
    private endpoint = `${environment.BE_URL}/testings`;

    private httpClient = inject(HttpClient);
    public selectTesting = new Subject<SearchTestingResponse>();

    public searchTesting(
        request: PagingRequest<SearchTestingRequest>,
    ): Observable<PagingResponse<SearchTestingResponse>> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            this.endpoint + '/search',
            request,
        );
        return mappingDataResponse(apiResponse);
    }

    public checkAnswer(
        testingId: number,
        questions: Question[],
    ): Observable<CheckAnswerResponse> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            this.endpoint + '/check',
            questions,
            {
                params: {
                    testingId: testingId,
                },
            },
        );
        return mappingDataResponse(apiResponse);
    }
}
