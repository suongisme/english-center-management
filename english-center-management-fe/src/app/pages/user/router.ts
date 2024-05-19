import { Route } from '@angular/router';

export const router: Route = {
    path: 'user',
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
