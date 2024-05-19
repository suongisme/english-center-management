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
import { CreateCourseRequest } from '../../interface';
import { EditorModule } from 'primeng/editor';

@Component({
    selector: 'create-course-form',
    templateUrl: './course-form.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        EcmInputComponent,
        EcmSelectComponent,
        ImagePreviewComponent,
        EditorModule,
    ],
})
export class CreateCourseFormComponent implements OnInit {
    @Input() course: CreateCourseRequest;

    @Output() formInitialized = new EventEmitter<FormGroup>();

    @Output() changeAvatar = new EventEmitter<File>();

    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;
    public status = STATUS;

    public ngOnInit(): void {
        this.buildFormGroup();
        if (this.course) {
            this.formGroup.patchValue(this.course);
        }
        this.formInitialized.emit(this.formGroup);
    }

    private buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            name: [null, [Validators.required, Validators.maxLength(255)]],
            description: [null],
            duration: [
                null,
                [Validators.required, Validators.min(1), Validators.max(24)],
            ],
            discount: [
                null,
                [Validators.required, Validators.min(0), Validators.max(100)],
            ],
            price: [null, [Validators.required]],
            numberOfLesson: [null, [Validators.required]],
            status: [this.status[0].id, [Validators.required]],
        });
    }
}
