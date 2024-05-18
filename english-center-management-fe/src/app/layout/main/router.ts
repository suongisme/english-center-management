import { Routes } from '@angular/router';
import { MainLayout } from './main.layout';
import { router as homeRouter } from '../../pages/home/router';
import { router as studentRouter } from '../../pages/student/router';
import { router as teacherRouter } from '../../pages/teacher/router';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [homeRouter, studentRouter, teacherRouter],
    },
];
