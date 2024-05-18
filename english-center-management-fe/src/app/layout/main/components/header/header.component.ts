import { Component, QueryList, ViewChildren, inject } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { SidebarService } from '@ecm-layout/main';
import { Observable } from 'rxjs';

@Component({
    selector: 'main-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class MainHeaderComponent {
    @ViewChildren(NgbCollapse) ngbCollapses: QueryList<NgbCollapse>;

    private sidebarService: SidebarService = inject(SidebarService);

    public title$: Observable<string> = this.sidebarService.getValueTitle();

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
}
