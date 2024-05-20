import { Route } from '@angular/router';

export const router: Route = {
    path: 'question',
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
