import { NgIf } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
    ViewChild,
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
    fileToImageUrl,
    ImagePreviewComponent,
    STATUS,
} from '@ecm-module/common';
import { CreateCourseRequest, SearchCourseResponse } from '../../interface';
import { EditorModule } from 'primeng/editor';

@Component({
    selector: 'create-course-form',
    templateUrl: './course-form.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        EcmInputComponent,
        EcmSelectComponent,
        ImagePreviewComponent,
        EditorModule,

        ImagePreviewComponent,
    ],
})
export class CreateCourseFormComponent implements OnInit {
    @Input() course: SearchCourseResponse;

    @Output() formInitialized = new EventEmitter<FormGroup>();

    @Output() changeAvatar = new EventEmitter<File>();
    @ViewChild('avatarUploader') avatarUploader: ElementRef;

    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;
    public status = STATUS;
    public imageUrl: string;

    public ngOnInit(): void {
        this.buildFormGroup();
        if (this.course) {
            this.imageUrl = this.course.avatarUrl;
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
            shortDescription: [
                null,
                [Validators.required, Validators.maxLength(300)],
            ],
        });
    }

    public onChangeAvatar(event): void {
        const file = event.target.files[0];
        if (!file) return;
        this.imageUrl = fileToImageUrl(file);
        this.avatarUploader.nativeElement.value = '';
        this.changeAvatar.emit(file);
    }

    public onRemoveAvatar(): void {
        this.imageUrl = null;
        this.changeAvatar.emit(null);
    }
}
