import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DestroyService, NotifierService } from '@ecm-module/common';
import {
    GradebookService,
    ListScoreStudentComponent,
} from '@ecm-module/grade-book';
import { StudentTimetableResponse, UserService } from '@ecm-module/user';
import { Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'make-score-page',
    templateUrl: './make-score.page.html',
    standalone: true,
    imports: [NgIf, AsyncPipe, ListScoreStudentComponent],
    providers: [DestroyService],
})
export class MakeScorePage implements OnInit {
    @Input() timetableId: number;

    private userService = inject(UserService);
    private gradebookService = inject(GradebookService);
    private destroyService = inject(DestroyService);
    private notifierService = inject(NotifierService);
    private router = inject(Router);

    public $students: Observable<StudentTimetableResponse[]>;
    public formArray: FormArray;

    public ngOnInit(): void {
        this.$students = this.userService.getByTimetable(this.timetableId);
    }

    public createGradebook(): void {
        this.gradebookService
            .createGradeBook({
                timetableId: this.timetableId,
                details: this.formArray.getRawValue(),
            })
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                this.notifierService.success('Lưu điểm thành công').then(() => {
                    this.router.navigate(['grade-book-history']);
                });
            });
    }
}
