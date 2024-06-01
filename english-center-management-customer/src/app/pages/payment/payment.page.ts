import { AsyncPipe, DatePipe, NgIf, Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MethodPaymentListComponent } from '@ecm-module/bill';
import { MoneyPipe } from '@ecm-module/common';
import { Course } from '@ecm-module/course';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/module/course/service/course.service';

@Component({
    selector: 'payment-page',
    templateUrl: './payment.page.html',
    standalone: true,
    imports: [NgIf, AsyncPipe, MoneyPipe, DatePipe, MethodPaymentListComponent],
})
export class PaymentPage implements OnInit {
    @Input({ required: true }) id: number;
    private courseService = inject(CourseService);
    private location = inject(Location);

    public $course: Observable<Course>;
    public ngOnInit(): void {
        this.$course = this.courseService.getCourseById(this.id);
    }
    public back() {
        this.location.back();
    }
}
