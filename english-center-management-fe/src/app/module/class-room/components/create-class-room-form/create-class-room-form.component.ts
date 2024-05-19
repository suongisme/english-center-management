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
import { CreateClassRoomRequest } from '../../interface';
import { POSITION } from '../../constant';

@Component({
    selector: 'create-class-room-form',
    templateUrl: './create-class-room-form.component.html',
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
export class CreateClassRoomFormComponent implements OnInit {
    @Input() classRoom: CreateClassRoomRequest;

    @Output() formInitialized = new EventEmitter<FormGroup>();

    @Output() changeAvatar = new EventEmitter<File>();

    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;
    public status = STATUS;
    public position = POSITION;

    public ngOnInit(): void {
        this.buildFormGroup();
        if (this.classRoom) {
            this.formGroup.patchValue(this.classRoom);
        }
        this.formInitialized.emit(this.formGroup);
    }

    private buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            name: [null, [Validators.required, Validators.maxLength(255)]],
            position: [this.position[0], [Validators.required]],
            size: [null, [Validators.required]],
            status: [this.status[0].id, [Validators.required]],
        });
    }
}
