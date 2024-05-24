import { Component, Input, inject } from '@angular/core';
import { ActionColumnComponent, GridCore, STATUS } from '@ecm-module/common';
import { SearchTimetableResponse } from '../../interface/index';

import { Router } from '@angular/router';
import { faEdit, faTable } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { TimetableService } from '../../service';
import { CreateTimetableModal } from '../create-timetable-modal/create-timetable-modal.component';

@Component({
    selector: 'timetable-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class TimetableGridComponent extends GridCore<SearchTimetableResponse> {
    @Input() action: string[] = [];

    private ngbModal = inject(NgbModal);
    private router = inject(Router);
    private timetableService = inject(TimetableService);

    public actionMap = {
        'MAKE-SCORE': {
            icon: faTable,
            classes: 'text-warning',
            label: 'Chấm điểm',
            onClick: (param: ICellRendererParams<SearchTimetableResponse>) => {
                this.router.navigate(['grade-book', 'make-score'], {
                    queryParams: {
                        timetableId: param.data.id,
                    },
                });
            },
        },

        UPDATE: {
            icon: faEdit,
            classes: 'text-warning',
            label: 'Cập nhật',
            onClick: (param: ICellRendererParams<SearchTimetableResponse>) => {
                this.timetableService
                    .getById(param.data.id)
                    .subscribe((res) => {
                        const modalRef = this.ngbModal.open(
                            CreateTimetableModal,
                            {
                                centered: true,
                                size: 'md',
                            },
                        );
                        modalRef.componentInstance.timetable = res;
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
