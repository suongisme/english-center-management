import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import {
    DetailResponse,
    GradebookService,
    ListScoreStudentComponent,
} from '@ecm-module/grade-book';
import { Observable } from 'rxjs';

@Component({
    selector: 'gradebook-history-detail-page',
    templateUrl: './detail.page.html',
    standalone: true,
    imports: [NgIf, AsyncPipe, ListScoreStudentComponent],
})
export class GradeBookHistoryDetailPage implements OnInit {
    @Input({ required: true }) id: number;

    public $detail: Observable<DetailResponse[]>;
    private gradebookService = inject(GradebookService);

    ngOnInit(): void {
        this.$detail = this.gradebookService.getDetail(this.id);
    }
}
