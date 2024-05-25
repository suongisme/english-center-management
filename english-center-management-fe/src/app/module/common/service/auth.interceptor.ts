import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environment';
import {
    Observable,
    TimeoutError,
    catchError,
    throwError,
    timeout,
} from 'rxjs';
import { AuthService } from '../../auth/service';
import { NotifierService } from './notifier.service';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
    private readonly notifierService = inject(NotifierService);
    private readonly router = inject(Router);
    private readonly authService = inject(AuthService);

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const jwt = this.authService.loginResponse?.jwt;
        const headers = jwt
            ? req.headers.set('Authorization', `Bearer ${jwt}`)
            : req.headers;
        const requestWithToken = req.clone({
            headers: headers,
        });

        return next.handle(requestWithToken).pipe(
            timeout(environment.REQUEST_TIMEOUT),
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401 || err.status === 403) {
                        this.router.navigate(['auth', 'login']);
                        return throwError(() => err);
                    }
                    const traceId = err.error.traceId;
                    if (err.error.apiError.errors) {
                        const messages = Object.entries(
                            err.error.apiError.errors,
                        )
                            .map((x) => x[1])
                            .join(', ');
                        this.notifierService.error(messages, traceId);
                    } else if (err.error.apiError.message) {
                        this.notifierService.error(
                            err.error.apiError.message,
                            traceId,
                        );
                    }
                } else if (err instanceof TimeoutError) {
                    this.notifierService.error(
                        'The system is maintenance. Please wait a moment...',
                        null,
                        'OOPS...',
                    );
                } else {
                    this.notifierService.error(err.message, null);
                }
                return throwError(() => err);
            }),
        );
    }
}
