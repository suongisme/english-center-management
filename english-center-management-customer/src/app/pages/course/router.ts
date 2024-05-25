import { Route } from '@angular/router';
import { CourseSliderComponent } from 'src/app/layout/main/components/slicer/course-slider/course-slider.component';

export const router: Route = {
    path: 'khoa-hoc',
    title: 'Khóa học',
    children: [
        {
            path: '',
            loadComponent: () =>
                import('./course.page').then((p) => p.CoursePage),
        },
        {
            path: '',
            component: CourseSliderComponent,
            outlet: 'slider-area',
        },
    ],
};
