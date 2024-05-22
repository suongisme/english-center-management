import { Component, inject } from '@angular/core';
import {
    ActionColumnComponent,
    GridCore,
    formatDate,
} from '@ecm-module/common';

import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { SearchCheckinResponse } from '../../interface';

@Component({
    selector: 'history-checkin-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class HistoryCheckinGridComponent extends GridCore<SearchCheckinResponse> {
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
                headerValueGetter: (param) => 'Khoá học',
                minWidth: 100,
                field: 'courseName',
                tooltipField: 'courseName',
            },
            {
                headerValueGetter: (param) => 'Lớp học',
                minWidth: 50,
                field: 'classRoomName',
                tooltipField: 'classRoomName',
            },
            {
                headerValueGetter: (param) => 'Giáo viên',
                minWidth: 100,
                field: 'teacherName',
                tooltipField: 'teacherName',
            },

            {
                headerValueGetter: (param) => 'Thứ',
                minWidth: 100,
                field: 'day',
                tooltipField: 'day',
            },

            {
                headerValueGetter: (param) => 'Thời gian vào lớp',
                minWidth: 100,
                field: 'startTime',
                tooltipField: 'startTime',
            },

            {
                headerValueGetter: (param) => 'Thời gian điểm danh',
                minWidth: 100,
                valueGetter: ({ data }) => {
                    return formatDate(data.checkinDate, 'dd/MM/yyyy');
                },
                tooltipValueGetter: ({ data }) => {
                    return formatDate(data.checkinDate, 'dd/MM/yyyy');
                },
            },

            {
                headerValueGetter: (param) => 'Người điểm danh',
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
                            onClick: (
                                param: ICellRendererParams<SearchCheckinResponse>,
                            ) => {
                                this.router.navigate(
                                    ['checkin-history', 'detail'],
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
        if (this.readonly) {
            column.splice(column.length - 1, 1);
        }
        return column;
    }

    public override getRowData(): any[] {
        return null;
    }
}
