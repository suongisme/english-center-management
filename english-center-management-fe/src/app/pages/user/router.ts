import { Route } from '@angular/router';
import { Authority } from '@ecm-module/auth';

export const router: Route = {
    path: 'user',
    data: {
        role: [Authority.ADMIN],
    },
    children: [
        {
            path: '',
            loadComponent: () => import('./user.page').then((p) => p.UserPage),
            data: {
                title: 'Quản lý người dùng',
            },
        },
    ],
};
