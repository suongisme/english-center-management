import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@ecm-module/auth';
import { ConfirmationComponent } from '@ecm-module/common';
import { NgbCollapse, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'user-dropdown',
    templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent implements OnInit {
    @Output() toggle = new EventEmitter<NgbCollapse>();

    private authService = inject(AuthService);
    private modalService = inject(NgbModal);
    private router = inject(Router);

    public username: string;

    public ngOnInit(): void {
        this.username = this.authService.loginResponse.username;
    }

    public toggleDropdown(self: NgbCollapse): void {
        this.toggle.emit(self);
    }

    public routeChangePassword(): void {
        this.router.navigate(['change-password']);
    }

    public logout(): void {
        const modalRef = this.modalService.open(ConfirmationComponent, {
            centered: true,
            size: 'md',
        });
        modalRef.componentInstance.confirmation = {
            title: 'Xác nhận',
            content: 'Bạn có chắc chắn muốn đăng xuât?',
        };
        modalRef.closed.subscribe((res) => {
            if (!res) return;
            this.authService.logout();
            this.router.navigate(['auth', 'login']);
        });
    }
}
