import { Component, Input } from '@angular/core';
import { UserTimetableComponent } from '@ecm-module/timetable';

@Component({
    selector: 'timetable-page',
    templateUrl: './timetable.page.html',
    standalone: true,
    imports: [UserTimetableComponent],
})
export class TimetablePage {
    @Input() userId: number;
}
