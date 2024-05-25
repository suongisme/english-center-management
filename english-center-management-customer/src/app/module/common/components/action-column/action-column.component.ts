import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ActionColumn } from '@ecm-module/common';
import { NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'action-column',
    templateUrl: './action-column.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        TranslateModule,
        NgbTooltipModule,
        FontAwesomeModule,
    ],
})
export class ActionColumnComponent implements ICellRendererAngularComp {
    public params: ICellRendererParams;
    public actions: ActionColumn[];

    agInit(params: ICellRendererParams<any, any, any>): void {
        this.params = params;
        this.actions = this.params.colDef.cellRendererParams.actions;
    }

    refresh(params: ICellRendererParams<any, any, any>): boolean {
        return false;
    }
}
