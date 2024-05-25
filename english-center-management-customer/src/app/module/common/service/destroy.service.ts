import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DestroyService implements OnDestroy {
    public $destroy = new Subject<any>();

    public ngOnDestroy(): void {
        this.$destroy.next(null);
        this.$destroy.complete();
    }
}
