import { Route } from '@angular/router';
import { Authority } from '@ecm-module/auth';

export const router: Route = {
    path: 'testing',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./testing.page').then((p) => p.TestingPage),
            data: {
                title: 'Quản lý bài test',
                role: [Authority.ADMIN],
            },
        },
        {
            path: 'save-testing',
            loadComponent: () =>
                import('./create/create-testing.page').then(
                    (x) => x.CreateTestingPage,
                ),
            data: {
                title: 'Bài test',
                role: [Authority.ADMIN],
            },
        },
    ],
};
