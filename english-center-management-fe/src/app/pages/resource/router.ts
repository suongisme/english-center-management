import { Route } from '@angular/router';
import { Authority } from '@ecm-module/auth';

export const router: Route = {
    path: 'resource',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./resource.page').then((p) => p.ResourcePage),
            data: {
                title: 'Quản lý tài nguyên',
                role: [Authority.ADMIN, Authority.TEACHER],
            },
        },
    ],
};
