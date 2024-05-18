import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from './sprinner.service';

@Injectable({
    providedIn: 'root',
})
export class LoaderInterceptor implements HttpInterceptor {
    private readonly spinnerService = inject(SpinnerService);

    private loadingRequest: Array<HttpRequest<any>> = [];

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        this.spinnerService.changeStateSpinner(true);
        this.loadingRequest.push(req);
        return next.handle(req).pipe(
            finalize(() => {
                if (!this.loadingRequest || this.loadingRequest.length) {
                    this.spinnerService.changeStateSpinner(false);
                    return;
                }
                this.loadingRequest.shift();
            }),
        );
    }
}
