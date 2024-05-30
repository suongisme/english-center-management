import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
    BillFormSearchComponent,
    BillGridComponent,
    BillResponse,
    BillService,
    SearchBillRequest,
} from '@ecm-module/bill';
import { EcmBoxComponent } from '@ecm-module/common';
import { Observable } from 'rxjs';

@Component({
    selector: 'payment-history-page',
    templateUrl: './payment-history.page.html',
    styleUrls: ['./payment-history.page.scss'],
    standalone: true,
    imports: [
        EcmBoxComponent,
        BillFormSearchComponent,
        BillGridComponent,
        BillGridComponent,
        NgIf,
        AsyncPipe,
    ],
})
export class PaymentHistoryPage implements OnInit {
    private billService = inject(BillService);

    public $bills: Observable<BillResponse[]>;

    public ngOnInit(): void {
        this.$bills = this.billService.getUserBill();
    }

    public ngOnSearch(searchRequest: SearchBillRequest) {
        this.$bills = this.billService.getUserBill(searchRequest);
    }
}
