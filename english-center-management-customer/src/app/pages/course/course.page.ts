import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DestroyService, PagingRequest } from '@ecm-module/common';
import {
    Course,
    CourseItem,
    CourseItemContainerComponent,
    SearchCourseRequest,
} from '@ecm-module/course';
import {
    BehaviorSubject,
    Observable,
    concat,
    map,
    merge,
    mergeMap,
    takeUntil,
} from 'rxjs';
import { CourseService } from 'src/app/module/course/service/course.service';

@Component({
    selector: 'course-page',
    templateUrl: './course.page.html',
    standalone: true,
    imports: [CourseItemContainerComponent, AsyncPipe, NgIf],
    providers: [DestroyService],
})
export class CoursePage implements OnInit {
    private courseService = inject(CourseService);
    private destroyService = inject(DestroyService);

    private coursesSubject = new BehaviorSubject<CourseItem[]>([]);
    public $course: Observable<CourseItem[]> =
        this.coursesSubject.asObservable();
    public totalPage: number = 10;
    public baseSearchRequest: PagingRequest<SearchCourseRequest> = {
        pageNo: 1,
        pageSize: 12,
        data: {
            status: 1,
        },
    };
    public ngOnInit(): void {
        this.loadCourse();
    }

    private loadCourse(): void {
        this.courseService
            .searchCourse(this.baseSearchRequest)
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((response) => {
                this.totalPage = response.totalPage;
                const currentCourse = this.coursesSubject.value;
                this.coursesSubject.next([...currentCourse, ...response.items]);
            });
    }

    public loadMore(): void {
        if (this.baseSearchRequest.pageNo === this.totalPage) {
            return;
        }
        this.baseSearchRequest.pageNo++;
        this.loadCourse();
    }
}
