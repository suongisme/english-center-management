import { Route } from '@angular/router';
import { PaymentSliderComponent } from 'src/app/layout/main/components/slicer/payment-slider/payment-slider.component';

export const router: Route = {
    path: 'thanh-toan/:slug',
    title: 'Thanh toán',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./payment.page').then((p) => p.PaymentPage),
        },
        {
            path: '',
            component: PaymentSliderComponent,
            outlet: 'slider-area',
        },
    ],
};
