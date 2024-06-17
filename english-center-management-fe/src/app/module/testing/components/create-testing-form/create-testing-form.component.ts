import { AsyncPipe, NgIf } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
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
    ModalWrapperComponent,
    STATUS,
} from '@ecm-module/common';
import { SelectCourseComponent } from '@ecm-module/course';
import {
    QuestionFormSearchComponent,
    QuestionGridComponent,
    QuestionService,
    SearchQuestionRequest,
    SearchQuestionResponse,
} from '@ecm-module/question';
import {
    NgbActiveModal,
    NgbModal,
    NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { RowSelectedEvent } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
import { GetTestingResponse } from '../../interface';

@Component({
    selector: 'create-testing-form',
    templateUrl: './create-testing-form.component.html',
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        EcmInputComponent,
        EcmSelectComponent,
        SelectCourseComponent,

        QuestionGridComponent,
        QuestionFormSearchComponent,
        ModalWrapperComponent,
        AsyncPipe,
    ],
    providers: [NgbActiveModal],
})
export class CreateTestingFormComponent implements OnChanges, OnInit {
    @Input() testing: GetTestingResponse;

    @Output() formInitialized = new EventEmitter<FormGroup>();

    @Output() changeAvatar = new EventEmitter<File>();

    private formBuilder: FormBuilder = inject(FormBuilder);
    private modalService = inject(NgbModal);
    private questionService = inject(QuestionService);

    public modalRef: NgbModalRef;
    public formGroup: FormGroup;
    public status = STATUS;
    public $questions: Observable<SearchQuestionResponse[]>;
    public selectedQuestions: SearchQuestionResponse[] = [];
    public _questions: SearchQuestionResponse[] = [];

    set questions(question: SearchQuestionResponse[]) {
        this._questions = [...question];
        this.formGroup.controls.questionIds.setValue(
            this._questions.map((x) => x.id),
        );
    }

    get questions() {
        return this._questions;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes?.testing?.currentValue && this.formGroup) {
            this.formGroup.patchValue(this.testing);
            this.questions = this.testing.questions;
            this.selectedQuestions = [...this.questions];
        }
    }

    public ngOnInit(): void {
        this.buildFormGroup();
        if (this.testing) {
            this.formGroup.patchValue(this.testing);
            this.questions = this.testing.questions;
            this.selectedQuestions = [...this.questions];
        }
        this.formInitialized.emit(this.formGroup);
    }

    private buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            name: [null, [Validators.required, Validators.maxLength(255)]],
            status: [this.status[0].id, [Validators.required]],
            courseId: [null, [Validators.required]],
            questionIds: [null, [Validators.required]],
            minimumScore: [null, [Validators.required]],
        });
    }

    public openAddQuestion(templateRef: TemplateRef<any>): void {
        this.modalRef = this.modalService.open(templateRef, {
            centered: true,
            size: 'xl',
        });
        this.modalRef.closed.subscribe((res) => {
            if (res) {
                this.questions = res;
            }
        });
        this.ngSearchQuestion({});
    }

    public ngSearchQuestion(request: SearchQuestionRequest): void {
        this.$questions = this.questionService
            .searchQuestion({
                data: {
                    ...request,
                    status: 1,
                },
            })
            .pipe(map((x) => x.items));
    }

    public ngOnSelectQuestion(
        event: RowSelectedEvent<SearchQuestionResponse>,
    ): void {
        const data = event.data;
        const index = this.selectedQuestions.findIndex((x) => x.id === data.id);
        if (event.node.isSelected()) {
            if (index === -1) this.selectedQuestions.push(data);
        } else {
            this.selectedQuestions.splice(index, 1);
        }
    }

    public ngOnRemoveQuestion(data: SearchQuestionResponse): void {
        const index = this.selectedQuestions.findIndex((x) => x.id === data.id);
        this.selectedQuestions.splice(index, 1);
        this.questions = this.selectedQuestions;
    }
}
