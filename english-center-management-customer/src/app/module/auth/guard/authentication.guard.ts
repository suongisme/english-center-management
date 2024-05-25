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
    const authService = inject(AuthService);
    const router = inject(Router);
    if (!authService.isAuthenticated) {
        router.navigate(['auth', 'login']);
        return false;
    }
    return true;
};
