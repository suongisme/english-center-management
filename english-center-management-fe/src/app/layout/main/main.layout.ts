import { Component, OnInit, inject } from '@angular/core';
import { BASE_MENU, MenuService } from '@ecm-module/common';
import { Observable, take } from 'rxjs';
import { SidebarService } from './service/sidebar.service';

@Component({
    selector: 'main-layout',
    templateUrl: './main.layout.html',
    styleUrls: ['./main.layout.scss'],
})
export class MainLayout implements OnInit {
    private sidebarService: SidebarService = inject(SidebarService);

    public title$: Observable<string> = this.sidebarService
        .getValueTitle()
        .pipe(take(1));

    public ngOnInit(): void {}
}
