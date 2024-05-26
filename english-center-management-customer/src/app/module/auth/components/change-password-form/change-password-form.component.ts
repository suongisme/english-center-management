import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ChangePasswordRequest } from '../../interface';
import { EcmInputComponent } from '@ecm-module/common';
import { repeatPasswordValidator } from './repeat-password.validation';

@Component({
    selector: 'change-password-form',
    templateUrl: './change-password-form.component.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, EcmInputComponent],
})
export class ChangePasswordFormComponent implements OnInit {
    @Output() formInitialized = new EventEmitter<FormGroup>();

    public formGroup: FormGroup;

    private formBuilder = inject(FormBuilder);

    public ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            currentPassword: [null, [Validators.required]],
            newPassword: [null, [Validators.required, Validators.minLength(8)]],
            repeatPassword: [null],
        });
        this.formGroup.controls.repeatPassword.setValidators([
            repeatPasswordValidator(this.formGroup.controls.newPassword),
            Validators.minLength(8),
        ]);
        this.formInitialized.emit(this.formGroup);
    }
}
