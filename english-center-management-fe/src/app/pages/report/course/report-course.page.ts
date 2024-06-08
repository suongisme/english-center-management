import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DestroyService,
    EcmBoxComponent,
    EcmInputComponent,
} from '@ecm-module/common';
import {
    CourseService,
    CourseStatisticalGridComponent,
    GetStatisticalCourseResponse,
} from '@ecm-module/course';
import { StatisticTimetableModal } from '@ecm-module/timetable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    Observable,
    debounceTime,
    forkJoin,
    map,
    of,
    take,
    takeUntil,
} from 'rxjs';

@Component({
    selector: 'report-course-page',
    templateUrl: './report-course.page.html',
    standalone: true,
    imports: [
        FontAwesomeModule,
        EcmBoxComponent,
        CourseStatisticalGridComponent,
        EcmInputComponent,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule,
        AsyncPipe,
        NgIf,
    ],
    providers: [DestroyService],
})
export class ReportCoursePage implements OnInit {
    private fb = inject(FormBuilder);
    private courseService = inject(CourseService);
    private destroyService = inject(DestroyService);
    private modalService = inject(NgbModal);

    public formGroup = this.fb.group({
        searchValue: [null],
    });

    public $course: Observable<GetStatisticalCourseResponse[]>;
    public $totalCourse: Observable<number>;

    ngOnInit(): void {
        forkJoin([
            this.getCourse(null),
            this.courseService
                .searchCourse({ data: {} })
                .pipe(map((x) => x.totalItems)),
        ])
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe(([course, totalCourse]) => {
                this.$course = of(course);
                this.$totalCourse = of(totalCourse);
            });

        this.formGroup.controls.searchValue.valueChanges
            .pipe(debounceTime(300))
            .subscribe((value) => {
                this.$course = this.getCourse(value);
            });
    }

    onShowTimetable(course: GetStatisticalCourseResponse): void {
        const modalRef = this.modalService.open(StatisticTimetableModal, {
            centered: true,
            size: 'xl',
        });
        modalRef.componentInstance.courseId = course.id;
    }

    getCourse(value) {
        return this.courseService
            .getStatisticalCourse({
                data: {
                    name: value,
                },
            })
            .pipe(
                map((x) => x.items),
                takeUntil(this.destroyService.$destroy),
            );
    }
}
