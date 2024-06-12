import { Route } from '@angular/router';
import { AuthenticationGuard } from '@ecm-module/auth';

export const router: Route = {
    path: 'xac-thuc-thanh-toan/:paymentMethod',
    canActivate: [AuthenticationGuard],
    loadComponent: () =>
        import('./payment-authenticate.page').then(
            (p) => p.PaymentAuthenticatePage,
        ),
};
