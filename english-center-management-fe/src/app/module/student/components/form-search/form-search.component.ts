import { Component, OnInit, inject } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
    FmsInputComponent,
    FmsSelectComponent,
    SearchWrapperComponent,
} from '@ecm-module/common';

@Component({
    selector: 'student-form-search',
    templateUrl: './form-search.component.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        FmsInputComponent,
        FmsSelectComponent,

        SearchWrapperComponent,
    ],
})
export class StudentFormSearchComponent implements OnInit {
    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;

    public ngOnInit(): void {
        this.buildFormGroup();
    }

    private buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            name: [null],
            status: [null],
        });
    }
}
