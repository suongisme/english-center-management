import { Route } from '@angular/router';

export const route: Route = {
    path: 'dang-ky',
    loadComponent: () => import('./register.page').then((p) => p.RegisterPage),
    title: 'Đăng ký tài khoản',
};
