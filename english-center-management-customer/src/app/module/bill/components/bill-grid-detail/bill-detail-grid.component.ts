import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { BillDetailResponse, BillResponse } from '../../interface';
import { MoneyPipe } from '@ecm-module/common';

@Component({
    selector: 'bill-detail-grid',
    templateUrl: './bill-detail-grid.component.html',
    styleUrls: ['./bill-detail-grid.component.scss'],
    standalone: true,
    imports: [NgbPopover, NgTemplateOutlet, NgFor, MoneyPipe, NgIf],
})
export class BillDetailGridComponent {
    @Input({ required: true }) rowData: BillDetailResponse[];

    @Output() openDocument = new EventEmitter<number>();

    @Output() openCheckIn = new EventEmitter<number>();

    public ngOnOpenCheckin(timetableId: number): void {
        this.openCheckIn.emit(timetableId);
    }

    public ngOnOpenResource(timetableId: number): void {
        this.openDocument.emit(timetableId);
    }
}
