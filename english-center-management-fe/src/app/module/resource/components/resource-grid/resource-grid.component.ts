import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
    ActionColumnComponent,
    ConfirmationComponent,
    GridCore,
    formatDate,
} from '@ecm-module/common';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { SearchResourceResponse } from '../../interface';

const RESOURCE_TYPE = {
    TIMETABLE: 'Khóa học',
};

@Component({
    selector: 'resource-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class ResourceGridComponent extends GridCore<SearchResourceResponse> {
    @Output() deleteResource = new EventEmitter<SearchResourceResponse>();

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
                headerValueGetter: (param) => 'Tên',
                minWidth: 100,
                field: 'fileName',
                tooltipField: 'fileName',
            },
            {
                headerValueGetter: (param) => 'Loại tài nguyên',
                minWidth: 100,
                valueGetter: ({ data }) => {
                    return RESOURCE_TYPE[data.type];
                },
            },
            {
                headerValueGetter: (param) => 'Tải xuống',
                minWidth: 50,
                cellRenderer: (param: ICellRendererParams) => {
                    return `<a href="${param.data.url}" download="${param.data.fileName}" target="_blank">Tải xuống</a>`;
                },
            },

            {
                headerValueGetter: (param) => 'Ngày đăng tải',
                minWidth: 100,
                valueGetter: ({ data }) => {
                    return formatDate(data.createdDate, 'dd/MM/yyyy');
                },
                tooltipValueGetter: ({ data }) => {
                    return formatDate(data.createdDate, 'dd/MM/yyyy');
                },
            },

            {
                headerValueGetter: (param) => 'Người đăng',
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
                            icon: faTrash,
                            classes: 'text-danger',
                            onClick: (
                                param: ICellRendererParams<SearchResourceResponse>,
                            ) => {
                                const modalRef = this.modalService.open(
                                    ConfirmationComponent,
                                    {
                                        centered: true,
                                        size: 'md',
                                    },
                                );
                                modalRef.componentInstance.confirmation = {
                                    title: 'Xác nhận',
                                    content: 'Bạn có chắc chắn muốn xóa',
                                };
                                modalRef.closed.subscribe((res) => {
                                    if (res) {
                                        this.deleteResource.emit(param.data);
                                    }
                                });
                            },
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
}
