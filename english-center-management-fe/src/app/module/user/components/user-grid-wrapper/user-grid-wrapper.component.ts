import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CreateTimetableModal } from '@ecm-module/timetable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { UserSearchResponse } from '../../interface';
import { CreateUserModal } from '../create-user-modal/create-user-modal.component';
import { UserGridComponent } from '../user-grid/user-grid.component';
import { Role } from '../../constant';
import { NgIf } from '@angular/common';

@Component({
    selector: 'user-grid-wrapper',
    templateUrl: './user-grid-wrapper.component.html',
    standalone: true,
    imports: [UserGridComponent, TranslateModule, FontAwesomeModule, NgIf],
})
export class UserGridWrapperComponent {
    @Input() users: UserSearchResponse[];
    @Input() role: Role;

    @Output() createNew = new EventEmitter();

    public adminRole = Role.ADMIN;
    public studentRole = Role.STUDENT;

    private readonly modalService = inject(NgbModal);

    public openAddUserModal(): void {
        const modalRef = this.modalService.open(CreateUserModal, {
            size: 'lg',
            centered: true,
        });

        modalRef.componentInstance.role = this.role;
        modalRef.closed.subscribe((res) => {
            if (res) this.createNew.emit();
        });
    }

    public openAssign(): void {
        this.modalService
            .open(CreateTimetableModal, {
                size: 'md',
                centered: true,
            })
            .closed.subscribe((res) => {});
    }

    public updateUser(): void {
        this.createNew.emit();
    }
}
