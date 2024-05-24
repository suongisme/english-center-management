import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ModalWrapperComponent, PagingResponse } from '@ecm-module/common';
import { Observable } from 'rxjs';
import { SearchTimetableRequest, SearchTimetableResponse } from '../../interface';
import { TimetableService } from '../../service';
import { TimetableGridComponent } from '../timetable-grid/timetable-grid.component';

@Component({
    selector: 'timetable-grid-modal',
    templateUrl: './timetable-grid-modal.component.html',
    standalone: true,
    imports: [TimetableGridComponent, ModalWrapperComponent, AsyncPipe, NgIf],
})
export class TimetableGridModalComponent implements OnInit {
    public userId: number;
    public role: string;
    public $timetables: Observable<PagingResponse<SearchTimetableResponse>>;

    private timetableService = inject(TimetableService);

    public ngOnInit(): void {
        const dataSearch = {} as SearchTimetableRequest;
        if (this.role === 'TEACHER') {
            dataSearch.teacherId = this.userId;
        }
        if (this.role === 'STUDENT') {
            dataSearch.studentId = this.userId
        }
        this.$timetables = this.timetableService.searchTimetable({
            data: dataSearch,
        });
    }
}
