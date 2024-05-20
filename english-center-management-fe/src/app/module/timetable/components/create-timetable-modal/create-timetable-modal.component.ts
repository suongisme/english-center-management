import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalWrapperComponent, NotifierService } from '@ecm-module/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetTimetableResponse } from '../../interface';
import { TimetableService } from '../../service';
import { TimetableFormComponent } from '../timetable-form/timetable-form.component';

@Component({
    selector: 'create-timetable-modal',
    templateUrl: './create-timetable-modal.component.html',
    standalone: true,
    imports: [ModalWrapperComponent, TimetableFormComponent],
})
export class CreateTimetableModal {
    public formGroup: FormGroup;

    public timetable: GetTimetableResponse;

    private readonly activeModal = inject(NgbActiveModal);
    private readonly timetableService = inject(TimetableService);
    private readonly notifierService = inject(NotifierService);

    public onSaveTimetable(): void {
        const timetable = this.formGroup.getRawValue();

        if (this.timetable) {
            this.timetableService
                .updateTimetable({
                    ...timetable,
                    students: timetable.students.map((id) => ({
                        studentId: id,
                    })),
                    id: this.timetable.id,
                })
                .subscribe((res) => {
                    this.notifierService
                        .success('Cập nhật lịch thành công')
                        .then((x) => {
                            if (x.isConfirmed) {
                                this.activeModal.close(true);
                            }
                        });
                });
        } else {
            this.timetableService
                .createTimetable({
                    ...timetable,
                    students: timetable.students.map((id) => ({
                        studentId: id,
                    })),
                })
                .subscribe((res) => {
                    this.notifierService
                        .success('Tạo lịch thành công')
                        .then((x) => {
                            if (x.isConfirmed) {
                                this.activeModal.close(true);
                            }
                        });
                });
        }
    }
}
