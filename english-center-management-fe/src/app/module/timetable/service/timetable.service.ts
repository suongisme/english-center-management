import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiBody, ApiResponse } from '@ecm-module/common';
import {
    CreateTimetableRequest,
    GetByIdRequest,
    GetTimetableResponse,
    TimetableResponse,
} from '../interface';
import { environment } from 'environment';
import { Observable, map } from 'rxjs';

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

    public getForGradebook(userId: number): Observable<TimetableResponse[]> {
        return this.httpClient
            .get<TimetableResponse>(
                `${TimetableService.ENDPOINT}/get-for-grade-book`,
                {
                    params: {
                        userId: userId,
                    },
                },
            )
            .pipe(
                map<any, ApiBody>((x: ApiResponse) => x.apiBody),
                map<ApiBody, TimetableResponse[]>((apiBody) => apiBody.data),
            );
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
}
