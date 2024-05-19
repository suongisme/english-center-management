import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CreateClassRoomFormComponent } from '../create-class-room-form/create-class-room-form.component';
import {
    DestroyService,
    ModalWrapperComponent,
    NotifierService,
} from '@ecm-module/common';
import { takeUntil } from 'rxjs';
import { UpdateClassRoomRequest } from '../../interface';
import { ClassRoomService } from '../../service';

@Component({
    selector: 'create-class-room-modal',
    templateUrl: './create-class-room-modal.component.html',
    standalone: true,
    imports: [
        CreateClassRoomFormComponent,
        TranslateModule,
        ModalWrapperComponent,
    ],
    providers: [DestroyService],
})
export class CreateClassRoomModal {
    public formGroup: FormGroup;
    public classRoom: UpdateClassRoomRequest;

    private readonly activeModal = inject(NgbActiveModal);
    private readonly classRoomService = inject(ClassRoomService);
    private readonly destroyService = inject(DestroyService);
    private readonly notifierService = inject(NotifierService);

    public onSaveClassRoom() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.invalid) {
            return;
        }
        const classRoom = this.formGroup.getRawValue();
        if (this.classRoom) {
            this.classRoomService
                .updateClassRoom({
                    ...classRoom,
                    id: this.classRoom.id,
                })
                .pipe(takeUntil(this.destroyService.$destroy))
                .subscribe((res) => {
                    this.notifierService
                        .success('Cập nhật lớp học thành công')
                        .then((x) => {
                            if (x.isConfirmed) {
                                this.activeModal.close(classRoom);
                            }
                        });
                });
        } else {
            this.classRoomService
                .createClassRoom(classRoom)
                .pipe(takeUntil(this.destroyService.$destroy))
                .subscribe((res) => {
                    this.notifierService
                        .success('Tạo lớp học thành công')
                        .then((x) => {
                            if (x.isConfirmed) {
                                this.activeModal.close(classRoom);
                            }
                        });
                });
        }
    }
}
