import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CreateStudentModal } from '../create-student-modal/create-student-modal.component';
import { StudentGridComponent } from '../student-grid/student-grid.component';

@Component({
    selector: 'student-grid-wrapper',
    templateUrl: './student-grid-wrapper.component.html',
    standalone: true,
    imports: [StudentGridComponent, TranslateModule, FontAwesomeModule],
})
export class StudentGridWrapperComponent {
    private readonly modalService = inject(NgbModal);

    public openAddMemberModal(): void {
        this.modalService
            .open(CreateStudentModal, {
                size: 'lg',
                centered: true,
            })
            .closed.subscribe((res) => {});
    }
}
