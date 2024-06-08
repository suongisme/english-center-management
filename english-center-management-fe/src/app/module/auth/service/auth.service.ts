import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginRequest, LoginResponse } from '../interface';
import { Observable, map } from 'rxjs';
import { ApiResponse, Menu } from '../../common/interface';
import { environment } from 'environment';
import { mappingDataResponse } from '../../common/utils';
import { MENU } from '../../common/constant';
import { MenuService } from '../../common/service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private httpClient = inject(HttpClient);
    private menuService = inject(MenuService);
    private _loginResponse: LoginResponse;

    public authority: string[];

    set loginResponse(loginResponse: LoginResponse) {
        this._loginResponse = loginResponse;
        if (loginResponse) {
            const { scope } = JSON.parse(atob(loginResponse.jwt.split('.')[1]));
            this.authority = scope;

            const menu: Menu[] = this.authority.flatMap((role) => MENU[role]);
            this.menuService.setMenu(menu);
        }
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
}
