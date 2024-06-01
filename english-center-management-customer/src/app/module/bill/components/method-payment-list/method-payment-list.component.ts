import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '@ecm-module/course';

@Component({
    selector: 'method-payment-list',
    templateUrl: './method-payment-list.component.html',
    standalone: true,
    imports: [FormsModule],
})
export class MethodPaymentListComponent implements OnInit {
    @Input({ required: true }) courseId: number;
    @Input({ required: false }) defaultMethod: string;

    public methodPayment: string;
    ngOnInit(): void {
        this.methodPayment = this.defaultMethod;
    }
}
