import { NgFor, NgIf } from '@angular/common';
import {
    Component,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    FormArray,
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
import {
    CreateQuestionRequest,
    GetQuestionResponse,
} from '../../interface/question.interface';
import { LEVEL } from '../../constant/question.const';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'create-question-form',
    templateUrl: './create-question-form.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        EcmInputComponent,
        EcmSelectComponent,
        ImagePreviewComponent,
        FontAwesomeModule,
    ],
})
export class CreateQuestionFormComponent implements OnInit {
    @Input() question: GetQuestionResponse;

    @Output() formInitialized = new EventEmitter<FormGroup>();

    @Output() changeAvatar = new EventEmitter<File>();

    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;
    public status = STATUS;
    public level = LEVEL;
    public currentCorrectAnswerIndex: number = 0;

    get answers(): FormArray {
        return this.formGroup.controls.answers as FormArray;
    }

    public ngOnInit(): void {
        this.buildFormGroup();
        if (this.question) {
            this.question.answers?.forEach((x, i) => {
                if (i === this.question.answers.length - 1) return;
                this.addAnswer();
            });
            this.currentCorrectAnswerIndex = this.question.answers.findIndex(
                (x) => x.correct,
            );
            this.formGroup.patchValue(this.question);
        }
        this.formInitialized.emit(this.formGroup);
    }

    private buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            title: [null, [Validators.required, Validators.maxLength(255)]],
            level: [this.level[0].id, [Validators.required]],
            status: [this.status[0].id, [Validators.required]],
            score: [null, [Validators.required, Validators.min(1)]],
            answers: this.formBuilder.array([
                this.formBuilder.group({
                    title: [null, [Validators.required]],
                    correct: [true],
                }),
            ]),
        });
    }

    public addAnswer(): void {
        const answerForm = this.formBuilder.group({
            title: [null, [Validators.required]],
            correct: [null],
        });
        this.answers.push(answerForm);
    }

    public removeAnswer(index: number): void {
        if (this.answers.length === 1) return;
        this.answers.removeAt(index);
    }

    public onChangeCorrectAnswer(index: number): void {
        this.answers
            .at(this.currentCorrectAnswerIndex)
            .get('correct')
            .setValue(false);
        this.answers.at(index).get('correct').setValue(true);
        this.currentCorrectAnswerIndex = index;
    }
}
