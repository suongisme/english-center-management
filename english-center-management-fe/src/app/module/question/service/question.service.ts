import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PagingRequest, PagingResponse } from '@ecm-module/common';
import {
    CreateQuestionRequest,
    GetQuestionResponse,
    SearchQuestionRequest,
    SearchQuestionResponse,
    UpdateQuestionRequest,
} from '../interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';
import { ApiBody, ApiResponse } from '@ecm-module/common';

@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    public static readonly ENDPOINT = `${environment.BE_URL}/questions`;

    private readonly httpClient = inject(HttpClient);

    public getById(questionId: number): Observable<GetQuestionResponse> {
        return this.httpClient
            .get(QuestionService.ENDPOINT, {
                params: {
                    questionId: questionId,
                },
            })
            .pipe(
                map<any, ApiBody>((x: ApiResponse) => x.apiBody),
                map<ApiBody, GetQuestionResponse>((x) => x.data),
            );
    }

    public searchQuestion(
        request: PagingRequest<SearchQuestionRequest>,
    ): Observable<PagingResponse<SearchQuestionResponse>> {
        return this.httpClient
            .post<
                PagingResponse<SearchQuestionResponse>
            >(`${QuestionService.ENDPOINT}/search`, request)
            .pipe(
                map<any, ApiBody>((x: ApiResponse) => x.apiBody),
                map<ApiBody, PagingResponse<SearchQuestionResponse>>(
                    (x) => x.data,
                ),
            );
    }

    public createQuestion(
        request: CreateQuestionRequest,
    ): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(
            QuestionService.ENDPOINT,
            request,
        );
    }

    public updateQuestion(
        request: UpdateQuestionRequest,
    ): Observable<ApiResponse> {
        return this.httpClient.put<ApiResponse>(
            QuestionService.ENDPOINT,
            request,
        );
    }
}
