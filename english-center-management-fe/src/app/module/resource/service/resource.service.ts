import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
    ApiResponse,
    PagingRequest,
    PagingResponse,
} from '../../common/interface';
import {
    CreateResourceRequest,
    SearchResourceRequest,
    SearchResourceResponse,
} from '../interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment';
import { mappingDataResponse } from '../../common/utils';

@Injectable({
    providedIn: 'root',
})
export class ResourceService {
    private httpClient = inject(HttpClient);

    public searchResource(
        request: PagingRequest<SearchResourceRequest>,
    ): Observable<PagingResponse<SearchResourceResponse>> {
        const response = this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/resources/search`,
            request,
        );
        return mappingDataResponse(response);
    }

    public createResource(
        request: CreateResourceRequest,
    ): Observable<ApiResponse> {
        const formData = new FormData();
        formData.append('keyId', request.keyId.toString());
        formData.append('type', request.type);
        formData.append('file', request.file);
        return this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/resources`,
            formData,
        );
    }

    public deleteById(id: number): Observable<ApiResponse> {
        return this.httpClient.delete<ApiResponse>(
            `${environment.BE_URL}/resources`,
            {
                params: {
                    id: id,
                },
            },
        );
    }
}
