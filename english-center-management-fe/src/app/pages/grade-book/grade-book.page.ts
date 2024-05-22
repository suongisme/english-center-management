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
    selector: 'grade-book-page',
    templateUrl: './grade-book.page.html',
    standalone: true,
    imports: [EcmBoxComponent, TimetableGridComponent, AsyncPipe],
})
export class GradeBookPage implements OnInit {
    private timetableService = inject(TimetableService);

    public $timetable: Observable<TimetableResponse[]>;

    public ngOnInit(): void {
        this.$timetable = this.timetableService.getForGradebook(3);
    }
}
