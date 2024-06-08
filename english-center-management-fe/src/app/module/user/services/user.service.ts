import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiBody, ApiResponse, mappingDataResponse } from '@ecm-module/common';
import {
    CreateUser,
    GetStatisticUserRequest,
    GetStatisticUserResponse,
    UpdateUser,
    UserSearchRequest,
    UserSearchResponse,
} from '../interface';
import { environment } from 'environment';
import { PagingRequest, PagingResponse } from '@ecm-module/common';
import { GetStudentAndCheckinResult } from '../../checkin/interface';
import { ChangePasswordRequest } from '../../auth/interface';

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

    public getPaidStudent(courseId: number): Observable<UserSearchResponse[]> {
        const apiResponse = this.httpClient.get<ApiResponse>(
            `${environment.BE_URL}/users/paid-student`,
            { params: { courseId: courseId } },
        );
        return mappingDataResponse(apiResponse);
    }

    public getByCheckinId(
        checkinId: number,
    ): Observable<GetStudentAndCheckinResult[]> {
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

    public changePassword(
        request: ChangePasswordRequest,
    ): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/users/change-password`,
            request,
        );
    }

    public statisticUser(
        userRequest: PagingRequest<GetStatisticUserRequest>,
    ): Observable<PagingResponse<GetStatisticUserResponse>> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/users/statistic-user`,
            userRequest,
        );

        return mappingDataResponse(apiResponse);
    }
}
