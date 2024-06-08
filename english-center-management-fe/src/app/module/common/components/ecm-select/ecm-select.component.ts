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
import { EcmInputComponent } from '../ecm-input/ecm-input.component';

@Component({
    selector: 'ecm-select',
    templateUrl: './ecm-select.component.html',
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
            useExisting: EcmSelectComponent,
            multi: true,
        },
    ],
})
export class EcmSelectComponent extends EcmInputComponent {
    @Input() items: any[];
    @Input() bindLabel: string;
    @Input() bindValue: string;
    @Input() multiple: boolean = false;
    @Input() group: string;
    @Input() clearable: boolean;

    @Input() templates: Array<{
        name: string;
        templateRef: TemplateRef<any>;
    }>;
}
