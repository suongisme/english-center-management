import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EcmBoxComponent } from '@ecm-module/common';
import { PaymentFormSearchComponent } from '@ecm-module/payment';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { CheckinModal } from '@ecm-module/checkin';
import { DocumentModal } from '@ecm-module/resource';

@Component({
    selector: 'payment-history-page',
    templateUrl: './payment-history.page.html',
    styleUrls: ['./payment-history.page.scss'],
    standalone: true,
    imports: [
        EcmBoxComponent,
        PaymentFormSearchComponent,
        NgbPopover,
        NgTemplateOutlet,
    ],
})
export class PaymentHistoryPage {
    private modalService = inject(NgbModal);

    public ngOnOpenCheckin(): void {
        this.modalService.open(CheckinModal, {
            centered: true,
            size: 'lg',
        });
    }

    public ngOnOpenResource(): void {
        this.modalService.open(DocumentModal, {
            centered: true,
            size: 'lg',
        });
    }
}
