import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalWrapperComponent } from '@ecm-module/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CreateTeacher } from '../../interface';
import { CreateTeacherFormComponent } from '../create-teacher-form/create-teacher-form.component';

@Component({
    selector: 'create-teacher-modal',
    templateUrl: './create-teacher-modal.component.html',
    standalone: true,
    imports: [
        CreateTeacherFormComponent,
        TranslateModule,
        ModalWrapperComponent,
    ],
})
export class CreateTeacherModal {
    public formGroup: FormGroup;
    public avatar: File;
    public teacher: CreateTeacher;
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
