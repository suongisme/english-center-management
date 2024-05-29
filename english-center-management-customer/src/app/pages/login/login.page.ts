import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, LoginFormComponent } from '@ecm-module/auth';

@Component({
    selector: 'login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [LoginFormComponent, RouterLink],
})
export class LoginPage implements OnInit {
    @Input() returnUrl: string;

    private authService = inject(AuthService);

    ngOnInit(): void {
        this.authService.logout();
    }
}
