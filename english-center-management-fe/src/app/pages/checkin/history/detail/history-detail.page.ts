import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { GetStudentAndCheckinResult } from '@ecm-module/checkin';
import { UserCheckInComponent, UserService } from '@ecm-module/user';
import { Observable } from 'rxjs';

@Component({
    selector: 'history-detail-page',
    templateUrl: './history-detail.page.html',
    standalone: true,
    imports: [UserCheckInComponent, NgIf, AsyncPipe],
})
export class HistoryDetailPage implements OnInit {
    @Input() id: number;

    public $users: Observable<GetStudentAndCheckinResult[]>;

    private userService = inject(UserService);

    public ngOnInit(): void {
        this.$users = this.userService.getByCheckinId(this.id);
    }
}
