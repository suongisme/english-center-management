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

        {
            path: 'make-score',
            loadComponent: () =>
                import('./make-score/make-score.page').then(
                    (p) => p.MakeScorePage,
                ),
            data: {
                title: 'Chấm điểm',
            },
        },
    ],
};

export const gradebookHistoryRouter: Route = {
    path: 'grade-book-history',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./history/grade-book-history.page').then(
                    (p) => p.GradeBookHistoryPage,
                ),
            data: {
                title: 'Lịch sử chấm điểm',
            },
        },

        {
            path: 'detail',
            loadComponent: () =>
                import('./history/detail/detail.page').then(
                    (p) => p.GradeBookHistoryDetailPage,
                ),
            data: {
                title: 'Chi tiết lịch sử chấm điểm',
            },
        },
    ],
};
