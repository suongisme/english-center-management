import { Route } from '@angular/router';
import { Authority } from '@ecm-module/auth';

export const router: Route = {
    path: 'timetable',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./timetable.page').then((p) => p.TimetablePage),
            data: {
                title: 'Thời khóa biểu',
                role: [Authority.ADMIN, Authority.TEACHER],
            },
        },
    ],
};
