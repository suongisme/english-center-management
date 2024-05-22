import {
    CheckinService,
    HistoryCheckinFormSearchComponent,
    HistoryCheckinGridComponent,
    SearchCheckinRequest,
    SearchCheckinResponse,
} from '@ecm-module/checkin';
import { Component, inject } from '@angular/core';
import { EcmBoxComponent } from '@ecm-module/common';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'history-checkin-page',
    templateUrl: './checkin-history.page.html',
    standalone: true,
    imports: [
        HistoryCheckinFormSearchComponent,
        HistoryCheckinGridComponent,
        EcmBoxComponent,
        AsyncPipe,
    ],
})
export class HistoryCheckinPage {
    public $checkin: Observable<SearchCheckinResponse[]>;

    private checkinService = inject(CheckinService);

    public ngOnSearch(searchData: SearchCheckinRequest): void {
        this.$checkin = this.checkinService.searchCheckin(searchData);
    }
}
