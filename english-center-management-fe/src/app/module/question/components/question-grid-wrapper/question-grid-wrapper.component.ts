import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { QuestionGridComponent } from '../question-grid/question-grid.component';
import { SearchQuestionResponse } from '../../interface/question.interface';
import { CreateQuestionModal } from '../create-question-modal/create-question-modal.component';

@Component({
    selector: 'question-grid-wrapper',
    templateUrl: './question-grid-wrapper.component.html',
    standalone: true,
    imports: [QuestionGridComponent, TranslateModule, FontAwesomeModule],
})
export class QuestionGridWrapperComponent {
    @Input() questions: SearchQuestionResponse[];

    @Output() createNew = new EventEmitter();

    private readonly modalService = inject(NgbModal);

    public openAddQuestionModal(): void {
        this.modalService
            .open(CreateQuestionModal, {
                size: 'md',
                centered: true,
            })
            .closed.subscribe((res) => {
                if (res) this.createNew.emit();
            });
    }

    public afterUpdateClassRoom(): void {
        this.createNew.emit();
    }
}
