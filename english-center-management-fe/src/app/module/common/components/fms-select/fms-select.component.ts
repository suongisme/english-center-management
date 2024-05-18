import {
    KeyValuePipe,
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
} from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { FmsInputComponent } from '../fms-input/fms-input.component';

@Component({
    selector: 'fms-select',
    templateUrl: './fms-select.component.html',
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        NgSelectModule,
        TranslateModule,
        FormsModule,
        NgTemplateOutlet,
        KeyValuePipe,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FmsSelectComponent,
            multi: true,
        },
    ],
})
export class FmsSelectComponent extends FmsInputComponent {
    @Input() items: any[];
    @Input() bindLabel: string;
    @Input() bindValue: string;
    @Input() multiple: boolean = false;
    @Input() group: string;

    @Input() templates: Array<{
        name: string;
        templateRef: TemplateRef<any>;
    }>;
}
