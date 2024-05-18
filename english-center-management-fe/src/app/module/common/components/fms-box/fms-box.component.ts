import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'fms-box',
    templateUrl: './fms-box.component.html',
    standalone: true,
    imports: [NgIf],
})
export class FmsBoxComponent {
    @Input() label?: string;
}
