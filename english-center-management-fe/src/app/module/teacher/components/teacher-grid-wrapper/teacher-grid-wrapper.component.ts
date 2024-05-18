import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TeacherGridComponent } from '../teacher-grid/teacher-grid.component';
import { CreateTeacherModal } from '../create-teacher-modal/create-teacher-modal.component';

@Component({
    selector: 'teacher-grid-wrapper',
    templateUrl: './teacher-grid-wrapper.component.html',
    standalone: true,
    imports: [TeacherGridComponent, TranslateModule, FontAwesomeModule],
})
export class TeacherGridWrapperComponent {
    private readonly modalService = inject(NgbModal);

    public openAddMemberModal(): void {
        this.modalService
            .open(CreateTeacherModal, {
                size: 'lg',
                centered: true,
            })
            .closed.subscribe((res) => {});
    }
}
