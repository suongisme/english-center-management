import { NgFor } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    inject,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { GetStudentAndCheckinResult } from '@ecm-module/checkin';
import { EcmInputComponent } from '@ecm-module/common';

@Component({
    selector: 'user-checkin',
    templateUrl: './user-checkin.component.html',
    standalone: true,
    imports: [NgFor, EcmInputComponent, FormsModule, ReactiveFormsModule],
})
export class UserCheckInComponent implements OnInit {
    @Input() users: GetStudentAndCheckinResult[];
    @Input() readonly: boolean = false;

    @Output() formInitialized = new EventEmitter<FormArray>();

    private formBuilder = inject(FormBuilder);

    public formGroup: FormGroup;

    get studentFormArray(): FormArray {
        return this.formGroup.controls.students as FormArray;
    }

    public ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            students: this.formBuilder.array([]),
        });
        this.users.forEach((u) => {
            this.studentFormArray.push(
                this.formBuilder.group({
                    present: [
                        {
                            disabled: this.readonly,
                            value: u.present,
                        },
                        [Validators.required],
                    ],
                    studentId: [u.id],
                    note: [
                        {
                            disabled: this.readonly,
                            value: u.note,
                        },
                    ],
                }),
            );
        });
        this.formInitialized.emit(this.studentFormArray);
    }
}
