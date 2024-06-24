import { NgIf } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    inject,
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
    MoneyPipe,
    STATUS,
    fileToImageUrl,
} from '@ecm-module/common';
import { EditorModule } from 'primeng/editor';
import { debounceTime } from 'rxjs';
import { SearchCourseResponse } from '../../interface';

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
    providers: [MoneyPipe],
})
export class CreateCourseFormComponent implements OnInit {
    @Input() course: SearchCourseResponse;

    @Output() formInitialized = new EventEmitter<FormGroup>();

    @Output() changeAvatar = new EventEmitter<File>();
    @ViewChild('avatarUploader') avatarUploader: ElementRef;

    private formBuilder: FormBuilder = inject(FormBuilder);
    private moneyPipe = inject(MoneyPipe);

    public formGroup: FormGroup;
    public status = STATUS;
    public imageUrl: string;

    public ngOnInit(): void {
        this.buildFormGroup();
        if (this.course) {
            this.imageUrl = this.course.avatarUrl;
            const newMoney = this.moneyPipe.transform(this.course.price, 'VND');
            this.formGroup.patchValue({
                ...this.course,
                price: newMoney.substring(0, newMoney.length - 2),
            });
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
        const priceControl = this.formGroup.get('price');
        priceControl.valueChanges.pipe(debounceTime(100)).subscribe((res) => {
            const money = this.handleMoney(res);
            if (!money) {
                priceControl.setValue(null, { emitEvent: false });
                return;
            }
            const newMoney = this.moneyPipe.transform(money, 'VND');
            priceControl.setValue(newMoney.substring(0, newMoney.length - 2), {
                emitEvent: false,
            });
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

    private handleMoney(value: string): string | null {
        if (!value) return null;
        return value.replace(/[^\d]/g, '');
    }
}
