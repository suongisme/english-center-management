import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CreateStudentFormComponent } from '../create-student-form/create-student-form.component';
import { ModalWrapperComponent } from '@ecm-module/common';
import { CreateStudent } from '../../interface';

@Component({
    selector: 'create-student-modal',
    templateUrl: './create-student-modal.component.html',
    standalone: true,
    imports: [
        CreateStudentFormComponent,
        TranslateModule,
        ModalWrapperComponent,
    ],
})
export class CreateStudentModal {
    public formGroup: FormGroup;
    public avatar: File;
    public student: CreateStudent;
    private activeModal: NgbActiveModal = inject(NgbActiveModal);

    public onSaveMember() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.invalid) {
            return;
        }
        const member = this.formGroup.getRawValue();
        if (this.avatar) {
            member.avatar = this.avatar;
        }
        this.activeModal.close(member);
    }
}
