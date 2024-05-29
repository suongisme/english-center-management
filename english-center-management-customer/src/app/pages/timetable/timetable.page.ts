import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@ecm-module/auth';
import { AddTimePipe, DestroyService } from '@ecm-module/common';
import {
    DATE_OF_WEEK,
    TimetableInfoComponent,
    TimetableResponse,
    TimetableService,
} from '@ecm-module/timetable';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'timetable-page',
    templateUrl: './timetable.page.html',
    styleUrls: ['./timetable.page.scss'],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        AsyncPipe,
        KeyValuePipe,
        AddTimePipe,
        NgbPopover,
        TimetableInfoComponent,
    ],
    providers: [DestroyService],
})
export class TimetablePage implements OnInit {
    public days = DATE_OF_WEEK;

    public timetableMap: Map<string, TimetableResponse[]>;
    private readonly timetableService = inject(TimetableService);
    private readonly destroyService = inject(DestroyService);
    private readonly authService = inject(AuthService);

    public ngOnInit(): void {
        this.timetableMap = new Map();
        const userId = this.authService.loginResponse.id;
        this.loadTimetable(userId);
    }

    private loadTimetable(userId: number): void {
        this.timetableService
            .getByUserId({ userId: userId })
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                res.forEach((x) => {
                    const value = this.timetableMap.get(x.startTime) ?? [];
                    value.push(x);
                    this.timetableMap.set(x.startTime, value);
                });
                this.timetableMap.forEach((value, key) => {
                    value.sort((x1, x2) => (x1.day > x2.day ? 1 : -1));
                });
            });
    }
}
