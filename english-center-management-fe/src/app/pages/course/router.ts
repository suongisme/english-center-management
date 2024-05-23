import { Route } from '@angular/router';
import { Authority } from '@ecm-module/auth';

export const router: Route = {
    path: 'course',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./course.page').then((p) => p.CoursePage),
            data: {
                title: 'Quản lý khóa học',
                role: [Authority.ADMIN],
            },
        },
    ],
};
