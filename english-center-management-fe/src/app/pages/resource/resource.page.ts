import { Component, Input, OnInit, inject } from '@angular/core';
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
import {
    ResourceGridWrapperComponent,
    ResourceService,
    SearchResourceResponse,
} from '@ecm-module/resource';

@Component({
    selector: 'resource-page',
    templateUrl: './resource.page.html',
    standalone: true,
    imports: [
        PaginationComponent,
        EcmBoxComponent,
        ResourceGridWrapperComponent,

        TranslateModule,
        FontAwesomeModule,
    ],
    providers: [DestroyService],
})
export class ResourcePage implements OnInit {
    @Input() type: string;
    @Input() keyId: number;

    public pagination: Pagination = new Pagination(1, 0);
    public resources: SearchResourceResponse[];

    private readonly destroyService = inject(DestroyService);
    private readonly resourceService = inject(ResourceService);

    public ngOnInit(): void {
        this.paginate(this.pagination);
    }

    public paginate(pagination: Pagination): void {
        this.pagination = pagination;
        this.resourceService
            .searchResource({
                pageNo: this.pagination.page,
                pageSize: this.pagination.pageSize,
                data: {
                    type: this.type,
                    keyId: this.keyId,
                },
            })
            .pipe(takeUntil(this.destroyService.$destroy))
            .subscribe((res) => {
                this.resources = res.items;
                this.pagination.total = res.totalItems;
            });
    }

    public deleteResource(data: SearchResourceResponse): void {
        this.resourceService.deleteById(data.id).subscribe((res) => {
            this.paginate(this.pagination);
        });
    }
}
