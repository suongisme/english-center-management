import { Routes } from '@angular/router';
import { AuthenticationGuard, AuthorizationGuard } from '@ecm-module/auth';

import { router as courseRouter } from '../../pages/course/router';
import { router as detailRouter } from '../../pages/course/detail/router';
import { router as homeRouter } from '../../pages/home/router';
import { router as contactRouter } from '../../pages/contact/router';
import { router as testingRouter } from '../../pages/testing/router';

import { MainLayout } from './main.layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            homeRouter,
            courseRouter,
            contactRouter,
            detailRouter,
            testingRouter,
        ],
    },
];
