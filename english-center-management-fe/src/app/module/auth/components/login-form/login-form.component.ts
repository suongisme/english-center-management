import { Component, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EcmInputComponent, NotifierService } from '@ecm-module/common';
import { AuthService } from '../../service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: true,
    imports: [EcmInputComponent, FormsModule, ReactiveFormsModule],
})
export class LoginFormComponent implements OnInit {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private notifierService = inject(NotifierService);

    public loginFormGroup: FormGroup;

    public ngOnInit(): void {
        this.buildForm();
    }

    private buildForm(): void {
        this.loginFormGroup = this.formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
    }

    public login(): void {
        if (this.loginFormGroup.invalid) {
            this.loginFormGroup.markAllAsTouched();
            return;
        }
        const loginRequest = this.loginFormGroup.getRawValue();
        this.authService.login(loginRequest).subscribe((res) => {
            if (
                !this.authService.authority.includes('TEACHER') &&
                !this.authService.authority.includes('ADMIN')
            ) {
                this.notifierService.error('Bạn không có quyền truy cập');
                return;
            }
            this.router.navigate(['']);
        });
    }
}
