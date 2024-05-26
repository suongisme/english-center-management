import { Injectable, inject } from '@angular/core';
import { environment } from 'environment';
import { Observable, Subject, map } from 'rxjs';
import {
    ApiResponse,
    PagingRequest,
    PagingResponse,
} from '../../common/interface';
import { Course, CourseItem, SearchCourseRequest } from '../interface';
import { HttpClient } from '@angular/common/http';
import { mappingDataResponse } from '../../common/utils';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    private httpClient = inject(HttpClient);

    private endpoint = `${environment.BE_URL}/courses`;

    public courseDetail = new Subject<Course>();

    public searchCourse(
        request: PagingRequest<SearchCourseRequest>,
    ): Observable<PagingResponse<CourseItem>> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            this.endpoint + '/search',
            request,
        );
        return mappingDataResponse(apiResponse);
    }

    public getCourseById(courseId: number): Observable<Course> {
        const apiResponse = this.httpClient.get<ApiResponse>(this.endpoint, {
            params: {
                id: courseId,
                status: 1,
            },
        });
        return mappingDataResponse(apiResponse).pipe(
            map((x: Course) => {
                this.courseDetail.next(x);
                return x;
            }),
        );
    }
}
