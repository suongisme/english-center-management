import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
    AuthService,
    ChangePasswordFormComponent,
    ChangePasswordModal,
} from '@ecm-module/auth';
import { ConfirmationComponent } from '@ecm-module/common';
import { UserModal } from '@ecm-module/user';
import { NgbCollapse, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'profile-dropdown',
    templateUrl: './profile-dropdown.component.html',
    standalone: true,
    imports: [NgbCollapse, NgIf, RouterLink],
})
export class ProfileDropdownComponent implements OnInit {
    private authService = inject(AuthService);
    private modalService = inject(NgbModal);
    private router = inject(Router);

    public isAuth: boolean;
    public username: string;

    ngOnInit(): void {
        this.isAuth = this.authService.isAuthenticated;
        if (this.isAuth) {
            this.username = this.authService.loginResponse.username;
        }
    }

    ngOnLogout(): void {
        const modalRef = this.modalService.open(ConfirmationComponent, {
            centered: true,
            size: 'md',
        });
        modalRef.componentInstance.confirmation = {
            title: 'Xác nhận',
            content: 'Bạn có chắc chắn muốn đang xuất',
        };
        modalRef.closed.subscribe((res) => {
            if (res) {
                this.authService.logout();
                this.router.navigate(['/xac-thuc', 'dang-nhap']);
            }
        });
    }

    ngOnChangePassword(): void {
        this.modalService.open(ChangePasswordModal, {
            centered: true,
            size: 'md',
        });
    }

    ngOnProfile(): void {
        this.modalService.open(UserModal, {
            centered: true,
            size: 'lg',
        });
    }
}
