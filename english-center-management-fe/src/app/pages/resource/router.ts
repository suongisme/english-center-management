import { Route } from '@angular/router';

export const router: Route = {
    path: 'resource',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./resource.page').then((p) => p.ResourcePage),
            data: {
                title: 'Quản lý tài nguyên',
            },
        },
    ],
};
