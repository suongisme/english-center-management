import { ApiBody, ApiResponse } from '@ecm-module/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PagingRequest, PagingResponse } from '@ecm-module/common';
import {
    CreateClassRoomRequest,
    SearchClassRoomRequest,
    SearchClassRoomResponse,
    UpdateClassRoomRequest,
} from '../interface';
import { Observable, map } from 'rxjs';
import { environment } from 'environment';

@Injectable({
    providedIn: 'root',
})
export class ClassRoomService {
    private readonly httpClient = inject(HttpClient);

    public searchClassRoom(
        request: PagingRequest<SearchClassRoomRequest>,
    ): Observable<PagingResponse<SearchClassRoomResponse>> {
        return this.httpClient
            .post<
                PagingResponse<SearchClassRoomResponse>
            >(`${environment.BE_URL}/class-room/search`, request)
            .pipe(
                map<any, ApiBody>((x: ApiResponse) => x.apiBody),
                map<ApiBody, PagingResponse<SearchClassRoomResponse>>(
                    (x) => x.data,
                ),
            );
    }

    public createClassRoom(
        request: CreateClassRoomRequest,
    ): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/class-room`,
            request,
        );
    }

    public updateClassRoom(
        request: UpdateClassRoomRequest,
    ): Observable<ApiResponse> {
        return this.httpClient.put<ApiResponse>(
            `${environment.BE_URL}/class-room`,
            request,
        );
    }
}
