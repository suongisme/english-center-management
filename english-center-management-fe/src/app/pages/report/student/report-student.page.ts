import { StatisticStudentGridComponent } from './../../../module/user/components/statistic-student-grid/statistic-student-grid.component';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DestroyService,
    EcmBoxComponent,
    EcmInputComponent,
} from '@ecm-module/common';
import { GetStatisticUserResponse, UserService, Role } from '@ecm-module/user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, debounceTime, forkJoin, map, of, takeUntil } from 'rxjs';

@Component({
    selector: 'report-student-page',
    templateUrl: './report-student.page.html',
    standalone: true,
    imports: [
        FontAwesomeModule,
        EcmBoxComponent,
        EcmInputComponent,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeModule,
        AsyncPipe,
        StatisticStudentGridComponent,
    ],
    providers: [DestroyService],
})
export class ReportStudentPage implements OnInit {
    private fb = inject(FormBuilder);
    private destroyService = inject(DestroyService);
    private userService = inject(UserService);

    public formGroup = this.fb.group({
        searchValue: [null],
    });

    public $student: Observable<GetStatisticUserResponse[]>;
    public $totalStudent: Observable<number>;
    public additionalColumn = [
        {
            headerName: 'Khóa học',
            minWidth: 100,
            field: 'totalCourse',
        },
    ];

    ngOnInit(): void {
        forkJoin([
            this.getStudent(null),
            this.userService
                .searchUser({
                    data: { role: Role.STUDENT },
                })
                .pipe(map((x) => x.totalItems)),
        ]).subscribe(([student, totalStudent]) => {
            this.$student = of(student);
            this.$totalStudent = of(totalStudent);
        });
        this.formGroup.controls.searchValue.valueChanges
            .pipe(debounceTime(300))
            .subscribe((value) => {
                this.$student = this.getStudent(value);
            });
    }

    getStudent(value) {
        return this.userService
            .statisticUser({
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
