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
import { EcmInputComponent, formatDate, STATUS } from '@ecm-module/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        EcmInputComponent,
    ],
})
export class UserFormComponent implements OnInit {
    @Input() user;

    @Output() formInitialized = new EventEmitter<FormGroup>();

    @Output() changeAvatar = new EventEmitter<File>();

    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;
    public previewAvatarUrl: string;
    public status = STATUS;

    public ngOnInit(): void {
        this.buildFormGroup();
        if (this.user) {
            this.formGroup.patchValue({
                ...this.user,
                dob: formatDate(this.user.dob, 'yyyy-MM-dd'),
            });
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
        });
    }
}
