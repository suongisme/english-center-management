import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('@ecm-layout/auth').then((m) => m.AuthModule),
    },
    {
        path: '',
        loadChildren: () =>
            import('@ecm-layout/main').then((m) => m.MainModule),
    },
    {
        path: '**',
        loadComponent: () =>
            import('./pages/error/404/not-found.page').then(
                (p) => p.NotFoundPage,
            ),
    },
];
