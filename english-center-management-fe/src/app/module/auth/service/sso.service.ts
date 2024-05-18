import { Injectable } from '@angular/core';
import { SingleSignOn } from '../interface/sso.interface';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SsoService {
    private ssoListCache = new BehaviorSubject<SingleSignOn[]>([]);

    public cacheSsoList(singleSignOnList: SingleSignOn[]) {
        this.ssoListCache.next(singleSignOnList);
    }

    public listenSsoListChange(
        consumer: (sso: SingleSignOn[]) => void,
    ): Subscription {
        return this.ssoListCache.asObservable().subscribe(consumer);
    }
}
