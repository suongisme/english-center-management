import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    DestroyService,
    ModalWrapperComponent,
    NotifierService,
} from '@ecm-module/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { GetQuestionResponse } from '../../interface/question.interface';
import { QuestionService } from '../../service/question.service';
import { CreateQuestionFormComponent } from '../create-question-form/create-question-form.component';

@Component({
    selector: 'create-question-modal',
    templateUrl: './create-question-modal.component.html',
    standalone: true,
    imports: [
        CreateQuestionFormComponent,
        TranslateModule,
        ModalWrapperComponent,
    ],
    providers: [DestroyService],
})
export class CreateQuestionModal {
    public formGroup: FormGroup;
    public question: GetQuestionResponse;

    private readonly activeModal = inject(NgbActiveModal);
    private readonly questionService = inject(QuestionService);
    private readonly destroyService = inject(DestroyService);
    private readonly notifierService = inject(NotifierService);

    public onSaveClassRoom() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.invalid) {
            return;
        }
        const question = this.formGroup.getRawValue();
        if (this.question) {
            this.questionService
                .updateQuestion({
                    ...question,
                    id: this.question.id,
                })
                .pipe(takeUntil(this.destroyService.$destroy))
                .subscribe((res) => {
                    this.notifierService
                        .success('Cập nhật câu hỏi thành công')
                        .then((x) => {
                            if (x.isConfirmed) {
                                this.activeModal.close(question);
                            }
                        });
                });
        } else {
            this.questionService
                .createQuestion(question)
                .pipe(takeUntil(this.destroyService.$destroy))
                .subscribe((res) => {
                    this.notifierService
                        .success('Tạo câu hỏi thành công')
                        .then((x) => {
                            if (x.isConfirmed) {
                                this.activeModal.close(question);
                            }
                        });
                });
        }
    }
}
