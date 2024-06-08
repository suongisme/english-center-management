import { Component, EventEmitter, Output } from '@angular/core';
import { ActionColumnComponent, GridCore, STATUS } from '@ecm-module/common';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GetStatisticTimetableResponse } from '../../interface';

@Component({
    selector: 'statistic-timetable-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class StatisticTimetableGridComponent extends GridCore<any> {
    @Output() showStatisticScore =
        new EventEmitter<GetStatisticTimetableResponse>();

    public override getColumnDefs(): ColDef<any, any>[] {
        return [
            {
                headerName: 'STT',
                minWidth: 60,
                maxWidth: 60,
                valueGetter: (param) => {
                    return param.node.rowIndex + 1;
                },
                pinned: 'left',
            },
            {
                headerName: 'Tên lớp',
                minWidth: 100,
                field: 'className',
                tooltipField: 'className',
            },

            {
                headerName: 'Giáo viên',
                minWidth: 100,
                field: 'teacherName',
                tooltipField: 'teacherName',
            },

            {
                headerName: 'Tổng học viên',
                minWidth: 100,
                field: 'totalStudent',
            },

            {
                headerName: 'Trạng thái',
                minWidth: 100,
                valueGetter: ({ data }) => {
                    return STATUS[data.status].label;
                },
                tooltipValueGetter: ({ data }) => {
                    return STATUS[data.status].label;
                },
            },

            {
                headerName: 'Thao tác',
                cellRenderer: ActionColumnComponent,
                cellRendererParams: {
                    actions: [
                        {
                            icon: faDashboard,
                            label: 'thống kê điểm',
                            onClick: (row: ICellRendererParams) => {
                                this.showStatisticScore.emit(row.data);
                            },
                        },
                    ],
                },
                minWidth: 100,
                pinned: 'right',
            },
        ];
    }

    public override getRowData(): any[] {
        return [];
    }
}
