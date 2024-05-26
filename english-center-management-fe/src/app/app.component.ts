import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    NavigationEnd,
    Router,
    Scroll,
} from '@angular/router';
import { DestroyService } from '@ecm-module/common';
import { filter, map, takeUntil } from 'rxjs';
import { SidebarService } from './layout/main/service/sidebar.service';
import { AuthService } from './module/auth/service';
import { LoginResponse } from './module/auth/interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [DestroyService],
})
export class AppComponent implements OnInit {
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);
    private sidebarService: SidebarService = inject(SidebarService);
    private titleService: Title = inject(Title);
    private destroyService = inject(DestroyService);
    private authService = inject(AuthService);

    public title: string;

    public ngOnInit(): void {
        this.listenRouteChange();
        const json = localStorage.getItem('auth');
        if (json) {
            const auth = JSON.parse(json);
            this.authService.loginResponse = auth;
            localStorage.removeItem('auth');
        }
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
                this.titleService.setTitle(`${this.title.toUpperCase()} | ECM`);
            });
    }

    @HostListener('window:beforeunload')
    public beforeReloadPage($event): void {
        if (this.authService.isAuthenticated) {
            localStorage.setItem(
                'auth',
                JSON.stringify(this.authService.loginResponse ?? {}),
            );
        }
    }
}
