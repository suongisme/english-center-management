import { Component, Input, OnInit, inject } from '@angular/core';
import { AddTimePipe } from '@ecm-module/common';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { TimetableResponse } from '../../interface';
import { CheckinModal } from '@ecm-module/checkin';
import { AuthService } from '@ecm-module/auth';
import { DocumentModal } from '@ecm-module/resource';

@Component({
    selector: 'timetable-info',
    templateUrl: './timetable-info.component.html',
    standalone: true,
    imports: [AddTimePipe, NgbPopover],
})
export class TimetableInfoComponent implements OnInit {
    @Input({ required: true }) time: string;
    @Input({ required: true }) detail: TimetableResponse;

    public userId: number;

    private modalService = inject(NgbModal);
    private authService = inject(AuthService);

    public ngOnInit(): void {
        this.userId = this.authService.loginResponse.id;
    }

    public openDocumentModal(): void {
        const modalRef = this.modalService.open(DocumentModal, {
            centered: true,
            size: 'lg',
        });
        modalRef.componentInstance.keyId = this.detail.parentId;
        modalRef.componentInstance.type = 'TIMETABLE';
    }

    public openCheckInModal(): void {
        const modalRef = this.modalService.open(CheckinModal, {
            centered: true,
            size: 'xl',
        });
        modalRef.componentInstance.timetableId = this.detail.parentId;
        modalRef.componentInstance.day = this.detail.day;
    }
}
