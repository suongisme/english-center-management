import { Route } from '@angular/router';
import { Authority } from '@ecm-module/auth';

export const router: Route = {
    path: 'question',
    data: {
        role: [Authority.ADMIN],
    },
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./question.page').then((p) => p.QuestionPage),
            data: {
                title: 'Ngân hàng câu hỏi',
            },
        },
    ],
};
