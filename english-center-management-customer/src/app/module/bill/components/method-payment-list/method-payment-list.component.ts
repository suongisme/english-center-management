import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '@ecm-module/course';

const METHOD_PAYMENT = [
    {
        code: 'vnpay',
        image: 'assets/img/icon/vnpay.svg',
    },
];

@Component({
    selector: 'method-payment-list',
    templateUrl: './method-payment-list.component.html',
    standalone: true,
    imports: [FormsModule, NgFor],
})
export class MethodPaymentListComponent implements OnInit {
    @Input({ required: true }) courseId: number;
    @Input({ required: false }) defaultMethod: string;

    @Output() change = new EventEmitter<string>();

    public methodPayment: string;
    public methodPaymentList = METHOD_PAYMENT;
    ngOnInit(): void {
        this.methodPayment = this.defaultMethod;
    }
}
