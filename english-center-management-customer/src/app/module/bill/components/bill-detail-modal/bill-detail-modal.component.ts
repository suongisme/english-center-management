import { Component, Input, inject } from '@angular/core';
import { CheckinModal } from '@ecm-module/checkin';
import { DestroyService, ModalWrapperComponent } from '@ecm-module/common';
import { DocumentModal } from '@ecm-module/resource';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillDetailResponse } from '../../interface';
import { BillDetailGridComponent } from '../bill-grid-detail/bill-detail-grid.component';

@Component({
    selector: 'bill-detail-modal',
    templateUrl: './bill-detail-modal.component.html',
    standalone: true,
    imports: [ModalWrapperComponent, BillDetailGridComponent],
    providers: [DestroyService],
})
export class BilLDetailModal {
    @Input({ required: true }) rowData: BillDetailResponse[];

    private modalService = inject(NgbModal);

    public ngOnOpenCheckin(timetableId: number): void {
        const modalRef = this.modalService.open(CheckinModal, {
            centered: true,
            size: 'xl',
        });
        modalRef.componentInstance.timetableId = timetableId;
    }

    public ngOnOpenResource(timetableId: number): void {
        const modalRef = this.modalService.open(DocumentModal, {
            centered: true,
            size: 'lg',
        });
        modalRef.componentInstance.keyId = timetableId;
        modalRef.componentInstance.type = 'TIMETABLE';
    }
}
