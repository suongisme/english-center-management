import { Route } from '@angular/router';
import { Authority } from '@ecm-module/auth';

export const router: Route = {
    path: 'report',
    data: {
        role: [Authority.ADMIN],
    },
    children: [
        {
            path: 'course',
            loadComponent: () =>
                import('./course/report-course.page').then(
                    (p) => p.ReportCoursePage,
                ),
            data: {
                title: 'Thông kê khóa học',
            },
        },
        {
            path: 'student',
            loadComponent: () =>
                import('./student/report-student.page').then(
                    (p) => p.ReportStudentPage,
                ),
            data: {
                title: 'Thông kê học viên',
            },
        },
        {
            path: 'revenue',
            loadComponent: () =>
                import('./revenue/revenue.page').then((p) => p.RevenuePage),
            data: {
                title: 'Thông kê doanh thu',
            },
        },
    ],
};
