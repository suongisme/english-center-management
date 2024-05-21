import { Component, OnInit, inject } from '@angular/core';

import {
    DestroyService,
    EcmBoxComponent,
    Pagination,
    PaginationComponent,
} from '@ecm-module/common';
import {
    QuestionFormSearchComponent,
    QuestionGridWrapperComponent,
    QuestionService,
    SearchQuestionRequest,
    SearchQuestionResponse,
} from '@ecm-module/question';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'question-page',
    templateUrl: './question.page.html',
    standalone: true,
    imports: [
        QuestionFormSearchComponent,
        PaginationComponent,
        EcmBoxComponent,
        QuestionGridWrapperComponent,

        TranslateModule,
        FontAwesomeModule,
    ],
    providers: [DestroyService],
})
export class QuestionPage implements OnInit {
    public pagination: Pagination = new Pagination(1, 0);
    public searchRequest: SearchQuestionRequest;
    public questions: SearchQuestionResponse[];

    private readonly destroyService = inject(DestroyService);
    private readonly questionService = inject(QuestionService);

    public ngOnInit(): void {
        this.paginate(this.pagination);
    }

    public ngOnSearch(searchRequest: SearchQuestionRequest): void {
        this.searchRequest = searchRequest;
        this.paginate(this.pagination);
    }

    public paginate(pagination: Pagination): void {
        this.pagination = pagination;
        this.questionService
            .searchQuestion({
                pageNo: this.pagination.page,
                pageSize: this.pagination.pageSize,
                data: this.searchRequest,
            })
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                this.questions = res.items;
                this.pagination.total = res.totalItems;
            });
    }
}
