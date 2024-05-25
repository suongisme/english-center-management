import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Menu } from '@ecm-module/common';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private menuCache: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(
        [],
    );

    public setMenu(menus: Menu[]) {
        this.menuCache.next(menus);
    }

    public listenChangeMenu(listener: (menu: Menu[]) => void): Subscription {
        return this.getMenu().subscribe(listener);
    }

    public getMenu(): Observable<Menu[]> {
        return this.menuCache.asObservable();
    }

    public getValueMenu(): Menu[] {
        return this.menuCache.getValue();
    }
}
