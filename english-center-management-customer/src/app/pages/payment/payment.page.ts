import { VnPayPaymentResponse } from './../../module/bill/interface/index';
import { AsyncPipe, DatePipe, NgIf, Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BillService, MethodPaymentListComponent } from '@ecm-module/bill';
import { DestroyService, DiscountPipe, MoneyPipe } from '@ecm-module/common';
import { Course } from '@ecm-module/course';
import { Observable, takeUntil } from 'rxjs';
import { CourseService } from 'src/app/module/course/service/course.service';

@Component({
    selector: 'payment-page',
    templateUrl: './payment.page.html',
    standalone: true,
    imports: [
        NgIf,
        AsyncPipe,
        MoneyPipe,
        DatePipe,
        MethodPaymentListComponent,
        DiscountPipe,
    ],
    providers: [DestroyService],
})
export class PaymentPage implements OnInit {
    @Input({ required: true }) id: number;

    private courseService = inject(CourseService);
    private location = inject(Location);
    private billService = inject(BillService);
    private destroyService = inject(DestroyService);
    private router = inject(Router);

    public $course: Observable<Course>;
    public paymentMethod: string = 'vnpay';

    public ngOnInit(): void {
        this.$course = this.courseService.getCourseById(this.id);
    }
    public back() {
        this.location.back();
    }

    public payment(course: Course): void {
        this.billService
            .payment({
                methodPayment: this.paymentMethod,
                courseIds: [course.id],
            })
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                if (res.methodPayment === 'vnpay') {
                    const vnpayRes = res as VnPayPaymentResponse;
                    window.open(vnpayRes.paymentUrl, '_blank');
                }
                this.router.navigate(['/lich-su-thanh-toan']);
            });
    }
}
