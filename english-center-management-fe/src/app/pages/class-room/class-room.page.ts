import { Component, OnInit, inject } from '@angular/core';
import {
    ClassRoomFormSearchComponent,
    ClassRoomGridWrapperComponent,
    ClassRoomService,
    SearchClassRoomRequest,
    SearchClassRoomResponse,
} from '@ecm-module/class-room';
import {
    DestroyService,
    EcmBoxComponent,
    Pagination,
    PaginationComponent,
} from '@ecm-module/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'class-room-page',
    templateUrl: './class-room.page.html',
    standalone: true,
    imports: [
        ClassRoomFormSearchComponent,
        PaginationComponent,
        EcmBoxComponent,
        ClassRoomGridWrapperComponent,

        TranslateModule,
        FontAwesomeModule,
    ],
    providers: [DestroyService],
})
export class ClassRoomPage implements OnInit {
    public pagination: Pagination = new Pagination(1, 0);
    public searchRequest: SearchClassRoomRequest;
    public classRooms: SearchClassRoomResponse[];

    private readonly destroyService = inject(DestroyService);
    private readonly classRoomService = inject(ClassRoomService);

    public ngOnInit(): void {
        this.paginate(this.pagination);
    }

    public ngOnSearch(searchRequest: SearchClassRoomRequest): void {
        this.searchRequest = searchRequest;
        this.paginate(this.pagination);
    }

    public paginate(pagination: Pagination): void {
        this.pagination = pagination;
        this.classRoomService
            .searchClassRoom({
                pageNo: this.pagination.page,
                pageSize: this.pagination.pageSize,
                data: this.searchRequest,
            })
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                this.classRooms = res.items;
                this.pagination.total = res.totalItems;
            });
    }
}
