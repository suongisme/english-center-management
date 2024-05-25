import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
    AuthService,
    ChangePasswordFormComponent,
    ChangePasswordRequest,
} from '@ecm-module/auth';
import { NotifierService } from '@ecm-module/common';
import { UserService } from '@ecm-module/user';

@Component({
    selector: 'change-password-page',
    templateUrl: './change-password.page.html',
    standalone: true,
    imports: [ChangePasswordFormComponent],
})
export class ChangePasswordPage {
    private authService = inject(AuthService);
    private userService = inject(UserService);
    private notifierService = inject(NotifierService);
    private router = inject(Router);

    public ngOnChangePassword(data: ChangePasswordRequest): void {
        this.userService.changePassword(data).subscribe((res) => {
            this.notifierService.success('Đổi mật khẩu thành công').then(() => {
                this.authService.logout();
                this.router.navigate(['auth', 'login']);
            });
        });
    }
}
