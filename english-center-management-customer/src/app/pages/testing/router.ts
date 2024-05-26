import { Route } from '@angular/router';
import { TestingSliderComponent } from 'src/app/layout/main/components/slicer/testing-slider/testing-slider.component';

export const router: Route = {
    path: 'kiem-tra',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./testing.page').then((p) => p.TestingPage),
        },
        {
            path: '',
            component: TestingSliderComponent,
            outlet: 'slider-area',
        },
    ],
};
