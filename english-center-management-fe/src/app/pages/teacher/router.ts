import { Route } from '@angular/router';

export const router: Route = {
    path: 'teacher',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./teacher.page').then((p) => p.TeacherPage),
            data: {
                title: 'Quản lý giáo viên',
            },
        },
    ],
};
