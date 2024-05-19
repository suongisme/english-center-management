import {
    KeyValuePipe,
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchCase,
} from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import {
    ControlContainer,
    ControlValueAccessor,
    FormGroup,
    FormsModule,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'ecm-input',
    templateUrl: './ecm-input.component.html',
    styleUrls: ['./ecm-input.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgSwitch,
        NgSwitchCase,
        NgFor,
        KeyValuePipe,
        TranslateModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: EcmInputComponent,
        },
    ],
})
export class EcmInputComponent implements ControlValueAccessor {
    @Input() label: string;

    @Input() type: string = 'text';

    @Input() variant: 'input' | 'textarea' = 'input';

    @Input() placeholder: string = '';

    @Input() errorsMessage: { [name: string]: string };

    @Input() formControlName: string;

    @Input() required: boolean = false;

    public controlContainer = inject(ControlContainer);

    public value: any;

    onChangeFn: (value) => void;
    onTouchedFn: () => void;

    isDisabled: boolean = false;
    touched = false;

    get control() {
        const formGroup = this.controlContainer.control as FormGroup;
        return formGroup.controls[this.formControlName];
    }

    onChangeValue(): void {
        this.onChangeFn(this.value);
        this.markAsTouched();
    }

    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedFn = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouchedFn();
            this.touched = true;
        }
    }
}
