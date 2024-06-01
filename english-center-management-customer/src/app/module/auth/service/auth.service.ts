import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environment';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../common/interface';
import { mappingDataResponse } from '../../common/utils';
import { LoginRequest, LoginResponse, RegisterRequest } from '../interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private httpClient = inject(HttpClient);

    public authority: string[];

    get loginResponse(): LoginResponse {
        return JSON.parse(localStorage.getItem('AUTHENTICATION'));
    }

    get isAuthenticated(): boolean {
        return !!localStorage.getItem('AUTHENTICATION');
    }

    public logout(): void {
        localStorage.removeItem('AUTHENTICATION');
    }

    public login(request: LoginRequest): Observable<LoginResponse> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/auth`,
            request,
        );
        return mappingDataResponse(apiResponse).pipe(
            map((x: LoginResponse) => {
                localStorage.setItem('AUTHENTICATION', JSON.stringify(x));
                return x;
            }),
        );
    }

    public register(request: RegisterRequest): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/auth/register`,
            request,
        );
    }
}
