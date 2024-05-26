import { Routes } from '@angular/router';
import { AuthLayout } from './auth.layout';
import { route as loginRouter } from '../../pages/login/router';
import { route as registerRouter } from '../../pages/register/router';
export const routes: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [loginRouter, registerRouter],
    },
];
