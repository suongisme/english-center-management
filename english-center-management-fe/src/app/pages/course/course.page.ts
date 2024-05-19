import { Component, OnInit, inject } from '@angular/core';

import {
    DestroyService,
    EcmBoxComponent,
    Pagination,
    PaginationComponent,
} from '@ecm-module/common';
import {
    CourseFormSearchComponent,
    CourseGridWrapperComponent,
    CourseService,
    CreateCourseModal,
    SearchCourseRequest,
    SearchCourseResponse,
} from '@ecm-module/course';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'course-page',
    templateUrl: './course.page.html',
    standalone: true,
    imports: [
        CourseFormSearchComponent,
        PaginationComponent,
        EcmBoxComponent,
        CourseGridWrapperComponent,

        TranslateModule,
        FontAwesomeModule,
    ],
    providers: [DestroyService],
})
export class CoursePage implements OnInit {
    public pagination: Pagination = new Pagination(1, 0);
    public searchRequest: SearchCourseRequest;
    public courses: SearchCourseResponse[];

    private readonly destroyService = inject(DestroyService);
    private readonly modalService = inject(NgbModal);
    private readonly courseService = inject(CourseService);

    public ngOnInit(): void {
        this.paginate(this.pagination);
    }

    public ngOnOpenCreateUser(): void {
        this.modalService.open(CreateCourseModal, {
            size: 'xl',
            centered: true,
        });
    }

    public ngOnSearch(searchRequest: SearchCourseRequest): void {
        this.searchRequest = searchRequest;
        this.paginate(this.pagination);
    }

    public paginate(pagination: Pagination): void {
        this.pagination = pagination;
        this.courseService
            .searchCourse({
                pageNo: this.pagination.page,
                pageSize: this.pagination.pageSize,
                data: this.searchRequest,
            })
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                this.courses = res.items;
                this.pagination.total = res.totalItems;
            });
    }
}
