import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { ChangePasswordRequest } from '../../auth/interface';
import { ApiResponse } from '@ecm-module/common';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private endpoint = `${environment.BE_URL}/users`;

    private httpClient = inject(HttpClient);

    public changePassword(
        request: ChangePasswordRequest,
    ): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(
            this.endpoint + '/change-password',
            request,
        );
    }

    public updateUserInfo(request): Observable<ApiResponse> {
        return this.httpClient.put<ApiResponse>(
            this.endpoint + '/update-info',
            request,
        );
    }
}
