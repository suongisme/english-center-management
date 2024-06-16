import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
    ActionColumnComponent,
    GridCore,
    STATUS,
    formatDate,
} from '@ecm-module/common';

import { TimetableGridModalComponent } from '@ecm-module/timetable';
import { faEdit, faTable } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { ROLE } from '../../constant';
import { CreateUserModal } from '../create-user-modal/create-user-modal.component';

@Component({
    selector: 'user-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    styleUrls: ['./user-grid.component.scss'],
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class UserGridComponent extends GridCore<any> {
    @Output() afterUpdate = new EventEmitter();

    private readonly modalService = inject(NgbModal);

    constructor() {
        super();
        this.gridOptions = {
            rowHeight: 60,
        };
    }

    public override getColumnDefs(): ColDef[] {
        const column: ColDef[] = [
            {
                headerValueGetter: (param) => 'STT',
                minWidth: 60,
                maxWidth: 60,
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
                field: 'phone',
                tooltipField: 'phone',
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
                valueGetter: ({ data }) => {
                    return STATUS[data.status].label;
                },
                tooltipValueGetter: ({ data }) => {
                    return STATUS[data.status].label;
                },
            },

            {
                headerValueGetter: (param) => 'chức vụ',
                minWidth: 100,
                valueGetter: ({ data }) => {
                    return ROLE.find((x) => x.id === data.role)?.label ?? '';
                },
                tooltipValueGetter: ({ data }) => {
                    return ROLE.find((x) => x.id === data.role)?.label ?? '';
                },
            },

            {
                headerValueGetter: (param) => 'Thao tác',
                cellRenderer: ActionColumnComponent,
                cellRendererParams: {
                    actions: [
                        {
                            icon: faEdit,
                            classes: 'text-warning',
                            onClick: this.onEditUser.bind(this),
                        },
                        {
                            icon: faTable,
                            classes: 'text-warning',
                            onClick: this.onShowTimetable.bind(this),
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

    public onEditUser(param: ICellRendererParams): void {
        const user = param.data;
        const modalRef = this.modalService.open(CreateUserModal, {
            centered: true,
            size: 'lg',
        });
        modalRef.componentInstance.user = {
            ...user,
            dob: formatDate(user.dob, 'yyyy-MM-dd'),
        };
        modalRef.componentInstance.role = user.role;
        modalRef.closed.subscribe((res) => {
            if (res) {
                this.afterUpdate.emit();
            }
        });
    }

    public onShowTimetable(param: ICellRendererParams): void {
        const { id, role } = param.data;
        if (role === 'ADMIN') return;
        const modalRef = this.modalService.open(TimetableGridModalComponent, {
            centered: true,
            size: 'lg',
        });
        modalRef.componentInstance.userId = id;
        modalRef.componentInstance.role = role;
    }
}
