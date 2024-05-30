import { Component, Input, inject } from '@angular/core';
import { BillResponse } from '../../interface';
import { DatePipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { DestroyService, MoneyPipe } from '@ecm-module/common';
import { BILL_STATUS } from '../../constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BilLDetailModal } from '../bill-detail-modal/bill-detail-modal.component';
import { BillService } from '../../service/bill.service';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'bill-grid',
    templateUrl: './bill-grid.component.html',
    styleUrls: ['./bill-grid.component.scss'],
    standalone: true,
    imports: [NgFor, NgTemplateOutlet, DatePipe, MoneyPipe, NgIf],
    providers: [DestroyService],
})
export class BillGridComponent {
    @Input({ required: true }) rowData: BillResponse[];

    public status = BILL_STATUS;

    private modalService = inject(NgbModal);
    private billService = inject(BillService);
    private destroyService = inject(DestroyService);

    public openDetailBillModal(billId: number): void {
        this.billService
            .getDetailBill(billId)
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                const modalRef = this.modalService.open(BilLDetailModal, {
                    centered: true,
                    size: 'xl',
                });
                modalRef.componentInstance.rowData = res;
            });
    }
}
