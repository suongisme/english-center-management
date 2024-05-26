import { Component, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EcmInputComponent, NotifierService } from '@ecm-module/common';
import { AuthService } from '../../service';

@Component({
    selector: 'register-form',
    templateUrl: './register-form.component.html',
    standalone: true,
    imports: [EcmInputComponent, FormsModule, ReactiveFormsModule, RouterLink],
})
export class RegisterFormComponent implements OnInit {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private notifierService = inject(NotifierService);

    public registerFormGroup: FormGroup;

    public ngOnInit(): void {
        this.buildForm();
    }

    private buildForm(): void {
        this.registerFormGroup = this.formBuilder.group({
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
    }

    public register(): void {
        if (this.registerFormGroup.invalid) {
            this.registerFormGroup.markAllAsTouched();
            return;
        }
        const registerRequest = this.registerFormGroup.getRawValue();
        this.authService.register(registerRequest).subscribe((res) => {
            this.notifierService
                .success('Đăng ký tài khoản thành công')
                .then(() => this.router.navigate(['/xac-thuc', 'dang-nhap']));
        });
    }
}
