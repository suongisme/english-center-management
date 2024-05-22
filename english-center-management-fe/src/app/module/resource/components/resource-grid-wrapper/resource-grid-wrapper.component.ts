import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { SearchResourceResponse } from '../../interface';
import { ResourceGridComponent } from '../resource-grid/resource-grid.component';
import { ResourceService } from '../../service/resource.service';
import { NotifierService } from '@ecm-module/common';

@Component({
    selector: 'resource-grid-wrapper',
    templateUrl: './resource-grid-wrapper.component.html',
    standalone: true,
    imports: [ResourceGridComponent, TranslateModule, FontAwesomeModule],
})
export class ResourceGridWrapperComponent {
    @Input() resources: SearchResourceResponse[];
    @Input() type: string;
    @Input() keyId: number;

    @Output() createNew = new EventEmitter();
    @Output() deleteResource = new EventEmitter();

    private resourceService = inject(ResourceService);
    private notifierService = inject(NotifierService);

    public onUploadFile(event): void {
        const file = event.target.files[0];
        if (!file) return;
        this.resourceService
            .createResource({
                type: this.type,
                keyId: this.keyId,
                file: file,
            })
            .subscribe((res) => {
                this.notifierService
                    .success('Thêm tài nguyên thành công')
                    .then(() => this.createNew.emit());
            });
    }
}
