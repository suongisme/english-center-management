import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'search-wrapper',
    templateUrl: './search-wrapper.component.html',
    standalone: true,
    imports: [TranslateModule, FontAwesomeModule, ReactiveFormsModule],
})
export class SearchWrapperComponent {
    @Input() formGroup: FormGroup;

    @Output() search = new EventEmitter<FormGroup>();

    public ngOnSearch(): void {
        this.search.emit(this.formGroup);
    }
}
