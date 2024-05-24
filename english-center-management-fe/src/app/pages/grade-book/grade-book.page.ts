import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@ecm-module/auth';
import { EcmBoxComponent, PagingResponse } from '@ecm-module/common';
import {
    SearchTimetableResponse,
    TimetableGridComponent,
    TimetableService,
} from '@ecm-module/timetable';
import { Observable } from 'rxjs';

@Component({
    selector: 'grade-book-page',
    templateUrl: './grade-book.page.html',
    standalone: true,
    imports: [EcmBoxComponent, TimetableGridComponent, AsyncPipe, NgIf],
})
export class GradeBookPage implements OnInit {
    private timetableService = inject(TimetableService);
    private authService = inject(AuthService);

    public $timetable: Observable<PagingResponse<SearchTimetableResponse>>;

    public ngOnInit(): void {
        this.$timetable = this.timetableService.searchTimetable({
            data: {
                teacherId: this.authService.loginResponse.id,
                status: 0,
                scored: false,
            },
        });
    }
}
