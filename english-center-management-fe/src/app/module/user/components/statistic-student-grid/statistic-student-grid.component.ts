import { Component, Input } from '@angular/core';
import { GridCore } from '@ecm-module/common';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
    selector: 'statistic-student-grid',
    templateUrl:
        '../../../common/components/grid-core/grid-core.component.html',
    standalone: true,
    imports: [AgGridAngular, TranslateModule],
})
export class StatisticStudentGridComponent extends GridCore<any> {
    @Input() additionalColumn: ColDef[];

    public override getColumnDefs(): ColDef<any, any>[] {
        const columns = [
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
                headerName: 'Họ và tên',
                minWidth: 100,
                field: 'studentName',
                tooltipField: 'studentName',
            },
            {
                headerName: 'Đi học',
                minWidth: 100,
                field: 'totalPresent',
            },
            {
                headerName: 'Vắng mặt',
                minWidth: 100,
                field: 'totalAbsent',
            },
        ] as ColDef[];
        if (this.additionalColumn) {
            columns.push(...this.additionalColumn);
        }
        return columns;
    }
    public override getRowData(): any[] {
        return [];
    }
}
