import { Component, HostListener, OnInit, inject } from '@angular/core';
import { DestroyService } from '@ecm-module/common';
import { AuthService } from './module/auth/service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [DestroyService],
})
export class AppComponent implements OnInit {
    private authService = inject(AuthService);

    public ngOnInit(): void {
        const json = localStorage.getItem('auth');
        if (json) {
            const auth = JSON.parse(json);
            this.authService.loginResponse = auth;
            localStorage.removeItem('auth');
        }
    }

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
