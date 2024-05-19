import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    EcmInputComponent,
    EcmSelectComponent,
    STATUS,
    SearchWrapperComponent,
} from '@ecm-module/common';
import { TranslateModule } from '@ngx-translate/core';
import { SearchCourseRequest } from '../../interface';

@Component({
    selector: 'course-form-search',
    templateUrl: './form-search.component.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        EcmInputComponent,
        EcmSelectComponent,

        SearchWrapperComponent,
    ],
})
export class CourseFormSearchComponent implements OnInit {
    @Output() search = new EventEmitter<SearchCourseRequest>();

    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;

    public status = STATUS;

    public ngOnInit(): void {
        this.buildFormGroup();
    }

    private buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            name: [null],
            status: [null],
            fromPrice: [null],
            toPrice: [null],
        });
    }

    public ngOnSearch(formGroup: FormGroup): void {
        const searchRequest = formGroup.getRawValue();
        this.search.emit(searchRequest);
    }
}
