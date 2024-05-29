import { SearchResourceResponse } from './../interface/index';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { ApiResponse, PagingResponse } from '../../common/interface';
import { mappingDataResponse } from '../../common/utils';

@Injectable({
    providedIn: 'root',
})
export class ResourceService {
    private endpoint = `${environment.BE_URL}/resources`;
    private httpClient = inject(HttpClient);

    public getResourceByTimetableId(
        timetableId: number,
        type: string,
    ): Observable<PagingResponse<SearchResourceResponse>> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            this.endpoint + '/search',
            {
                data: {
                    keyId: timetableId,
                    type: type,
                },
            },
        );
        return mappingDataResponse(apiResponse);
    }
}
