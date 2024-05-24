import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@ecm-module/auth';
import { EcmBoxComponent } from '@ecm-module/common';
import {
    TimetableDetailGridComponent,
    TimetableResponse,
    TimetableService,
} from '@ecm-module/timetable';
import { Observable } from 'rxjs';

@Component({
    selector: 'checkin-page',
    templateUrl: './checkin.page.html',
    standalone: true,
    imports: [TimetableDetailGridComponent, EcmBoxComponent, AsyncPipe],
})
export class CheckInPage implements OnInit {
    private timetableService = inject(TimetableService);
    private authService = inject(AuthService);

    public $timetable: Observable<TimetableResponse[]>;

    public ngOnInit(): void {
        this.$timetable = this.timetableService.getByUserId({
            userId: this.authService.loginResponse.id,
            day: new Date().getDay() + 1,
        });
    }
}
