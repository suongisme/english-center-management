import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/module/payment/service/payment.service';

@Component({
    selector: 'payment-authenticate',
    template: '',
    standalone: true,
})
export class PaymentAuthenticatePage implements OnInit {
    @Input({ required: true }) paymentMethod: string;

    private activatedRoute = inject(ActivatedRoute);
    private paymentService = inject(PaymentService);
    private router = inject(Router);
    public ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.paymentService
                .authenticate({
                    paymentMethod: this.paymentMethod,
                    data: params,
                })
                .subscribe((res) => {
                    this.router.navigate(['/lich-su-thanh-toan']);
                });
        });
    }
}
