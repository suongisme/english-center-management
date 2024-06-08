import { Routes } from '@angular/router';
import { MainLayout } from './main.layout';
import { router as homeRouter } from '../../pages/home/router';
import { router as userRouter } from '../../pages/user/router';
import { router as classRoomRouter } from '../../pages/class-room/router';
import { router as courseRouter } from '../../pages/course/router';
import { router as timetableRouter } from '../../pages/timetable/router';
import { router as questionRouter } from '../../pages/question/router';
import { router as testingRouter } from '../../pages/testing/router';
import {
    router as checkinRouter,
    historyRouter,
} from '../../pages/checkin/router';
import { router as resourceRouter } from '../../pages/resource/router';
import {
    router as gradeBookRouter,
    gradebookHistoryRouter,
} from '../../pages/grade-book/router';
import { AuthenticationGuard, AuthorizationGuard } from '@ecm-module/auth';
import { route as changePasswordRouter } from '../../pages/change-password/router';
import { router as reportRouter } from '../../pages/report/router';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        canActivate: [AuthenticationGuard, AuthorizationGuard],
        children: [
            homeRouter,
            userRouter,
            classRoomRouter,
            courseRouter,
            timetableRouter,
            questionRouter,
            testingRouter,
            checkinRouter,
            historyRouter,
            resourceRouter,
            gradeBookRouter,
            gradebookHistoryRouter,
            changePasswordRouter,
            reportRouter,
        ],
    },
];
