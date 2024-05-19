import { AsyncPipe, NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
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
import { Observable, map } from 'rxjs';
import { PagingResponse } from 'src/app/module/common/interface/paging.interface';
import { DATE_OF_WEEK } from '../../constant';
import { UserService } from 'src/app/module/user/services';
import { Role } from 'src/app/module/user/constant';

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
    ],
})
export class TimetableFormComponent implements OnInit {
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

    public ngOnInit(): void {
        this.buildForm();
        this.loadCourse();
        this.loadTeacher();
        this.loadClassRoom();
        this.loadStudent();
    }

    private buildForm(): void {
        this.formGroup = this.formBuilder.group({
            classRoomId: [null, [Validators.required]],
            teacherId: [null, [Validators.required]],
            courseId: [null, [Validators.required]],
            day: [null, [Validators.required]],
            startTime: [null, [Validators.required]],
            status: [null, [Validators.required]],
            students: [null],
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

    private loadStudent(): void {
        this.$students = this.userService
            .searchUser({
                data: {
                    status: 1,
                    role: Role.STUDENT,
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
}
