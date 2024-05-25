import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'course-detail-page',
    templateUrl: './detail.page.html',
    standalone: true,
    imports: [RouterLink],
})
export class CourseDetailPage {}
