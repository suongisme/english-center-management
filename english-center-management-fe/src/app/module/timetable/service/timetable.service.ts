import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
    ApiBody,
    ApiResponse,
    PagingRequest,
    PagingResponse,
    mappingDataResponse,
} from '@ecm-module/common';
import { environment } from 'environment';
import { Observable, map } from 'rxjs';
import {
    CreateTimetableRequest,
    GetByIdRequest,
    GetStatisticTimetableRequest,
    GetStatisticTimetableResponse,
    GetTimetableResponse,
    SearchTimetableRequest,
    SearchTimetableResponse,
    TimetableResponse,
} from '../interface';

@Injectable({
    providedIn: 'root',
})
export class TimetableService {
    private readonly httpClient = inject(HttpClient);

    public static readonly ENDPOINT = `${environment.BE_URL}/timetable`;

    public createTimetable(
        request: CreateTimetableRequest,
    ): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(
            TimetableService.ENDPOINT,
            request,
        );
    }

    public updateTimetable(
        request: GetTimetableResponse,
    ): Observable<ApiResponse> {
        return this.httpClient.put<ApiResponse>(
            TimetableService.ENDPOINT,
            request,
        );
    }

    public getByUserId(
        request: GetByIdRequest,
    ): Observable<TimetableResponse[]> {
        const param: any = {
            userId: request.userId,
        };
        if (request.day) {
            param.day = request.day;
        }
        if (request.status) {
            param.status = request.status;
        }
        return this.httpClient
            .get<TimetableResponse>(
                `${TimetableService.ENDPOINT}/get-by-user-id`,
                {
                    params: param,
                },
            )
            .pipe(
                map<any, ApiBody>((x: ApiResponse) => x.apiBody),
                map<ApiBody, TimetableResponse[]>((apiBody) => apiBody.data),
            );
    }

    public searchTimetable(
        request: PagingRequest<SearchTimetableRequest>,
    ): Observable<PagingResponse<SearchTimetableResponse>> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            `${TimetableService.ENDPOINT}/search`,
            request,
        );
        return mappingDataResponse(apiResponse);
    }

    public getById(id: number): Observable<GetTimetableResponse> {
        return this.httpClient
            .get<GetTimetableResponse>(TimetableService.ENDPOINT, {
                params: {
                    id: id,
                },
            })
            .pipe(
                map<any, ApiBody>((x: ApiResponse) => x.apiBody),
                map<ApiBody, GetTimetableResponse>((x) => x.data),
            );
    }

    public getStatisticTimetable(
        request: PagingRequest<GetStatisticTimetableRequest>,
    ): Observable<PagingResponse<GetStatisticTimetableResponse>> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            `${TimetableService.ENDPOINT}/statistic-timetable`,
            request,
        );
        return mappingDataResponse(apiResponse);
    }
}
