import { Route } from '@angular/router';
import { HomeSliderComponent } from 'src/app/layout/main/components/slicer/home-slider/home-slider.component';

export const router: Route = {
    path: '',
    title: 'Trang chủ',
    children: [
        {
            path: '',
            loadComponent: () => import('./home.page').then((p) => p.HomePage),
        },
        {
            path: '',
            component: HomeSliderComponent,
            outlet: 'slider-area',
        },
    ],
};
