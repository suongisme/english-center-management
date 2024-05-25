import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service';

export const AuthorizationGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): boolean => {
    const { role } = route.children[0].data;
    if (!role) return true;

    const authService = inject(AuthService);
    const router = inject(Router);
    if (role.some((r) => authService.authority?.includes(r))) {
        return true;
    }
    router.navigate(['auth', 'login']);
    return false;
};
