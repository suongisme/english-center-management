import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalWrapperComponent } from '@ecm-module/common';
import { CheckinService } from '../../service/checkin.service';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { GetCheckedIn } from '../../interface';
import { DATE_OF_WEEK } from '@ecm-module/timetable';

@Component({
    selector: 'checkin-modal',
    templateUrl: './checkin-modal.component.html',
    standalone: true,
    imports: [ModalWrapperComponent, AsyncPipe, NgIf, NgFor, DatePipe],
})
export class CheckinModal implements OnInit {
    @Input({ required: true }) timetableId: number;
    @Input() day?: number;

    public $checkedIn: Observable<GetCheckedIn[]>;
    public dateOfWeek = DATE_OF_WEEK;
    private checkinService = inject(CheckinService);

    public ngOnInit(): void {
        this.$checkedIn = this.checkinService.getCheckedInByTimetableIdAndDay(
            this.timetableId,
            this.day,
        );
    }
}
