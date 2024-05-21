import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PagingRequest, PagingResponse } from '@ecm-module/common';
import { Observable, map } from 'rxjs';
import {
    CreateCourseRequest,
    SearchCourseRequest,
    SearchCourseResponse,
    UpdateCourseRequest,
} from '../interface';
import { environment } from 'environment';
import { ApiBody, ApiResponse } from '@ecm-module/common';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    private readonly httpClient = inject(HttpClient);

    public static readonly ENDPOINT = `${environment.BE_URL}/courses`;

    public searchCourse(
        request: PagingRequest<SearchCourseRequest>,
    ): Observable<PagingResponse<SearchCourseResponse>> {
        return this.httpClient
            .post<
                PagingResponse<SearchCourseResponse>
            >(`${CourseService.ENDPOINT}/search`, request)
            .pipe(
                map<any, ApiBody>((x: ApiResponse) => x.apiBody),
                map<ApiBody, PagingResponse<SearchCourseResponse>>(
                    (x) => x.data,
                ),
            );
    }

    public createCourse(request: CreateCourseRequest): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(
            CourseService.ENDPOINT,
            request,
        );
    }

    public updateCourse(request: UpdateCourseRequest): Observable<ApiResponse> {
        return this.httpClient.put<ApiResponse>(
            CourseService.ENDPOINT,
            request,
        );
    }
}
