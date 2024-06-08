import { Route } from '@angular/router';
import { Authority } from '@ecm-module/auth';

export const router: Route = {
    path: 'user',
    data: {
        role: [Authority.ADMIN],
    },
    children: [
        {
            path: 'student',
            loadComponent: () => import('./user.page').then((p) => p.UserPage),
            data: {
                title: 'Quản lý học viên',
                role: 'STUDENT',
            },
        },
        {
            path: 'teacher',
            loadComponent: () => import('./user.page').then((p) => p.UserPage),
            data: {
                title: 'Quản lý giáo viên',
                role: 'TEACHER',
            },
        },
        {
            path: 'admin',
            loadComponent: () => import('./user.page').then((p) => p.UserPage),
            data: {
                title: 'Quản lý nhân viên',
                role: 'ADMIN',
            },
        },
    ],
};
