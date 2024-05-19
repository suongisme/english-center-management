import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../common/interface';
import { CreateTimetableRequest } from '../interface';
import { environment } from 'environment';
import { Observable } from 'rxjs';

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
}
