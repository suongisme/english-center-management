import { Component, OnInit, inject } from '@angular/core';
import { Course } from '@ecm-module/course';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/module/course/service/course.service';

@Component({
    selector: 'detail-slider',
    templateUrl: './detail-slider.component.html',
})
export class DetailSliderComponent implements OnInit {
    private courseService = inject(CourseService);

    public $course: Observable<Course>;
    public ngOnInit(): void {
        this.$course = this.courseService.courseDetail.asObservable();
    }
}
