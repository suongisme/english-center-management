import {
    Component,
    OnInit,
    QueryList,
    ViewChildren,
    inject,
} from '@angular/core';
import { NgbCollapse, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SidebarService } from '@ecm-layout/main';
import { Observable } from 'rxjs';
import { AuthService } from '@ecm-module/auth';
import { ConfirmationComponent } from '@ecm-module/common';
import { Router } from '@angular/router';

@Component({
    selector: 'main-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
    @ViewChildren(NgbCollapse) ngbCollapses: QueryList<NgbCollapse>;

    private sidebarService = inject(SidebarService);
    private authService = inject(AuthService);
    private modalService = inject(NgbModal);
    private router = inject(Router);

    public username: string;
    public title$: Observable<string> = this.sidebarService.getValueTitle();

    public ngOnInit(): void {
        this.username = this.authService.loginResponse.username;
    }

    public openSidebarMobile() {
        this.sidebarService.toggleSidebar();
    }

    public toggleDropdown(self: NgbCollapse): void {
        this.ngbCollapses.forEach((x) => {
            if (x !== self && !x['_isCollapsed']) {
                x.toggle();
            }
        });
        self.toggle();
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
