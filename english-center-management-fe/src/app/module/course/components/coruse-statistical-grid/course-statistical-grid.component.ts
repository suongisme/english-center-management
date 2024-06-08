import { Component, EventEmitter, Output } from '@angular/core';
import { ActionColumnComponent, GridCore } from '@ecm-module/common';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { GetStatisticalCourseResponse } from '../../interface';

@Component({
    selector: 'course-statistical-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class CourseStatisticalGridComponent extends GridCore<any> {
    @Output() showTimetable = new EventEmitter<GetStatisticalCourseResponse>();

    public override getColumnDefs(): ColDef<any, any>[] {
        return [
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
                headerName: 'Tên khóa học',
                minWidth: 100,
                field: 'name',
                tooltipField: 'name',
            },

            {
                headerName: 'Số lịch dạy đang hoạt động',
                minWidth: 100,
                field: 'totalActiveTimetable',
            },

            {
                headerName: 'Số lịch dạy đã kết thúc',
                minWidth: 100,
                field: 'totalFinishTimetable',
            },

            {
                headerName: 'Số lịch dạy',
                minWidth: 100,
                field: 'totalTimetable',
            },

            {
                headerValueGetter: (param) => 'Thao tác',
                cellRenderer: ActionColumnComponent,
                cellRendererParams: {
                    actions: [
                        {
                            icon: faEye,
                            label: 'Xem lịch dạy',
                            onClick: (row: ICellRendererParams) => {
                                this.showTimetable.emit(row.data);
                            },
                        },
                    ],
                },
                minWidth: 50,
                pinned: 'right',
            },
        ];
    }
    public override getRowData(): any[] {
        return [];
    }
}
