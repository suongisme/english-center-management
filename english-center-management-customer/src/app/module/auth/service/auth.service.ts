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
    private _loginResponse: LoginResponse;

    public authority: string[];

    set loginResponse(loginResponse: LoginResponse) {
        this._loginResponse = loginResponse;
    }

    get loginResponse(): LoginResponse {
        return this._loginResponse;
    }

    get isAuthenticated(): boolean {
        return !!this.loginResponse;
    }

    public logout(): void {
        this.loginResponse = null;
    }

    public login(request: LoginRequest): Observable<LoginResponse> {
        const apiResponse = this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/auth`,
            request,
        );
        return mappingDataResponse(apiResponse).pipe(
            map((x: LoginResponse) => {
                this.loginResponse = x;
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
