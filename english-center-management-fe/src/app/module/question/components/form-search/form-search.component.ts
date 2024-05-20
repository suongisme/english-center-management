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
import { SearchQuestionRequest } from '../../interface/question.interface';
import { LEVEL } from '../../constant/question.const';

@Component({
    selector: 'question-form-search',
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
export class QuestionFormSearchComponent implements OnInit {
    @Output() search = new EventEmitter<SearchQuestionRequest>();

    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;

    public status = STATUS;
    public level = LEVEL;

    public ngOnInit(): void {
        this.buildFormGroup();
    }

    private buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            title: [null],
            status: [null],
            level: [null],
        });
    }

    public ngOnSearch(formGroup: FormGroup): void {
        const searchRequest = formGroup.getRawValue();
        this.search.emit(searchRequest);
    }
}
