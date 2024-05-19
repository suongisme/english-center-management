import { Component, inject } from '@angular/core';
import { ModalWrapperComponent, NotifierService } from '@ecm-module/common';
import { TimetableFormComponent } from '../timetable-form/timetable-form.component';
import { FormGroup } from '@angular/forms';
import { TimetableService } from '../../service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'timetable-modal',
    templateUrl: './timetable-modal.component.html',
    standalone: true,
    imports: [ModalWrapperComponent, TimetableFormComponent],
})
export class TimetableModal {
    public formGroup: FormGroup;

    private readonly activeModal = inject(NgbActiveModal);
    private readonly timetableService = inject(TimetableService);
    private readonly notifierService = inject(NotifierService);

    public onSaveTimetable(): void {
        const timetable = this.formGroup.getRawValue();

        this.timetableService
            .createTimetable({
                ...timetable,
                students: timetable.students.map((id) => ({ studentId: id })),
            })
            .subscribe((res) => {
                this.notifierService
                    .success('Tạo lịch thành công')
                    .then((x) => {
                        if (x.isConfirmed) {
                            this.activeModal.close();
                        }
                    });
            });
    }
}
