import { Component, OnInit, inject } from '@angular/core';

import {
    DestroyService,
    EcmBoxComponent,
    Pagination,
    PaginationComponent,
} from '@ecm-module/common';
import {
    SearchTestingRequest,
    SearchTestingResponse,
    TestingFormSearchComponent,
    TestingGridWrapperComponent,
    TestingService,
} from '@ecm-module/testing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'testing-page',
    templateUrl: './testing.page.html',
    standalone: true,
    imports: [
        TestingFormSearchComponent,
        PaginationComponent,
        EcmBoxComponent,
        TestingGridWrapperComponent,

        TranslateModule,
        FontAwesomeModule,
    ],
    providers: [DestroyService],
})
export class TestingPage implements OnInit {
    public pagination: Pagination = new Pagination(1, 0);
    public searchRequest: SearchTestingRequest;
    public testings: SearchTestingResponse[];

    private readonly destroyService = inject(DestroyService);
    private readonly modalService = inject(NgbModal);
    private readonly testingService = inject(TestingService);

    public ngOnInit(): void {
        this.paginate(this.pagination);
    }

    public ngOnSearch(searchRequest: SearchTestingRequest): void {
        this.searchRequest = searchRequest;
        this.paginate(this.pagination);
    }

    public paginate(pagination: Pagination): void {
        this.pagination = pagination;
        this.testingService
            .searchTesting({
                pageNo: this.pagination.page,
                pageSize: this.pagination.pageSize,
                data: this.searchRequest,
            })
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                this.testings = res.items;
                this.pagination.total = res.totalItems;
            });
    }
}
