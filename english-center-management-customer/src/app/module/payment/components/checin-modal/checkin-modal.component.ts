import { Component } from '@angular/core';
import { ModalWrapperComponent } from '@ecm-module/common';

@Component({
    selector: 'checkin-modal',
    templateUrl: './checkin-modal.component.html',
    standalone: true,
    imports: [ModalWrapperComponent],
})
export class CheckInModal {}
