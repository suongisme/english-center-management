import {
    CourseItem,
    CourseItemComponent,
    SearchCourseRequest,
} from '@ecm-module/course';
import { Component, OnInit, inject } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { EcmCarouselComponent, PagingRequest } from '@ecm-module/common';
import { RouterLink } from '@angular/router';
import { CourseService } from 'src/app/module/course/service/course.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
    selector: 'home-page',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [
        SlickCarouselModule,
        CourseItemComponent,
        EcmCarouselComponent,
        RouterLink,
        NgIf,
        AsyncPipe,
    ],
})
export class HomePage implements OnInit {
    private courseService = inject(CourseService);

    public $course: Observable<CourseItem[]>;
    public baseSearchRequest: PagingRequest<SearchCourseRequest> = {
        pageNo: 1,
        pageSize: 10,
        data: {
            status: 1,
        },
    };

    courseTrack = (index: number, data: CourseItem): number => {
        return data.id;
    };

    ngOnInit(): void {
        this.$course = this.courseService
            .searchCourse(this.baseSearchRequest)
            .pipe(map((x) => x.items));
    }
}
