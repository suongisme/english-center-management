import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SafePipe } from '@ecm-module/common';
import { Course } from '@ecm-module/course';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/module/course/service/course.service';

@Component({
    selector: 'course-detail-page',
    templateUrl: './detail.page.html',
    standalone: true,
    imports: [RouterLink, AsyncPipe, NgIf, SafePipe],
})
export class CourseDetailPage implements OnInit {
    @Input({ required: true }) id: number;
    private courseService = inject(CourseService);

    public $course: Observable<Course>;
    public ngOnInit(): void {
        this.$course = this.courseService.getCourseById(this.id);
    }
}
