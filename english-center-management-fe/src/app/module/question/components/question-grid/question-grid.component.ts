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
import { CreateQuestionModal } from '../create-question-modal/create-question-modal.component';
import { SearchQuestionResponse } from '../../interface';
import { LEVEL } from '../../constant';
import { QuestionService } from '../../service';

@Component({
    selector: 'question-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    styleUrls: ['./question-grid.component.scss'],
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class QuestionGridComponent extends GridCore<SearchQuestionResponse> {
    @Output() afterUpdate = new EventEmitter();

    private readonly modalService = inject(NgbModal);
    private readonly questionService = inject(QuestionService);

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
                headerValueGetter: (param) => 'Câu hỏi',
                minWidth: 100,
                field: 'title',
                tooltipField: 'title',
            },
            {
                headerValueGetter: (param) => 'Đáp án',
                minWidth: 50,
                field: 'answerTitle',
                tooltipField: 'answerTitle',
            },

            {
                headerValueGetter: (param) => 'Cấp độ',
                minWidth: 100,
                valueGetter: ({ data }) => {
                    return LEVEL[data.level - 1].label;
                },
                tooltipValueGetter: ({ data }) => {
                    return LEVEL[data.level - 1].label;
                },
            },

            {
                headerValueGetter: (param) => 'Điểm',
                minWidth: 100,
                field: 'score',
                tooltipField: 'score',
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
                headerValueGetter: (param) =>
                    this.translateService.instant('COMMON.ACTION'),
                cellRenderer: ActionColumnComponent,
                cellRendererParams: {
                    actions: [
                        {
                            icon: faEdit,
                            classes: 'text-warning',
                            onClick: this.onEditQuestion.bind(this),
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

    public onEditQuestion(param: ICellRendererParams): void {
        const question = param.data;
        this.questionService
            .getById(question.id)
            .subscribe((questionResponse) => {
                const modalRef = this.modalService.open(CreateQuestionModal, {
                    centered: true,
                    size: 'md',
                });
                modalRef.componentInstance.question = questionResponse;
                modalRef.closed.subscribe((res) => {
                    if (res) {
                        this.afterUpdate.emit();
                    }
                });
            });
    }
}
