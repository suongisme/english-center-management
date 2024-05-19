import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import {
    FormsModule,
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
    EcmInputComponent,
    EcmSelectComponent,
    STATUS,
    SearchWrapperComponent,
} from '@ecm-module/common';
import { ROLE } from '../../constant';
import { UserSearchRequest } from '../../interface';

@Component({
    selector: 'user-form-search',
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
export class UserFormSearchComponent implements OnInit {
    @Output() search = new EventEmitter<UserSearchRequest>();

    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;

    public status = STATUS;
    public roles = ROLE;

    public ngOnInit(): void {
        this.buildFormGroup();
    }

    private buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            fullName: [null],
            status: [null],
            role: [null],
        });
    }

    public ngOnSearch(formGroup: FormGroup): void {
        const searchRequest = formGroup.getRawValue();
        this.search.emit(searchRequest);
    }
}
