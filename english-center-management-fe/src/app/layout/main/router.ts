import { Routes } from '@angular/router';
import { MainLayout } from './main.layout';
import { router as homeRouter } from '../../pages/home/router';
import { router as userRouter } from '../../pages/user/router';
import { router as classRoomRouter } from '../../pages/class-room/router';
import { router as courseRouter } from '../../pages/course/router';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [homeRouter, userRouter, classRoomRouter, courseRouter],
    },
];
