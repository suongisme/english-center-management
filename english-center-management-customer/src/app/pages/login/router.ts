import { Route } from '@angular/router';

export const route: Route = {
    path: 'dang-nhap',
    loadComponent: () => import('./login.page').then((p) => p.LoginPage),
    title: 'Đăng nhập',
};
