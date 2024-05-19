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
import { SearchClassRoomRequest } from '../../interface';
import { POSITION } from '../../constant';

@Component({
    selector: 'class-room-form-search',
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
export class ClassRoomFormSearchComponent implements OnInit {
    @Output() search = new EventEmitter<SearchClassRoomRequest>();

    private formBuilder: FormBuilder = inject(FormBuilder);

    public formGroup: FormGroup;

    public status = STATUS;
    public position = POSITION;

    public ngOnInit(): void {
        this.buildFormGroup();
    }

    private buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            name: [null],
            status: [null],
            position: [null],
        });
    }

    public ngOnSearch(formGroup: FormGroup): void {
        const searchRequest = formGroup.getRawValue();
        this.search.emit(searchRequest);
    }
}
