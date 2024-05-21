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
