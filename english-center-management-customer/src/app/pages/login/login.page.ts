import { Component } from '@angular/core';
import { LoginFormComponent } from '@ecm-module/auth';

@Component({
    selector: 'login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [LoginFormComponent],
})
export class LoginPage {}
