import { Route } from '@angular/router';

export const router: Route = {
    path: 'student',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./student.page').then((p) => p.StudentPage),
            data: {
                title: 'STUDENT.TITLE',
            },
        },
    ],
};
