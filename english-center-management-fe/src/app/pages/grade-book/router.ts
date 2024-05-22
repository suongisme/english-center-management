import { Route } from '@angular/router';

export const router: Route = {
    path: 'grade-book',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./grade-book.page').then((p) => p.GradeBookPage),
            data: {
                title: 'Sổ điểm',
            },
        },
    ],
};
