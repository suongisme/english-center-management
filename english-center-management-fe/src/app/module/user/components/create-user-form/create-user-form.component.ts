import { NgIf } from '@angular/common';
import {
    Component,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    EcmInputComponent,
    EcmSelectComponent,
    ImagePreviewComponent,
    STATUS,
} from '@ecm-module/common';
import { TranslateModule } from '@ngx-translate/core';
import { CreateUser } from '../../interface';

@Component({
    selector: 'create-user-form',
    templateUrl: './create-user-form.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        EcmInputComponent,
        EcmSelectComponent,
        ImagePreviewComponent,
    ],
})
export class CreateUserFormComponent implements OnInit {
    @Input() user: CreateUser;

    @Output() formInitialized = new EventEmitter<FormGroup>();

    @Output() changeAvatar = new EventEmitter<File>();

    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;
    public previewAvatarUrl: string;
    public status = STATUS;

    public ngOnInit(): void {
        this.buildFormGroup();
        if (this.user) {
            this.formGroup.patchValue(this.user);
        }
        this.formInitialized.emit(this.formGroup);
    }

    private buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            firstName: [null, [Validators.required, Validators.maxLength(255)]],
            lastName: [null, [Validators.required, Validators.maxLength(255)]],
            email: [null, [Validators.required, Validators.email]],
            phone: [
                null,
                [
                    Validators.required,
                    Validators.maxLength(20),
                    Validators.pattern('^0\\d{9}'),
                ],
            ],
            dob: [null, [Validators.required]],
            address: [null, [Validators.required, Validators.maxLength(2000)]],
            status: [this.status[0].id, [Validators.required]],
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });
        if (this.user) {
            this.formGroup.controls.password.setValidators([]);
        }
    }
}
