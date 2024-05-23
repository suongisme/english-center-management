import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { EcmBoxComponent, PagingResponse } from '@ecm-module/common';
import {
    GradeBookGridComponent,
    GradebookService,
    SearchGradeBookResponse,
} from '@ecm-module/grade-book';
import { Observable } from 'rxjs';

@Component({
    selector: 'grade-book-history-page',
    templateUrl: './grade-book-history.page.html',
    standalone: true,
    imports: [NgIf, AsyncPipe, EcmBoxComponent, GradeBookGridComponent],
})
export class GradeBookHistoryPage implements OnInit {
    private gradebookService = inject(GradebookService);

    public $gradebooks: Observable<PagingResponse<SearchGradeBookResponse>>;
    ngOnInit(): void {
        this.$gradebooks = this.gradebookService.searchGradeBook();
    }
}
