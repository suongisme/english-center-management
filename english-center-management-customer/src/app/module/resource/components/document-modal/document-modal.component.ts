import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalWrapperComponent } from '@ecm-module/common';
import { Observable, map } from 'rxjs';
import { SearchResourceResponse } from '../../interface';
import { ResourceService } from '../../service/resource.service';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'document-modal',
    templateUrl: './document-modal.component.html',
    standalone: true,
    imports: [ModalWrapperComponent, NgFor, NgIf, AsyncPipe, DatePipe],
})
export class DocumentModal implements OnInit {
    @Input() keyId: number;
    @Input() type: string;

    public $resources: Observable<SearchResourceResponse[]>;

    private resourceService = inject(ResourceService);
    public ngOnInit(): void {
        this.$resources = this.resourceService
            .getResourceByTimetableId(this.keyId, this.type)
            .pipe(map((x) => x.items));
    }
}
