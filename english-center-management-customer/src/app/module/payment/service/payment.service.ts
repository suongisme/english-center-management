import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../common/interface';
import { environment } from 'environment';
import { AuthenticatePaymentRequest } from '../interface';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    private httpClient = inject(HttpClient);
    public authenticate(
        request: AuthenticatePaymentRequest,
    ): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(
            `${environment.BE_URL}/payment/authenticate`,
            request,
        );
    }
}
