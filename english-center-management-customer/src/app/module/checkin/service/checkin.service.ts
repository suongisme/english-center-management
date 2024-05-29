import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environment';
import { ApiResponse } from '../../common/interface';
import { mappingDataResponse } from '../../common/utils';
import { Observable } from 'rxjs';
import { GetCheckedIn } from '../interface';

@Injectable({
    providedIn: 'root',
})
export class CheckinService {
    private endpoint = `${environment.BE_URL}/checkin`;
    private httpClient = inject(HttpClient);

    public getCheckedInByTimetableIdAndDay(
        timetableId: number,
        day?: number,
    ): Observable<GetCheckedIn[]> {
        const apiResponse = this.httpClient.get<ApiResponse>(
            this.endpoint + '/get-checked-in',
            {
                params: { timetableId, day },
            },
        );
        return mappingDataResponse(apiResponse);
    }
}
