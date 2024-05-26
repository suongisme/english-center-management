import { Component, inject } from '@angular/core';
import { ModalWrapperComponent, NotifierService } from '@ecm-module/common';
import { ChangePasswordFormComponent } from '../change-password-form/change-password-form.component';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '@ecm-module/user';

@Component({
    selector: 'change-password-modal',
    templateUrl: './change-password-modal.component.html',
    standalone: true,
    imports: [ModalWrapperComponent, ChangePasswordFormComponent],
})
export class ChangePasswordModal {
    public formGroup: FormGroup;

    private userService = inject(UserService);
    private notifierService = inject(NotifierService);
    private router = inject(Router);
    private activeModal = inject(NgbActiveModal);

    public ngOnSubmit(): void {
        if (this.formGroup.invalid) {
            this.formGroup.markAllAsTouched();
            return;
        }
        const changePasswordRequest = this.formGroup.getRawValue();
        this.userService.changePassword(changePasswordRequest).subscribe(() => {
            this.notifierService.success('Đổi mật khẩu thành công').then(() => {
                this.router.navigate(['/xac-thuc', 'dang-nhap']);
                this.activeModal.close();
            });
        });
    }
}
