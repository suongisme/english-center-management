import { Component, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'forgot-password-form',
    templateUrl: './forgot-password-form.component.html',
    styleUrls: ['./forgot-password-form.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, TranslateModule],
})
export class ForgotPasswordFormComponent implements OnInit {
    private formBuilder: FormBuilder = inject(FormBuilder);

    public forgotPasswordFormGroup: FormGroup;

    public ngOnInit(): void {
        this.buildForm();
    }

    private buildForm(): void {
        this.forgotPasswordFormGroup = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
        });
    }
}
