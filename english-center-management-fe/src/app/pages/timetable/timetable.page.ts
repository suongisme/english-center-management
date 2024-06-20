import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthService } from '@ecm-module/auth';
import { UserTimetableComponent } from '@ecm-module/timetable';

@Component({
    selector: 'timetable-page',
    templateUrl: './timetable.page.html',
    standalone: true,
    imports: [UserTimetableComponent],
})
export class TimetablePage implements OnInit {
    public userId: number;

    private authService = inject(AuthService);

    public ngOnInit(): void {
        this.userId = this.authService.loginResponse.id;
    }
}
