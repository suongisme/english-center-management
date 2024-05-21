import { Route } from '@angular/router';

export const router: Route = {
    path: 'testing',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./testing.page').then((p) => p.TestingPage),
            data: {
                title: 'Quản lý bài test',
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
            },
        },
    ],
};
