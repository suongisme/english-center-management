import { AsyncPipe, NgFor } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    inject,
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
    ClassRoomService,
    SearchClassRoomResponse,
} from '@ecm-module/class-room';
import {
    EcmInputComponent,
    EcmSelectComponent,
    STATUS,
} from '@ecm-module/common';
import { CourseService, SearchCourseResponse } from '@ecm-module/course';
import { UserSearchResponse } from '@ecm-module/user';
import { Observable, forkJoin, map, of } from 'rxjs';
import { PagingResponse } from 'src/app/module/common/interface/paging.interface';
import { DATE_OF_WEEK } from '../../constant';
import { UserService } from 'src/app/module/user/services';
import { Role } from 'src/app/module/user/constant';
import { GetTimetableResponse } from '../../interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'timetable-form',
    templateUrl: './timetable-form.component.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        EcmInputComponent,
        EcmSelectComponent,
        NgFor,
        AsyncPipe,

        FontAwesomeModule,
    ],
})
export class TimetableFormComponent implements OnInit {
    @Input() timetable: GetTimetableResponse;

    @Output() formInitialized = new EventEmitter<FormGroup>();

    public formGroup: FormGroup;
    public status = STATUS;
    public day = DATE_OF_WEEK;
    public $course: Observable<SearchCourseResponse[]>;
    public $teachers: Observable<UserSearchResponse[]>;
    public $classRooms: Observable<SearchClassRoomResponse[]>;
    public $students: Observable<UserSearchResponse[]>;

    private readonly formBuilder = inject(FormBuilder);
    private readonly courseService = inject(CourseService);
    private readonly classRoomService = inject(ClassRoomService);
    private readonly userService = inject(UserService);

    get detailsArrayForm(): FormArray {
        return this.formGroup.controls.details as FormArray;
    }

    public ngOnInit(): void {
        this.buildForm();
        this.loadCourse();
        this.loadTeacher();
        this.loadClassRoom();
        if (this.timetable) {
            this.formGroup.patchValue(this.timetable);
            this.formGroup.get('courseId').disable();
        }
    }

    private buildForm(): void {
        this.formGroup = this.formBuilder.group({
            classRoomId: [null, [Validators.required]],
            teacherId: [null, [Validators.required]],
            courseId: [null, [Validators.required]],
            students: [null],
            details: this.formBuilder.array([
                this.formBuilder.group({
                    day: [null, [Validators.required]],
                    startTime: [null, [Validators.required]],
                }),
            ]),
        });
        if (this.timetable) {
            this.timetable.details.forEach((x, index) => {
                if (index === this.timetable.details.length - 1) return;
                this.addRow();
            });
            this.formGroup.patchValue(this.timetable);
        }
        this.formGroup.controls.courseId.valueChanges.subscribe((value) => {
            if (!value) {
                this.$students = of();
            } else {
                if (this.timetable) {
                    this.$students = forkJoin([
                        this.userService.searchUser({
                            data: {
                                userIds: this.timetable.students,
                            },
                        }),
                        this.userService.getPaidStudent(value),
                    ]).pipe(
                        map(([res1, res2]) => {
                            return [...(res1?.items ?? []), ...(res2 ?? [])];
                        }),
                    );
                    return;
                }
                this.$students = this.userService.getPaidStudent(value);
            }
        });
        this.formInitialized.emit(this.formGroup);
    }

    private loadCourse(): void {
        this.$course = this.courseService
            .searchCourse({
                data: {
                    status: 1,
                },
            })
            .pipe(
                map<
                    PagingResponse<SearchCourseResponse>,
                    SearchCourseResponse[]
                >((x) => {
                    return x.items;
                }),
            );
    }

    private loadTeacher(): void {
        this.$teachers = this.userService
            .searchUser({
                data: {
                    status: 1,
                    role: Role.TEACHER,
                },
            })
            .pipe(
                map<PagingResponse<UserSearchResponse>, UserSearchResponse[]>(
                    (x) => {
                        return x.items;
                    },
                ),
            );
    }

    private loadClassRoom(): void {
        this.$classRooms = this.classRoomService
            .searchClassRoom({
                data: {
                    status: 1,
                },
            })
            .pipe(
                map<
                    PagingResponse<SearchClassRoomResponse>,
                    SearchClassRoomResponse[]
                >((x) => x.items),
            );
    }

    public addRow(): void {
        this.detailsArrayForm.push(
            this.formBuilder.group({
                day: [null, [Validators.required]],
                startTime: [null, [Validators.required]],
            }),
        );
    }

    public removeRow(index: number): void {
        if (this.detailsArrayForm.length == 1) return;
        this.detailsArrayForm.removeAt(index);
    }
}
