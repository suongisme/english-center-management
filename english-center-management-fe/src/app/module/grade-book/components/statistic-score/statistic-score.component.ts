import { Component, Input, OnInit, inject } from '@angular/core';
import {
    DestroyService,
    EcmBoxComponent,
    ModalWrapperComponent,
} from '@ecm-module/common';
import { GradebookService } from '../../service';
import { map, takeUntil } from 'rxjs';
import { GetStatisticScoreResponse } from '../../interface';
import { DecimalPipe, NgFor } from '@angular/common';
import { StatisticStudentGridComponent } from 'src/app/module/user/components/statistic-student-grid/statistic-student-grid.component';

@Component({
    selector: 'statistic-score',
    templateUrl: './statistic-score.component.html',
    standalone: true,
    imports: [
        ModalWrapperComponent,
        StatisticStudentGridComponent,
        EcmBoxComponent,
        NgFor,
        DecimalPipe,
    ],
    providers: [DestroyService],
})
export class StatisticScoreComponent implements OnInit {
    @Input() timetableId: number;

    private scoreService = inject(GradebookService);
    private destroyService = inject(DestroyService);

    public score: GetStatisticScoreResponse[] = [];
    public statisticScore = [
        {
            label: 'Điểm dưới trung bình ( <5 )',
            value: 0,
            color: 'progress-bar bg-danger',
        },
        {
            label: 'Điểm trung bình ( =5 )',
            value: 0,
            color: 'progress-bar bg-warning',
        },
        {
            label: 'Điểm khá ( >5)',
            value: 0,
            color: 'progress-bar bg-success',
        },
    ];

    public additionalColumnStudentGrid = [
        {
            headerName: 'Điểm số',
            minWidth: 100,
            field: 'score',
        },
    ];

    ngOnInit(): void {
        this.scoreService
            .statisticScore({
                data: { timetableId: this.timetableId },
            })
            .pipe(
                map((x) => x.items),
                takeUntil(this.destroyService.$destroy),
            )
            .subscribe((res) => {
                this.score = res;
                this.score.forEach((x) => {
                    const index = x.score < 5 ? 0 : x.score > 5 ? 2 : 1;
                    this.statisticScore[index].value++;
                });
            });
    }
}
