import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    NavigationEnd,
    Router,
    Scroll,
} from '@angular/router';
import { DestroyService } from '@ecm-module/common';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, takeUntil } from 'rxjs';
import { SidebarService } from './layout/main/service/sidebar.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [DestroyService],
})
export class AppComponent implements OnInit {
    private translateService: TranslateService = inject(TranslateService);
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);
    private sidebarService: SidebarService = inject(SidebarService);
    private titleService: Title = inject(Title);
    private destroyService = inject(DestroyService);

    public title: string;

    public ngOnInit(): void {
        this.listenRouteChange();
        this.listenLangChange();
    }

    private listenLangChange(): void {
        this.translateService.onLangChange
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((lang) => {
                this.titleService.setTitle(
                    `${this.translateService.instant(this.title).toUpperCase()} | ECM`,
                );
            });
    }

    private listenRouteChange(): void {
        this.router.events
            .pipe(
                filter(
                    (res) =>
                        res instanceof NavigationEnd || res instanceof Scroll,
                ),
                map((_) => this.activatedRoute.snapshot),
                map((snapshot: ActivatedRouteSnapshot) => {
                    while (snapshot.firstChild) {
                        snapshot = snapshot.firstChild;
                    }
                    return snapshot.data;
                }),
                filter((data) => data?.title),
                takeUntil(this.destroyService.$destroy),
            )
            .subscribe((data) => {
                this.title = data.title;
                this.sidebarService.changeTitle(this.title);
                this.titleService.setTitle(
                    `${this.translateService.instant(this.title).toUpperCase()} | ECM`,
                );
            });
    }
}
