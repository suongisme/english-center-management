import { Component, Input, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import {
    DestroyService,
    ModalWrapperComponent,
    NotifierService,
} from '@ecm-module/common';
import { UpdateUser } from '../../interface';
import { UserService } from '../../services';
import { takeUntil } from 'rxjs';
import { Role } from '../../constant';

@Component({
    selector: 'create-user-modal',
    templateUrl: './create-user-modal.component.html',
    standalone: true,
    imports: [CreateUserFormComponent, TranslateModule, ModalWrapperComponent],
    providers: [DestroyService],
})
export class CreateUserModal {
    @Input() role: Role;

    public formGroup: FormGroup;
    public user: UpdateUser;

    private readonly activeModal = inject(NgbActiveModal);
    private readonly userService = inject(UserService);
    private readonly destroyService = inject(DestroyService);
    private readonly notifierService = inject(NotifierService);

    public onSaveUser() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.invalid) {
            return;
        }
        const user = {
            ...this.formGroup.getRawValue(),
            role: this.role,
        };
        if (this.user) {
            this.userService
                .updateUser({
                    ...user,
                    id: this.user.id,
                })
                .pipe(takeUntil(this.destroyService.$destroy))
                .subscribe((res) => {
                    this.notifierService
                        .success('Cập nhật người dùng thành công')
                        .then((x) => {
                            if (x.isConfirmed) {
                                this.activeModal.close(user);
                            }
                        });
                });
        } else {
            this.userService
                .createUser(user)
                .pipe(takeUntil(this.destroyService.$destroy))
                .subscribe((res) => {
                    this.notifierService
                        .success('Tạo người dùng thành công')
                        .then((x) => {
                            if (x.isConfirmed) {
                                this.activeModal.close(user);
                            }
                        });
                });
        }
    }
}
