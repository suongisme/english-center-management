import { Component, QueryList, ViewChildren, inject } from '@angular/core';
import { SidebarService } from '@ecm-layout/main';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
    selector: 'main-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class MainHeaderComponent {
    private sidebarService = inject(SidebarService);

    public openingNgbCollapse: NgbCollapse;
    public title$: Observable<string> = this.sidebarService.getValueTitle();

    public openSidebarMobile() {
        this.sidebarService.toggleSidebar();
    }

    public toggleDropdown(self: NgbCollapse): void {
        if (self === this.openingNgbCollapse) {
            self.toggle();
            this.openingNgbCollapse = null;
        } else {
            this.openingNgbCollapse?.toggle();
            self.toggle();
            this.openingNgbCollapse = self;
        }
    }
}
