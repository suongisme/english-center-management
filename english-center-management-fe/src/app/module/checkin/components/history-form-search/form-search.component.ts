import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    EcmInputComponent,
    EcmSelectComponent,
    STATUS,
    SearchWrapperComponent,
} from '@ecm-module/common';
import { TranslateModule } from '@ngx-translate/core';
import { SearchCheckinRequest } from '../../interface';
import { AsyncPipe } from '@angular/common';
import { CourseService, SearchCourseResponse } from '@ecm-module/course';
import {
    ClassRoomService,
    SearchClassRoomResponse,
} from '@ecm-module/class-room';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'history-checkin-form-search',
    templateUrl: './form-search.component.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        EcmInputComponent,
        EcmSelectComponent,

        SearchWrapperComponent,
        AsyncPipe,
    ],
})
export class HistoryCheckinFormSearchComponent implements OnInit {
    @Output() search = new EventEmitter<SearchCheckinRequest>();

    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;
    public $course: Observable<SearchCourseResponse[]>;
    public $classRoom: Observable<SearchClassRoomResponse[]>;

    private courseService = inject(CourseService);
    private classRoomService = inject(ClassRoomService);

    public ngOnInit(): void {
        this.buildFormGroup();
        this.$course = this.courseService
            .searchCourse({
                data: {
                    status: 1,
                },
            })
            .pipe(map((x) => x.items));
        this.$classRoom = this.classRoomService
            .searchClassRoom({
                data: {
                    status: 1,
                },
            })
            .pipe(map((x) => x.items));
        this.ngOnSearch(this.formGroup);
    }

    private buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            courseId: [null],
            classRoomId: [null],
            checkinDate: [null],
        });
    }

    public ngOnSearch(formGroup: FormGroup): void {
        const searchRequest = formGroup.getRawValue();
        this.search.emit(searchRequest);
    }
}
