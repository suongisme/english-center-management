import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TestingGridComponent } from '../testing-grid/testing-grid.component';
import { SearchTestingResponse } from '../../interface';
import { Router } from '@angular/router';

@Component({
    selector: 'testing-grid-wrapper',
    templateUrl: './testing-grid-wrapper.component.html',
    standalone: true,
    imports: [TestingGridComponent, TranslateModule, FontAwesomeModule],
})
export class TestingGridWrapperComponent {
    @Input() testings: SearchTestingResponse[];

    @Output() createNew = new EventEmitter();

    private readonly modalService = inject(NgbModal);
    private readonly router = inject(Router);

    public openAddClassRoomModal(): void {
        this.router.navigate(['testing', 'save-testing']);
    }

    public afterUpdateClassRoom(): void {
        this.createNew.emit();
    }
}
