import { Component } from '@angular/core';
import { ModalWrapperComponent } from '@ecm-module/common';

@Component({
    selector: 'document-modal',
    templateUrl: './document-modal.component.html',
    standalone: true,
    imports: [ModalWrapperComponent],
})
export class DocumentModal {}
