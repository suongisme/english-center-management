import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    DestroyService,
    EcmBoxComponent,
    Pagination,
    PaginationComponent,
} from '@ecm-module/common';

import {
    UserFormSearchComponent,
    UserGridWrapperComponent,
    UserSearchRequest,
    UserSearchResponse,
} from '@ecm-module/user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { Role } from 'src/app/module/user/constant';
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
    public role: Role;

    private readonly destroyService = inject(DestroyService);
    private readonly userService = inject(UserService);
    private readonly activeRouter = inject(ActivatedRoute);

    public ngOnInit(): void {
        this.activeRouter.data.subscribe((res) => {
            this.role = res.role;
        });
        this.paginate(this.pagination);
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
                data: {
                    ...this.searchRequest,
                    role: this.role,
                },
            })
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                this.users = res.items;
                this.pagination.total = res.totalItems;
            });
    }
}
