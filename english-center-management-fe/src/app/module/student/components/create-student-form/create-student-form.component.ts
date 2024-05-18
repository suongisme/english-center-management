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
    FmsInputComponent,
    FmsSelectComponent,
    ImagePreviewComponent,
} from '@ecm-module/common';
import { TranslateModule } from '@ngx-translate/core';
import { CreateStudent } from '../../interface';

@Component({
    selector: 'create-student-form',
    templateUrl: './create-student-form.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        FmsInputComponent,
        FmsSelectComponent,
        ImagePreviewComponent,
    ],
})
export class CreateStudentFormComponent implements OnInit {
    @Input() student: CreateStudent;

    @Output() formInitialized = new EventEmitter<FormGroup>();

    @Output() changeAvatar = new EventEmitter<File>();

    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;
    public previewAvatarUrl: string;

    public ngOnInit(): void {
        this.buildFormGroup();
        if (this.student) {
            this.formGroup.patchValue(this.student);
        }
        this.formInitialized.emit(this.formGroup);
    }

    private buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            firstName: [null, [Validators.required, Validators.maxLength(255)]],
            lastName: [null, [Validators.required, Validators.maxLength(255)]],
            email: [null, [Validators.required, Validators.email]],
            phoneNumber: [
                null,
                [
                    Validators.required,
                    Validators.maxLength(20),
                    Validators.pattern('^0\\d{9}'),
                ],
            ],
            dob: [null, [Validators.required]],
            address: [null, [Validators.required, Validators.maxLength(2000)]],
            status: [null, [Validators.required]],
        });
    }
}
