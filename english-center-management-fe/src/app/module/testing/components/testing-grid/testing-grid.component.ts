import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
    selector: 'testing-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class TestingGridComponent extends GridCore<any> {
    @Output() afterUpdate = new EventEmitter();

    private router = inject(Router);

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
                headerValueGetter: (param) => 'Tên bài test',
                minWidth: 100,
                field: 'name',
                tooltipField: 'name',
            },
            {
                headerValueGetter: (param) => 'Câu hỏi',
                minWidth: 50,
                field: 'questionSize',
                tooltipField: 'questionSize',
            },
            {
                headerValueGetter: (param) => 'Khoá học',
                minWidth: 100,
                field: 'courseName',
                tooltipField: 'courseName',
            },

            {
                headerValueGetter: (param) => 'Điểm tối thiếu',
                minWidth: 100,
                field: 'minimumScore',
                tooltipField: 'minimumScore',
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
                            onClick: this.onEditTesting.bind(this),
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

    public onEditTesting(param: ICellRendererParams): void {
        this.router.navigate(['testing', 'save-testing'], {
            queryParams: {
                testingId: param.data.id,
            },
        });
    }
}
