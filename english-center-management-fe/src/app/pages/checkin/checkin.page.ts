import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { EcmBoxComponent } from '@ecm-module/common';
import {
    TimetableGridComponent,
    TimetableResponse,
    TimetableService,
} from '@ecm-module/timetable';
import { Observable } from 'rxjs';

@Component({
    selector: 'checkin-page',
    templateUrl: './checkin.page.html',
    standalone: true,
    imports: [TimetableGridComponent, EcmBoxComponent, AsyncPipe],
})
export class CheckInPage implements OnInit {
    private timetableService = inject(TimetableService);

    public $timetable: Observable<TimetableResponse[]>;

    public ngOnInit(): void {
        this.$timetable = this.timetableService.getByUserId(
            3,
            new Date().getDay() + 1,
        );
    }
}
