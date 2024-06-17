import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
    ActionColumnComponent,
    ConfirmationComponent,
    GridCore,
    STATUS,
    formatDate,
} from '@ecm-module/common';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
    ColDef,
    FirstDataRenderedEvent,
    ICellRendererParams,
    IRowNode,
    RowSelectedEvent,
} from 'ag-grid-community';
import { LEVEL } from '../../constant';
import { SearchQuestionResponse } from '../../interface';
import { QuestionService } from '../../service';
import { CreateQuestionModal } from '../create-question-modal/create-question-modal.component';

@Component({
    selector: 'question-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    styleUrls: ['./question-grid.component.scss'],
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class QuestionGridComponent extends GridCore<SearchQuestionResponse> {
    @Input() action: string[] = ['EDIT'];
    @Input() showCheckbox: boolean = false;
    @Input() selectedRow: SearchQuestionResponse[];

    @Output() afterUpdate = new EventEmitter();
    @Output() selectRow = new EventEmitter<RowSelectedEvent<any>>();
    @Output() deleteRow = new EventEmitter<any>();

    private readonly modalService = inject(NgbModal);
    private readonly questionService = inject(QuestionService);

    public actions = {
        DELETE: {
            icon: faTrash,
            classes: 'text-danger',
            onClick: this.onDeleteQuestion.bind(this),
        },
        EDIT: {
            icon: faEdit,
            classes: 'text-warning',
            onClick: this.onEditQuestion.bind(this),
        },
    };

    constructor() {
        super();
        this.gridOptions = {
            rowHeight: 60,
            suppressRowClickSelection: true,
            onRowSelected: (event: RowSelectedEvent<any>) => {
                this.selectRow.emit(event);
            },
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
                checkboxSelection: this.showCheckbox,
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
                headerValueGetter: (param) => 'Thao tác',
                cellRenderer: ActionColumnComponent,
                cellRendererParams: {
                    actions: this.action.map((a) => this.actions[a]),
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

    public onDeleteQuestion(param: ICellRendererParams): void {
        const modalRef = this.modalService.open(ConfirmationComponent, {
            centered: true,
            size: 'md',
        });
        modalRef.componentInstance.confirmation = {
            title: 'Xác nhận',
            content: 'Bạn có chắc chắn muốn xóa',
            isHtml: false,
        };
        modalRef.closed.subscribe((res) => {
            if (res) {
                this.deleteRow.emit(param.data);
            }
        });
    }

    public override onFirstDataRendered(
        params: FirstDataRenderedEvent<SearchQuestionResponse>,
    ) {
        if (!this.selectedRow || this.selectedRow.length === 0) return;
        const map = this.selectedRow.reduce((map, cur) => {
            map.set(cur.id, cur);
            return map;
        }, new Map<number, SearchQuestionResponse>());
        params.api.forEachNode((node: IRowNode) => {
            if (map.has(node.data.id)) {
                node.setSelected(true);
            }
        });
    }
}
