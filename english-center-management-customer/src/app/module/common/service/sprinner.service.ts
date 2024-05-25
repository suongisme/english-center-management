import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SpinnerService {
    private spinnerStateSubject = new BehaviorSubject(false);

    get spinnerObservable(): Observable<boolean> {
        return this.spinnerStateSubject.asObservable();
    }

    public changeStateSpinner(state: boolean): void {
        this.spinnerStateSubject.next(state);
    }
}
