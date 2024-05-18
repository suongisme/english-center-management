import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
    ActionColumnComponent,
    ConfirmationComponent,
    GridCore,
    formatDate,
} from '@ecm-module/common';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { CreateTeacherModal } from '../create-teacher-modal/create-teacher-modal.component';

@Component({
    selector: 'teacher-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    styleUrls: ['./teacher-grid.component.scss'],
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class TeacherGridComponent extends GridCore<any> {
    private readonly modalService = inject(NgbModal);

    constructor() {
        super();
        this.gridOptions = {
            rowHeight: 100,
        };
    }

    public override getColumnDefs(): ColDef[] {
        const column: ColDef[] = [
            {
                headerValueGetter: (param) => 'STT',
                minWidth: 50,
                valueGetter: (param) => {
                    return param.node.rowIndex + 1;
                },
                pinned: 'left',
            },
            {
                headerValueGetter: (param) => 'Họ và tên',
                minWidth: 100,
                valueGetter: ({ data }) => {
                    return data.lastName + ' ' + data.firstName;
                },
                tooltipValueGetter: ({ data }) => {
                    return data.lastName + ' ' + data.firstName;
                },
            },
            {
                headerValueGetter: (param) => 'Số điện thoại',
                minWidth: 50,
                field: 'phoneNumber',
                tooltipField: 'phoneNumber',
            },
            {
                headerValueGetter: (param) => 'Email',
                minWidth: 100,
                field: 'email',
                tooltipField: 'email',
            },
            {
                headerValueGetter: (param) => 'Ngày sinh',
                minWidth: 100,
                valueGetter: ({ data }) => {
                    return formatDate(data.dob, 'dd/MM/yyyy');
                },
                tooltipValueGetter: ({ data }) => {
                    return formatDate(data.dob, 'dd/MM/yyyy');
                },
            },
            {
                headerValueGetter: (param) => 'Địa chỉ',
                minWidth: 100,
                field: 'address',
                tooltipField: 'address',
            },

            {
                headerValueGetter: (param) => 'Trạng thái',
                minWidth: 100,
                field: 'status',
                tooltipField: 'status',
            },

            {
                headerValueGetter: (param) =>
                    this.translateService.instant('COMMON.ACTION'),
                cellRenderer: ActionColumnComponent,
                cellRendererParams: {
                    actions: [
                        {
                            icon: faEdit,
                            classes: 'text-warning',
                            onClick: this.onEditMember.bind(this),
                        },
                        {
                            icon: faTrash,
                            classes: 'text-danger',
                            onClick: this.onDeleteMember.bind(this),
                        },
                    ],
                },
                minWidth: 50,
                pinned: 'right',
            },
        ];
        if (this.readonly) {
            column.splice(column.length - 1, 1);
        }
        return column;
    }

    public override getRowData(): any[] {
        return null;
    }

    public onEditMember(param: ICellRendererParams): void {
        const member = param.data;
        const modalRef = this.modalService.open(CreateTeacherModal, {
            centered: true,
            size: 'lg',
        });
        modalRef.componentInstance.member = member;
        modalRef.closed.subscribe((res) => {
            if (res) {
            }
        });
    }

    public onDeleteMember(param: ICellRendererParams): void {
        const modalRef = this.modalService.open(ConfirmationComponent, {
            centered: true,
            size: 'md',
        });
        modalRef.componentInstance.confirmation = {
            content: this.translateService.instant('MEMBER.CONFIRM_DELETE'),
            isHtml: false,
        };
        modalRef.closed.subscribe((isAccept) => {
            if (!isAccept) return;
        });
    }
}
