import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    private collapseSidebarMobile: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);
    private titleCache: BehaviorSubject<string> = new BehaviorSubject<string>(
        '',
    );

    public listenerTitleChange(
        listener: (title: string) => void,
    ): Subscription {
        return this.titleCache.asObservable().subscribe(listener);
    }

    public changeTitle(title: string): void {
        this.titleCache.next(title);
    }

    public getValueTitle(): Observable<string> {
        return this.titleCache.asObservable();
    }

    public toggleSidebar(): void {
        const status = this.collapseSidebarMobile.getValue();
        this.collapseSidebarMobile.next(!status);
    }

    public listenSidebarChange(
        listener: (status: boolean) => void,
    ): Subscription {
        return this.collapseSidebarMobile.asObservable().subscribe(listener);
    }

    public getSidebarStatus(): Observable<boolean> {
        return this.collapseSidebarMobile.asObservable();
    }
}
