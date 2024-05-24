import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
    ActionColumnComponent,
    GridCore,
    formatDate,
} from '@ecm-module/common';

import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
    selector: 'grade-book-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class GradeBookGridComponent extends GridCore<any> {
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
                headerValueGetter: (param) => 'Tên khóa học',
                minWidth: 100,
                field: 'courseName',
                tooltipField: 'courseName',
            },
            {
                headerValueGetter: (param) => 'Tên lớp',
                minWidth: 50,
                field: 'classRoomName',
                tooltipField: 'classRoomName',
            },
            {
                headerValueGetter: (param) => 'Giáo viên',
                minWidth: 50,
                field: 'teacherName',
                tooltipField: 'teacherName',
            },

            {
                headerValueGetter: (param) => 'Ngày chốt điểm',
                minWidth: 100,
                valueGetter: ({ data }) => {
                    return formatDate(data.createdDate, 'dd/MM/yyyy');
                },
                tooltipValueGetter: ({ data }) => {
                    return formatDate(data.createdDate, 'dd/MM/yyyy');
                },
            },

            {
                headerValueGetter: (param) => 'Người chốt điểm',
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
                            icon: faEye,
                            classes: 'text-warning',
                            onClick: (param) => {
                                this.router.navigate(
                                    ['grade-book-history', 'detail'],
                                    {
                                        queryParams: {
                                            id: param.data.id,
                                        },
                                    },
                                );
                            },
                        },
                    ],
                },
                minWidth: 50,
                pinned: 'right',
            },
        ];
        return column;
    }

    public override getRowData(): any[] {
        return null;
    }
}
