import { Component, OnInit, inject } from '@angular/core';
import {
    DestroyService,
    EcmBoxComponent,
    Pagination,
    PaginationComponent,
} from '@ecm-module/common';

import {
    CreateUserModal,
    UserFormSearchComponent,
    UserGridWrapperComponent,
    UserSearchRequest,
    UserSearchResponse,
} from '@ecm-module/user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { UserService } from 'src/app/module/user/services';

@Component({
    selector: 'user-page',
    templateUrl: './user.page.html',
    standalone: true,
    imports: [
        UserFormSearchComponent,
        PaginationComponent,
        EcmBoxComponent,
        UserGridWrapperComponent,

        TranslateModule,
        FontAwesomeModule,
    ],
    providers: [DestroyService],
})
export class UserPage implements OnInit {
    public pagination: Pagination = new Pagination(1, 0);
    public searchRequest: UserSearchRequest;
    public users: UserSearchResponse[];

    private readonly destroyService = inject(DestroyService);
    private readonly modalService = inject(NgbModal);
    private readonly userService = inject(UserService);

    public ngOnInit(): void {
        this.paginate(this.pagination);
    }

    public ngOnOpenCreateUser(): void {
        this.modalService.open(CreateUserModal, {
            size: 'lg',
            centered: true,
        });
    }

    public ngOnSearch(searchRequest: UserSearchRequest): void {
        this.searchRequest = searchRequest;
        this.paginate(this.pagination);
    }

    public paginate(pagination: Pagination): void {
        this.pagination = pagination;
        this.userService
            .searchUser({
                pageNo: this.pagination.page,
                pageSize: this.pagination.pageSize,
                data: this.searchRequest,
            })
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                this.users = res.items;
                this.pagination.total = res.totalItems;
            });
    }
}
