import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';
import { INoRowsOverlayParams } from 'ag-grid-community';

@Component({
    selector: 'no-row',
    templateUrl: './no-row.component.html',
    standalone: true,
    imports: [TranslateModule],
})
export class NoRowComponent implements INoRowsOverlayAngularComp {
    agInit(params: INoRowsOverlayParams<any, any>): void {}
    refresh?(params: INoRowsOverlayParams<any, any>): void {}
}
