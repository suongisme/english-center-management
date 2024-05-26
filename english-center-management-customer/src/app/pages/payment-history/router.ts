import { Route } from '@angular/router';
import { PaymentHistorySliderComponent } from 'src/app/layout/main/components/slicer/payment-history-slider/payment-history-slider.component';

export const router: Route = {
    path: 'lich-su-thanh-toan',
    canActivate: [],
    title: 'Lịch sử thanh toán',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./payment-history.page').then(
                    (p) => p.PaymentHistoryPage,
                ),
            title: 'Lịch sử thanh toán',
        },
        {
            path: '',
            component: PaymentHistorySliderComponent,
            outlet: 'slider-area',
        },
    ],
};
