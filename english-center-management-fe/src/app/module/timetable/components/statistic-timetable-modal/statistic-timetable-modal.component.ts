import { Component, Input, OnInit, inject } from '@angular/core';
import { DestroyService, ModalWrapperComponent } from '@ecm-module/common';
import { StatisticTimetableGridComponent } from '../statistic-timetable-grid/statistic-timetable-grid.component';
import { TimetableService } from '../../service';
import { Observable, map, takeUntil } from 'rxjs';
import { GetStatisticTimetableResponse } from '../../interface';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatisticScoreComponent } from '@ecm-module/grade-book';

@Component({
    selector: 'statistic-timetable-modal',
    templateUrl: './statistic-timetable-modal.component.html',
    standalone: true,
    imports: [
        ModalWrapperComponent,
        StatisticTimetableGridComponent,
        AsyncPipe,
    ],
    providers: [DestroyService],
})
export class StatisticTimetableModal implements OnInit {
    @Input() courseId: number;

    private timetableService = inject(TimetableService);
    private destroyService = inject(DestroyService);
    private modalService = inject(NgbModal);

    public $timetable: Observable<GetStatisticTimetableResponse[]>;

    ngOnInit(): void {
        this.$timetable = this.timetableService
            .getStatisticTimetable({
                data: { courseId: this.courseId },
            })
            .pipe(
                map((x) => x.items),
                takeUntil(this.destroyService.$destroy),
            );
    }

    ngStatisticScore(data: GetStatisticTimetableResponse): void {
        const modalRef = this.modalService.open(StatisticScoreComponent, {
            centered: true,
            size: 'xl',
        });
        modalRef.componentInstance.timetableId = data.id;
    }
}
