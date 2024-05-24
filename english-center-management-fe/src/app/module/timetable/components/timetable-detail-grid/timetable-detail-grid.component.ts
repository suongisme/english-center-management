import { Component, Input, inject } from '@angular/core';
import { ActionColumnComponent, GridCore, STATUS } from '@ecm-module/common';
import { TimetableResponse } from '../../interface/index';

import { faEdit, faTable } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Router } from '@angular/router';

@Component({
    selector: 'timetable-detail-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class TimetableDetailGridComponent extends GridCore<TimetableResponse> {
    @Input() action: string[] = ['CHECKIN', 'RESOURCE'];
    private router = inject(Router);

    public actionMap = {
        CHECKIN: {
            icon: faEdit,
            classes: 'text-warning',
            label: 'Điểm danh',
            onClick: (param: ICellRendererParams<TimetableResponse>) => {
                this.router.navigate(['checkin', 'student'], {
                    queryParams: {
                        timetableDetailId: param.data.id,
                        timetableId: param.data.parentId,
                    },
                });
            },
        },

        RESOURCE: {
            icon: faTable,
            classes: 'text-warning',
            label: 'Tài nguyên học',
            onClick: (param: ICellRendererParams<TimetableResponse>) => {
                this.router.navigate(['resource'], {
                    queryParams: {
                        type: 'TIMETABLE',
                        keyId: param.data.parentId,
                    },
                });
            },
        },

        'MAKE-SCORE': {
            icon: faTable,
            classes: 'text-warning',
            label: 'Chấm điểm',
            onClick: (param: ICellRendererParams<TimetableResponse>) => {
                this.router.navigate(['grade-book', 'make-score'], {
                    queryParams: {
                        timetableId: param.data.parentId,
                    },
                });
            },
        },
    };

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
                field: 'classRoomName',
                tooltipField: 'classRoomName',
            },
            {
                headerValueGetter: (param) => 'Khóa học',
                minWidth: 50,
                field: 'courseName',
                tooltipField: 'courseName',
            },
            {
                headerValueGetter: (param) => 'Giáo viên',
                minWidth: 100,
                field: 'teacherName',
                tooltipField: 'teacherName',
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
                headerValueGetter: (param) => 'Bắt đầu',
                minWidth: 100,
                field: 'startTime',
                tooltipField: 'startTime',
            },

            {
                headerValueGetter: (param) => 'Kết thúc',
                minWidth: 100,
                valueGetter: ({ data }) => {
                    const [hours, minute] = data.startTime.split(':');
                    return `${+hours + data.courseDuration}:${minute}`;
                },
                tooltipValueGetter: ({ data }) => {
                    const [hours, minute] = data.startTime.split(':');
                    return `${+hours + data.courseDuration}:${minute}`;
                },
            },

            {
                headerValueGetter: (param) => 'Thao tác',
                cellRenderer: ActionColumnComponent,
                cellRendererParams: {
                    actions: this.action.map((ac) => this.actionMap[ac]),
                },
                minWidth: 100,
                pinned: 'right',
            },
        ];
        return column;
    }

    public override getRowData(): any[] {
        return null;
    }
}
