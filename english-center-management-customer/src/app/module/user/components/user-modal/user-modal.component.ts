import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { UserFormComponent } from '../user-form/user-form.component';
import {
    DestroyService,
    ModalWrapperComponent,
    NotifierService,
} from '@ecm-module/common';
import { takeUntil } from 'rxjs';
import { AuthService } from '@ecm-module/auth';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'user-modal',
    templateUrl: './user-modal.component.html',
    standalone: true,
    imports: [UserFormComponent, TranslateModule, ModalWrapperComponent],
    providers: [DestroyService],
})
export class UserModal implements OnInit {
    public formGroup: FormGroup;
    public user;

    private readonly activeModal = inject(NgbActiveModal);
    private readonly destroyService = inject(DestroyService);
    private readonly notifierService = inject(NotifierService);
    private readonly authService = inject(AuthService);
    private readonly userService = inject(UserService);
    private readonly router = inject(Router);

    public ngOnInit(): void {
        this.user = this.authService.loginResponse;
    }

    public onSaveUser() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.invalid) {
            return;
        }
        const request = this.formGroup.getRawValue();
        this.userService
            .updateUserInfo(request)
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                this.notifierService
                    .success('Cập nhật thành công, Đăng xuất để cập nhật')
                    .then(() => {
                        this.authService.logout();
                        this.router.navigate(['/xac-thuc', 'dang-nhap']);
                        this.activeModal.close();
                    });
            });
    }
}
