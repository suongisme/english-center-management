import { Route } from '@angular/router';

export const router: Route = {
    path: '',
    loadComponent: () => import('./home.page').then((p) => p.HomePage),
    data: {
        title: 'Trang chủ',
    },
};
