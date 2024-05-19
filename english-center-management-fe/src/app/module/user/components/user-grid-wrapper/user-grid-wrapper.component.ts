import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TimetableModal } from '@ecm-module/timetable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { UserSearchResponse } from '../../interface';
import { CreateUserModal } from '../create-user-modal/create-user-modal.component';
import { UserGridComponent } from '../user-grid/user-grid.component';

@Component({
    selector: 'user-grid-wrapper',
    templateUrl: './user-grid-wrapper.component.html',
    standalone: true,
    imports: [UserGridComponent, TranslateModule, FontAwesomeModule],
})
export class UserGridWrapperComponent {
    @Input() users: UserSearchResponse[];

    @Output() createNew = new EventEmitter();

    private readonly modalService = inject(NgbModal);

    public openAddUserModal(): void {
        this.modalService
            .open(CreateUserModal, {
                size: 'lg',
                centered: true,
            })
            .closed.subscribe((res) => {
                if (res) this.createNew.emit();
            });
    }

    public openAssign(): void {
        this.modalService
            .open(TimetableModal, {
                size: 'md',
                centered: true,
            })
            .closed.subscribe((res) => {});
    }

    public updateUser(): void {
        this.createNew.emit();
    }
}
