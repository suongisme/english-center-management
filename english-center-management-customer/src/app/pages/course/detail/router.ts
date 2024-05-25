import { Route } from '@angular/router';
import { DetailSliderComponent } from 'src/app/layout/main/components/slicer/detail-slider/detail-slider.component';

export const router: Route = {
    path: 'chi-tiet-khoa-hoc',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./detail.page').then((p) => p.CourseDetailPage),
        },
        {
            path: '',
            component: DetailSliderComponent,
            outlet: 'slider-area',
        },
    ],
};
