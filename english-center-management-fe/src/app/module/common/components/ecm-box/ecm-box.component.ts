import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'ecm-box',
    templateUrl: './ecm-box.component.html',
    standalone: true,
    imports: [NgIf],
})
export class EcmBoxComponent {
    @Input() label?: string;
}
