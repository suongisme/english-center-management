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
    selector: 'register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, TranslateModule],
})
export class RegisterFormComponent implements OnInit {
    private formBuilder: FormBuilder = inject(FormBuilder);

    public registerFormGroup: FormGroup;

    public ngOnInit(): void {
        this.buildForm();
    }

    private buildForm(): void {
        this.registerFormGroup = this.formBuilder.group({
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
        });
    }
}
