import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiBody, ApiResponse, mappingDataResponse } from '@ecm-module/common';
import {
    CreateUser,
    StudentTimetableResponse,
    UpdateUser,
    UserSearchRequest,
    UserSearchResponse,
} from '../interface';
import { environment } from 'environment';
import { PagingRequest, PagingResponse } from '@ecm-module/common';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly httpClient = inject(HttpClient);

    public createUser(userRequest: CreateUser): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/users`,
            userRequest,
        );
    }

    public updateUser(userRequest: UpdateUser): Observable<ApiResponse> {
        return this.httpClient.put<ApiResponse>(
            `${environment.BE_URL}/users`,
            userRequest,
        );
    }

    public searchUser(
        userRequest: PagingRequest<UserSearchRequest>,
    ): Observable<PagingResponse<UserSearchResponse>> {
        return this.httpClient
            .post<
                PagingResponse<UserSearchResponse>
            >(`${environment.BE_URL}/users/search`, userRequest)
            .pipe(
                map<any, ApiBody>((x: ApiResponse) => x.apiBody),
                map<ApiBody, PagingResponse<UserSearchResponse>>((x) => x.data),
            );
    }

    public getByTimetable(
        timetableId: number,
    ): Observable<StudentTimetableResponse[]> {
        const response = this.httpClient.get<ApiResponse>(
            `${environment.BE_URL}/users/timetable`,
            {
                params: {
                    timetableId: timetableId,
                },
            },
        );
        return mappingDataResponse(response);
    }

    public getByCheckinId(
        checkinId: number,
    ): Observable<StudentTimetableResponse[]> {
        const response = this.httpClient.get<ApiResponse>(
            `${environment.BE_URL}/users/checkin`,
            {
                params: {
                    checkinId: checkinId,
                },
            },
        );
        return mappingDataResponse(response);
    }
}
