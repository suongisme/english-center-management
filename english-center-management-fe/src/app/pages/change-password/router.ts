import { Route } from '@angular/router';

export const route: Route = {
    path: 'change-password',
    loadComponent: () =>
        import('./change-password.page').then((p) => p.ChangePasswordPage),
    data: {
        title: 'Đổi mật khẩu',
    },
};
