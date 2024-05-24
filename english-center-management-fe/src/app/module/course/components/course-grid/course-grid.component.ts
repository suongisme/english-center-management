import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CreateClassRoomModal } from '@ecm-module/class-room';
import {
    ActionColumnComponent,
    GridCore,
    MoneyPipe,
    STATUS,
    formatDate,
} from '@ecm-module/common';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { CreateCourseModal } from '../create-course-modal/create-course-modal.component';

@Component({
    selector: 'course-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    styleUrls: ['./course-grid.component.scss'],
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
    providers: [MoneyPipe],
})
export class CourseGridComponent extends GridCore<any> {
    @Output() afterUpdate = new EventEmitter();

    private readonly modalService = inject(NgbModal);
    private readonly moneyPipe = inject(MoneyPipe);

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
                field: 'name',
                tooltipField: 'name',
            },
            {
                headerValueGetter: (param) => 'Giá tiền',
                minWidth: 50,
                valueGetter: ({ data }) => {
                    return this.moneyPipe.transform(data.price, 'VND');
                },
                tooltipValueGetter: ({ data }) => {
                    return this.moneyPipe.transform(data.price, 'VND');
                },
            },
            {
                headerValueGetter: (param) => 'Giảm giá (%)',
                minWidth: 100,
                field: 'discount',
                tooltipField: 'discount',
            },

            {
                headerValueGetter: (param) => 'Thời lượng (giờ)',
                minWidth: 100,
                field: 'duration',
                tooltipField: 'duration',
            },

            {
                headerValueGetter: (param) => 'Số tiết học',
                minWidth: 100,
                field: 'numberOfLesson',
                tooltipField: 'numberOfLesson',
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
                            onClick: this.onEditCourse.bind(this),
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

    public onEditCourse(param: ICellRendererParams): void {
        const course = param.data;
        const modalRef = this.modalService.open(CreateCourseModal, {
            centered: true,
            size: 'xl',
        });
        modalRef.componentInstance.course = course;
        modalRef.closed.subscribe((res) => {
            if (res) {
                this.afterUpdate.emit();
            }
        });
    }
}
