import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import {
    CheckinService,
    GetStudentAndCheckinResult,
} from '@ecm-module/checkin';
import { DestroyService, NotifierService } from '@ecm-module/common';
import { UserCheckInComponent } from '@ecm-module/user';
import { forkJoin, takeUntil } from 'rxjs';

@Component({
    selector: 'checkin-student',
    templateUrl: './checkin-student.page.html',
    standalone: true,
    imports: [NgIf, UserCheckInComponent, AsyncPipe],
    providers: [DestroyService],
})
export class CheckinStudentPage implements OnInit {
    @Input() timetableDetailId: number;
    @Input() timetableId: number;

    private checkinService = inject(CheckinService);
    private router = inject(Router);
    private destroyService = inject(DestroyService);
    private notifierService = inject(NotifierService);

    public users: GetStudentAndCheckinResult[];
    public formArray: FormArray;
    public isExist: boolean = true;

    public ngOnInit(): void {
        forkJoin([
            this.checkinService.validateCheckinToday(this.timetableDetailId),
            this.checkinService.getStudentAndCheckinResult(
                this.timetableDetailId,
            ),
        ])
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe(([res1, res2]) => {
                this.isExist = res1.apiBody.data;
                this.users = res2;
            });
    }

    public ngOnSubmit(): void {
        const details = this.formArray.getRawValue();
        this.checkinService
            .createCheckin({
                timetableDetailId: this.timetableDetailId,
                details: details,
            })
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                this.notifierService
                    .success('Điểm danh thành công')
                    .then(() => {
                        this.router.navigate(['checkin']);
                    });
            });
    }
}
