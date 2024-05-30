import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import {
    ButtonBackComponent,
    DestroyService,
    STATUS,
} from '@ecm-module/common';
import { takeUntil } from 'rxjs';
import { DATE_OF_WEEK } from '../../constant';
import { TimetableResponse } from '../../interface';
import { AddTimePipe } from '../../pipe';
import { TimetableService } from '../../service';

@Component({
    selector: 'user-timetable',
    templateUrl: './user-timetable.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        AsyncPipe,
        KeyValuePipe,
        AddTimePipe,
        ButtonBackComponent,
    ],
    providers: [DestroyService],
})
export class UserTimetableComponent implements OnInit {
    @Input() userId: number;

    public days = DATE_OF_WEEK;
    public status = STATUS;

    public timetableMap: Map<string, TimetableResponse[]>;

    private readonly timetableService = inject(TimetableService);
    private readonly destroyService = inject(DestroyService);

    public ngOnInit(): void {
        this.loadTimetable();
    }

    private loadTimetable(): void {
        this.timetableMap = new Map();
        this.timetableService
            .getByUserId({ userId: this.userId })
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
