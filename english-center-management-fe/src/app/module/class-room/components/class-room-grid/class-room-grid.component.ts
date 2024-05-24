import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
    ActionColumnComponent,
    GridCore,
    STATUS,
    formatDate,
} from '@ecm-module/common';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { CreateClassRoomModal } from '../create-class-room-modal/create-class-room-modal.component';

@Component({
    selector: 'class-room-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    styleUrls: ['./class-room-grid.component.scss'],
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class ClassRoomGridComponent extends GridCore<any> {
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
                headerValueGetter: (param) => 'Tên lớp',
                minWidth: 100,
                field: 'name',
                tooltipField: 'name',
            },
            {
                headerValueGetter: (param) => 'Tầng',
                minWidth: 50,
                field: 'position',
                tooltipField: 'position',
            },
            {
                headerValueGetter: (param) => 'Số lượng học viên',
                minWidth: 100,
                field: 'size',
                tooltipField: 'size',
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
                headerValueGetter: (param) => 'Ngày tạo',
                minWidth: 100,
                valueGetter: ({ data }) => {
                    return formatDate(data.createdDate, 'dd/MM/yyyy');
                },
                tooltipValueGetter: ({ data }) => {
                    return formatDate(data.createdDate, 'dd/MM/yyyy');
                },
            },

            {
                headerValueGetter: (param) => 'Người tạo',
                minWidth: 100,
                field: 'createdBy',
                tooltipField: 'createdBy',
            },

            {
                headerValueGetter: (param) => 'Thao tác',
                cellRenderer: ActionColumnComponent,
                cellRendererParams: {
                    actions: [
                        {
                            icon: faEdit,
                            classes: 'text-warning',
                            onClick: this.onEditClassRoom.bind(this),
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

    public onEditClassRoom(param: ICellRendererParams): void {
        const classRoom = param.data;
        const modalRef = this.modalService.open(CreateClassRoomModal, {
            centered: true,
            size: 'md',
        });
        modalRef.componentInstance.classRoom = classRoom;
        modalRef.closed.subscribe((res) => {
            if (res) {
                this.afterUpdate.emit();
            }
        });
    }
}
