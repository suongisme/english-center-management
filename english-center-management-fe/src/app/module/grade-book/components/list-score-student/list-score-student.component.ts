import { AsyncPipe, NgFor } from '@angular/common';
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
import { EcmInputComponent } from '@ecm-module/common';
import { DetailResponse } from '../../interface';

@Component({
    selector: 'list-score-student',
    templateUrl: './list-score-student.component.html',
    standalone: true,
    imports: [
        AsyncPipe,
        NgFor,
        FormsModule,
        ReactiveFormsModule,
        EcmInputComponent,
    ],
})
export class ListScoreStudentComponent implements OnInit {
    @Input() readonly: boolean = false;
    @Input({ required: true }) students: DetailResponse[];

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
        this.students.forEach((student) => {
            this.studentFormArray.push(
                this.formBuilder.group({
                    studentId: student.id,
                    name: student.name,
                    score: [
                        {
                            value: student.score,
                            disabled: this.readonly,
                        },
                        [Validators.required],
                    ],
                    note: [
                        {
                            value: student.note,
                            disabled: this.readonly,
                        },
                    ],
                }),
            );
        });
        this.formInitialized.emit(this.studentFormArray);
    }
}
