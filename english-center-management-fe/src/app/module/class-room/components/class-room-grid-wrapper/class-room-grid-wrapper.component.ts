import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CreateClassRoomModal } from '../create-class-room-modal/create-class-room-modal.component';
import { SearchClassRoomResponse } from '../../interface';
import { ClassRoomGridComponent } from '../class-room-grid/class-room-grid.component';

@Component({
    selector: 'class-room-grid-wrapper',
    templateUrl: './class-room-grid-wrapper.component.html',
    standalone: true,
    imports: [ClassRoomGridComponent, TranslateModule, FontAwesomeModule],
})
export class ClassRoomGridWrapperComponent {
    @Input() classRooms: SearchClassRoomResponse[];

    @Output() createNew = new EventEmitter();

    private readonly modalService = inject(NgbModal);

    public openAddClassRoomModal(): void {
        this.modalService
            .open(CreateClassRoomModal, {
                size: 'md',
                centered: true,
            })
            .closed.subscribe((res) => {
                if (res) this.createNew.emit();
            });
    }

    public afterUpdateClassRoom(): void {
        this.createNew.emit();
    }
}
