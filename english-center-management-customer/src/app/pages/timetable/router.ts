import { Route } from '@angular/router';
import { AuthenticationGuard } from '@ecm-module/auth';
import { TimetableSliderComponent } from 'src/app/layout/main/components/slicer/timetable-slider/timetable-slider.component';

export const router: Route = {
    path: 'thoi-khoa-bieu',
    title: 'Thời khóa biểu',
    canActivate: [AuthenticationGuard],
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./timetable.page').then((x) => x.TimetablePage),
        },
        {
            path: '',
            component: TimetableSliderComponent,
            outlet: 'slider-area',
        },
    ],
};
