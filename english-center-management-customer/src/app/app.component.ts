import { Component, HostListener, inject } from '@angular/core';
import { DestroyService } from '@ecm-module/common';
import { AuthService } from './module/auth/service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [DestroyService],
})
export class AppComponent {
    private authService = inject(AuthService);

    @HostListener('window:beforeunload')
    public beforeReloadPage($event): void {
        if (this.authService.isAuthenticated) {
            localStorage.setItem(
                'auth',
                JSON.stringify(this.authService.loginResponse),
            );
        }
    }
}
