import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { EcmInputComponent, SearchWrapperComponent } from '@ecm-module/common';

@Component({
    selector: 'payment-form-search',
    templateUrl: './form-search.component.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        EcmInputComponent,
        SearchWrapperComponent,
    ],
})
export class PaymentFormSearchComponent implements OnInit {
    @Output() search = new EventEmitter<any>();

    private formBuilder = inject(FormBuilder);
    public formGroup: FormGroup;

    public ngOnInit(): void {
        this.formGroup = this.formBuilder.group({
            fromDate: [null],
            toDate: [],
        });
    }
}
