import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { environment } from 'environment';
import { TimetableResponse } from '../interface';
import { Observable } from 'rxjs';
import { mappingDataResponse } from '../../common/utils';
import { ApiResponse } from '../../common/interface';

@Injectable({
    providedIn: 'root',
})
export class TimetableService {
    private readonly httpClient = inject(HttpClient);

    public static readonly ENDPOINT = `${environment.BE_URL}/timetable`;
    public getByUserId(request): Observable<TimetableResponse[]> {
        const param: any = {
            userId: request.userId,
        };
        if (request.day) {
            param.day = request.day;
        }
        if (request.status) {
            param.status = request.status;
        }
        const apiResponse = this.httpClient.get<ApiResponse>(
            `${TimetableService.ENDPOINT}/get-by-user-id`,
            {
                params: param,
            },
        );
        return mappingDataResponse(apiResponse);
    }
}
