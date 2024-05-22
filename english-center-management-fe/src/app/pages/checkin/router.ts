import { Route } from '@angular/router';

export const router: Route = {
    path: 'checkin',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./checkin.page').then((p) => p.CheckInPage),
            data: {
                title: 'Điểm danh',
            },
        },

        {
            path: 'student',
            loadComponent: () =>
                import('./checkin-student/checkin-student.page').then(
                    (p) => p.CheckinStudentPage,
                ),
            data: {
                title: 'Danh sách học viên',
            },
        },
    ],
};

export const historyRouter: Route = {
    path: 'checkin-history',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./history/checkin-history.page').then(
                    (p) => p.HistoryCheckinPage,
                ),
            data: {
                title: 'Lịch sử điểm danh',
            },
        },
        {
            path: 'detail',
            loadComponent: () =>
                import('./history/detail/history-detail.page').then(
                    (p) => p.HistoryDetailPage,
                ),
            data: {
                title: 'Lịch sử điểm danh',
            },
        },
    ],
};
