import { Route } from '@angular/router';

export const router: Route = {
    path: 'timetable',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./timetable.page').then((p) => p.TimetablePage),
            data: {
                title: 'Thời khóa biểu',
            },
        },
    ],
};
