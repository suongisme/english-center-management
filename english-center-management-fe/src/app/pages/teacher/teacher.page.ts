import { Component, OnInit, inject } from '@angular/core';
import {
    DestroyService,
    FmsBoxComponent,
    Pagination,
    PaginationComponent,
} from '@ecm-module/common';

import {
    CreateStudentModal,
    StudentFormSearchComponent,
    StudentGridWrapperComponent,
} from '@ecm-module/student';
import {
    TeacherFormSearchComponent,
    TeacherGridWrapperComponent,
} from '@ecm-module/teacher';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'teacher-page',
    templateUrl: './teacher.page.html',
    standalone: true,
    imports: [
        TeacherFormSearchComponent,
        TeacherGridWrapperComponent,
        PaginationComponent,
        FmsBoxComponent,

        TranslateModule,
        FontAwesomeModule,
    ],
    providers: [DestroyService],
})
export class TeacherPage implements OnInit {
    private readonly destroyService = inject(DestroyService);
    private readonly modalService = inject(NgbModal);

    public pagination: Pagination = new Pagination(1, 0);

    public ngOnInit(): void {}

    public ngOnOpenCreateStudent(): void {
        this.modalService.open(CreateStudentModal, {
            size: 'lg',
            centered: true,
        });
    }
}
