import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterFormComponent } from '@ecm-module/auth';

@Component({
    selector: 'register-page',
    templateUrl: './register.page.html',
    standalone: true,
    imports: [RegisterFormComponent, RouterLink],
})
export class RegisterPage {}
