import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service';

export const AuthenticationGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): boolean => {
    const returnUrl = route.url.map((x) => x.path).join('/');
    const authService = inject(AuthService);
    const router = inject(Router);
    if (!authService.isAuthenticated) {
        router.navigate(['xac-thuc', 'dang-nhap'], {
            queryParams: {
                returnUrl: `/${returnUrl}`,
            },
        });
        return false;
    }
    return true;
};
