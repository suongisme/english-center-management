import { Routes } from '@angular/router';
import { router as courseRouter } from '../../pages/course/router';
import { router as detailRouter } from '../../pages/course/detail/router';
import { router as homeRouter } from '../../pages/home/router';
import { router as contactRouter } from '../../pages/contact/router';
import { router as testingRouter } from '../../pages/testing/router';
import { router as paymentHistoryRouter } from '../../pages/payment-history/router';
import { router as timetableRouter } from '../../pages/timetable/router';
import { router as paymentRouter } from '../../pages/payment/router';
import { router as authenticatePaymentRouter } from '../../pages/payment/authenticate/router';
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
            paymentHistoryRouter,
            timetableRouter,
            paymentRouter,
            authenticatePaymentRouter,
        ],
    },
];
