import { Component, Input, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EcmInputComponent } from '@ecm-module/common';
import { AuthService } from '../../service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: true,
    imports: [EcmInputComponent, FormsModule, ReactiveFormsModule, RouterLink],
})
export class LoginFormComponent implements OnInit {
    @Input() returnUrl: string;

    private formBuilder: FormBuilder = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

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
            console.log(this.returnUrl);
            this.router.navigate([this.returnUrl ?? '']);
        });
    }
}
